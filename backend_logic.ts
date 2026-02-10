
/**
 * Backend Service Logic Example (Node.js/Express)
 * This file contains the logic for the critical features requested.
 */

import { Role, OrderStatus } from './types';

// 1. Commission & Split Calculation Logic
export const calculateOrderSplits = (order: any, vendorSubscription: any) => {
  const adminCommissionRate = vendorSubscription.commissionPct / 100;
  const affiliateCommissionRate = 0.05; // Standard 5% for lifetime referrals

  let totalVendorEarnings = 0;
  let totalAdminCommission = 0;
  let totalAffiliateCommission = 0;

  order.items.forEach((item: any) => {
    const itemTotal = item.price * item.quantity;
    const adminCut = itemTotal * adminCommissionRate;
    
    let affiliateCut = 0;
    if (order.hasAffiliate) {
      affiliateCut = itemTotal * affiliateCommissionRate;
    }

    totalAdminCommission += (adminCut - affiliateCut); // Admin pays affiliate from their cut or adds it on
    totalAffiliateCommission += affiliateCut;
    totalVendorEarnings += (itemTotal - adminCut);
  });

  return {
    vendor: totalVendorEarnings,
    admin: totalAdminCommission,
    affiliate: totalAffiliateCommission
  };
};

// 2. Escrow Release Logic (Cron Job Script Example)
export const autoPayoutCronJob = async (db: any) => {
  console.log("Running Daily Auto-Payout Job...");
  
  // Find orders delivered more than 7 days ago where funds are still HELD
  const releaseDateThreshold = new Date();
  releaseDateThreshold.setDate(releaseDateThreshold.getDate() - 7);

  const eligibleOrders = await db.query(`
    SELECT * FROM orders 
    WHERE status = 'DELIVERED' 
    AND escrow_status = 'HELD' 
    AND delivered_at <= ?
  `, [releaseDateThreshold]);

  for (const order of eligibleOrders) {
    // 1. Calculate splits
    const splits = await calculateOrderSplits(order, order.vendorSubscription);

    // 2. Start Transaction
    await db.transaction(async (trx: any) => {
      // Update Vendor Wallet
      await trx.query("UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?", [splits.vendor, order.vendor_id]);
      
      // Update Affiliate Wallet if exists
      if (order.affiliate_id) {
        await trx.query("UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?", [splits.affiliate, order.affiliate_id]);
      }

      // Record in Ledger
      await trx.query("INSERT INTO ledger (user_id, type, amount, reason, reference_id) VALUES (?, 'CREDIT', ?, 'Order Sale Payout', ?)", [order.vendor_id, splits.vendor, order.id]);

      // Mark Order Funds as Released
      await trx.query("UPDATE orders SET escrow_status = 'RELEASED', status = 'COMPLETED' WHERE id = ?", [order.id]);
    });
    
    console.log(`Funds released for Order #${order.id}`);
  }
};

// 3. Payment Success Webhook Handler (Stripe Example)
export const handlePaymentSuccess = async (session: any, db: any) => {
  const orderId = session.metadata.order_id;

  await db.transaction(async (trx: any) => {
    // 1. Update Order Status
    await trx.query("UPDATE orders SET status = 'PAID', escrow_status = 'HELD' WHERE id = ?", [orderId]);

    // 2. Record full amount in Admin Escrow Ledger
    await trx.query("INSERT INTO ledger (type, amount, reason, reference_id) VALUES ('CREDIT', ?, 'Customer Payment Received - Escrow', ?)", [session.amount_total / 100, orderId]);

    // 3. Send notifications to Vendors
    // notifyVendors(orderId);
  });
};

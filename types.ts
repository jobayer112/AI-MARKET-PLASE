
export enum Role {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
  AFFILIATE = 'AFFILIATE',
  RESELLER = 'RESELLER'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  referralCode?: string;
  referredBy?: string;
  walletBalance: number;
  activeSubscription?: VendorSubscription;
}

export interface VendorSubscription {
  planId: string;
  endsAt: Date;
  commissionPct: number;
  productLimit: number;
}

export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrls: string[];
  rating: number;
  reviewsCount: number;
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  escrowReleaseDate?: string;
}

export interface OrderItem {
  productId: string;
  vendorId: string;
  name: string;
  quantity: number;
  price: number;
  vendorCommissionPct: number;
}

export interface LedgerEntry {
  id: string;
  userId?: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  reason: string;
  timestamp: string;
}

export interface DashboardStats {
  totalSales: number;
  totalCommission: number;
  pendingPayouts: number;
  activeVendors: number;
  affiliatePayouts: number;
}

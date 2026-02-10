
-- Multi-Vendor Marketplace Schema
-- Focus on: Users, Products, Orders, Subscriptions, Wallets, and Ledger.

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'VENDOR', 'CUSTOMER', 'AFFILIATE') NOT NULL,
    referral_code VARCHAR(50) UNIQUE,
    referred_by INT, -- Link to affiliate user id
    wallet_balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referred_by) REFERENCES users(id)
);

CREATE TABLE subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_days INT NOT NULL,
    commission_pct DECIMAL(5, 2) NOT NULL,
    product_limit INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE vendor_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NOT NULL,
    plan_id INT NOT NULL,
    starts_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP NOT NULL,
    status ENUM('ACTIVE', 'EXPIRED', 'CANCELLED') DEFAULT 'ACTIVE',
    FOREIGN KEY (vendor_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    status ENUM('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    shipping_address TEXT,
    escrow_status ENUM('HELD', 'RELEASED', 'REFUNDED') DEFAULT 'HELD',
    payout_date DATE, -- Date when funds can be released (e.g. delivered + 7 days)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    vendor_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(15, 2) NOT NULL,
    vendor_commission_pct DECIMAL(5, 2),
    affiliate_commission_amount DECIMAL(15, 2) DEFAULT 0.00,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (vendor_id) REFERENCES users(id)
);

CREATE TABLE ledger (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- NULL for Admin Escrow
    type ENUM('CREDIT', 'DEBIT') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    reference_id INT, -- order_id or subscription_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE withdrawal_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    payment_method_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    is_moderated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

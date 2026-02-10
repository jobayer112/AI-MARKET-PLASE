
import { Role, Product, User } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Super Admin', email: 'admin@omni.com', role: Role.ADMIN, walletBalance: 15400.50 },
  { 
    id: 'u2', name: 'TechStore Global', email: 'vendor@tech.com', role: Role.VENDOR, 
    walletBalance: 2300.00,
    activeSubscription: {
        planId: 'p1',
        endsAt: new Date(Date.now() + 86400000 * 30),
        commissionPct: 10,
        productLimit: 50
    }
  },
  { id: 'u3', name: 'John Doe', email: 'john@example.com', role: Role.CUSTOMER, walletBalance: 0 },
  { id: 'u4', name: 'Affiliate King', email: 'aff@pro.com', role: Role.AFFILIATE, walletBalance: 450.20, referralCode: 'KINGSAVE10' },
];

const categoryNames = [
  "Smart Electronics", "Fashion & Apparel", "Home Appliances", "Beauty & Care", 
  "Sports & Outdoors", "Books & Stationery", "Toys & Games", "Automotive", 
  "Garden & Tools", "Health & Wellness", "Pet Supplies", "Musical Instruments",
  "Office Supplies", "Jewelry & Watches", "Baby Products", "Gourmet Food",
  "Video Games", "Camera & Optics", "Software", "Collectibles",
  "Kitchen Dining", "Furniture", "Lighting", "Art Crafts",
  "Travel & Luggage", "Smart Home", "Industrial", "Footwear",
  "Security", "Eco-friendly"
];

// Generate 30 categories
export const mockCategories = categoryNames.map((name, i) => ({
  id: `c${i + 1}`,
  name: name
}));

// Generate products for all 30 categories
export const mockProducts: Product[] = mockCategories.flatMap((cat, i) => {
  const productsPerCat = 4; // Each row should have 4 products
  return Array.from({ length: productsPerCat }).map((_, j) => ({
    id: `p-${cat.id}-${j}`,
    vendorId: i % 2 === 0 ? 'u2' : 'v2',
    vendorName: i % 2 === 0 ? 'TechStore Global' : 'HomeStyle Co',
    categoryId: cat.id,
    name: `${cat.name} Pro Series ${j + 1}`,
    description: `Experience the best quality in ${cat.name}. Designed for high performance and durability.`,
    price: 19.99 + (Math.random() * 500),
    stock: 5 + Math.floor(Math.random() * 100),
    imageUrls: [
      `https://picsum.photos/seed/${cat.id}${j}1/600/600`,
      `https://picsum.photos/seed/${cat.id}${j}2/600/600`,
      `https://picsum.photos/seed/${cat.id}${j}3/600/600`,
      `https://picsum.photos/seed/${cat.id}${j}4/600/600`
    ],
    rating: 4.0 + (Math.random() * 1),
    reviewsCount: 10 + Math.floor(Math.random() * 200)
  }));
});

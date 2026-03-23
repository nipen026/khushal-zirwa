// ─── Auth ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  address?: string;
  avatarUrl?: string;
}

// ─── Packages ────────────────────────────────────────────────────────────────
export type AnimalType = "goat" | "sheep" | "cow" | "camel";
export type ShareType = "full" | "half" | "third" | "seventh";

export interface Package {
  id: string;
  name: string;
  animalType: AnimalType;
  shareType: ShareType;
  price: number;
  description: string;
  imageUrl: string;
  features: string[];
  isPopular?: boolean;
}

// ─── Orders ──────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "slaughter_scheduled"
  | "slaughtered"
  | "distributed"
  | "completed";

export interface OrderItem {
  packageId: string;
  packageName: string;
  animalType: AnimalType;
  shareType: ShareType;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  deliveryCity: string;
  deliveryAddress: string;
  proofImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Coupon ───────────────────────────────────────────────────────────────────
export interface Coupon {
  code: string;
  discountPercent: number;
  expiresAt: string;
  isValid: boolean;
}

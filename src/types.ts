export type ServiceCategory = 'cow-farming' | 'vegetable-farming' | 'kamju-pittala';

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  type: 'HOME' | 'WORK';
}

export interface ProductVariant {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ServiceCategory;
  subCategory?: string;
  unit: string;
  image: string;
  variants?: ProductVariant[];
  rating: number;
  reviewsCount: number;
  
  // Cow farming specific fields
  fatPercentage?: string;
  farmSource?: string;

  // Vegetable farming specific fields
  freshnessIndicator?: string;

  // Quail farming specific fields
  liveWeight?: string;
  eggGrade?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  selectedVariantName?: string;
}

export interface Order {
  id: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  codSurcharge?: number;
  totalAmount: number;
  paymentMethod: 'online' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  deliverySlot: string;
  deliveryDate: string;
  address: Address;
  deliveryNotes?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isModerated: boolean;
}

export interface SalesReport {
  revenueTrend: { month: string; amount: number }[];
  distribution: { category: string; value: number }[];
  totalRevenue: number;
  activeOrdersCount: number;
  totalUsersCount: number;
  totalProductsCount: number;
  topSellingProducts: { name: string; quantity: number; revenue: number }[];
}

export interface AppNotification {
  id: string;
  orderId: string;
  oldStatus?: Order['status'] | 'new_order';
  newStatus: Order['status'];
  timestamp: string;
  read: boolean;
  message: string;
}

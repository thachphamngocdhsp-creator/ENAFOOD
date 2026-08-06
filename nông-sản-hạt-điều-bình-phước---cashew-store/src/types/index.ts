export type WeightOption = '250g' | '500g' | '1kg' | 'Hộp 500g Biếu';

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number; // base price for standard weight (e.g. 500g)
  originalPrice?: number;
  weights: {
    weight: WeightOption;
    price: number;
    originalPrice?: number;
  }[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  origin: string; // e.g. "Bình Phước, Việt Nam"
  processingMethod: 'Rang Củi Vỏ Lụa' | 'Rang Muối Tách Vỏ' | 'Tẩm Vị Tỏi Ớt' | 'Tẩm Mật Ong' | 'Phô Mai' | 'Nguyên Vị Tự Nhiên' | 'Hộp Quà Biếu';
  grade?: 'W240 (Hạt Lớn)' | 'W320 (Hạt Chuẩn)' | 'A+ Đặc Biệt';
  description: string;
  shortDescription: string;
  nutritionInfo: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
  };
  tags: string[];
  images: string[];
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export interface CartItem {
  id: string; // unique id per product + weight combination
  product: Product;
  selectedWeight: WeightOption;
  unitPrice: number;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrder: number;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  province: string;
  district: string;
  address: string;
  note?: string;
  items: {
    productId: string;
    productName: string;
    weight: WeightOption;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cod' | 'vietqr' | 'momo';
  paymentStatus: 'pending' | 'paid';
  orderStatus: 'received' | 'processing' | 'shipping' | 'delivered';
  createdAt: string;
  trackingCode: string;
}

export interface Recipe {
  id: string;
  title: string;
  summary: string;
  prepTime: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Nâng cao';
  calories: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  image: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

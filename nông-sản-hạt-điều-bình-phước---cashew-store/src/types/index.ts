export type Language = 'vi' | 'en';
export type ProductTypeFolder = 'raw_cashew' | 'spiced_cashew' | 'spices' | 'dried_fruit' | 'other_nuts';
export type ViewMode = 'grid' | 'table' | 'folder';

export type WeightOption = '250g' | '500g' | '1kg' | 'Hộp 500g Biếu' | 'Thùng Export 10kg' | 'Túi Hút Chân Không 22.68kg';

export interface ProductSpecification {
  moisture: string; // e.g. "≤ 5.0%"
  brokenRate: string; // e.g. "≤ 5.0%"
  foreignMatter: string; // e.g. "≤ 0.05%"
  countPerPound?: string; // e.g. "170 - 180 kernels/lb" for W180
  packaging: string; // e.g. "Flexi-bag 22.68kg / Tin 11.34kg / Vacuum Pouch 500g"
  shelfLife: string; // e.g. "24 Months"
  certifications: string[]; // e.g. ["HACCP", "ISO 22000", "FDA Registered", "HALAL"]
}

export interface Product {
  id: string;
  productType: ProductTypeFolder; // 'raw_cashew' | 'spiced_cashew' | 'spices' | 'dried_fruit' | 'other_nuts'
  name: string;
  nameEn: string;
  categoryId: string;
  price: number; // base price for standard weight (e.g. 500g in VND)
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
  originEn: string;
  processingMethod: string;
  processingMethodEn: string;
  grade?: string; // e.g. 'W180 (King Size)' | 'W210' | 'W240' | 'W320' | 'W450' | 'SW240' | 'LP' | 'SP' | 'BB' | 'DW';
  description: string;
  descriptionEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  nutritionInfo: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
  };
  specifications: ProductSpecification;
  tags: string[];
  tagsEn: string[];
  images: string[];
  inStock: boolean;
}

export interface Category {
  id: string;
  productType: ProductTypeFolder;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
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

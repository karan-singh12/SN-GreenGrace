export interface Product {
  id: string;
  name: string;
  nameHindi?: string;             // Hindi name for display (optional)
  description: string;
  price: number;
  originalPrice?: number;        // for showing discount
  unit: string;
  image: string;
  category: "Vegetables" | "Fruits" | "Organic" | "Exotic" | "Dairy";
  rating: number;
  reviewCount?: number;
  isOrganic?: boolean;
  isExotic?: boolean;
  isBestseller?: boolean;
  nutritionBadge?: string;       // e.g. "High Vitamin C", "Rich in Iron"
  tags?: string[];               // e.g. ["Gluten Free", "Vegan"]
  inStock?: boolean;
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string; // 'Home', 'Office'
  name: string;
  street: string;
  apartment: string;
  city: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
  expressEligible: boolean;
}

export interface DeliverySlot {
  id: string;
  label: string; // 'Standard', 'Express'
  price: number;
  time: string; // 'Today, 6-8 PM' or 'Within 30 mins'
}

export interface PaymentMethod {
  id: string;
  label: string;
  icon: string; // Material symbol icon name
  description: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  deliverySlot: DeliverySlot;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  promoCode?: string;
  discountAmount?: number;
  status: "pending" | "processing" | "delivered";
  createdAt: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  prepTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  image: string;
  mainIngredientId: string;
  ingredients: {
    productId: string;
    name: string;
    quantity: string;
    price: number;
  }[];
}

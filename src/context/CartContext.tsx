"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Address, DeliverySlot, PaymentMethod, Order } from "../types";
import { GreenGraceAPI } from "../services/api";

export const STANDARD_SLOT: DeliverySlot = {
  id: "slot_standard",
  label: "Standard",
  price: 0,
  time: "Today, 6-8 PM"
};

export const EXPRESS_SLOT: DeliverySlot = {
  id: "slot_express",
  label: "Express",
  price: 99.00,
  time: "Within 30 mins"
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pay_apple",
    label: "Apple Pay",
    icon: "account_balance_wallet",
    description: "Pay securely with your Apple device"
  },
  {
    id: "pay_card",
    label: "Credit Card (**** 1234)",
    icon: "credit_card",
    description: "Visa ending in 1234"
  },
  {
    id: "pay_upi",
    label: "UPI / QR Scan",
    icon: "qr_code_scanner",
    description: "Google Pay, PhonePe, Paytm or any UPI App"
  }
];

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  addresses: Address[];
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
  
  deliverySlot: DeliverySlot;
  setDeliverySlot: (slot: DeliverySlot) => void;
  
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  
  promoCode: string;
  discountPercent: number;
  promoMessage: string;
  isPromoLoading: boolean;
  applyPromo: (code: string) => Promise<boolean>;
  removePromo: () => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Checkout processing state
  isSubmittingOrder: boolean;
  orderResult: Order | null;
  setOrderResult: (order: Order | null) => void;
  placeOrder: () => Promise<boolean>;
  ordersHistory: Order[];
  
  // Order financial details
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discountAmount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddressState] = useState<Address | null>(null);
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot>(STANDARD_SLOT);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>("");
  const [isPromoLoading, setIsPromoLoading] = useState<boolean>(false);
  
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [orderResult, setOrderResult] = useState<Order | null>(null);
  const [ordersHistory, setOrdersHistory] = useState<Order[]>([]);

  // Initialize: load addresses and setup initial cart
  useEffect(() => {
    async function loadData() {
      try {
        const loadedAddresses = await GreenGraceAPI.getAddresses();
        setAddresses(loadedAddresses);
        const defaultAddr = loadedAddresses.find(a => a.isDefault) || loadedAddresses[0] || null;
        setSelectedAddressState(defaultAddr);
      } catch (err) {
        console.error("Failed to load mock addresses", err);
      }
    }
    loadData();

    // Default item to start with if cart is empty for testing checkout
    const initialProduct: Product = {
      id: "p3",
      name: "Hass Avocados",
      description: "Flawless Hass avocados with a rich, creamy interior. Perfect for fresh homemade guacamole.",
      price: 240.00,
      unit: "Pack of 3",
      image: "/images/934f39c2e1f3cd24e96ec33381491855.jpg",
      category: "Fruits",
      rating: 4.7,
      isOrganic: true,
    };
    
    setCart([
      { product: initialProduct, quantity: 3 },
      {
        product: {
          id: "p1",
          name: "Organic Heirloom Tomato",
          description: "Flawless, juicy, freshly harvested organic heirlooms with the stem attached. Perfect for salads and sauces.",
          price: 80.00,
          unit: "1 kg",
          image: "/images/8a3721b827eaf40499768d270ab517c0.jpg",
          category: "Vegetables",
          rating: 4.9,
          isOrganic: true,
        },
        quantity: 1
      },
      {
        product: {
          id: "p2",
          name: "Fresh Baby Spinach",
          description: "Crisp, washed, and highly nutritious baby spinach leaves. Tied loosely, ready for salads or sautés.",
          price: 40.00,
          unit: "250g Bunch",
          image: "/images/f8472b90d3c246c1e3040ac43f5ec14b.jpg",
          category: "Organic",
          rating: 4.8,
          isOrganic: true,
        },
        quantity: 2
      }
    ]);
  }, []);

  const setSelectedAddress = (address: Address) => {
    setSelectedAddressState(address);
    // If the newly selected address is NOT eligible for Express delivery,
    // force slot fallback to Standard standard
    if (!address.expressEligible && deliverySlot.id === "slot_express") {
      setDeliverySlot(STANDARD_SLOT);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const applyPromo = async (code: string): Promise<boolean> => {
    setIsPromoLoading(true);
    setPromoMessage("");
    try {
      const result = await GreenGraceAPI.verifyPromoCode(code);
      if (result.success) {
        setPromoCode(code.trim().toUpperCase());
        setDiscountPercent(result.discountPercent);
        setPromoMessage(result.message);
        setIsPromoLoading(false);
        return true;
      } else {
        setPromoMessage(result.message);
        setIsPromoLoading(false);
        return false;
      }
    } catch (err) {
      setPromoMessage("An error occurred. Please try again.");
      setIsPromoLoading(false);
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode("");
    setDiscountPercent(0);
    setPromoMessage("");
  };

  // Computations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? (selectedAddress?.expressEligible && deliverySlot.id === EXPRESS_SLOT.id ? EXPRESS_SLOT.price : STANDARD_SLOT.price) : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const tax = subtotal > 0 ? 0.00 : 0.00; // Mock tax as 0 as per template
  const total = Math.max(0, subtotal + deliveryFee + tax - discountAmount);

  const placeOrder = async (): Promise<boolean> => {
    if (cart.length === 0 || !selectedAddress) return false;
    
    setIsSubmittingOrder(true);
    try {
      const order = await GreenGraceAPI.createOrder({
        items: cart,
        address: selectedAddress,
        deliverySlot,
        paymentMethod,
        subtotal,
        deliveryFee,
        tax,
        total,
        discountAmount,
        promoCode: promoCode || undefined
      });
      setOrderResult(order);
      setOrdersHistory(prev => [order, ...prev]);
      clearCart();
      removePromo();
      setIsSubmittingOrder(false);
      return true;
    } catch (err) {
      console.error("Order placing failed", err);
      setIsSubmittingOrder(false);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        
        addresses,
        selectedAddress,
        setSelectedAddress,
        
        deliverySlot,
        setDeliverySlot,
        
        paymentMethod,
        setPaymentMethod,
        
        promoCode,
        discountPercent,
        promoMessage,
        isPromoLoading,
        applyPromo,
        removePromo,
        
        isCartOpen,
        setIsCartOpen,
        
        isSubmittingOrder,
        orderResult,
        setOrderResult,
        placeOrder,
        ordersHistory,
        
        subtotal,
        deliveryFee,
        tax,
        discountAmount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

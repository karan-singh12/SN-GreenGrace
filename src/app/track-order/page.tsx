"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { Order } from "../../types";
import Link from "next/link";
import { Suspense } from "react";

function TrackOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ordersHistory } = useCart();
  const orderId = searchParams.get("id") || "";

  // Find order in history, or fallback to a gorgeous pre-rendered mock order
  let order: Order | null = ordersHistory.find(o => o.id === orderId) || null;

  if (!order) {
    // High-end fallback mock order for display
    order = {
      id: orderId || "GG-583021",
      items: [
        {
          product: {
            id: "p3",
            name: "Hass Avocados",
            description: "Flawless Hass avocados with a rich, creamy interior.",
            price: 240.00,
            unit: "Pack of 3",
            image: "/images/934f39c2e1f3cd24e96ec33381491855.jpg",
            category: "Fruits",
            rating: 4.7
          },
          quantity: 2
        },
        {
          product: {
            id: "p1",
            name: "Organic Heirloom Tomato",
            description: "Flawless, juicy, freshly harvested organic heirlooms.",
            price: 80.00,
            unit: "1 kg",
            image: "/images/8a3721b827eaf40499768d270ab517c0.jpg",
            category: "Vegetables",
            rating: 4.9
          },
          quantity: 1
        }
      ],
      address: {
        id: "addr_1",
        label: "Home",
        name: "Jane Doe",
        street: "123 Fresh Valley Lane",
        apartment: "Apt 4B",
        city: "San Francisco",
        zipCode: "94110",
        phone: "(555) 123-4567",
        isDefault: true,
        expressEligible: true
      },
      deliverySlot: {
        id: "slot_express",
        label: "Express",
        price: 99.00,
        time: "Within 30 mins"
      },
      paymentMethod: {
        id: "pay_apple",
        label: "Apple Pay",
        icon: "account_balance_wallet",
        description: "Paid securely via Apple device"
      },
      subtotal: 560.00,
      deliveryFee: 99.00,
      tax: 0.00,
      total: 659.00,
      status: "pending",
      createdAt: new Date().toISOString()
    };
  }

  // Visual tracking steps:
  // Step 1: Order Confirmed
  // Step 2: Preparing Order
  // Step 3: Out for Delivery (Active)
  // Step 4: Delivered
  const steps = [
    {
      title: "Order Confirmed",
      desc: "We have received your order and payment",
      status: "completed",
      icon: "check_circle",
      time: "10:32 AM"
    },
    {
      title: "Preparing Produce",
      desc: "Our farm partners are packing your fresh vegetables",
      status: "completed",
      icon: "inventory_2",
      time: "10:38 AM"
    },
    {
      title: "Out for Delivery",
      desc: "David (Delivery Partner) is bringing your fresh basket",
      status: "active",
      icon: "electric_scooter",
      time: "Estimated in 12 mins"
    },
    {
      title: "Delivered",
      desc: "Enjoy your fresh, healthy organic meals!",
      status: "pending",
      icon: "home_pin",
      time: "--:--"
    }
  ];

  return (
    <div className="min-h-screen px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-8 font-plus-jakarta">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <Link href="/profile" className="inline-flex items-center gap-1.5 text-earthy-terracotta text-xs md:text-sm font-bold hover:opacity-80 transition-opacity mb-2">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Profile</span>
          </Link>
          <h2 className="font-literata text-xl md:text-2xl text-forest-deep tracking-tight">Track Your Order</h2>
          <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">Real-time status updates for order <strong className="text-on-surface font-semibold">{order.id}</strong></p>
        </div>

        <span className="inline-flex self-start sm:self-auto items-center gap-1 bg-leaf-green/10 text-leaf-green font-bold text-xs px-3.5 py-1.5 rounded-full border border-leaf-green/20 animate-pulse">
          <span className="w-2 h-2 bg-leaf-green rounded-full"></span>
          <span>Out for Delivery</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        
        {/* Left Column: Visual Pipeline Tracker (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Tracking steps timeline card */}
          <div className="paper-card border border-outline-variant/30 rounded-3xl p-6 shadow-sm">
            <h3 className="font-literata text-base md:text-lg text-forest-deep border-b border-outline-variant/15 pb-3.5 mb-6">
              Delivery Timeline
            </h3>

            <div className="relative pl-8 space-y-8">
              {/* Vertical timeline connector line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-outline-variant/30" />

              {steps.map((step, idx) => {
                const isCompleted = step.status === "completed";
                const isActive = step.status === "active";
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Circle Indicator on the line */}
                    <div className={`absolute -left-[30px] w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-md shrink-0 z-10 transition-colors duration-300 ${
                      isCompleted 
                        ? "bg-leaf-green text-white" 
                        : isActive 
                          ? "bg-leaf-green text-white scale-110 ring-4 ring-leaf-green/20" 
                          : "bg-surface-container text-outline"
                    }`}>
                      <span className="material-symbols-outlined text-[16px] font-bold">
                        {isCompleted ? "check" : step.icon}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className={`font-literata text-sm md:text-base leading-none ${
                          isActive ? "text-leaf-green text-[15px] md:text-[17px] font-bold" : "text-forest-deep font-semibold"
                        }`}>
                          {step.title}
                        </h4>
                        <span className="text-[10px] md:text-xs text-outline font-semibold whitespace-nowrap">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery driver profile details */}
          <div className="paper-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-leaf-green/10 flex items-center justify-center text-leaf-green text-lg font-extrabold shadow-inner shrink-0">
                D
              </div>
              <div>
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Your Delivery Hero</span>
                <span className="font-literata text-sm md:text-base text-forest-deep block leading-tight">David Miller</span>
                <span className="text-xs text-on-surface-variant font-medium mt-0.5 block">⚡ Electric Eco-Scooter • CA-ECO-782</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="tel:5551234567"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Call feature is connected to driver David Miller (Mock): (555) 392-0192.");
                }}
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors active:scale-90"
                title="Call Driver"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Vector Route Map & Invoice details (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Animated Route Map Mockup SVG - Matte Glass effect */}
          <div className="bg-white/80 border border-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-base text-on-surface">Live Delivery Map</h3>
            
            {/* SVG Interactive Map drawing */}
            <div className="w-full h-56 bg-surface-container-low rounded-2xl relative overflow-hidden border border-outline-variant/15 flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
                {/* Grid guidelines for tech look */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 197, 94, 0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Street background vectors */}
                <path d="M-10,40 L410,40" stroke="rgba(109, 123, 108, 0.15)" strokeWidth="16" fill="none" strokeLinecap="round" />
                <path d="M60,-10 L60,230" stroke="rgba(109, 123, 108, 0.15)" strokeWidth="16" fill="none" strokeLinecap="round" />
                <path d="M340,-10 L340,230" stroke="rgba(109, 123, 108, 0.15)" strokeWidth="16" fill="none" strokeLinecap="round" />
                <path d="M-10,180 L410,180" stroke="rgba(109, 123, 108, 0.15)" strokeWidth="16" fill="none" strokeLinecap="round" />
                
                {/* Actual routing curve (dashed line path) */}
                <path 
                  id="route-path"
                  d="M60,40 L60,180 L340,180 L340,90" 
                  stroke="rgba(0, 110, 47, 0.3)" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                <path 
                  d="M60,40 L60,180 L340,180 L340,90" 
                  stroke="#006e2f" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />

                {/* Warehouse Location (Store Start) */}
                <circle cx="60" cy="40" r="14" fill="#dfe0e0" stroke="#006e2f" strokeWidth="2.5" />
                <text x="60" y="44" fontFamily="Material Symbols Outlined" fontSize="14" textAnchor="middle" fill="#006e2f" style={{ fontVariationSettings: "'FILL' 1" }}>
                  eco
                </text>
                <text x="60" y="22" fontSize="9" fontWeight="bold" fill="#006e2f" textAnchor="middle">Grace Hub</text>

                {/* Destination Location (Home End) */}
                <circle cx="340" cy="90" r="14" fill="#ffdad6" stroke="#ba1a1a" strokeWidth="2.5" />
                <text x="340" y="94" fontFamily="Material Symbols Outlined" fontSize="15" textAnchor="middle" fill="#ba1a1a" style={{ fontVariationSettings: "'FILL' 1" }}>
                  home
                </text>
                <text x="340" y="72" fontSize="9" fontWeight="bold" fill="#ba1a1a" textAnchor="middle">Jane&apos;s Home</text>

                {/* Courier scooter location animated floating on the path */}
                {/* Placing it near coordinates on the route (e.g. 230, 180 on path) */}
                <g transform="translate(210, 168)" className="animate-bounce">
                  {/* Pin flag wrapper */}
                  <rect x="0" y="0" width="48" height="20" rx="6" fill="#006e2f" />
                  <polygon points="12,20 16,24 20,20" fill="#006e2f" />
                  {/* Scooter icon */}
                  <text x="24" y="14" fontFamily="Material Symbols Outlined" fontSize="12" textAnchor="middle" fill="#ffffff" style={{ fontVariationSettings: "'FILL' 1" }}>
                    electric_scooter
                  </text>
                </g>
              </svg>
            </div>
            
            <p className="text-[11px] text-on-surface-variant font-medium text-center italic">
              Our automated dispatch tracker syncs locations via partner mobile feeds
            </p>
          </div>

          {/* Invoice summary cards */}
          <div className="bg-white/80 border border-white rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-on-surface border-b border-outline-variant/15 pb-2.5">
              Order Basket
            </h3>
            
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 hide-scrollbar">
              {order.items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-on-surface-variant">
                    {item.product.name} <strong className="text-on-surface font-semibold">x{item.quantity}</strong>
                  </span>
                  <span className="text-on-surface font-bold">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-outline-variant/15 pt-3 space-y-2 text-xs md:text-sm font-semibold">
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Subtotal</span>
                <span className="text-on-surface">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Delivery Fee ({order.deliverySlot.label})</span>
                <span className="text-on-surface">
                  {order.deliveryFee > 0 ? `₹${order.deliveryFee.toFixed(2)}` : "FREE"}
                </span>
              </div>
              {order.promoCode && (
                <div className="flex justify-between text-primary">
                  <span>Promo Discount ({order.promoCode})</span>
                  <span>-₹{order.discountAmount?.toFixed(2) || ((order.subtotal * 0.2)).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2.5 border-t border-outline-variant/15 text-sm md:text-base">
                <span className="font-extrabold text-on-surface">Amount Paid</span>
                <span className="font-extrabold text-primary">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}

"use client";

import { Order } from "../types";

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Success Dialog Modal Box - Matte Glass effect */}
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-white rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-y-auto max-h-[90vh] hide-scrollbar animate-scale-in">
        
        {/* Animated Checkmark Icon */}
        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-inner">
            <svg 
              className="w-10 h-10" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={3}
            >
              <path 
                className="animate-checkmark"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h2 className="font-extrabold text-xl md:text-2xl text-primary tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant font-medium">
            Thank you for shopping with Green Grace. Your order has been dispatched.
          </p>
        </div>

        {/* Order Details Panel */}
        <div className="space-y-4 bg-surface-container-low/50 rounded-2xl p-4 border border-outline-variant/20 mb-6">
          <div className="flex justify-between items-center text-xs md:text-sm font-semibold border-b border-outline-variant/15 pb-2.5">
            <span className="text-on-surface-variant">Order Number</span>
            <span className="text-primary font-bold">{order.id}</span>
          </div>

          {/* Delivery Slot info */}
          <div className="flex justify-between items-start text-xs md:text-sm font-medium border-b border-outline-variant/15 pb-2.5">
            <span className="text-on-surface-variant shrink-0 mt-0.5">Delivery Slot</span>
            <div className="text-right">
              <p className="text-on-surface font-bold">{order.deliverySlot.label} Slot</p>
              <p className="text-xs text-on-surface-variant">{order.deliverySlot.time}</p>
            </div>
          </div>

          {/* Shipping destination */}
          <div className="flex justify-between items-start text-xs md:text-sm font-medium border-b border-outline-variant/15 pb-2.5">
            <span className="text-on-surface-variant shrink-0 mt-0.5">Ship To</span>
            <div className="text-right max-w-[200px]">
              <p className="text-on-surface font-bold">{order.address.label} ({order.address.name})</p>
              <p className="text-xs text-on-surface-variant truncate">{order.address.street}, {order.address.apartment}</p>
              <p className="text-xs text-on-surface-variant">{order.address.city}, {order.address.zipCode}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between items-center text-xs md:text-sm font-medium border-b border-outline-variant/15 pb-2.5">
            <span className="text-on-surface-variant">Paid Via</span>
            <span className="text-on-surface font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-outline">{order.paymentMethod.icon}</span>
              {order.paymentMethod.label.split("(")[0].trim()}
            </span>
          </div>

          {/* Items Summary list */}
          <div className="space-y-2 pt-1">
            <span className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              Items Ordered
            </span>
            <div className="max-h-32 overflow-y-auto pr-1 space-y-2 hide-scrollbar">
              {order.items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-on-surface-variant truncate max-w-[240px]">
                    {item.product.name} <strong className="text-on-surface font-semibold">x{item.quantity}</strong>
                  </span>
                  <span className="text-on-surface font-bold">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total row */}
          <div className="flex justify-between items-baseline pt-3 border-t border-primary/20">
            <span className="font-bold text-sm md:text-base text-on-surface">Total Amount Paid</span>
            <span className="font-extrabold text-base md:text-lg text-primary">
              ₹{order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              alert(`Order tracking page integration is under development for your NestJS backend. (Order ID: ${order.id})`);
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-primary/20 text-primary hover:bg-primary/5 transition-all text-sm font-bold active:scale-95 text-center"
          >
            Track Order
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-white hover:bg-primary-hover shadow-md transition-all text-sm font-bold active:scale-95 text-center btn-glow"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}

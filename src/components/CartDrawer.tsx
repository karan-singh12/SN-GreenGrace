"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    promoCode,
    discountPercent,
    promoMessage,
    isPromoLoading,
    applyPromo,
    removePromo
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  if (!isCartOpen) return null;

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = await applyPromo(couponInput);
    if (success) {
      setCouponInput("");
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Dark Blur Backdrop */}
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel: White Frosted Matte Glass */}
      <div className="relative w-full sm:w-[480px] h-full frosted-matte-glass shadow-2xl flex flex-col z-10 animate-slide-up sm:animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">shopping_cart</span>
            <h2 className="font-bold text-lg text-on-surface">Your Basket</h2>
            <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-black/5 text-on-surface-variant flex items-center justify-center transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[36px]">shopping_basket</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface text-base">Your cart is empty</h3>
                <p className="text-sm text-on-surface-variant max-w-[240px] mt-1">
                  Add some fresh organic vegetables from our shop to get started!
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover active:scale-95 shadow-sm transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="glass-panel rounded-xl p-4 flex gap-4 items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Product Image */}
                <div className="w-16 h-16 rounded-lg bg-surface-container-low shrink-0 overflow-hidden relative flex items-center justify-center border border-outline-variant/20">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info & Quantity controls */}
                <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                  <div>
                    <h4 className="font-semibold text-sm text-on-surface truncate leading-tight">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                      {item.product.unit} • ₹{item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-2 bg-surface-container rounded-full px-1.5 py-0.5 select-none">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-on-surface-variant active:scale-75 transition-colors text-xs font-bold"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="font-bold text-xs text-on-surface w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-on-surface-variant active:scale-75 transition-colors text-xs font-bold"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-error hover:bg-error-container/20 p-1.5 rounded-full transition-colors active:scale-75"
                      title="Remove item"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Subtotal for this item */}
                <div className="text-right pl-2 shrink-0">
                  <span className="font-bold text-sm text-primary">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Area: Summary and Promo Code */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low/40 space-y-6 shrink-0">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Have a coupon code?
              </label>
              
              {promoCode ? (
                /* Coupon Active State */
                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2 text-primary text-xs md:text-sm font-semibold">
                    <span className="material-symbols-outlined text-sm">local_offer</span>
                    <span>{promoCode} Applied ({discountPercent}% Off)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ) : (
                /* Coupon Input State */
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
                      local_offer
                    </span>
                    <input
                      type="text"
                      placeholder="e.g., FRESH20"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white border border-outline-variant focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isPromoLoading || !couponInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-all border border-primary/20 disabled:opacity-50"
                  >
                    {isPromoLoading ? "Applying..." : "Apply"}
                  </button>
                </div>
              )}
              
              {/* Promo validation message */}
              {promoMessage && (
                <p className={`text-xs font-semibold ${discountPercent > 0 ? "text-primary" : "text-error"}`}>
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-2 border-t border-outline-variant/20 pt-4 text-sm font-medium">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-on-surface">₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{((subtotal * discountPercent) / 100).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Delivery and tax calculated at checkout</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-outline-variant/10">
                <span className="font-bold text-base text-on-surface">Estimated Total</span>
                <span className="font-bold text-lg text-primary">
                  ₹{Math.max(0, subtotal - (subtotal * discountPercent) / 100).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-md hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center gap-2 btn-glow"
            >
              <span>Go to Checkout</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

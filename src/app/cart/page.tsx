"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
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

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = await applyPromo(couponInput);
    if (success) {
      setCouponInput("");
    }
  };

  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-4 gap-6 bg-cream-bg bg-[url('https://www.transparenttextures.com/patterns/p6.png')] text-on-surface font-plus-jakarta">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary shadow-inner">
          <span className="material-symbols-outlined text-[48px]">shopping_basket</span>
        </div>
        <div>
          <h2 className="font-extrabold text-xl text-on-surface">Your basket is empty</h2>
          <p className="text-sm text-on-surface-variant max-w-sm mt-1">
            Looks like you haven't added any fresh organic items to your basket yet.
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover active:scale-95 transition-all shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Start Shopping</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-cream-bg bg-[url('https://www.transparenttextures.com/patterns/p6.png')] text-on-surface font-plus-jakarta py-8">
      <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
      
      {/* Page Title & Breadcrumbs */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="font-semibold text-primary">Basket</span>
        </div>
        <h2 className="font-extrabold text-xl md:text-2xl text-on-surface tracking-tight">Your Basket</h2>
        <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">
          You have {totalItems} {totalItems === 1 ? "item" : "items"} in your basket
        </p>
      </div>

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="frosted-matte-glass rounded-3xl border border-white/50 p-4 md:p-6 space-y-4 shadow-sm">
            {cart.map(item => (
              <div
                key={item.product.id}
                className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between hover:shadow-md transition-all duration-200"
              >
                {/* Product Image & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-xl bg-surface-container-low shrink-0 overflow-hidden relative flex items-center justify-center border border-outline-variant/20">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm md:text-base text-on-surface truncate leading-tight">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                      {item.product.unit} • ₹{item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Delete Action & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 mt-2 sm:mt-0">
                  {/* Quantity selector */}
                  <div className="flex items-center gap-2 bg-surface-container rounded-full px-2 py-1 select-none border border-outline-variant/10">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-on-surface-variant active:scale-75 transition-colors text-xs font-bold shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </button>
                    <span className="font-bold text-xs text-on-surface w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-on-surface-variant active:scale-75 transition-colors text-xs font-bold shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>

                  {/* Price Subtotal */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-bold text-sm md:text-base text-primary">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-error hover:bg-error-container/20 p-2 rounded-full transition-colors active:scale-75 flex items-center justify-center"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:opacity-85 active:scale-95 transition-all mt-2 pl-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="space-y-6">
          <div className="frosted-matte-glass rounded-3xl border border-white/50 p-6 space-y-6 shadow-sm">
            <h3 className="font-extrabold text-base text-on-surface border-b border-outline-variant/20 pb-3">
              Order Summary
            </h3>

            {/* Calculations */}
            <div className="space-y-3 text-sm font-medium">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-on-surface font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{((subtotal * discountPercent) / 100).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Delivery and tax will be calculated at checkout.</span>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-outline-variant/20">
                <span className="font-bold text-base text-on-surface">Estimated Total</span>
                <span className="font-extrabold text-xl text-primary">
                  ₹{Math.max(0, subtotal - (subtotal * discountPercent) / 100).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2 border-t border-outline-variant/10 pt-4">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Have a coupon code?
              </label>
              
              {promoCode ? (
                /* Coupon Active State */
                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2 text-primary text-xs md:text-sm font-semibold">
                    <span className="material-symbols-outlined text-sm">local_offer</span>
                    <span>{promoCode} ({discountPercent}% Off)</span>
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
                      placeholder="e.g., FLASH20"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-white border border-outline-variant focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isPromoLoading || !couponInput.trim()}
                    className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-all border border-primary/20 disabled:opacity-50"
                  >
                    {isPromoLoading ? "Applying..." : "Apply"}
                  </button>
                </div>
              )}
              
              {promoMessage && (
                <p className={`text-xs font-semibold ${discountPercent > 0 ? "text-primary" : "text-error"}`}>
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Checkout Action Button */}
            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-md hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center gap-2 btn-glow"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}

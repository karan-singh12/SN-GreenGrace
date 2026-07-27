"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, STANDARD_SLOT, EXPRESS_SLOT, PAYMENT_METHODS } from "../../context/CartContext";
import OrderSuccessModal from "../../components/OrderSuccessModal";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    addresses,
    selectedAddress,
    setSelectedAddress,
    deliverySlot,
    setDeliverySlot,
    paymentMethod,
    setPaymentMethod,
    isSubmittingOrder,
    orderResult,
    setOrderResult,
    placeOrder,
    subtotal,
    deliveryFee,
    tax,
    discountAmount,
    total,
    promoCode
  } = useCart();

  const [localPromoInput, setLocalPromoInput] = useState("");
  const [promoErr, setPromoErr] = useState("");
  const [promoSuccessMsg, setPromoSuccessMsg] = useState("");
  const [applyingPromoLocal, setApplyingPromoLocal] = useState(false);

  const { applyPromo, removePromo, discountPercent } = useCart();

  const handleLocalApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localPromoInput.trim()) return;
    setApplyingPromoLocal(true);
    setPromoErr("");
    setPromoSuccessMsg("");
    
    const success = await applyPromo(localPromoInput);
    setApplyingPromoLocal(false);
    if (success) {
      setLocalPromoInput("");
      setPromoSuccessMsg(`Coupon applied successfully!`);
    } else {
      setPromoErr("Invalid promo code. Try FLASH20 or ORGANIC10.");
    }
  };

  const handleLocalRemovePromo = () => {
    removePromo();
    setPromoSuccessMsg("");
    setPromoErr("");
  };

  const handleCloseSuccess = () => {
    setOrderResult(null);
    router.push("/");
  };

  const handleSubmit = async () => {
    if (cart.length === 0) return;
    await placeOrder();
  };

  if (cart.length === 0 && !orderResult) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 gap-6 font-plus-jakarta">
        <div className="w-20 h-20 rounded-full bg-leaf-green/10 flex items-center justify-center text-leaf-green shadow-inner">
          <span className="material-symbols-outlined text-[48px]">shopping_cart_off</span>
        </div>
        <div>
          <h2 className="font-literata text-xl text-forest-deep">No Items to Checkout</h2>
          <p className="text-sm text-on-surface-variant max-w-sm mt-1">
            Your shopping cart is currently empty. Add fresh items from our homepage to proceed.
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-xl bg-forest-deep text-white font-bold hover:bg-primary active:scale-95 transition-all shadow-sm"
        >
          Go Back Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-8 font-plus-jakarta">
      
      {/* Page Title */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-literata text-xl md:text-2xl text-forest-deep tracking-tight">Checkout</h2>
        <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">Please review your delivery details and place your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start pb-28 lg:pb-12">
        
        {/* Left Column: Flow Steps (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          
          {/* STEP 1: Delivery Address */}
          <section className="paper-card border border-outline-variant/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            {/* Design indicator strip */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-leaf-green" />
            
            <div className="flex items-center justify-between mb-4 pl-1">
              <h3 className="font-literata text-base md:text-lg text-forest-deep flex items-center gap-2">
                <span className="material-symbols-outlined text-leaf-green text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
                Delivery Address
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-wider text-leaf-green bg-leaf-green/10 px-2.5 py-1 rounded-md">
                Step 1 of 3
              </span>
            </div>

            {/* Address choices grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map(addr => {
                const isSelected = selectedAddress?.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-start gap-3 select-none ${
                      isSelected
                        ? "border-leaf-green bg-leaf-green/[0.03] shadow-sm"
                        : "border-outline-variant/30 hover:border-outline-variant hover:bg-white-matte"
                    }`}
                  >
                    {/* Home/Office Icons */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-leaf-green text-white" : "bg-surface-container text-outline"
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {addr.label.toLowerCase() === "home" ? "home" : "business"}
                      </span>
                    </div>

                    {/* Address Detail Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 justify-between">
                        <span className="font-bold text-sm text-on-surface">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.25 rounded-md">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                        <strong>{addr.name}</strong><br />
                        {addr.street}, {addr.apartment}<br />
                        {addr.city}, {addr.zipCode}
                      </p>
                      <p className="text-[11px] text-outline font-medium mt-1">
                        Phone: {addr.phone}
                      </p>
                      
                      {/* Express indicator badge */}
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold">
                        {addr.expressEligible ? (
                          <span className="text-primary flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">local_shipping</span> Eligible for Express
                          </span>
                        ) : (
                          <span className="text-on-surface-variant/60 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">info</span> Standard Delivery Only
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Check indicator */}
                    <div className="shrink-0 mt-0.5">
                      <span className={`material-symbols-outlined text-[20px] ${
                        isSelected ? "text-primary" : "text-transparent"
                      }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 2: Delivery Slot */}
          <section className="bg-white/80 backdrop-blur-lg border border-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            
            <div className="flex items-center justify-between mb-4 pl-1">
              <h3 className="font-bold text-base md:text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  schedule
                </span>
                Delivery Slot
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Step 2 of 3
              </span>
            </div>

            {/* Address warning if not express eligible */}
            {selectedAddress && !selectedAddress.expressEligible && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-800 text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-base">warning</span>
                <span>The selected address is not eligible for Express 30-min deliveries. Falling back to Standard.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Standard Slot Card */}
              <div
                onClick={() => setDeliverySlot(STANDARD_SLOT)}
                className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex justify-between items-center select-none ${
                  deliverySlot.id === STANDARD_SLOT.id
                    ? "border-primary bg-primary/[0.03] shadow-sm"
                    : "border-outline-variant/30 hover:border-outline-variant hover:bg-white-matte"
                }`}
              >
                <div>
                  <span className="font-bold text-sm text-on-surface block">Standard Delivery</span>
                  <span className="text-xs text-on-surface-variant font-medium mt-0.5 block">{STANDARD_SLOT.time}</span>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="font-bold text-sm text-primary">FREE</span>
                  <span className={`material-symbols-outlined text-[20px] ${
                    deliverySlot.id === STANDARD_SLOT.id ? "text-primary" : "text-transparent"
                  }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              </div>

              {/* Express Slot Card */}
              <div
                onClick={() => {
                  if (selectedAddress?.expressEligible) {
                    setDeliverySlot(EXPRESS_SLOT);
                  }
                }}
                className={`rounded-xl p-4 border-2 transition-all flex justify-between items-center select-none ${
                  !selectedAddress?.expressEligible
                    ? "opacity-50 cursor-not-allowed border-outline-variant/20 bg-surface-container-low"
                    : "cursor-pointer"
                } ${
                  deliverySlot.id === EXPRESS_SLOT.id
                    ? "border-leaf-green bg-leaf-green/[0.03] shadow-sm"
                    : selectedAddress?.expressEligible
                      ? "border-outline-variant/30 hover:border-outline-variant hover:bg-white-matte"
                      : ""
                }`}
              >
                <div>
                  <span className="font-bold text-sm text-on-surface flex items-center gap-1 font-literata">
                    <span className="material-symbols-outlined text-[18px] text-leaf-green" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bolt
                    </span>
                    Express Delivery
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium mt-0.5 block">
                    {selectedAddress?.expressEligible ? EXPRESS_SLOT.time : "Unavailable for this address"}
                  </span>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="font-bold text-sm text-on-surface-variant">₹{EXPRESS_SLOT.price.toFixed(2)}</span>
                  {selectedAddress?.expressEligible && (
                    <span className={`material-symbols-outlined text-[20px] ${
                      deliverySlot.id === EXPRESS_SLOT.id ? "text-leaf-green" : "text-transparent"
                    }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* STEP 3: Payment Method */}
          <section className="paper-card border border-outline-variant/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-leaf-green" />
            
            <div className="flex items-center justify-between mb-4 pl-1">
              <h3 className="font-literata text-base md:text-lg text-forest-deep flex items-center gap-2">
                <span className="material-symbols-outlined text-leaf-green text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  payment
                </span>
                Payment Method
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-wider text-leaf-green bg-leaf-green/10 px-2.5 py-1 rounded-md">
                Step 3 of 3
              </span>
            </div>

            <div className="flex flex-col gap-3 font-plus-jakarta">
              {PAYMENT_METHODS.map(pm => {
                const isSelected = paymentMethod.id === pm.id;
                return (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm)}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-center justify-between select-none ${
                      isSelected
                        ? "border-leaf-green bg-leaf-green/[0.03] shadow-sm"
                        : "border-outline-variant/30 hover:border-outline-variant hover:bg-white-matte"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-leaf-green text-white" : "bg-surface-container text-outline"
                      }`}>
                        <span className="material-symbols-outlined text-[20px]">
                          {pm.icon}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-on-surface block">{pm.label}</span>
                        <span className="text-xs text-on-surface-variant font-medium block mt-0.5">{pm.description}</span>
                      </div>
                    </div>

                    <span className={`material-symbols-outlined text-[20px] ${
                      isSelected ? "text-leaf-green" : "text-transparent"
                    }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Summary Box (Span 4) */}
        <div className="lg:col-span-4 relative font-plus-jakarta">
          <div className="lg:sticky lg:top-24 paper-card border border-outline-variant/30 rounded-3xl p-6 shadow-md flex flex-col gap-6">
            <h3 className="font-literata text-base md:text-lg text-forest-deep border-b border-outline-variant/20 pb-3">
              Order Summary
            </h3>

            {/* Cart Product List preview */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1 hide-scrollbar">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3 justify-between items-center text-xs md:text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs bg-primary/10 text-primary font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0">
                      {item.quantity}
                    </span>
                    <span className="text-on-surface font-semibold truncate leading-tight">
                      {item.product.name}
                    </span>
                  </div>
                  <span className="text-on-surface font-bold shrink-0">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleLocalApplyPromo} className="border-t border-outline-variant/15 pt-4 space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Apply Promo Code
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-3 py-2 text-xs">
                  <span className="text-primary font-semibold">
                    {promoCode} ({discountPercent}% Discount)
                  </span>
                  <button
                    type="button"
                    onClick={handleLocalRemovePromo}
                    className="text-on-surface-variant hover:text-error"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Enter coupon"
                    value={localPromoInput}
                    onChange={e => setLocalPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-outline-variant focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={applyingPromoLocal || !localPromoInput.trim()}
                    className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoErr && <p className="text-[11px] font-semibold text-error">{promoErr}</p>}
              {promoSuccessMsg && <p className="text-[11px] font-semibold text-primary">{promoSuccessMsg}</p>}
            </form>

            {/* Calculations Breakdown */}
            <div className="border-t border-outline-variant/15 pt-4 space-y-2.5 text-xs md:text-sm font-medium">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                <span className="text-on-surface font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-on-surface-variant">
                <span>Delivery Fee</span>
                <span className="text-on-surface font-semibold">
                  {deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : "FREE"}
                </span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Taxes</span>
                <span className="text-on-surface font-semibold">₹{tax.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-primary font-bold">
                  <span>Promo Discount</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 border-t border-outline-variant/15">
                <span className="font-bold text-sm md:text-base text-on-surface">Order Total</span>
                <span className="font-extrabold text-base md:text-lg text-primary">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Desktop Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmittingOrder}
              className="hidden lg:flex w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-md hover:bg-primary-hover active:scale-97 transition-all items-center justify-center gap-2 btn-glow disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmittingOrder ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shopping_bag
                  </span>
                  <span>Place Order - ₹{total.toFixed(2)}</span>
                </>
              )}
            </button>

          </div>
        </div>

      </div>

      {/* Mobile Fixed Bottom Checkout CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-outline-variant/20 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] z-40 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total amount</span>
          <span className="text-lg font-extrabold text-primary">₹{total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmittingOrder}
          className="flex-1 max-w-[240px] bg-primary text-on-primary font-bold py-3.5 rounded-xl shadow-lg hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2 btn-glow disabled:opacity-75"
        >
          {isSubmittingOrder ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>

      {/* Success Popup Modal */}
      <OrderSuccessModal order={orderResult} onClose={handleCloseSuccess} />

    </div>
  );
}

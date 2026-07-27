"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const isCheckout = pathname === "/checkout";
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-3xl border-b border-emerald-500/10 shadow-sm w-full">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 md:h-20 w-full max-w-container-max mx-auto gap-4">
        
        {/* LOGO & BRAND SECTION */}
        {isCheckout ? (
          <Link 
            href="/"
            className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-label-md text-sm md:text-body-md font-medium"
          >
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_back</span>
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Back</span>
          </Link>
        ) : (
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
            <Logo className="w-8 h-8 md:w-9 md:h-9" />
            <span className="font-literata text-lg md:text-xl text-forest-deep tracking-tight">
              Fresh
            </span>
          </Link>
        )}

        {/* MIDDLE SECTION - NAVIGATION LINKS (SUPPRESSED ON CHECKOUT) */}
        {!isCheckout && (
          <div className="flex-grow hidden md:block"></div>
        )}

        {/* TITLE SPECIFIC TO CHECKOUT */}
        {isCheckout && (
          <h1 className="font-bold text-base md:text-lg text-primary tracking-tight text-center flex-1 sm:flex-initial">
            Secure Checkout
          </h1>
        )}

        {/* RIGHT SECTION: ACTIONS */}
        <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
          {!isCheckout ? (
            <>
              {/* Navigation links (Right-aligned next to actions) */}
              <nav className="hidden md:flex items-center gap-6 font-label-md text-[14px] font-bold text-on-surface-variant mr-1">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/profile" className="hover:text-primary transition-colors">
                  Orders
                </Link>
                <Link href="/track-order" className="hover:text-primary transition-colors">
                  Track Order
                </Link>
              </nav>

              {/* Notifications mock button */}
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary relative active:scale-95 transition-transform hover:bg-white/40 cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border border-white"></span>
              </button>

              {/* User profile tab button */}
              <Link
                href="/profile"
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 hover:bg-primary/20 active:scale-95 transition-all"
                title="View Profile"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_circle
                </span>
              </Link>

              {/* Interactive Cart Button */}
              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 md:gap-2 px-3 py-2 rounded-xl bg-primary text-on-primary font-semibold text-xs md:text-sm shadow-md active:scale-95 hover:bg-primary-hover transition-all duration-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  shopping_cart
                </span>
                <span className="hidden sm:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="flex items-center justify-center bg-white text-primary text-[10px] md:text-xs font-bold rounded-full w-5 h-5 scale-90 sm:scale-100">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            /* Spacer for centering layout checkout titles */
            <div className="w-20 hidden sm:block"></div>
          )}
        </div>

      </div>
    </header>
  );
}

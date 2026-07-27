"use client";

import Image from "next/image";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div 
      onClick={onClick}
      className={`bg-white/75 hover:bg-white/85 backdrop-blur-xl rounded-2xl p-4 shadow-sm hover:shadow-[0_12px_32px_rgba(8,84,39,0.06)] border border-emerald-500/10 hover:border-emerald-500/30 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      
      {/* Badges (Organic, Exotic) */}
      {(product.isOrganic || product.isExotic) && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {product.isOrganic && (
            <span className="px-2 py-0.5 rounded-md bg-primary-container text-white text-[10px] uppercase font-bold tracking-wider shadow-sm">
              Organic
            </span>
          )}
          {product.isExotic && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] uppercase font-bold tracking-wider shadow-sm">
              Exotic
            </span>
          )}
        </div>
      )}

      {/* Image Container with Hover Scale */}
      <div className="h-28 md:h-36 mb-4 relative rounded-xl bg-surface-container-low overflow-hidden flex items-center justify-center p-3 select-none">
        {/* We use standard HTML img to avoid Next.js image domain configuration errors for public external image URLs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Star rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-[12px] font-bold text-on-surface">{product.rating}</span>
            <span className="text-[11px] text-on-surface-variant/70 font-medium">({12 + Math.floor(product.rating * 5)} reviews)</span>
          </div>

          <h3 className="font-semibold text-sm md:text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
          <span className="font-label-sm text-[12px] text-on-surface-variant font-medium mt-0.5 block">
            {product.unit}
          </span>
        </div>

        {/* Pricing and Action Area */}
        <div className="flex justify-between items-center mt-1">
          <span className="font-bold text-base md:text-lg text-primary">
            ₹{product.price.toFixed(2)}
          </span>

          {quantityInCart > 0 ? (
            /* Count Selector State */
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="flex items-center gap-2 bg-surface-container rounded-full px-1.5 py-1 select-none"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, quantityInCart - 1);
                }}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-on-surface-variant active:scale-75 transition-all text-xs font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-bold text-xs text-on-surface w-4 text-center">
                {quantityInCart}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, quantityInCart + 1);
                }}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-on-surface-variant active:scale-75 transition-all text-xs font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          ) : (
            /* Add to Cart CTA */
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm hover:bg-primary-hover active:scale-90 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

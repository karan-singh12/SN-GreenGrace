"use client";

import { useEffect, useState } from "react";
import { Product, Recipe } from "../types";
import { useCart } from "../context/CartContext";
import { GreenGraceAPI } from "../services/api";

interface ProductDetailModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
}

export default function ProductDetailModal({ product, allProducts, onClose }: ProductDetailModalProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  useEffect(() => {
    if (!product) return;
    const currentId = product.id;
    
    async function loadRecipes() {
      setIsLoadingRecipes(true);
      try {
        const data = await GreenGraceAPI.getRecipesByProductId(currentId);
        setRecipes(data);
      } catch (err) {
        console.error("Failed to load recipes for product", err);
      } finally {
        setIsLoadingRecipes(false);
      }
    }
    
    loadRecipes();
  }, [product]);

  if (!product) return null;

  // Check if product is in cart
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Helper to check if ingredient product is in cart
  const isIdInCart = (prodId: string) => cart.some(item => item.product.id === prodId);

  // Helper to add missing items from recipe
  const addMissingToCart = (recipe: Recipe) => {
    recipe.ingredients.forEach(ing => {
      if (!isIdInCart(ing.productId)) {
        const fullProd = allProducts.find(p => p.id === ing.productId);
        if (fullProd) addToCart(fullProd);
      }
    });
  };

  // Calculate missing ingredients price total
  const getMissingCost = (recipe: Recipe) => {
    return recipe.ingredients
      .filter(ing => !isIdInCart(ing.productId))
      .reduce((sum, ing) => sum + ing.price, 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Container */}
      <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 animate-scale-in flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-surface-container/60 hover:bg-surface-container transition-colors flex items-center justify-center text-on-surface-variant cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Left Column: Product Image & Basic Info (45%) */}
        <div className="md:w-[42%] bg-surface-container-low/40 p-6 flex flex-col justify-between border-r border-outline-variant/10 shrink-0">
          <div className="flex flex-col items-center">
            {/* Organic/Exotic badge */}
            <div className="flex gap-1.5 self-start mb-4">
              {product.isOrganic && (
                <span className="px-2.5 py-0.75 bg-emerald-500/10 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Organic
                </span>
              )}
              {product.isExotic && (
                <span className="px-2.5 py-0.75 bg-purple-500/10 text-purple-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Exotic
                </span>
              )}
              <span className="px-2.5 py-0.75 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Product image with card shape */}
            <div className="w-48 h-48 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-outline-variant/10 p-4 mb-5 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-bold text-sm text-on-surface">{product.rating}</span>
              <span className="text-xs text-on-surface-variant/70 font-semibold">(Verified Product)</span>
            </div>

            {/* Title & Description */}
            <h2 className="font-extrabold text-xl text-on-surface text-center leading-snug">
              {product.name}
            </h2>
            <span className="text-xs text-outline font-bold mt-1 uppercase tracking-wide">
              {product.unit} Price
            </span>
            <p className="text-xs text-on-surface-variant text-center mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-8 border-t border-outline-variant/15 pt-5 flex flex-col gap-4">
            {/* Price display */}
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-on-surface-variant">Retail Price</span>
              <span className="text-2xl font-extrabold text-primary">₹{product.price.toFixed(2)}</span>
            </div>

            {/* Cart Controller */}
            {quantityInCart > 0 ? (
              <div className="flex items-center justify-between bg-surface-container/60 rounded-xl px-3 py-2.5">
                <span className="text-xs font-bold text-on-surface-variant">In shopping cart:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-slate-100 font-extrabold shadow-sm text-primary transition-all active:scale-75 text-sm"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm text-on-surface w-4 text-center">{quantityInCart}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-slate-100 font-extrabold shadow-sm text-primary transition-all active:scale-75 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold shadow-md hover:bg-primary-hover active:scale-95 transition-all text-xs flex items-center justify-center gap-2 btn-glow"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: AI Recipe Suggestions Section (55%) */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-center gap-2 border-b border-outline-variant/15 pb-3.5 mb-4">
            <span className="material-symbols-outlined text-primary text-[22px] animate-pulse">
              psychology
            </span>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-primary">GreenGrace AI Suggestion</h3>
              <h4 className="font-extrabold text-base text-on-surface">Dishes You Can Make</h4>
            </div>
          </div>

          {isLoadingRecipes ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] gap-2">
              <span className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></span>
              <span className="text-xs text-on-surface-variant font-bold">AI is generating cooking recipes...</span>
            </div>
          ) : recipes.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] text-center p-4 bg-surface-container-low/20 rounded-2xl border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-[36px] text-outline mb-2">menu_book</span>
              <h5 className="font-bold text-xs text-on-surface-variant">No standard recipes matching</h5>
              <p className="text-[11px] text-outline max-w-[240px] mt-1 leading-relaxed">
                Our AI suggests using this fresh {product.name.toLowerCase()} as a nutritious salad side or garnish!
              </p>
            </div>
          ) : (
            <div className="flex-1 space-y-5 overflow-y-auto max-h-[50vh] pr-1 hide-scrollbar">
              {recipes.map(recipe => {
                const missingCost = getMissingCost(recipe);
                const missingCount = recipe.ingredients.filter(i => !isIdInCart(i.productId)).length;

                return (
                  <div 
                    key={recipe.id} 
                    className="p-4 bg-emerald-500/[0.02] border border-primary/10 rounded-2xl flex flex-col gap-3.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Recipe Header */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h5 className="font-extrabold text-sm text-on-surface hover:text-primary transition-colors">
                          {recipe.name}
                        </h5>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] text-on-surface-variant font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">schedule</span> {recipe.prepTime}
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">cooking</span> {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      {recipe.description}
                    </p>

                    {/* Ingredients Checker */}
                    <div className="border-t border-outline-variant/10 pt-3">
                      <span className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">
                        Required Ingredients Checklist
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {recipe.ingredients.map(ing => {
                          const inCart = isIdInCart(ing.productId);
                          const matchingProd = allProducts.find(p => p.id === ing.productId);

                          return (
                            <button
                              key={ing.productId}
                              disabled={inCart}
                              onClick={() => {
                                if (matchingProd) addToCart(matchingProd);
                              }}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer select-none active:scale-95 ${
                                inCart
                                  ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                                  : "bg-surface-container hover:bg-primary/10 hover:text-primary text-on-surface border border-outline-variant/15"
                              }`}
                            >
                              {inCart ? (
                                <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                  check_circle
                                </span>
                              ) : (
                                <span className="material-symbols-outlined text-[11px]">add</span>
                              )}
                              <span>
                                {ing.name} ({ing.quantity})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions panel */}
                    {missingCount > 0 ? (
                      <div className="mt-1 pt-3 border-t border-dashed border-outline-variant/10 flex justify-between items-center flex-wrap gap-2">
                        <span className="text-[11px] text-on-surface-variant font-semibold">
                          Missing: <strong className="text-primary">{missingCount} items</strong>
                        </span>
                        <button
                          onClick={() => addMissingToCart(recipe)}
                          className="px-3.5 py-2 text-[10px] font-extrabold bg-primary text-on-primary rounded-lg hover:bg-primary-hover shadow-sm transition-all active:scale-95 flex items-center gap-1 btn-glow"
                        >
                          <span className="material-symbols-outlined text-[13px]">add_shopping_cart</span>
                          <span>Add All Ingredients (₹{missingCost})</span>
                        </button>
                      </div>
                    ) : (
                      <div className="mt-1 pt-3 border-t border-dashed border-outline-variant/10 flex justify-center items-center py-1.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                        <span className="text-[10px] text-emerald-800 font-extrabold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                          You have all ingredients in your cart for this dish!
                        </span>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-auto border-t border-outline-variant/15 pt-3.5 text-center">
            <span className="text-[10px] text-outline font-semibold">
              AI recommendations are simulated in real-time based on local Indian farm products.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

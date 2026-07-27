"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { GreenGraceAPI } from "../../../services/api";
import { Product, Recipe } from "../../../types";
import Navbar from "../../../components/Navbar";
import SparklesBackground from "../../../components/SparklesBackground";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { cart, addToCart, updateQuantity } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const productId = params?.id as string;

  useEffect(() => {
    if (!productId) return;
    
    async function loadData() {
      setIsLoading(true);
      try {
        const prod = await GreenGraceAPI.getProductById(productId);
        if (prod) {
          setProduct(prod);
          const data = await GreenGraceAPI.getRecipesByProductId(productId);
          setRecipes(data);
        }
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent relative pt-24 md:pt-32">
        <SparklesBackground />
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-primary animate-pulse">
          <span className="material-symbols-outlined text-[48px]">sync</span>
          <p className="font-bold text-sm">Harvesting fresh details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-transparent relative pt-24 md:pt-32 px-4">
        <SparklesBackground />
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 bg-white/60 border border-emerald-500/10 backdrop-blur-md rounded-3xl flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-[48px] text-outline">error</span>
          <div>
            <h2 className="font-extrabold text-lg text-on-surface">Product Not Found</h2>
            <p className="text-xs text-on-surface-variant mt-1">We couldn&apos;t locate this organic produce item.</p>
          </div>
          <Link href="/" className="px-5 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs hover:bg-primary-hover shadow-sm transition-all active:scale-95">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = cart.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Recipe helpers
  const isIdInCart = (id: string) => cart.some(item => item.product.id === id);

  const addAllRecipeIngredients = (recipe: Recipe) => {
    recipe.ingredients.forEach(ing => {
      if (!isIdInCart(ing.productId)) {
        // Find product details
        GreenGraceAPI.getProductById(ing.productId).then(p => {
          if (p) addToCart(p);
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-transparent relative pb-20 pt-24 md:pt-32 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto font-plus-jakarta">
      <SparklesBackground />
      <Navbar />

      {/* Back crumb row */}
      <div className="mb-6 flex justify-start">
        <Link 
          href="/" 
          className="flex items-center gap-1 text-earthy-terracotta hover:opacity-80 transition-opacity font-bold text-xs"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to fresh market</span>
        </Link>
      </div>

      {/* Main product panel grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 paper-card border border-outline-variant/30 rounded-3xl p-6 md:p-10 shadow-sm mb-12">
        {/* Left Column: Image wrapper */}
        <div className="flex flex-col items-center justify-center p-6 bg-white border border-outline-variant/30 rounded-2xl h-80 md:h-[400px] overflow-hidden relative shadow-inner group">
          {product.isOrganic && (
            <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-leaf-green/10 text-leaf-green font-bold text-[10px] uppercase tracking-wider border border-leaf-green/20">
              Organic
            </span>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="flex flex-col justify-between py-2">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-leaf-green font-bold uppercase tracking-wider bg-leaf-green/10 px-2.5 py-1 rounded">
                {product.category}
              </span>
              <h1 className="font-literata text-2xl md:text-3xl text-forest-deep mt-2">{product.name}</h1>
              
              <div className="flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-bold text-sm text-on-surface">{product.rating}</span>
                <span className="text-xs text-on-surface-variant font-semibold ml-1">(Fresh Pick Verified)</span>
              </div>
            </div>

            <div className="py-2.5 border-t border-b border-outline-variant/20 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-outline font-bold uppercase block tracking-wider font-plus-jakarta">Price</span>
                <span className="text-2xl font-black text-leaf-green">₹{product.price.toFixed(2)}</span>
                <span className="text-xs text-on-surface-variant font-bold ml-1">/ {product.unit}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-outline font-bold uppercase block tracking-wider">Availability</span>
                <span className="text-xs font-bold text-leaf-green flex items-center gap-0.5 justify-end">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> In Stock
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-outline font-bold uppercase block tracking-wider mb-1">Description</span>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-outline-variant/20">
            {quantityInCart > 0 ? (
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] text-leaf-green font-extrabold uppercase tracking-wide block">
                  Already in Basket
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-leaf-green/10 rounded-xl border border-leaf-green/20 p-1 shrink-0 shadow-sm">
                    <button
                      onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-leaf-green font-black hover:bg-leaf-green/25 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-xs md:text-sm text-leaf-green select-none">
                      {quantityInCart}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-leaf-green font-black hover:bg-leaf-green/25 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs text-on-surface-variant font-bold">
                    Subtotal: <strong className="text-leaf-green">₹{(product.price * quantityInCart).toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="w-full sm:w-auto px-8 py-3.5 bg-forest-deep text-white hover:bg-primary rounded-xl font-bold text-xs md:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                <span>Add to Basket</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic AI Suggested Recipes block */}
      {recipes.length > 0 && (
        <section className="flex flex-col gap-6 mt-12">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
            <span className="material-symbols-outlined text-leaf-green text-[24px] animate-pulse">
              psychology
            </span>
            <div>
              <h2 className="font-literata text-base md:text-xl text-forest-deep">AI Cooking Suggested Recipes</h2>
              <p className="text-xs text-on-surface-variant">Recommended dishes you can cook with this fresh item</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map(recipe => {
              const missingIngredients = recipe.ingredients.filter(ing => !isIdInCart(ing.productId));
              const missingCost = missingIngredients.reduce((sum, ing) => sum + ing.price, 0);

              return (
                <div 
                  key={recipe.id}
                  className="paper-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between gap-4 animate-fade-in"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white overflow-hidden shrink-0 flex items-center justify-center border border-outline-variant/30">
                      <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-literata text-sm md:text-base text-forest-deep truncate">{recipe.name}</h3>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                        {recipe.description}
                      </p>
                      <div className="flex gap-2.5 mt-2 font-plus-jakarta">
                        <span className="text-[10px] text-outline font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[12px]">schedule</span> {recipe.prepTime}
                        </span>
                        <span className="text-[10px] text-outline font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[12px]">cooking</span> {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant/20 pt-3 flex flex-col gap-3 font-plus-jakarta">
                    <div>
                      <span className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-2">
                        Ingredients needed from store
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {recipe.ingredients.map(ing => {
                          const inCart = isIdInCart(ing.productId);
                          return (
                            <span 
                              key={ing.productId}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-0.5 ${
                                inCart 
                                  ? "bg-leaf-green/10 text-leaf-green border-leaf-green/20" 
                                  : "bg-surface-container text-on-surface-variant border-outline-variant/10"
                              }`}
                            >
                              {inCart && (
                                <span className="material-symbols-outlined text-[11px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                                  check_circle
                                </span>
                              )}
                              {ing.name} ({ing.quantity})
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-1.5 flex-wrap gap-2">
                      <div className="text-xs font-semibold">
                        {missingIngredients.length > 0 ? (
                          <span className="text-on-surface-variant font-medium">
                            Missing: <strong className="text-leaf-green">{missingIngredients.length} items</strong>
                          </span>
                        ) : (
                          <span className="text-leaf-green font-extrabold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Ready to Cook
                          </span>
                        )}
                      </div>

                      {missingIngredients.length > 0 && (
                        <button
                          onClick={() => addAllRecipeIngredients(recipe)}
                          className="px-3.5 py-2 bg-forest-deep text-white rounded-xl font-bold text-[11px] hover:bg-primary shadow-sm transition-all active:scale-95 flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">add_shopping_cart</span>
                          <span>Add Missing (₹{missingCost})</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}

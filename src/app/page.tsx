"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, Recipe } from "../types";
import { GreenGraceAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import { useCart } from "../context/CartContext";

// Category config with images and descriptions
const CATEGORY_CONFIG = [
  {
    key: "Vegetables",
    label: "Sabziyan",
    hindi: "सब्ज़ियाँ",
    icon: "eco",
    image: "/images/8e2475bb9a91d1692538fdd0fef55345.jpg",
    color: "from-green-500/20 to-emerald-500/5",
    border: "border-green-500/20",
    count: "",
  },
  {
    key: "Fruits",
    label: "Phal",
    hindi: "फल",
    icon: "nutrition",
    image: "/images/a3f9e749778a0a4b71c7d5c1c4861bf7.jpg",
    color: "from-orange-500/20 to-amber-500/5",
    border: "border-orange-400/20",
    count: "",
  },
  {
    key: "Organic",
    label: "Jaivik",
    hindi: "जैविक",
    icon: "local_florist",
    image: "/images/dc19cb995f7d8d9a63aa1ac365e8e9aa.jpg",
    color: "from-lime-500/20 to-green-500/5",
    border: "border-lime-500/20",
    count: "",
  },
  {
    key: "Dairy",
    label: "Dudh Utpad",
    hindi: "डेयरी",
    icon: "water_drop",
    image: "/images/bd96fb7935a5472a48ed763cf8db3f01.jpg",
    color: "from-blue-400/15 to-sky-400/5",
    border: "border-blue-400/20",
    count: "",
  },
  {
    key: "Exotic",
    label: "Videshi",
    hindi: "विदेशी",
    icon: "spa",
    image: "/images/92fdbc3a67ce03fa8bbfee6bed34946d.jpg",
    color: "from-purple-500/15 to-pink-500/5",
    border: "border-purple-400/20",
    count: "",
  },
];

export default function Home() {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodData, recipeData] = await Promise.all([
          GreenGraceAPI.getProducts(),
          GreenGraceAPI.getRecipes(),
        ]);
        setProducts(prodData);
        setRecipes(recipeData);
      } catch (err) {
        console.error("Failed to load products and recipes", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Products filtered by selected category + search
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!selectedCategory) return matchesSearch;
    const matchesCategory =
      (selectedCategory === "Organic" && product.isOrganic) ||
      (selectedCategory === "Exotic" && product.isExotic) ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCategoryConfig = CATEGORY_CONFIG.find(c => c.key === selectedCategory);

  // Recipe helpers
  const isIdInCart = (id: string) => cart.some((item) => item.product.id === id);

  return (
    <main className="min-h-screen pb-12">

      {/* ── HERO ── */}
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto pt-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Left hero card - with background image */}
          <div className="lg:col-span-2 relative rounded-2xl md:rounded-3xl overflow-hidden flex flex-col justify-center items-start gap-3 min-h-[280px] md:min-h-[340px] border border-emerald-500/20 shadow-md">
            {/* Background Image */}
            <img
              src="/images/0e00a1e909a898c0f9b0681e64f82338.jpg"
              alt="Fresh vegetables"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />
            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-8 md:p-12">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider border border-white/30 backdrop-blur-sm w-fit">
                100% Organic &amp; Farm Fresh
              </span>
              <h1 className="font-extrabold text-xl sm:text-2xl md:text-4xl text-white leading-tight tracking-tight max-w-xl drop-shadow-sm">
                Organic Vegetables<br />
                Harvested Daily For Your Family
              </h1>
              <p className="text-white/85 text-xs md:text-sm font-semibold leading-relaxed max-w-md">
                Skip the middlemen. Order fresh chemical-free produce delivered from our farms directly to your doorstep in 30 minutes.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById("shop-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-1 bg-primary text-white hover:bg-primary-hover px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-lg transition-all active:scale-95 w-fit"
              >
                Explore Fresh Store
              </button>
            </div>
          </div>

          {/* Right AI card - with background image */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden flex flex-col justify-between border border-emerald-500/20 shadow-md min-h-[220px] md:min-h-[340px]">
            {/* Background Image */}
            <img
              src="/images/0bbe4e38c93ac0101b29cbef49c0ca0d.jpg"
              alt="Cooking ingredients"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-5 md:p-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] animate-pulse">psychology</span>
                  AI Kitchen Companion
                </span>
                <h3 className="font-extrabold text-base md:text-lg text-white drop-shadow-sm">Shahi Paneer Recipe</h3>
                <p className="text-[11px] text-white/80 leading-relaxed font-medium hidden sm:block">
                  Want to cook a rich Indian classic? Get fresh organic paneer, tomatoes, onions, butter, and ginger in one tap.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/15 border border-white/20 backdrop-blur-md rounded-xl p-3 mt-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white overflow-hidden shrink-0 border border-white/30">
                  <img
                    src="/images/472c1c144e0584cbe6c4ba99cf9c7d7b.jpg"
                    alt="Shahi Paneer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="text-xs font-extrabold text-white truncate">Ingredients Bundle</p>
                  <p className="text-[10px] text-emerald-300 font-extrabold">5 Items • ₹374.00</p>
                </div>
                <button
                  onClick={() => {
                    const bundleIds = ["p_paneer", "p_tomato", "p_onion", "p_butter", "p_ginger"];
                    bundleIds.forEach((id) => {
                      const prod = products.find((p) => p.id === id);
                      if (prod) addToCart(prod);
                    });
                  }}
                  className="p-2 bg-primary text-white rounded-xl hover:bg-primary-hover active:scale-90 transition-all flex items-center justify-center shrink-0"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOT DEALS SLIDER ── */}
      {!loading && products.length > 0 && (
        <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto py-4 flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <div>
              <h2 className="font-extrabold text-sm md:text-xl text-on-background">Hot Weekly Deals</h2>
              <p className="text-[10px] md:text-xs text-on-surface-variant">Limited time organic offers at 20% discount</p>
            </div>
            <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 select-none">
              Swipe <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0">
            {[
              { id: "p_tomato", label: "Organic Heirloom Tomato (टमाटर)", sub: "1 kg • Farm Picked", original: "₹80.00", sale: "₹64.00", off: "20% OFF", img: "/images/a1d3e64d43eac5c57a9fdb822a5b4fcc.jpg" },
              { id: "p_avocado", label: "Hass Avocados (एवोकैडो)", sub: "Pack of 3 • Rich Creamy", original: "₹240.00", sale: "₹204.00", off: "15% OFF", img: "/images/89caf15ee7737ed0ca52134825a70d89.jpg" },
              { id: "p_spinach", label: "Fresh Baby Spinach (पालक)", sub: "250g Bunch • Dewy Crisp", original: "₹40.00", sale: "₹32.00", off: "20% OFF", img: "/images/9154e255b5f1ec4dc576a480aff96a09.jpg" },
            ].map((deal) => (
              <div key={deal.id} className="bg-white/80 border border-emerald-500/10 backdrop-blur-md rounded-2xl p-3 md:p-4 flex gap-3 min-w-[260px] sm:min-w-[300px] snap-start shadow-sm relative shrink-0">
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-red-500 text-white font-extrabold text-[8px] uppercase tracking-wider z-10">{deal.off}</span>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container-low rounded-xl overflow-hidden shrink-0">
                  <img src={deal.img} alt={deal.label} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-on-surface truncate leading-tight">{deal.label}</h4>
                    <p className="text-[9px] md:text-[10px] text-on-surface-variant font-medium mt-0.5">{deal.sub}</p>
                  </div>
                  <div className="flex justify-between items-end mt-1">
                    <div>
                      <span className="text-[9px] text-outline line-through block leading-none mb-0.5">{deal.original}</span>
                      <span className="font-extrabold text-sm text-primary block leading-none">{deal.sale}</span>
                    </div>
                    <button
                      onClick={() => { const prod = products.find(p => p.id === deal.id); if (prod) addToCart(prod); }}
                      className="px-2.5 py-1.5 rounded-xl bg-primary text-on-primary font-bold text-[9px] transition-colors shadow-sm active:scale-95 cursor-pointer"
                    >
                      Grab Deal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SHOP SECTION ── */}
      <section id="shop-section" className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto py-4 scroll-mt-20 flex flex-col gap-5">

        {/* Section header + search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {selectedCategory ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                  className="flex items-center gap-1 text-primary font-bold text-xs hover:opacity-70 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back
                </button>
                <span className="text-on-surface-variant text-xs">/</span>
                <h2 className="font-extrabold text-sm md:text-xl text-on-background">
                  {selectedCategoryConfig?.hindi} <span className="text-on-surface-variant font-semibold text-xs md:text-sm">({selectedCategoryConfig?.label})</span>
                </h2>
              </div>
            ) : (
              <>
                <h2 className="font-extrabold text-sm md:text-xl text-on-background">Shop by Category</h2>
                <p className="text-[10px] md:text-xs text-on-surface-variant">Choose a category to explore fresh produce</p>
              </>
            )}
          </div>

          {/* Search bar — only visible when a category is selected */}
          {selectedCategory && (
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                type="text"
                placeholder={`Search in ${selectedCategoryConfig?.label}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs md:text-sm border border-outline-variant bg-white/80 backdrop-blur-md focus:bg-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              />
            </div>
          )}
        </div>

        {/* ── CATEGORIES GRID (when no category selected) ── */}
        {!selectedCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {CATEGORY_CONFIG.map((cat) => {
              const count = products.filter(p => {
                if (cat.key === "Organic") return p.isOrganic;
                if (cat.key === "Exotic") return p.isExotic;
                return p.category === cat.key;
              }).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`group relative overflow-hidden rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.color} backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 active:scale-95 text-left cursor-pointer`}
                >
                  {/* Category image */}
                  <div className="w-full h-28 sm:h-32 md:h-36 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Text on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-extrabold text-white text-xs md:text-sm leading-tight drop-shadow-sm">{cat.hindi}</p>
                    <p className="text-white/80 text-[9px] md:text-[10px] font-semibold">{cat.label} • {loading ? "–" : count} items</p>
                  </div>
                  {/* Icon badge */}
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── PRODUCT GRID (when category selected) ── */}
        {selectedCategory && (
          <>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 py-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                  <div key={idx} className="bg-white/60 rounded-2xl p-3 border border-white flex flex-col gap-3 animate-pulse">
                    <div className="w-full h-28 bg-surface-container-low rounded-xl" />
                    <div className="h-3 bg-surface-container-low rounded w-3/4" />
                    <div className="h-3 bg-surface-container-low rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center gap-4 bg-white/40 border border-white/60 rounded-3xl">
                <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
                <div>
                  <p className="font-bold text-on-surface text-sm">No items found</p>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-[240px] mx-auto">
                    {searchQuery ? `No results for "${searchQuery}"` : "Nothing in this category yet"}
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl active:scale-95"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => router.push(`/product/${product.id}`)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── AI RECIPES ── */}
      {!loading && recipes.length > 0 && (
        <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto py-6 flex flex-col gap-5">
          {/* Section heading */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[20px] animate-pulse">psychology</span>
              </div>
              <div>
                <h2 className="font-extrabold text-base md:text-2xl text-on-background flex items-center gap-2">
                  AI Suggested Recipes
                  <span className="text-[9px] font-bold bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Today</span>
                </h2>
                <p className="text-[10px] md:text-xs text-on-surface-variant">Dishes you can make with items from our shop</p>
              </div>
            </div>
          </div>

          {/* Recipe Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {recipes.map((recipe) => {
              const missingIngredients = recipe.ingredients.filter(ing => !isIdInCart(ing.productId));
              const missingCost = missingIngredients.reduce((sum, ing) => sum + ing.price, 0);
              const totalItems = recipe.ingredients.length;
              const inCartCount = totalItems - missingIngredients.length;
              const readyPercent = Math.round((inCartCount / totalItems) * 100);
              const isReady = missingIngredients.length === 0;

              const addAll = () => missingIngredients.forEach(ing => {
                const fullProd = products.find(p => p.id === ing.productId);
                if (fullProd) addToCart(fullProd);
              });

              const diffColor =
                recipe.difficulty === "Easy" ? "bg-emerald-500/80 text-white" :
                recipe.difficulty === "Medium" ? "bg-amber-500/80 text-white" :
                "bg-red-500/80 text-white";

              return (
                <div
                  key={recipe.id}
                  className="group relative flex flex-col rounded-2xl md:rounded-3xl overflow-hidden border border-white/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-xl"
                >
                  {/* ── Hero Image with gradient overlay ── */}
                  <div className="relative h-44 md:h-48 overflow-hidden shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Difficulty badge — top right */}
                    <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${diffColor} shadow-sm`}>
                      {recipe.difficulty}
                    </span>

                    {/* Prep time — top left */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-black/40 text-white/90 backdrop-blur-sm flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[11px]">schedule</span>
                      {recipe.prepTime}
                    </span>

                    {/* Recipe name on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <h3 className="font-extrabold text-sm md:text-base text-white leading-tight drop-shadow-sm">
                        {recipe.name}
                      </h3>
                      <p className="text-white/75 text-[10px] line-clamp-1 mt-0.5">{recipe.description}</p>
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-col gap-3 p-4 flex-1">

                    {/* Progress bar — cart readiness */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
                          Cart Readiness
                        </span>
                        <span className={`text-[9px] font-extrabold ${isReady ? "text-emerald-600" : "text-primary"}`}>
                          {inCartCount}/{totalItems} items
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isReady ? "bg-emerald-500" : "bg-primary"}`}
                          style={{ width: `${readyPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Ingredient chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.ingredients.map(ing => {
                        const inCart = isIdInCart(ing.productId);
                        return (
                          <div
                            key={ing.productId}
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold border transition-all ${
                              inCart
                                ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/25"
                                : "bg-white/60 text-on-surface-variant border-outline-variant/15"
                            }`}
                          >
                            {inCart ? (
                              <span className="material-symbols-outlined text-[10px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                                check_circle
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-outline/40 shrink-0" />
                            )}
                            {ing.name.split(" (")[0].split(" ").slice(-1)[0].includes("(") 
                              ? ing.name.split(" (")[0] 
                              : ing.name.split(" (")[0]}
                            <span className="text-[8px] opacity-60">· {ing.quantity}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-1">
                      {isReady ? (
                        <div className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <span className="material-symbols-outlined text-emerald-600 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                          <span className="text-emerald-700 font-extrabold text-xs">Ready to Cook!</span>
                        </div>
                      ) : (
                        <button
                          onClick={addAll}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                          Add {missingIngredients.length} Missing · ₹{missingCost}
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


      {/* ── WHY US ── */}
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto py-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-primary block shrink-0" />
            <h2 className="font-extrabold text-base md:text-2xl text-on-background">Why Shop From Us?</h2>
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant pl-3">Connecting our legacy with online convenience</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {[
            { icon: "local_florist", title: "100% Organic & Fresh", desc: "Hand-picked daily from our local farms. Zero chemical sprays." },
            { icon: "schedule", title: "Express Delivery", desc: "Receive your fresh groceries at your doorstep within 30 minutes." },
            { icon: "payments", title: "Secure Payment", desc: "Pay securely via Credit Card, UPI, or Apple Pay." },
          ].map(f => (
            <div key={f.title} className="bg-white/60 hover:bg-white/85 backdrop-blur-lg rounded-2xl p-4 md:p-5 flex items-start gap-3 border border-white/60 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-xs md:text-sm text-on-surface">{f.title}</h3>
                <p className="text-[10px] md:text-xs text-on-surface-variant mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      <CartDrawer />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, Recipe } from "../types";
import { GreenGraceAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
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
    <div className="min-h-screen bg-cream-bg bg-[url('https://www.transparenttextures.com/patterns/p6.png')] text-on-surface font-plus-jakarta">
      {/* ── NEW HERO SECTION ── */}
      {!selectedCategory && (
        <section className="relative w-full h-[500px] md:h-[650px] flex items-center overflow-hidden bg-oatmeal border-b border-outline-variant/30">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-right md:bg-center"
              style={{ backgroundImage: "url('/images/578464a15f8ed3c0177cc65ea95b2815.jpg')" }}
            />
            <div className="absolute inset-0 hero-gradient" />
          </div>
          <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto w-full">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-outline-variant/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-leaf-green"></span>
                <p className="text-leaf-green font-bold tracking-widest uppercase text-[10px]">100% Organic &amp; Farm Fresh</p>
              </div>
              <h1 className="font-literata text-forest-deep leading-tight text-3xl sm:text-4xl md:text-6xl leaf-accent">
                Organic Vegetables <br />
                <span className="sketch-underline">Harvested Daily</span><br />
                For Your Family
              </h1>
              <p className="text-on-surface-variant text-sm md:text-lg max-w-lg leading-relaxed font-medium">
                Skip the middlemen. Every basket tells a story of sustainable farming, delivered from our fertile soil directly to your kitchen in 30 minutes.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("shop-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-earthy-terracotta text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 shadow-lg shadow-earthy-terracotta/20 cursor-pointer text-xs md:text-sm"
                >
                  Explore Fresh Store
                </button>
                {/*
                <button
                  onClick={() => router.push("/about")}
                  className="bg-white/80 backdrop-blur-sm border border-primary-container/20 text-primary-container px-8 py-3.5 rounded-xl font-bold hover:bg-white transition-all active:scale-95 shadow-sm cursor-pointer text-xs md:text-sm"
                >
                  Our Farm Story
                </button>
                */}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── HOT DEALS SLIDER ── */}
      {!selectedCategory && !loading && products.length > 0 && (
        <section className="px-4 md:px-12 max-w-[1280px] mx-auto py-8 flex flex-col gap-4">
          <div className="flex justify-between items-baseline">
            <div>
              <h2 className="font-literata text-forest-deep text-lg md:text-2xl">Hot Weekly Deals</h2>
              <p className="text-[10px] md:text-xs text-on-surface-variant font-medium mt-0.5">Limited time organic offers at 20% discount</p>
            </div>
            <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 select-none">
              Swipe <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 snap-x -mx-4 md:mx-0 px-4 md:px-0">
            {[
              { id: "p_tomato", label: "Organic Heirloom Tomato (टमाटर)", sub: "1 kg • Farm Picked", original: "₹80.00", sale: "₹64.00", off: "20% OFF", img: "/images/a1d3e64d43eac5c57a9fdb822a5b4fcc.jpg" },
              { id: "p_avocado", label: "Hass Avocados (एवोकैडो)", sub: "Pack of 3 • Rich Creamy", original: "₹240.00", sale: "₹204.00", off: "15% OFF", img: "/images/89caf15ee7737ed0ca52134825a70d89.jpg" },
              { id: "p_spinach", label: "Fresh Baby Spinach (पालक)", sub: "250g Bunch • Dewy Crisp", original: "₹40.00", sale: "₹32.00", off: "20% OFF", img: "/images/9154e255b5f1ec4dc576a480aff96a09.jpg" },
            ].map((deal) => (
              <div key={deal.id} className="bg-white border border-outline-variant/30 rounded-2xl p-4 flex gap-3 min-w-[280px] sm:min-w-[320px] snap-start shadow-sm relative shrink-0">
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-earthy-terracotta text-white font-extrabold text-[8px] uppercase tracking-wider z-10">{deal.off}</span>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container-low rounded-xl overflow-hidden shrink-0">
                  <img src={deal.img} alt={deal.label} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <h4 className="font-literata text-xs md:text-sm text-on-surface truncate leading-tight">{deal.label}</h4>
                    <p className="text-[9px] md:text-[10px] text-on-surface-variant font-medium mt-0.5">{deal.sub}</p>
                  </div>
                  <div className="flex justify-between items-end mt-1">
                    <div>
                      <span className="text-[9px] text-outline line-through block leading-none mb-0.5">{deal.original}</span>
                      <span className="font-extrabold text-sm text-primary block leading-none">{deal.sale}</span>
                    </div>
                    <button
                      onClick={() => { const prod = products.find(p => p.id === deal.id); if (prod) addToCart(prod); }}
                      className="px-3 py-1.5 rounded-lg bg-forest-deep text-on-primary font-bold text-[10px] hover:bg-primary transition-colors shadow-sm active:scale-95 cursor-pointer font-plus-jakarta"
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

      {/* ── BENTO CATEGORY GRID & SHOP PRODUCT VIEW ── */}
      {!selectedCategory ? (
        <section id="shop-section" className="px-margin-mobile md:px-margin-desktop py-12 md:py-16 max-w-[1280px] mx-auto">
          <div className="mb-10 text-center">
            <h2 className="font-literata text-forest-deep text-2xl md:text-4xl mb-3 leaf-accent">Shop by Category</h2>
            <div className="w-16 h-1 bg-earthy-terracotta/30 mx-auto rounded-full mb-3"></div>
            <p className="text-on-surface-variant font-medium text-xs md:text-sm italic">“Nature's bounty, hand-selected for your table”</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-auto md:h-[550px]">
            {/* Main Category: Vegetables (Sabziyan) */}
            <div
              onClick={() => setSelectedCategory("Vegetables")}
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl paper-card transition-all hover:-translate-y-1 cursor-pointer min-h-[250px] md:min-h-auto"
            >
              <div className="absolute inset-0 p-3 md:p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/f2ce7e6e41d1b998fdf4b23dd002617a.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-10">
                    <span className="material-symbols-outlined text-white mb-1 md:mb-2 text-3xl md:text-4xl">eco</span>
                    <h3 className="font-literata text-white text-2xl md:text-4xl mb-1">सब्ज़ियाँ</h3>
                    <p className="text-white/80 font-bold text-xs tracking-wide">Sabziyan • Organic Greens</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fruits Category */}
            <div
              onClick={() => setSelectedCategory("Fruits")}
              className="group relative overflow-hidden rounded-3xl paper-card transition-all hover:-translate-y-1 cursor-pointer min-h-[160px] md:min-h-auto"
            >
              <div className="absolute inset-0 p-3">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/ec7b89c1f39e3f8be12a577fafb2c55a.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-6">
                    <h3 className="font-literata text-white text-lg md:text-xl">फल</h3>
                    <p className="text-white/80 font-bold text-[10px] uppercase tracking-wider">Phal • Fresh Fruits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organic/Wellness Category */}
            <div
              onClick={() => setSelectedCategory("Organic")}
              className="group relative overflow-hidden rounded-3xl paper-card transition-all hover:-translate-y-1 cursor-pointer min-h-[160px] md:min-h-auto"
            >
              <div className="absolute inset-0 p-3">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/72a981899f9c5d2d5f017463be9092a5.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-6">
                    <h3 className="font-literata text-white text-lg md:text-xl">जैविक</h3>
                    <p className="text-white/80 font-bold text-[10px] uppercase tracking-wider">Jaivik • Wellness</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dairy Category */}
            <div
              onClick={() => setSelectedCategory("Dairy")}
              className="group relative overflow-hidden rounded-3xl paper-card transition-all hover:-translate-y-1 cursor-pointer min-h-[160px] md:min-h-auto"
            >
              <div className="absolute inset-0 p-3">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/262288ea7769b0541b15fb47e93d78c4.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-6">
                    <h3 className="font-literata text-white text-lg md:text-xl">डेयरी</h3>
                    <p className="text-white/80 font-bold text-[10px] uppercase tracking-wider">Dairy • Farm Fresh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exotic Category */}
            <div
              onClick={() => setSelectedCategory("Exotic")}
              className="group relative overflow-hidden rounded-3xl paper-card transition-all hover:-translate-y-1 cursor-pointer min-h-[160px] md:min-h-auto"
            >
              <div className="absolute inset-0 p-3">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/fca6b44e1b864ea08a4f23a635cbc4da.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-6">
                    <h3 className="font-literata text-white text-lg md:text-xl">विदेशी</h3>
                    <p className="text-white/80 font-bold text-[10px] uppercase tracking-wider">Videshi • Exotic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Shop Section layout when category filter is active */
        <section id="shop-section" className="px-margin-mobile md:px-margin-desktop pt-12 pb-0 md:pt-16 md:pb-0 max-w-[1280px] mx-auto scroll-mt-20 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                  className="flex items-center gap-1 text-primary font-bold text-xs hover:opacity-70 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back
                </button>
                <span className="text-on-surface-variant text-xs">/</span>
                <h2 className="font-literata text-forest-deep text-lg md:text-2xl">
                  {selectedCategoryConfig?.hindi} <span className="text-on-surface-variant font-plus-jakarta font-semibold text-xs md:text-sm">({selectedCategoryConfig?.label})</span>
                </h2>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                type="text"
                placeholder={`Search in ${selectedCategoryConfig?.label}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm border border-outline-variant bg-white focus:bg-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          {/* Product grid */}
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
        </section>
      )}

      {/* ── NEW AI KITCHEN COMPANION ── */}
      {!selectedCategory && (
        <section className="relative bg-sage-subtle/10 py-12 md:py-16 overflow-hidden border-t border-b border-outline-variant/20">
          <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            {/* Left Column: Info & Action */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                <span className="material-symbols-outlined text-leaf-green text-sm animate-pulse">auto_awesome</span>
                <span className="text-forest-deep font-bold text-[10px] uppercase tracking-widest">Your Kitchen Storyteller</span>
              </div>
              <h2 className="font-literata text-forest-deep text-2xl md:text-4xl leading-tight">
                Shahi Paneer Recipe <br />
                <span className="text-earthy-terracotta text-xl md:text-2xl font-plus-jakarta italic font-normal">From farm to flavorful bowl</span>
              </h2>
              <p className="text-on-surface-variant text-xs md:text-base leading-relaxed font-medium max-w-xl">
                Not sure what to cook with today's harvest? Let our AI companion guide you. For this <span className="font-bold text-primary">Shahi Paneer</span>, we've pre-selected the exact weight of organic vine-ripened tomatoes and hand-pressed cottage cheese you'll need.
              </p>
              
              {/* Bundle Purchase Card */}
              <div className="paper-card rounded-2xl p-6 md:p-8 relative overflow-hidden border border-outline-variant/30 max-w-md">
                <div className="absolute top-0 right-0 w-24 h-24 bg-leaf-green/5 rounded-bl-full -mr-6 -mt-6"></div>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-on-surface-variant font-bold mb-1">Curated Homestead Bundle</p>
                    <span className="font-bold text-base md:text-lg text-forest-deep">Ingredients Bundle</span>
                  </div>
                  <span className="font-literata text-earthy-terracotta text-2xl md:text-3xl">₹374.00</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-surface-container rounded-lg text-[10px] font-bold text-on-surface border border-outline-variant/50">5 Premium Items</span>
                  <span className="px-3 py-1 bg-leaf-green/10 rounded-lg text-[10px] font-bold text-leaf-green border border-leaf-green/20">Certified Organic</span>
                  <span className="px-3 py-1 bg-earthy-terracotta/5 rounded-lg text-[10px] font-bold text-earthy-terracotta border border-earthy-terracotta/10">Chef's Choice</span>
                </div>
                <button
                  onClick={() => {
                    const bundleIds = ["p_paneer", "p_tomato", "p_onion", "p_butter", "p_ginger"];
                    bundleIds.forEach((id) => {
                      const prod = products.find((p) => p.id === id);
                      if (prod) addToCart(prod);
                    });
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-forest-deep text-white py-4 rounded-xl font-bold hover:bg-primary transition-all active:scale-95 shadow-xl shadow-forest-deep/10 cursor-pointer text-xs md:text-sm font-plus-jakarta"
                >
                  <span className="material-symbols-outlined text-sm">shopping_basket</span>
                  <span>Add Bundle to Cart</span>
                </button>
              </div>
            </div>
            
            {/* Right Column: Scrapbook Media */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative max-w-sm w-full px-4 sm:px-0">
                {/* Scrapbook Aesthetic Image */}
                <div className="scrapbook-border shadow-xl rounded-sm">
                  <div
                    className="aspect-[4/5] bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/21e79af62d4e24e467562a68cae93fec.jpg')" }}
                  />
                </div>
                {/* Floating Tactile Badge */}
                <div className="absolute -bottom-6 -right-2 paper-card p-4 rounded-xl border border-outline-variant/40 shadow-lg max-w-[150px] rotate-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-earthy-terracotta/10 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-earthy-terracotta text-sm">timer</span>
                    </div>
                    <p className="text-forest-deep font-literata text-base">25 Mins</p>
                  </div>
                  <p className="text-on-surface-variant text-[8px] font-bold leading-tight uppercase opacity-65">Prep Time</p>
                </div>
                <div className="absolute -top-6 -left-6 bg-white p-3 rounded-full border border-outline-variant/40 shadow-md -rotate-6">
                  <span className="material-symbols-outlined text-leaf-green text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── AI SUGGESTED RECIPES GRID ── */}
      {!selectedCategory && !loading && recipes.length > 0 && (
        <section className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-12 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-leaf-green/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-leaf-green text-[20px] animate-pulse">psychology</span>
              </div>
              <div>
                <h2 className="font-literata text-forest-deep text-lg md:text-2xl flex items-center gap-2">
                  AI Suggested Recipes
                  <span className="text-[9px] font-bold bg-forest-deep text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-plus-jakarta">Today</span>
                </h2>
                <p className="text-[10px] md:text-xs text-on-surface-variant font-medium">Dishes you can make with items from our shop</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
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
                recipe.difficulty === "Easy" ? "bg-emerald-600 text-white" :
                recipe.difficulty === "Medium" ? "bg-amber-600 text-white" :
                "bg-red-600 text-white";

              return (
                <div
                  key={recipe.id}
                  className="group relative flex flex-col rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <div className="relative h-44 md:h-48 overflow-hidden shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${diffColor} font-plus-jakarta`}>
                      {recipe.difficulty}
                    </span>
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-black/40 text-white/90 backdrop-blur-sm flex items-center gap-0.5 font-plus-jakarta">
                      <span className="material-symbols-outlined text-[11px]">schedule</span>
                      {recipe.prepTime}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-literata text-white text-sm md:text-base leading-tight">
                        {recipe.name}
                      </h3>
                      <p className="text-white/80 text-[10px] line-clamp-1 mt-0.5 font-plus-jakarta font-medium">{recipe.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4 flex-grow">
                    <div>
                      <div className="flex justify-between items-center mb-1.5 font-plus-jakarta">
                        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
                          Cart Readiness
                        </span>
                        <span className={`text-[9px] font-extrabold ${isReady ? "text-emerald-600" : "text-primary"}`}>
                          {inCartCount}/{totalItems} items
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isReady ? "bg-emerald-500" : "bg-leaf-green"}`}
                          style={{ width: `${readyPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {recipe.ingredients.map(ing => {
                        const inCart = isIdInCart(ing.productId);
                        return (
                          <div
                            key={ing.productId}
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold border transition-all font-plus-jakarta ${
                              inCart
                                ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/25"
                                : "bg-white text-on-surface-variant border-outline-variant/15"
                            }`}
                          >
                            {inCart ? (
                              <span className="material-symbols-outlined text-[10px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                                check_circle
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-outline/40 shrink-0" />
                            )}
                            {ing.name.split(" (")[0]}
                            <span className="text-[8px] opacity-60">· {ing.quantity}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-auto pt-2">
                      {isReady ? (
                        <div className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-plus-jakarta">
                          <span className="material-symbols-outlined text-emerald-600 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                          <span className="text-emerald-700 font-extrabold text-xs">Ready to Cook!</span>
                        </div>
                      ) : (
                        <button
                          onClick={addAll}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-forest-deep hover:bg-primary text-white rounded-xl font-bold text-xs transition-all active:scale-95 shadow-sm cursor-pointer font-plus-jakarta"
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
      {/* ── NEW HOMESTEAD PROMISE (WHY US) ── */}
      {!selectedCategory && (
        <section className="px-4 md:px-12 pt-12 pb-16 md:pt-16 md:pb-24 max-w-[1280px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-literata text-forest-deep text-2xl md:text-4xl mb-3 sketch-underline">Our Homestead Promise</h2>
            <div className="w-16 h-1 bg-earthy-terracotta/30 mx-auto rounded-full mb-3"></div>
            <p className="text-on-surface-variant font-medium text-xs md:text-sm max-w-xl mx-auto leading-relaxed">We believe in food that respects the soil and nourishes the soul. Here is how we bring the farm to your table.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: "agriculture", title: "100% Soil-Grown", desc: "Hand-picked daily from heritage farms. No chemical sprays, just pure earth nutrients.", color: "bg-leaf-green/5" },
              { icon: "local_shipping", title: "Express Delivery", desc: "From field to your porch in record time, maintaining maximum nutrient density.", color: "bg-earthy-terracotta/5" },
              { icon: "wallet", title: "Honest Pricing", desc: "Direct farm-to-consumer model ensures farmers get paid fairly and you save more.", color: "bg-primary/5" },
            ].map(f => (
              <div key={f.title} className="p-8 rounded-[2rem] paper-card text-center transition-all hover:-translate-y-1 group border border-outline-variant/20">
                <div className={`w-16 h-16 ${f.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-leaf-green text-3xl">{f.icon}</span>
                </div>
                <h3 className="font-literata text-forest-deep text-lg mb-2">{f.title}</h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

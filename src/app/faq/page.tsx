"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Sourcing & Farms",
    question: "Where do you source your organic vegetables and fruits?",
    answer: "We partner directly with over 50 local organic farms across Delhi NCR. These farms are strictly certified pesticide-free and adhere to natural chemical-free crop cycles. Every harvest is tested in our localized hubs before fulfillment."
  },
  {
    category: "Sourcing & Farms",
    question: "Is your produce certified organic?",
    answer: "Yes, all our partner farms are certified under organic guidelines. We maintain transparency by displaying certifications and testing reports for soil and water quality directly on our partner farm listings."
  },
  {
    category: "Delivery & Slots",
    question: "How does the 30-minute Express delivery slot work?",
    answer: "When you select Express delivery, your order is dispatched immediately from the localized hub closest to your location. We use insulated temperature-controlled bags to keep your greens dewy and fresh during transit."
  },
  {
    category: "Delivery & Slots",
    question: "What are your delivery hours?",
    answer: "Our farm deliveries run daily from 6:00 AM to 9:00 PM. Orders placed after 8:30 PM are scheduled for the next morning's early slots."
  },
  {
    category: "Quality & Refunds",
    question: "What is your quality guarantee if I receive damaged produce?",
    answer: "We offer a 100% no-questions-asked refund policy. If any crop is not to your liking or damaged during shipping, simple click 'Report Issue' in your orders dashboard or contact support within 3 hours of delivery for an instant refund."
  },
  {
    category: "Payments & Accounts",
    question: "What payment methods do you support?",
    answer: "We support major digital payments: Google Pay, PhonePe, Paytm, credit/debit cards (Visa, MasterCard, RuPay), and secure NetBanking. We also offer cash on delivery (COD) for eligible pin codes."
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories = ["All", "Sourcing & Farms", "Delivery & Slots", "Quality & Refunds", "Payments & Accounts"];

  const filteredFaqs = activeCategory === "All"
    ? FAQS
    : FAQS.filter(faq => faq.category === activeCategory);

  const toggleAccordion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="min-h-[80vh] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="font-semibold text-primary">FAQs</span>
      </div>

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <h1 className="font-literata text-2xl sm:text-3xl text-forest-deep tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
          Need help? Here are the most common questions about our farm-to-table organic delivery process.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-8 border-b border-outline-variant/15 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setExpandedIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
              activeCategory === cat
                ? "bg-forest-deep text-white shadow-sm"
                : "bg-white/80 hover:bg-white text-on-surface-variant border border-outline-variant/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={faq.question}
              className="paper-card rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Header click bar */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-xs sm:text-sm md:text-base text-forest-deep hover:text-leaf-green transition-colors select-none font-literata"
              >
                <span>{faq.question}</span>
                <span className={`material-symbols-outlined text-earthy-terracotta font-bold text-[20px] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                  keyboard_arrow_down
                </span>
              </button>

              {/* Collapsed/Expanded Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-[500px] border-t border-outline-variant/10 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="p-5 text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed bg-oatmeal/10">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer support callout */}
      <div className="mt-16 text-center space-y-4">
        <h3 className="font-literata text-sm sm:text-base text-forest-deep">Still have questions?</h3>
        <p className="text-xs text-on-surface-variant font-semibold max-w-sm mx-auto leading-relaxed">
          If you didn't find the answer you were looking for, reach out to our dedicated farm customer support.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-earthy-terracotta text-white font-bold hover:bg-earthy-terracotta/90 active:scale-95 transition-all shadow-sm text-xs font-plus-jakarta"
        >
          <span className="material-symbols-outlined text-sm">mail</span>
          <span>Contact Customer Support</span>
        </Link>
      </div>

    </div>
  );
}

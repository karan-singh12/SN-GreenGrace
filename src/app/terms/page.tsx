"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-[80vh] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="font-semibold text-primary">Terms of Service</span>
      </div>

      <div className="max-w-4xl mx-auto paper-card border border-outline-variant/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h1 className="font-literata text-2xl md:text-3xl text-forest-deep tracking-tight">Terms of Service</h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1">Last Updated: July 28, 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed font-medium">
          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">1. Agreement to Terms</h2>
            <p>
              By accessing the Fresh platform or ordering our fresh organic delivery service, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform or request delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">2. Sourcing &amp; Quality Guarantees</h2>
            <p>
              Fresh delivers freshly harvested organic fruits, vegetables, and dairy. Given the natural, chemical-free nature of organic crops:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Individual items may display color or size variations that are natural in organic soil harvesting.</li>
              <li>While we maintain rigorous sorting checks, we advise washing all raw produce thoroughly before consumption.</li>
              <li>Any quality issues must be reported within 3 hours of receiving delivery to qualify for an instant account credit or refund.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">3. Delivery Logistics</h2>
            <p>
              We strive to deliver orders within the selected Standard or Express (30 minutes) delivery slots. However:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Delivery times may occasionally vary due to severe local traffic conditions, extreme weather, or farm-to-hub transit bottlenecks.</li>
              <li>It is the customer's responsibility to provide a valid delivery address, contact phone number, and gate access code if required.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">4. Payments &amp; Pricing</h2>
            <p>
              All listed vegetable, fruit, and bundle pricing is subject to daily changes based on farm harvest yields. Standard delivery rates, Express surcharges, and discount coupon codes are visible in your basket dashboard before placing the final order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">5. Inquiries &amp; Legal</h2>
            <p>
              For legal inquiries or corporate terms, please contact our administrative desk at <a href="mailto:legal@freshdelivery.com" className="text-earthy-terracotta hover:underline">legal@freshdelivery.com</a>.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
}

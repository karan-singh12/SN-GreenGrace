"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-[80vh] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="font-semibold text-primary">About Us</span>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-wider border border-primary/20">
          Our Story
        </span>
        <h1 className="font-literata text-2xl sm:text-3xl md:text-4xl text-forest-deep tracking-tight leading-tight">
          Pioneering the Future of <br className="hidden sm:inline" />
          <span className="text-earthy-terracotta sketch-underline">Pure, Organic Food Delivery</span>
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
          Green Grace was born out of a simple promise: to connect hardworking local farmers directly with urban households, delivering freshly harvested, chemical-free organic produce within minutes.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
        {[
          { number: "50+", label: "Partner Farms", icon: "agriculture" },
          { number: "30 Min", label: "Delivery Guarantee", icon: "schedule" },
          { number: "10,000+", label: "Happy Families", icon: "groups" },
          { number: "100%", label: "Pesticide-Free", icon: "verified" }
        ].map(stat => (
          <div key={stat.label} className="paper-card rounded-2xl p-4 md:p-6 border border-outline-variant/30 text-center flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-leaf-green text-[28px] md:text-[32px]">{stat.icon}</span>
            <div className="font-literata text-lg md:text-2xl text-forest-deep">{stat.number}</div>
            <div className="text-[10px] md:text-xs text-on-surface-variant font-bold uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Core Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="font-literata text-xl md:text-2xl text-forest-deep tracking-tight">
            Our Core Farming Values
          </h2>
          
          <div className="space-y-4">
            {[
              {
                title: "Strictly Organic Sourcing",
                desc: "We rigorously test our partner soil and water channels. Every vegetable and fruit is grown free of chemical pesticides and synthetic fertilizers.",
                icon: "eco"
              },
              {
                title: "Supporting Local Farmers",
                desc: "By eliminating multiple middlemen, we ensure that local farming communities receive fair pricing and immediate rewards for their premium crops.",
                icon: "handshake"
              },
              {
                title: "Minimum Carbon Footprint",
                desc: "Our localized fulfillment hubs ensure that produce travels less than 15 miles total from soil harvest to delivery at your kitchen doorstep.",
                icon: "forest"
              }
            ].map(value => (
              <div key={value.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-leaf-green/10 flex items-center justify-center text-leaf-green shrink-0">
                  <span className="material-symbols-outlined text-[20px] font-bold">{value.icon}</span>
                </div>
                <div>
                  <h4 className="font-literata text-sm md:text-base text-forest-deep">{value.title}</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-medium mt-0.5">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Callout Box */}
        <div className="paper-card border border-outline-variant/30 rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
          <span className="material-symbols-outlined text-[36px] text-earthy-terracotta" style={{ fontVariationSettings: "'FILL' 1" }}>
            format_quote
          </span>
          <p className="text-sm md:text-base text-forest-deep italic font-semibold leading-relaxed font-literata">
            "We wanted to build something where eating healthy isn't a chore or a premium luxury. By delivering pure, freshly harvested crops within minutes, we help families reconnect with real food in its natural, untainted form."
          </p>
          <div className="border-t border-outline-variant/10 pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-leaf-green/10 flex items-center justify-center font-extrabold text-xs text-leaf-green">GG</div>
            <div>
              <h5 className="text-xs md:text-sm font-literata text-forest-deep">The Green Grace Team</h5>
              <p className="text-[10px] md:text-xs text-on-surface-variant font-medium">Delhi NCR, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Call to Action */}
      <section className="paper-card border border-outline-variant/30 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-4 max-w-4xl mx-auto shadow-sm">
        <h3 className="font-literata text-lg md:text-xl text-forest-deep">Ready to taste the farm difference?</h3>
        <p className="text-xs md:text-sm text-on-surface-variant max-w-lg leading-relaxed">
          Order our top-selling organic heirlooms, fresh leafy greens, and farm-fresh dairy and see how rich natural flavor is supposed to taste.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-3 rounded-xl bg-forest-deep text-white font-bold hover:bg-primary active:scale-95 transition-all shadow-md"
        >
          Explore Fresh Store
        </Link>
      </section>
      
    </div>
  );
}

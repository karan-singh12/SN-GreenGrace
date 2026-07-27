"use client";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = "w-12 h-12 md:w-14 md:h-14" }: LogoProps) {
  // The logo is a high-resolution circular badge representing organic veggies and water freshness.
  // In light/dark mode layouts, we add a subtle white background wrapper for contrast if it's rendered on a dark section (e.g. the footer).
  return (
    <div className={`shrink-0 rounded-full overflow-hidden ${light ? "bg-white p-[2px] shadow-md border border-white/20" : ""}`}>
      <img 
        src="/images/logo.jpg" 
        alt="FRESH Logo" 
        className={`${className} object-cover`}
      />
    </div>
  );
}

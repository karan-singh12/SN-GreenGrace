"use client";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = "w-8 h-8" }: LogoProps) {
  // Use custom gradients to blend the organic green leaf with a water drop
  return (
    <svg 
      className={`${className} shrink-0`} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Green Leaf Gradient */}
        <linearGradient id="logoLeaf" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#084221" />
          <stop offset="100%" stopColor="#409c68" />
        </linearGradient>
        {/* Blue Water Drop Gradient */}
        <linearGradient id="logoDrop" x1="15" y1="15" x2="35" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={light ? "#90e0ef" : "#4ea8de"} />
          <stop offset="100%" stopColor={light ? "#00b4d8" : "#0077b6"} />
        </linearGradient>
      </defs>
      
      {/* Organic Green Leaf (Veggies) */}
      <path 
        d="M8 32C8 32 9.5 16 23 8C33 2 36.5 5 31.5 16C26.5 27 15.5 32 8 32Z" 
        fill="url(#logoLeaf)" 
      />
      
      {/* Fresh Water Droplet (Water) */}
      <path 
        d="M24 16C20 21.5 19.5 26.5 23.5 30.5C27.5 34.5 32.5 32.5 33 26.5C33.5 20.5 28 16 24 16Z" 
        fill="url(#logoDrop)" 
        className="opacity-95"
      />
      
      {/* Subtle light reflection highlight on the droplet */}
      <path 
        d="M23.5 20.5C23 21.8 23 23 23.5 24" 
        stroke="white" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        opacity="0.8"
      />
    </svg>
  );
}

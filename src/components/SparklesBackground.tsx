"use client";

import { useEffect, useState, useRef } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const ORB_COLORS = [
  "radial-gradient(circle, rgba(8,84,39,0.13) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(101,163,13,0.09) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(209,250,229,0.40) 0%, transparent 70%)",
];

export default function SparklesBackground() {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const list: Orb[] = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 320 + 200,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 8,
        color: ORB_COLORS[i % ORB_COLORS.length],
      });
    }
    setOrbs(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* ── Base gradient: warm white to very light mint ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #f0fdf4 0%, #fafffe 30%, #ffffff 55%, #f6fef9 80%, #ecfdf5 100%)",
        }}
      />

      {/* ── Radial vignette spotlight: top-left green bloom ── */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          left: "-5%",
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(ellipse at center, rgba(8,84,39,0.08) 0%, rgba(34,197,94,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Bottom-right peach-mint accent ── */}
      <div
        className="absolute"
        style={{
          bottom: "-8%",
          right: "-5%",
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, rgba(101,163,13,0.05) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Center soft glow ── */}
      <div
        className="absolute"
        style={{
          top: "25%",
          left: "30%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, rgba(209,250,229,0.35) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Animated floating orbs ── */}
      {mounted && orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: orb.color,
            filter: "blur(48px)",
            animation: `orbFloat ${orb.duration}s ease-in-out infinite alternate`,
            animationDelay: `${orb.delay}s`,
            transform: "translate(-50%, -50%)",
            opacity: 0.7,
          }}
        />
      ))}

      {/* ── Subtle grid dot pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #085427 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Leaf silhouettes: decorative botanical SVG shapes ── */}
      <svg
        className="absolute top-0 right-0 opacity-[0.035] w-80 h-80"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 10 C140 10, 190 50, 190 100 C190 150, 150 190, 100 190 C50 190, 10 150, 10 100 C10 50, 60 10, 100 10 Z"
          fill="#085427"
        />
        <path
          d="M100 10 C100 10, 100 100, 190 100"
          stroke="#085427"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M100 10 C100 10, 100 100, 10 100"
          stroke="#085427"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <svg
        className="absolute bottom-8 left-4 opacity-[0.04] w-56 h-56 rotate-45"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="100" cy="100" rx="90" ry="50" fill="#22c55e" />
        <line x1="100" y1="50" x2="100" y2="150" stroke="#085427" strokeWidth="2" />
        <line x1="100" y1="80" x2="140" y2="70" stroke="#085427" strokeWidth="1.2" />
        <line x1="100" y1="100" x2="60" y2="90" stroke="#085427" strokeWidth="1.2" />
        <line x1="100" y1="120" x2="135" y2="112" stroke="#085427" strokeWidth="1.2" />
      </svg>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes orbFloat {
          0%   { transform: translate(-50%, -50%) scale(1)   translateY(0px); }
          33%  { transform: translate(-50%, -50%) scale(1.08) translateY(-18px); }
          66%  { transform: translate(-50%, -50%) scale(0.94) translateY(10px); }
          100% { transform: translate(-50%, -50%) scale(1.05) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

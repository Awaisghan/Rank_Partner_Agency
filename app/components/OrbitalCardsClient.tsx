"use client";

import React, { useEffect, useRef, useState } from "react";

const ORBIT_CARDS = [
  { label: "Forbes", color: "#d1a6f4" },
  { label: "Bloomberg", color: "#93c5fd" },
  { label: "TIME", color: "#f87171" },
  { label: "CNBC", color: "#34d399" },
  { label: "Business Insider", color: "#fbbf24" },
  { label: "USA Today", color: "#60a5fa" },
  { label: "Entrepreneur", color: "#a78bfa" },
  { label: "Inc.", color: "#fb923c" },
];

export default function OrbitalCardsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>(0);

  // Smooth rotation animation loop
  useEffect(() => {
    const animate = () => {
      setRotation((prev) => (prev + 0.15) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const radius = 140; // Orbit circle radius

  return (
    <div
      ref={containerRef}
      className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] select-none"
      style={{ perspective: "800px" }}
    >
      {/* Center Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#d1a6f4]/20 blur-[40px]" />
      </div>

      {/* Center Dot */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-3 h-3 rounded-full bg-[#d1a6f4] shadow-lg shadow-[#d1a6f4]/50" />
      </div>

      {/* Orbit Ring Line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full border border-slate-700/30"
          style={{
            width: radius * 2 + 20,
            height: radius * 2 + 20,
          }}
        />
      </div>

      {/* Orbiting Brand Badges */}
      {ORBIT_CARDS.map((card, index) => {
        const angle =
          (rotation + (index * 360) / ORBIT_CARDS.length) * (Math.PI / 180);

        // 3D Depth Math: Scale & X/Y placement
        const scale = 0.6 + 0.4 * ((Math.sin(angle) + 1) / 2);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.45;
        const zIndex = Math.round(scale * 100);

        return (
          <div
            key={card.label}
            className="absolute transition-none pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
              zIndex,
              opacity: 0.4 + scale * 0.6,
            }}
          >
            <div
              className="px-3.5 py-2 rounded-xl border backdrop-blur-sm whitespace-nowrap"
              style={{
                backgroundColor: `${card.color}15`,
                borderColor: `${card.color}40`,
                boxShadow: `0 4px 20px ${card.color}20`,
              }}
            >
              <span
                className="text-xs sm:text-sm font-bold tracking-tight"
                style={{ color: card.color }}
              >
                {card.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

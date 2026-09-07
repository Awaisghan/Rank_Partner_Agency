"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { Newspaper, TrendingUp, Search, CheckCircle2 } from "lucide-react";

export default function CoverageMomentumSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counters
  const [placementsCount, setPlacementsCount] = useState(0);
  const [readersCount, setReadersCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Smooth easeOutExpo curve for elegant counter animation
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setPlacementsCount(Math.floor(ease * 28));
      setReadersCount(Math.floor(ease * 320));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-[#f8fafc] py-20 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 border-t border-slate-200/80"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ============================================================ */}
          {/* LEFT COLUMN — Text & Feature List (col-span-7)               */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Section Tagline */}
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-[2px] bg-[#6d28d9] rounded-full" />
                <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#6d28d9] uppercase">
                  WHY IT WORKS
                </span>
              </div>
            </ScrollReveal>

            {/* Heading */}
            <ScrollReveal delay={100}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-[#0a0f1d] tracking-tight leading-[1.15] mb-5">
                Press coverage that builds{" "}
                <span className="italic font-serif font-normal text-[#6d28d9]">
                  lasting value.
                </span>
              </h2>
            </ScrollReveal>

            {/* Subtitle Paragraph */}
            <ScrollReveal delay={180}>
              <p className="text-[15px] sm:text-base text-[#64748b] leading-relaxed max-w-xl mb-10 font-normal">
                A quality press placement can do more than create a moment of visibility. It can strengthen your client’s credibility, support their online presence, and give them a published story they can continue to reference.
              </p>
            </ScrollReveal>

            {/* Feature List Items */}
            <div className="space-y-7">

              {/* Item 1 — Third-party credibility */}
              <ScrollReveal delay={240}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-[#6d28d9] stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1 tracking-tight">
                      Third-party credibility
                    </h3>
                    <p className="text-[14.5px] text-[#64748b] leading-relaxed font-normal">
                      Being featured by an established publication gives your client independent credibility that can strengthen how customers, partners, and prospects perceive their brand.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Item 2 — Lasting online visibility */}
              <ScrollReveal delay={320}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Search className="w-5 h-5 text-[#6d28d9] stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1 tracking-tight">
                      Lasting online visibility
                    </h3>
                    <p className="text-[14.5px] text-[#64748b] leading-relaxed font-normal">
                      Published articles can remain accessible long after they go live, giving your clients a lasting piece of online coverage to share and reference.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Item 3 — Proof that builds trust */}
              <ScrollReveal delay={400}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-[#6d28d9] stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0f172a] mb-1 tracking-tight">
                      Proof that builds trust
                    </h3>
                    <p className="text-[14.5px] text-[#64748b] leading-relaxed font-normal">
                      Use published coverage as social proof across websites, presentations, social media, and marketing materials to help turn attention into confidence.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN — Animated Graph Card (col-span-5)               */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal delay={200}>
              <div className="w-full max-w-[500px] bg-white rounded-3xl border border-slate-200/80 p-7 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] relative">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center">
                      <Newspaper className="w-4 h-4 text-[#6d28d9]" />
                    </div>
                    <span className="font-bold text-[#0f172a] text-sm sm:text-base tracking-tight">
                      Coverage momentum
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6d28d9] bg-[#eff6ff] px-3 py-1 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Building</span>
                  </div>
                </div>

                {/* SVG Line Graph Container */}
                <div className="w-full h-44 relative mb-6 overflow-hidden">
                  <svg
                    viewBox="0 0 450 160"
                    className="w-full h-full overflow-visible"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="coverageGraphGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Fill Under Line */}
                    <path
                      d="M 0,125 C 80,118 160,105 240,85 C 320,65 380,42 450,28 L 450,160 L 0,160 Z"
                      fill="url(#coverageGraphGrad)"
                      className="transition-opacity duration-1000 ease-out"
                      style={{ opacity: isVisible ? 1 : 0 }}
                    />

                    {/* Blue Animated Line */}
                    <path
                      d="M 0,125 C 80,118 160,105 240,85 C 320,65 380,42 450,28"
                      stroke="#6d28d9"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 550,
                        strokeDashoffset: isVisible ? 0 : 550,
                        transition: "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </svg>

                  {/* Baseline indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-100" />
                </div>

                {/* Bottom Stats Row */}
                <div className="grid grid-cols-2 gap-6 pt-5 border-t border-slate-100">
                  {/* Stat 1: Placements Live */}
                  <div>
                    <div className="text-3xl sm:text-[34px] font-extrabold text-[#0f172a] tracking-tight">
                      {placementsCount}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 tracking-[0.14em] uppercase mt-1">
                      PLACEMENTS LIVE
                    </div>
                  </div>

                  {/* Stat 2: Readers / MO */}
                  <div>
                    <div className="text-3xl sm:text-[34px] font-extrabold text-[#0f172a] tracking-tight">
                      {readersCount}
                      <span className="text-[#6d28d9]">K</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 tracking-[0.14em] uppercase mt-1">
                      READERS / MO
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

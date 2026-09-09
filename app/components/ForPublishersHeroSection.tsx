"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, Building2, Network } from "lucide-react";

export default function ForPublishersHeroSection() {
  const [centerCount, setCenterCount] = useState(0);
  const [agenciesCount, setAgenciesCount] = useState(0);
  const [pubsCount, setPubsCount] = useState(0);
  const [refusalPct, setRefusalPct] = useState(0);

  // Trigger count-up animations on page reload
  useEffect(() => {
    const duration = 2200;
    const stepTime = 30;
    const steps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Smooth cubic ease-out

      setCenterCount(Math.min(3000, Math.round(3000 * easeProgress)));
      setAgenciesCount(Math.min(3000, Math.round(3000 * easeProgress)));
      setPubsCount(Math.min(1500, Math.round(1500 * easeProgress)));
      setRefusalPct(Math.min(100, Math.round(100 * easeProgress)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative z-10 w-full flex flex-col overflow-hidden font-sans pt-36 pb-10 sm:pt-40 sm:pb-12 lg:justify-center lg:pt-24 lg:pb-16 lg:min-h-[85vh]"
    >
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Top Grid: Left Text Content & Right Network Node Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-6 sm:mb-8">

          {/* ============================================================ */}
          {/* LEFT COLUMN — Text Content & CTAs (col-span-6)               */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            
            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-xs sm:text-sm">
                  FOR PUBLISHERS
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h1 className="font-bold tracking-tight leading-[1.1] text-white text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px]">
                Turn your publishing inventory into new{" "}
                <span className="italic font-serif font-normal text-[#f59e0b]">
                  opportunities.
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle Paragraph */}
            <ScrollReveal delay={250}>
              <p className="text-slate-300 font-normal text-sm sm:text-base leading-relaxed max-w-xl">
                Connect your available publishing opportunities with agencies looking for quality placements. Work with RankPartner.io to reach agency clients and create a reliable channel for sponsored content and press placements.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={350}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <Link
                  href="/#get-in-touch"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
                >
                  <span>Partner with us</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>See how it works</span>
                </Link>
              </div>
            </ScrollReveal>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN — Network Hub Graphic with 7 Animated Lines     */}
          {/* ============================================================ */}
          <div className="hidden lg:flex lg:col-span-6 justify-end items-center relative w-full pt-6 lg:pt-0 transform lg:scale-[0.85] xl:scale-100 lg:origin-right">
            <ScrollReveal delay={200}>
              <div className="relative w-[540px] h-[440px] flex items-center justify-center">

                {/* ── SVG ANIMATED DASHED CONNECTING LINES ───────────── */}
                <svg
                  viewBox="0 0 540 440"
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                >
                  <defs>
                    <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.85" />
                    </filter>
                    <style>{`
                      @keyframes greenDashFlow {
                        from {
                          stroke-dashoffset: 24px;
                        }
                        to {
                          stroke-dashoffset: 0px;
                        }
                      }
                      .pub-dash-line {
                        stroke: #f59e0b;
                        stroke-width: 2.5;
                        stroke-dasharray: 12px 12px;
                        stroke-linecap: round;
                        fill: none;
                        filter: drop-shadow(0px 0px 3px rgba(245,158,11,0.85));
                        animation: greenDashFlow 1.2s linear infinite;
                      }
                    `}</style>
                  </defs>

                  {/* Line 1: Top Node -> Center Card Top */}
                  <path d="M 270 52 L 270 92" className="pub-dash-line" />
                  <circle cx="270" cy="52" r="3.5" fill="#f59e0b" />
                  <circle cx="270" cy="92" r="3.5" fill="#f59e0b" />

                  {/* Line 2: Top-Right Node -> Center Card Top-Right */}
                  <path d="M 456 76 L 382 114" className="pub-dash-line" />
                  <circle cx="456" cy="76" r="3.5" fill="#f59e0b" />
                  <circle cx="382" cy="114" r="3.5" fill="#f59e0b" />

                  {/* Line 3: Right Node -> Center Card Right Edge */}
                  <path d="M 488 220 L 382 220" className="pub-dash-line" />
                  <circle cx="488" cy="220" r="3.5" fill="#f59e0b" />
                  <circle cx="382" cy="220" r="3.5" fill="#f59e0b" />

                  {/* Line 4: Bottom-Right Node -> Center Card Bottom-Right */}
                  <path d="M 456 364 L 382 326" className="pub-dash-line" />
                  <circle cx="456" cy="364" r="3.5" fill="#f59e0b" />
                  <circle cx="382" cy="326" r="3.5" fill="#f59e0b" />

                  {/* Line 5: Bottom-Left Node -> Center Card Bottom-Left */}
                  <path d="M 84 364 L 158 326" className="pub-dash-line" />
                  <circle cx="84" cy="364" r="3.5" fill="#f59e0b" />
                  <circle cx="158" cy="326" r="3.5" fill="#f59e0b" />

                  {/* Line 6: Left Node -> Center Card Left Edge */}
                  <path d="M 52 220 L 158 220" className="pub-dash-line" />
                  <circle cx="52" cy="220" r="3.5" fill="#f59e0b" />
                  <circle cx="158" cy="220" r="3.5" fill="#f59e0b" />

                  {/* Line 7: Top-Left Node -> Center Card Top-Left */}
                  <path d="M 84 76 L 158 114" className="pub-dash-line" />
                  <circle cx="84" cy="76" r="3.5" fill="#f59e0b" />
                  <circle cx="158" cy="114" r="3.5" fill="#f59e0b" />
                </svg>

                {/* ── CENTER HUB CARD (3,000+ AGENCIES IN NETWORK) ─────── */}
                <div className="w-56 h-[256px] bg-[#071638]/95 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[0_25px_70px_rgba(0,0,0,0.65)] relative z-20 group hover:border-[#f59e0b]/60 transition-all duration-300">
                  
                  {/* Network Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[#0c2a21] border border-[#f59e0b]/40 text-[#f59e0b] flex items-center justify-center mb-2.5 shadow-[0_0_18px_rgba(245,158,11,0.25)]">
                    <Network className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  {/* 3,000+ Big Stat */}
                  <div className="text-4xl sm:text-[42px] font-extrabold text-white tracking-tight mb-1">
                    {centerCount.toLocaleString()}+
                  </div>

                  {/* Subtext */}
                  <div className="text-[9.5px] font-bold text-slate-400 tracking-[0.18em] uppercase max-w-[130px] leading-tight">
                    AGENCIES IN NETWORK
                  </div>

                </div>

                {/* ── 7 OUTER SATELLITE AGENCY SQUARES ─────────────────── */}

                {/* Top Node */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-11 h-11 bg-[#0a1836]/95 backdrop-blur-md border border-amber-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                </div>

                {/* Top-Right Node */}
                <div className="absolute top-8 right-10 z-20">
                  <div className="w-11 h-11 bg-[#0a1836]/95 backdrop-blur-md border border-amber-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                </div>

                {/* Right Node */}
                <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20">
                  <div className="w-11 h-11 bg-[#0a1836]/95 backdrop-blur-md border border-amber-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                </div>

                {/* Bottom-Right Node */}
                <div className="absolute bottom-8 right-10 z-20">
                  <div className="w-11 h-11 bg-[#0a1836]/95 backdrop-blur-md border border-amber-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                </div>

                {/* Bottom-Left Node */}
                <div className="absolute bottom-8 left-10 z-20">
                  <div className="w-11 h-11 bg-[#0a1836]/95 backdrop-blur-md border border-amber-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                </div>

                {/* Left Node */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20">
                  <div className="w-11 h-11 bg-[#0a1836]/95 backdrop-blur-md border border-amber-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                </div>

                {/* Top-Left Node */}
                <div className="absolute top-8 left-10 z-20">
                  <div className="w-11 h-11 bg-[#0a1836]/95 backdrop-blur-md border border-amber-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* ============================================================ */}
        {/* BOTTOM STATS BANNER CARD (3 BIG METRICS WITH COUNT-UP)       */}
        {/* ============================================================ */}
        <ScrollReveal delay={300}>
          <div className="w-full bg-[#06122e]/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
              
              {/* Metric 1: 3,000+ Agencies in the network */}
              <div className="md:pr-6 flex flex-col justify-center space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#f59e0b] tracking-tight">
                  {agenciesCount.toLocaleString()}+
                </div>
                <p className="text-slate-300 font-medium text-xs sm:text-sm">
                  Agencies in the network
                </p>
              </div>

              {/* Metric 2: 1,500+ Publications we work with */}
              <div className="pt-4 md:pt-0 md:px-6 flex flex-col justify-center space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#f59e0b] tracking-tight">
                  {pubsCount.toLocaleString()}+
                </div>
                <p className="text-slate-300 font-medium text-xs sm:text-sm">
                  Publications we work with
                </p>
              </div>

              {/* Metric 3: 100% First right of refusal */}
              <div className="pt-4 md:pt-0 md:pl-6 flex flex-col justify-center space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#f59e0b] tracking-tight">
                  {refusalPct}%
                </div>
                <p className="text-slate-300 font-medium text-xs sm:text-sm">
                  First right of refusal on every piece
                </p>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>

    </section>
  );
}



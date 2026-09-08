"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function ForAgenciesHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [avgDr, setAvgDr] = useState(0);
  const [drLift, setDrLift] = useState(0);
  const [placed, setPlaced] = useState(0);

  const [agenciesCount, setAgenciesCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [whiteLabelPct, setWhiteLabelPct] = useState(0);

  // Trigger animations on page load
  useEffect(() => {
    setIsLoaded(true);

    const duration = 2200;
    const stepTime = 30;
    const steps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Smooth cubic ease-out

      // Card stats
      setAvgDr(Math.min(71, Math.round(71 * easeProgress)));
      setDrLift(Math.min(23, Math.round(23 * easeProgress)));
      setPlaced(Math.min(43, Math.round(43 * easeProgress)));

      // Bottom banner stats
      setAgenciesCount(Math.min(3000, Math.round(3000 * easeProgress)));
      setArticlesCount(Math.min(150000, Math.round(150000 * easeProgress)));
      setWhiteLabelPct(Math.min(100, Math.round(100 * easeProgress)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Bar heights matching reference photo (in percentage)
  const barHeights = [32, 44, 38, 56, 74, 95];

  return (
    <section
      className="relative z-10 w-full flex flex-col overflow-hidden font-sans pt-36 pb-10 sm:pt-40 sm:pb-12 lg:justify-center lg:pt-24 lg:pb-16 lg:min-h-[85vh]"
    >
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">

        {/* Top Grid: Left Content & Right Report Mockup Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-6 sm:mb-8">

          {/* ============================================================ */}
          {/* LEFT COLUMN — Text Content & CTAs (col-span-5)               */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5">

            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-xs sm:text-sm">
                  FOR AGENCIES
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h1 className="font-bold tracking-tight leading-[1.1] text-white text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px]">
                Scale press and SEO authority for every{" "}
                <span className="italic font-serif font-normal text-[#f59e0b]">
                  client.
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle Paragraph */}
            <ScrollReveal delay={250}>
              <p className="text-slate-300 font-normal text-sm sm:text-base leading-relaxed max-w-xl">
                Give your agency access to quality press placements and authority backlinks you can resell under your own brand, with transparent pricing and a straightforward process.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={350}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
                >
                  <span>Talk to us</span>
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
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
          {/* RIGHT COLUMN — Wider White-Label Report Mockup Card          */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative w-full transform lg:scale-[0.85] xl:scale-100 lg:origin-right">
            <ScrollReveal delay={200} className="w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[550px]">

                {/* Stacked Card Background Shadow Layer (for depth) */}
                <div className="absolute inset-0 bg-[#061229]/60 rounded-[32px] translate-x-3 translate-y-3 -z-10 border border-slate-800/80 pointer-events-none" />

                {/* Main Card Container */}
                <div className="w-full bg-[#071630]/95 border border-slate-700/70 rounded-[28px] p-5 sm:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.65)] relative overflow-hidden flex flex-col gap-4.5">

                  {/* Header Row inside card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      {/* Square Green Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-[#f59e0b] text-[#062c19] font-extrabold text-base flex items-center justify-center shadow-md">
                        YA
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base sm:text-lg leading-tight">
                          Your Agency
                        </h4>
                        <p className="text-slate-400 text-xs font-normal mt-0.5">
                          Client coverage report
                        </p>
                      </div>
                    </div>

                    {/* WHITE-LABEL Badge */}
                    <div className="border border-amber-500/40 bg-[#0c241d] text-[#f59e0b] text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-full uppercase">
                      WHITE-LABEL
                    </div>
                  </div>

                  {/* ── BAR CHART CONTAINER (COMPACT HEIGHT) ────────────── */}
                  <div className="bg-[#051126]/90 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-[160px] sm:h-[190px] relative overflow-hidden">

                    {/* Top Bar Chart Labels */}
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-semibold">
                      <span className="text-slate-300">Authority growth</span>
                      <span className="text-[#f59e0b] font-mono text-[10px] sm:text-[11px] tracking-wider uppercase">
                        THIS QUARTER
                      </span>
                    </div>

                    {/* 6 ANIMATED SOLID/GRADIENT BARS */}
                    <div className="flex items-end justify-between gap-2 sm:gap-4 h-[90px] sm:h-[115px] pt-2">
                      {barHeights.map((targetH, idx) => (
                        <div
                          key={idx}
                          className="flex-1 h-full flex items-end justify-center"
                        >
                          <div
                            className="w-full bg-gradient-to-t from-[#f59e0b]/40 via-[#f59e0b]/90 to-[#f59e0b] rounded-xl transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                            style={{
                              height: isLoaded ? `${targetH}%` : "0%",
                              transitionDelay: `${150 + idx * 120}ms`,
                            }}
                          />
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* ── CARD BOTTOM STATS ROW (WITH COUNT-UP ANIMATION) ──── */}
                  <div className="grid grid-cols-3 gap-3.5">

                    {/* Stat 1: AVG. DR (0 -> 71) */}
                    <div className="bg-[#051126]/90 border border-slate-700/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-center">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {avgDr}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 tracking-[0.16em] uppercase mt-1">
                        AVG. DR
                      </div>
                    </div>

                    {/* Stat 2: DR LIFT (0 -> +23) */}
                    <div className="bg-[#051126]/90 border border-slate-700/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-center">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#f59e0b] tracking-tight">
                        +{drLift}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 tracking-[0.16em] uppercase mt-1">
                        DR LIFT
                      </div>
                    </div>

                    {/* Stat 3: PLACED (0 -> 43) */}
                    <div className="bg-[#051126]/90 border border-slate-700/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-center">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {placed}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 tracking-[0.16em] uppercase mt-1">
                        PLACED
                      </div>
                    </div>

                  </div>

                  {/* Subtext */}
                  <div className="text-[11px] text-slate-500 italic font-sans text-left">
                    Sample report. Figures shown are illustrative.
                  </div>

                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* ============================================================ */}
        {/* BOTTOM STATS BANNER CARD (COMPACT 3 BIG METRICS WITH COUNT-UP) */}
        {/* ============================================================ */}
        <ScrollReveal delay={300}>
          <div className="w-full bg-[#06122e]/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
              
              {/* Metric 1: 3,000+ Agencies */}
              <div className="md:pr-6 flex flex-col justify-center space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#f59e0b] tracking-tight">
                  {agenciesCount.toLocaleString()}+
                </div>
                <p className="text-slate-300 font-medium text-xs sm:text-sm">
                  Agencies on the platform
                </p>
              </div>

              {/* Metric 2: 150,000+ Articles published */}
              <div className="pt-4 md:pt-0 md:px-6 flex flex-col justify-center space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#f59e0b] tracking-tight">
                  {articlesCount.toLocaleString()}+
                </div>
                <p className="text-slate-300 font-medium text-xs sm:text-sm">
                  Articles published
                </p>
              </div>

              {/* Metric 3: 100% White-labeled */}
              <div className="pt-4 md:pt-0 md:pl-6 flex flex-col justify-center space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#f59e0b] tracking-tight">
                  {whiteLabelPct}%
                </div>
                <p className="text-slate-300 font-medium text-xs sm:text-sm">
                  White-labeled to your brand
                </p>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

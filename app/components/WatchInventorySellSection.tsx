"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { Layers, Network, RefreshCw, Check } from "lucide-react";

export default function WatchInventorySellSection() {
  const [inView, setInView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filledRectangles, setFilledRectangles] = useState(0);
  const [filledCircles, setFilledCircles] = useState(0);
  const [pctSold, setPctSold] = useState(0);
  const [agenciesReached, setAgenciesReached] = useState(0);
  const [revenueBooked, setRevenueBooked] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const TOTAL_RECTANGLES = 12;
  const TOTAL_CIRCLES = 55;

  const clearAllTimers = () => {
    if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
  };

  const startAnimation = () => {
    clearAllTimers();
    setIsAnimating(true);
    setFilledRectangles(0);
    setFilledCircles(0);
    setPctSold(0);
    setAgenciesReached(0);
    setRevenueBooked(0);

    const duration = 2500;
    const stepTime = 30;
    const steps = duration / stepTime;
    let step = 0;

    stepIntervalRef.current = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 2);

      setFilledRectangles(Math.min(TOTAL_RECTANGLES, Math.round(TOTAL_RECTANGLES * easeProgress)));
      setFilledCircles(Math.min(TOTAL_CIRCLES, Math.round(TOTAL_CIRCLES * easeProgress)));
      setPctSold(Math.min(100, Math.round(100 * easeProgress)));
      setAgenciesReached(Math.min(50, Math.round(50 * easeProgress)));
      setRevenueBooked(Math.min(14400, Math.round(14400 * easeProgress)));

      if (step >= steps) {
        if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
        setFilledRectangles(TOTAL_RECTANGLES);
        setFilledCircles(TOTAL_CIRCLES);
        setPctSold(100);
        setAgenciesReached(50);
        setRevenueBooked(14400);
        setIsAnimating(false);

        // Auto re-run animation every 5 seconds continuously
        loopTimeoutRef.current = setTimeout(() => {
          startAnimation();
        }, 5000);
      }
    }, stepTime);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          startAnimation();
        } else {
          setInView(false);
          clearAllTimers();
          setIsAnimating(false);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      clearAllTimers();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-gray-900 py-24 sm:py-32 relative z-10 font-sans border-t border-slate-100 overflow-hidden"
    >
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Top Header Centered */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="w-6 h-[2px] bg-violet-700 rounded-full" />
              <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs sm:text-sm">
                SEE IT IN ACTION
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h2 className="font-extrabold tracking-tight leading-tight text-gray-900 text-3xl sm:text-4xl lg:text-[46px] mb-5">
              Watch your inventory{" "}
              <span className="italic font-serif font-normal text-[#6d28d9]">
                reach new buyers.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <p className="text-slate-500 font-normal text-base sm:text-lg leading-relaxed">
              Connect your publishing inventory with agencies looking for quality placements and sponsored content through RankPartner.io.
            </p>
          </ScrollReveal>
        </div>

        {/* Console Mockup Card */}
        <ScrollReveal delay={300}>
          <div className="bg-[#050e26] rounded-3xl p-6 sm:p-9 border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.55)] max-w-4xl mx-auto text-white relative overflow-hidden">
            
            {/* Ambient Background Glow inside Console */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

            {/* Console Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-800/80">
              <div>
                <span className="text-[11px] font-extrabold tracking-[0.22em] text-amber-400 uppercase block mb-1">
                  INVENTORY ENGINE
                </span>
                <p className="text-slate-400 text-xs sm:text-sm font-normal">
                  Connect your available publishing inventory with agencies looking for quality placement opportunities.
                </p>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-[#0c2a1d] border border-amber-500/40 text-amber-400 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-[0_0_16px_rgba(245,158,11,0.2)]">
                <span className={`w-2 h-2 rounded-full bg-amber-400 ${isAnimating ? "animate-ping" : ""}`} />
                <span>{isAnimating ? "Selling" : "Active"}</span>
              </div>
            </div>

            {/* ── SECTION 1: YOUR INVENTORY (12 RECTANGLES) ─────────────── */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm sm:text-base">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Your inventory</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  <span className="text-amber-400 font-bold">{filledRectangles}</span>/12 placements sold
                </div>
              </div>

              {/* 2 Rows of 6 Rectangles */}
              <div className="grid grid-cols-6 gap-2.5 sm:gap-3.5">
                {Array.from({ length: TOTAL_RECTANGLES }).map((_, idx) => {
                  const isFilled = idx < filledRectangles;
                  const isCurrentFilling = idx === filledRectangles && isAnimating;

                  return (
                    <div
                      key={idx}
                      className={`h-12 sm:h-14 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                        isFilled
                          ? "bg-[#f59e0b] border-[#f59e0b] text-[#062c19] shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-100"
                          : isCurrentFilling
                          ? "bg-[#4a8044]/60 border-amber-500/60 text-amber-200 animate-pulse"
                          : "bg-slate-900/80 border-slate-800 text-transparent"
                      }`}
                    >
                      {isFilled && <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── SECTION 2: RANKPARTNER CENTER DIVIDER BADGE ───────────────── */}
            <div className="relative my-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              
              <div className="relative z-10 bg-[#092218] border border-amber-500/40 text-amber-400 px-5 py-2 rounded-full flex items-center gap-2 text-xs font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                <Network className="w-4 h-4 stroke-[2.5]" />
                <span className="tracking-widest">RANKPARTNER.IO</span>
              </div>
            </div>

            {/* ── SECTION 3: AGENCY NETWORK (55 CIRCLES) ───────────────── */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm sm:text-base">
                  <Network className="w-4 h-4 text-amber-400" />
                  <span>Agency network</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  50+ agencies
                </div>
              </div>

              {/* 5 Rows of 11 Circles - Spans Full Section Width with Large Circles */}
              <div className="w-full grid grid-cols-11 gap-1 sm:gap-2.5 justify-items-center">
                {Array.from({ length: TOTAL_CIRCLES }).map((_, idx) => {
                  const isFilled = idx < filledCircles;

                  return (
                    <div
                      key={idx}
                      className={`w-4 h-4 min-[380px]:w-5 min-[380px]:h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-[56px] lg:h-[56px] rounded-full transition-all duration-300 ${
                        isFilled
                          ? "bg-[#f59e0b] shadow-[0_0_14px_rgba(245,158,11,0.5)] scale-100"
                          : "bg-slate-800/80 border border-slate-700/40 scale-95"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* ── SECTION 4: BOTTOM STATS & INTERACTIVE RUN AGAIN BUTTON ── */}
            <div className="border-t border-slate-800/80 pt-6 mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 mb-8 sm:mb-6 text-center sm:text-left">
                {/* Stat 1 */}
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {pctSold}%
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
                    Inventory sold
                  </div>
                </div>

                {/* Stat 2 */}
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#f59e0b] tracking-tight">
                    {agenciesReached.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
                    Agencies reached
                  </div>
                </div>

                {/* Stat 3 */}
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#f59e0b] tracking-tight">
                    ${revenueBooked.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
                    Revenue booked
                  </div>
                </div>
              </div>

              {/* Action Button & Disclaimer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={startAnimation}
                  disabled={isAnimating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#88e373] active:scale-95 text-[#062c19] font-extrabold px-6 py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 stroke-[2.5] ${isAnimating ? "animate-spin" : ""}`} />
                  <span>{isAnimating ? "Selling..." : "Run again"}</span>
                </button>

                <p className="text-slate-500 text-xs text-center sm:text-right font-normal">
                  Interactive demo. Revenue figures and other metrics shown are for illustration purposes only.
                </p>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { Building2 } from "lucide-react";

export default function SeeItInActionSection() {
  const [inView, setInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeClientsCount, setActiveClientsCount] = useState(0);
  const [placementsCount, setPlacementsCount] = useState(0);
  const [avgLiftCount, setAvgLiftCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const startAnimation = () => {
    setIsAnimating(false);
    setActiveClientsCount(0);
    setPlacementsCount(0);
    setAvgLiftCount(0);
    setAnimKey((prev) => prev + 1);

    setTimeout(() => {
      setIsAnimating(true);

      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 2);

        setActiveClientsCount(Math.min(4, Math.round(4 * easeProgress)));
        setPlacementsCount(Math.min(43, Math.round(43 * easeProgress)));
        setAvgLiftCount(Math.min(15, Math.round(15 * easeProgress)));

        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepTime);
    }, 60);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          startAnimation();
        } else {
          setInView(false);
          setIsAnimating(false);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const clientRows = [
    { name: "Publisher One", placements: "12 placements", dr: "DR 72", fillPct: 100, delay: 100 },
    { name: "Publisher Two", placements: "9 placements", dr: "DR 68", fillPct: 100, delay: 250 },
    { name: "Publisher Three", placements: "15 placements", dr: "DR 81", fillPct: 100, delay: 400 },
    { name: "Publisher Four", placements: "7 placements", dr: "DR 65", fillPct: 100, delay: 550 },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-gray-900 py-24 sm:py-32 relative z-10 font-sans border-t border-slate-100"
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
              Everything your agency needs,{" "}
              <span className="italic font-serif font-normal text-[#6d28d9]">
                in one place.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed">
              Explore publishers, review placement details, choose the right opportunities, and submit content for your clients—all through RankPartner.io.
            </p>
          </ScrollReveal>
        </div>

        {/* Outer Dark Agency Console Banner Card Container */}
        <ScrollReveal delay={200}>
          <div className="w-full max-w-[860px] mx-auto bg-[#040d21] border border-slate-800/90 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.5)] relative overflow-hidden text-white font-sans">
            
            {/* Console Header Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 pb-6 border-b border-slate-800/80 mb-6">
              <div>
                <div className="text-[#f59e0b] font-mono text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
                  AGENCY CONSOLE
                </div>
                <p className="text-slate-400 text-xs sm:text-sm font-normal">
                  Your clients’ press and SEO opportunities, managed under your brand.
                </p>
              </div>

              {/* Explore Publishers Badge */}
              <div className="bg-[#0a261c] border border-amber-500/40 text-amber-400 text-xs font-semibold px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                <span>Explore publishers</span>
              </div>
            </div>

            {/* Your Agency Header Bar Box */}
            <div className="bg-[#071738]/80 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f59e0b] text-[#062c19] font-extrabold text-xs flex items-center justify-center shadow-md">
                  YA
                </div>
                <h4 className="text-white font-bold text-sm sm:text-base">
                  Your Agency
                </h4>
              </div>

              <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
                WHITE-LABEL
              </span>
            </div>

            {/* 4 CLIENT ROWS WITH ANIMATED SMOOTH GREEN PROGRESS LINES */}
            <div key={animKey} className="space-y-3.5 mb-8">
              {clientRows.map((row, idx) => (
                <div
                  key={idx}
                  className="bg-[#071738]/70 border border-slate-800/80 rounded-2xl p-4 sm:p-4.5 flex flex-col gap-3 group transition-all duration-300 hover:border-slate-700"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80 text-slate-300 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-white font-bold text-sm sm:text-base">
                        {row.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pl-11 sm:pl-0">
                      <span className="text-slate-400 text-xs font-medium">
                        {row.placements}
                      </span>
                      <span className="bg-[#0c241d] border border-amber-500/40 text-[#f59e0b] text-xs font-extrabold px-2.5 py-1 rounded-md">
                        {row.dr}
                      </span>
                    </div>
                  </div>

                  {/* Animated Green Line Track */}
                  <div className="w-full bg-slate-900/90 rounded-full h-2 overflow-hidden relative p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#f59e0b] to-[#f59e0b] rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                      style={{
                        width: isAnimating ? `${row.fillPct}%` : "0%",
                        transitionDelay: `${row.delay}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Divider */}
            <div className="border-t border-slate-800/80 pt-6 mb-6">
              {/* Bottom 3 Count-Up Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center sm:text-left">
                
                {/* Stat 1: 4 Client campaigns */}
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-white tracking-tight">
                    {activeClientsCount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.16em] uppercase">
                    Client campaigns
                  </div>
                </div>

                {/* Stat 2: 43 Placements completed */}
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-[#f59e0b] tracking-tight">
                    {placementsCount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.16em] uppercase">
                    Placements completed
                  </div>
                </div>

                {/* Stat 3: +15 Authority growth */}
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-[#f59e0b] tracking-tight">
                    +{avgLiftCount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.16em] uppercase">
                    Authority growth
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Row: "Run it again" Button & Disclaimer text */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <button
                onClick={startAnimation}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:py-3 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-sm transition-all duration-300 shadow-[0_0_22px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                Run it again
              </button>

              <p className="text-slate-400 text-xs font-normal max-w-md text-center sm:text-left">
                Interactive demo. Client names, metrics, and figures shown are for illustration purposes only.
              </p>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

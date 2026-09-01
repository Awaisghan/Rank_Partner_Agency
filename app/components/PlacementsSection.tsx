"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Tag } from "lucide-react";

// Full List of Publications from Hero Sphere & Media outlets
const BRAND_DATA = [
  { letter: "W", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)", name: "WSJ", dr: 93 },
  { letter: "E", color: "#4ade80", bg: "rgba(74, 222, 128, 0.15)", name: "Entrepreneur", dr: 91 },
  { letter: "C", color: "#60a5fa", bg: "rgba(96, 165, 250, 0.15)", name: "CNBC", dr: 92 },
  { letter: "F", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", name: "Fast Company", dr: 90 },
  { letter: "R", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", name: "Reuters", dr: 95 },
  { letter: "F", color: "#a855f7", bg: "rgba(168, 85, 247, 0.15)", name: "Forbes", dr: 94 },
  { letter: "M", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)", name: "MarketWatch", dr: 92 },
  { letter: "B", color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)", name: "Bloomberg", dr: 93 },
  { letter: "T", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", name: "TIME", dr: 95 },
];

// 4 Pipeline Stages
const STAGE_CONFIG = [
  { step: 1, label: "Pitched", color: "text-slate-400", bg: "bg-slate-800/80", border: "border-slate-700/60" },
  { step: 2, label: "Drafted", color: "text-blue-400", bg: "bg-blue-950/60", border: "border-blue-700/50" },
  { step: 3, label: "In review", color: "text-amber-400", bg: "bg-amber-950/60", border: "border-amber-700/50" },
  { step: 4, label: "Published", color: "text-[#4ade80]", bg: "bg-emerald-950/60", border: "border-emerald-500/50" },
];

export default function PlacementsSection() {
  const [isInView, setIsInView] = useState(false);
  
  // Right Card State: DR Value + Point Reveal States (Re-animates every 4s)
  const [drValue, setDrValue] = useState(48);
  const [isLineDrawing, setIsLineDrawing] = useState(false);
  const [activePt, setActivePt] = useState(0); // 0 to 4

  // Left Card Pipeline State: current stage (1..4) + queue index + sliding state
  const [topRowStage, setTopRowStage] = useState(1);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // =========================================================================
  // RIGHT CARD: Line Draws & Badges Pop-In Exactly As Line Reaches Each Point!
  // =========================================================================
  useEffect(() => {
    if (!isInView) return;

    const runRightCardAnimation = () => {
      // Reset line & points first
      setIsLineDrawing(false);
      setActivePt(0);
      setDrValue(48);

      // Trigger line drawing & DR counter
      setTimeout(() => {
        setIsLineDrawing(true);

        let currentDr = 48;
        const drInterval = setInterval(() => {
          currentDr += 1;
          setDrValue(currentDr);
          if (currentDr >= 72) clearInterval(drInterval);
        }, 45);

        // Synced Point Arrival Reveals (Line reaches Pt1 at 350ms, Pt2 at 750ms, Pt3 at 1200ms, Pt4 at 1650ms)
        setTimeout(() => setActivePt(1), 350);
        setTimeout(() => setActivePt(2), 750);
        setTimeout(() => setActivePt(3), 1200);
        setTimeout(() => setActivePt(4), 1650);
      }, 60);
    };

    // Run immediately once in view
    runRightCardAnimation();

    // Re-trigger every 4.2 seconds continuously
    const rightLoop = setInterval(() => {
      runRightCardAnimation();
    }, 4200);

    return () => clearInterval(rightLoop);
  }, [isInView]);

  // =========================================================================
  // LEFT CARD: Step-by-Step Point Progress -> Ultra Smooth Scroll Up when Completed!
  // =========================================================================
  useEffect(() => {
    if (!isInView) return;

    const pipelineTimer = setInterval(() => {
      setTopRowStage((prevStage) => {
        if (prevStage < 4) {
          return prevStage + 1;
        } else {
          // When Stage 4 (Published) is completed, trigger ultra-smooth slide-up
          setIsSliding(true);
          
          setTimeout(() => {
            setQueueIndex((prevIdx) => (prevIdx + 1) % BRAND_DATA.length);
            setTopRowStage(1);
            setIsSliding(false);
          }, 650); // 650ms seamless transition duration

          return 4;
        }
      });
    }, 1500); // 1.5s per step pacing

    return () => clearInterval(pipelineTimer);
  }, [isInView]);

  // Active 4 items in pipeline queue (4th item slides into view when top item exits!)
  const brand1 = BRAND_DATA[queueIndex % BRAND_DATA.length];
  const brand2 = BRAND_DATA[(queueIndex + 1) % BRAND_DATA.length];
  const brand3 = BRAND_DATA[(queueIndex + 2) % BRAND_DATA.length];
  const brand4 = BRAND_DATA[(queueIndex + 3) % BRAND_DATA.length];

  // Up Next brands in queue
  const upNext1 = BRAND_DATA[(queueIndex + 4) % BRAND_DATA.length].name;
  const upNext2 = BRAND_DATA[(queueIndex + 5) % BRAND_DATA.length].name;
  const upNext3 = BRAND_DATA[(queueIndex + 6) % BRAND_DATA.length].name;

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-[1550px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ========================================================================= */}
        {/* LEFT CARD: DARK NAVY PIPELINE (lg:col-span-8)                             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 bg-[#07132b] rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-2xl border border-slate-800/80 min-h-[540px]">
          {/* Header Text */}
          <div className="mb-6">
            <h3 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-[1.15] mb-3">
              Placements in the outlets your clients{" "}
              <span className="italic font-serif font-normal text-[#4ade80]">actually know</span>
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              You choose the publications. We handle pitching through to publishing, at one flat price per placement.
            </p>
          </div>

          {/* Inner Placement Pipeline Card */}
          <div className="bg-[#0b1b3d]/90 border border-slate-700/50 rounded-2xl p-5 sm:p-6 shadow-inner flex flex-col justify-between flex-1 gap-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                PLACEMENT PIPELINE
              </span>
              <div className="flex items-center gap-2 bg-[#0d224b] border border-emerald-500/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_8px_#4ade80]" />
                <span className="text-xs font-semibold text-[#4ade80]">Live</span>
              </div>
            </div>

            {/* Pipeline Rows Container (Fixed height showing 3 rows, 4th incoming item pre-rendered) */}
            <div className="relative h-[235px] overflow-hidden my-auto">
              <div
                className="flex flex-col gap-3 absolute w-full left-0 top-0"
                style={{
                  transform: isSliding ? "translateY(-78px)" : "translateY(0px)",
                  transition: isSliding ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
                }}
              >
                {/* --- ROW 1 (Top Active Animating Row) --- */}
                {(() => {
                  const currentStageInfo = STAGE_CONFIG[topRowStage - 1];
                  const linePercent = ((topRowStage - 1) / 3) * 100;

                  return (
                    <div
                      key={`row1-${brand1.name}`}
                      className="flex items-center gap-4 py-2.5 border-b border-slate-800/60 h-[66px]"
                    >
                      {/* Avatar */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0"
                        style={{
                          backgroundColor: brand1.bg,
                          color: brand1.color,
                          border: `1px solid ${brand1.color}40`,
                        }}
                      >
                        {brand1.letter}
                      </div>

                      {/* Name + DR Badge + Line underneath */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        {/* Top Line: Name + DR + Status Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-base tracking-tight">{brand1.name}</span>
                            <span className="text-[10px] font-medium text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/60">
                              DR {brand1.dr}
                            </span>
                          </div>

                          {/* Status Badge on Right */}
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 border ${currentStageInfo.bg} ${currentStageInfo.color} ${currentStageInfo.border}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  topRowStage === 4 ? "bg-[#4ade80] animate-ping" : "bg-current"
                                }`}
                              />
                              <span>{currentStageInfo.label}</span>
                            </div>
                            {topRowStage === 4 && (
                              <ArrowUpRight className="w-4 h-4 text-[#4ade80]" />
                            )}
                          </div>
                        </div>

                        {/* Bottom Line: Compact 4-Dot Progress Line UNDER Company Name */}
                        <div className="w-full max-w-[180px] sm:max-w-[210px] relative h-2.5 flex items-center justify-between">
                          <div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[1.5px] bg-slate-700/80 z-0" />
                          
                          <div
                            className="absolute left-1 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#4ade80] transition-all duration-500 ease-in-out z-0"
                            style={{
                              width: `calc(${linePercent}% - 2px)`,
                              boxShadow: "0 0 6px rgba(74, 222, 128, 0.8)",
                            }}
                          />

                          {[1, 2, 3, 4].map((dotStep) => {
                            const isFilled = dotStep <= topRowStage;
                            const isCurrentActiveDot = dotStep === topRowStage;

                            return (
                              <div
                                key={dotStep}
                                className={`w-2 h-2 rounded-full relative z-10 transition-all duration-300 ${
                                  isFilled
                                    ? isCurrentActiveDot
                                      ? "bg-[#4ade80] ring-2 ring-[#0b1b3d] scale-125 shadow-[0_0_8px_#4ade80]"
                                      : "bg-[#4ade80] ring-2 ring-[#0b1b3d]"
                                    : "bg-slate-600 ring-2 ring-[#0b1b3d]"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* --- ROW 2 --- */}
                <div key={`row2-${brand2.name}`} className="flex items-center gap-4 py-2.5 border-b border-slate-800/60 h-[66px]">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: brand2.bg,
                      color: brand2.color,
                      border: `1px solid ${brand2.color}40`,
                    }}
                  >
                    {brand2.letter}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-base tracking-tight">{brand2.name}</span>
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/60">
                          DR {brand2.dr}
                        </span>
                      </div>

                      <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-slate-800/80 text-slate-400 border border-slate-700/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Pitched</span>
                      </div>
                    </div>

                    <div className="w-full max-w-[180px] sm:max-w-[210px] relative h-2.5 flex items-center justify-between">
                      <div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[1.5px] bg-slate-700/80 z-0" />
                      {[1, 2, 3, 4].map((dotStep) => (
                        <div
                          key={dotStep}
                          className={`w-2 h-2 rounded-full relative z-10 ${
                            dotStep === 1
                              ? "bg-[#4ade80] ring-2 ring-[#0b1b3d]"
                              : "bg-slate-600 ring-2 ring-[#0b1b3d]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- ROW 3 --- */}
                <div key={`row3-${brand3.name}`} className="flex items-center gap-4 py-2.5 border-b border-slate-800/60 h-[66px]">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: brand3.bg,
                      color: brand3.color,
                      border: `1px solid ${brand3.color}40`,
                    }}
                  >
                    {brand3.letter}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-base tracking-tight">{brand3.name}</span>
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/60">
                          DR {brand3.dr}
                        </span>
                      </div>

                      <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-slate-800/80 text-slate-400 border border-slate-700/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Pitched</span>
                      </div>
                    </div>

                    <div className="w-full max-w-[180px] sm:max-w-[210px] relative h-2.5 flex items-center justify-between">
                      <div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[1.5px] bg-slate-700/80 z-0" />
                      {[1, 2, 3, 4].map((dotStep) => (
                        <div
                          key={dotStep}
                          className={`w-2 h-2 rounded-full relative z-10 ${
                            dotStep === 1
                              ? "bg-[#4ade80] ring-2 ring-[#0b1b3d]"
                              : "bg-slate-600 ring-2 ring-[#0b1b3d]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- ROW 4 (Incoming item sliding smoothly from bottom) --- */}
                <div key={`row4-${brand4.name}`} className="flex items-center gap-4 py-2.5 h-[66px]">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: brand4.bg,
                      color: brand4.color,
                      border: `1px solid ${brand4.color}40`,
                    }}
                  >
                    {brand4.letter}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-base tracking-tight">{brand4.name}</span>
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/60">
                          DR {brand4.dr}
                        </span>
                      </div>

                      <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-slate-800/80 text-slate-400 border border-slate-700/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Pitched</span>
                      </div>
                    </div>

                    <div className="w-full max-w-[180px] sm:max-w-[210px] relative h-2.5 flex items-center justify-between">
                      <div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[1.5px] bg-slate-700/80 z-0" />
                      {[1, 2, 3, 4].map((dotStep) => (
                        <div
                          key={dotStep}
                          className={`w-2 h-2 rounded-full relative z-10 ${
                            dotStep === 1
                              ? "bg-[#4ade80] ring-2 ring-[#0b1b3d]"
                              : "bg-slate-600 ring-2 ring-[#0b1b3d]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-700/50 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold tracking-wider uppercase text-[11px]">
                  UP NEXT
                </span>
                <div className="flex items-center gap-1.5">
                  {[upNext1, upNext2, upNext3].map((brand) => (
                    <span
                      key={brand}
                      className="bg-slate-800/90 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-700/50"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[#4ade80] font-medium mt-2 sm:mt-0">
                <Tag className="w-3.5 h-3.5" />
                <span>One flat price per placement</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT CARD: LIGHT GRAY AUTHORITY CHART (Re-animates every 4 Seconds!)       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-[#f8fafc] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200/80 shadow-sm min-h-[540px]">
          {/* Header Text */}
          <div className="mb-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-[1.2] mb-2">
              Authority that{" "}
              <span className="italic font-serif font-normal text-blue-600">adds up</span>
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs">
              High-authority backlinks with every placement. A year of them compounds like this.
            </p>
          </div>

          {/* Inner White Chart Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-md flex flex-col justify-between flex-1">
            {/* Top Metric Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  Domain Rating
                </span>
                <div className="text-5xl font-black text-slate-900 mt-1 tracking-tight">
                  {drValue}
                </div>
              </div>
              <div className="flex items-center gap-1 text-blue-600 font-extrabold text-sm pt-1">
                <span className="text-xs">↗</span>
                <span>+24</span>
              </div>
            </div>

            {/* Line Chart Area with SVG (Draws from left to right every 4 seconds) */}
            <div className="relative w-full h-[150px] my-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                <defs>
                  {/* Blue Gradient Area Fill */}
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Filled Gradient Area */}
                <path
                  d="M 15,95 L 60,82 L 130,65 L 210,48 L 285,25 L 285,115 L 15,115 Z"
                  fill="url(#blueGradient)"
                  className="transition-opacity duration-1000 ease-out"
                  style={{ opacity: isLineDrawing ? 1 : 0 }}
                />

                {/* Main Blue Trend Curve Line (Draws from left to right smoothly) */}
                <path
                  d="M 15,95 C 45,88 50,83 60,82 C 100,75 110,68 130,65 C 170,58 190,52 210,48 C 245,40 270,30 285,25"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: isLineDrawing ? 0 : 400,
                    transition: isLineDrawing ? "stroke-dashoffset 1.8s ease-out" : "none",
                  }}
                />

                {/* Point Circles & Badges (Synchronized with Blue Line Movement) */}
                {/* 1. USA TODAY */}
                <g className={`transition-all duration-300 transform ${activePt >= 1 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-2"}`}>
                  <circle cx="60" cy="82" r="4.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  <foreignObject x="25" y="56" width="70" height="24">
                    <div className="bg-white border border-slate-200 rounded px-1 py-0.5 text-[8px] font-bold text-blue-600 shadow-sm text-center">
                      USA TODAY
                    </div>
                  </foreignObject>
                </g>

                {/* 2. Benzinga */}
                <g className={`transition-all duration-300 transform ${activePt >= 2 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-2"}`}>
                  <circle cx="130" cy="65" r="4.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  <foreignObject x="100" y="38" width="60" height="24">
                    <div className="bg-white border border-slate-200 rounded px-1 py-0.5 text-[8px] font-bold text-slate-800 shadow-sm text-center">
                      Benzinga
                    </div>
                  </foreignObject>
                </g>

                {/* 3. INSIDER */}
                <g className={`transition-all duration-300 transform ${activePt >= 3 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-2"}`}>
                  <circle cx="210" cy="48" r="4.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  <foreignObject x="180" y="22" width="55" height="24">
                    <div className="bg-white border border-slate-200 rounded px-1 py-0.5 text-[8px] font-bold text-slate-800 shadow-sm text-center">
                      INSIDER
                    </div>
                  </foreignObject>
                </g>

                {/* 4. Axios */}
                <g className={`transition-all duration-300 transform ${activePt >= 4 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-2"}`}>
                  <circle cx="285" cy="25" r="5.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  <foreignObject x="255" y="0" width="50" height="24">
                    <div className="bg-white border border-slate-200 rounded px-1 py-0.5 text-[8px] font-bold text-slate-800 shadow-sm text-center">
                      Axios
                    </div>
                  </foreignObject>
                </g>
              </svg>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
              <span className="tracking-widest uppercase text-[10px]">12-MONTH BUILD</span>
              <span className="text-slate-600 font-bold">4/4 placements live</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

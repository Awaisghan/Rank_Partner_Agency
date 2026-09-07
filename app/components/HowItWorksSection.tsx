"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { UserPlus, ClipboardList, Upload, SearchCheck, Newspaper } from "lucide-react";

// Pure CSS calc() positioning — no DOM measurement needed.
// Grid: 5 cols, gap-6 (24px). Icon: w-14 (56px), left-aligned → center at col_left + 28px
// col_width = (100% - 4*24px) / 5 = (100% - 96px) / 5
//
// Icon center X of column N:  N * ((100%-96px)/5 + 24px) + 28px
//   col0: 28px
//   col1: (100%-96px)/5 + 52px
//   col2: 2*(100%-96px)/5 + 76px
//   col3: 3*(100%-96px)/5 + 100px
//   col4: 4*(100%-96px)/5 + 124px
//
// Line left: 28px (col0 center)
// Line width to colN: col_N_center - 28px
// Dot left: col_N_center   (with translateX(-50%) to center the 12px dot)

const LINE_LEFT = "28px";
const TOTAL_LINE_WIDTH = "calc(4 * (100% - 96px) / 5 + 96px)";

const LINE_WIDTHS = [
  "0px",
  "calc((100% - 96px) / 5 + 24px)",
  "calc(2 * (100% - 96px) / 5 + 48px)",
  "calc(3 * (100% - 96px) / 5 + 72px)",
  "calc(4 * (100% - 96px) / 5 + 96px)",
];

const DOT_LEFTS = [
  "28px",
  "calc((100% - 96px) / 5 + 52px)",
  "calc(2 * (100% - 96px) / 5 + 76px)",
  "calc(3 * (100% - 96px) / 5 + 100px)",
  "calc(4 * (100% - 96px) / 5 + 124px)",
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Contact our team",
      description: "Get in touch with RankPartner.io to request access to the platform.",
    },
    {
      number: "02",
      icon: ClipboardList,
      title: "Explore publishers",
      description: "Use your account to browse available publishers, review their details and metrics, and choose the right opportunity.",
    },
    {
      number: "03",
      icon: Upload,
      title: "Submit Your Content via Email",
      description: "Submit your article via email and required information through the platform for your selected publisher.",
    },
    {
      number: "04",
      icon: SearchCheck,
      title: "Order review",
      description: "Our team reviews your submission, checks the requirements, and coordinates the order with the selected publisher.",
    },
    {
      number: "05",
      icon: Newspaper,
      title: "Article published",
      description: "Once approved, your article is published on the selected publication with the agreed placement and backlink.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [inView, steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-[#f8fafc] py-10 sm:py-14 px-6 sm:px-10 lg:px-16 xl:px-20 border-t border-slate-200/60 font-sans"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="w-full bg-[#050e26] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-9 md:p-11 lg:p-14 shadow-[0_25px_80px_-15px_rgba(4,12,30,0.55)] border border-slate-800/80 relative overflow-hidden text-white">

          {/* Glows */}
          <div className="absolute top-0 right-1/3 w-[500px] h-[250px] bg-[#f59e0b]/5 blur-[130px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[250px] bg-violet-700/5 blur-[140px] pointer-events-none rounded-full" />

          {/* Tagline */}
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4 relative z-10">
              <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
              <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#f59e0b] uppercase">
                HOW IT WORKS
              </span>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.12] mb-3 relative z-10">
              From choosing a publisher to{" "}
              <span className="italic font-serif font-normal text-[#f59e0b]">getting published.</span>
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={200}>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-12 sm:mb-16 font-normal relative z-10">
              Getting your content published through RankPartner.io is simple. Contact our team, access your account, choose the right publisher, and submit your content while we handle the review and publication process.
            </p>
          </ScrollReveal>

          {/* Steps + line overlay */}
          <div className="relative z-10">

            {/* Static grey line: col0 center → col4 center */}
            <div
              className="hidden lg:block absolute top-[28px] h-[1.5px] bg-slate-800 z-0 pointer-events-none"
              style={{ left: LINE_LEFT, width: TOTAL_LINE_WIDTH }}
            />

            {/* Animated green progress line */}
            <div
              className="hidden lg:block absolute top-[28px] h-[2px] bg-[#f59e0b] z-0 pointer-events-none transition-all duration-700 ease-out shadow-[0_0_10px_#f59e0b]"
              style={{ left: LINE_LEFT, width: LINE_WIDTHS[activeStep] }}
            />

            {/* Glowing pulser dot — translateX(-50%) centers the 12px dot on icon center */}
            <div
              className="hidden lg:block absolute top-[22px] w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_14px_#f59e0b] z-10 pointer-events-none transition-all duration-700 ease-out -translate-x-1/2"
              style={{ left: DOT_LEFTS[activeStep] }}
            />

            {/* 5 Step Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === activeStep;
                const isPassed = idx <= activeStep;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="cursor-pointer group flex flex-row sm:flex-col items-start gap-4 sm:gap-0 transition-all duration-300"
                  >
                    {/* Icon circle */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full flex items-center justify-center sm:mb-4 transition-all duration-500 border ${
                        isActive
                          ? "bg-[#0c2a1d] border-[#f59e0b] text-[#f59e0b] shadow-[0_0_24px_rgba(245,158,11,0.5)] scale-110"
                          : isPassed
                          ? "bg-[#071f16] border-amber-500/70 text-[#f59e0b]"
                          : "bg-[#07142a]/90 border-slate-800 text-slate-500 group-hover:border-slate-700"
                      }`}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[2] transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                    </div>

                    <div className="flex flex-col">
                      {/* Number */}
                      <span className={`text-[10px] sm:text-xs font-bold tracking-widest mb-1 sm:mb-1.5 transition-colors duration-300 ${isPassed ? "text-[#f59e0b]" : "text-slate-500"}`}>
                        {step.number}
                      </span>

                      {/* Title */}
                      <h3 className={`text-base sm:text-lg font-bold mb-1 sm:mb-2 tracking-tight transition-colors duration-300 ${isActive ? "text-[#f59e0b]" : isPassed ? "text-white" : "text-slate-300"}`}>
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

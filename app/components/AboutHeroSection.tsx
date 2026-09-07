"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

interface AnimatedStatProps {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}

function AnimatedStat({
  numericValue,
  prefix = "",
  suffix = "",
  label,
  duration = 2000,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeProgress * numericValue));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(numericValue);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [numericValue, duration, hasAnimated]);

  const formattedNumber = count.toLocaleString("en-US");

  return (
    <div ref={ref} className="flex flex-col justify-between p-6 sm:p-8">
      <div>
        <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full block mb-4" />
        <div className="font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-[40px] leading-none mb-2">
          {prefix}
          {formattedNumber}
          {suffix}
        </div>
      </div>
      <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
        {label}
      </p>
    </div>
  );
}

export default function AboutHeroSection() {
  return (
    <section
      className="w-full relative z-10 flex flex-col justify-center font-sans pt-36 pb-12 sm:pt-40 lg:pt-20 lg:pb-0 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden min-h-[100dvh] lg:min-h-0 lg:h-[90vh]"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-violet-700/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-amber-500/5 blur-[160px] rounded-full" />
      </div>

      {/* Right Side 3D Triangle Watermark Graphic */}
      <div className="hidden lg:flex absolute right-[-10%] top-[5%] bottom-[5%] w-[55vw] max-w-[850px] pointer-events-none select-none z-0 opacity-20 lg:opacity-30 items-center justify-end">
        <svg
          viewBox="0 0 400 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <defs>
            <linearGradient id="triGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="triGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Outer Triangle Frame with 3D Bevel depth */}
          <path
            d="M200 30 L370 380 H280 L200 220 L120 380 H30 L200 30 Z"
            fill="url(#triGrad1)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          {/* Inner Triangle Cutout shadow effect */}
          <path
            d="M200 130 L300 330 H230 L200 270 L170 330 H100 L200 130 Z"
            fill="url(#triGrad2)"
          />
          {/* Bevel highlights */}
          <path
            d="M200 30 L370 380 H330 L200 110 L70 380 H30 L200 30 Z"
            fill="white"
            fillOpacity="0.08"
          />
        </svg>
      </div>

      <div className="w-full max-w-[1360px] mx-auto relative z-10 flex flex-col justify-between h-full py-8 lg:py-12">
        {/* Top Content Area */}
        <div className="max-w-3xl my-auto">
          {/* Tagline Badge */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
              <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-xs sm:text-sm">
                ABOUT RANK_PARTNER
              </span>
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal delay={100}>
            <h1 className="font-extrabold tracking-tight leading-[1.1] text-white text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] mb-6">
              We help agencies and their clients{" "}
              <span className="italic font-serif font-normal text-[#f59e0b]">
                RANK_PARTNER
              </span>
            </h1>
          </ScrollReveal>

          {/* Subtitle Paragraph */}
          <ScrollReveal delay={150}>
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-2xl">
              Rank Partner is the white-label PR &amp; SEO platform agencies use to get their clients featured. We deliver guaranteed press placements and authority backlinks, and you pay per placement at a flat price.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom 4 Stat Cards Row */}
        <ScrollReveal delay={200}>
          <div className="w-full bg-[#081730]/60 border border-slate-800/80 backdrop-blur-md rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 shadow-2xl">
            <AnimatedStat
              numericValue={2019}
              label="The year we started"
            />
            <AnimatedStat
              numericValue={3000}
              suffix="+"
              label="Agencies in our network"
            />
            <AnimatedStat
              numericValue={1500}
              suffix="+"
              label="Publications we work with"
            />
            <AnimatedStat
              numericValue={10617}
              suffix="%"
              label="Three-year growth on the Inc. 5000"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

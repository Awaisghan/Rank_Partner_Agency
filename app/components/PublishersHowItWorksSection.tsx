"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import { Layers, Network, Send, Wallet } from "lucide-react";

export default function PublishersHowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);

  // For precise line + dot positioning: measure real icon center X coords
  const [iconCenters, setIconCenters] = useState<number[]>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      num: "1",
      icon: Layers,
      title: "We buy your inventory",
      desc: "We agree rates together, then purchase your available ad and sponsored-content inventory outright.",
    },
    {
      num: "2",
      icon: Network,
      title: "We fill it from the network",
      desc: "Your inventory is sold across our network of more than 3,000 agencies and their clients.",
    },
    {
      num: "3",
      icon: Send,
      title: "We send you the content",
      desc: "Finished, brand-safe content comes straight to you with first right of refusal. There is no platform and no logins to manage.",
    },
    {
      num: "4",
      icon: Wallet,
      title: "You publish and get paid",
      desc: "Run it on your schedule for predictable revenue, with zero sales overhead on your side.",
    },
  ];

  // Measure real icon center positions relative to the grid container
  const measureIconCenters = useCallback(() => {
    if (!gridRef.current) return;
    const containerLeft = gridRef.current.getBoundingClientRect().left;
    const centers = iconRefs.current.map((ref) => {
      if (!ref) return 0;
      const rect = ref.getBoundingClientRect();
      return rect.left - containerLeft + rect.width / 2;
    });
    setIconCenters(centers);
  }, []);

  useEffect(() => {
    measureIconCenters();
    window.addEventListener("resize", measureIconCenters);
    return () => window.removeEventListener("resize", measureIconCenters);
  }, [measureIconCenters]);

  // IntersectionObserver to start animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          measureIconCenters(); // re-measure when scrolled into view
        } else {
          setInView(false);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [measureIconCenters]);

  // Auto-advance steps smoothly every 2.4s when in view
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [inView, steps.length]);

  // Derive line start, width, and dot position from real measurements
  const lineLeft = iconCenters[0] ?? 0;
  const lineWidth =
    iconCenters.length > 1 && activeStep > 0
      ? (iconCenters[activeStep] ?? iconCenters[0]) - iconCenters[0]
      : 0;
  const dotLeft =
    iconCenters.length > 0
      ? (iconCenters[activeStep] ?? iconCenters[0]) - 6 // 6 = half of w-3 dot
      : 0;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-20 sm:py-28 relative z-10 font-sans"
    >
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">

        {/* Dark Rounded Banner Card */}
        <div className="bg-[#050e26] border border-slate-800/80 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.6)] relative overflow-hidden text-white">

          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

          {/* Top Tagline Badge */}
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-4 relative z-10">
              <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
              <span className="font-bold tracking-[0.2em] text-[#4ade80] uppercase text-xs sm:text-sm">
                HOW WE WORK TOGETHER
              </span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={150}>
            <h2 className="font-extrabold tracking-tight leading-tight text-white text-3xl sm:text-4xl lg:text-[44px] mb-4 relative z-10">
              From your inventory to{" "}
              <span className="italic font-serif font-normal text-[#4ade80]">
                your payout.
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={200}>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-14 font-normal relative z-10">
              Four steps, one simple deal. We buy your inventory and bring the demand, then send you the content with first right of refusal. You publish and get paid.
            </p>
          </ScrollReveal>

          {/* Steps grid — relative container for the line + dot overlay */}
          <div className="relative z-10 pt-2">

            {/* Full static grey line from icon[0] center to icon[last] center (Desktop) */}
            {iconCenters.length === steps.length && (
              <div
                className="hidden lg:block absolute top-[28px] h-[1.5px] bg-slate-800 z-0 pointer-events-none"
                style={{
                  left: iconCenters[0],
                  width: iconCenters[steps.length - 1] - iconCenters[0],
                }}
              />
            )}

            {/* Animated green progress line (Desktop) */}
            {iconCenters.length === steps.length && (
              <div
                className="hidden lg:block absolute top-[28px] h-[2px] bg-[#4ade80] z-0 pointer-events-none transition-all duration-700 ease-out shadow-[0_0_10px_#4ade80]"
                style={{
                  left: lineLeft,
                  width: lineWidth,
                }}
              />
            )}

            {/* Glowing pulser dot traveling along line (Desktop) */}
            {iconCenters.length === steps.length && (
              <div
                className="hidden lg:block absolute top-[22px] w-3 h-3 rounded-full bg-[#4ade80] shadow-[0_0_14px_#4ade80] z-10 pointer-events-none transition-all duration-700 ease-out"
                style={{ left: dotLeft }}
              />
            )}

            {/* 4 Step Cards Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            >
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === activeStep;
                const isPassed = idx <= activeStep;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="cursor-pointer group flex flex-col transition-all duration-300"
                  >
                    {/* Icon circle + number badge */}
                    <div className="relative w-14 h-14 mb-5">
                      <div
                        ref={(el) => { iconRefs.current[idx] = el; }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border ${
                          isActive
                            ? "bg-[#0b291d] border-[#4ade80] text-[#4ade80] shadow-[0_0_24px_rgba(74,222,128,0.5)] scale-110"
                            : isPassed
                            ? "bg-[#071f16] border-emerald-500/60 text-[#4ade80]"
                            : "bg-[#091530]/90 border-slate-800 text-slate-500 group-hover:border-slate-700"
                        }`}
                      >
                        <Icon className={`w-6 h-6 stroke-[2] transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                      </div>

                      {/* Number badge */}
                      <div
                        className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full font-extrabold text-[11px] flex items-center justify-center transition-all duration-500 ${
                          isPassed
                            ? "bg-[#4ade80] text-[#062c19] shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {step.num}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold text-base sm:text-lg mb-2 leading-snug transition-colors duration-300 ${
                        isActive ? "text-[#4ade80]" : isPassed ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                      {step.desc}
                    </p>
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

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { Tag, CheckCircle2, FileText, CheckCircle, Clock, Send } from "lucide-react";

// Order Status Steps for Floating Badge Animation
const ORDER_STATUS_STEPS = [
  { label: "Order placed", icon: Send, activeBars: 1 },
  { label: "Content uploaded", icon: FileText, activeBars: 2 },
  { label: "Order review", icon: Clock, activeBars: 3 },
  { label: "Article published", icon: CheckCircle, activeBars: 4 },
];

export default function PlatformFeaturesSection() {
  const [statusStep, setStatusStep] = useState(0); // 0 to 3

  // Continuous animation loop for Order Status Badge
  useEffect(() => {
    const timer = setInterval(() => {
      setStatusStep((prev) => (prev + 1) % ORDER_STATUS_STEPS.length);
    }, 2200); // Cycles every 2.2s

    return () => clearInterval(timer);
  }, []);

  const currentStatus = ORDER_STATUS_STEPS[statusStep];
  const IconComponent = currentStatus.icon;

  return (
    <section className="w-full bg-white py-10 px-4 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-[1550px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ========================================================================= */}
        {/* LEFT CARD: TRACK EVERY ORDER (lg:col-span-4) - Compact Height & Width     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-[#f4f5f7] rounded-3xl p-5 sm:p-6 flex flex-col justify-between border border-slate-200/80 shadow-sm min-h-[450px] relative overflow-hidden group">
          {/* Header Text */}
          <div className="mb-4">
            <ScrollReveal>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
                Track every order from{" "}
                <span className="italic font-serif font-normal text-blue-600 block sm:inline">
                  start to finish
                </span>
              </h3>
            </ScrollReveal>
          </div>

          {/* Larger Image Container + Animated Floating ORDER STATUS Card */}
          <div className="relative w-full flex-1 flex items-end justify-center pt-2">
            {/* Mockup Image Container with macOS Browser Header Bar */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white relative transform transition-transform duration-500 group-hover:scale-[1.01]">
              
              {/* Browser macOS URL Header Bar */}
              <div className="bg-[#f1f5f9] px-3.5 py-2 border-b border-slate-200 flex items-center gap-3 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
                <span className="text-[11px] text-slate-400 font-medium tracking-tight font-mono">
                  portal.rankpartner.io/orders/7367294
                </span>
              </div>

              <Image
                src="/platform-order.webp"
                alt="Order tracking platform screenshot"
                width={900}
                height={650}
                className="w-full h-auto object-cover object-top scale-105 origin-top"
                priority
              />

              {/* FLOATING ANIMATED ORDER STATUS BADGE (Compact & Sleek) */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-slate-200/90 min-w-[160px] sm:min-w-[190px] transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-2">
                  {/* Blue Icon Box */}
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs flex-shrink-0">
                    <IconComponent className="w-3.5 h-3.5 transition-transform duration-300" />
                  </div>
                  
                  {/* Status Header & Dynamic Label */}
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.16em] text-slate-400 uppercase block leading-none mb-0.5">
                      ORDER STATUS
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight block">
                      {currentStatus.label}
                    </span>
                  </div>
                </div>

                {/* 4 Blue Progress Segment Bars (Compact Height) */}
                <div className="grid grid-cols-4 gap-1 pt-0.5">
                  {[1, 2, 3, 4].map((barIndex) => {
                    const isActive = barIndex <= currentStatus.activeBars;
                    return (
                      <div
                        key={barIndex}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          isActive
                            ? "bg-blue-600 shadow-[0_0_4px_rgba(37,99,235,0.4)]"
                            : "bg-slate-200/80"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT CARD: SEE THE NUMBERS (lg:col-span-8) - Compact Height              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 bg-[#f4f5f7] rounded-3xl p-5 sm:p-6 flex flex-col justify-between border border-slate-200/80 shadow-sm min-h-[450px] relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
            
            {/* Left Text Column inside Right Card */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <ScrollReveal>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-3">
                    See the numbers{" "}
                    <span className="italic font-serif font-normal text-blue-600 block">
                      before you buy
                    </span>
                  </h3>
                </ScrollReveal>

                <ScrollReveal delay={150}>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    Third-party metrics, content guidelines, turnaround times and flat
                    pricing on every outlet, before you place a single order.
                  </p>
                </ScrollReveal>
              </div>

              {/* Floating Metric Badges List */}
              <ScrollReveal delay={250}>
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs w-fit text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Ahrefs DR</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs w-fit text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Moz DA</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs w-fit text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Majestic TF</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs w-fit text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Semrush AS</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Flat Price Tag Button */}
              <ScrollReveal delay={350}>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 bg-[#081428] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-md border border-slate-800">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <span>One flat price per placement</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Image Column inside Right Card (With macOS Browser Header Bar) */}
            <div className="lg:col-span-7 relative w-full h-full flex items-center justify-center transform transition-transform duration-500 group-hover:scale-[1.01]">
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                
                {/* Browser macOS URL Header Bar */}
                <div className="bg-[#f1f5f9] px-4 py-2.5 border-b border-slate-200 flex items-center gap-3 select-none">
                  {/* 3 Browser Dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>
                  {/* Custom Domain URL */}
                  <span className="text-xs text-slate-400 font-medium tracking-tight font-mono">
                    portal.rankpartner.io/publications/usatoday
                  </span>
                </div>

                <Image
                  src="/platform-publication-detail-BUf7_5Z5.webp"
                  alt="Publication details platform screenshot"
                  width={900}
                  height={600}
                  className="w-full h-auto object-cover object-top"
                  priority
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

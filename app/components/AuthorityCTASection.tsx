"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function AuthorityCTASection() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 relative z-10 font-sans">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Dark Rounded CTA Banner Card */}
        <div className="bg-[#06122e]/90 border border-slate-800/80 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
          
          {/* Ambient Glow inside card */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Left Text Column */}
          <div className="space-y-4 max-w-2xl relative z-10">
            
            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-xs sm:text-sm">
                  GET STARTED
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h2 className="font-extrabold tracking-tight leading-tight text-white text-2xl sm:text-3xl lg:text-[38px]">
                Build a stronger backlink profile{" "}
                <span className="text-[#f59e0b]">
                  for your clients.
                </span>
              </h2>
            </ScrollReveal>

            {/* Subtitle Paragraph */}
            <ScrollReveal delay={250}>
              <p className="text-slate-400 font-normal text-sm sm:text-base leading-relaxed">
                Get access to RankPartner.io, explore available backlink placements, review the metrics, and choose the opportunities that fit your clients’ SEO goals. Clear pricing, quality publications, and a straightforward process.
              </p>
            </ScrollReveal>

          </div>

          {/* Right Green CTA Button */}
          <ScrollReveal delay={300}>
            <div className="relative z-10 flex-shrink-0 pt-2 lg:pt-0">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-base transition-all duration-300 shadow-[0_0_28px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
              >
                <span>Contact us</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

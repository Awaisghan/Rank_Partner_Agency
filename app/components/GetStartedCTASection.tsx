"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function GetStartedCTASection() {
  return (
    <section className="relative z-10 w-full bg-[#f8fafc] py-14 sm:py-20 px-6 sm:px-10 lg:px-16 xl:px-20 border-t border-slate-200/60">
      <div className="max-w-[1360px] mx-auto">
        <ScrollReveal>
          {/* Dark Glass CTA Container */}
          <div className="w-full bg-[#03091a] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-14 lg:p-16 shadow-[0_25px_80px_-15px_rgba(3,9,26,0.5)] border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
            
            {/* Subtle background ambient glows */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-[#f59e0b]/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-violet-700/5 blur-[120px] pointer-events-none rounded-full" />

            {/* Left Content */}
            <div className="flex-1 max-w-2xl relative z-10">
              {/* Tagline */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-[2px] bg-[#f59e0b] rounded-full" />
                <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#f59e0b] uppercase">
                  GET STARTED
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.18] mb-3.5">
                Ready to get your clients{" "}
                <span className="text-[#f59e0b]">featured?</span>
              </h2>

              {/* Subtitle Paragraph */}
              <p className="text-slate-400 font-normal text-sm sm:text-[15px] leading-relaxed">
                Tell us about your agency and your clients’ publishing needs. We’ll help you get access to RankPartner.io, where you can explore publishers, choose the right placement, and submit your content.
              </p>
            </div>

            {/* Right CTA Button */}
            <div className="flex-shrink-0 relative z-10">
              <Link
                href="/#get-in-touch"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
              >
                <span>Contact us</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function PublishersCTASection() {
  return (
    <section className="w-full bg-white pb-20 sm:pb-28 relative z-10 font-sans">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <ScrollReveal>
          {/* Dark Banner Card */}
          <div className="bg-[#050e26] border border-slate-800/80 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.6)] relative overflow-hidden text-white flex flex-col md:flex-row md:items-center justify-between gap-8">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

            {/* Left Content */}
            <div className="max-w-2xl relative z-10">
              {/* Tagline */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#4ade80] uppercase text-xs sm:text-sm">
                  BECOME A PARTNER
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-extrabold tracking-tight leading-tight text-white text-3xl sm:text-4xl lg:text-[42px] mb-4">
                Ready to{" "}
                <span className="italic font-serif font-normal text-[#4ade80]">
                  sell your inventory?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
                Tell us about your titles and inventory, and we will show you how Ascend turns it into steady, predictable revenue.
              </p>
            </div>

            {/* Right Action Button */}
            <div className="relative z-10 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 bg-[#4ade80] hover:bg-[#3ec46f] text-[#062c19] font-bold text-sm sm:text-base px-7 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(74,222,128,0.3)] hover:shadow-[0_0_35px_rgba(74,222,128,0.5)] hover:scale-[1.02]"
              >
                <span>Partner with us</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

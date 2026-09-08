"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AboutCtaSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-14 px-6 sm:px-10 font-sans relative z-10">
      <div className="w-full max-w-[1080px] mx-auto">
        <ScrollReveal>
          <div className="w-full bg-[#040e21] border border-slate-800/90 rounded-3xl p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden shadow-2xl">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              {/* Tagline Badge */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-[#f59e0b] rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-[11px] sm:text-xs">
                  WORK WITH US
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-extrabold tracking-tight leading-[1.2] text-white text-2xl sm:text-3xl lg:text-[40px] my-2">
                Let&apos;s build your{" "}
                <span className="italic font-serif font-normal text-[#f59e0b]">
                  next opportunity.
                </span>
              </h2>

              {/* Subtitle Paragraph */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6 max-w-md">
                White-label press placements, authority backlinks, and TV interviews—built for agencies that want to offer more under their own brand.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  href="/#get-in-touch"
                  className="px-6 py-3 rounded-full bg-[#f59e0b] hover:bg-[#3be074] text-[#050b1e] font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Talk to us</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/for-agencies"
                  className="px-6 py-3 rounded-full bg-[#091730]/90 hover:bg-[#0f254c] border border-slate-700/80 text-white font-extrabold text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>For agencies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

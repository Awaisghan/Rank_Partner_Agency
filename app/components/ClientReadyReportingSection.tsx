"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function ClientReadyReportingSection() {
  return (
    <section className="w-full bg-white text-gray-900 py-24 sm:py-32 relative z-10 font-sans border-t border-slate-100">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ============================================================ */}
          {/* LEFT COLUMN — Text Content (col-span-5)                      */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5">

            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-violet-700 rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs sm:text-sm">
                  CLIENT-READY REPORTING
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h2 className="font-extrabold tracking-tight leading-tight text-gray-900 text-3xl sm:text-4xl lg:text-[46px]">
                Present your placements{" "}
                <span className="italic font-serif font-normal text-[#6d28d9] block">
                  with confidence.
                </span>
              </h2>
            </ScrollReveal>

            {/* Subtitle Paragraph */}
            <ScrollReveal delay={250}>
              <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed max-w-lg">
                Use published coverage, publisher details, and placement information to give your clients clear, professional updates under your own agency brand.
              </p>
            </ScrollReveal>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN — Browser Frame with Actual Image (col-span-7)  */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <ScrollReveal delay={200}>
              {/* Outer Browser Window Frame */}
              <div className="w-full max-w-[660px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.08)] overflow-hidden">

                {/* ── BROWSER TOP BAR WITH LEFT-ALIGNED DOTS & URL ───── */}
                <div className="bg-[#f3f5f9] px-5 sm:px-6 py-3.5 border-b border-slate-200/80 flex items-center gap-6">
                  {/* Three Window Dots */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-3 h-3 rounded-full bg-[#d1d5db]" />
                    <span className="w-3 h-3 rounded-full bg-[#d1d5db]" />
                    <span className="w-3 h-3 rounded-full bg-[#d1d5db]" />
                  </div>
                  {/* URL Bar Text */}
                  <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-xs sm:text-[13px] font-medium text-[#94a3b8] font-sans tracking-tight">
                      portal.rankpartner.io/publications
                    </span>
                  </div>
                </div>

                {/* ── BROWSER IMAGE CONTENT ───────────────────────────── */}
                <div className="w-full bg-white relative">
                  <Image
                    src="/platform-publication-detail-BUf7_5Z5.webp"
                    alt="Client-ready Reporting Platform Detail"
                    width={800}
                    height={520}
                    className="w-full h-auto block object-cover"
                    priority
                  />
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

export default function SeeBeforeYouBuySection() {
  return (
    <section className="relative z-10 w-full bg-white py-20 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 border-t border-slate-100">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ============================================================ */}
          {/* LEFT COLUMN — Text Content (col-span-5)                       */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            {/* Section Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-[2px] bg-[#6d28d9] rounded-full" />
                <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#6d28d9] uppercase">
                  SEE BEFORE YOU ORDER
                </span>
              </div>
            </ScrollReveal>

            {/* Main Section Heading */}
            <ScrollReveal delay={100}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-[#0a0f1d] tracking-tight leading-[1.14] mb-5">
                The details behind{" "}
                <span className="block sm:inline">
                  every{" "}
                  <span className="italic font-serif font-normal text-[#6d28d9]">
                    publisher.
                  </span>
                </span>
              </h2>
            </ScrollReveal>

            {/* Subtitle Paragraph */}
            <ScrollReveal delay={180}>
              <p className="text-[15px] sm:text-base text-[#64748b] leading-relaxed max-w-lg font-normal">
                Review key authority metrics, content requirements, estimated turnaround times, and placement pricing before submitting your order. Make informed decisions by comparing the available publishing opportunities in one place.
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
                  {/* URL Bar Text (Left-aligned inline next to dots) */}
                  <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-xs sm:text-[13px] font-medium text-[#94a3b8] font-sans tracking-tight">
                      portal.rankpartner.io/publications/usatoday
                    </span>
                  </div>
                </div>

                {/* ── BROWSER IMAGE CONTENT ───────────────────────────── */}
                <div className="w-full bg-white relative">
                  <Image
                    src="/platform-publication-detail-BUf7_5Z5.webp"
                    alt="USA Today Publication Details & Metrics"
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

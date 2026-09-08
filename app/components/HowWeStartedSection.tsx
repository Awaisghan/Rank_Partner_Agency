"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function HowWeStartedSection() {
  return (
    <section className="w-full bg-white text-slate-900 py-14 sm:py-16 px-6 sm:px-10 lg:px-16 font-sans relative z-10">
      <div className="w-full max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Sticky Header Block */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28 self-start h-fit">
            <ScrollReveal>
              {/* Tagline Badge */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-5 h-[2px] bg-[#6d28d9] rounded-full" />
                <span className="font-bold tracking-[0.18em] text-[#6d28d9] uppercase text-[11px] sm:text-xs">
                  HOW WE STARTED
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-extrabold tracking-tight leading-[1.2] text-slate-900 text-2xl sm:text-3xl lg:text-[32px] max-w-sm my-2">
                Built for agencies that want more from{" "}
                <span className="italic font-serif font-normal text-[#6d28d9]">
                  every placement.
                </span>
              </h2>

              {/* Subtitle Footer */}
              <p className="text-slate-400 font-extrabold tracking-[0.16em] uppercase text-[10px] sm:text-[11px] mt-4">
                BUILT FOR AGENCIES
              </p>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Scrolling Story Content */}
          <div className="lg:col-span-7 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            <ScrollReveal delay={100}>
              <p>
                RankPartner.io was created to give agencies a simpler way to access quality press placements, authority backlinks, and TV interview opportunities for their clients.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p>
                Instead of managing multiple vendors and searching for suitable publishers, agencies can use one platform to browse opportunities, review publisher details and metrics, compare pricing, and choose the placements that fit their clients’ goals.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p>
                Today, RankPartner.io helps agencies offer professional media and SEO opportunities under their own brand, with a straightforward process and clear information before they order.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

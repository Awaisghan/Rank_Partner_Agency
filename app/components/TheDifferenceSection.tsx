"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

const DIFFERENCES = [
  {
    num: "01",
    title: "Carefully selected publishers",
    desc: "Explore publishing opportunities with clear publisher details and authority metrics, so you can choose placements that fit your clients’ goals.",
  },
  {
    num: "02",
    title: "Authority that adds value",
    desc: "Build stronger backlink profiles with placements on relevant, established publications that can support long-term SEO efforts.",
  },
  {
    num: "03",
    title: "Clear pricing before you order",
    desc: "Review placement details and pricing upfront, so you know what to expect before submitting your order.",
  },
  {
    num: "04",
    title: "Simple from start to finish",
    desc: "Choose a publisher, send your content to our official email, and let our team handle the review and publication process.",
  },
];

export default function TheDifferenceSection() {
  return (
    <section
      className="w-full text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 relative z-10 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050d21 0%, #030818 100%)",
      }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[700px] h-[500px] bg-violet-700/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: TEXT & HEADLINE (lg:col-span-5)                              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            
            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                <span className="text-xs font-bold tracking-[0.2em] text-[#f59e0b] uppercase">
                  THE DIFFERENCE
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white tracking-tight leading-[1.15]">
                A better standard for every{" "}
                <span className="italic font-serif font-normal text-[#f59e0b] underline decoration-[#f59e0b]/60 decoration-2 underline-offset-8 block mt-1">
                  placement and link.
                </span>
              </h2>
            </ScrollReveal>

            {/* Subtitle / Paragraph */}
            <ScrollReveal delay={250}>
              <p className="text-slate-400 text-sm sm:text-base font-normal leading-relaxed max-w-md pt-2">
                Transparent opportunities, clear pricing, and a straightforward process. RankPartner.io helps agencies access quality publishing opportunities without unnecessary complexity.
              </p>
            </ScrollReveal>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 4 NUMBERED DIFFERENCE ITEMS (lg:col-span-7)                */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-800/80">
            {DIFFERENCES.map((item, idx) => (
              <ScrollReveal key={item.num} delay={100 * (idx + 1)}>
                <div className="py-7 transition-all duration-300 group cursor-pointer flex items-start gap-6">
                  {/* Number (01, 02, 03, 04) - Green Accent */}
                  <span className="text-sm font-bold tracking-widest font-mono text-[#f59e0b] pt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {item.num}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Heading */}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 transition-colors duration-300 group-hover:text-[#f59e0b]">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed transition-colors duration-300 group-hover:text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

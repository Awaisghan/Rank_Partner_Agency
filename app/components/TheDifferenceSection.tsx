"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

const DIFFERENCES = [
  {
    num: "01",
    title: "Handled by senior operators",
    desc: "Your placements and links are run end to end by senior PR and SEO operators. No freelancers to coordinate and nothing for your team to manage.",
  },
  {
    num: "02",
    title: "Authority that compounds",
    desc: "A link from a high-authority domain lifts your client's whole site, not just one page, and keeps working long after it goes live.",
  },
  {
    num: "03",
    title: "Priced before you commit",
    desc: "One flat price per placement. No surprise invoices, and no billing for effort you can't see.",
  },
  {
    num: "04",
    title: "A proven track record",
    desc: "An Inc. 5000 company that thousands of agencies already rely on to deliver, campaign after campaign.",
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
      <div className="absolute top-1/3 right-10 w-[700px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: TEXT & HEADLINE (lg:col-span-5)                              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            
            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
                <span className="text-xs font-bold tracking-[0.2em] text-[#4ade80] uppercase">
                  THE DIFFERENCE
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white tracking-tight leading-[1.15]">
                The standard behind every{" "}
                <span className="italic font-serif font-normal text-[#4ade80] underline decoration-[#4ade80]/60 decoration-2 underline-offset-8 block mt-1">
                  placement and link.
                </span>
              </h2>
            </ScrollReveal>

            {/* Subtitle / Paragraph */}
            <ScrollReveal delay={250}>
              <p className="text-slate-400 text-sm sm:text-base font-normal leading-relaxed max-w-md pt-2">
                No guesswork, no outsourcing, and no surprises. One product, built to make
                you look good to every client you put in front of it.
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
                  <span className="text-sm font-bold tracking-widest font-mono text-[#4ade80] pt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {item.num}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Heading */}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 transition-colors duration-300 group-hover:text-[#4ade80]">
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

"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";

export default function RecognizedAwardsSection() {
  const awardsList = [
    {
      year: "2026",
      title: "Inc. Regionals: Pacific",
      source: "Inc.",
      description:
        "No. 91 on the 2026 Pacific list, following No. 21 in 2025 and No. 2 in 2024 for two-year growth.",
      isHighlighted: false,
    },
    {
      year: "2025",
      title: "Inc. 5000",
      source: "Inc.",
      description: "Named to the national list of America's fastest-growing private companies.",
      isHighlighted: true,
    },
    {
      year: "2025",
      title: "Power Partners",
      source: "Inc.",
      description:
        "Recognized on Inc.'s 2025 Power Partners in Advertising, Marketing & Sales list.",
      isHighlighted: false,
    },
    {
      year: "2025",
      title: "Netty Awards",
      source: "Netty Awards",
      description:
        "Honored in back-to-back years, after taking PR Agency of the Year in 2024.",
      isHighlighted: false,
    },
    {
      year: "2025",
      title: "Pinnacle Awards",
      source: "Pinnacle Awards",
      description: "Recognized for excellence in white-label digital PR and agency growth.",
      isHighlighted: false,
    },
    {
      year: "2025",
      title: "Fastest Growing Companies",
      source: "Financial Tech Times",
      description: "Named among the top tech-enabled agencies driving industry growth.",
      isHighlighted: false,
    },
    {
      year: "2024",
      title: "Titan, dotCOMM, Muse & MarCom Awards",
      source: "Industry Awards",
      description:
        "Platinum at all four shows in 2024, with Gold at the Viddy Awards and Silver at the Merit Awards.",
      isHighlighted: false,
    },
  ];

  return (
    <section className="w-full bg-[#040d21] text-white py-20 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans relative z-10">
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Top Header Block with Inc. Logo */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          {/* Left Header Info */}
          <div className="flex-1">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#4ade80] uppercase text-xs sm:text-sm">
                  AWARDS
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="font-extrabold tracking-tight leading-[1.15] text-white text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] max-w-2xl mb-4">
                Recognized for the{" "}
                <span className="italic font-serif font-normal text-[#4ade80]">
                  results we deliver.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal mb-5">
                Inc. has recognized Ascend on its national and regional growth lists, alongside Industry awards across PR, marketing and digital.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <a
                href="#inc-profile"
                className="inline-flex items-center gap-1.5 text-[#4ade80] hover:text-white font-extrabold text-xs tracking-widest uppercase transition-colors"
              >
                <span>VIEW OUR INC. PROFILE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>

          {/* Right Header: Official Inc. Magazine SVG Logo */}
          <ScrollReveal delay={200} className="shrink-0 pb-1 self-start lg:self-end">
            <svg
              className="h-14 sm:h-18 lg:h-22 text-white fill-current transition-opacity hover:opacity-95"
              viewBox="0 0 110 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Capital 'I' with top and bottom slab serifs */}
              <path d="M4 12h26v7h-8v21h8v7H4v-7h8V19H4v-7z" />

              {/* Lowercase 'n' */}
              <path d="M33 50V21h9.5v3.5C45 22 48.5 20.5 53.5 20.5C61 20.5 64.5 24.5 64.5 32V50H55V33.5C55 29.5 53 27.5 49 27.5C45 27.5 42.5 29.5 42.5 33.5V50H33z" />

              {/* Lowercase 'c' - Smooth circular c */}
              <path d="M92 28C89.5 23.5 85.5 21.5 80 21.5C72 21.5 66 27.5 66 35.5C66 43.5 72 49.5 80 49.5C85.5 49.5 89.5 47.5 92 43H84C83 44.2 81.5 44.8 80 44.8C75.5 44.8 73 41 73 35.5C73 30 75.5 26.2 80 26.2C81.5 26.2 83 26.8 84 28H92z" />

              {/* Period Dot '.' */}
              <circle cx="100" cy="45" r="4.5" />
            </svg>
          </ScrollReveal>
        </div>

        {/* 3 Highlighted Stat Cards Row */}
        <ScrollReveal delay={220}>
          <div className="w-full bg-[#071733]/60 border border-slate-800/90 backdrop-blur-md rounded-2xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 mb-16 overflow-hidden shadow-2xl">
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="w-6 h-[2px] bg-[#4ade80] rounded-full block mb-3" />
                <div className="font-extrabold tracking-tight text-white text-3xl sm:text-4xl mb-2">
                  10,617%
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-medium">
                Three-year growth on the Inc. 5000
              </p>
            </div>

            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="w-6 h-[2px] bg-[#4ade80] rounded-full block mb-3" />
                <div className="font-extrabold tracking-tight text-white text-3xl sm:text-4xl mb-2">
                  No. 1,061
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-medium">
                National rank on the 2025 Inc. 5000
              </p>
            </div>

            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="w-6 h-[2px] bg-[#4ade80] rounded-full block mb-3" />
                <div className="font-extrabold tracking-tight text-white text-3xl sm:text-4xl mb-2">
                  No. 2
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-medium">
                Inc. Regionals: Pacific, 2024
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Awards Timeline List */}
        <div className="space-y-4">
          {awardsList.map((award, idx) => (
            <ScrollReveal key={idx} delay={250 + idx * 40}>
              <div
                className={`transition-all duration-300 ${
                  award.isHighlighted
                    ? "bg-[#071936]/90 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-lg"
                    : "border-b border-slate-800/60 pb-6 pt-2 px-2"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                  {/* Left Column: Year, Title & Source */}
                  <div className="lg:col-span-5">
                    <span className="text-[#4ade80] font-extrabold text-xs tracking-wider uppercase block mb-1">
                      {award.year}
                    </span>
                    <h3 className="font-extrabold text-white text-lg sm:text-xl leading-snug mb-1">
                      {award.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-semibold">
                      {award.source}
                    </p>
                  </div>

                  {/* Right Column: Description */}
                  <div className="lg:col-span-7 flex items-center">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

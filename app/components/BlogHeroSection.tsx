"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function BlogHeroSection() {
  return (
    <section
      style={{ height: "70vh" }}
      className="w-full relative z-10 flex flex-col justify-center font-sans pt-20 px-6 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Breadcrumbs */}
        <ScrollReveal>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-200">Insights</span>
          </div>
        </ScrollReveal>

        {/* Tagline Badge */}
        <ScrollReveal delay={100}>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#4ade80] uppercase text-xs sm:text-sm">
              INSIGHTS
            </span>
          </div>
        </ScrollReveal>

        {/* Main Headline */}
        <ScrollReveal delay={150}>
          <h1 className="font-extrabold tracking-tight leading-[1.1] text-white text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] max-w-3xl mb-6">
            Notes on getting featured and{" "}
            <span className="italic font-serif font-normal text-[#4ade80]">
              getting ranked.
            </span>
          </h1>
        </ScrollReveal>

        {/* Subtitle Paragraph */}
        <ScrollReveal delay={200}>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Notes on press, search, and authority from the operators behind the placements. What gets clients featured and ranked.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

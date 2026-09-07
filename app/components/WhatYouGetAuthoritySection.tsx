"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { TrendingUp, ShieldCheck, Gauge, CheckCircle2 } from "lucide-react";

export default function WhatYouGetAuthoritySection() {
  const cards = [
    {
      icon: TrendingUp,
      title: "High-authority publishing opportunities",
      description:
        "Choose backlinks from reputable publications and review their authority metrics to find placements that fit your client’s SEO strategy.",
    },
    {
      icon: ShieldCheck,
      title: "Real publication placements",
      description:
        "Get backlinks placed within published articles on established publications, giving your clients a credible source to support their online presence.",
    },
    {
      icon: Gauge,
      title: "Review metrics before you order",
      description:
        "Compare Domain Rating, referring domains, organic traffic, and other key metrics before choosing a backlink placement.",
    },
    {
      icon: CheckCircle2,
      title: "Simple, transparent pricing",
      description:
        "Choose the backlinks you need with clear pricing for each placement, so you know the cost before you order.",
    },
  ];

  return (
    <section className="w-full bg-white text-gray-900 py-24 sm:py-32 relative z-10 font-sans border-t border-slate-100">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Top Tagline */}
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-[2px] bg-violet-700 rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs sm:text-sm">
              THE PROGRAM
            </span>
          </div>
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal delay={150}>
          <h2 className="font-extrabold tracking-tight leading-tight text-gray-900 text-3xl sm:text-4xl lg:text-[46px] mb-4">
            What you get with{" "}
            <span className="italic font-serif font-normal text-[#6d28d9]">
              Authority Backlinks.
            </span>
          </h2>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={200}>
          <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed max-w-2xl mb-14">
            Build stronger backlink profiles with placements on reputable publications, backed by transparent metrics and straightforward pricing.
          </p>
        </ScrollReveal>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={idx} delay={250 + idx * 100}>
                <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Light Blue Icon Square Badge */}
                    <div className="w-12 h-12 rounded-xl bg-violet-50/90 text-[#6d28d9] flex items-center justify-center mb-6 group-hover:bg-violet-700 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Card Title */}
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 leading-snug">
                      {card.title}
                    </h3>

                    {/* Card Subtitle */}
                    <p className="text-slate-500 text-sm sm:text-[14.5px] leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Building2, CheckCircle2, Tag, Gauge } from "lucide-react";

export default function WhyAgenciesChooseSection() {
  const cards = [
    {
      icon: Building2,
      title: "Fully white-label",
      description:
        "Everything runs under your own name, from the first order to the final report.",
    },
    {
      icon: CheckCircle2,
      title: "Guaranteed delivery",
      description:
        "Every placement and backlink you order is guaranteed and delivered under your brand, campaign after campaign.",
    },
    {
      icon: Tag,
      title: "Reseller pricing",
      description:
        "Flat per-placement rates with margin built in, so every order has room to profit.",
    },
    {
      icon: Gauge,
      title: "Metrics you can show",
      description:
        "Live Domain Rating and traffic on every outlet, ready to drop into client reports.",
    },
  ];

  return (
    <section className="w-full bg-white text-gray-900 py-24 sm:py-32 relative z-10 font-sans border-t border-slate-100">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Top Tagline */}
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
            <span className="font-bold tracking-[0.2em] text-blue-600 uppercase text-xs sm:text-sm">
              WHY AGENCIES CHOOSE ASCEND
            </span>
          </div>
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal delay={150}>
          <h2 className="font-extrabold tracking-tight leading-tight text-gray-900 text-3xl sm:text-4xl lg:text-[46px] mb-14">
            Everything you need to{" "}
            <span className="italic font-serif font-normal text-blue-600">
              resell it as your own.
            </span>
          </h2>
        </ScrollReveal>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={idx} delay={200 + idx * 100}>
                <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Light Blue Icon Square Badge */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50/90 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
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

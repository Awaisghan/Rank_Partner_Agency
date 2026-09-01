"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ShieldCheck, Wallet, TrendingUp, Target } from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    title: "Trusted across the industry",
    desc: "We work with more than 1,500 publications, so you are partnering with a name the industry already knows.",
  },
  {
    icon: Wallet,
    title: "One reliable buyer for your inventory",
    desc: "We purchase your inventory outright, so revenue is predictable and never depends on filling it yourself.",
  },
  {
    icon: TrendingUp,
    title: "Turnkey, high-margin product",
    desc: "The content arrives finished and ready to run. It is a turnkey, high-profit-margin line with nothing to build on your side.",
  },
  {
    icon: Target,
    title: "No KPIs to hit",
    desc: "No performance targets, quotas, or campaign metrics to chase. You run the content and collect steady revenue.",
  },
];

export default function WhyPublishersChooseSection() {
  return (
    <section className="w-full bg-white py-20 sm:py-28 relative z-10 font-sans border-t border-slate-100">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">

        {/* Tagline */}
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-6 h-[2px] bg-[#3b82f6] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#3b82f6] uppercase text-xs sm:text-sm">
              WHY PUBLISHERS CHOOSE ASCEND
            </span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.1] text-[#0a0f1e] mb-12 sm:mb-16">
            A buyer the industry{" "}
            <span className="italic font-serif font-normal text-[#3b82f6]">
              already trusts.
            </span>
          </h2>
        </ScrollReveal>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={idx} delay={150 + idx * 80}>
                <div className="group h-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 hover:border-blue-300 hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)] transition-all duration-300">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-blue-50/70 group-hover:bg-blue-100/70 flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-blue-600 stroke-[1.8]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[#0a0f1e] text-base sm:text-lg leading-snug mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

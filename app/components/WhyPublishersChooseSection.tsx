"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ShieldCheck, Wallet, TrendingUp, Target } from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    title: "Reach agency buyers",
    desc: "Connect your publishing opportunities with agencies looking for quality placements for their clients.",
  },
  {
    icon: Wallet,
    title: "Showcase your inventory",
    desc: "Present your available publishing opportunities with the details agencies need to evaluate and choose.",
  },
  {
    icon: TrendingUp,
    title: "Expand your opportunities",
    desc: "Put your publication in front of agencies seeking relevant press and sponsored-content placements.",
  },
  {
    icon: Target,
    title: "Simple and transparent",
    desc: "Provide clear placement details, requirements, and pricing so agencies can make informed decisions.",
  },
];

export default function WhyPublishersChooseSection() {
  return (
    <section className="w-full bg-white py-20 sm:py-28 relative z-10 font-sans border-t border-slate-100">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">

        {/* Tagline */}
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-6 h-[2px] bg-[#6d28d9] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs sm:text-sm">
              WHY PUBLISHERS CHOOSE RANKPARTNER.IO
            </span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.1] text-[#0a0f1e] mb-12 sm:mb-16">
            Turn your publishing opportunities into{" "}
            <span className="italic font-serif font-normal text-[#6d28d9]">
              new business.
            </span>
          </h2>
        </ScrollReveal>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={idx} delay={150 + idx * 80}>
                <div className="group h-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 hover:border-violet-300 hover:shadow-[0_8px_32px_rgba(109,40,217,0.12)] transition-all duration-300">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-violet-50/70 group-hover:bg-violet-100/70 flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#6d28d9] stroke-[1.8]" />
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

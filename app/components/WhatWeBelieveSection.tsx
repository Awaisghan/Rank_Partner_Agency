"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Award, Tag, Users, ShieldCheck } from "lucide-react";

export default function WhatWeBelieveSection() {
  const cards = [
    {
      icon: Award,
      title: "Clear expectations",
      description:
        "Review the publication, key metrics, requirements, pricing, and available placement details before you order. Know what you’re choosing from the start.",
    },
    {
      icon: Tag,
      title: "Transparent pricing",
      description:
        "See the price for each placement upfront, so you can plan your costs and set your own client pricing with confidence.",
    },
    {
      icon: Users,
      title: "Built for agencies",
      description:
        "RankPartner.io is designed around the way agencies work, giving you access to press placements, authority backlinks, and TV interview opportunities through one platform.",
    },
    {
      icon: ShieldCheck,
      title: "Accountable process",
      description:
        "We keep the process straightforward from submission through publication, with clear requirements and review steps for every selected opportunity.",
    },
  ];

  return (
    <section className="w-full bg-[#040d21] text-white py-20 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans relative z-10">
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Header Block */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-xs sm:text-sm">
              WHAT WE BELIEVE
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-extrabold tracking-tight leading-[1.15] text-white text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] max-w-4xl mb-12 sm:mb-16">
            Make quality press and SEO opportunities something{" "}
            <span className="italic font-serif font-normal text-[#f59e0b]">
              every agency can offer.
            </span>
          </h2>
        </ScrollReveal>

        {/* 4 Cards Grid Container */}
        <ScrollReveal delay={200}>
          <div className="w-full bg-[#071733]/60 border border-slate-800/90 backdrop-blur-md rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 shadow-2xl overflow-hidden">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-8 sm:p-9 lg:p-10 flex flex-col justify-start hover:bg-[#0b224a]/30 transition-colors duration-300"
                >
                  {/* Icon Box */}
                  <div className="w-10 h-10 rounded-lg bg-[#0b2447] border border-slate-700/60 flex items-center justify-center mb-6 shrink-0">
                    <Icon className="w-5 h-5 text-[#f59e0b]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-white text-lg sm:text-xl leading-snug mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Megaphone, FileText, Edit3 } from "lucide-react";

export default function WhatWeBuySection() {
  const cards = [
    {
      icon: Megaphone,
      title: "Display advertising",
      description:
        "Banner and display slots across your site, bought in bulk and filled with brand-safe campaigns.",
    },
    {
      icon: FileText,
      title: "Sponsored content",
      description:
        "Sponsored posts and partner articles, purchased outright and matched to brand-safe demand.",
    },
    {
      icon: Edit3,
      title: "Branded content",
      description:
        "Native, on-brand features written to fit your audience and ready to publish as your own.",
    },
  ];

  return (
    <section className="w-full bg-white text-gray-900 py-20 sm:py-28 relative z-10 font-sans border-t border-slate-100">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Top Tagline Badge */}
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
            <span className="font-bold tracking-[0.2em] text-blue-600 uppercase text-xs sm:text-sm">
              WHAT WE BUY
            </span>
          </div>
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal delay={150}>
          <h2 className="font-extrabold tracking-tight leading-tight text-gray-900 text-3xl sm:text-4xl lg:text-[46px] mb-4">
            We buy the inventory you{" "}
            <span className="italic font-serif font-normal text-blue-600">
              already have.
            </span>
          </h2>
        </ScrollReveal>

        {/* Subtitle Paragraph */}
        <ScrollReveal delay={200}>
          <p className="text-slate-500 font-normal text-base sm:text-lg leading-relaxed max-w-2xl mb-12 sm:mb-16">
            Whatever ad and sponsored space you cannot fill yourself, we buy outright and match with brand-safe demand from the network.
          </p>
        </ScrollReveal>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={idx} delay={250 + idx * 100}>
                <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Soft Blue Square Icon Badge */}
                    <div className="w-11 h-11 rounded-xl bg-blue-50/90 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Card Title */}
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 leading-snug">
                      {card.title}
                    </h3>

                    {/* Card Description */}
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

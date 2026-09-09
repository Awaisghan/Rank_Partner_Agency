"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";

export default function InThePressSection() {
  const pressItems = [
    {
      source: "MASHABLE",
      date: "September 2023",
      title: "How RankPartner.io Makes SEO and PR Scalable",
      url: "https://nl.mashable.com/seo/13313/hoe-rankpartnerio-seo-en-pr-schaalbaar-maakthoe-rankpartnerio-seo-en-pr-schaalbaar-maakt",
      isActive: true,
    },
  ];

  return (
    <section className="w-full bg-white text-slate-900 pt-8 lg:pt-12 pb-20 lg:pb-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans relative z-10">
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Tagline & Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-[#6d28d9] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs sm:text-sm">
              IN THE PRESS
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-extrabold tracking-tight leading-[1.15] text-slate-900 text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] max-w-2xl mb-4">
            When <span className="italic font-serif font-normal text-[#6d28d9]">RankPartner.io</span> gets noticed.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal mb-12">
            Coverage of RankPartner.io, our platform, industry insights, and the work we’re doing to help agencies access better press and SEO opportunities.
          </p>
        </ScrollReveal>

        {/* Press List Rows */}
        <div className="border-t border-slate-200/80">
          {pressItems.map((item, idx) => (
            <ScrollReveal key={idx} delay={180 + idx * 40}>
              <a
                href={item.url}
                className="group border-b border-slate-200/80 py-6 px-2 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors block"
              >
                <div className="max-w-3xl">
                  {/* Meta: Source & Date */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-extrabold text-[#6d28d9] text-xs tracking-wider uppercase">
                      {item.source}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-medium text-xs">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-extrabold text-lg sm:text-xl lg:text-[21px] leading-snug transition-colors ${
                      item.isActive
                        ? "text-[#6d28d9]"
                        : "text-slate-900 group-hover:text-[#6d28d9]"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Read Article Action */}
                <div className="flex items-center gap-1 text-[#6d28d9] font-bold text-xs tracking-widest uppercase shrink-0">
                  <span>READ ARTICLE</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

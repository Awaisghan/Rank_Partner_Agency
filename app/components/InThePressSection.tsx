"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";

export default function InThePressSection() {
  const pressItems = [
    {
      source: "US WEEKLY",
      date: "September 2025",
      title: "Jonathan Jadali Spurs Growth and Accountability at Ascend Agency",
      url: "#",
      isActive: true,
    },
    {
      source: "ENTREPRENEUR",
      date: "September 2025",
      title: "Inside George Nellist's Playbook: Building Digital PR Strategies That Stick",
      url: "#",
      isActive: false,
    },
    {
      source: "USA TODAY",
      date: "April 2024",
      title: "Visibility and Credibility: PR Expert Brauch Owens Talks Up the Dangers of Attaining One Without the Other",
      url: "#",
      isActive: false,
    },
    {
      source: "VARIETY",
      date: "January 2023",
      title: "How Jonathan Jadali Is Accelerating the Growth of Ascend Agency",
      url: "#",
      isActive: false,
    },
  ];

  return (
    <section className="w-full bg-white text-slate-900 py-20 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans relative z-10">
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Tagline & Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-[#3b82f6] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#3b82f6] uppercase text-xs sm:text-sm">
              IN THE PRESS
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-extrabold tracking-tight leading-[1.15] text-slate-900 text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] max-w-2xl mb-4">
            When we&apos;re{" "}
            <span className="italic font-serif font-normal text-[#3b82f6]">
              the story.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal mb-12">
            Press coverage of Ascend, our leadership, and how we run the agency.
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
                    <span className="font-extrabold text-[#3b82f6] text-xs tracking-wider uppercase">
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
                        ? "text-[#3b82f6]"
                        : "text-slate-900 group-hover:text-[#3b82f6]"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Read Article Action */}
                <div className="flex items-center gap-1 text-[#3b82f6] font-bold text-xs tracking-widest uppercase shrink-0">
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

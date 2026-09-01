"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileText, Link2, Building2, BookOpen, Rocket, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const topics = [
  { icon: Sparkles, name: "The basics", id: "the-basics", count: "4" },
  { icon: FileText, name: "Press & coverage", id: "press-coverage", count: "4" },
  { icon: Link2, name: "Backlinks & SEO", id: "backlinks-seo", count: "4" },
  { icon: Building2, name: "For agencies", id: "for-agencies", count: "3" },
  { icon: BookOpen, name: "For publishers", id: "for-publishers", count: "2" },
  { icon: Rocket, name: "Getting started", id: "getting-started", count: "2" },
];

export default function FaqHeroSection() {
  return (
    <section
      style={{ height: "70vh" }}
      className="w-full relative z-10 flex flex-col justify-center font-sans pt-20 px-6 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Tagline Badge */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#4ade80] uppercase text-xs sm:text-sm">
              FAQ
            </span>
            <span className="text-slate-400 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase ml-1">
              6 TOPICS · 19 QUESTIONS
            </span>
          </div>
        </ScrollReveal>

        {/* Main Headline */}
        <ScrollReveal delay={100}>
          <h1 className="font-extrabold tracking-tight leading-[1.1] text-white text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] max-w-3xl mb-4">
            Questions,{" "}
            <span className="italic font-serif font-normal text-[#4ade80]">
              answered.
            </span>
          </h1>
        </ScrollReveal>

        {/* Subtitle Paragraph */}
        <ScrollReveal delay={150}>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal mb-8">
            How white-label PR and SEO works at Ascend, what agencies and publishers can expect, and how to get started. If your question is not here, talk to us.
          </p>
        </ScrollReveal>

        {/* Topic Pills */}
        <ScrollReveal delay={200}>
          <div className="flex flex-wrap items-center gap-2.5 max-w-4xl mb-8">
            {topics.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <a
                  key={idx}
                  href={`#${topic.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(topic.id);
                    if (el) {
                      const y =
                        el.getBoundingClientRect().top +
                        window.pageYOffset -
                        110;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#071933]/90 hover:bg-[#0b254a] border border-slate-700/80 text-white rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#4ade80]" />
                  <span>{topic.name}</span>
                  <span className="text-slate-400 font-bold ml-0.5 text-[11px]">
                    {topic.count}
                  </span>
                </a>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Contact Us Button */}
        <ScrollReveal delay={250}>
          <div>
            <Link
              href="/#get-in-touch"
              className="inline-flex items-center gap-2 bg-[#9ef08b] hover:bg-[#8ee07b] text-[#062c19] font-extrabold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(158,240,139,0.3)] hover:scale-[1.02]"
            >
              <span>Contact us</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

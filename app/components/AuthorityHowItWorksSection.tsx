"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function AuthorityHowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Check a domain",
      desc: "Start with a free authority check to see where your client stands right now.",
    },
    {
      num: "02",
      title: "Choose your targets",
      desc: "Pick publications by Domain Rating, traffic, and topic fit, all visible before you order.",
    },
    {
      num: "03",
      title: "We build the link",
      desc: "The article goes live with a link pointing to your client's website.",
    },
    {
      num: "04",
      title: "Watch it work",
      desc: "Track Domain Rating growth, referring domains, and organic traffic as your authority builds.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 relative z-10 font-sans">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Dark Rounded Container Banner */}
        <div className="bg-[#07132b]/90 border border-slate-800/80 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Ambient Glow inside card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Top Tagline */}
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
              <span className="font-bold tracking-[0.2em] text-[#4ade80] uppercase text-xs sm:text-sm">
                HOW IT WORKS
              </span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={150}>
            <h2 className="font-extrabold tracking-tight leading-tight text-white text-3xl sm:text-4xl lg:text-[44px] mb-12">
              From first step to{" "}
              <span className="italic font-serif font-normal text-[#4ade80]">
                published.
              </span>
            </h2>
          </ScrollReveal>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} delay={200 + idx * 100}>
                <div className="flex flex-col space-y-2">
                  <span className="font-bold text-[#4ade80] text-sm tracking-wider">
                    {step.num}
                  </span>
                  <h3 className="font-bold text-white text-lg sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function AgenciesHowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Create your account",
      desc: "Set up your agency workspace yourself, with no onboarding calls to sit through.",
    },
    {
      num: "2",
      title: "Place client orders",
      desc: "Pick outlets by authority and price, then order in a few clicks.",
    },
    {
      num: "3",
      title: "We handle production",
      desc: "Our team drafts, pitches and places, while you stay in control of approvals.",
    },
    {
      num: "4",
      title: "Report the wins",
      desc: "Share live placements and authority gains under your own brand.",
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
            <h2 className="font-extrabold tracking-tight leading-tight text-white text-3xl sm:text-4xl lg:text-[44px] mb-3">
              From sign-up to{" "}
              <span className="italic font-serif font-normal text-[#4ade80]">
                published.
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle Paragraph */}
          <ScrollReveal delay={200}>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-12 font-normal">
              No onboarding calls, no minimums. Set up your workspace, order for any client, and let our team handle production while you stay in control.
            </p>
          </ScrollReveal>

          {/* 4 Steps Process with Line & Green Numbered Badges */}
          <div className="relative">
            {/* Horizontal Line connecting steps on desktop */}
            <div className="hidden lg:block absolute top-[16px] left-[20px] right-[20px] h-[1px] bg-slate-800 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative z-10">
              {steps.map((step, idx) => (
                <ScrollReveal key={idx} delay={250 + idx * 100}>
                  <div className="flex flex-col">
                    {/* Number Circle Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#4ade80] text-[#062c19] font-extrabold text-sm flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                      {step.num}
                    </div>

                    <h3 className="font-bold text-white text-lg sm:text-xl mb-2">
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

      </div>
    </section>
  );
}

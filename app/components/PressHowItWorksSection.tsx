"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function PressHowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Choose your publisher",
      desc: "Browse available publishers, review their details and metrics, and select the right placement for your client.",
    },
    {
      num: "02",
      title: "Submit your content",
      desc: "Send us your article on our email and the required information through your RankPartner.io account.",
    },
    {
      num: "03",
      title: "Order review",
      desc: "Our team reviews your submission and confirms that the content meets the selected publisher’s requirements.",
    },
    {
      num: "04",
      title: "Get published",
      desc: "Once approved, your article goes live on the selected publication with the agreed placement and backlink.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 relative z-10 font-sans">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Dark Rounded Container Banner */}
        <div className="bg-[#07132b]/90 border border-slate-800/80 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Ambient Glow inside card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Top Tagline */}
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
              <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-xs sm:text-sm">
                HOW IT WORKS
              </span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={150}>
            <h2 className="font-extrabold tracking-tight leading-tight text-white text-3xl sm:text-4xl lg:text-[44px] mb-12">
              From the first step to the{" "}
              <span className="italic font-serif font-normal text-[#f59e0b]">
                right publisher.
              </span>
            </h2>
          </ScrollReveal>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} delay={200 + idx * 100}>
                <div className="flex flex-col space-y-2">
                  <span className="font-bold text-[#f59e0b] text-sm tracking-wider">
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

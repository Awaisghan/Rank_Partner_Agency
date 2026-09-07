"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { Newspaper, Link2, Tv, ArrowUpRight } from "lucide-react";

export default function WhatYouCanResellSection() {
  const services = [
    {
      icon: Newspaper,
      title: "Press Placements",
      description: "Get your clients featured in reputable publications that build visibility and credibility.",
      link: "/press-placements",
    },
    {
      icon: Link2,
      title: "Authority Backlinks",
      description: "Strengthen your clients’ SEO with backlinks from high-authority publications.",
      link: "/authority-backlinks",
    },
    {
      icon: Tv,
      title: "TV Interviews",
      description: "Connect your clients with TV and streaming opportunities that put them in front of relevant audiences.",
      link: "/tv-interviews",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 relative z-10 font-sans">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Dark Rounded Container Banner */}
        <div className="bg-[#040d21] border border-slate-800/90 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.5)] relative overflow-hidden text-white">
          
          {/* Ambient Glow inside card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Top Tagline */}
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#f59e0b] uppercase">
                WHAT YOU CAN RESELL
              </span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={150}>
            <h2 className="font-extrabold tracking-tight leading-tight text-white text-3xl sm:text-4xl lg:text-[44px] mb-3">
              Three services,{" "}
              <span className="italic font-serif font-normal text-[#f59e0b]">
                one platform.
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle Paragraph */}
          <ScrollReveal delay={200}>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-12 font-normal">
              Offer your clients quality media exposure and SEO authority through three professional services, all available through RankPartner.io.
            </p>
          </ScrollReveal>

          {/* 3 Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={idx} delay={250 + idx * 100}>
                  <div className="bg-[#071738]/80 border border-slate-800 rounded-2xl p-7 sm:p-8 flex flex-col justify-between h-full hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 group shadow-lg">
                    <div>
                      {/* Light Green Icon Badge */}
                      <div className="w-12 h-12 rounded-xl bg-[#0c241d] border border-amber-500/30 text-[#f59e0b] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>

                      {/* Card Title */}
                      <h3 className="font-bold text-white text-xl mb-2.5">
                        {service.title}
                      </h3>

                      {/* Card Subtitle */}
                      <p className="text-slate-400 text-sm leading-relaxed font-normal mb-8">
                        {service.description}
                      </p>
                    </div>

                    {/* Explore Link */}
                    <div>
                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-1.5 text-[#f59e0b] font-bold text-sm hover:underline tracking-wide group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

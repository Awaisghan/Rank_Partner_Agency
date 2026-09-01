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
      description: "Get clients featured in the outlets buyers trust",
      link: "/press-placements",
    },
    {
      icon: Link2,
      title: "Authority Backlinks",
      description: "Build the links that lift client rankings",
      link: "/authority-backlinks",
    },
    {
      icon: Tv,
      title: "TV Interviews",
      description: "Get booked on broadcast and streaming segments",
      link: "/tv-interviews",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 relative z-10 font-sans">
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Dark Rounded Container Banner */}
        <div className="bg-[#040d21] border border-slate-800/90 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.5)] relative overflow-hidden text-white">
          
          {/* Ambient Glow inside card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Top Tagline */}
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#4ade80] uppercase">
                WHAT YOU CAN RESELL
              </span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={150}>
            <h2 className="font-extrabold tracking-tight leading-tight text-white text-3xl sm:text-4xl lg:text-[44px] mb-3">
              Three services,{" "}
              <span className="italic font-serif font-normal text-[#4ade80]">
                one platform.
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle Paragraph */}
          <ScrollReveal delay={200}>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mb-12 font-normal">
              Order any of these for any client, priced per placement and delivered under your brand.
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
                      <div className="w-12 h-12 rounded-xl bg-[#0c241d] border border-emerald-500/30 text-[#4ade80] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
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
                        className="inline-flex items-center gap-1.5 text-[#4ade80] font-bold text-sm hover:underline tracking-wide group-hover:translate-x-0.5 transition-transform"
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

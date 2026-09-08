"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function PlatformPublicationsSection() {
  return (
    <section className="w-full bg-white py-10 px-4 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-[1550px] mx-auto">

        {/* Full-Width Dark Navy Card Container with Large Rounded Corners */}
        <div
          className="rounded-[2.5rem] p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800/80"
          style={{
            background: "linear-gradient(145deg, #050d21 0%, #081635 60%, #040a1b 100%)",
          }}
        >
          {/* Subtle Ambient Glow inside Dark Card */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-700/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">

            {/* ========================================================================= */}
            {/* LEFT COLUMN: TEXT CONTENT (lg:col-span-4)                                 */}
            {/* ========================================================================= */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6">

              {/* Tagline Badge */}
              <ScrollReveal>
                <span className="text-xs font-bold tracking-[0.2em] text-[#f59e0b] uppercase block">
                  THE PLATFORM
                </span>
              </ScrollReveal>

              {/* Main Headline */}
              <ScrollReveal delay={150}>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white tracking-tight leading-[1.12]">
                  Explore publishers and choose{" "}
                  <span className="italic font-serif font-normal text-[#f59e0b] block mt-1">
                    right opportunities
                  </span>
                </h2>
              </ScrollReveal>

              {/* Subtitle / Paragraph */}
              <ScrollReveal delay={250}>
                <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed max-w-lg">
                  Browse a curated list of publishers with key details, authority metrics, and placement information. Compare available options in one place and choose the publications that best match your clients’ goals.
                </p>
              </ScrollReveal>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: PLATFORM PUBLICATIONS SCREENSHOT MOCKUP (lg:col-span-8)     */}
            {/* ========================================================================= */}
            <div className="lg:col-span-8 relative w-full flex items-center justify-center">
              <ScrollReveal delay={300}>
                <div className="w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/80 bg-white group">

                  {/* macOS Browser Header Bar with Live Tracking Pill */}
                  <div className="bg-[#111c35] px-4 sm:px-5 py-3 border-b border-slate-800 flex items-center justify-between select-none">
                    {/* Left: 3 macOS Window Control Dots + URL */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                      </div>
                      <span className="text-xs text-slate-400 font-medium tracking-tight font-mono hidden sm:inline">
                        portal.rankpartner.io/publications
                      </span>
                    </div>

                    {/* Right: Live Tracking Green Pill (Matches Screenshot) */}
                    <div className="flex items-center gap-2 bg-[#0c2a21] border border-amber-500/40 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse shadow-[0_0_8px_#f59e0b]" />
                      <span className="text-[11px] font-bold tracking-wider text-[#f59e0b] uppercase">
                        TRACKING <span className="font-normal text-amber-300 capitalize text-xs ml-1">Live placements</span>
                      </span>
                    </div>
                  </div>

                  {/* Publications Platform Screenshot Image */}
                  <div className="relative w-full bg-slate-50 overflow-hidden">
                    <Image
                      src="/platform-publications.webp"
                      alt="Track every placement and authority platform screenshot"
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover object-top transform transition-transform duration-500 group-hover:scale-[1.01]"
                      priority
                    />
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

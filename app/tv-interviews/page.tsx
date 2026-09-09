"use client";

import React from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import WhatYouGetTvInterviewsSection from "../components/WhatYouGetTvInterviewsSection";
import BeyondTheSegmentSection from "../components/BeyondTheSegmentSection";
import TvHowItWorksSection from "../components/TvHowItWorksSection";
import TvBookedEndToEndSection from "../components/TvBookedEndToEndSection";
import TvGetStartedCTASection from "../components/TvGetStartedCTASection";
import { ArrowRight, Play } from "lucide-react";

export default function TvInterviewsPage() {
  return (
    <main className="min-h-screen bg-[#040d21] text-white overflow-hidden relative font-sans">

      {/* Hero Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-violet-700/12 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[200px] rounded-full pointer-events-none" />

      {/* =========================================================== */}
      {/* HERO SECTION — 90vh height, vertically centered               */}
      {/* =========================================================== */}
      <section
        className="relative z-10 w-full flex items-center overflow-hidden min-h-[100vh] lg:min-h-[85vh] lg:h-auto pt-32 pb-20 lg:pt-24 lg:pb-16"
      >
        <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* ============================================================ */}
            {/* LEFT COLUMN — Text & CTA (col-span-6)                        */}
            {/* ============================================================ */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-20 lg:pt-0">

              {/* Tagline Badge */}
              <ScrollReveal>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                  <span className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase text-xs sm:text-sm">
                    TV INTERVIEWS
                  </span>
                </div>
              </ScrollReveal>

              {/* Main Headline */}
              <ScrollReveal delay={150}>
                <h1
                  className="font-extrabold tracking-tight leading-[1.08] text-white"
                  style={{ fontSize: "clamp(2.2rem, 3.8vw, 4.2rem)" }}
                >
                  Put your clients in front of audiences that{" "}
                  <span className="italic font-serif font-normal text-[#f59e0b]">
                    matter.
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subtitle Paragraph */}
              <ScrollReveal delay={250}>
                <p
                  className="text-slate-300 font-normal leading-relaxed max-w-xl"
                  style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.1rem)" }}
                >
                  Create valuable media opportunities for your clients through TV and streaming interview placements. Connect your clients with relevant programs and build credible exposure that strengthens their public presence.
                </p>
              </ScrollReveal>

              {/* Primary CTA Button */}
              <ScrollReveal delay={350}>
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
                  >
                    <span>Contact us</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </ScrollReveal>

            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN — TV Broadcast Widescreen Player Mockup Card    */}
            {/* ============================================================ */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative w-full pt-10 lg:pt-0 transform lg:scale-[0.85] xl:scale-100 lg:origin-right">
              <ScrollReveal delay={200}>
                {/* Widescreen TV Window Outer Mockup Container */}
                <div className="w-full max-w-[680px] sm:max-w-[720px] bg-[#071630]/95 border border-slate-700/70 rounded-[28px] p-5 sm:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.65)] relative overflow-hidden flex flex-col justify-between">

                  {/* ── VIDEO BROADCAST WIDESCREEN AREA (16:9 aspect ratio) ─ */}
                  <div className="w-full aspect-[16/9.5] min-h-[160px] sm:min-h-[260px] bg-[#040e21] border border-slate-700/80 rounded-2xl relative p-4 sm:p-6 flex flex-col justify-between overflow-hidden group">

                    {/* Ambient Green Spotlight Glow in Center */}
                    <div className="absolute inset-0 bg-amber-500/12 blur-[100px] rounded-full pointer-events-none" />

                    {/* Top Status Header */}
                    <div className="flex items-center justify-between relative z-10">
                      {/* LIVE Badge */}
                      <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#0c241d] border border-amber-500/40 text-[#f59e0b] text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-md tracking-wider uppercase shadow-sm">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                        <span>LIVE</span>
                      </div>

                      {/* Video Duration / Timer */}
                      <div className="bg-[#07172e]/90 text-slate-300 font-mono text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded-md border border-slate-800/80">
                        04:12
                      </div>
                    </div>

                    {/* Center Double-Ring Play Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-amber-500/35 flex items-center justify-center p-1 sm:p-1.5 shadow-[0_0_35px_rgba(245,158,11,0.25)] group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-[#0a1b2e]/95 border border-amber-500/60 text-[#f59e0b] flex items-center justify-center cursor-pointer shadow-inner">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-[#f59e0b] stroke-none ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom TV Overlay Banner (Lower Third) */}
                    <div className="relative z-10 self-start">
                      <div className="bg-[#061427]/90 backdrop-blur-md border border-slate-700/70 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl">
                        <span className="w-[3.5px] h-9 bg-[#f59e0b] rounded-full" />
                        <div>
                          <div className="text-white font-bold text-sm sm:text-base leading-tight">
                            Your client
                          </div>
                          <div className="text-[#f59e0b] text-xs font-normal mt-0.5">
                            Founder and guest expert
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ── BOTTOM CONTROL BAR & ONE-TIME GREEN PROGRESS LINE ─ */}
                  <div className="pt-4 px-1">
                    {/* Progress Track & Animated Green Bar */}
                    <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden relative mb-3">
                      <div
                        className="h-full bg-[#f59e0b] rounded-full shadow-[0_0_14px_rgba(245,158,11,0.9)]"
                        style={{
                          animation: "progressFill 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
                        }}
                      />
                    </div>

                    {/* Bottom Broadcast Info Text */}
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-400/80 tracking-[0.2em] font-mono uppercase">
                      <span>ON AIR</span>
                      <span>NATIONAL BROADCAST</span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* One-time progress line animation keyframe on reload */}
      <style>{`
        @keyframes progressFill {
          0% {
            width: 0%;
          }
          100% {
            width: 65%;
          }
        }
      `}</style>

      {/* =========================================================== */}
      {/* WHAT YOU GET WITH TV INTERVIEWS SECTION (White BG)           */}
      {/* =========================================================== */}
      <WhatYouGetTvInterviewsSection />

      {/* =========================================================== */}
      {/* BEYOND THE SEGMENT SECTION (Gray BG + Animated Card)         */}
      {/* =========================================================== */}
      <BeyondTheSegmentSection />

      {/* =========================================================== */}
      {/* 1. HOW IT WORKS SECTION (Dark Rounded Container Card)       */}
      {/* =========================================================== */}
      <TvHowItWorksSection />

      {/* =========================================================== */}
      {/* 2. BOOKED END TO END SECTION (White BG + Platform Mockup)   */}
      {/* =========================================================== */}
      <TvBookedEndToEndSection />

      {/* =========================================================== */}
      {/* 3. GET STARTED CTA SECTION (Dark CTA Banner)                */}
      {/* =========================================================== */}
      <TvGetStartedCTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import WhatYouGetAuthoritySection from "../components/WhatYouGetAuthoritySection";
import HowItCompoundsSection from "../components/HowItCompoundsSection";
import AuthorityHowItWorksSection from "../components/AuthorityHowItWorksSection";
import MeasurableResultsSection from "../components/MeasurableResultsSection";
import AuthorityCTASection from "../components/AuthorityCTASection";
import { ArrowRight, Link2, Globe } from "lucide-react";

export default function AuthorityBacklinksPage() {
  return (
    <main className="min-h-screen bg-[#040d21] text-white overflow-hidden relative font-sans">

      {/* ========================================================= */}
      {/* HERO AMBIENT GLOWS */}
      {/* ========================================================= */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-blue-600/12 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none" />

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}
      <section
        className="relative z-10 w-full flex items-center overflow-hidden min-h-[100vh] lg:min-h-0 lg:h-[90vh] pt-32 pb-20 lg:py-0"
      >
        <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* ===================================================== */}
            {/* LEFT COLUMN */}
            {/* ===================================================== */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-20 lg:pt-0">

              {/* Tagline */}
              <ScrollReveal>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[2px] bg-[#4ade80] rounded-full" />

                  <span className="font-bold tracking-[0.2em] text-[#4ade80] uppercase text-xs sm:text-sm">
                    AUTHORITY BACKLINKS
                  </span>
                </div>
              </ScrollReveal>

              {/* Heading */}
              <ScrollReveal delay={150}>
                <h1
                  className="font-extrabold tracking-tight leading-[1.08] text-white"
                  style={{
                    fontSize: "clamp(2.2rem, 3.8vw, 4.2rem)",
                  }}
                >
                  Build the backlinks that actually move{" "}
                  <span className="italic font-serif font-normal text-[#4ade80]">
                    rankings.
                  </span>
                </h1>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={250}>
                <p
                  className="text-slate-300 font-normal leading-relaxed max-w-xl"
                  style={{
                    fontSize: "clamp(0.85rem, 1.05vw, 1.1rem)",
                  }}
                >
                  Get guaranteed, high-authority backlinks from the
                  publications Google already trusts and ranks. Every link
                  comes with third-party metrics, so you know exactly what
                  authority you're getting before you commit.
                </p>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal delay={350}>
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    href="#get-in-touch"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#9ef08b] hover:bg-[#8ae476] text-[#062c19] font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_24px_rgba(158,240,139,0.35)] hover:scale-105 active:scale-95"
                  >
                    <span>Contact us</span>

                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* ===================================================== */}
            {/* RIGHT COLUMN */}
            {/* ===================================================== */}
            <div className="hidden lg:flex lg:col-span-6 justify-center lg:justify-end items-center relative w-full pt-10 lg:pt-0">

              <ScrollReveal delay={200}>

                <div className="relative w-[480px] sm:w-[540px] h-[400px] sm:h-[440px] flex items-center justify-center">

                  {/* ================================================= */}
                  {/* SVG NETWORK */}
                  {/* ================================================= */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                    viewBox="0 0 540 440"
                  >

                    <defs>

                      {/* Green glow */}
                      <filter
                        id="greenGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="0"
                          stdDeviation="3"
                          floodColor="#4ade80"
                          floodOpacity="0.9"
                        />
                      </filter>

                      {/* Stronger glow */}
                      <filter
                        id="strongGreenGlow"
                        x="-100%"
                        y="-100%"
                        width="300%"
                        height="300%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="0"
                          stdDeviation="5"
                          floodColor="#4ade80"
                          floodOpacity="1"
                        />
                      </filter>

                    </defs>


                    {/* ================================================= */}
                    {/* DR 92 → CENTER */}
                    {/* ================================================= */}

                    <path
                      d="M 75 72 L 158 140"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="3"
                      strokeDasharray="12 10"
                      filter="url(#greenGlow)"
                      className="network-line"
                    />

                    <circle
                      cx="75"
                      cy="72"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />

                    <circle
                      cx="158"
                      cy="140"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />




                    {/* ================================================= */}
                    {/* DR 84 → CENTER */}
                    {/* ================================================= */}

                    <path
                      d="M 465 72 L 382 140"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="3"
                      strokeDasharray="12 10"
                      filter="url(#greenGlow)"
                      className="network-line"
                    />

                    <circle
                      cx="465"
                      cy="72"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />

                    <circle
                      cx="382"
                      cy="140"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />


                    {/* ================================================= */}
                    {/* DR 90 → CENTER */}
                    {/* ================================================= */}

                    <path
                      d="M 465 368 L 382 300"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="3"
                      strokeDasharray="12 10"
                      filter="url(#greenGlow)"
                      className="network-line"
                    />

                    <circle
                      cx="465"
                      cy="368"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />

                    <circle
                      cx="382"
                      cy="300"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />


                    {/* ================================================= */}
                    {/* DR 79 → CENTER */}
                    {/* ================================================= */}

                    <path
                      d="M 75 368 L 158 300"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="3"
                      strokeDasharray="12 10"
                      filter="url(#greenGlow)"
                      className="network-line"
                    />

                    <circle
                      cx="75"
                      cy="368"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />

                    <circle
                      cx="158"
                      cy="300"
                      r="4"
                      fill="#4ade80"
                      filter="url(#strongGreenGlow)"
                    />

                  </svg>


                  {/* ================================================= */}
                  {/* CENTER CARD */}
                  {/* ================================================= */}

                  <div
                    className="
                      w-56
                      h-64
                      bg-[#071638]/95
                      backdrop-blur-xl
                      border
                      border-slate-700/80
                      rounded-3xl
                      p-6
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                      relative
                      z-20
                      group
                      hover:border-[#4ade80]/60
                      transition-all
                      duration-300
                    "
                  >

                    {/* Link icon */}
                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-[#0c2a21]
                        border
                        border-[#4ade80]/40
                        text-[#4ade80]
                        flex
                        items-center
                        justify-center
                        mb-3
                        shadow-[0_0_18px_rgba(74,222,128,0.25)]
                      "
                    >
                      <Link2 className="w-5 h-5 stroke-[2.5]" />
                    </div>


                    {/* Rating */}
                    <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-1">
                      71
                    </div>


                    {/* Label */}
                    <div className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-4">
                      DOMAIN RATING
                    </div>


                    {/* Growth */}
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        bg-[#0c2a21]
                        text-[#4ade80]
                        border
                        border-[#4ade80]/40
                        px-3.5
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                        shadow-[0_0_14px_rgba(74,222,128,0.3)]
                      "
                    >
                      <span>↗</span>
                      <span>+23</span>
                    </div>

                  </div>


                  {/* ================================================= */}
                  {/* DR 92 */}
                  {/* ================================================= */}

                  <div className="absolute top-14 left-6 z-20">

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        bg-[#0a1836]/90
                        backdrop-blur-md
                        border
                        border-emerald-500/40
                        text-emerald-400
                        text-xs
                        font-bold
                        px-3.5
                        py-1.5
                        rounded-full
                        shadow-[0_0_20px_rgba(74,222,128,0.25)]
                        hover:scale-105
                        transition-transform
                      "
                    >
                      <Globe className="w-3.5 h-3.5 text-[#4ade80]" />

                      <span>DR 92</span>
                    </div>

                  </div>




                  {/* ================================================= */}
                  {/* DR 84 */}
                  {/* ================================================= */}

                  <div className="absolute top-14 right-6 z-20">

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        bg-[#0a1836]/90
                        backdrop-blur-md
                        border
                        border-emerald-500/40
                        text-emerald-400
                        text-xs
                        font-bold
                        px-3.5
                        py-1.5
                        rounded-full
                        shadow-[0_0_20px_rgba(74,222,128,0.25)]
                        hover:scale-105
                        transition-transform
                      "
                    >
                      <Globe className="w-3.5 h-3.5 text-[#4ade80]" />

                      <span>DR 84</span>
                    </div>

                  </div>


                  {/* ================================================= */}
                  {/* DR 90 */}
                  {/* ================================================= */}

                  <div className="absolute bottom-14 right-6 z-20">

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        bg-[#0a1836]/90
                        backdrop-blur-md
                        border
                        border-emerald-500/40
                        text-emerald-400
                        text-xs
                        font-bold
                        px-3.5
                        py-1.5
                        rounded-full
                        shadow-[0_0_20px_rgba(74,222,128,0.25)]
                        hover:scale-105
                        transition-transform
                      "
                    >
                      <Globe className="w-3.5 h-3.5 text-[#4ade80]" />

                      <span>DR 90</span>
                    </div>

                  </div>


                  {/* ================================================= */}
                  {/* DR 79 */}
                  {/* ================================================= */}

                  <div className="absolute bottom-14 left-6 z-20">

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        bg-[#0a1836]/90
                        backdrop-blur-md
                        border
                        border-emerald-500/40
                        text-emerald-400
                        text-xs
                        font-bold
                        px-3.5
                        py-1.5
                        rounded-full
                        shadow-[0_0_20px_rgba(74,222,128,0.25)]
                        hover:scale-105
                        transition-transform
                      "
                    >
                      <Globe className="w-3.5 h-3.5 text-[#4ade80]" />

                      <span>DR 79</span>
                    </div>

                  </div>

                </div>

              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* WHAT YOU GET */}
      {/* ========================================================= */}

      <WhatYouGetAuthoritySection />


      {/* ========================================================= */}
      {/* HOW IT COMPOUNDS */}
      {/* ========================================================= */}

      <HowItCompoundsSection />


      {/* ========================================================= */}
      {/* HOW IT WORKS */}
      {/* ========================================================= */}

      <AuthorityHowItWorksSection />


      {/* ========================================================= */}
      {/* MEASURABLE RESULTS */}
      {/* ========================================================= */}

      <MeasurableResultsSection />


      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <AuthorityCTASection />


      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <Footer />


      {/* ========================================================= */}
      {/* ANIMATION FOR OTHER LINES */}
      {/* ========================================================= */}

      <style>{`

        .network-line {
          animation: signalFlow 1.5s linear infinite;
        }

        @keyframes signalFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -22;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .network-line {
            animation: none;
          }
        }
      `}</style>

    </main>
  );
}
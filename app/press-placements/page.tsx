"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import CoverageMomentumSection from "../components/CoverageMomentumSection";
import PressHowItWorksSection from "../components/PressHowItWorksSection";
import SeeBeforeYouBuySection from "../components/SeeBeforeYouBuySection";
import GetStartedCTASection from "../components/GetStartedCTASection";
import { ArrowRight, CheckCircle2, FileText, RotateCcw, Newspaper, Gauge, Clock, BadgeDollarSign } from "lucide-react";

export default function PressPlacementsPage() {
  const [animKey, setAnimKey] = useState(0);

  const replayAnimation = useCallback(() => {
    setAnimKey((k) => k + 1);
  }, []);

  return (
    <main className="min-h-screen bg-[#040d21] text-white overflow-hidden relative font-sans">

      {/* Hero Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-violet-700/12 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/8 blur-[200px] rounded-full pointer-events-none" />

      {/* =========================================================== */}
      {/* HERO SECTION — 100vh, items vertically centered              */}
      {/* =========================================================== */}
      <section className="relative z-10 w-full flex items-center overflow-hidden min-h-[100vh] lg:min-h-[85vh] pt-32 pb-20 lg:pt-24 lg:pb-16">
        <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

            {/* ============================================================ */}
            {/* LEFT COLUMN — Text & CTAs (col-span-5)                        */}
            {/* ============================================================ */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6 pt-20 lg:pt-0">

              {/* Tagline Badge */}
              <ScrollReveal>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                  <span
                    className="font-bold tracking-[0.2em] text-[#f59e0b] uppercase"
                    style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
                  >
                    PRESS PLACEMENTS
                  </span>
                </div>
              </ScrollReveal>

              {/* Main Headline — same clamp as home hero */}
              <ScrollReveal delay={150}>
                <h1
                  className="font-extrabold tracking-tight leading-[1.08] text-white"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)" }}
                >
                  Get your clients featured where it{" "}
                  <span className="italic font-serif font-normal text-[#f59e0b]">
                    matters.
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subtitle */}
              <ScrollReveal delay={250}>
                <p
                  className="text-slate-300 font-normal leading-relaxed max-w-lg"
                  style={{ fontSize: "clamp(0.82rem, 1vw, 1.05rem)" }}
                >
                  Put your clients in front of relevant audiences through trusted publishing opportunities. Choose the right publication, review the details upfront, and get their content published with a professional press placement.
                </p>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal delay={350}>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {/* Primary CTA */}
                  <Link
                    href="/#get-in-touch"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-sm transition-all duration-300 shadow-[0_0_22px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
                  >
                    <span>Contact us</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Replay Animation Button */}
                  <button
                    onClick={replayAnimation}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#091535]/80 hover:bg-[#102352] border border-slate-700/80 text-white font-semibold text-sm transition-all duration-200 hover:border-slate-600"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
                    <span>Replay Animation</span>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN — Featured Story Card (col-span-7)              */}
            {/* ============================================================ */}
            <div className="lg:col-span-8 flex justify-end items-center relative w-full transform lg:scale-[0.85] xl:scale-100 lg:origin-right">
              <div className="w-full">

                {/* ── OUTER GLASS CARD ─────────────────────────────────── */}
                <div className="w-full max-w-[620px] ml-auto bg-[#071638]/95 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 border border-slate-700/70 shadow-[0_30px_80px_rgba(0,0,0,0.55)] relative">

                  {/* Green Check Badge — top-right corner */}
                  <div className="absolute -top-4 -right-4 w-11 h-11 rounded-full bg-[#0c2a21] border-2 border-[#f59e0b] flex items-center justify-center text-[#f59e0b] shadow-[0_0_24px_rgba(245,158,11,0.45)] z-20">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  {/* ── CARD HEADER ROW ─────────────────────────────── */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 bg-amber-950/70 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
                      <FileText className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span className="text-xs font-semibold text-[#f59e0b]">Featured story</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                      <span className="text-xs font-semibold text-slate-300">Published</span>
                    </div>
                  </div>

                  {/* ── MAIN DARK MOCKUP AREA ───────────────────────── */}
                  <div
                    className="w-full rounded-2xl bg-gradient-to-br from-[#0c2045] via-[#091736] to-[#050e24] border border-slate-700/60 p-5 relative overflow-hidden mb-5 shadow-inner"
                    style={{ height: "clamp(150px, 16vh, 200px)" }}
                  >
                    {/* TIER-ONE OUTLET badge */}
                    <div className="w-fit bg-[#061430] border border-amber-500/30 px-3 py-1 rounded-md text-[10px] font-extrabold tracking-widest text-[#f59e0b] uppercase">
                      TIER-ONE OUTLET
                    </div>

                    {/* Subtle radial glow inside mockup */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(109,40,217,0.08),transparent_60%)] pointer-events-none" />

                    {/* Dot-grid texture */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(148,163,184,0.4) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                  </div>

                  {/* ── ANIMATED GREEN PROGRESS BAR ─────────────────── */}
                  <div className="space-y-2 mb-4" key={animKey}>
                    {/* Track */}
                    <div className="w-full h-3.5 rounded-full bg-slate-800/90 overflow-hidden border border-slate-700/50 p-0.5">
                      <div
                        className="h-full rounded-full bg-[#f59e0b] shadow-[0_0_16px_rgba(245,158,11,0.7)]"
                        style={{
                          animation:
                            "ppFillBar 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards",
                        }}
                      />
                    </div>
                    {/* Skeleton sub-line */}
                    <div className="w-3/4 h-2 rounded-full bg-slate-800/80" />
                  </div>

                  {/* ── AUTHOR AVATAR ROW ───────────────────────────── */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800/70">
                    {/* Avatar circle skeleton */}
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="w-36 h-2 rounded-full bg-slate-800" />
                      <div className="w-24 h-1.5 rounded-full bg-slate-800/60" />
                    </div>
                  </div>

                  {/* ── AS FEATURED IN ──────────────────────────────── */}
                  <div>
                    <span className="text-[9px] font-extrabold tracking-[0.22em] text-slate-500 uppercase block mb-2.5">
                      AS FEATURED IN
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-16 rounded-md bg-slate-800/80 border border-slate-700/50" />
                      <div className="h-5 w-20 rounded-md bg-slate-800/80 border border-slate-700/50" />
                      <div className="h-5 w-16 rounded-md bg-slate-800/80 border border-slate-700/50" />
                      <div className="h-5 w-14 rounded-md bg-slate-800/80 border border-slate-700/50" />
                    </div>
                  </div>

                </div>
                {/* ── END OUTER CARD ────────────────────────────────────── */}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CSS Keyframe for progress bar */}
      <style>{`
        @keyframes ppFillBar {
          0%   { width: 0%; }
          80%  { width: 100%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* =========================================================== */}
      {/* THE PROGRAM: What you get with Press Placements             */}
      {/* =========================================================== */}
      <section className="relative z-10 w-full bg-white py-20 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 border-t border-slate-100">
        <div className="max-w-[1360px] mx-auto">

          {/* Section Label */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-[2px] bg-[#6d28d9] rounded-full" />
              <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#6d28d9] uppercase">
                THE PROGRAM
              </span>
            </div>
          </ScrollReveal>

          {/* Main Section Heading */}
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#0a0f1d] tracking-tight leading-[1.15] mb-4">
              What you get with{" "}
              <span className="italic font-serif font-normal text-[#6d28d9]">
                Press Placements.
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={150}>
            <p className="text-[15px] sm:text-base text-[#64748b] leading-relaxed max-w-2xl mb-12 sm:mb-16 font-normal">
              Everything you need to offer professional press placement opportunities to your clients through a simple, transparent process.
            </p>
          </ScrollReveal>

          {/* 4-Column Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 — Quality publishing opportunities */}
            <ScrollReveal delay={120}>
              <div className="bg-white rounded-[1.25rem] border border-[#e2e8f0] p-7 sm:p-8 h-full flex flex-col justify-start hover:shadow-xl hover:shadow-slate-100 hover:border-violet-200 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-6 group-hover:bg-[#dbeafe] transition-colors duration-300">
                  <Newspaper className="w-5 h-5 text-[#6d28d9] stroke-[2]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0f172a] mb-2.5 tracking-tight">
                  Quality publishing opportunities
                </h3>
                <p className="text-[14.5px] text-[#64748b] leading-[1.65] font-normal">
                  Access a curated selection of publishers with key details and authority metrics to help you choose the right placement.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2 — Pay per placement */}
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-[1.25rem] border border-[#e2e8f0] p-7 sm:p-8 h-full flex flex-col justify-start hover:shadow-xl hover:shadow-slate-100 hover:border-violet-200 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-6 group-hover:bg-[#dbeafe] transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#6d28d9] stroke-[2]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0f172a] mb-2.5 tracking-tight">
                  Pay per placement
                </h3>
                <p className="text-[14.5px] text-[#64748b] leading-[1.65] font-normal">
                  Choose the placements you need and pay based on the selected publishing opportunity, with pricing available upfront.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3 — Authority you can review */}
            <ScrollReveal delay={280}>
              <div className="bg-white rounded-[1.25rem] border border-[#e2e8f0] p-7 sm:p-8 h-full flex flex-col justify-start hover:shadow-xl hover:shadow-slate-100 hover:border-violet-200 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-6 group-hover:bg-[#dbeafe] transition-colors duration-300">
                  <Gauge className="w-5 h-5 text-[#6d28d9] stroke-[2]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0f172a] mb-2.5 tracking-tight">
                  Authority you can review
                </h3>
                <p className="text-[14.5px] text-[#64748b] leading-[1.65] font-normal">
                  See important publisher metrics and placement details before you order, so you can make informed decisions for your clients.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 4 — Simple publication process */}
            <ScrollReveal delay={360}>
              <div className="bg-white rounded-[1.25rem] border border-[#e2e8f0] p-7 sm:p-8 h-full flex flex-col justify-start hover:shadow-xl hover:shadow-slate-100 hover:border-violet-200 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-6 group-hover:bg-[#dbeafe] transition-colors duration-300">
                  <Clock className="w-5 h-5 text-[#6d28d9] stroke-[2]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0f172a] mb-2.5 tracking-tight">
                  Simple publication process
                </h3>
                <p className="text-[14.5px] text-[#64748b] leading-[1.65] font-normal">
                  Submit your content through our email and let our team handle the review and coordinate the publication with the selected publisher.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* WHY IT WORKS: Coverage that keeps working for you           */}
      {/* =========================================================== */}
      <CoverageMomentumSection />

      {/* =========================================================== */}
      {/* HOW IT WORKS: From first step to published                  */}
      {/* =========================================================== */}
      <PressHowItWorksSection />

      {/* =========================================================== */}
      {/* SEE BEFORE YOU BUY: The metrics on every outlet.            */}
      {/* =========================================================== */}
      <SeeBeforeYouBuySection />

      {/* =========================================================== */}
      {/* GET STARTED CTA: Ready to get your clients featured?        */}
      {/* =========================================================== */}
      <GetStartedCTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

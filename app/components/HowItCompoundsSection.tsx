"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { Globe, Link2, TrendingUp, Search } from "lucide-react";

export default function HowItCompoundsSection() {
  const [inView, setInView] = useState(false);
  const [activeRank, setActiveRank] = useState(5);
  const [drCount, setDrCount] = useState(0);
  const [rdCount, setRdCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setActiveRank(5);
          setDrCount(0);
          setRdCount(0);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rank climb animation (Rank 5 -> 1) when scrolled into view
  useEffect(() => {
    if (!inView) return;

    const rankInterval = setInterval(() => {
      setActiveRank((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(rankInterval);
        return 1;
      });
    }, 750);

    return () => clearInterval(rankInterval);
  }, [inView]);

  // Smooth count-up stats (0 -> 58, 0 -> 240)
  useEffect(() => {
    if (!inView) return;

    const duration = 2500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const drTarget = 58;
    const rdTarget = 240;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 2);

      setDrCount(Math.min(drTarget, Math.round(drTarget * easeProgress)));
      setRdCount(Math.min(rdTarget, Math.round(rdTarget * easeProgress)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView]);

  const bullets = [
    {
      icon: Globe,
      title: "Authority at the source",
      description:
        "A link from a high-DR domain is Google's version of trust, transferred straight to your client's website.",
    },
    {
      icon: Link2,
      title: "Placed in real, relevant content",
      description:
        "Every link sits inside indexed, live content on a legitimate publication. It's not buried in a footer or planted on a network site.",
    },
    {
      icon: TrendingUp,
      title: "A ranking signal that spreads",
      description:
        "That trust flows across your client's domain, giving page after page a better shot at climbing the results.",
    },
  ];

  // Helper to render rank rows 1..5 with active client card moving up to activeRank
  const renderRankRows = () => {
    const rows = [];
    for (let r = 1; r <= 5; r++) {
      const isClient = r === activeRank;

      if (isClient) {
        // Active Client Highlighted Row
        rows.push(
          <div
            key={r}
            className="bg-blue-50/90 border border-blue-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-[0_6px_20px_rgba(59,130,246,0.15)] transition-all duration-700 ease-in-out transform translate-y-0"
          >
            <div className="flex items-center gap-3.5">
              <span className="font-extrabold text-blue-600 text-sm w-4 text-center">
                {r}
              </span>
              <div className="w-7 h-7 rounded-lg bg-blue-600 shadow-sm" />
              <div className="w-36 sm:w-44 h-3.5 bg-blue-600/80 rounded-full" />
            </div>

            <div className="bg-blue-100/90 text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200">
              YOUR CLIENT
            </div>
          </div>
        );
      } else {
        // Skeleton Generic SERP Result Row
        rows.push(
          <div
            key={r}
            className="p-3 flex items-center justify-between rounded-xl transition-all duration-500 opacity-60 hover:opacity-100"
          >
            <div className="flex items-center gap-3.5">
              <span className="font-semibold text-slate-400 text-sm w-4 text-center">
                {r}
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100" />
              <div
                className="h-3 bg-slate-100 rounded-full"
                style={{ width: `${140 + (r % 3) * 30}px` }}
              />
            </div>
          </div>
        );
      }
    }
    return rows;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f8fafc] text-gray-900 py-24 sm:py-32 relative z-10 font-sans border-t border-slate-200/60"
    >
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ============================================================ */}
          {/* LEFT COLUMN — Text Content & 3 Bullets (col-span-6)          */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">

            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                <span className="font-bold tracking-[0.2em] text-blue-600 uppercase text-xs sm:text-sm">
                  HOW IT COMPOUNDS
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h2 className="font-extrabold tracking-tight leading-tight text-gray-900 text-3xl sm:text-4xl lg:text-[46px]">
                One strong link{" "}
                <span className="italic font-serif font-normal text-blue-600">
                  lifts the whole site.
                </span>
              </h2>
            </ScrollReveal>

            {/* Paragraph Subtitle */}
            <ScrollReveal delay={250}>
              <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed max-w-xl pb-2">
                Authority isn't spent in one place; it flows through the whole website. A link from a domain Google already trusts passes that trust directly to your client, and it keeps compounding as Google crawls more of their site.
              </p>
            </ScrollReveal>

            {/* 3 Feature Bullets */}
            <div className="space-y-6 pt-2">
              {bullets.map((bullet, idx) => {
                const Icon = bullet.icon;
                return (
                  <ScrollReveal key={idx} delay={300 + idx * 100}>
                    <div className="flex items-start gap-4 group">
                      {/* Light Blue Icon Square */}
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>

                      {/* Text */}
                      <div>
                        <h3 className="font-bold text-gray-900 text-base mb-1">
                          {bullet.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-normal max-w-md">
                          {bullet.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN — Animated Interactive SERP Mockup Card         */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal delay={200}>
              <div className="w-full max-w-[500px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8 flex flex-col justify-between">

                {/* Top Search Bar Skeleton */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-full px-4 py-2.5 flex items-center gap-3 mb-6">
                  <Search className="w-4 h-4 text-slate-400" />
                  <div className="w-48 sm:w-56 h-2.5 bg-slate-200/80 rounded-full" />
                </div>

                {/* SERP Rankings List (Animate Rank 5 -> 1) */}
                <div className="space-y-2 mb-8 min-h-[250px]">
                  {renderRankRows()}
                </div>

                {/* Bottom Divider & Animated Count-Up Stats */}
                <div className="border-t border-slate-100 pt-6 flex items-center justify-between">

                  {/* Stat 1: Domain Rating (0 -> 58) */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2563eb]">
                      <span className="text-sm font-bold">↗</span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {drCount}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase">
                      DOMAIN RATING
                    </div>
                  </div>

                  {/* Stat 2: Referring Domains (0 -> 240) */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2563eb]">
                      <span className="text-sm font-bold">↗</span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {rdCount}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase">
                      REFERRING DOMAINS
                    </div>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

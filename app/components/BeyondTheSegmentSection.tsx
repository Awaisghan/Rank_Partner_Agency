"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import {
  Tv,
  FileText,
  CheckCircle2,
  Play,
  Globe,
  Share2,
  Mail,
  CheckCircle,
} from "lucide-react";

export default function BeyondTheSegmentSection() {
  const [inView, setInView] = useState(false);
  const [activeCheckCount, setActiveCheckCount] = useState(0);
  const [clipsCount, setClipsCount] = useState(0);
  const [channelsCount, setChannelsCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setActiveCheckCount(0);
          setClipsCount(0);
          setChannelsCount(0);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sequential checkmark reveal (items 1..4)
  useEffect(() => {
    if (!inView) return;

    const timer1 = setTimeout(() => setActiveCheckCount(1), 350);
    const timer2 = setTimeout(() => setActiveCheckCount(2), 750);
    const timer3 = setTimeout(() => setActiveCheckCount(3), 1150);
    const timer4 = setTimeout(() => setActiveCheckCount(4), 1550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [inView]);

  // Smooth count-up for stats (0 -> 9, 0 -> 4)
  useEffect(() => {
    if (!inView) return;

    const duration = 2200;
    const stepTime = 30;
    const steps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 2);

      setClipsCount(Math.min(9, Math.round(9 * easeProgress)));
      setChannelsCount(Math.min(4, Math.round(4 * easeProgress)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView]);

  const bullets = [
    {
      icon: Tv,
      title: "Credibility on camera",
      description:
        "Being featured in a recognized program can give your client’s brand added credibility and help build trust with potential customers.",
    },
    {
      icon: FileText,
      title: "Content with lasting value",
      description:
        "A media appearance can become valuable content for your client’s website, social media, presentations, and other marketing channels.",
    },
    {
      icon: CheckCircle2,
      title: "Exposure that builds recognition",
      description:
        "Relevant TV and streaming opportunities can help your clients reach new audiences and strengthen their presence beyond traditional digital marketing.",
    },
  ];

  const distributionItems = [
    { id: 1, label: "Website embed", icon: Globe },
    { id: 2, label: "Social content", icon: Share2 },
    { id: 3, label: "Sales presentation", icon: FileText },
    { id: 4, label: "Email feature", icon: Mail },
  ];

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
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">

            {/* Tagline Badge */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-violet-700 rounded-full" />
                <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs sm:text-sm">
                  BEYOND THE SEGMENT
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={150}>
              <h2 className="font-extrabold tracking-tight leading-tight text-gray-900 text-3xl sm:text-4xl lg:text-[46px]">
                Turn media exposure into{" "}
                <span className="italic font-serif font-normal text-[#6d28d9]">
                  lasting brand value.
                </span>
              </h2>
            </ScrollReveal>

            {/* Paragraph Subtitle */}
            <ScrollReveal delay={250}>
              <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed max-w-xl pb-2">
                A TV or streaming appearance can give your clients more than a moment on screen. Use credible media exposure to strengthen their reputation, increase visibility, and create content opportunities across their marketing channels.
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
                      <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#6d28d9] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-violet-700 group-hover:text-white transition-colors duration-300">
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
          {/* RIGHT COLUMN — Interactive Distribution Channels Stacked Card */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <ScrollReveal delay={200}>
              <div className="w-full sm:min-w-[560px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-5 sm:p-8 flex flex-col justify-between">

                {/* Top Active Segment Card */}
                <div className="bg-[#fafafa] border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between mb-4 shadow-sm">
                  <div className="flex items-center gap-3.5">
                    {/* Blue Play Square */}
                    <div className="w-10 h-10 rounded-xl bg-violet-700 text-white flex items-center justify-center shadow-md flex-shrink-0">
                      <Play className="w-5 h-5 fill-white stroke-none ml-0.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                        On-air segment
                      </h4>
                      <p className="text-slate-400 text-xs font-normal">
                        One appearance, multiple opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-100/90 text-slate-400 font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200/70">
                    04:12
                  </div>
                </div>

                {/* 4 Distribution Channels List with Sequential Animated Checkmarks */}
                <div className="space-y-2.5 mb-8">
                  {distributionItems.map((item) => {
                    const ItemIcon = item.icon;
                    const isChecked = activeCheckCount >= item.id;

                    return (
                      <div
                        key={item.id}
                        className={`border rounded-2xl p-3.5 flex items-center justify-between transition-all duration-500 ${
                          isChecked
                            ? "bg-white border-slate-200 shadow-sm"
                            : "bg-slate-50/50 border-slate-100 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-violet-50 text-[#6d28d9] flex items-center justify-center flex-shrink-0">
                            <ItemIcon className="w-4 h-4 stroke-[2.2]" />
                          </div>
                          <span className="font-bold text-gray-900 text-sm">
                            {item.label}
                          </span>
                        </div>

                        {/* Animated Blue Check Circle */}
                        <div
                          className={`transition-all duration-500 transform ${
                            isChecked
                              ? "scale-100 opacity-100"
                              : "scale-50 opacity-0"
                          }`}
                        >
                          <CheckCircle className="w-5 h-5 text-[#6d28d9] fill-violet-700 stroke-white" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Divider & Animated Count-Up Stats */}
                <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center gap-8 sm:gap-16">

                  {/* Stat 1: Content Opportunities (0 -> 9) */}
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                      {clipsCount}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase">
                      CONTENT OPPORTUNITIES
                    </div>
                  </div>

                  {/* Stat 2: Marketing Channels (0 -> 4) */}
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                      {channelsCount}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase">
                      MARKETING CHANNELS
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

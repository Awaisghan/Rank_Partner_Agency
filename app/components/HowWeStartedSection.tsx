"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function HowWeStartedSection() {
  return (
    <section className="w-full bg-white text-slate-900 py-14 sm:py-16 px-6 sm:px-10 lg:px-16 font-sans relative z-10">
      <div className="w-full max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Sticky Header Block */}
          <div className="lg:col-span-5 sticky top-28 self-start h-fit">
            <ScrollReveal>
              {/* Tagline Badge */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-5 h-[2px] bg-[#3b82f6] rounded-full" />
                <span className="font-bold tracking-[0.18em] text-[#3b82f6] uppercase text-[11px] sm:text-xs">
                  HOW WE STARTED
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-extrabold tracking-tight leading-[1.2] text-slate-900 text-2xl sm:text-3xl lg:text-[32px] max-w-sm my-2">
                Built by operators tired of{" "}
                <span className="italic font-serif font-normal text-[#3b82f6]">
                  paying for promises.
                </span>
              </h2>

              {/* Subtitle Footer */}
              <p className="text-slate-400 font-extrabold tracking-[0.16em] uppercase text-[10px] sm:text-[11px] mt-4">
                INDEPENDENT SINCE 2019
              </p>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Scrolling Story Content */}
          <div className="lg:col-span-7 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            <ScrollReveal delay={100}>
              <p>
                Ascend started in 2019, after years of watching good companies pour money into PR and SEO and get nothing they could point to. Big invoices, slide decks full of &ldquo;impressions,&rdquo; and very few actual placements.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p>
                So we flipped the model. You pay per placement, and you see the publication, the metrics and the price before you ever commit. What began as a handful of founders trading favors with editors is now a full press and search team running both motions as one.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p>
                Today we work exclusively with agencies, who resell our press and search work to their clients under their own name, all on the same simple promise: coverage that runs, rankings that climb and pricing you can see before you commit.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <p className="pt-1">
                We believe transparency is the highest form of respect in business. When you partner with us, you gain access to an established network of top-tier tier-1 and authority publications without retainer lock-ins or hidden markups.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p>
                Every article we publish is vetted for high domain rating, genuine organic traffic, and indexation guarantees. That is why over 3,000 agencies trust us as their behind-the-scenes engine for scale.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

import ScrollReveal from "./ScrollReveal";

export default function WhatYouResell() {
  return (
    <section className="w-full bg-white text-slate-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 relative z-10 border-t border-slate-100">
      <div className="max-w-[1550px] mx-auto flex flex-col items-start text-left space-y-6">
        {/* Tagline / Accent Line */}
        <ScrollReveal>
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#6d28d9] rounded-full" />
            <span
              className="font-semibold tracking-[0.2em] text-[#6d28d9] uppercase"
              style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
            >
              WHAT YOU RESELL
            </span>
          </div>
        </ScrollReveal>

        {/* Main Section Headline */}
        <ScrollReveal delay={150}>
          <h2
            className="font-extrabold tracking-tight leading-[1.12] text-[#0f172a] max-w-4xl"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
          >
            Press coverage and rankings that{" "}
            <span className="italic font-serif text-[#6d28d9] font-normal block sm:inline mt-1 sm:mt-0">
              work together.
            </span>
          </h2>
        </ScrollReveal>

        {/* Subtitle / Paragraph */}
        <ScrollReveal delay={250}>
          <p
            className="text-slate-500 font-normal leading-relaxed max-w-2xl sm:max-w-3xl pt-1"
            style={{ fontSize: "clamp(0.88rem, 1.05vw, 1.08rem)" }}
          >
            Give clients more visibility and authority with RankPartner.io’s white-label press placements and high-authority backlinks. We handle fulfillment while you grow your brand.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

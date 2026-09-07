import BrandSphere from "./components/BrandSphere";
import ScrollReveal from "./components/ScrollReveal";
import WhatYouResell from "./components/WhatYouResell";
import PlacementsSection from "./components/PlacementsSection";
import PlatformFeaturesSection from "./components/PlatformFeaturesSection";
import PlatformPublicationsSection from "./components/PlatformPublicationsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import TheDifferenceSection from "./components/TheDifferenceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#040d21] text-white font-sans selection:bg-[#f59e0b] selection:text-[#050b1e]">
      {/* Background Decorative Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-violet-700/10 blur-3xl md:blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-500/5 blur-3xl md:blur-[160px] rounded-full" />
      </div>

      {/* Hero Section — Responsive height */}
      <section
        className="relative z-10 w-full overflow-hidden min-h-[100vh] lg:h-[100vh] flex items-center pt-28 pb-16 lg:pt-16 lg:pb-0"
      >
        {/* Content centered */}
        <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center w-full">

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left space-y-5">
              {/* Tagline */}
              <ScrollReveal>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                  <span
                    className="font-semibold tracking-[0.18em] text-[#f59e0b] uppercase"
                    style={{ fontSize: "clamp(10px, 0.8vw, 13px)" }}
                  >
                    WHITE-LABEL PR &amp; SEO SOLUTIONS
                  </span>
                </div>
              </ScrollReveal>

              {/* Main Headline */}
              <ScrollReveal delay={150}>
                <h1
                  className="font-extrabold tracking-tight leading-[1.1] text-white"
                  style={{ fontSize: "clamp(2.2rem, 4.3vw, 4.6rem)" }}
                >
                  Get Featured. <br />
                  Build Authority. <br />
                  <span className="italic font-serif text-[#f59e0b] font-normal inline-block mt-0.5">
                    Rank Higher.
                  </span>
                </h1>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={250}>
                <p
                  className="text-slate-300 max-w-lg font-normal leading-relaxed"
                  style={{ fontSize: "clamp(0.82rem, 1vw, 1.05rem)" }}
                >
                  The white-label platform built for agencies that want to deliver real PR and SEO results. Secure press placements in trusted publications and build high-authority backlinks that strengthen your clients’ online presence. With transparent,{" "}
                  <a
                    href="#get-in-touch"
                    className="text-white font-semibold underline decoration-[#f59e0b] decoration-2 underline-offset-4 hover:text-[#f59e0b] transition-colors"
                  >
                    flat-rate pricing for every placement
                  </a>
                  , you know the cost before your client’s article goes live.
                </p>
              </ScrollReveal>

              {/* Buttons */}
              <ScrollReveal delay={350}>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#get-in-touch"
                    className="px-7 py-3.5 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#050b1e] font-bold transition-all duration-200 shadow-lg active:scale-95 text-sm sm:text-base"
                  >
                    Contact us
                  </a>
                  <a
                    href="#how-it-works"
                    className="px-7 py-3.5 rounded-full bg-[#091535]/80 hover:bg-[#102352] border border-slate-700/80 text-white font-semibold transition-all duration-200 flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span>See how it works</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT SIDE 3D BRAND SPHERE */}
            <div className="lg:col-span-5 xl:col-span-6 hidden lg:block relative">
              <ScrollReveal delay={400}>
                <BrandSphere />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT YOU RESELL SECTION */}
      <ScrollReveal direction="up" distance={40}>
        <WhatYouResell />
      </ScrollReveal>

      {/* PLACEMENTS + AUTHORITY ANIMATION SECTION */}
      <ScrollReveal direction="up" distance={40}>
        <PlacementsSection />
      </ScrollReveal>

      {/* PLATFORM FEATURES & ORDER TRACKING SECTION */}
      <ScrollReveal direction="up" distance={40}>
        <PlatformFeaturesSection />
      </ScrollReveal>

      {/* THE PLATFORM: TRACK PLACEMENTS & AUTHORITY SECTION */}
      <ScrollReveal direction="up" distance={40}>
        <PlatformPublicationsSection />
      </ScrollReveal>

      {/* HOW IT WORKS: 5-STEP TIMELINE SECTION */}
      <ScrollReveal direction="up" distance={40}>
        <HowItWorksSection />
      </ScrollReveal>

      {/* THE DIFFERENCE: THE STANDARD BEHIND EVERY PLACEMENT SECTION */}
      <ScrollReveal direction="up" distance={40}>
        <TheDifferenceSection />
      </ScrollReveal>

      {/* GET IN TOUCH: READY TO PLAN YOUR ASCENT CONTACT FORM SECTION */}
      <ScrollReveal direction="up" distance={40}>
        <ContactSection />
      </ScrollReveal>

      {/* FOOTER SECTION */}
      <ScrollReveal direction="up" distance={30}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}



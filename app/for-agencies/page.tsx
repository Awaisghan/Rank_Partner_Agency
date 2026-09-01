"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ForAgenciesHeroSection from "../components/ForAgenciesHeroSection";
import SeeItInActionSection from "../components/SeeItInActionSection";
import AgenciesHowItWorksSection from "../components/AgenciesHowItWorksSection";
import WhyAgenciesChooseSection from "../components/WhyAgenciesChooseSection";
import WhatYouCanResellSection from "../components/WhatYouCanResellSection";
import ClientReadyReportingSection from "../components/ClientReadyReportingSection";
import AgenciesCTASection from "../components/AgenciesCTASection";

export default function ForAgenciesPage() {
  return (
    <main className="min-h-screen bg-[#040d21] text-white overflow-hidden relative font-sans">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* Hero Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-blue-600/12 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none" />

      {/* 1. For Agencies Hero & Stats Section */}
      <ForAgenciesHeroSection />

      {/* 2. See It In Action Console Section (White BG + Interactive Lines Animation) */}
      <SeeItInActionSection />

      {/* 3. Agencies How It Works Section (Dark Rounded Container Card + 4 Numbered Steps) */}
      <AgenciesHowItWorksSection />

      {/* 4. Why Agencies Choose Ascend Section (White BG + 4 Feature Cards) */}
      <WhyAgenciesChooseSection />

      {/* 5. What You Can Resell Section (Dark Rounded Banner + 3 Service Cards) */}
      <WhatYouCanResellSection />

      {/* 6. Client Ready Reporting Section (White BG + Platform Mockup) */}
      <ClientReadyReportingSection />

      {/* 7. Get Started CTA Section (Dark CTA Banner) */}
      <AgenciesCTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

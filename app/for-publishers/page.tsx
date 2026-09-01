"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ForPublishersHeroSection from "../components/ForPublishersHeroSection";
import WhatWeBuySection from "../components/WhatWeBuySection";
import WatchInventorySellSection from "../components/WatchInventorySellSection";
import PublishersHowItWorksSection from "../components/PublishersHowItWorksSection";
import WhyPublishersChooseSection from "../components/WhyPublishersChooseSection";
import PublishersCTASection from "../components/PublishersCTASection";

export default function ForPublishersPage() {
  return (
    <main className="min-h-screen bg-[#040d21] text-white overflow-hidden relative font-sans">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* Hero Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-blue-600/12 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none" />

      {/* For Publishers Hero & Network Section */}
      <ForPublishersHeroSection />

      {/* What We Buy Section */}
      <WhatWeBuySection />

      {/* Watch Your Inventory Sell Interactive Section */}
      <WatchInventorySellSection />

      {/* How We Work Together 4-Step Process Section */}
      <PublishersHowItWorksSection />

      {/* Why Publishers Choose Ascend Section */}
      <WhyPublishersChooseSection />

      {/* Ready to Sell Your Inventory CTA Banner */}
      <PublishersCTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

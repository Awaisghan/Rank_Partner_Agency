"use client";

import React from "react";
import Footer from "../components/Footer";
import FaqHeroSection from "../components/FaqHeroSection";
import FaqAccordionSection from "../components/FaqAccordionSection";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#040d21] text-white relative font-sans">

      {/* Hero Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-blue-600/12 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none" />

      {/* FAQ Hero Section (70vh Height) */}
      <FaqHeroSection />

      {/* 6 Topics & 19 Questions Accordion Section */}
      <FaqAccordionSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

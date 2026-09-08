import React from "react";
import AboutHeroSection from "../components/AboutHeroSection";
import HowWeStartedSection from "../components/HowWeStartedSection";
import WhatWeBelieveSection from "../components/WhatWeBelieveSection";
import OurTeamSection from "../components/OurTeamSection";
import InThePressSection from "../components/InThePressSection";
import AboutCtaSection from "../components/AboutCtaSection";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#040d21] text-white relative font-sans">

      {/* Hero Section with 90vh height & animated counters */}
      <AboutHeroSection />

      {/* How We Started Sticky Section */}
      <HowWeStartedSection />

      {/* What We Believe Dark Section */}
      <WhatWeBelieveSection />

      {/* Our Team Leadership Section */}
      <OurTeamSection />



      {/* In The Press Section */}
      <InThePressSection />

      {/* About CTA Section */}
      <AboutCtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

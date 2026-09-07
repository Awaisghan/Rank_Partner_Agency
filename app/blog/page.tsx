"use client";

import React from "react";
import Footer from "../components/Footer";
import BlogHeroSection from "../components/BlogHeroSection";
import BlogGridSection from "../components/BlogGridSection";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#040d21] text-white overflow-hidden relative font-sans">

      {/* Hero Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[500px] bg-violet-700/12 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[200px] rounded-full pointer-events-none" />

      {/* Blog / Insights Hero Section (70vh Height) */}
      <BlogHeroSection />

      {/* Articles Grid & Filter Section */}
      <BlogGridSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

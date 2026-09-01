"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronRight, FileText, Search, CheckCircle2, Tv } from "lucide-react";
import { getArticleBySlug } from "../../data/blogArticles";

export default function ArticleDetailPage() {
  const params = useParams();
  const slugParam = typeof params?.slug === "string" ? params.slug : "why-a-single-press-placement-keeps-working-for-years";
  const article = getArticleBySlug(slugParam);

  const [activeSection, setActiveSection] = useState<string>(
    article.sections[0]?.id || ""
  );

  // Scroll Spy to update ON THIS PAGE active item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of article.sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article.sections]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PR":
        return FileText;
      case "SEO":
        return Search;
      case "Strategy":
        return CheckCircle2;
      case "Broadcast":
        return Tv;
      default:
        return FileText;
    }
  };

  const CategoryIcon = getCategoryIcon(article.category);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans relative">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* Top Dark Header Banner */}
      <header className="w-full bg-[#040d21] text-white pt-32 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 xl:px-20 relative overflow-hidden">
        {/* Ambient Radial Glows */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-blue-600/12 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-200 line-clamp-1 max-w-[300px]">
              {article.title}
            </span>
          </div>

          {/* Category Badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#071d36] text-[#4ade80] border border-emerald-500/30">
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </span>
          </div>

          {/* Main Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl mb-8">
            {article.title}
          </h1>

          {/* Author Metadata */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-xs shadow-sm border border-slate-700">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {article.author}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {article.date} · {article.readTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Section with Sticky Table of Contents */}
      <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky ON THIS PAGE Sidebar (4 cols) */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 self-start h-fit pr-6 z-20">
            <div>
              <span className="font-bold tracking-[0.2em] text-[#3b82f6] uppercase text-xs block mb-5">
                ON THIS PAGE
              </span>

              {/* Table of Contents List */}
              <nav className="relative border-l border-slate-200 pl-4 space-y-4 text-xs sm:text-sm font-medium">
                {article.sections.map((section) => {
                  const isCurrent = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(section.id);
                        const el = document.getElementById(section.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className={`block transition-all duration-200 relative ${
                        isCurrent
                          ? "text-[#3b82f6] font-bold -ml-[17px] pl-[13px] border-l-2 border-[#3b82f6]"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {section.heading}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Main Article Body Content (8 cols) */}
          <article className="lg:col-span-8 max-w-3xl">
            
            {/* Lead Excerpt */}
            <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed mb-10 pb-8 border-b border-slate-100">
              {article.excerpt}
            </p>

            {/* Article Sections */}
            <div className="space-y-12">
              {article.sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-32">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                    {sec.heading}
                  </h2>
                  <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Takeaway Highlight Box */}
            <div className="my-12 p-6 sm:p-8 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                Key Takeaway for Growth Teams
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Authority isn&apos;t built overnight, but every editorial placement acts as a permanent asset that drives organic rankings, referral traffic, and brand trust for years.
              </p>
            </div>

            {/* Author Footer Card */}
            <div className="pt-8 border-t border-slate-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#040d21] text-white flex items-center justify-center font-black text-sm shadow-sm">
                  A
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Written by {article.author}
                  </div>
                  <div className="text-xs text-slate-500">
                    Published in {article.category} Insights
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                className="text-xs font-bold text-[#3b82f6] hover:underline"
              >
                ← Back to all articles
              </Link>
            </div>

          </article>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

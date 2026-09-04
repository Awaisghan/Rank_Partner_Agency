"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  CheckCircle2,
  Tv,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const filterTabs = [
  { label: "All", id: "All" },
  { label: "SEO", id: "SEO" },
  { label: "PR", id: "PR" },
  { label: "Strategy", id: "Strategy" },
  { label: "Broadcast", id: "Broadcast" },
];

const featuredArticle = {
  id: "featured-1",
  category: "SEO",
  categoryIcon: Search,
  title: "What Domain Authority and Domain Rating actually measure",
  excerpt:
    "Two of the most quoted numbers in SEO are widely misread. Here is what they tell you, what they miss, and how to use them without chasing the score.",
  author: "Ascend Team",
  date: "June 12, 2026",
  readTime: "6 min read",
};

const gridArticles = [
  {
    id: "1",
    category: "PR",
    categoryIcon: FileText,
    title: "Why a single press placement keeps working for years",
    excerpt:
      "A good placement is not a one-day spike. It is a durable asset that builds trust, earns links, and keeps selling long after the story runs.",
    date: "June 5, 2026",
    readTime: "5 min read",
  },
  {
    id: "2",
    category: "Strategy",
    categoryIcon: CheckCircle2,
    title: "How agencies offer PR and SEO without building a newsroom",
    excerpt:
      "Clients want coverage and rankings. Most agencies cannot staff for both. White-label delivery lets you sell the outcome and keep the margin.",
    date: "May 28, 2026",
    readTime: "6 min read",
  },
  {
    id: "3",
    category: "SEO",
    categoryIcon: Search,
    title: "Authority backlinks versus link building: the difference that matters",
    excerpt:
      "Not all links are equal, and chasing volume can quietly hurt you. The distinction between genuine authority and bulk link building...",
    date: "May 20, 2026",
    readTime: "5 min read",
  },
  {
    id: "4",
    category: "Broadcast",
    categoryIcon: Tv,
    title: "Turning one TV interview into a quarter of content",
    excerpt:
      "A broadcast segment is a few minutes on air and months of material everywhere else, if you plan the reuse before you ever sit down.",
    date: "May 12, 2026",
    readTime: "4 min read",
  },
  {
    id: "5",
    category: "Strategy",
    categoryIcon: CheckCircle2,
    title: "PR and SEO are one motion, not two budgets",
    excerpt:
      "Run separately, press and search quietly undercut each other. Run together, the same placement builds reputation and rankings at...",
    date: "May 2, 2026",
    readTime: "5 min read",
  },
];

export default function BlogGridSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredGridArticles = gridArticles.filter((item) => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  const isFeaturedVisible =
    activeTab === "All" || activeTab === featuredArticle.category;

  const totalArticles =
    (isFeaturedVisible ? 1 : 0) + filteredGridArticles.length;

  return (
    <section className="w-full bg-[#fcfdfe] py-12 sm:py-16 relative z-10 font-sans border-t border-slate-200/60">
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* Top Controls Bar: Filter Pills + Article Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 sm:mb-10 border-b border-slate-200/80">
          {/* Category Pills */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto scrollbar-none py-1 pr-4 sm:pr-0">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#3b82f6] text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Article Count */}
          <div className="text-xs text-slate-400 font-medium whitespace-nowrap shrink-0">
            {totalArticles} {totalArticles === 1 ? "article" : "articles"}
          </div>
        </div>

        {/* Featured / Latest Insight Hero Banner Card */}
        {isFeaturedVisible && (
          <ScrollReveal>
            <div className="w-full bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-10">
              
              {/* Left Column Content (7 cols) */}
              <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Category Pill + LATEST Label */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#3b82f6] border border-blue-100">
                      <Search className="w-3.5 h-3.5" />
                      <span>{featuredArticle.category}</span>
                    </span>
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                      LATEST
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                    {featuredArticle.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-2xl">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                {/* Author Metadata + Read Article Link */}
                <div className="space-y-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    {/* Author Circle Logo */}
                    <div className="w-9 h-9 rounded-full bg-[#040c1e] text-white flex items-center justify-center font-black text-xs shadow-sm">
                      A
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {featuredArticle.author}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {featuredArticle.date} · {featuredArticle.readTime}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/blog/what-domain-authority-and-domain-rating-actually-measure"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#3b82f6] hover:text-blue-700 transition-colors group"
                    >
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column Dark Graphic Box (5 cols) */}
              <div className="hidden lg:col-span-5 bg-[#040c1e] p-8 lg:p-12 relative overflow-hidden lg:flex flex-col justify-between min-h-[260px] lg:min-h-[360px]">
                {/* Background Ambient Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Top-Left Label */}
                <span className="relative z-10 text-[10px] font-extrabold tracking-[0.22em] text-[#4ade80] uppercase">
                  LATEST INSIGHT
                </span>

                {/* Center Radar / Pulse Circles Graphic */}
                <div className="relative z-10 my-auto flex items-center justify-center py-6">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                    {/* Outer Concentric Circles */}
                    <div className="absolute inset-0 rounded-full border border-slate-800/80" />
                    <div className="absolute inset-5 rounded-full border border-slate-800/90" />
                    <div className="absolute inset-10 rounded-full border border-slate-700/60" />
                    <div className="absolute inset-16 rounded-full border border-emerald-500/20" />

                    {/* Center Magnifying Glass Pulse Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#0a2218] border border-emerald-500/50 text-[#4ade80] flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                      <Search className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        )}

        {/* 5 Article Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGridArticles.map((article, idx) => {
            const CategoryIcon = article.categoryIcon;
            const slug =
              article.id === "1"
                ? "why-a-single-press-placement-keeps-working-for-years"
                : article.id === "2"
                ? "how-agencies-offer-pr-and-seo-without-building-a-newsroom"
                : article.id === "3"
                ? "authority-backlinks-versus-link-building-the-difference-that-matters"
                : article.id === "4"
                ? "turning-one-tv-interview-into-a-quarter-of-content"
                : "pr-and-seo-are-one-motion-not-two-budgets";

            return (
              <ScrollReveal key={article.id} delay={100 + idx * 80}>
                <Link
                  href={`/blog/${slug}`}
                  className="block h-full group bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Top Row: Category Badge + Top-Right Arrow */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#3b82f6] border border-blue-100/80">
                        <CategoryIcon className="w-3.5 h-3.5" />
                        <span>{article.category}</span>
                      </span>

                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#3b82f6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    {/* Article Title */}
                    <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug mb-3 group-hover:text-[#3b82f6] transition-colors">
                      {article.title}
                    </h3>

                    {/* Article Excerpt */}
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Bottom Date & Read Time */}
                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                    {article.date} · {article.readTime}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
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

const fallbackFeaturedArticle = {
  id: "featured-1",
  slug: "what-domain-authority-and-domain-rating-actually-measure",
  category: "SEO",
  title: "The Truth About Domain Authority and Domain Rating",
  excerpt:
    "Two of the most quoted numbers in SEO are widely misread. Here is what they tell you, what they miss, and how to use them without chasing the score.",
  author: "RankPartner Team",
  date: "June 12, 2026",
  readTime: "6 min read",
};

const fallbackGridArticles = [
  {
    id: "1",
    slug: "why-a-single-press-placement-keeps-working-for-years",
    category: "PR",
    title: "The Lasting Impact of a Single Press Feature",
    excerpt:
      "A good placement is not a one-day spike. It is a durable asset that builds trust, earns links, and keeps selling long after the story runs.",
    author: "RankPartner Team",
    date: "June 5, 2026",
    readTime: "5 min read",
  },
  {
    id: "2",
    slug: "how-agencies-offer-pr-and-seo-without-building-a-newsroom",
    category: "Strategy",
    title: "Delivering High-Impact PR and SEO Without an In-House Newsroom",
    excerpt:
      "Clients want coverage and rankings. Most agencies cannot staff for both. White-label delivery lets you sell the outcome and keep the margin.",
    author: "RankPartner Team",
    date: "May 28, 2026",
    readTime: "6 min read",
  },
  {
    id: "3",
    slug: "authority-backlinks-versus-link-building-the-difference-that-matters",
    category: "SEO",
    title: "Authority Backlinks vs. Link Building: Why Quality Wins",
    excerpt:
      "Not all links are equal, and chasing volume can quietly hurt you. The distinction between genuine authority and bulk link building...",
    author: "RankPartner Team",
    date: "May 20, 2026",
    readTime: "5 min read",
  },
  {
    id: "4",
    slug: "turning-one-tv-interview-into-a-quarter-of-content",
    category: "Broadcast",
    title: "How to Turn One TV Interview Into Months of Content",
    excerpt:
      "A broadcast segment is a few minutes on air and months of material everywhere else, if you plan the reuse before you ever sit down.",
    author: "RankPartner Team",
    date: "May 12, 2026",
    readTime: "4 min read",
  },
  {
    id: "5",
    slug: "pr-and-seo-are-one-motion-not-two-budgets",
    category: "Strategy",
    title: "Merging PR and SEO: One Unified Growth Strategy",
    excerpt:
      "Run separately, press and search quietly undercut each other. Run together, the same placement builds reputation and rankings at...",
    author: "RankPartner Team",
    date: "May 2, 2026",
    readTime: "5 min read",
  },
];

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogGridSection() {
  const [activeTab, setActiveTab] = useState("All");

  const { data: apiData } = useSWR<{ items: any[] }>("/api/blog", fetcher);
  const fetchedArticles = apiData?.items || [];

  // Identify featured article vs grid articles
  const featuredArticle =
    fetchedArticles.find((a) => a.isFeatured) ||
    fetchedArticles[0] ||
    fallbackFeaturedArticle;

  const rawGridArticles =
    fetchedArticles.length > 0
      ? fetchedArticles.filter((a) => a.id !== featuredArticle.id)
      : fallbackGridArticles;

  const filteredGridArticles = rawGridArticles.filter((item) => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  const isFeaturedVisible =
    activeTab === "All" || activeTab === featuredArticle.category;

  const totalArticles =
    (isFeaturedVisible ? 1 : 0) + filteredGridArticles.length;

  const FeaturedCategoryIcon = getCategoryIcon(featuredArticle.category);

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
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-[#6d28d9] text-white shadow-sm"
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-[#6d28d9] border border-violet-100">
                      <FeaturedCategoryIcon className="w-3.5 h-3.5" />
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
                      R
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {featuredArticle.author || "RankPartner Team"}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {featuredArticle.date} · {featuredArticle.readTime}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/blog/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6d28d9] hover:text-[#6d28d9] transition-colors group"
                    >
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column Graphic or Cover Image Box (5 cols) */}
              <div className="hidden lg:col-span-5 bg-[#040c1e] relative overflow-hidden lg:flex flex-col justify-between min-h-[260px] lg:min-h-[360px]">
                {featuredArticle.featuredImage ? (
                  <img
                    src={featuredArticle.featuredImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-8 lg:p-12 relative flex flex-col justify-between h-full w-full">
                    {/* Background Ambient Radial Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-700/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* Top-Left Label */}
                    <span className="relative z-10 text-[10px] font-extrabold tracking-[0.22em] text-[#f59e0b] uppercase">
                      LATEST INSIGHT
                    </span>

                    {/* Center Radar / Pulse Circles Graphic */}
                    <div className="relative z-10 my-auto flex items-center justify-center py-6">
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                        {/* Outer Concentric Circles */}
                        <div className="absolute inset-0 rounded-full border border-slate-800/80" />
                        <div className="absolute inset-5 rounded-full border border-slate-800/90" />
                        <div className="absolute inset-10 rounded-full border border-slate-700/60" />
                        <div className="absolute inset-16 rounded-full border border-amber-500/20" />

                        {/* Center Magnifying Glass Pulse Badge */}
                        <div className="w-12 h-12 rounded-full bg-[#0a2218] border border-amber-500/50 text-[#f59e0b] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                          <Search className="w-5 h-5 stroke-[2.2]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </ScrollReveal>
        )}

        {/* Article Cards Grid (3 Cards Per Line) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGridArticles.map((article, idx) => {
            const CategoryIcon = getCategoryIcon(article.category);
            const slug = article.slug || article.id;

            return (
              <ScrollReveal key={article.id} delay={100 + idx * 80}>
                <Link
                  href={`/blog/${slug}`}
                  className="block h-full group bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Seamless Edge-to-Edge Top Cover Image */}
                    {article.featuredImage ? (
                      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-900">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Subtle Bottom Gradient Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent pointer-events-none" />

                        {/* Category Badge Overlaid on Image */}
                        <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-[#6d28d9] shadow-sm">
                          <CategoryIcon className="w-3.5 h-3.5 text-[#6d28d9]" />
                          <span>{article.category}</span>
                        </span>

                        {/* Top Right Arrow Overlaid on Image */}
                        <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 group-hover:text-[#6d28d9] group-hover:bg-white transition-all shadow-sm">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    ) : null}

                    {/* Card Content Body */}
                    <div className="p-6">
                      {!article.featuredImage && (
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-[#6d28d9] border border-violet-100/80">
                            <CategoryIcon className="w-3.5 h-3.5" />
                            <span>{article.category}</span>
                          </span>

                          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#6d28d9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      )}

                      {/* Article Title */}
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug mb-3 group-hover:text-[#6d28d9] transition-colors">
                        {article.title}
                      </h3>

                      {/* Article Excerpt */}
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-6">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Date & Read Time */}
                  <div className="px-6 pb-6 pt-0 text-xs text-slate-400 font-medium flex items-center justify-between">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
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

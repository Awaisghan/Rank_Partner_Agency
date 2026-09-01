"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MOCK_PUBLICATIONS,
  GENRE_OPTIONS,
  REGION_OPTIONS,
  Publication,
} from "../data/publicationsData";
import {
  Search,
  Star,
  HelpCircle,
  ImageIcon,
  Heart,
  Copyright,
  Dices,
  Leaf,
  ChevronDown,
  Info,
  LogOut,
} from "lucide-react";

export default function PricingPage() {
  const router = useRouter();

  // Active Tab state
  const [activeTab, setActiveTab] = useState("PUBLICATIONS");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMax, setPriceMax] = useState(85000);
  const [sortBy, setSortBy] = useState("price-asc");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Toggle favorite star
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle genre filter pill
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  // Filter & Sort Logic
  const filteredPublications = useMemo(() => {
    return MOCK_PUBLICATIONS.filter((item) => {
      // Search filter
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Price filter
      if (item.price > priceMax) {
        return false;
      }
      // Region filter
      if (
        selectedRegion !== "All Regions" &&
        !item.region.some((r) =>
          r.toLowerCase().includes(selectedRegion.toLowerCase())
        )
      ) {
        return false;
      }
      // Genre filter
      if (selectedGenres.length > 0) {
        const matchesGenre = selectedGenres.some((g) =>
          item.genres.includes(g)
        );
        if (!matchesGenre) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "da-desc") return b.da - a.da;
      if (sortBy === "dr-desc") return b.dr - a.dr;
      return 0;
    });
  }, [searchQuery, priceMax, sortBy, selectedRegion, selectedGenres]);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] text-slate-800 font-sans selection:bg-red-100">
      {/* ================================================================= */}
      {/* 1. TOP HEADER BAR WITH LOGO & LOG OUT                             */}
      {/* ================================================================= */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-40">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-slate-900"
            >
              <path
                d="M16 3L3 29H10.5L16 17.5L21.5 29H29L16 3Z"
                fill="currentColor"
              />
              <path d="M16 12.5L12 20.5H20L16 12.5Z" fill="#ffffff" />
            </svg>
          </div>
          <div className="flex items-center tracking-tight">
            <span className="font-black text-xl tracking-wider text-slate-950 uppercase">
              RANK_
            </span>
            <span className="font-bold text-xl tracking-wider text-slate-800 uppercase">
              PARTNER
            </span>
          </div>
        </Link>

        {/* Top Right Actions / Log Out */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="text-xs font-black tracking-wider text-[#e63939] hover:text-[#c42b2b] uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>LOG OUT</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. MAIN CONTAINER                                                 */}
      {/* ================================================================= */}
      <main className="w-full px-3 sm:px-5 py-4 space-y-4">
        {/* Title & Disclaimers & Action Pill Buttons Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-4">
          {/* Left Title & Disclaimer Paragraphs */}
          <div className="space-y-1 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 uppercase">
              PRICING (ASCEND PR)
            </h1>
            <p className="text-xs font-bold text-slate-700 leading-snug">
              Once we have published the article for you, any further edits may
              include an extra charge.
            </p>
            <p className="text-xs font-normal text-slate-600 leading-snug">
              Ascend Agency will use reasonable good faith efforts to ensure that
              such article will remain publicly available in the applicable
              publication for at least 12 months.
            </p>
          </div>

          {/* Right Action Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button className="px-3.5 py-1.5 rounded-md bg-[#e63939] hover:bg-[#d52b2b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer">
              Video Tutorial
            </button>
            <button className="px-3.5 py-1.5 rounded-md bg-[#e63939] hover:bg-[#d52b2b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer">
              How To
            </button>
            <button className="px-3.5 py-1.5 rounded-md bg-[#e63939] hover:bg-[#d52b2b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer">
              Download PR Questionnaire
            </button>
            <button className="px-3.5 py-1.5 rounded-md bg-[#e63939] hover:bg-[#d52b2b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer">
              Download TV Questionnaire
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs Bar */}
        <div className="border-b border-slate-300 flex items-center gap-1 overflow-x-auto pt-1 scrollbar-none">
          {[
            "PUBLICATIONS",
            "BROADCAST TELEVISION",
            "DIGITAL TELEVISION",
            "LISTICLES",
            "BEST SELLERS",
            "PRINT",
            "SOCIAL POST",
          ].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 text-xs font-extrabold tracking-wider transition-all whitespace-nowrap cursor-pointer rounded-t-md ${
                  isActive
                    ? "bg-[#f8d7da] text-[#a94442] border-t-2 border-[#e63939]"
                    : "text-slate-700 hover:text-[#e63939]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 3. MAIN DASHBOARD CONTENT (COMPACT SIDEBAR + FLEX-1 TABLE)        */}
        {/* ================================================================= */}
        <div className="flex flex-col lg:flex-row gap-3.5 items-start w-full">
          {/* ───────────────────────────────────────────────────────────── */}
          {/* LEFT FILTER SIDEBAR (COMPACT 190px - 200px)                   */}
          {/* ───────────────────────────────────────────────────────────── */}
          <aside className="w-full lg:w-[190px] xl:w-[200px] shrink-0 space-y-3 bg-[#f8fafc] p-3 rounded-md border border-slate-200 shadow-xs">
            {/* Filter 1: Publication Name Search */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-900">
                Publication name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name"
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 shadow-xs"
                />
              </div>
            </div>

            {/* Filter 2: Price Range Slider */}
            <div className="space-y-1 pt-0.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Price range</span>
              </div>
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={85000}
                  step={50}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#e63939] cursor-pointer h-1.5"
                />
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                  <span>$0</span>
                  <span>${priceMax.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Filter 3: Sort By Dropdown */}
            <div className="space-y-1 pt-0.5">
              <label className="block text-xs font-bold text-slate-900">
                Sort by
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-slate-500 shadow-xs appearance-none cursor-pointer pr-7"
                >
                  <option value="price-asc">Price (Asc)</option>
                  <option value="price-desc">Price (Desc)</option>
                  <option value="da-desc">DA (High to Low)</option>
                  <option value="dr-desc">DR (High to Low)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            {/* Filter 4: Select Regions */}
            <div className="space-y-1 pt-0.5">
              <label className="block text-xs font-bold text-slate-900">
                Select regions
              </label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-500 shadow-xs appearance-none cursor-pointer pr-7"
                >
                  {REGION_OPTIONS.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            {/* Filter 5: Select Genres Toggle Pills */}
            <div className="space-y-1 pt-0.5">
              <label className="block text-xs font-bold text-slate-900">
                Select genres
              </label>
              <div className="flex flex-wrap gap-1">
                {GENRE_OPTIONS.map((genre) => {
                  const isSelected = selectedGenres.includes(genre);
                  return (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#e63939] text-white shadow-xs"
                          : "bg-[#555555] hover:bg-[#333333] text-white"
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* MAIN PUBLICATIONS TABLE AREA (FLEX-1 FULL REMAINING SPACE)    */}
          {/* ───────────────────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-2 w-full">
            {/* Result Counter Header */}
            <div className="flex justify-between items-center text-[12px] font-extrabold tracking-wider text-slate-900 uppercase py-0.5">
              <span>
                SHOWING {filteredPublications.length} OF{" "}
                {MOCK_PUBLICATIONS.length} PUBLICATIONS
              </span>
            </div>

            {/* Table Container */}
            <div className="bg-white border border-slate-200 shadow-xs overflow-x-auto w-full">
              <table className="w-full text-left border-collapse text-xs border border-slate-200">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-slate-200 text-[#e63939] font-bold tracking-wider uppercase text-[11px]">
                    <th className="py-2.5 px-3 text-left border-r border-slate-200">
                      PUBLICATION
                    </th>
                    <th className="py-2.5 px-2 text-center border-r border-slate-200">
                      GENRES
                    </th>
                    <th className="py-2.5 px-2 text-center border-r border-slate-200">
                      PRICE
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      <span className="inline-flex items-center gap-0.5 justify-center">
                        DA <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      <span className="inline-flex items-center gap-0.5 justify-center">
                        DR <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      <span className="inline-flex items-center gap-0.5 justify-center">
                        TAT <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                    </th>
                    <th className="py-2.5 px-2 text-center border-r border-slate-200">
                      REGION
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      SPONSORED
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      INDEXED
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      <span className="inline-flex items-center gap-0.5 justify-center">
                        DO FOLLOW <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      EXAMPLE
                    </th>
                    <th className="py-2.5 px-1.5 text-center border-r border-slate-200">
                      <span className="inline-flex items-center gap-0.5 justify-center">
                        LLM/AEO <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                    </th>
                    <th className="py-2.5 px-2 text-center">
                      NICHES
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-200">
                  {filteredPublications.map((pub) => {
                    const isFav = favorites[pub.id];
                    return (
                      <tr
                        key={pub.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* 1. Publication */}
                        <td className="py-2.5 px-3 border-r border-slate-200">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {/* Circle Logo Avatar with Brand Colors */}
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs overflow-hidden leading-none tracking-tighter"
                                style={{
                                  backgroundColor: pub.logoBg || "#000000",
                                  color: pub.logoTextColor || "#ffffff",
                                }}
                              >
                                {pub.logoText}
                              </div>

                              {/* Title & New Badge */}
                              <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-slate-900 text-[13px] leading-tight truncate">
                                  {pub.name}
                                </span>
                                {pub.isNew && (
                                  <span className="inline-block bg-[#28a745] text-white text-[8.5px] font-bold px-1.5 py-0.2 rounded w-fit mt-0.5">
                                    New
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Favorite Star */}
                            <button
                              onClick={() => toggleFavorite(pub.id)}
                              className="text-slate-300 hover:text-[#e63939] transition-colors p-0.5 cursor-pointer shrink-0"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  isFav
                                    ? "fill-[#e63939] text-[#e63939]"
                                    : "text-slate-300 stroke-[#e63939]"
                                }`}
                              />
                            </button>
                          </div>
                        </td>

                        {/* 2. Genres */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200">
                          {pub.genreCount ? (
                            <span className="inline-flex items-center justify-center gap-1 text-slate-700 hover:text-slate-900 text-[12px] font-medium cursor-pointer">
                              <span>{pub.genreCount} genres</span>
                              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center gap-1 text-slate-700 text-[12px] font-medium">
                              {pub.genres.join(" / ")}
                            </span>
                          )}
                        </td>

                        {/* 3. Price */}
                        <td className="py-2.5 px-2 text-center font-bold text-slate-900 text-[13px] border-r border-slate-200">
                          ${pub.price}
                        </td>

                        {/* 4. DA */}
                        <td className="py-2.5 px-1.5 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">
                          {pub.da}
                        </td>

                        {/* 5. DR */}
                        <td className="py-2.5 px-1.5 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">
                          {pub.dr}
                        </td>

                        {/* 6. TAT */}
                        <td className="py-2.5 px-1.5 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200 whitespace-nowrap">
                          {pub.tat}
                        </td>

                        {/* 7. Region */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200">
                          <div className="flex flex-wrap justify-center gap-1">
                            {pub.region.map((reg) => (
                              <span
                                key={reg}
                                className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap"
                              >
                                {reg}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* 8. Sponsored */}
                        <td className="py-2.5 px-1.5 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">
                          {pub.sponsored}
                        </td>

                        {/* 9. Indexed */}
                        <td className="py-2.5 px-1.5 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">
                          {pub.indexed}
                        </td>

                        {/* 10. Do Follow */}
                        <td className="py-2.5 px-1.5 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">
                          {pub.doFollow}
                        </td>

                        {/* 11. Example */}
                        <td className="py-2.5 px-1.5 text-center border-r border-slate-200 relative group/example">
                          {pub.hasExample && (
                            <div className="relative inline-block">
                              <button
                                title="View Example"
                                className="text-slate-600 hover:text-slate-900 transition-colors p-1 inline-flex items-center justify-center cursor-pointer"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>

                              {/* Hover Popover Window */}
                              <div className="hidden group-hover/example:flex flex-col absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-72 bg-white rounded-lg p-3 shadow-2xl border border-slate-200 text-left pointer-events-none transition-all duration-200">
                                {/* Caret Pointer */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white drop-shadow-xs" />

                                <p className="font-bold text-slate-950 text-xs sm:text-sm mb-2 leading-tight">
                                  Click to open full image
                                </p>

                                {/* Article Screenshot Preview Box */}
                                <div className="border border-slate-200 rounded p-2.5 bg-white space-y-2 shadow-inner">
                                  {/* Publication Header */}
                                  <div className="border-b border-slate-300 pb-1 text-center">
                                    <h4 className="font-serif font-black text-slate-950 text-[11px] uppercase tracking-widest">
                                      THE {pub.name.toUpperCase()}
                                    </h4>
                                    <p className="text-[7px] text-slate-400 mt-0.5 font-medium">
                                      Latest Updates &amp; Breaking News Headlines
                                    </p>
                                    {/* Subnav mockup */}
                                    <div className="flex justify-center gap-1 text-[6px] text-slate-400 mt-1 border-t border-slate-100 pt-0.5">
                                      <span>Business</span>
                                      <span>•</span>
                                      <span>Entertainment</span>
                                      <span>•</span>
                                      <span>Lifestyle</span>
                                      <span>•</span>
                                      <span>Tech</span>
                                    </div>
                                  </div>

                                  {/* Article Hero Photo Mock */}
                                  <div className="w-full h-24 bg-slate-100 rounded flex flex-col items-center justify-center relative overflow-hidden border border-slate-200">
                                    <div className="w-10 h-10 rounded-full bg-slate-200/80 flex items-center justify-center mb-1">
                                      <ImageIcon className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <span className="text-[8px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded shadow-2xs">
                                      {pub.name} Featured Article
                                    </span>
                                  </div>

                                  {/* Article Body Text Lines */}
                                  <div className="space-y-1 pt-1">
                                    <div className="h-2 bg-slate-800 rounded w-11/12" />
                                    <div className="h-1.5 bg-slate-300 rounded w-full" />
                                    <div className="h-1.5 bg-slate-200 rounded w-4/5" />
                                    <div className="h-1.5 bg-slate-200 rounded w-full" />
                                    <div className="h-1.5 bg-slate-200 rounded w-2/3" />
                                  </div>

                                  {/* Author Footer */}
                                  <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1.5">
                                    <div className="w-3.5 h-3.5 rounded-full bg-slate-700 shrink-0 flex items-center justify-center text-white text-[6px] font-bold">
                                      RP
                                    </div>
                                    <span className="text-[8px] font-semibold text-slate-600">
                                      Published in {pub.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>

                        {/* 12. LLM/AEO */}
                        <td className="py-2.5 px-1.5 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">
                          {pub.llmAeo}
                        </td>

                        {/* 13. Niches Icons */}
                        <td className="py-2.5 px-2 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Age 18+ */}
                            {pub.niches.age18 && (
                              <span
                                className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[8px] font-bold text-slate-600 relative shrink-0"
                                title="18+ Content Allowed"
                              >
                                18+
                                {pub.niches.multiplier && (
                                  <span className="absolute -top-1 -right-1 bg-[#e63939] text-white text-[7px] font-extrabold rounded-full w-3 h-3 flex items-center justify-center">
                                    {pub.niches.multiplier}
                                  </span>
                                )}
                              </span>
                            )}

                            {/* Heart Icon */}
                            {pub.niches.heart && (
                              <span
                                className="text-slate-600 hover:text-slate-900 transition-colors relative shrink-0"
                                title="Dating / Romance Allowed"
                              >
                                <Heart className="w-4 h-4 stroke-[1.8]" />
                                {pub.niches.multiplier && (
                                  <span className="absolute -top-1 -right-1 bg-[#e63939] text-white text-[7px] font-extrabold rounded-full w-3 h-3 flex items-center justify-center">
                                    {pub.niches.multiplier}
                                  </span>
                                )}
                              </span>
                            )}

                            {/* Cannabis/Leaf Icon */}
                            {pub.niches.cannabis && (
                              <span
                                className="text-slate-600 hover:text-slate-900 transition-colors relative shrink-0"
                                title="CBD / Cannabis Allowed"
                              >
                                <Leaf className="w-4 h-4 stroke-[1.8]" />
                                {pub.niches.multiplier && (
                                  <span className="absolute -top-1 -right-1 bg-[#e63939] text-white text-[7px] font-extrabold rounded-full w-3 h-3 flex items-center justify-center">
                                    {pub.niches.multiplier}
                                  </span>
                                )}
                              </span>
                            )}

                            {/* Copyright Icon */}
                            {pub.niches.copyright && (
                              <span
                                className="text-slate-600 hover:text-slate-900 transition-colors relative shrink-0"
                                title="Copyright / Brand Allowed"
                              >
                                <Copyright className="w-4 h-4 stroke-[1.8]" />
                                {pub.niches.multiplier && (
                                  <span className="absolute -top-1 -right-1 bg-[#e63939] text-white text-[7px] font-extrabold rounded-full w-3 h-3 flex items-center justify-center">
                                    {pub.niches.multiplier}
                                  </span>
                                )}
                              </span>
                            )}

                            {/* Casino/Dice Icon */}
                            {pub.niches.casino && (
                              <span
                                className="text-slate-600 hover:text-slate-900 transition-colors relative shrink-0"
                                title="Gambling / Casino Allowed"
                              >
                                <Dices className="w-4 h-4 stroke-[1.8]" />
                                {pub.niches.multiplier && (
                                  <span className="absolute -top-1 -right-1 bg-[#e63939] text-white text-[7px] font-extrabold rounded-full w-3 h-3 flex items-center justify-center">
                                    {pub.niches.multiplier}
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredPublications.length === 0 && (
                <div className="py-12 text-center text-slate-500 font-medium text-xs">
                  No publications match your selected filters. Try resetting search or filters.
                </div>
              )}
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}

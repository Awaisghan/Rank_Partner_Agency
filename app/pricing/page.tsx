"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { GENRE_OPTIONS, REGION_OPTIONS } from "../data/publicationsData";
import {
  Search,
  Star,
  HelpCircle,
  ExternalLink,
  Heart,
  Copyright,
  Dices,
  Leaf,
  ChevronDown,
  LogOut,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Publication {
  id: string;
  name: string;
  url?: string;
  logoText?: string;
  logoBg?: string;
  logoTextColor?: string;
  genres: string[];
  price: number;
  da: number;
  dr: number;
  tat: string;
  region: string[];
  sponsored?: string;
  indexed?: string;
  doFollow?: string;
  exampleUrl?: string;
  llmAeo?: string;
  isNew?: boolean;
  niches?: { age18?: boolean; heart?: boolean; cannabis?: boolean; copyright?: boolean; casino?: boolean };
}

interface TVBroadcastItem {
  id: string;
  affiliate: string;
  exampleUrl?: string;
  calls: string;
  state: string;
  market: string;
  dma: number;
  segmentType: string;
  recordingType: string;
  time: string;
  rate: string;
}

interface DigitalTVItem {
  id: string;
  callSign: string;
  station: string;
  rate: string;
  tat: string;
  sponsored: string;
  indexed: string;
  segmentLength: string;
  location: string;
  programName: string;
  interviewType: string;
  exampleUrl?: string;
}

interface ListiclePublication {
  id: string;
  name: string;
  url: string;
  tag?: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  genres: string[];
  top5Price: string;
  top10Price: string;
  da: number;
  dr: number;
  tat: string;
  region: string[];
  sponsored: string;
  indexed: string;
  doFollow: string;
  exampleUrl?: string;
  llmAeo: string;
}

interface BestSellerPublication {
  id: string;
  name: string;
  url: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  genres: string[];
  price: string;
  da: number;
  dr: number;
  tat: string;
  region: string[];
  sponsored: string;
  indexed: string;
  doFollow: string;
  exampleUrl?: string;
  llmAeo: string;
  niches?: { age18?: boolean; heart?: boolean; cannabis?: boolean; copyright?: boolean; casino?: boolean };
}

interface PrintMagazine {
  id: string;
  title: string;
  domain: string;
  websiteUrl?: string;
  fullPagePrice?: string;
  spreadPrice?: string;
  turnaround: string;
  circulation?: string;
}

interface SocialPostPublication {
  id: string;
  name: string;
  category: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  platforms: string[];
  price: string;
  tat: string;
  exampleUrl?: string;
}

// ─── Fetcher ─────────────────────────────────────────────────────────────────

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ─── Loading Spinner ─────────────────────────────────────────────────────────

const LoadingRow = ({ cols }: { cols: number }) => (
  <tr>
    <td colSpan={cols} className="py-16 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-7 h-7 border-4 border-slate-200 border-t-[#e63939] rounded-full animate-spin" />
        <span className="text-slate-500 text-xs font-semibold">Loading live data...</span>
      </div>
    </td>
  </tr>
);

const ErrorRow = ({ cols }: { cols: number }) => (
  <tr>
    <td colSpan={cols} className="py-12 text-center text-red-500 text-xs font-semibold">
      Failed to load data. Please refresh.
    </td>
  </tr>
);

const EmptyRow = ({ cols, label }: { cols: number; label: string }) => (
  <tr>
    <td colSpan={cols} className="py-12 text-center text-slate-400 text-xs font-semibold">
      No {label} found.
    </td>
  </tr>
);

// ─── Social Icons ─────────────────────────────────────────────────────────────

const InstagramIcon = () => (
  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// ─── Shared Link Cell ─────────────────────────────────────────────────────────

const ViewLink = ({ url }: { url?: string }) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-bold text-[#28a745] hover:underline text-[11px]">
      <span>View</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  ) : (
    <span className="text-slate-300">—</span>
  );

// ─── Niche Icon with Multiplier Badge ──────────────────────────────────────────
const NicheIcon = ({ children, multiplier }: { children: React.ReactNode, multiplier?: string }) => (
  <div className="relative inline-flex items-center justify-center p-0.5">
    {children}
    {multiplier && (
      <span className="absolute -top-1.5 -right-2 bg-[#f8d7da] text-[#a94442] text-[8.5px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-xs z-10">
        {multiplier}
      </span>
    )}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

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

  // ─── SWR Data Fetching for all tabs ────────────────────────────────────────
  const { data: pubData, error: pubError, isLoading: pubLoading } = useSWR<{items: Publication[], pagination: any}>("/api/publications", fetcher);
  const { data: btvData, error: btvError, isLoading: btvLoading } = useSWR<{items: TVBroadcastItem[], pagination: any}>("/api/broadcast-television", fetcher);
  const { data: dtvData, error: dtvError, isLoading: dtvLoading } = useSWR<{items: DigitalTVItem[], pagination: any}>("/api/digital-television", fetcher);
  const { data: listData, error: listError, isLoading: listLoading } = useSWR<{items: ListiclePublication[], pagination: any}>("/api/listicles", fetcher);
  const { data: bsData, error: bsError, isLoading: bsLoading } = useSWR<{items: BestSellerPublication[], pagination: any}>("/api/best-sellers", fetcher);
  const { data: printData, error: printError, isLoading: printLoading } = useSWR<{items: PrintMagazine[], pagination: any}>("/api/print-magazines", fetcher);
  const { data: socialData, error: socialError, isLoading: socialLoading } = useSWR<{items: SocialPostPublication[], pagination: any}>("/api/social-posts", fetcher);

  const publications = pubData?.items || [];
  const broadcastTV = btvData?.items || [];
  const digitalTV = dtvData?.items || [];
  const listicles = listData?.items || [];
  const bestSellers = bsData?.items || [];
  const printMags = printData?.items || [];
  const socialPosts = socialData?.items || [];


  // Toggle favorite star
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle genre filter pill
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Filter & Sort Logic for Publications
  const filteredPublications = useMemo(() => {
    const items = pubData?.items || [];
    return items.filter((item) => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (item.price > priceMax) return false;
      if (selectedRegion !== "All Regions" && !item.region?.some((r) => r.toLowerCase().includes(selectedRegion.toLowerCase()))) return false;
      if (selectedGenres.length > 0 && !selectedGenres.some((g) => item.genres?.includes(g))) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "da-desc") return b.da - a.da;
      if (sortBy === "dr-desc") return b.dr - a.dr;
      return 0;
    });
  }, [publications, searchQuery, priceMax, sortBy, selectedRegion, selectedGenres]);

  // Filter Logic for Listicles
  const filteredListicles = useMemo(() => {
    return (listData?.items || []).filter((item) => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedRegion !== "All Regions" && !item.region?.some((r) => r.toLowerCase().includes(selectedRegion.toLowerCase()))) return false;
      return true;
    });
  }, [listicles, searchQuery, selectedRegion]);

  // Filter Logic for Best Sellers
  const filteredBestSellers = useMemo(() => {
    return (bsData?.items || []).filter((item) => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedRegion !== "All Regions" && !item.region?.some((r) => r.toLowerCase().includes(selectedRegion.toLowerCase()))) return false;
      if (selectedGenres.length > 0 && !selectedGenres.some((g) => item.genres?.includes(g))) return false;
      return true;
    });
  }, [bestSellers, searchQuery, selectedRegion, selectedGenres]);

  // Generic search filter for other tabs
  const filteredBroadcastTV = useMemo(() => (btvData?.items || []).filter((i) => !searchQuery || i.affiliate?.toLowerCase().includes(searchQuery.toLowerCase())), [broadcastTV, searchQuery]);
  const filteredDigitalTV = useMemo(() => (dtvData?.items || []).filter((i) => !searchQuery || i.station?.toLowerCase().includes(searchQuery.toLowerCase())), [digitalTV, searchQuery]);
  const filteredPrintMags = useMemo(() => (printData?.items || []).filter((i) => !searchQuery || i.title?.toLowerCase().includes(searchQuery.toLowerCase())), [printMags, searchQuery]);
  const filteredSocialPosts = useMemo(() => (socialData?.items || []).filter((i) => !searchQuery || i.name?.toLowerCase().includes(searchQuery.toLowerCase())), [socialPosts, searchQuery]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed", e);
    }
    window.location.href = "/login";
  };

  const TH = "py-2.5 px-2 border-r border-slate-200 text-center";
  const THL = "py-2.5 px-3 text-left border-r border-slate-200";
  const THEAD = "bg-[#f8fafc] border-b border-slate-200 text-[#e63939] font-bold tracking-wider uppercase text-[11px]";

  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] text-slate-800 font-sans selection:bg-red-100">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-900">
              <path d="M16 3L3 29H10.5L16 17.5L21.5 29H29L16 3Z" fill="currentColor" />
              <path d="M16 12.5L12 20.5H20L16 12.5Z" fill="#ffffff" />
            </svg>
          </div>
          <div className="flex items-center tracking-tight">
            <span className="font-black text-xl tracking-wider text-slate-950 uppercase">RANK_</span>
            <span className="font-bold text-xl tracking-wider text-slate-800 uppercase">PARTNER</span>
          </div>
        </Link>
        <button onClick={handleLogout} className="text-xs font-black tracking-wider text-[#e63939] hover:text-[#c42b2b] uppercase transition-colors flex items-center gap-1.5 cursor-pointer">
          <span>LOG OUT</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <main className="w-full px-3 sm:px-5 py-4 space-y-4">
        {/* Title Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-4">
          <div className="space-y-1 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 uppercase">PRICING (RANKPARTNER PR)</h1>
            <p className="text-xs font-bold text-slate-700 leading-snug">Once we have published the article for you, any further edits may include an extra charge.</p>
            <p className="text-xs font-normal text-slate-600 leading-snug">RankPartner will use reasonable good faith efforts to ensure that such article will remain publicly available in the applicable publication for at least 12 months.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {["Video Tutorial", "How To", "Download PR Questionnaire", "Download TV Questionnaire"].map((btn) => (
              <button key={btn} className="px-3.5 py-1.5 rounded-md bg-[#e63939] hover:bg-[#d52b2b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer">{btn}</button>
            ))}
          </div>
        </div>

        {/* Tab Bar */}
        <div className="border-b border-slate-300 flex items-center gap-1 overflow-x-auto pt-1 scrollbar-none">
          {["PUBLICATIONS", "BROADCAST TELEVISION", "DIGITAL TELEVISION", "LISTICLES", "BEST SELLERS", "PRINT", "SOCIAL POST"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 text-xs font-extrabold tracking-wider transition-all whitespace-nowrap cursor-pointer rounded-t-md ${isActive ? "bg-[#f8d7da] text-[#a94442] border-t-2 border-[#e63939]" : "text-slate-700 hover:text-[#e63939]"}`}>
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── SIDEBAR + TABLE ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-3.5 items-start w-full">
          {/* Sidebar */}
          <aside className="w-full lg:w-[190px] xl:w-[200px] shrink-0 space-y-3 bg-[#f8fafc] p-3 rounded-md border border-slate-200 shadow-xs">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-900">Search name</label>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search name"
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 shadow-xs" />
            </div>

            <div className="space-y-1 pt-0.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900"><span>Price range</span></div>
              <input type="range" min={0} max={85000} step={50} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[#e63939] cursor-pointer h-1.5" />
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                <span>$0</span><span>${priceMax.toLocaleString()}</span>
              </div>
            </div>

            {["PUBLICATIONS", "LISTICLES", "BEST SELLERS"].includes(activeTab) && (
              <>
                <div className="space-y-1 pt-0.5">
                  <label className="block text-xs font-bold text-slate-900">Sort by</label>
                  <div className="relative">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-slate-500 shadow-xs appearance-none cursor-pointer pr-7">
                      <option value="price-asc">Price (Asc)</option>
                      <option value="price-desc">Price (Desc)</option>
                      <option value="da-desc">DA (High to Low)</option>
                      <option value="dr-desc">DR (High to Low)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1 pt-0.5">
                  <label className="block text-xs font-bold text-slate-900">Select regions</label>
                  <div className="relative">
                    <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-500 shadow-xs appearance-none cursor-pointer pr-7">
                      {REGION_OPTIONS.map((reg) => <option key={reg} value={reg}>{reg}</option>)}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2 pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {["PUBLICATIONS", "BEST SELLERS"].includes(activeTab) && (
              <div className="space-y-1 pt-0.5">
                <label className="block text-xs font-bold text-slate-900">Select genres</label>
                <div className="flex flex-wrap gap-1">
                  {GENRE_OPTIONS.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <button key={genre} onClick={() => toggleGenre(genre)}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all cursor-pointer ${isSelected ? "bg-[#e63939] text-white shadow-xs" : "bg-[#555555] hover:bg-[#333333] text-white"}`}>
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* Table Area */}
          <main className="flex-1 min-w-0 space-y-2 w-full">
            <div className="flex justify-between items-center text-[12px] font-extrabold tracking-wider text-slate-900 uppercase py-0.5">
              <span>
                {activeTab} &mdash;{" "}
                {activeTab === "PUBLICATIONS" ? `${filteredPublications.length} results` :
                  activeTab === "BROADCAST TELEVISION" ? `${filteredBroadcastTV.length} results` :
                  activeTab === "DIGITAL TELEVISION" ? `${filteredDigitalTV.length} results` :
                  activeTab === "LISTICLES" ? `${filteredListicles.length} results` :
                  activeTab === "BEST SELLERS" ? `${filteredBestSellers.length} results` :
                  activeTab === "PRINT" ? `${filteredPrintMags.length} results` :
                  `${filteredSocialPosts.length} results`}
              </span>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs overflow-x-auto w-full">

              {/* ── PUBLICATIONS ─────────────────────────────────────────── */}
              {activeTab === "PUBLICATIONS" && (
                <table className="w-full text-left border-collapse text-xs border border-slate-200">
                  <thead>
                    <tr className={THEAD}>
                      <th className={THL}>PUBLICATION</th>
                      <th className={TH}>GENRES</th>
                      <th className={TH}>PRICE</th>
                      <th className={TH} style={{width:40}}>DA <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH} style={{width:40}}>DR <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>TAT <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>REGION</th>
                      <th className={TH}>SPONSORED</th>
                      <th className={TH}>INDEXED</th>
                      <th className={TH}>DO FOLLOW <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>EXAMPLE LINK</th>
                      <th className={TH}>LLM/AEO <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className="py-2.5 px-2 text-center">NICHES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {pubLoading ? <LoadingRow cols={13} /> :
                     pubError ? <ErrorRow cols={13} /> :
                     filteredPublications.length === 0 ? <EmptyRow cols={13} label="publications" /> :
                     filteredPublications.map((pub) => {
                       const isFav = favorites[pub.id];
                       return (
                         <tr key={pub.id} className="hover:bg-slate-50/80 transition-colors">
                           <td className="py-2.5 px-3 border-r border-slate-200">
                             <div className="flex items-center justify-between gap-2">
                               <div className="flex items-center gap-2.5 min-w-0">
                                 <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs overflow-hidden leading-none tracking-tighter"
                                   style={{ backgroundColor: pub.logoBg || "#000", color: pub.logoTextColor || "#fff" }}>
                                   {pub.logoText}
                                 </div>
                                 <div className="flex flex-col min-w-0">
                                   <div className="flex items-center gap-1.5">
                                     <span className="font-semibold text-slate-900 text-[13px] leading-tight truncate">{pub.name}</span>
                                     {pub.isNew && <span className="inline-block bg-[#28a745] text-white text-[8.5px] font-bold px-1.5 py-0.5 rounded w-fit">New</span>}
                                   </div>
                                   <span className="text-[10.5px] text-slate-400 font-normal truncate mt-0.5">{pub.url}</span>
                                 </div>
                               </div>
                               <button onClick={() => toggleFavorite(pub.id)} className="text-slate-300 hover:text-[#e63939] transition-colors p-0.5 cursor-pointer shrink-0">
                                 <Star className={`w-4 h-4 ${isFav ? "fill-[#e63939] text-[#e63939]" : "text-slate-300 stroke-[#e63939]"}`} />
                               </button>
                             </div>
                           </td>
                           <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700 text-[12px] font-medium">
                             {pub.genres?.join(" / ")}
                           </td>
                           <td className="py-2.5 px-2 text-center font-bold text-slate-900 text-[13px] border-r border-slate-200">${pub.price?.toLocaleString()}</td>
                           <td className="py-2.5 px-2 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">{pub.da}</td>
                           <td className="py-2.5 px-2 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">{pub.dr}</td>
                           <td className="py-2.5 px-2 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200 whitespace-nowrap">{pub.tat}</td>
                           <td className="py-2.5 px-2 text-center border-r border-slate-200">
                             <div className="flex flex-wrap justify-center gap-1">
                               {pub.region?.map((reg) => <span key={reg} className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap">{reg}</span>)}
                             </div>
                           </td>
                           <td className="py-2.5 px-2 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">{pub.sponsored ? "Yes" : "No"}</td>
                           <td className="py-2.5 px-2 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">{pub.indexed ? "Yes" : "No"}</td>
                           <td className="py-2.5 px-2 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">{pub.doFollow ? "Yes" : "No"}</td>
                           <td className="py-2.5 px-2 text-center border-r border-slate-200 whitespace-nowrap">
                             {pub.exampleUrl ? (
                               <a href={pub.exampleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-[#28a745] hover:underline text-[12px]">
                                 <span>View</span>
                                 <ExternalLink className="w-3 h-3 stroke-[2.2]" />
                               </a>
                             ) : (
                               <span className="text-slate-300">—</span>
                             )}
                           </td>
                           <td className="py-2.5 px-2 text-center font-medium text-slate-700 text-[12px] border-r border-slate-200">{pub.llmAeo ? "Yes" : "No"}</td>
                           <td className="py-2.5 px-2 text-center">
                             <div className="flex flex-col items-center justify-center gap-1">
                               <div className="flex items-center justify-center gap-3">
                                 {(pub as any).nicheAge18 && <NicheIcon multiplier={(pub as any).nicheAge18Multiplier}><span className="text-[10px] font-bold border-1.5 border-slate-700 rounded-full w-4 h-4 flex items-center justify-center text-slate-800">18</span></NicheIcon>}
                                 {(pub as any).nicheHeart && <NicheIcon multiplier={(pub as any).nicheHeartMultiplier}><Heart className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                                 {(pub as any).nicheCannabis && <NicheIcon multiplier={(pub as any).nicheCannabisMultiplier}><Leaf className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                                 {(pub as any).nicheCopyright && <NicheIcon multiplier={(pub as any).nicheCopyrightMultiplier}><Copyright className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                                 {(pub as any).nicheCasino && <NicheIcon multiplier={(pub as any).nicheCasinoMultiplier}><Dices className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                               </div>
                             </div>
                           </td>
                         </tr>
                       );
                     })}
                  </tbody>
                </table>
              )}

              {/* ── BROADCAST TELEVISION ─────────────────────────────────── */}
              {activeTab === "BROADCAST TELEVISION" && (
                <table className="w-full text-left border-collapse text-xs border border-slate-200">
                  <thead>
                    <tr className={THEAD}>
                      <th className={THL}>AFFILIATE</th>
                      <th className={TH}>CALLS / SEGMENT</th>
                      <th className={TH}>STATE</th>
                      <th className={TH}>MARKET</th>
                      <th className={TH}>DMA</th>
                      <th className={TH}>SEGMENT TYPE</th>
                      <th className={TH}>RECORDING TYPE</th>
                      <th className={TH}>TIME</th>
                      <th className={TH}>RATE</th>
                      <th className="py-2.5 px-2 text-center">EXAMPLE LINK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {btvLoading ? <LoadingRow cols={10} /> :
                     btvError ? <ErrorRow cols={10} /> :
                     filteredBroadcastTV.length === 0 ? <EmptyRow cols={10} label="broadcast TV stations" /> :
                     filteredBroadcastTV.map((item) => (
                       <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-900">{item.affiliate}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.calls}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.state}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.market}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.dma}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.segmentType}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.recordingType}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700 whitespace-nowrap">{item.time}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-black text-slate-900">{item.rate}</td>
                         <td className="py-2.5 px-2 text-center"><ViewLink url={item.exampleUrl} /></td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              )}

              {/* ── DIGITAL TELEVISION ───────────────────────────────────── */}
              {activeTab === "DIGITAL TELEVISION" && (
                <table className="w-full text-left border-collapse text-xs border border-slate-200">
                  <thead>
                    <tr className={THEAD}>
                      <th className={THL}>CALL SIGN</th>
                      <th className={TH}>STATION</th>
                      <th className={TH}>RATE</th>
                      <th className={TH}>TAT</th>
                      <th className={TH}>SPONSORED</th>
                      <th className={TH}>INDEXED</th>
                      <th className={TH}>SEGMENT LENGTH</th>
                      <th className={TH}>LOCATION</th>
                      <th className={TH}>PROGRAM NAME</th>
                      <th className={TH}>INTERVIEW TYPE</th>
                      <th className="py-2.5 px-2 text-center">EXAMPLE LINK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {dtvLoading ? <LoadingRow cols={11} /> :
                     dtvError ? <ErrorRow cols={11} /> :
                     filteredDigitalTV.length === 0 ? <EmptyRow cols={11} label="digital TV stations" /> :
                     filteredDigitalTV.map((item) => (
                       <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-slate-900">{item.callSign}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-semibold text-slate-800">{item.station}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-black text-slate-900">{item.rate}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700 whitespace-nowrap">{item.tat}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.sponsored ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.indexed ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700 whitespace-nowrap">{item.segmentLength}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-bold text-slate-900">{item.location}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200">
                           <span className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap">{item.programName}</span>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{item.interviewType}</td>
                         <td className="py-2.5 px-2 text-center"><ViewLink url={item.exampleUrl} /></td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              )}

              {/* ── LISTICLES ─────────────────────────────────────────────── */}
              {activeTab === "LISTICLES" && (
                <table className="w-full text-left border-collapse text-xs border border-slate-200">
                  <thead>
                    <tr className={THEAD}>
                      <th className={THL}>PUBLICATION</th>
                      <th className={TH}>GENRES</th>
                      <th className={TH}>TOP 5 PRICE</th>
                      <th className={TH}>TOP 10 PRICE</th>
                      <th className={TH}>DA <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>DR <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>TAT <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>REGION</th>
                      <th className={TH}>SPONSORED</th>
                      <th className={TH}>INDEXED</th>
                      <th className={TH}>DO FOLLOW <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>EXAMPLE LINK</th>
                      <th className="py-2.5 px-2 text-center">LLM/AEO <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {listLoading ? <LoadingRow cols={13} /> :
                     listError ? <ErrorRow cols={13} /> :
                     filteredListicles.length === 0 ? <EmptyRow cols={13} label="listicles" /> :
                     filteredListicles.map((pub) => (
                       <tr key={pub.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="py-2.5 px-3 border-r border-slate-200">
                           <div className="flex items-center gap-2.5 min-w-0">
                             <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs leading-none"
                               style={{ backgroundColor: pub.logoBg || "#000", color: pub.logoTextColor || "#fff" }}>{pub.logoText}</div>
                             <div className="flex flex-col min-w-0">
                               <span className="font-semibold text-slate-900 text-[12.5px] leading-tight">{pub.name}</span>
                               <span className="text-[10.5px] text-slate-400 font-normal truncate mt-0.5">{pub.url}</span>
                               {pub.tag && <span className="bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded w-fit mt-1">{pub.tag}</span>}
                             </div>
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200">
                           <div className="flex flex-col gap-1 items-center">
                             {pub.genres?.map((g) => <span key={g} className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[10.5px] font-medium whitespace-nowrap">{g}</span>)}
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-black text-slate-900">{pub.top5Price}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-black text-slate-900">{pub.top10Price}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-medium text-slate-700">{pub.da}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-medium text-slate-700">{pub.dr}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700 whitespace-nowrap">{pub.tat}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200">
                           <div className="flex flex-col gap-1 items-center">
                             {pub.region?.map((r) => <span key={r} className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[10.5px] font-medium whitespace-nowrap">{r}</span>)}
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{pub.sponsored ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{pub.indexed ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{pub.doFollow ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 whitespace-nowrap">
                           {pub.exampleUrl ? (
                             <a href={pub.exampleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-[#28a745] hover:underline text-[12px]">
                               <span>View</span>
                               <ExternalLink className="w-3 h-3 stroke-[2.2]" />
                             </a>
                           ) : (
                             <span className="text-slate-300">—</span>
                           )}
                         </td>
                         <td className="py-2.5 px-2 text-center text-slate-700">{pub.llmAeo ? "Yes" : "No"}</td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              )}

              {/* ── BEST SELLERS ─────────────────────────────────────────── */}
              {activeTab === "BEST SELLERS" && (
                <table className="w-full text-left border-collapse text-xs border border-slate-200">
                  <thead>
                    <tr className={THEAD}>
                      <th className={THL}>PUBLICATION</th>
                      <th className={TH}>GENRES</th>
                      <th className={TH}>PRICE</th>
                      <th className={TH}>DA <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>DR <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>TAT <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>REGION</th>
                      <th className={TH}>SPONSORED</th>
                      <th className={TH}>INDEXED</th>
                      <th className={TH}>DO FOLLOW <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className={TH}>EXAMPLE LINK</th>
                      <th className={TH}>LLM/AEO <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className="py-2.5 px-2 text-center">NICHES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {bsLoading ? <LoadingRow cols={13} /> :
                     bsError ? <ErrorRow cols={13} /> :
                     filteredBestSellers.length === 0 ? <EmptyRow cols={13} label="best sellers" /> :
                     filteredBestSellers.map((pub) => (
                       <tr key={pub.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="py-2.5 px-3 border-r border-slate-200">
                           <div className="flex items-center gap-2.5 min-w-0">
                             <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs leading-none"
                               style={{ backgroundColor: pub.logoBg || "#000", color: pub.logoTextColor || "#fff" }}>{pub.logoText}</div>
                             <div className="flex flex-col min-w-0">
                               <span className="font-bold text-slate-900 text-[12.5px] leading-tight">{pub.name}</span>
                               <span className="text-[10.5px] text-slate-400 font-normal truncate mt-0.5">{pub.url}</span>
                             </div>
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200">
                           <div className="flex flex-col gap-1 items-center">
                             {pub.genres?.map((g) => <span key={g} className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[10.5px] font-medium whitespace-nowrap">{g}</span>)}
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-black text-slate-900 text-[13px]">{pub.price}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-medium text-slate-700">{pub.da}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-medium text-slate-700">{pub.dr}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700 whitespace-nowrap">{pub.tat}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200">
                           <div className="flex flex-col gap-1 items-center">
                             {pub.region?.map((r) => <span key={r} className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[10.5px] font-medium whitespace-nowrap">{r}</span>)}
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-bold text-slate-800">{pub.sponsored ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{pub.indexed ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{pub.doFollow ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200"><ViewLink url={pub.exampleUrl} /></td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-700">{pub.llmAeo ? "Yes" : "No"}</td>
                         <td className="py-2.5 px-2 text-center">
                           <div className="flex flex-col items-center justify-center gap-1">
                             <div className="flex items-center justify-center gap-3">
                               {(pub as any).nicheAge18 && <NicheIcon multiplier={(pub as any).nicheAge18Multiplier}><span className="text-[10px] font-bold border-1.5 border-slate-700 rounded-full w-4 h-4 flex items-center justify-center text-slate-800">18</span></NicheIcon>}
                               {(pub as any).nicheHeart && <NicheIcon multiplier={(pub as any).nicheHeartMultiplier}><Heart className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                               {(pub as any).nicheCannabis && <NicheIcon multiplier={(pub as any).nicheCannabisMultiplier}><Leaf className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                               {(pub as any).nicheCopyright && <NicheIcon multiplier={(pub as any).nicheCopyrightMultiplier}><Copyright className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                               {(pub as any).nicheCasino && <NicheIcon multiplier={(pub as any).nicheCasinoMultiplier}><Dices className="w-4 h-4 stroke-[2] text-slate-800" /></NicheIcon>}
                             </div>
                           </div>
                         </td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              )}

              {/* ── PRINT ────────────────────────────────────────────────── */}
              {activeTab === "PRINT" && (
                <>
                  {printLoading ? (
                    <table className="w-full text-left border-collapse text-xs border border-slate-200">
                      <tbody className="divide-y divide-slate-200"><LoadingRow cols={1} /></tbody>
                    </table>
                  ) : printError ? (
                    <table className="w-full text-left border-collapse text-xs border border-slate-200">
                      <tbody className="divide-y divide-slate-200"><ErrorRow cols={1} /></tbody>
                    </table>
                  ) : filteredPrintMags.length === 0 ? (
                    <table className="w-full text-left border-collapse text-xs border border-slate-200">
                      <tbody className="divide-y divide-slate-200"><EmptyRow cols={1} label="print magazines" /></tbody>
                    </table>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredPrintMags.map((mag) => (
                        <div key={mag.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group relative">
                          <div>
                            <div className="pr-2">
                              <a href={mag.websiteUrl || `https://${mag.domain}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-slate-900 hover:text-[#e63939] text-base group/link">
                                <span>{mag.title}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-[#e63939] transition-colors" />
                              </a>
                              <p className="text-[11.5px] text-slate-400 mt-0.5 font-normal">{mag.domain}</p>
                            </div>
                            <div className="my-5 space-y-2 border-t border-b border-slate-100 py-3.5">
                              {mag.fullPagePrice && (
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-600 font-medium">Full Page</span>
                                  <span className="font-black text-slate-900 text-sm">{mag.fullPagePrice}</span>
                                </div>
                              )}
                              {mag.spreadPrice && (
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-600 font-medium">2-Page Spread</span>
                                  <span className="font-black text-slate-900 text-sm">{mag.spreadPrice}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-[#eef2f6] text-slate-600 text-[10.5px] font-semibold px-2.5 py-1 rounded-md">{mag.turnaround}</span>
                            {mag.circulation && (
                              <span className="bg-[#eef2f6] text-slate-600 text-[10.5px] font-semibold px-2.5 py-1 rounded-md">{mag.circulation}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── SOCIAL POST ──────────────────────────────────────────── */}
              {activeTab === "SOCIAL POST" && (
                <table className="w-full text-left border-collapse text-xs border border-slate-200">
                  <thead>
                    <tr className={THEAD}>
                      <th className={THL}>PUBLICATION</th>
                      <th className={TH}>CATEGORY</th>
                      <th className={TH}>PLATFORMS</th>
                      <th className={TH}>PRICE</th>
                      <th className={TH}>TAT <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className="py-2.5 px-2 text-center">EXAMPLE LINK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {socialLoading ? <LoadingRow cols={6} /> :
                     socialError ? <ErrorRow cols={6} /> :
                     filteredSocialPosts.length === 0 ? <EmptyRow cols={6} label="social posts" /> :
                     filteredSocialPosts.map((item) => (
                       <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="py-2.5 px-3 border-r border-slate-200">
                           <div className="flex items-center gap-2.5">
                             <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs leading-none"
                               style={{ backgroundColor: item.logoBg || "#000", color: item.logoTextColor || "#fff" }}>{item.logoText}</div>
                             <span className="font-bold text-slate-900 text-[13px]">{item.name}</span>
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200">
                           <span className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[10.5px] font-medium">{item.category}</span>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200">
                           <div className="flex items-center justify-center gap-1.5">
                             {item.platforms?.includes("instagram") && (
                               <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs" title="Instagram"><InstagramIcon /></div>
                             )}
                             {item.platforms?.includes("x") && (
                               <div className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-black text-[9px] shadow-xs" title="X">X</div>
                             )}
                             {item.platforms?.includes("facebook") && (
                               <div className="w-5 h-5 rounded-md bg-[#1877f2] text-white flex items-center justify-center shadow-xs" title="Facebook"><FacebookIcon /></div>
                             )}
                             {item.platforms?.includes("linkedin") && (
                               <div className="w-5 h-5 rounded-md bg-[#0a66c2] text-white flex items-center justify-center shadow-xs" title="LinkedIn"><LinkedinIcon /></div>
                             )}
                           </div>
                         </td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-black text-slate-900 text-[13.5px]">{item.price}</td>
                         <td className="py-2.5 px-2 text-center border-r border-slate-200 font-semibold text-slate-700 whitespace-nowrap">{item.tat}</td>
                         <td className="py-2.5 px-2 text-center"><ViewLink url={item.exampleUrl} /></td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              )}

            </div>
          </main>
        </div>
      </main>
    </div>
  );
}

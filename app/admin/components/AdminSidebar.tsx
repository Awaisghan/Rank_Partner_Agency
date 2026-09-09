"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FileText,
  Tv,
  Monitor,
  List,
  TrendingUp,
  Printer,
  Share2,
  LogOut,
  Users,
  Menu,
  X,
  ChevronRight,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Publications",
    href: "/admin/publications",
    icon: FileText,
    description: "Manage press publications",
  },
  {
    label: "Broadcast TV",
    href: "/admin/broadcast-television",
    icon: Tv,
    description: "Television segments",
  },
  {
    label: "Digital TV",
    href: "/admin/digital-television",
    icon: Monitor,
    description: "Digital broadcasts",
  },
  {
    label: "Listicles",
    href: "/admin/listicles",
    icon: List,
    description: "Top 5 & Top 10 roundups",
  },
  {
    label: "Best Sellers",
    href: "/admin/best-sellers",
    icon: TrendingUp,
    description: "Featured publications",
  },
  {
    label: "Print",
    href: "/admin/print",
    icon: Printer,
    description: "Print media placements",
  },
  {
    label: "Social Post",
    href: "/admin/social-post",
    icon: Share2,
    description: "Social media posts",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    description: "User management",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed", e);
    }
    window.location.href = "/login";
  };

  return (
    <>
      <header className="w-full sticky top-0 z-40" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {/* Gradient accent line at the very top */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#e63939] via-[#ff6b6b] to-[#e63939]" />

        {/* Main Header */}
        <div className="w-full bg-[#0a0f1e] backdrop-blur-xl border-b border-white/[0.06]">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            {/* Left: Brand */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin/publications"
                className="flex items-center gap-3 group"
              >
                <img
                  src="/logo-cropped.png"
                  alt="RankPartner.io Logo"
                  className="h-7 sm:h-8 w-auto object-contain brightness-0 invert"
                />
              </Link>

              {/* Admin Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#e63939]/10 to-[#e63939]/5 border border-[#e63939]/20">
                <div className="relative flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#e63939]" />
                  <span className="absolute w-2 h-2 rounded-full bg-[#e63939] animate-ping opacity-75" />
                </div>
                <span className="text-[10px] font-bold text-[#e63939] uppercase tracking-[0.15em]">
                  Admin Panel
                </span>
              </div>
            </div>

            {/* Right: Account + Logout */}
            <div className="flex items-center gap-3">
              {/* Admin Profile Pill */}
              <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-colors duration-200">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#e63939] to-[#991b1b] flex items-center justify-center shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-white/90 leading-tight">
                    Administrator
                  </p>
                  <p className="text-[9.5px] text-white/35 leading-tight">
                    rankpartner@gmail.com
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold text-white/70 bg-white/[0.04] border border-white/[0.08] hover:bg-red-500/10 hover:text-[#e63939] hover:border-[#e63939]/30 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="w-full bg-[#0d1224] border-b border-white/[0.06]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-none">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-white/45 hover:text-white/80"
                    }`}
                  >
                    {/* Active Background Glow */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e63939]/20 to-[#e63939]/10 border border-[#e63939]/25" />
                    )}

                    {/* Hover Background */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-lg bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}

                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 relative z-10 transition-colors duration-200 ${
                        isActive ? "text-[#e63939]" : "text-white/35 group-hover:text-white/60"
                      }`}
                    />
                    <span className="relative z-10">{label}</span>

                    {/* Active Indicator Dot */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(50%+6px)]">
                        <div className="w-6 h-[2px] rounded-full bg-[#e63939]" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Tablet Nav (scrollable, compact) */}
            <nav className="hidden sm:flex lg:hidden items-center gap-1 py-1.5 overflow-x-auto scrollbar-none">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#e63939]/15 text-white border border-[#e63939]/25"
                        : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#e63939]" : "text-white/35"}`} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile: Current page indicator */}
            <div className="sm:hidden flex items-center justify-between py-2">
              {NAV_ITEMS.filter(
                ({ href }) => pathname === href || pathname.startsWith(href + "/")
              ).map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 text-white">
                  <Icon className="w-4 h-4 text-[#e63939]" />
                  <span className="text-[12px] font-bold">{label}</span>
                </div>
              ))}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-white/50 hover:text-white text-[10px] font-semibold flex items-center gap-1"
              >
                <span>All Pages</span>
                <ChevronRight className={`w-3 h-3 transition-transform ${mobileOpen ? "rotate-90" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[39] bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-[110px] left-0 right-0 bg-[#0d1224] border-b border-white/[0.08] shadow-2xl animate-in slide-in-from-top"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-1">
              {NAV_ITEMS.map(({ label, href, icon: Icon, description }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#e63939]/10 border border-[#e63939]/20"
                        : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-[#e63939]/20 text-[#e63939]"
                        : "bg-white/[0.05] text-white/40"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-[12px] font-bold ${isActive ? "text-white" : "text-white/70"}`}>
                        {label}
                      </p>
                      <p className="text-[10px] text-white/30">{description}</p>
                    </div>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e63939]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

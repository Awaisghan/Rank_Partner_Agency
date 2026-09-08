"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Newspaper,
  Link as LinkIcon,
  Tv,
  Users,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide Navbar on /login, /pricing, and all /admin/* pages
  if (pathname === "/login" || pathname === "/pricing" || pathname.startsWith("/admin")) {
    return null;
  }

  const isWhiteNav = Boolean(activeDropdown);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  };
  const closeDropdown = () => setActiveDropdown(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3.5 pb-2 px-4 sm:px-6">
      <div className="w-full max-w-[1320px] mx-auto">
        <div ref={dropdownRef} onMouseLeave={() => setActiveDropdown(null)}>
          {/* Main Floating Navbar Container */}
          <nav
            className={`w-full flex items-center justify-between px-3.5 sm:px-5 lg:px-8 transition-all duration-300 ${isWhiteNav
                ? "bg-[#f4f5f8] border border-slate-200/80 shadow-lg text-slate-900 rounded-t-3xl rounded-b-none border-b-0 py-3"
                : "bg-[#040d21] border border-[#162d5a] shadow-xl text-white rounded-full py-2.5"
              }`}
          >
            {/* Logo / Brand */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 group"
                onClick={closeMobile}
              >
                <img
                  src="/logo-cropped.png"
                  alt="RankPartner.io Logo"
                  className={`h-7 sm:h-8 lg:h-[34px] w-auto object-contain transition-all duration-300 ${
                    isWhiteNav ? "brightness-0" : "brightness-0 invert"
                  }`}
                />
              </Link>
            </div>

            {/* Desktop Nav Links (md+) */}
            <div
              className={`hidden md:flex items-center gap-5 lg:gap-7 text-sm transition-colors duration-300 ${isWhiteNav ? "text-slate-700" : "text-slate-200"
                }`}
            >
              {/* Services Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={() => setActiveDropdown("services")}
              >
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "services" ? null : "services"
                    )
                  }
                  className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer outline-none ${isWhiteNav ? "hover:text-black" : "hover:text-white"
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""
                      } ${isWhiteNav ? "text-slate-600" : "text-slate-300"}`}
                  />
                </button>
              </div>

              {/* Who We Serve Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={() => setActiveDropdown("whoweserve")}
              >
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "whoweserve" ? null : "whoweserve"
                    )
                  }
                  className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer outline-none ${isWhiteNav ? "hover:text-black" : "hover:text-white"
                    }`}
                >
                  <span>Who we serve</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "whoweserve" ? "rotate-180" : ""
                      } ${isWhiteNav ? "text-slate-600" : "text-slate-300"}`}
                  />
                </button>
              </div>

              <Link
                href="/blog"
                className={`font-medium transition-colors ${isWhiteNav ? "hover:text-black" : "hover:text-white"
                  }`}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors ${isWhiteNav ? "hover:text-black" : "hover:text-white"
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className={`font-medium transition-colors ${isWhiteNav ? "hover:text-black" : "hover:text-white"
                  }`}
              >
                FAQ
              </Link>
            </div>

            {/* Desktop Right Action Buttons */}
            <div className="hidden md:flex items-center gap-4 sm:gap-5 text-sm shrink-0">
              <Link
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium transition-colors ${isWhiteNav
                    ? "text-slate-800 hover:text-black"
                    : "text-slate-200 hover:text-white"
                  }`}
              >
                Agency login
              </Link>

              {/* Lavender Contact Us Button */}
              <Link
                href="/#get-in-touch"
                className="bg-[#f59e0b] hover:bg-[#d97706] text-[#030919] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
              >
                Contact us
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="/#get-in-touch"
                className="hidden min-[360px]:block bg-[#f59e0b] text-[#030919] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                onClick={closeMobile}
              >
                Contact us
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-1.5 rounded-lg focus:outline-none transition-colors ${isWhiteNav
                    ? "text-slate-800 hover:bg-slate-200"
                    : "text-white hover:bg-white/10"
                  }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </nav>

          {/* Desktop Mega Dropdowns with White Background */}
          {activeDropdown === "services" && (
            <div className="p-5 sm:p-6 rounded-b-3xl bg-[#f4f5f8] border border-t-0 border-slate-200/90 shadow-2xl transition-all duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/press-placements"
                  onClick={closeDropdown}
                  className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#6d28d9] transition-colors">
                      Press Placements
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Guaranteed features on top-tier media
                    </p>
                  </div>
                  <div className="ml-4 p-2.5 rounded-xl bg-purple-50/70 text-purple-600 group-hover:scale-110 group-hover:bg-purple-100 transition-all shrink-0">
                    <Newspaper className="w-6 h-6" />
                  </div>
                </Link>
                <Link
                  href="/authority-backlinks"
                  onClick={closeDropdown}
                  className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#6d28d9] transition-colors">
                      Authority Backlinks
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Contextual links on DR 40-90+ sites
                    </p>
                  </div>
                  <div className="ml-4 p-2.5 rounded-xl bg-violet-50/70 text-[#6d28d9] group-hover:scale-110 group-hover:bg-violet-100 transition-all shrink-0">
                    <LinkIcon className="w-6 h-6" />
                  </div>
                </Link>
                <Link
                  href="/tv-interviews"
                  onClick={closeDropdown}
                  className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#6d28d9] transition-colors">
                      TV Interviews
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Secured broadcast appearances
                    </p>
                  </div>
                  <div className="ml-4 p-2.5 rounded-xl bg-amber-50/70 text-amber-600 group-hover:scale-110 group-hover:bg-amber-100 transition-all shrink-0">
                    <Tv className="w-6 h-6" />
                  </div>
                </Link>
              </div>
            </div>
          )}

          {activeDropdown === "whoweserve" && (
            <div className="p-5 sm:p-6 rounded-b-3xl bg-[#f4f5f8] border border-t-0 border-slate-200/90 shadow-2xl transition-all duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/for-agencies"
                  onClick={closeDropdown}
                  className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#6d28d9] transition-colors">
                      For Agencies
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      White-label PR &amp; SEO at scale
                    </p>
                  </div>
                  <div className="ml-4 p-2.5 rounded-xl bg-violet-50/70 text-[#6d28d9] group-hover:scale-110 group-hover:bg-violet-100 transition-all shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                </Link>
                <Link
                  href="/for-publishers"
                  onClick={closeDropdown}
                  className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#6d28d9] transition-colors">
                      For Publishers
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Monetize unsold inventory
                    </p>
                  </div>
                  <div className="ml-4 p-2.5 rounded-xl bg-amber-50/70 text-amber-600 group-hover:scale-110 group-hover:bg-amber-100 transition-all shrink-0">
                    <Newspaper className="w-6 h-6" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMobile}
        >
          <div
            className="absolute top-20 sm:top-24 left-4 right-4 sm:left-6 sm:right-6 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-1 text-slate-800">
              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === "services" ? null : "services"
                    )
                  }
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileExpanded === "services" ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileExpanded === "services" && (
                  <div className="mx-2 mb-2 space-y-1 bg-white rounded-xl border border-slate-100 overflow-hidden">
                    <Link
                      href="/press-placements"
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <Newspaper className="w-4 h-4 text-purple-500 shrink-0" />
                      Press Placements
                    </Link>
                    <div className="h-px bg-slate-100 mx-4" />
                    <Link
                      href="/authority-backlinks"
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-violet-50 hover:text-[#6d28d9] transition-colors"
                    >
                      <LinkIcon className="w-4 h-4 text-[#6d28d9] shrink-0" />
                      Authority Backlinks
                    </Link>
                    <div className="h-px bg-slate-100 mx-4" />
                    <Link
                      href="/tv-interviews"
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      <Tv className="w-4 h-4 text-amber-500 shrink-0" />
                      TV Interviews
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Who We Serve Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === "whoweserve" ? null : "whoweserve"
                    )
                  }
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <span>Who we serve</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileExpanded === "whoweserve" ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileExpanded === "whoweserve" && (
                  <div className="mx-2 mb-2 space-y-1 bg-white rounded-xl border border-slate-100 overflow-hidden">
                    <Link
                      href="/for-agencies"
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-violet-50 hover:text-[#6d28d9] transition-colors"
                    >
                      <Users className="w-4 h-4 text-[#6d28d9] shrink-0" />
                      For Agencies
                    </Link>
                    <div className="h-px bg-slate-100 mx-4" />
                    <Link
                      href="/for-publishers"
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      <Newspaper className="w-4 h-4 text-amber-500 shrink-0" />
                      For Publishers
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                onClick={closeMobile}
                className="flex items-center px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about"
                onClick={closeMobile}
                className="flex items-center px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/faq"
                onClick={closeMobile}
                className="flex items-center px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                FAQ
              </Link>

              <div className="h-px bg-slate-200 my-2" />

              <Link
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Agency login
              </Link>
              <Link
                href="/#get-in-touch"
                onClick={closeMobile}
                className="block w-full text-center mt-2 px-6 py-3 rounded-xl bg-[#f59e0b] text-[#062c19] font-bold text-sm transition-all duration-200 hover:bg-[#d97706] active:scale-95"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

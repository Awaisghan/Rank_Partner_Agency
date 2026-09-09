"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#040b1b] text-white pt-16 pb-12 px-6 sm:px-10 lg:px-16 border-t border-slate-800/60 relative z-10">
      <div className="max-w-[1550px] mx-auto">
        
        {/* Main Footer Content Grid - Evenly Spaced 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* ========================================================================= */}
          {/* COLUMN 1: BRAND LOGO, BIO & SOCIAL LINKS (lg:col-span-5)                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Logo matching Navbar exact style */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <img
                src="/logo-cropped.png"
                alt="RankPartner.io Logo"
                className="h-7 sm:h-8 lg:h-[34px] w-auto object-contain transition-all duration-300 brightness-0 invert"
              />
            </Link>

            {/* Description */}
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              The white-label PR &amp; SEO platform agencies use to get their clients featured, get ranked, rank higher.
            </p>

            {/* 4 Social Icon Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/17oJdsj833/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-white hover:bg-violet-700 hover:border-violet-700 shadow-sm hover:shadow-[0_0_12px_rgba(109,40,217,0.4)] transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.62.77-1.62 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/rank-partner/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-white hover:bg-violet-700 hover:border-violet-700 shadow-sm hover:shadow-[0_0_12px_rgba(109,40,217,0.4)] transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.4 1.4 0 1 0 1.4 1.4c0-.77-.63-1.4-1.4-1.4Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/rankpartner.io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-white hover:bg-violet-700 hover:border-violet-700 shadow-sm hover:shadow-[0_0_12px_rgba(109,40,217,0.4)] transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2 stroke-round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/RankPartnerio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-white hover:bg-violet-700 hover:border-violet-700 shadow-sm hover:shadow-[0_0_12px_rgba(109,40,217,0.4)] transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2: SERVICES (lg:col-span-2)                                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
              SERVICES
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-300">
              <li>
                <Link href="/press-placements" className="hover:text-white transition-colors">
                  Press Placements
                </Link>
              </li>
              <li>
                <Link href="/authority-backlinks" className="hover:text-white transition-colors">
                  Authority Backlinks
                </Link>
              </li>
              <li>
                <Link href="/tv-interviews" className="hover:text-white transition-colors">
                  TV Interviews
                </Link>
              </li>
            </ul>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 3: WHO WE SERVE (lg:col-span-2)                                    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
              WHO WE SERVE
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-300">
              <li>
                <Link href="/agencies" className="hover:text-white transition-colors">
                  For Agencies
                </Link>
              </li>
              <li>
                <Link href="/publishers" className="hover:text-white transition-colors">
                  For Publishers
                </Link>
              </li>
            </ul>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 4: COMPANY (lg:col-span-3)                                         */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
              COMPANY
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>© 2026 RankPartner. All rights reserved.</p>
          <p>
            Design By{" "}
            <a
              href="https://mrwebhub.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4fa751] font-semibold hover:underline"
            >
              Mrwebhub
            </a>
          </p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="#terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

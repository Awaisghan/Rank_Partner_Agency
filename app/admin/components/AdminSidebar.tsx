"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Tv,
  Monitor,
  List,
  TrendingUp,
  Printer,
  Share2,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Publications",
    href: "/admin/publications",
    icon: FileText,
  },
  {
    label: "Broadcast Television",
    href: "/admin/broadcast-television",
    icon: Tv,
  },
  {
    label: "Digital Television",
    href: "/admin/digital-television",
    icon: Monitor,
  },
  {
    label: "Listicles",
    href: "/admin/listicles",
    icon: List,
  },
  {
    label: "Best Sellers",
    href: "/admin/best-sellers",
    icon: TrendingUp,
  },
  {
    label: "Print",
    href: "/admin/print",
    icon: Printer,
  },
  {
    label: "Social Post",
    href: "/admin/social-post",
    icon: Share2,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="w-full bg-[#0f172a] border-b border-white/10 sticky top-0 z-40 shadow-md">
      {/* Top Header Bar */}
      <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/10 gap-4">
        {/* Brand Logo & Admin Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/publications"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-white"
              >
                <path
                  d="M16 3L3 29H10.5L16 17.5L21.5 29H29L16 3Z"
                  fill="currentColor"
                />
                <path d="M16 12.5L12 20.5H20L16 12.5Z" fill="#0f172a" />
              </svg>
            </div>
            <div className="flex items-center leading-none">
              <span className="font-black text-sm tracking-wider text-white uppercase">
                RANK_
              </span>
              <span className="font-bold text-sm tracking-wider text-white/70 uppercase">
                PARTNER
              </span>
            </div>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e63939]/20 text-[#e63939] text-[10px] font-extrabold uppercase tracking-widest border border-[#e63939]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e63939] animate-pulse" />
            Admin Panel
          </span>
        </div>

        {/* Right Side: Admin Account & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#e63939] to-[#b91c1c] flex items-center justify-center font-black text-[9px] text-white shrink-0 shadow-xs">
              RP
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-white leading-tight">
                Admin
              </p>
              <p className="text-[9.5px] text-white/40 leading-tight">
                rankpartner@gmail.com
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#e63939] hover:bg-[#d62828] transition-all cursor-pointer shadow-xs"
          >
            <span>Log Out</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Horizontal Navigation Bar */}
      <div className="w-full px-4 sm:px-6 overflow-x-auto scrollbar-none py-2 flex items-center gap-1.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#e63939] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 shrink-0 ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}

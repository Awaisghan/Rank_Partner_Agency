"use client";

import React from "react";

interface IconTooltipProps {
  /** Title shown in bold at the top of the tooltip */
  title: string;
  /** Subtitle shown on the second line */
  subtitle?: string;
  /** Optional max width class override (defaults to max-w-[210px]) */
  maxWidth?: string;
  /** Positioning of tooltip relative to icon: 'top' (above) or 'bottom' (below). Defaults to 'bottom'. */
  position?: "top" | "bottom";
  children: React.ReactNode;
}

/**
 * Wraps any icon with a hover tooltip that shows a title + subtitle.
 * Usage:
 *   <IconTooltip title="Domain Authority" subtitle="Search engine Ranking score (1-100)">
 *     <HelpCircle className="..." />
 *   </IconTooltip>
 */
export default function IconTooltip({
  title,
  subtitle,
  maxWidth = "max-w-[210px]",
  position = "bottom",
  children,
}: IconTooltipProps) {
  const isTop = position === "top";

  return (
    <span className="relative inline-flex items-center group/tip cursor-pointer">
      {children}

      {/* Tooltip box */}
      <span
        className={`
          pointer-events-none
          absolute left-1/2 -translate-x-1/2 ${isTop ? "bottom-full mb-2" : "top-full mt-2"}
          w-max ${maxWidth}
          bg-white text-slate-900 leading-snug
          border border-slate-200
          rounded-lg px-3.5 py-2
          opacity-0 group-hover/tip:opacity-100
          scale-95 group-hover/tip:scale-100
          transition-all duration-150 ease-out
          z-[9999]
          whitespace-normal
          shadow-xl shadow-slate-900/10
          text-left
          tracking-normal
          normal-case
        `}
        role="tooltip"
      >
        {/* Arrow border */}
        <span
          className={`
            absolute left-1/2 -translate-x-1/2
            ${isTop ? "top-full border-[5px] border-transparent border-t-slate-200" : "bottom-full border-[5px] border-transparent border-b-slate-200"}
          `}
        />
        {/* Arrow fill */}
        <span
          className={`
            absolute left-1/2 -translate-x-1/2
            ${isTop ? "top-full border-[4px] border-transparent border-t-white" : "bottom-full border-[4px] border-transparent border-b-white"}
          `}
        />

        <span className="block font-bold text-slate-900 text-[12px] tracking-tight">{title}</span>
        {subtitle && <span className="block text-slate-500 font-normal text-[11.5px] mt-0.5 leading-snug">{subtitle}</span>}
      </span>
    </span>
  );
}

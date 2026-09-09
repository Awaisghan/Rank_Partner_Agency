"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function OurTeamSection() {
  const teamMembers = [
    {
      name: "Joshua Bryan",
      role: "CUSTOMER SUPPORT",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Elena Ivy",
      role: "CUSTOMER SUPPORT",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Betty Tan",
      role: "CUSTOMER SUPPORT",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Dylan Thomas",
      role: "CUSTOMER SUPPORT",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-white text-slate-900 pt-20 lg:pt-24 pb-12 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans relative z-10">
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Header Tagline & Title */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-[#6d28d9] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs sm:text-sm">
              OUR TEAM
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-extrabold tracking-tight leading-[1.15] text-slate-900 text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] max-w-3xl mb-4">
            The people{" "}
            <span className="italic font-serif font-normal text-[#6d28d9]">
              behind the placements.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed font-normal mb-12">
            The press strategists, link builders, editors and partners who run every placement and ranking. Every account is handled by senior operators who have done the work themselves.
          </p>
        </ScrollReveal>

        {/* Subsection Tagline: TEAM SUPPORT */}
        <ScrollReveal delay={180}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[#6d28d9] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs">
              TEAM SUPPORT
            </span>
          </div>
        </ScrollReveal>

        {/* Leadership Grid */}
        <ScrollReveal delay={220}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl bg-slate-950 aspect-[3/4] group cursor-pointer shadow-xl border border-slate-800/20"
              >
                {/* Background Headshot Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040e21] via-[#040e21]/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="font-extrabold text-white text-lg sm:text-xl leading-tight mb-1 group-hover:text-[#60a5fa] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-[#f59e0b] font-extrabold text-[11px] tracking-wider uppercase">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>


      </div>
    </section>
  );
}

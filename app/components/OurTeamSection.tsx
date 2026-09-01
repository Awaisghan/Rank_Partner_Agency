"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";

export default function OurTeamSection() {
  const teamMembers = [
    {
      name: "Jonathan Jadali",
      role: "FOUNDER & CHIEF EXECUTIVE OFFICER",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Brauch Owens",
      role: "CHIEF STRATEGY OFFICER",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "George Nellist",
      role: "CHIEF REVENUE OFFICER",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Amir Bakian",
      role: "CHIEF OPERATING OFFICER",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const widerTeamMembers = [
    {
      name: "Nadia Faridnia",
      role: "OPERATIONS MANAGER & HUMAN RESOURCES",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kandyce Coulloudon",
      role: "EXECUTIVE ASSISTANT",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Evan Arroyo",
      role: "SENIOR BUSINESS DEVELOPMENT REPRESENTATIVE",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Ron Spears",
      role: "STRATEGIC ADVISOR",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Derreck Pickard",
      role: "BROADCAST MANAGER",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Skylar Valencia",
      role: "BUSINESS DEVELOPMENT REPRESENTATIVE",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Hana Baichtal",
      role: "SENIOR PUBLIC RELATIONS COORDINATOR",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Maya Tarano",
      role: "PUBLIC RELATIONS COORDINATOR",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Andrea Gonzalez",
      role: "PUBLIC RELATIONS COORDINATOR",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Amanda Lauener",
      role: "PUBLIC RELATIONS COORDINATOR",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "David Ortega",
      role: "SAAS OPERATIONS SPECIALIST",
      image:
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Samantha Guzman",
      role: "PUBLIC RELATIONS COORDINATOR",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-white text-slate-900 py-20 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans relative z-10">
      <div className="w-full max-w-[1360px] mx-auto">
        {/* Header Tagline & Title */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-[#3b82f6] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#3b82f6] uppercase text-xs sm:text-sm">
              OUR TEAM
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-extrabold tracking-tight leading-[1.15] text-slate-900 text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] max-w-3xl mb-4">
            The people{" "}
            <span className="italic font-serif font-normal text-[#3b82f6]">
              behind the placements.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed font-normal mb-12">
            The press strategists, link builders, editors and partners who run every placement and ranking. Every account is handled by senior operators who have done the work themselves.
          </p>
        </ScrollReveal>

        {/* Subsection Tagline: LEADERSHIP */}
        <ScrollReveal delay={180}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[#3b82f6] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#3b82f6] uppercase text-xs">
              LEADERSHIP
            </span>
          </div>
        </ScrollReveal>

        {/* Leadership Grid */}
        <ScrollReveal delay={220}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
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

                  <p className="text-[#4ade80] font-extrabold text-[11px] tracking-wider uppercase mb-3">
                    {member.role}
                  </p>

                  <div className="flex items-center gap-1 text-slate-400 font-bold text-[11px] tracking-widest uppercase group-hover:text-white transition-colors">
                    <span>VIEW PROFILE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Subsection Tagline: THE WIDER TEAM */}
        <ScrollReveal delay={240}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[#3b82f6] rounded-full" />
            <span className="font-bold tracking-[0.2em] text-[#3b82f6] uppercase text-xs">
              THE WIDER TEAM
            </span>
          </div>
        </ScrollReveal>

        {/* The Wider Team Grid: 6 Cards per row */}
        <ScrollReveal delay={280}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {widerTeamMembers.map((member, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl bg-slate-950 aspect-[3/4] group cursor-pointer shadow-lg border border-slate-800/20"
              >
                {/* Background Headshot Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040e21] via-[#040e21]/50 to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <h4 className="font-bold text-white text-xs sm:text-sm leading-snug mb-1 group-hover:text-[#60a5fa] transition-colors">
                    {member.name}
                  </h4>

                  <p className="text-[#4ade80] font-extrabold text-[9px] sm:text-[10px] tracking-wider uppercase leading-tight">
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

"use client";

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Link from "next/link";

const sections = [
  { id: "acceptance", number: "01", title: "Acceptance of the Terms of Use" },
  { id: "access-and-use", number: "02", title: "Access to and Use of the Website and Services" },
  { id: "confidentiality", number: "03", title: "Confidentiality" },
  { id: "intellectual-property", number: "04", title: "Intellectual Property Rights" },
  { id: "modification-suspension", number: "05", title: "Modification; Suspension; Termination" },
  { id: "geographic-restrictions", number: "06", title: "Geographic Restrictions" },
  { id: "disclaimer-warranties", number: "07", title: "Disclaimer of Warranties" },
  { id: "limitation-liability", number: "08", title: "Limitation on Liability" },
  { id: "representations-warranties", number: "09", title: "Representations and Warranties" },
  { id: "indemnification", number: "10", title: "Indemnification" },
  { id: "governing-law", number: "11", title: "Governing Law" },
  { id: "dispute-resolution", number: "12", title: "Dispute Resolution" },
  { id: "assignment", number: "13", title: "Assignment" },
  { id: "waiver-severability", number: "14", title: "Waiver and Severability" },
  { id: "notices-concerns", number: "15", title: "Notices; Comments and Concerns" },
  { id: "entire-agreement", number: "16", title: "Entire Agreement" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#040d21] text-slate-200 relative font-sans pt-28 pb-20 overflow-x-clip">
      {/* Background Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-violet-700/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-12 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Terms of Use
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            The terms governing access to and use of the RankPartner.io website, platform, and services.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-lg backdrop-blur-md">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Revised: September 9, 2026</span>
          </div>
        </div>
      </div>

      {/* Main Container with Sticky Left Sidebar + Scrollable Right Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sticky Left Sidebar (Topics Stuck / Fixed while right side content scrolls) */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.18em] mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>On this page</span>
                <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full font-mono">16 Topics</span>
              </h2>

              <nav className="space-y-1 max-h-48 lg:max-h-[calc(100vh-220px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all duration-200 group ${
                        isActive
                          ? "bg-violet-600/20 text-white font-semibold border border-violet-500/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-normal"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? "bg-violet-500 text-white font-bold"
                            : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        {sec.number}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Content Column */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-12">
            
            {/* 01 Acceptance of the Terms of Use */}
            <section id="acceptance" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">01</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Acceptance of the Terms of Use</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Welcome to RankPartner.io ("RankPartner.io," "Company," "we," "us," or "our"). These Terms of Use govern your access to and use of the RankPartner.io website, platform, content, features, and services made available through the website (collectively, the "Website" and "Services").
                </p>
                <p>
                  RankPartner.io provides a white-label platform that enables agencies to access publishing opportunities, including press placements, authority backlinks, and TV interview opportunities for their clients. Access to certain features and services may require an account or authorization provided by RankPartner.io.
                </p>
                <p>
                  Please read these Terms of Use carefully before accessing or using the Website or Services. By accessing or using the Website or Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and any additional terms that may apply to specific services, placements, orders, or agreements.
                </p>
                <p className="font-semibold text-white bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl">
                  If you do not agree with these Terms of Use, you must not access or use the Website or Services.
                </p>
                <p>
                  You must be at least eighteen (18) years old to use the Website or Services. By accessing or using RankPartner.io, you represent and warrant that you are legally capable of entering into these Terms and that your use of the Website and Services complies with applicable laws and regulations.
                </p>
                <p>
                  We may revise these Terms of Use from time to time. Updated terms become effective when posted on the Website unless otherwise stated. Your continued use of the Website or Services after updated terms are posted constitutes your acceptance of the revised Terms.
                </p>
              </div>
            </section>

            {/* 02 Access to and Use of the Website and Services */}
            <section id="access-and-use" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">02</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Access to and Use of the Website and Services</h2>
              </div>
              
              <div className="space-y-6">
                {/* Services */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-3">
                  <h3 className="text-white font-semibold text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                    Services
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    RankPartner.io provides agencies with access to publishing and media opportunities through its platform. Available services may include press placements, authority backlinks, and TV interview opportunities.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Access to the platform may be provided by RankPartner.io after you contact us and receive account login information. The availability of publishers, placements, opportunities, pricing, requirements, turnaround times, and other service details may change at any time.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Before submitting an order or placement request, you are responsible for reviewing the available information and requirements associated with the selected opportunity.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    All orders, placement requests, and service arrangements may be subject to additional terms, pricing, requirements, or agreements communicated by RankPartner.io.
                  </p>
                </div>

                {/* Third-Party Platforms */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-3">
                  <h3 className="text-white font-semibold text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                    Third-Party Platforms, Services, Publishers, and Content
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    The Website and Services may interact with or provide access to third-party websites, publishers, media outlets, platforms, services, or other external resources ("Third-Party Services").
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Your use of any Third-Party Service may be subject to the terms, conditions, privacy policies, and other rules established by the applicable third party.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    RankPartner.io does not own or control independent third-party publishers, media outlets, websites, or platforms. The inclusion of a publisher or Third-Party Service on RankPartner.io does not constitute an endorsement or guarantee of its availability, performance, editorial decisions, audience, traffic, rankings, or continued operation.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Third-party content, publication decisions, editorial standards, timelines, and availability may be outside our control. We are not responsible for the actions, omissions, policies, content, or practices of third parties.
                  </p>
                </div>

                {/* User Accounts and Platform Access */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-3">
                  <h3 className="text-white font-semibold text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                    User Accounts and Platform Access
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Certain areas of RankPartner.io may require an account or login credentials provided by RankPartner.io.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    You are responsible for keeping your login credentials confidential and for all activity conducted through your account. You must not share your account credentials with unauthorized individuals or allow another person or organization to access your account without our prior written permission.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    You agree to provide accurate and current information when requested and to notify us promptly if you believe your account has been accessed without authorization.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    RankPartner.io may restrict, suspend, or terminate access to an account where we reasonably believe that the account has been misused, compromised, or used in violation of these Terms.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    You are responsible for all content, materials, information, and other submissions you provide through the Website or Services.
                  </p>
                </div>

                {/* Prohibited Uses */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-3">
                  <h3 className="text-white font-semibold text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    Prohibited Uses
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                    You may use RankPartner.io only for lawful business purposes and in accordance with these Terms. You must not:
                  </p>
                  <ul className="space-y-2 text-slate-300 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400">
                    <li>violate any applicable law, regulation, rule, order, or third-party right;</li>
                    <li>submit or transmit content that is unlawful, fraudulent, defamatory, abusive, threatening, deceptive, obscene, or otherwise inappropriate;</li>
                    <li>submit content that infringes another person's intellectual property, privacy, publicity, or other legal rights;</li>
                    <li>impersonate RankPartner.io, its employees, representatives, publishers, partners, or another person or organization;</li>
                    <li>use the Website or Services to distribute spam, malware, viruses, or other harmful material;</li>
                    <li>attempt to gain unauthorized access to accounts, systems, servers, databases, or other parts of the Website;</li>
                    <li>interfere with or disrupt the operation, security, or availability of the Website or Services;</li>
                    <li>use automated tools, bots, crawlers, scraping systems, or similar methods to copy or extract protected platform information without our written permission;</li>
                    <li>copy, reproduce, redistribute, sell, publish, or commercially exploit RankPartner.io's publisher information, pricing information, platform data, or other proprietary information without authorization;</li>
                    <li>use information obtained through your RankPartner.io account to bypass RankPartner.io and directly solicit, contract with, or otherwise circumvent the Company's business relationships with publishers or partners;</li>
                    <li>attempt to reverse engineer, modify, decompile, or otherwise interfere with the Website or its underlying technology;</li>
                    <li>use the Website or Services for any unauthorized purpose; or</li>
                    <li>encourage or assist another person in doing any of the foregoing.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 03 Confidentiality */}
            <section id="confidentiality" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">03</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Confidentiality</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  You may receive or obtain access to confidential or non-public information through RankPartner.io, including publisher information, pricing, placement details, business information, platform functionality, and other information that is not publicly available ("Confidential Information").
                </p>
                <p>
                  You agree to keep Confidential Information confidential and use it only for legitimate purposes related to your authorized use of RankPartner.io.
                </p>
                <p>
                  You must not disclose, distribute, reproduce, sell, publish, or otherwise use confidential information for purposes unrelated to your relationship with RankPartner.io without our prior written consent.
                </p>
                <p>
                  This confidentiality obligation does not apply to information that becomes publicly available through no breach of these Terms, was already lawfully known to you, is independently developed without use of Confidential Information, or must be disclosed by law or legal process.
                </p>
              </div>
            </section>

            {/* 04 Intellectual Property Rights */}
            <section id="intellectual-property" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">04</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Intellectual Property Rights</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  The Website and Services, including their design, layout, graphics, text, software, functionality, trademarks, logos, databases, platform features, and other content, are owned by or licensed to RankPartner.io and are protected by applicable intellectual property laws.
                </p>
                <p>
                  Except as expressly permitted by these Terms, you may not reproduce, modify, distribute, publicly display, publish, create derivative works from, sell, license, or commercially exploit any portion of the Website or Services.
                </p>
                <p>
                  Your authorized access to RankPartner.io does not transfer ownership of the Website, platform, publisher database, pricing information, trademarks, or other intellectual property to you.
                </p>
                <p>
                  Information made available through your RankPartner.io account may constitute confidential and proprietary business information of RankPartner.io, including publisher lists, publisher details, pricing, placement information, and related platform data.
                </p>
                <p>
                  You may use information available through the platform only for your legitimate agency business purposes and in accordance with these Terms.
                </p>
                <p>
                  If you believe material on the Website infringes your intellectual property rights, please contact us using the contact information provided below.
                </p>
              </div>
            </section>

            {/* 05 Modification; Suspension; Termination */}
            <section id="modification-suspension" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">05</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Modification; Suspension; Termination</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We reserve the right to modify, restrict, suspend, or discontinue all or any portion of the Website or Services at any time.
                </p>
                <p>
                  We may change available publishers, placement opportunities, pricing, requirements, features, or other aspects of the Services without prior notice.
                </p>
                <p>
                  We may suspend or terminate your access to the Website or Services if you violate these Terms, misuse the platform, fail to meet applicable requirements, or engage in conduct that may harm RankPartner.io, its publishers, partners, users, or systems.
                </p>
                <p>
                  Upon termination, your authorization to access and use the Website and Services will immediately cease unless otherwise agreed in writing.
                </p>
                <p>
                  Sections concerning confidentiality, intellectual property, disclaimers, limitations of liability, indemnification, dispute resolution, and any provisions that by their nature should survive termination will continue to apply after termination.
                </p>
              </div>
            </section>

            {/* 06 Geographic Restrictions */}
            <section id="geographic-restrictions" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">06</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Geographic Restrictions</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RankPartner.io may provide its Website and Services to users in different countries and regions.
                </p>
                <p>
                  We do not represent that the Website, Services, or any content available through them are appropriate or legally available in every jurisdiction.
                </p>
                <p>
                  If you access or use RankPartner.io from outside the jurisdiction in which the Company operates, you are responsible for complying with all applicable local laws and regulations.
                </p>
                <p>
                  You must not access or use the Website where doing so would violate applicable law.
                </p>
              </div>
            </section>

            {/* 07 Disclaimer of Warranties */}
            <section id="disclaimer-warranties" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">07</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Disclaimer of Warranties</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed uppercase tracking-wide">
                <p className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/20 text-slate-200 font-semibold leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE WEBSITE, PLATFORM, CONTENT, AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
                </p>
                <p className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/20 text-slate-200 font-semibold leading-relaxed">
                  RANKPARTNER.IO DISCLAIMS ALL WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AVAILABILITY, ACCURACY, RELIABILITY, AND SECURITY, TO THE MAXIMUM EXTENT PERMITTED BY LAW.
                </p>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  We do not guarantee that the Website or Services will always be available, uninterrupted, secure, accurate, complete, error-free, or free from harmful components.
                </p>
                <p>
                  Publisher information, metrics, pricing, availability, estimated timelines, editorial requirements, and other information displayed through the Website may change and may originate from third parties. While we may provide information to help users evaluate opportunities, we do not guarantee the accuracy or continued availability of third-party information.
                </p>
                <p>
                  RankPartner.io does not guarantee search engine rankings, traffic, leads, sales, revenue, media exposure, brand recognition, SEO results, or any particular business outcome from a press placement, backlink, TV interview, or other service.
                </p>
                <p>
                  Publication decisions, editorial changes, removal of content, delays, availability, and other actions controlled by third-party publishers or media organizations are outside RankPartner.io's control.
                </p>
                <p className="font-semibold text-white bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl">
                  YOU ARE RESPONSIBLE FOR EVALUATING WHETHER A PARTICULAR SERVICE OR PLACEMENT IS APPROPRIATE FOR YOUR BUSINESS OR YOUR CLIENTS.
                </p>
                <p>
                  Nothing in these Terms excludes warranties or rights that cannot legally be excluded or limited under applicable law.
                </p>
              </div>
            </section>

            {/* 08 Limitation on Liability */}
            <section id="limitation-liability" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">08</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Limitation on Liability</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed uppercase tracking-wide">
                <p className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/20 text-slate-200 font-semibold leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, RANKPARTNER.IO AND ITS AFFILIATES, PARTNERS, SERVICE PROVIDERS, OFFICERS, EMPLOYEES, AND REPRESENTATIVES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO YOUR ACCESS TO OR USE OF THE WEBSITE OR SERVICES.
                </p>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mt-6">
                <p>
                  This includes, to the extent permitted by law, losses relating to lost profits, lost revenue, lost business opportunities, loss of data, loss of goodwill, business interruption, search engine performance, rankings, traffic, leads, sales, or expected marketing results.
                </p>
                <p>
                  RankPartner.io will not be responsible for losses caused by third-party publishers, media outlets, platforms, hosting providers, payment processors, internet service providers, or other third parties beyond our reasonable control.
                </p>
                <p className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/20 text-slate-200 font-semibold text-xs sm:text-sm uppercase tracking-wide leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY ARISING OUT OF OR RELATING TO THE WEBSITE OR SERVICES WILL NOT EXCEED THE AMOUNT YOU PAID TO RANKPARTNER.IO FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
                </p>
                <p>
                  Nothing in these Terms limits liability that cannot legally be limited or excluded.
                </p>
              </div>
            </section>

            {/* 09 Representations and Warranties */}
            <section id="representations-warranties" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">09</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Representations and Warranties</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base mb-4">
                By using RankPartner.io, you represent, warrant, and agree that:
              </p>
              <ul className="space-y-2 text-slate-300 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400 mb-6">
                <li>you are at least eighteen (18) years old;</li>
                <li>you have the legal authority to enter into these Terms;</li>
                <li>information you provide to RankPartner.io is accurate and not misleading;</li>
                <li>you have the necessary rights, permissions, and licenses for content you submit;</li>
                <li>content submitted through the platform does not infringe third-party rights;</li>
                <li>your use of the Website and Services complies with applicable laws and regulations;</li>
                <li>you will not knowingly submit fraudulent, misleading, or unlawful content;</li>
                <li>you will not misuse publisher or platform information; and</li>
                <li>you will comply with any additional requirements communicated for a selected placement or service.</li>
              </ul>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                You remain responsible for obtaining all necessary permissions relating to client content, trademarks, images, claims, disclosures, and other materials submitted through the Website or Services.
              </p>
            </section>

            {/* 10 Indemnification */}
            <section id="indemnification" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">10</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Indemnification</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base mb-4 leading-relaxed">
                To the maximum extent permitted by applicable law, you agree to defend, indemnify, and hold harmless RankPartner.io and its affiliates, officers, employees, representatives, service providers, and partners from claims, liabilities, damages, losses, costs, expenses, and reasonable attorneys' fees arising from or related to:
              </p>
              <ul className="space-y-2 text-slate-300 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400 mb-6">
                <li>your use of the Website or Services;</li>
                <li>your violation of these Terms;</li>
                <li>content or information you submit through the Website or Services;</li>
                <li>your violation of applicable laws or third-party rights;</li>
                <li>your misuse of publisher or platform information; or</li>
                <li>disputes between you and your clients or other third parties.</li>
              </ul>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                RankPartner.io reserves the right to assume control of the defense of any matter subject to indemnification, and you agree to reasonably cooperate with us in that defense.
              </p>
            </section>

            {/* 11 Governing Law */}
            <section id="governing-law" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">11</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Governing Law</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  These Terms of Use and any dispute arising out of or relating to the Website or Services will be governed by applicable law, without regard to conflict-of-law principles, unless applicable law requires otherwise.
                </p>
                <p>
                  If RankPartner.io later designates a specific governing jurisdiction through an updated version of these Terms or a separate written agreement, that provision will control to the extent permitted by law.
                </p>
              </div>
            </section>

            {/* 12 Dispute Resolution */}
            <section id="dispute-resolution" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">12</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Dispute Resolution</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  If a dispute arises between you and RankPartner.io relating to these Terms, the Website, or the Services, the parties should first attempt to resolve the matter informally and in good faith by contacting one another and discussing the issue.
                </p>
                <p>
                  If the dispute cannot be resolved informally, either party may pursue any remedies available under applicable law and in a court or other forum having appropriate jurisdiction.
                </p>
                <p>
                  Nothing in these Terms prevents either party from seeking emergency or equitable relief where permitted by applicable law.
                </p>
                <p>
                  Any dispute-resolution provision contained in a separate written agreement between you and RankPartner.io may supersede this section to the extent of a conflict.
                </p>
              </div>
            </section>

            {/* 13 Assignment */}
            <section id="assignment" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">13</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Assignment</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  You may not assign, transfer, delegate, or otherwise dispose of your rights or obligations under these Terms without our prior written consent.
                </p>
                <p>
                  RankPartner.io may assign or transfer these Terms, in whole or in part, in connection with a merger, acquisition, corporate restructuring, sale of assets, or other business transaction.
                </p>
                <p>
                  Any prohibited assignment will be void to the extent permitted by applicable law.
                </p>
              </div>
            </section>

            {/* 14 Waiver and Severability */}
            <section id="waiver-severability" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">14</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Waiver and Severability</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or our right to enforce it later.
                </p>
                <p>
                  If any provision of these Terms is determined to be invalid, unlawful, or unenforceable, that provision will be limited or removed to the minimum extent necessary, and the remaining provisions will continue in full force and effect.
                </p>
              </div>
            </section>

            {/* 15 Notices; Comments and Concerns */}
            <section id="notices-concerns" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">15</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Notices; Comments and Concerns</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RankPartner.io operates the Website and provides the Services described in these Terms.
                </p>
                <p>
                  For questions, notices, support requests, comments, concerns, or other communications relating to these Terms or the Website, please contact:
                </p>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-violet-500/20">
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Email</span>
                  <a href="mailto:Hello@rankpartner.io" className="text-violet-300 hover:text-white font-semibold text-sm sm:text-base transition-colors">
                    Hello@rankpartner.io
                  </a>
                </div>
                <p>
                  If you believe that content available through the Website infringes your copyright or other intellectual property rights, please provide sufficient information for us to identify the allegedly infringing material and evaluate your request.
                </p>
                <p>
                  We may request additional information where necessary to review an intellectual property complaint.
                </p>
              </div>
            </section>

            {/* 16 Entire Agreement */}
            <section id="entire-agreement" className="scroll-mt-28 bg-gradient-to-br from-violet-950/40 via-slate-900/60 to-slate-950 border border-violet-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-white bg-violet-600 px-3 py-1 rounded-lg">16</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Entire Agreement</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  These Terms of Use, together with any applicable policies, service-specific terms, written agreements, order terms, or other terms expressly incorporated by reference, constitute the agreement governing your use of the Website and Services.
                </p>
                <p>
                  These Terms supersede prior understandings or agreements relating specifically to your use of the Website, except where a separate written agreement expressly provides otherwise.
                </p>
                <p>
                  If there is a conflict between these Terms and a separate written agreement concerning a specific service or transaction, the specific written agreement will control to the extent of that conflict.
                </p>
                <div className="pt-6 border-t border-slate-800/80 text-center sm:text-left">
                  <p className="text-violet-300 font-semibold text-base sm:text-lg">
                    Thank you for visiting RankPartner.io.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}

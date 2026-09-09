"use client";

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Link from "next/link";

const sections = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "personal-info", number: "02", title: "Personal Information We Collect" },
  { id: "how-we-use", number: "03", title: "How We Use Personal Information" },
  { id: "sources", number: "04", title: "Sources of Personal Information" },
  { id: "how-we-share", number: "05", title: "How We Share Personal Information" },
  { id: "retention", number: "06", title: "How Long We Keep Personal Information" },
  { id: "cookies", number: "07", title: "Cookies and Tracking Technologies" },
  { id: "preferences", number: "08", title: "Managing Your Information Preferences" },
  { id: "privacy-rights", number: "09", title: "Your Privacy Rights" },
  { id: "security", number: "10", title: "Security" },
  { id: "third-party", number: "11", title: "Third-Party Links" },
  { id: "children", number: "12", title: "Children's Privacy" },
  { id: "international", number: "13", title: "International Data Processing" },
  { id: "changes", number: "14", title: "Privacy Policy Changes" },
  { id: "contact", number: "15", title: "Contact Us" },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview");

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
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            This Privacy Policy explains how RankPartner.io (“RankPartner.io,” “we,” “our,” or “us”) collects, uses, protects, and discloses information when you visit our website, use our platform, contact us, or use our services.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-lg backdrop-blur-md">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Revised: September 9, 2026</span>
          </div>
        </div>
      </div>

      {/* Main Container with Sidebar + Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.18em] mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>On this page</span>
                <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full font-mono">15 Sections</span>
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

          {/* Detailed Content Sections */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-12">
            
            {/* 01 Overview */}
            <section id="overview" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">01</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Overview</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Your privacy is important to us. This Privacy Policy explains how RankPartner.io collects, uses, stores, and protects personal information when you use our website, platform, and services.
                </p>
                <p>
                  RankPartner.io provides a platform through which agencies can access press placements, authority backlinks, and TV interview opportunities. We may collect information from agencies, publishers, website visitors, and other individuals who communicate with us or use our services.
                </p>
                <p>
                  By accessing or using RankPartner.io, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </section>

            {/* 02 Personal Information We Collect */}
            <section id="personal-info" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">02</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Personal Information We Collect</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base mb-6">
                Depending on how you interact with RankPartner.io, we may collect the following categories of information:
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Contact Information
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-3.5">
                    This may include your name, email address, phone number, company name, job title, and other information you provide when contacting us.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Company and Business Information
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-3.5">
                    If you contact us as an agency, publisher, or business, we may collect information about your company, website, services, publishing opportunities, and business requirements.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Account Information
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-3.5">
                    If we provide you with access to the RankPartner.io platform, we may collect information associated with your account, including login credentials, account details, and access information.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Content and Submission Information
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-3.5">
                    When you use the platform, you may provide articles, URLs, client information, campaign details, images, documents, or other materials required for a selected placement.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Payment Information
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-3.5">
                    If you make a payment for our services, payment information may be processed by our third-party payment provider. We may receive transaction details necessary to confirm and manage your payment.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Technical and Usage Information
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-3.5">
                    We may automatically collect information such as your IP address, browser type, device information, operating system, pages viewed, referring pages, approximate location, and information about how you interact with our website and platform.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Cookies and Similar Technologies
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-3.5">
                    We may use cookies, pixels, analytics tools, and similar technologies to operate our website, understand usage, maintain security, and improve our services.
                  </p>
                </div>
              </div>
            </section>

            {/* 03 How We Use Personal Information */}
            <section id="how-we-use" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">03</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">How We Use Personal Information</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base mb-6">
                We may use personal information for the following purposes:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    Providing Our Services
                  </h3>
                  <p className="text-slate-300 text-sm mb-3">We use information to:</p>
                  <ul className="space-y-2 text-slate-300 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400">
                    <li>Provide access to the RankPartner.io platform;</li>
                    <li>Manage your account;</li>
                    <li>Process placement requests and submissions;</li>
                    <li>Review submitted content and information;</li>
                    <li>Coordinate selected publishing opportunities;</li>
                    <li>Communicate with you about your account or services; and</li>
                    <li>Provide customer and technical support.</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <h3 className="text-white font-semibold text-base mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    Improving Our Platform
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We may use information to understand how users interact with our website and platform, identify technical issues, improve functionality, and develop better services.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <h3 className="text-white font-semibold text-base mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    Communication
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                    We may use your contact information to respond to inquiries, provide service-related updates, and communicate about your account, submissions, or orders.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We may also send marketing communications where permitted by applicable law. You can request to stop receiving promotional communications at any time.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <h3 className="text-white font-semibold text-base mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    Security and Fraud Prevention
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We may use information to protect RankPartner.io, our users, publishers, and other parties from fraud, unauthorized access, abuse, and other security threats.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <h3 className="text-white font-semibold text-base mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    Legal and Compliance Purposes
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We may use and disclose information when reasonably necessary to comply with applicable laws, regulations, legal processes, or lawful requests from authorities.
                  </p>
                </div>
              </div>
            </section>

            {/* 04 Sources of Personal Information */}
            <section id="sources" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">04</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Sources of Personal Information</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base mb-6">
                We may collect personal information from the following sources:
              </p>
              
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">Directly From You</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-3">We collect information that you provide when you:</p>
                  <ul className="space-y-1.5 text-slate-300 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400">
                    <li>Contact us;</li>
                    <li>Request platform access;</li>
                    <li>Create or use an account;</li>
                    <li>Submit content;</li>
                    <li>Request a service;</li>
                    <li>Communicate with our team; or</li>
                    <li>Provide information about your agency, business, or publication.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">Automatically From Your Use of Our Website</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We may collect technical and usage information through cookies, server logs, analytics tools, and similar technologies when you visit or interact with our website.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">From Service Providers and Partners</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We may receive limited information from third-party service providers that help us operate our website, platform, communications, analytics, payment processing, security, or other business functions.
                  </p>
                </div>
              </div>
            </section>

            {/* 05 How We Share Personal Information */}
            <section id="how-we-share" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">05</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">How We Share Personal Information</h2>
              </div>
              <p className="text-white font-medium text-sm sm:text-base mb-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                We do not sell your personal information for monetary consideration.
              </p>
              <p className="text-slate-300 text-sm sm:text-base mb-6">
                We may share personal information in the following circumstances:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">Service Providers</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                    We may work with trusted third-party providers that support our business operations, such as hosting providers, payment processors, analytics providers, communication services, security providers, and technical service providers.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    These providers receive only the information reasonably necessary to perform services on our behalf.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">Publishers and Placement Partners</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                    When necessary to fulfill a selected placement or publishing opportunity, we may share relevant information and submitted content with the publisher or placement partner responsible for fulfilling that opportunity.
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We aim to limit the information shared to what is reasonably necessary for the relevant service.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">Legal Requirements</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-2">We may disclose information when we believe disclosure is necessary to:</p>
                  <ul className="space-y-1 text-slate-300 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400">
                    <li>Comply with applicable law;</li>
                    <li>Respond to a lawful request, court order, or legal process;</li>
                    <li>Protect our rights or property;</li>
                    <li>Protect the safety of our users or others;</li>
                    <li>Investigate fraud or abuse; or</li>
                    <li>Enforce our agreements and policies.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">Business Transfers</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    If RankPartner.io is involved in a merger, acquisition, financing, restructuring, sale of assets, or similar business transaction, personal information may be transferred as part of that transaction, subject to applicable law.
                  </p>
                </div>
              </div>
            </section>

            {/* 06 How Long We Keep Personal Information */}
            <section id="retention" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">06</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">How Long We Keep Personal Information</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy.
                </p>
                <p className="font-medium text-white">The length of time we retain information may depend on:</p>
                <ul className="space-y-2 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400">
                  <li>The purpose for which the information was collected;</li>
                  <li>Whether you maintain an account with us;</li>
                  <li>Whether we need the information to provide services;</li>
                  <li>Our legal, accounting, or regulatory obligations;</li>
                  <li>The need to resolve disputes or enforce agreements; and</li>
                  <li>Security and fraud-prevention requirements.</li>
                </ul>
                <p>
                  When personal information is no longer reasonably required, we may delete, anonymize, or securely dispose of it, subject to applicable legal requirements.
                </p>
              </div>
            </section>

            {/* 07 Cookies and Tracking Technologies */}
            <section id="cookies" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">07</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Cookies and Tracking Technologies</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RankPartner.io may use cookies and similar technologies to operate and improve our website and platform.
                </p>
                <p className="font-medium text-white">These technologies may help us:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400">
                  <li>Keep certain website functions working;</li>
                  <li>Remember preferences;</li>
                  <li>Understand website traffic and usage;</li>
                  <li>Analyze performance;</li>
                  <li>Improve user experience;</li>
                  <li>Detect security issues; and</li>
                  <li>Understand how visitors interact with our services.</li>
                </ul>
                <p>
                  Some third-party services used on our website may also place cookies or collect information for analytics, security, advertising, or other purposes.
                </p>
                <p>
                  You can manage cookies through your browser settings. Disabling certain cookies may affect the functionality of parts of our website.
                </p>
              </div>
            </section>

            {/* 08 Managing Your Information Preferences */}
            <section id="preferences" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">08</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Managing Your Information Preferences</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  You may contact us if you want to update or correct personal information you have provided to RankPartner.io.
                </p>
                <p>
                  You may also request to stop receiving promotional communications from us. Service-related communications, such as messages concerning your account, requests, transactions, or security, may still be sent when necessary.
                </p>
                <p>
                  To make a privacy-related request, contact us using the details provided in the <button onClick={() => scrollTo("contact")} className="text-violet-400 underline hover:text-violet-300">Contact Us</button> section below.
                </p>
              </div>
            </section>

            {/* 09 Your Privacy Rights */}
            <section id="privacy-rights" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">09</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Your Privacy Rights</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Depending on where you live and subject to applicable law, you may have certain rights regarding your personal information.
                </p>
                <p className="font-medium text-white">These rights may include the right to:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-violet-400">
                  <li>Request access to personal information we hold about you;</li>
                  <li>Request correction of inaccurate or incomplete information;</li>
                  <li>Request deletion of personal information in certain circumstances;</li>
                  <li>Request restriction of certain processing;</li>
                  <li>Object to certain uses of your personal information;</li>
                  <li>Withdraw consent where processing is based on consent; and</li>
                  <li>Request a copy of certain personal information in a portable format.</li>
                </ul>
                <p>
                  The availability of these rights depends on applicable privacy laws and the circumstances of the request.
                </p>

                <div className="mt-6 p-5 rounded-xl bg-slate-950/60 border border-violet-500/20">
                  <h3 className="text-white font-semibold text-base mb-2">Exercising Your Rights</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-3">
                    To submit a privacy request, contact us at:
                  </p>
                  <a
                    href="mailto:Hello@rankpartner.io"
                    className="inline-flex items-center gap-2 text-violet-300 font-semibold text-sm hover:text-white transition-colors bg-violet-500/10 border border-violet-500/30 px-3.5 py-1.5 rounded-lg mb-3"
                  >
                    <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Hello@rankpartner.io
                  </a>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    We may need to verify your identity before completing certain requests. We will respond within the timeframe required by applicable law.
                  </p>
                </div>
              </div>
            </section>

            {/* 10 Security */}
            <section id="security" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">10</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Security</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We take reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.
                </p>
                <p>
                  However, no website, online platform, or method of transmitting information over the Internet can be guaranteed to be completely secure.
                </p>
                <p>
                  You should take appropriate steps to protect your account credentials and avoid sharing login information with unauthorized individuals.
                </p>
              </div>
            </section>

            {/* 11 Third-Party Links */}
            <section id="third-party" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">11</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Third-Party Links</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Our website or platform may contain links to websites, services, or platforms operated by third parties.
                </p>
                <p>
                  RankPartner.io does not control those third-party websites or their privacy practices. Visiting a third-party website is subject to that website's own terms and privacy policy.
                </p>
                <p>
                  We recommend reviewing the privacy policy of any third-party website before providing personal information.
                </p>
              </div>
            </section>

            {/* 12 Children's Privacy */}
            <section id="children" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">12</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Children's Privacy</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RankPartner.io is intended for business users and is not directed toward children.
                </p>
                <p>
                  We do not knowingly collect personal information from children in violation of applicable law. If you believe that a child has provided personal information to us, please contact us at{" "}
                  <a href="mailto:Hello@rankpartner.io" className="text-violet-400 underline hover:text-violet-300 font-medium">
                    Hello@rankpartner.io
                  </a>{" "}
                  so we can review the request and take appropriate action.
                </p>
              </div>
            </section>

            {/* 13 International Data Processing */}
            <section id="international" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">13</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">International Data Processing</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  RankPartner.io may use service providers and infrastructure located in countries other than the country where you live.
                </p>
                <p>
                  As a result, your personal information may be transferred to, stored in, or processed in other jurisdictions. Where required by applicable law, we will take appropriate measures for international transfers of personal information.
                </p>
              </div>
            </section>

            {/* 14 Privacy Policy Changes */}
            <section id="changes" className="scroll-mt-28 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-lg">14</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Privacy Policy Changes</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes to our services, business practices, technology, or legal requirements.
                </p>
                <p>
                  When we make changes, we will update the Revised date at the top of this Privacy Policy. We encourage you to review this page periodically to stay informed about how we handle personal information.
                </p>
                <p>
                  Your continued use of our website or services after an updated Privacy Policy becomes effective constitutes acknowledgment of the updated policy, to the extent permitted by applicable law.
                </p>
              </div>
            </section>

            {/* 15 Contact Us */}
            <section id="contact" className="scroll-mt-28 bg-gradient-to-br from-violet-950/40 via-slate-900/60 to-slate-950 border border-violet-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-white bg-violet-600 px-3 py-1 rounded-lg">15</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Contact Us</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or how RankPartner.io handles personal information, please contact us:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Email</span>
                    <a href="mailto:Hello@rankpartner.io" className="text-violet-300 hover:text-white font-semibold text-sm sm:text-base transition-colors">
                      Hello@rankpartner.io
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Website</span>
                    <Link href="/" className="text-violet-300 hover:text-white font-semibold text-sm sm:text-base transition-colors">
                      RankPartner.io
                    </Link>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed italic border-t border-slate-800/80 pt-4">
                We will review and respond to privacy-related inquiries in accordance with applicable law.
              </p>
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

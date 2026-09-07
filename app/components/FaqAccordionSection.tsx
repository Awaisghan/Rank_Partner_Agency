"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  FileText,
  Link2,
  Building2,
  BookOpen,
  Rocket,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqData = [
  {
    id: "the-basics",
    category: "The basics",
    subtitle: "What RankPartner.io is and how its white-label platform works.",
    icon: Sparkles,
    count: 4,
    questions: [
      {
        q: "What does RankPartner.io do?",
        a: "RankPartner.io is a white-label platform that helps agencies access press placements, authority backlinks, and TV interview opportunities for their clients. Agencies manage the client relationship while RankPartner.io provides access to publishing opportunities and handles the placement review and publication process.",
      },
      {
        q: "What does white-label actually mean here?",
        a: "It means you can offer RankPartner.io’s press placements, authority backlinks, and TV interview opportunities under your own agency brand. You manage the client relationship and pricing, while RankPartner.io provides the platform and handles the placement process behind the scenes.",
      },
      {
        q: "Who uses RankPartner.io?",
        a: "RankPartner.io is built for marketing, PR, and SEO agencies that want to offer quality press placements, authority backlinks, and media opportunities without managing every part of the fulfillment process in-house. We also work with publishers looking to connect their available publishing opportunities with agencies.",
      },
      {
        q: "How is this different from a typical PR or link-building vendor?",
        a: "RankPartner.io brings press placements, authority backlinks, and TV interview opportunities together in one platform built for agencies. You can review opportunities, compare key details and pricing, and choose the placements that fit your clients’ goals—all while managing the client relationship under your own brand.",
      },
    ],
  },
  {
    id: "press-coverage",
    category: "Press placements & coverage",
    shortName: "Press & coverage",
    subtitle: "Placements, timelines, and everything you need to know about getting published.",
    icon: FileText,
    count: 4,
    questions: [
      {
        q: "What kinds of placements can you get?",
        a: "RankPartner.io offers press placements across news, business, lifestyle, and industry-focused publications, along with TV and streaming interview opportunities. Browse available opportunities and choose the placements that best fit your client’s goals.",
      },
      {
        q: "Are placements guaranteed?",
        a: "Each placement has its own requirements, availability, and publishing process. We provide the relevant details upfront so you can understand what to expect before submitting your order.",
      },
      {
        q: "How long do placements take?",
        a: "Turnaround times vary by publication and placement. Review the estimated timeline for each opportunity before ordering, so you can choose an option that fits your client’s schedule.",
      },
      {
        q: "Do the placements stay live?",
        a: "Published content is intended to remain available on the selected publication, but ongoing availability ultimately depends on the publisher’s policies and decisions. RankPartner.io does not guarantee how long a publication will keep an article or backlink live.",
      },
    ],
  },
  {
    id: "backlinks-seo",
    category: "Authority backlinks & SEO",
    shortName: "Backlinks & SEO",
    subtitle: "How backlinks support authority, visibility, and long-term SEO growth.",
    icon: Link2,
    count: 4,
    questions: [
      {
        q: "What are authority backlinks?",
        a: "Authority backlinks are links from reputable publications that point to your client’s website. When placed within relevant published content, these links can strengthen the site’s backlink profile and support its overall SEO strategy.",
      },
      {
        q: "Will this hurt my client's SEO?",
        a: "RankPartner.io provides placements on established publications with publisher and SEO metrics you can review before ordering. As with any SEO activity, results depend on the quality, relevance, and overall context of the backlink—not simply the domain’s authority metrics.",
      },
      {
        q: "Can I check a domain's authority before we start?",
        a: "Yes. You can review key publisher and SEO metrics available on RankPartner.io, including metrics such as Domain Rating, referring domains, and organic traffic, before choosing a placement.",
      },
      {
        q: "How does PR connect to SEO with RankPartner.io?",
        a: "Press coverage can build credibility and visibility, while a relevant backlink within published content can support your client’s SEO strategy. With RankPartner.io, agencies can access both press placements and authority backlinks through one platform.",
      },
    ],
  },
  {
    id: "for-agencies",
    category: "For agencies",
    shortName: "For agencies",
    subtitle: "Reselling, branding, and pricing made simple.",
    icon: Building2,
    count: 3,
    questions: [
      {
        q: "Can I really resell this under my own brand?",
        a: "Yes. RankPartner.io is built for agencies that want to offer press placements, authority backlinks, and TV interview opportunities under their own brand. You manage the client relationship and pricing while using RankPartner.io to access and fulfill selected opportunities.",
      },
      {
        q: "Do I need my own PR or SEO team to use RankPartner.io?",
        a: "No. RankPartner.io gives agencies access to publishing opportunities without requiring them to manage every part of the placement process themselves. You can focus on your clients while RankPartner.io handles the review and publication process for selected placements.",
      },
      {
        q: "How is pricing structured?",
        a: "Pricing is based on the individual placement you choose. You can review the price and key details for each opportunity before submitting an order, making it easier to manage your costs and set your own client pricing.",
      },
    ],
  },
  {
    id: "for-publishers",
    category: "For publishers",
    shortName: "For publishers",
    subtitle: "Connect your publishing inventory with agencies looking for quality placement opportunities.",
    icon: BookOpen,
    count: 2,
    questions: [
      {
        q: "I run a publication. How do I work with RankPartner.io?",
        a: "RankPartner.io helps publishers connect their available publishing opportunities with agencies looking for quality placements. Share your publication details, available opportunities, requirements, and pricing so agencies can review and choose placements that fit their clients.",
      },
      {
        q: "Do I have to approve each piece or manage a queue?",
        a: "Yes. Publishers remain responsible for reviewing submitted content and ensuring it meets their publication’s editorial standards and requirements. Once the content is approved, you can publish it according to the agreed placement terms.",
      },
    ],
  },
  {
    id: "getting-started",
    category: "Getting started",
    shortName: "Getting started",
    subtitle: "First steps and how to access RankPartner.io.",
    icon: Rocket,
    count: 2,
    questions: [
      {
        q: "How do I get started?",
        a: "Contact us through our contact form and tell us about your agency, publication, or the services you’re interested in. We’ll provide the next steps and help you get access to RankPartner.io.",
      },
      {
        q: "Can I try something for free first?",
        a: "You can explore the SEO and publisher metrics available on RankPartner.io before choosing a placement. Review the available information and compare opportunities to find the options that best fit your needs.",
      },
    ],
  },
];

export default function FaqAccordionSection() {
  const [activeCategory, setActiveCategory] = useState("the-basics");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    "the-basics-0"
  );

  // Scroll Spy to track active topic category on left sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (const group of faqData) {
        const element = document.getElementById(group.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(group.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleQuestion = (id: string) => {
    setOpenQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#fcfdfe] py-12 sm:py-24 relative z-10 font-sans border-t border-slate-200/60">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Sticky BROWSE TOPICS Sidebar (4 cols) */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 self-start h-fit pr-4 z-20">
            {/* Tagline Header */}
            <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-[11px] block mb-4">
              BROWSE TOPICS
            </span>

            {/* Navigation Topics List */}
            <nav className="space-y-1.5 mb-8">
              {faqData.map((group) => {
                const Icon = group.icon;
                const isActive = activeCategory === group.id;

                return (
                  <button
                    key={group.id}
                    onClick={() => {
                      setActiveCategory(group.id);
                      const el = document.getElementById(group.id);
                      if (el) {
                        const y =
                          el.getBoundingClientRect().top +
                          window.pageYOffset -
                          110;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#edf4ff] border border-violet-200/80 text-[#6d28d9] font-bold shadow-sm"
                        : "bg-transparent text-slate-700 font-semibold hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-white text-[#6d28d9] shadow-xs"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{group.shortName || group.category}</span>
                    </div>

                    <span
                      className={`text-xs font-bold ${
                        isActive ? "text-[#6d28d9]" : "text-slate-400"
                      }`}
                    >
                      {group.count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Bottom Sticky Card: Still Not Sure? */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-violet-50 text-[#6d28d9] border border-violet-100 flex items-center justify-center mb-3">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                Still not sure?
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed font-normal mb-3">
                Tell us about your agency or publication, and we’ll help you find the right way to get started with RankPartner.io.
              </p>
              <Link
                href="/#get-in-touch"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6d28d9] hover:text-[#6d28d9] transition-colors"
              >
                <span>Contact us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Right Column: Topic Groups & Expandable Accordion Rows (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {faqData.map((group) => {
              const GroupIcon = group.icon;

              return (
                <div key={group.id} id={group.id} className="scroll-mt-28">
                  
                  {/* Group Header */}
                  <ScrollReveal>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#6d28d9] border border-violet-100 flex items-center justify-center shrink-0">
                        <GroupIcon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                          {group.category}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 font-normal">
                          {group.subtitle}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Accordion Group Container Card */}
                  <ScrollReveal delay={100}>
                    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
                      {group.questions.map((item, qIdx) => {
                        const questionId = `${group.id}-${qIdx}`;
                        const isOpen = openQuestion === questionId;

                        return (
                          <div
                            key={qIdx}
                            className="transition-colors duration-200"
                          >
                            {/* Accordion Button */}
                            <button
                              onClick={() => toggleQuestion(questionId)}
                              className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer outline-none group"
                            >
                              <span
                                className={`font-bold text-sm sm:text-lg transition-colors leading-snug ${
                                  isOpen
                                    ? "text-[#6d28d9]"
                                    : "text-slate-900 group-hover:text-[#6d28d9]"
                                }`}
                              >
                                {item.q}
                              </span>

                              {/* Toggle Circle Icon */}
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                                  isOpen
                                    ? "bg-[#6d28d9] text-white shadow-sm"
                                    : "border border-slate-200/90 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"
                                }`}
                              >
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 stroke-[2]" />
                                )}
                              </div>
                            </button>

                            {/* Answer Text */}
                            {isOpen && (
                              <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0 text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
                                <p>{item.a}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </ScrollReveal>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

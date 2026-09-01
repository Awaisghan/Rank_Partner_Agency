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
    subtitle: "What Ascend is and how white-label works.",
    icon: Sparkles,
    count: 4,
    questions: [
      {
        q: "What does Ascend do?",
        a: "Ascend is a behind-the-scenes partner for PR and SEO. Agencies use our platform to produce great press coverage and improve search rankings for their clients, then present that work as their own. While you handle the client relationship, we take care of the heavy lifting, such as securing media spots and building high-quality backlinks.",
      },
      {
        q: "What does white-label actually mean here?",
        a: "Everything is white-labeled under your brand. You pitch and bill your clients under your own agency name, while our team handles content production, editorial coordination, and placement delivery with zero Ascend branding.",
      },
      {
        q: "Who uses Ascend?",
        a: "Digital marketing agencies, SEO consultancies, PR firms, executive branding specialists, and online publishers use Ascend to deliver tier-1 media placements and authority backlinks to their clients.",
      },
      {
        q: "How is this different from a typical PR or link-building vendor?",
        a: "Unlike traditional PR agencies that charge massive monthly retainers without guaranteed outcomes, Ascend offers flat-rate, guaranteed placements across vetted media outlets with zero minimum commitments.",
      },
    ],
  },
  {
    id: "press-coverage",
    category: "Press placements & coverage",
    shortName: "Press & coverage",
    subtitle: "Placements, timelines, and what stays live.",
    icon: FileText,
    count: 4,
    questions: [
      {
        q: "What kinds of placements can you get?",
        a: "Our network includes major national news outlets, tier-1 tech publications, finance journals, lifestyle magazines, and high-authority niche blogs across 50+ industries.",
      },
      {
        q: "Who writes the content for the placements?",
        a: "Our in-house team of professional journalists and editors writes brand-safe, publication-ready articles. Alternatively, you can submit pre-written drafts for editorial review.",
      },
      {
        q: "Do we get to approve content before it goes live?",
        a: "Yes. You have full first right of refusal. Content is submitted to your workspace for review and approval before being sent to the publisher.",
      },
      {
        q: "How long does a press placement take to go live?",
        a: "Turnaround times vary by publication but typically range between 3 to 10 business days from content approval.",
      },
    ],
  },
  {
    id: "backlinks-seo",
    category: "Backlinks & SEO authority",
    shortName: "Backlinks & SEO",
    subtitle: "Link attributes, DR impact, and indexation.",
    icon: Link2,
    count: 4,
    questions: [
      {
        q: "Are the backlinks dofollow or nofollow?",
        a: "Placement details explicitly list the link attribute (dofollow or nofollow) for each outlet before you order. Both link types deliver significant organic search authority and trust signals.",
      },
      {
        q: "How do authority placements impact domain metrics?",
        a: "High-tier press backlinks improve domain trust, brand entity recognition, and organic rankings by passing strong editorial link equity to your target pages.",
      },
      {
        q: "Can we choose the anchor text and target URL?",
        a: "Yes. You specify the target URL and preferred anchor text when submitting order assets.",
      },
      {
        q: "Will the published articles stay online permanently?",
        a: "Yes. Placements are permanent editorial articles published on the media outlet's live domain.",
      },
    ],
  },
  {
    id: "for-agencies",
    category: "For agencies",
    shortName: "For agencies",
    subtitle: "Reselling, client reporting, and team access.",
    icon: Building2,
    count: 3,
    questions: [
      {
        q: "How do agencies resell Ascend placements to clients?",
        a: "Agencies markup placement prices and bundle them into PR packages, SEO retainers, or executive branding programs under their own agency branding.",
      },
      {
        q: "Do you provide white-label client reports?",
        a: "Yes. Once an article goes live, you receive a clean reporting link featuring placement metrics, publication badges, and live URLs that you can present directly to clients.",
      },
      {
        q: "Is there multi-user access for agency teams?",
        a: "Yes. Agency accounts support team seats and client organization folders to manage campaign assets efficiently.",
      },
    ],
  },
  {
    id: "for-publishers",
    category: "For publishers",
    shortName: "For publishers",
    subtitle: "Monetizing inventory and editorial guidelines.",
    icon: BookOpen,
    count: 2,
    questions: [
      {
        q: "How does Ascend monetize publisher inventory?",
        a: "We buy unused ad and sponsored content inventory outright from publishers, bringing steady, high-margin revenue without sales overhead.",
      },
      {
        q: "How do you ensure content meets editorial standards?",
        a: "All content undergoes rigorous editorial quality control to match publication voice, brand guidelines, and legal compliance before submission.",
      },
    ],
  },
  {
    id: "getting-started",
    category: "Getting started",
    shortName: "Getting started",
    subtitle: "Account setup, billing, and first orders.",
    icon: Rocket,
    count: 2,
    questions: [
      {
        q: "How do I sign up for an agency or publisher account?",
        a: "Click 'Agency login' or 'Contact us' to create your account instantly with zero onboarding calls required.",
      },
      {
        q: "How quickly can we place our first order?",
        a: "Immediately upon account creation. Browse publication metrics, select outlets, upload your brief, and checkout in minutes.",
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
    <section className="w-full bg-[#fcfdfe] py-16 sm:py-24 relative z-10 font-sans border-t border-slate-200/60">
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky BROWSE TOPICS Sidebar (4 cols) */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 self-start h-fit pr-4 z-20">
            {/* Tagline Header */}
            <span className="font-bold tracking-[0.2em] text-[#3b82f6] uppercase text-[11px] block mb-4">
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
                        ? "bg-[#edf4ff] border border-blue-200/80 text-[#3b82f6] font-bold shadow-sm"
                        : "bg-transparent text-slate-700 font-semibold hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-white text-[#3b82f6] shadow-xs"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{group.shortName || group.category}</span>
                    </div>

                    <span
                      className={`text-xs font-bold ${
                        isActive ? "text-[#3b82f6]" : "text-slate-400"
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
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3b82f6] border border-blue-100 flex items-center justify-center mb-3">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                Still not sure?
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed font-normal mb-3">
                Tell us about your agency or publication and we will point you in the right direction.
              </p>
              <Link
                href="/#get-in-touch"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b82f6] hover:text-blue-700 transition-colors"
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
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3b82f6] border border-blue-100 flex items-center justify-center shrink-0">
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
                              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer outline-none group"
                            >
                              <span
                                className={`font-bold text-base sm:text-lg transition-colors ${
                                  isOpen
                                    ? "text-[#3b82f6]"
                                    : "text-slate-900 group-hover:text-[#3b82f6]"
                                }`}
                              >
                                {item.q}
                              </span>

                              {/* Toggle Circle Icon */}
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                                  isOpen
                                    ? "bg-[#3b82f6] text-white shadow-sm"
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
                              <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
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

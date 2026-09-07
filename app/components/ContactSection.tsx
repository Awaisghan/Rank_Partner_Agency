"use client";

import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { CheckCircle2, ArrowRight, ArrowLeft, Pencil, Check } from "lucide-react";

export default function ContactSection() {
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceNeeded: "PR placements", // default selected pill
    goals: "",
  });

  const serviceOptions = [
    "PR placements",
    "SEO backlinks",
    "Both",
    "Agency reselling",
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 1) {
      if (!formData.name || !formData.email) return;
      setFormStep(2);
    } else if (formStep === 2) {
      setFormStep(3);
    } else if (formStep === 3) {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (formStep > 1) {
      setFormStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  return (
    <section id="get-in-touch" className="w-full bg-white py-12 px-4 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-[1550px] mx-auto">
        
        {/* Full-Width Dark Navy Card Container with Large Rounded Corners */}
        <div
          className="rounded-[2.5rem] p-5 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-800/80"
          style={{
            background: "linear-gradient(145deg, #050d21 0%, #081635 60%, #040a1b 100%)",
          }}
        >
          {/* Background Ambient Glow */}
          <div className="absolute -bottom-20 left-10 w-[600px] h-[400px] bg-violet-700/10 blur-[170px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* ========================================================================= */}
            {/* LEFT COLUMN: TEXT & TRUST SIGNALS (lg:col-span-6)                         */}
            {/* ========================================================================= */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
              
              <div className="space-y-6">
                {/* Tagline Badge */}
                <ScrollReveal>
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-[2px] bg-[#f59e0b] rounded-full" />
                    <span className="text-xs font-bold tracking-[0.2em] text-[#f59e0b] uppercase">
                      GET IN TOUCH
                    </span>
                  </div>
                </ScrollReveal>

                {/* Main Headline */}
                <ScrollReveal delay={150}>
                  <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white tracking-tight leading-[1.08]">
                    Ready to grow your <br />
                    publishing{" "}
                    <span className="italic font-serif font-normal text-[#f59e0b]">
                      opportunities?
                    </span>
                  </h2>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay={250}>
                  <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed max-w-lg">
                    Tell us about your agency and the clients you work with. We&apos;ll help you get access to RankPartner.io and explore press placements and authority backlinks for your clients.
                  </p>
                </ScrollReveal>

                {/* Green Checkmarks List */}
                <ScrollReveal delay={350}>
                  <div className="flex flex-col gap-3.5 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          Fully white-label
                        </span>
                        <span className="text-xs text-slate-300 font-normal">
                          Deliver placements under your own brand.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          Simple pricing
                        </span>
                        <span className="text-xs text-slate-300 font-normal">
                          Pay per placement with clear pricing upfront.
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Divider Line */}
                <div className="pt-2 border-t border-slate-800/80 max-w-md">
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    A real person reviews every inquiry.{" "}
                    <span className="text-white font-semibold">
                      Our team will get back to you as soon as possible.
                    </span>
                  </p>
                </div>
              </div>

              {/* Bottom Publications Bar */}
              <ScrollReveal delay={450}>
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-3">
                    PLACEMENTS IN
                  </span>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400 font-serif text-sm sm:text-lg font-bold">
                    <span>TIME</span>
                    <span>Forbes</span>
                    <span className="font-sans font-black tracking-tight text-sm">CNBC</span>
                    <span>Bloomberg</span>
                    <span className="font-sans text-xs font-bold tracking-wider">USA TODAY</span>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: MULTI-STEP WHITE FORM CARD (Exact Screenshots Match!)        */}
            {/* ========================================================================= */}
            <div className="lg:col-span-6">
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-[2rem] p-5 sm:p-10 text-slate-900 shadow-2xl border border-slate-100 relative min-h-[400px] lg:min-h-[480px] flex flex-col justify-between">
                  
                  {isSubmitted ? (
                    /* Submission Success Screen */
                    <div className="my-auto flex flex-col items-center text-center space-y-4 py-8">
                      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Thank you, {formData.name || "there"}!</h3>
                      <p className="text-slate-500 text-sm max-w-sm">
                        Your request has been received. Our team will contact you at{" "}
                        <span className="font-semibold text-slate-800">{formData.email}</span> as soon as possible.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormStep(1);
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                      >
                        Submit another response
                      </button>
                    </div>
                  ) : (
                    /* Multi-Step Form */
                    <form onSubmit={handleNext} className="flex flex-col justify-between h-full space-y-6">
                      
                      <div className="space-y-6">
                        {/* Form Top Header */}
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
                            Let&apos;s get you started.
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm font-normal">
                            Get started with RankPartner.io in three simple steps.
                          </p>
                        </div>

                        {/* Step Progress Indicator Bar (Exact Screenshot Style) */}
                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
                            STEP {formStep} OF 3 /{" "}
                            <span className="text-slate-900 font-extrabold">
                              {formStep === 1
                                ? "ABOUT YOU"
                                : formStep === 2
                                ? "WHAT YOU NEED"
                                : "SEND IT"}
                            </span>
                          </div>

                          {/* 3 Segment Progress Bars */}
                          <div className="grid grid-cols-3 gap-2">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                formStep === 1
                                  ? "bg-[#6d28d9]"
                                  : formStep > 1
                                  ? "bg-[#0b1b3d]"
                                  : "bg-slate-200"
                              }`}
                            />
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                formStep === 2
                                  ? "bg-[#6d28d9]"
                                  : formStep > 2
                                  ? "bg-[#0b1b3d]"
                                  : "bg-slate-200"
                              }`}
                            />
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                formStep === 3 ? "bg-[#6d28d9]" : "bg-slate-200"
                              }`}
                            />
                          </div>
                        </div>

                        {/* STEP 1: ABOUT YOU */}
                        {formStep === 1 && (
                          <div className="space-y-4 pt-1">
                            <h4 className="text-base sm:text-lg font-bold text-slate-900">About you.</h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                required
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-700/30 focus:border-violet-700 transition-all"
                              />
                              <input
                                type="email"
                                required
                                placeholder="Work email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-700/30 focus:border-violet-700 transition-all"
                              />
                            </div>

                            <input
                              type="text"
                              placeholder="Company or website (optional)"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-700/30 focus:border-violet-700 transition-all"
                            />
                          </div>
                        )}

                        {/* STEP 2: WHAT YOU NEED (Exact Screenshot 2 Match!) */}
                        {formStep === 2 && (
                          <div className="space-y-4 pt-1">
                            <h4 className="text-base sm:text-lg font-bold text-slate-900">What do you need?</h4>

                            {/* 2x2 Choice Pills */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {serviceOptions.map((opt) => {
                                const isSelected = formData.serviceNeeded === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, serviceNeeded: opt })}
                                    className={`w-full py-4 px-5 rounded-2xl text-left text-sm font-semibold transition-all duration-200 border ${
                                      isSelected
                                        ? "bg-white border-violet-700 text-slate-900 ring-2 ring-violet-700/20 shadow-sm"
                                        : "bg-[#f8fafc] border-slate-200/80 text-slate-700 hover:bg-slate-100/80"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* STEP 3: SEND IT / ALMOST DONE (Exact Screenshot 1 Match!) */}
                        {formStep === 3 && (
                          <div className="space-y-4 pt-1">
                            <h4 className="text-base sm:text-lg font-bold text-slate-900">Almost done.</h4>

                            {/* Editable Summary Badges */}
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setFormStep(1)}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f8fafc] border border-slate-200/90 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                <span className="truncate max-w-[200px]">
                                  {formData.name || "Name"} · {formData.email || "Email"}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setFormStep(2)}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f8fafc] border border-slate-200/90 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                <span>{formData.serviceNeeded}</span>
                              </button>
                            </div>

                            {/* Optional Goals Textarea */}
                            <textarea
                              rows={4}
                              placeholder="Tell us about your goals (optional)"
                              value={formData.goals}
                              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-700/30 focus:border-violet-700 transition-all resize-none"
                            />
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Bar (Back Button + Light Green Action Button) */}
                      <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-3">
                          {formStep > 1 && (
                            <button
                              type="button"
                              onClick={handleBack}
                              className="px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <ArrowLeft className="w-4 h-4 text-slate-600" />
                              <span>Back</span>
                            </button>
                          )}

                          <button
                            type="submit"
                            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-[#062c19] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all duration-200"
                          >
                            <span>{formStep === 3 ? "Plan my ascent" : "Next"}</span>
                            <ArrowRight className="w-4 h-4 text-[#062c19]" />
                          </button>
                        </div>

                        {formStep === 3 && (
                          <p className="text-center text-[11px] text-slate-400 font-normal">
                            By submitting you agree to be contacted about Ascend&apos;s services.
                          </p>
                        )}
                      </div>

                    </form>
                  )}

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

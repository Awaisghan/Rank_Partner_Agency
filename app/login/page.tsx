"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/pricing");
    }, 400);
  };

  return (
    <main className="min-h-screen w-full bg-[#edf1f5] flex flex-col justify-center items-center p-6 font-sans text-slate-900">
      
      {/* Centered Login Card Container */}
      <div className="w-full max-w-[370px]">
        
        {/* Brand Logo Header */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-slate-950"
              >
                <path
                  d="M16 3L3 29H10.5L16 17.5L21.5 29H29L16 3Z"
                  fill="currentColor"
                />
                <path
                  d="M16 12.5L12 20.5H20L16 12.5Z"
                  fill="#edf1f5"
                />
              </svg>
            </div>
            <div className="flex items-center font-sans tracking-tight">
              <span className="font-black text-xl tracking-wider text-slate-950">
                RANK_
              </span>
              <span className="font-bold text-xl tracking-wider text-slate-800">
                PARTNER
              </span>
            </div>
          </Link>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL Input */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-slate-800 uppercase mb-1.5">
              EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 shadow-xs transition-all"
            />
          </div>

          {/* PASSWORD Input */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-slate-800 uppercase mb-1.5 pt-1">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 shadow-xs transition-all"
            />
          </div>

          {/* Submit Red Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e63939] hover:bg-[#d62828] active:scale-[0.99] text-white font-extrabold text-sm py-3 rounded-md mt-6 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Continue"}
          </button>
        </form>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

      </div>

    </main>
  );
}

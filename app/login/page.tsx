"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Redirect based on role
      if (data.user?.role === "ADMIN") {
        router.push("/admin/publications");
      } else {
        router.push("/pricing");
      }
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#edf1f5] flex flex-col justify-center items-center p-6 font-sans text-slate-900">
      
      {/* Centered Login Card Container */}
      <div className="w-full max-w-[370px]">
        
        {/* Brand Logo Header */}
        <div className="flex items-center justify-center mb-10">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo-cropped.png"
              alt="RankPartner.io Logo"
              className="h-10 w-auto object-contain brightness-0"
            />
          </Link>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-950 hover:bg-slate-900 active:scale-[0.99] text-white font-extrabold text-sm py-3 rounded-md mt-6 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-70"
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

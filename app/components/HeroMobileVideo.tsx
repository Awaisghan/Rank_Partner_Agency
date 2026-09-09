"use client";

import React, { useEffect, useRef } from "react";

export default function HeroMobileVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted and inline playback for mobile browsers (iOS & Android)
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.setAttribute("playsinline", "true");
      videoRef.current.setAttribute("webkit-playsinline", "true");

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay playback error:", err);
        });
      }
    }
  }, []);

  return (
    <div className="block lg:hidden w-full max-w-[480px] relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-auto object-cover mix-blend-screen opacity-95 [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)] scale-105"
      >
        <source src="/mobile-hero-video.mp4" type="video/mp4" />
        <source src="/Screen Recording 2026-09-09 at 12.09.26 AM.webm" type="video/webm" />
      </video>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 24,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const getTranslate = () => {
    if (direction === "up") return `translateY(${distance}px)`;
    if (direction === "down") return `translateY(-${distance}px)`;
    if (direction === "left") return `translateX(${distance}px)`;
    if (direction === "right") return `translateX(-${distance}px)`;
    return "none";
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px 150px 0px" } // Positive margin triggers animation BEFORE element enters viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{
        "--sr-opacity": visible ? 1 : 0,
        "--sr-transform": visible ? "translate(0,0)" : getTranslate(),
        "--sr-transition": `opacity 0.45s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

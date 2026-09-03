"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"fadeIn" | "fadeOut">("fadeIn");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Skip fade transition for admin routes to prevent black flash
    if (pathname.startsWith("/admin")) {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
      prevPathname.current = pathname;
      return;
    }

    if (prevPathname.current !== pathname) {
      // Start fade out
      setTransitionStage("fadeOut");

      const timer = setTimeout(() => {
        // Swap content and fade back in
        setDisplayChildren(children);
        setTransitionStage("fadeIn");
        prevPathname.current = pathname;
      }, 220); // matches fade-out duration

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  if (pathname.startsWith("/admin")) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100%" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      data-stage={transitionStage}
      style={{
        opacity: transitionStage === "fadeIn" ? 1 : 0,
        transform: transitionStage === "fadeIn" ? "translateY(0px)" : "translateY(8px)",
        transition: transitionStage === "fadeIn"
          ? "opacity 0.35s ease, transform 0.35s ease"
          : "opacity 0.2s ease, transform 0.2s ease",
        willChange: "opacity, transform",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      {displayChildren}
    </div>
  );
}

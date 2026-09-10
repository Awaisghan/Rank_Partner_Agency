import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import SWRProvider from "./components/SWRProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rankpartner.com"),
  title: {
    template: "%s | Rank Partner",
    default: "Rank Partner | Get Featured. Build Authority. Rank Higher",
  },
  description: "Rank Partner is an award-winning PR and SEO agency specializing in guaranteed press placements, authority backlinks, and high-tier media mentions.",
  keywords: ["PR Agency", "SEO Agency", "Press Placements", "Authority Backlinks", "Digital PR", "Rank Partner", "Forbes Placement", "Guaranteed PR"],
  openGraph: {
    title: "Rank Partner | Premium PR & SEO Agency",
    description: "Guaranteed press placements and high-authority backlinks to scale your brand.",
    url: "https://rankpartner.com",
    siteName: "Rank Partner",
    images: [
      {
        url: "/og-image.jpg", // Add an actual image to the public folder later
        width: 1200,
        height: 630,
        alt: "Rank Partner Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rank Partner | Premium PR & SEO",
    description: "Guaranteed press placements and high-authority backlinks to scale your brand.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050b1e] text-white" suppressHydrationWarning>
        <SWRProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </SWRProvider>
      </body>
    </html>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Footer from "../../components/Footer";
import { ChevronRight, FileText, Search, CheckCircle2, Tv } from "lucide-react";
import { getArticleBySlug } from "../../data/blogArticles";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function parseContentToSections(content: string) {
  if (!content) return [];
  const lines = content.split("\n");
  const sections: { id: string; heading: string; paragraphs: string[] }[] = [];
  let currentSection = {
    id: "overview",
    heading: "Overview",
    paragraphs: [] as string[],
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      if (currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
      }
      const headingText = trimmed.replace(/^#{2,3}\s+/, "");
      const sectionId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      currentSection = {
        id: sectionId || `sec-${sections.length + 1}`,
        heading: headingText,
        paragraphs: [],
      };
    } else {
      currentSection.paragraphs.push(trimmed);
    }
  }

  if (currentSection.paragraphs.length > 0) {
    sections.push(currentSection);
  }

  return sections.length > 0
    ? sections
    : [{ id: "main-article", heading: "Article Content", paragraphs: [content] }];
}

function formatInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic text-slate-800">
          {part.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const fullUrl = linkMatch[2];

      const urlParts = fullUrl.split("|");
      let cleanUrl = urlParts[0].trim();

      const hasAllowedScheme =
        cleanUrl.startsWith("http://") ||
        cleanUrl.startsWith("https://") ||
        cleanUrl.startsWith("/") ||
        cleanUrl.startsWith("#") ||
        cleanUrl.startsWith("mailto:");

      const hasUnsafeScheme = /^[a-z][a-z0-9+.-]*:/i.test(cleanUrl);

      if (hasUnsafeScheme && !hasAllowedScheme) {
        return null;
      }

      if (!hasAllowedScheme && (cleanUrl.startsWith("www.") || cleanUrl.includes("."))) {
        cleanUrl = `https://${cleanUrl}`;
      }

      const isNoFollow = fullUrl.includes("|nofollow");
      const isForceBlank = fullUrl.includes("|blank");
      const isForceSelf = fullUrl.includes("|self");
      const isExternal = cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://");

      const openInNewTab = isForceBlank || (isExternal && !isForceSelf);

      let relAttribute: string | undefined = undefined;
      if (isNoFollow) {
        relAttribute = openInNewTab ? "nofollow noopener noreferrer" : "nofollow";
      } else if (openInNewTab) {
        relAttribute = "noopener noreferrer";
      }

      if (openInNewTab || isNoFollow || isExternal) {
        return (
          <a
            key={idx}
            href={cleanUrl}
            target={openInNewTab ? "_blank" : undefined}
            rel={relAttribute}
            className="text-[#6d28d9] font-bold underline hover:text-[#5b21b6] transition-colors"
          >
            {linkText}
          </a>
        );
      }

      return (
        <Link
          key={idx}
          href={cleanUrl}
          className="text-[#6d28d9] font-bold underline hover:text-[#5b21b6] transition-colors"
        >
          {linkText}
        </Link>
      );
    }
    return part;
  });
}

function renderParagraphText(text: string) {
  // Check for Markdown Image format: ![alt](url)
  const imgMatch = text.match(/^!\[(.*?)\]\((.*?)\)$/);
  if (imgMatch) {
    const rawAlt = imgMatch[1] ? imgMatch[1].trim() : "";
    const src = imgMatch[2];
    const showCaption = Boolean(
      rawAlt &&
      rawAlt !== "image" &&
      rawAlt !== "Blog image" &&
      !rawAlt.includes(".") &&
      !rawAlt.startsWith("img_")
    );

    return (
      <figure className="my-8 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-900/5 p-1.5 flex flex-col items-center">
        <img
          src={src}
          alt={rawAlt || "Blog content image"}
          className="w-full h-auto max-h-[650px] object-contain rounded-xl"
        />
        {showCaption && (
          <figcaption className="text-center text-xs text-slate-500 py-2.5 px-4 italic border-t border-slate-100 bg-white font-medium w-full mt-1.5 rounded-b-xl">
            {rawAlt}
          </figcaption>
        )}
      </figure>
    );
  }

  if (text.startsWith("- ") || text.startsWith("* ")) {
    const items = text.split("\n").filter(Boolean);
    return (
      <ul className="list-disc pl-5 my-3 space-y-1.5 text-slate-700">
        {items.map((item, i) => (
          <li key={i}>{formatInlineMarkdown(item.replace(/^[-*]\s+/, ""))}</li>
        ))}
      </ul>
    );
  }
  if (text.startsWith("> ")) {
    return (
      <blockquote className="my-4 border-l-4 border-[#6d28d9] bg-violet-50/50 p-4 rounded-r-xl italic text-slate-700 font-medium">
        {formatInlineMarkdown(text.replace(/^>\s+/, ""))}
      </blockquote>
    );
  }
  return <p>{formatInlineMarkdown(text)}</p>;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slugParam = typeof params?.slug === "string" ? params.slug : "why-a-single-press-placement-keeps-working-for-years";

  const fallbackArticle = getArticleBySlug(slugParam);
  const { data: apiData } = useSWR<{ blogPost: any }>(`/api/blog/${slugParam}`, fetcher);
  const { data: allPostsData } = useSWR<{ items: any[] }>("/api/blog", fetcher);

  const rawPost = apiData?.blogPost;

  let formattedSections = fallbackArticle.sections;
  if (rawPost) {
    if (rawPost.sections && Array.isArray(rawPost.sections) && rawPost.sections.length > 0) {
      formattedSections = rawPost.sections;
    } else if (rawPost.content) {
      formattedSections = parseContentToSections(rawPost.content);
    }
  }

  const article = rawPost
    ? {
        id: rawPost.id,
        slug: rawPost.slug,
        category: rawPost.category || fallbackArticle.category,
        title: rawPost.title || fallbackArticle.title,
        excerpt: rawPost.excerpt || fallbackArticle.excerpt,
        author: rawPost.author || fallbackArticle.author,
        date: rawPost.date || fallbackArticle.date,
        readTime: rawPost.readTime || fallbackArticle.readTime,
        featuredImage: rawPost.featuredImage || null,
        imageAlt: rawPost.imageAlt || rawPost.title,
        content: rawPost.content,
        sections: formattedSections,
      }
    : {
        ...fallbackArticle,
        featuredImage: null,
        imageAlt: fallbackArticle.title,
      };

  const [activeSection, setActiveSection] = useState<string>(
    article.sections?.[0]?.id || ""
  );

  // Scroll Spy to update ON THIS PAGE active item based on scroll position
  useEffect(() => {
    if (!article.sections || article.sections.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of article.sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article.sections]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PR":
        return FileText;
      case "SEO":
        return Search;
      case "Strategy":
        return CheckCircle2;
      case "Broadcast":
        return Tv;
      default:
        return FileText;
    }
  };

  const CategoryIcon = getCategoryIcon(article.category);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans relative">

      {/* Top Dark Header Banner */}
      <header className="w-full bg-[#040d21] text-white pt-32 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 xl:px-20 relative overflow-hidden">
        {/* Ambient Radial Glows */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-violet-700/12 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-400 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-200 line-clamp-1 max-w-[300px]">
              {article.title}
            </span>
          </div>

          {/* Category Badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#071d36] text-[#f59e0b] border border-amber-500/30">
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </span>
          </div>

          {/* Main Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl mb-8">
            {article.title}
          </h1>

          {/* Author Metadata */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-xs shadow-sm border border-slate-700">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {article.author}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {article.date} · {article.readTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Section with Sticky Table of Contents */}
      <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 font-sans">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Sticky ON THIS PAGE Sidebar (4 cols) */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 self-start h-fit pr-6 z-20">
            <div>
              <span className="font-bold tracking-[0.2em] text-[#6d28d9] uppercase text-xs block mb-5">
                ON THIS PAGE
              </span>

              {/* Table of Contents List */}
              <nav className="relative border-l border-slate-200 pl-4 space-y-4 text-xs sm:text-sm font-medium">
                {article.sections?.map((section: any) => {
                  const isCurrent = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(section.id);
                        const el = document.getElementById(section.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className={`block transition-all duration-200 relative ${
                        isCurrent
                          ? "text-[#6d28d9] font-bold -ml-[17px] pl-[13px] border-l-2 border-[#6d28d9]"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {section.heading}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Main Article Body Content (8 cols) */}
          <article className="lg:col-span-8 max-w-3xl">

            {/* JSON-LD Article Schema for Google SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  headline: article.title,
                  description: article.excerpt,
                  image: article.featuredImage ? [article.featuredImage] : undefined,
                  datePublished: article.date,
                  author: {
                    "@type": "Person",
                    name: article.author,
                  },
                  publisher: {
                    "@type": "Organization",
                    name: "RankPartner",
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://rankpartner.io/blog/${article.slug}`,
                  },
                }),
              }}
            />

            {/* Featured Cover Image */}
            {article.featuredImage && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-900/5 relative group p-1 flex items-center justify-center">
                <img
                  src={article.featuredImage}
                  alt={article.imageAlt || article.title}
                  className="w-full h-auto max-h-[650px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.005]"
                />
              </div>
            )}

            {/* Lead Excerpt */}
            <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed mb-10 pb-8 border-b border-slate-100">
              {article.excerpt}
            </p>

            {/* Article Sections */}
            <div className="space-y-12">
              {article.sections?.map((sec: any) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-32">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                    {sec.heading}
                  </h2>
                  <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                    {sec.paragraphs?.map((p: string, pIdx: number) => (
                      <React.Fragment key={pIdx}>
                        {renderParagraphText(p)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Takeaway Highlight Box */}
            <div className="my-12 p-6 sm:p-8 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                Key Takeaway for Growth Teams
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Authority isn&apos;t built overnight, but every editorial placement acts as a permanent asset that drives organic rankings, referral traffic, and brand trust for years.
              </p>
            </div>

            {/* Author Footer Card */}
            <div className="pt-8 border-t border-slate-200/80 flex items-center justify-between gap-4 mb-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#040d21] text-white flex items-center justify-center font-black text-sm shadow-sm">
                  A
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Written by {article.author}
                  </div>
                  <div className="text-xs text-slate-500">
                    Published in {article.category} Insights
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                className="text-xs font-bold text-[#6d28d9] hover:underline"
              >
                ← Back to all articles
              </Link>
            </div>

          </article>

        </div>
      </section>

      {/* Related Articles Section (SEO Internal Links & User Retention) */}
      <section className="w-full bg-slate-50 py-16 px-6 sm:px-10 lg:px-16 xl:px-20 border-t border-slate-200/60">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#6d28d9] uppercase block mb-1">
                CONTINUE READING
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Recommended Articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-[#6d28d9] hover:underline hidden sm:block"
            >
              View all insights →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {((allPostsData?.items && allPostsData.items.length > 0)
              ? allPostsData.items.filter((p: any) => p.slug !== article.slug).slice(0, 3)
              : [
                  {
                    id: "2",
                    slug: "what-domain-authority-and-domain-rating-actually-measure",
                    category: "SEO",
                    title: "The Truth About Domain Authority and Domain Rating",
                    excerpt: "Two of the most quoted numbers in SEO are widely misread. Here is what they tell you.",
                    author: "RankPartner Team",
                    date: "June 12, 2026",
                    readTime: "6 min read",
                  },
                  {
                    id: "3",
                    slug: "how-agencies-offer-pr-and-seo-without-building-a-newsroom",
                    category: "Strategy",
                    title: "Delivering High-Impact PR and SEO Without an In-House Newsroom",
                    excerpt: "Clients want coverage and rankings. Most agencies cannot staff for both.",
                    author: "RankPartner Team",
                    date: "May 28, 2026",
                    readTime: "6 min read",
                  },
                  {
                    id: "5",
                    slug: "turning-one-tv-interview-into-a-quarter-of-content",
                    category: "Broadcast",
                    title: "How to Turn One TV Interview Into Months of Content",
                    excerpt: "A broadcast segment is a few minutes on air and months of material everywhere else.",
                    author: "RankPartner Team",
                    date: "May 12, 2026",
                    readTime: "4 min read",
                  },
                ].filter((p) => p.slug !== article.slug).slice(0, 3)
            ).map((relPost: any) => (
              <Link
                key={relPost.id || relPost.slug}
                href={`/blog/${relPost.slug}`}
                className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {relPost.featuredImage && (
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-100">
                      <img
                        src={relPost.featuredImage}
                        alt={relPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-violet-50 text-[#6d28d9] mb-3">
                    {relPost.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#6d28d9] transition-colors line-clamp-2 mb-2">
                    {relPost.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 mb-4">
                    {relPost.excerpt}
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-medium border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span>{relPost.date}</span>
                  <span>{relPost.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

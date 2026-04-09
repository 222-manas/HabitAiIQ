"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    tag: "Investment",
    tagColor: "#b6ff3b",
    title: "Top 5 Cities for Real Estate Investment in 2025",
    author: "Aditya Sharma",
    date: "Mar 8, 2025",
    readTime: "5 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    tag: "Luxury",
    tagColor: "#4ecdc4",
    title: "Inside India's Most Exclusive Luxury Developments",
    author: "Priya Nair",
    date: "Mar 5, 2025",
    readTime: "4 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1573496774426-fe3db3dd1731?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    tag: "AI Insights",
    tagColor: "#f7b731",
    title: "AI-Powered Predictions: Where Property Prices Are Headed",
    author: "Rahul Verma",
    date: "Mar 1, 2025",
    readTime: "6 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    tag: "Guide",
    tagColor: "#b6ff3b",
    title: "First-Time Buyer's Complete Guide to Home Loans in India",
    author: "Kavya Reddy",
    date: "Feb 26, 2025",
    readTime: "8 min read",
  },
];

export default function InsightsBlog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".insights-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        ".insight-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="insights-title flex justify-between items-end mb-14">
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Insights
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "#ffffff" }}
          >
            Latest{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b6ff3b, #7ef8a8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Articles
            </span>
          </h2>
        </div>
        <button
          className="hidden md:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.03]"
          style={{
            background: "rgba(182,255,59,0.08)",
            color: "var(--accent)",
            border: "1px solid rgba(182,255,59,0.2)",
          }}
        >
          View All
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map(({ img, tag, tagColor, title, author, date, readTime }, i) => (
          <div
            key={i}
            className="insight-card group flex gap-5 rounded-2xl overflow-hidden p-4 transition-all duration-300 cursor-pointer"
            style={{
              background: "rgba(20,32,46,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -6,
                boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${tagColor}25`,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                boxShadow: "none",
                duration: 0.3,
                ease: "power2.out",
              });
            }}
          >
            <div className="relative w-32 h-28 rounded-xl overflow-hidden shrink-0">
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
              <div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    background: `${tagColor}15`,
                    color: tagColor,
                    border: `1px solid ${tagColor}25`,
                  }}
                >
                  {tag}
                </span>
                <h3
                  className="text-sm font-bold mt-2.5 leading-snug line-clamp-2 group-hover:text-white transition-colors"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {title}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {author} · {date}
                </p>
                <span
                  className="text-xs font-semibold flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: tagColor }}
                >
                  {readTime} →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

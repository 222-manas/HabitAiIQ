"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function StickySearch() {
  const barRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in from top + blur effect
      gsap.fromTo(
        barRef.current,
        { opacity: 0, y: -20, backdropFilter: "blur(0px)" },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );

      // Input expands + blur increases on scroll
      const input = inputRef.current;
      if (!input) return;

      ScrollTrigger.create({
        start: "100px top",
        end: "200px top",
        onEnter: () => {
          gsap.to(barRef.current, {
            boxShadow: "0 16px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(182,255,59,0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(barRef.current, {
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="sticky top-16 z-40 py-5 px-6 md:px-12">
      <div
        ref={barRef}
        className="max-w-4xl mx-auto flex items-center gap-3 p-2 rounded-2xl"
        style={{
          background: "rgba(14,22,34,0.85)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by city, neighborhood, or property ID..."
            className="w-full bg-transparent border-none outline-none text-sm py-2.5 focus:ring-0 placeholder:text-white/30"
            style={{ color: "#ffffff", caretColor: "var(--accent)" }}
          />
        </div>

        <div
          className="hidden md:flex items-center gap-2 px-4 h-10"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
        >
          <MapPin className="w-4 h-4" style={{ color: "var(--muted)" }} />
          <span className="text-sm" style={{ color: "var(--muted)" }}>
            All Cities
          </span>
        </div>

        <button
          className="flex items-center gap-2 p-2.5 rounded-xl transition-all hover:scale-105"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--muted)",
          }}
          title="Filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        <Link
          href="/dashboard/properties"
          className="flex items-center gap-2 font-bold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 hover:scale-[1.03] whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #b6ff3b 0%, #7ef8a8 100%)",
            color: "#0f1720",
            boxShadow: "0 0 20px rgba(182,255,59,0.3)",
          }}
        >
          Search
        </Link>
      </div>
    </div>
  );
}

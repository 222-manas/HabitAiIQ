"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MapPin, TrendingUp, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "₹3.8 Cr",
    location: "Bandra West, Mumbai",
    beds: 3,
    baths: 3,
    area: "2,100 sq ft",
    badge: "Premium",
    badgeColor: "#b6ff3b",
    score: 92,
  },
  {
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "₹6.2 Cr",
    location: "Juhu, Mumbai",
    beds: 4,
    baths: 4,
    area: "3,400 sq ft",
    badge: "Featured",
    badgeColor: "#4ecdc4",
    score: 97,
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "₹2.1 Cr",
    location: "Whitefield, Bangalore",
    beds: 3,
    baths: 2,
    area: "1,650 sq ft",
    badge: "Hot Deal",
    badgeColor: "#f7b731",
    score: 88,
  },
  {
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "₹4.5 Cr",
    location: "Golf Course Rd, Delhi",
    beds: 4,
    baths: 3,
    area: "2,800 sq ft",
    badge: "Luxury",
    badgeColor: "#b6ff3b",
    score: 95,
  },
  {
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "₹1.95 Cr",
    location: "HITEC City, Hyderabad",
    beds: 2,
    baths: 2,
    area: "1,200 sq ft",
    badge: "New",
    badgeColor: "#4ecdc4",
    score: 85,
  },
  {
    img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "₹8.7 Cr",
    location: "Worli Sea Face, Mumbai",
    beds: 5,
    baths: 5,
    area: "4,200 sq ft",
    badge: "Ultra Luxury",
    badgeColor: "#f7b731",
    score: 99,
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      // Horizontal scroll
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - track.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth + 400}`,
          invalidateOnRefresh: true,
        },
      });

      // Cards fade in stagger
      gsap.fromTo(
        ".h-prop-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-12">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Handpicked For You
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "#ffffff" }}
          >
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b6ff3b, #7ef8a8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Properties
            </span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            Scroll horizontally to explore premium listings
          </p>
        </div>
      </div>

      {/* The horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-6 md:px-12"
        style={{ width: "max-content" }}
      >
        {properties.map((p, i) => (
          <div
            key={i}
            className="h-prop-card group relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            style={{
              width: 340,
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={p.img}
                alt={p.location}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(14,22,34,0.8) 0%, transparent 60%)",
                }}
              />
              {/* Badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: `${p.badgeColor}20`,
                  color: p.badgeColor,
                  border: `1px solid ${p.badgeColor}40`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {p.badge}
              </div>
              {/* Heart */}
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(14,22,34,0.75)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Heart className="w-4 h-4" style={{ color: "rgba(255,255,255,0.6)" }} />
              </button>
              {/* AI Score */}
              <div
                className="absolute bottom-3 right-4 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                style={{
                  background: "rgba(14,22,34,0.85)",
                  color: p.badgeColor,
                  backdropFilter: "blur(8px)",
                }}
              >
                <TrendingUp className="w-3 h-3" />
                AI Score: {p.score}
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <p
                  className="text-2xl font-black"
                  style={{ color: "var(--accent)" }}
                >
                  {p.price}
                </p>
              </div>
              <div className="flex items-center gap-1.5 mb-4">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--muted)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                  {p.location}
                </p>
              </div>
              <div
                className="flex items-center gap-4 text-xs pt-4"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <span>{p.beds} Beds</span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                />
                <span>{p.baths} Baths</span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                />
                <span>{p.area}</span>
              </div>
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${p.badgeColor}08 0%, transparent 70%)`,
              }}
            />
          </div>
        ))}
        {/* View all CTA card */}
        <div
          className="flex-shrink-0 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-2"
          style={{
            width: 280,
            background: "rgba(182,255,59,0.05)",
            border: "1px dashed rgba(182,255,59,0.25)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(182,255,59,0.12)" }}
          >
            <TrendingUp className="w-7 h-7" style={{ color: "var(--accent)" }} />
          </div>
          <div className="text-center px-6">
            <p className="text-white font-bold"> View All Properties</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              10,000+ listings available
            </p>
          </div>
          <Link
            href="/dashboard/properties"
            className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(182,255,59,0.15)",
              color: "var(--accent)",
              border: "1px solid rgba(182,255,59,0.25)",
            }}
          >
            Explore →
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </section>
  );
}

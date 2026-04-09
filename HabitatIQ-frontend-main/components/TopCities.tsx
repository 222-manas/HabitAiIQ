"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const cities = [
  {
    city: "Mumbai",
    sub: "4,200+ listings",
    img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    accent: "#b6ff3b",
  },
  {
    city: "Delhi",
    sub: "3,100+ listings",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    accent: "#4ecdc4",
  },
  {
    city: "Bangalore",
    sub: "2,800+ listings",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    accent: "#f7b731",
  },
  {
    city: "Hyderabad",
    sub: "1,900+ listings",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    accent: "#b6ff3b",
  },
];

export default function TopCities() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        ".cities-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      // Cards scale + reveal with stagger
      gsap.fromTo(
        ".city-card",
        { opacity: 0, scale: 0.88, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: { amount: 0.5 },
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
      <div className="cities-title text-center mb-16">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: "var(--accent)" }}
        >
          Top Markets
        </p>
        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: "#ffffff" }}
        >
          Discover Prime{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #b6ff3b, #7ef8a8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Destinations
          </span>
        </h2>
        <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
          Premium real estate in India&apos;s most sought-after cities
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {cities.map(({ city, sub, img, accent }) => (
          <Link
            key={city}
            href="/dashboard/properties"
            className="city-card relative rounded-3xl overflow-hidden group cursor-pointer block"
            style={{ minHeight: 300 }}
          >
            <img
              src={img}
              alt={city}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,16,24,0.95) 0%, rgba(10,16,24,0.5) 50%, rgba(10,16,24,0.1) 100%)",
              }}
            />

            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 100%, ${accent}14 0%, transparent 70%)`,
              }}
            />

            {/* Accent border on hover */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ border: `1px solid ${accent}40` }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-full min-h-[300px] p-6">
              {/* Pill badge */}
              <div
                className="mb-3 self-start px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0"
                style={{
                  background: `${accent}18`,
                  color: accent,
                  border: `1px solid ${accent}35`,
                  backdropFilter: "blur(8px)",
                  transition: "opacity 0.3s, transform 0.3s",
                }}
              >
                Explore →
              </div>
              <p className="text-xl font-extrabold" style={{ color: "#ffffff" }}>
                {city}
              </p>
              <p className="text-xs mt-1 font-semibold" style={{ color: accent }}>
                {sub}
              </p>
            </div>

            {/* Subtle gradient motion bg */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl"
              style={{ background: accent }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

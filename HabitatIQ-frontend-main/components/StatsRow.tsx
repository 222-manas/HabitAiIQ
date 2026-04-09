"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Home, Star, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Building2, value: 8500, suffix: "+", label: "Elegant Apartments", color: "#b6ff3b" },
  { icon: Home, value: 3200, suffix: "+", label: "Luxury Houses", color: "#4ecdc4" },
  { icon: Star, value: 12000, suffix: "+", label: "Satisfied Guests", color: "#f7b731" },
  { icon: Users, value: 5400, suffix: "+", label: "Happy Owners", color: "#b6ff3b" },
];

export default function StatsRow() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Counters
      const counters = sectionRef.current?.querySelectorAll("[data-stat]");
      counters?.forEach((el) => {
        const target = parseInt(el.getAttribute("data-stat") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.2,
            ease: "power2.out",
            snap: { textContent: 100 },
            onUpdate: function () {
              const val = Math.round(parseFloat(this.targets()[0].textContent));
              el.textContent = val.toLocaleString() + suffix;
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "rgba(20,32,46,0.8)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label, color }, i) => (
            <div
              key={i}
              className="stat-item flex flex-col items-center text-center gap-4 p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid ${color}35`;
                (e.currentTarget as HTMLDivElement).style.background = `${color}06`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.03)";
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}18` }}
              >
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
              <span
                className="text-3xl md:text-4xl font-black"
                style={{ color }}
                data-stat={value}
                data-suffix={suffix}
              >
                {value.toLocaleString()}
                {suffix}
              </span>
              <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

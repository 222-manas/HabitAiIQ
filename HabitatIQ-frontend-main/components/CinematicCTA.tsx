"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ken Burns effect – slow zoom
      gsap.fromTo(
        bgImgRef.current,
        { scale: 1 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // Dramatic fade-in with delay
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.fromTo(
        ".cta-eyebrow",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          ".cta-heading",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".cta-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".cta-btn",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={bgImgRef}
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
          alt="Luxury Home"
          className="w-full h-full object-cover"
          style={{ transformOrigin: "center center", willChange: "transform" }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(10,16,24,0.95) 0%, rgba(10,16,24,0.75) 100%)",
          }}
        />
        {/* Radial accent glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(182,255,59,0.06) 0%, transparent 65%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, #0f1720)",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <div
          className="cta-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-8"
          style={{
            background: "rgba(182,255,59,0.12)",
            color: "var(--accent)",
            border: "1px solid rgba(182,255,59,0.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          Get Started Today
        </div>

        <h2
          className="cta-heading text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          style={{ color: "#ffffff" }}
        >
          Your Satisfaction Is
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #b6ff3b 0%, #7ef8a8 50%, #4ecdc4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Commitment
          </span>
        </h2>

        <p
          className="cta-sub text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Join thousands of smart investors and homebuyers who trust HabitatIQ
          to make data-backed, confident real estate decisions.
        </p>

        <div className="cta-btn flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 font-bold py-4 px-10 rounded-2xl text-base transition-all duration-300 hover:scale-[1.04] group"
            style={{
              background: "linear-gradient(135deg, #b6ff3b 0%, #7ef8a8 100%)",
              color: "#0f1720",
              boxShadow: "0 0 40px rgba(182,255,59,0.4), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard/properties"
            className="inline-flex items-center gap-2 font-semibold py-4 px-8 rounded-2xl text-base transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "rgba(255,255,255,0.07)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            Browse Properties
          </Link>
        </div>

        {/* Trust indicators */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {["No hidden fees", "Verified listings", "AI-backed insights", "Expert support"].map(
            (item) => (
              <span key={item} className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

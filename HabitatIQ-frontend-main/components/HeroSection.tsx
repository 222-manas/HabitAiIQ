"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, Star, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          h1Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          searchRef.current,
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.7"
        );

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out hero content on scroll
      gsap.to(".hero-content", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "30% top",
          end: "80% top",
          scrub: true,
        },
      });

      // Animated counters
      const counters = document.querySelectorAll("[data-count]");
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const isFloat = el.getAttribute("data-float") === "true";
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: isFloat ? 0.1 : 1 },
            onUpdate: function () {
              const val = parseFloat(this.targets()[0].textContent);
              el.textContent = isFloat
                ? val.toFixed(1) + "%"
                : Math.round(val) + "k+";
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Parallax Background */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ willChange: "transform" }}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
          alt="Luxury property"
          className="w-full h-[120%] object-cover"
          style={{ objectPosition: "center 20%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #0f1720 42%, rgba(15,23,32,0.88) 65%, rgba(15,23,32,0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0f1720 0%, transparent 50%)" }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(182,255,59,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24 w-full">
        <div className="max-w-2xl xl:max-w-3xl">
          {/* Eyebrow badge */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-8"
            style={{
              background: "rgba(182,255,59,0.12)",
              color: "var(--accent)",
              border: "1px solid rgba(182,255,59,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Star className="w-3 h-3 fill-current" />
            Premium Real Estate Intelligence
          </div>

          {/* Heading */}
          <h1
            ref={h1Ref}
            className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
            style={{ color: "#ffffff" }}
          >
            Smart Real Estate
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #b6ff3b 0%, #7ef8a8 50%, #4ecdc4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Decisions
            </span>{" "}
            with
            <br />
            HabitatIQ
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            AI-powered property insights & ROI intelligence. Discover, compare,
            and invest with data-backed confidence.
          </p>

          {/* Search Bar */}
          <div
            ref={searchRef}
            className="flex flex-col md:flex-row items-center gap-3 p-2 rounded-2xl mb-12 max-w-2xl"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex-1 flex items-center w-full px-4 gap-3">
              <Search className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} />
              <input
                type="text"
                placeholder="Search by city, neighborhood, or property ID..."
                className="w-full bg-transparent border-none outline-none text-base py-3 focus:ring-0 placeholder:text-white/30"
                style={{ color: "#ffffff", caretColor: "var(--accent)" }}
              />
            </div>
            <Link
              href="/dashboard/properties"
              className="w-full md:w-auto flex items-center justify-center gap-2 font-bold py-3.5 px-8 rounded-xl transition-all duration-300 group whitespace-nowrap hover:scale-[1.03] hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #b6ff3b 0%, #7ef8a8 100%)",
                color: "#0f1720",
                boxShadow: "0 0 28px rgba(182,255,59,0.4)",
              }}
            >
              Explore Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-10 md:gap-16">
            {[
              { value: 10, suffix: "k+", label: "Properties Listed", dataCount: "10" },
              { value: 98, suffix: "%", label: "Prediction Accuracy", dataCount: "98", isFloat: false },
              { value: 5, suffix: "k+", label: "Happy Investors", dataCount: "5" },
            ].map((stat, i) => (
              <div key={i} className="hero-stat flex flex-col">
                <span
                  className="text-3xl md:text-4xl font-black tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #b6ff3b 0%, #7ef8a8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  data-count={stat.dataCount}
                  data-float={stat.isFloat}
                >
                  {stat.value}{stat.suffix}
                </span>
                <span
                  className="text-sm mt-1 font-medium"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating property badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-24 right-8 md:right-20 z-10 hidden lg:flex flex-col items-start gap-3 rounded-2xl p-5"
        style={{
          background: "rgba(14,22,34,0.85)",
          border: "1px solid rgba(182,255,59,0.2)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(182,255,59,0.15)" }}
          >
            <Star className="w-5 h-5 fill-current" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">AI-Powered</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>Price Intelligence</p>
          </div>
        </div>
        <div
          className="h-px w-full"
          style={{ background: "rgba(182,255,59,0.15)" }}
        />
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          Accuracy:{" "}
          <span className="font-bold" style={{ color: "var(--accent)" }}>
            98.2%
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

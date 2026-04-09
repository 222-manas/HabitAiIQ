"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRightLeft,
  TrendingUp,
  LineChart,
  CheckCircle,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Feature 1: Property Comparison ─── */
function Feature1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slides in from left
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
      // Text slides in from right
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
      // Subtle parallax on image
      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div
          ref={imgRef}
          className="relative rounded-3xl overflow-hidden group"
          style={{ minHeight: 420 }}
        >
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
            alt="Property Comparison"
            className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(182,255,59,0.08) 0%, transparent 60%)",
            }}
          />
          {/* Floating overlay card */}
          <div
            className="absolute bottom-6 left-6 rounded-2xl px-5 py-4"
            style={{
              background: "rgba(14,22,34,0.9)",
              border: "1px solid rgba(182,255,59,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <span className="text-white text-sm font-bold">Side-by-side view</span>
            </div>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              Compare up to 4 properties
            </p>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="flex flex-col justify-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase mb-6 self-start"
            style={{
              background: "rgba(182,255,59,0.1)",
              color: "var(--accent)",
              border: "1px solid rgba(182,255,59,0.2)",
            }}
          >
            <ArrowRightLeft className="w-3 h-3" /> Feature 01
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ color: "#ffffff" }}
          >
            Intelligent{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b6ff3b, #7ef8a8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Property
            </span>
            <br />
            Comparison
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "var(--muted)" }}>
            Analyze multiple properties side-by-side with instant data on dimensions,
            prices, amenities, and AI-scored metrics. Make informed decisions in minutes.
          </p>
          <ul className="space-y-3">
            {[
              "Compare price history & trends",
              "AI-weighted scoring system",
              "Neighborhood-level analytics",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature 2: AI Price Prediction ─── */
function Feature2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
      // Floating graph animation
      gsap.fromTo(
        graphRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        }
      );
      gsap.to(imgRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text first on large screens */}
        <div ref={textRef} className="flex flex-col justify-center order-2 lg:order-1">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase mb-6 self-start"
            style={{
              background: "rgba(78,205,196,0.1)",
              color: "#4ecdc4",
              border: "1px solid rgba(78,205,196,0.2)",
            }}
          >
            <TrendingUp className="w-3 h-3" /> Feature 02
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ color: "#ffffff" }}
          >
            AI-Powered{" "}
            <span style={{ color: "#4ecdc4" }}>Price</span>
            <br />
            Predictions
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "var(--muted)" }}>
            Our ML models trained on millions of data points predict future property values with
            98% accuracy — giving you a decisive edge in timing your investment.
          </p>
          <ul className="space-y-3">
            {[
              "6-month & 12-month price forecasts",
              "Location & amenity-driven models",
              "Market sentiment analysis",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "#4ecdc4" }} />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div
          ref={imgRef}
          className="relative rounded-3xl overflow-hidden order-1 lg:order-2"
          style={{ minHeight: 420 }}
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
            alt="AI Price Prediction"
            className="w-full h-[420px] object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(78,205,196,0.06) 0%, transparent 60%)",
            }}
          />
          {/* Floating graph card */}
          <div
            ref={graphRef}
            className="absolute top-6 right-6 rounded-2xl p-4 w-48"
            style={{
              background: "rgba(14,22,34,0.92)",
              border: "1px solid rgba(78,205,196,0.25)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-xs font-bold mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
              Price Trend
            </p>
            <svg viewBox="0 0 120 50" className="w-full h-12">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ecdc4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 40 Q20 35 30 28 T60 20 T90 12 T120 5"
                fill="none"
                stroke="#4ecdc4"
                strokeWidth="2"
              />
              <path
                d="M0 40 Q20 35 30 28 T60 20 T90 12 T120 5 L120 50 L0 50 Z"
                fill="url(#lineGrad)"
              />
            </svg>
            <p className="text-xs mt-2" style={{ color: "#4ecdc4" }}>↑ +14.3% predicted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature 3: Investment Analysis (3D tilt cards) ─── */
function Feature3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        ".invest-card",
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      // Animated counters
      const counters = sectionRef.current?.querySelectorAll("[data-invest]");
      counters?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-invest") || "0");
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const isFloat = el.getAttribute("data-isfloat") === "true";
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
              el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: "ROI Calculator",
      value: "18.4",
      suffix: "%",
      prefix: "",
      label: "Avg. Annual Return",
      desc: "Calculate your expected return on investment with real market data.",
      isFloat: true,
      color: "#b6ff3b",
      icon: LineChart,
    },
    {
      title: "Appreciation Score",
      value: "92",
      suffix: "",
      prefix: "",
      label: "Out of 100",
      desc: "Neighborhood appreciation index based on 50+ data signals.",
      isFloat: false,
      color: "#4ecdc4",
      icon: TrendingUp,
    },
    {
      title: "Smart Opportunities",
      value: "2400",
      suffix: "+",
      prefix: "",
      label: "Curated Deals",
      desc: "AI-scored investment opportunities ranked by potential returns.",
      isFloat: false,
      color: "#f7b731",
      icon: Sparkles,
    },
  ];

  return (
    <div ref={sectionRef} className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div ref={titleRef} className="text-center mb-16">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase mb-5"
          style={{
            background: "rgba(247,183,49,0.1)",
            color: "#f7b731",
            border: "1px solid rgba(247,183,49,0.2)",
          }}
        >
          <LineChart className="w-3 h-3" /> Feature 03
        </div>
        <h2
          className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
          style={{ color: "#ffffff" }}
        >
          Investment{" "}
          <span style={{ color: "#f7b731" }}>Analysis</span>
        </h2>
        <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
          Data-driven investment intelligence to help you maximize returns and minimize risk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ title, value, suffix, prefix, label, desc, isFloat, color, icon: Icon }, i) => (
          <div
            key={i}
            className="invest-card rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-default"
            style={{
              background: "rgba(20,32,46,0.7)",
              border: `1px solid ${color}20`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 0 0 0 ${color}00`,
              transitionProperty: "transform, box-shadow",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${color}15, 0 0 0 1px ${color}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `${color}18` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                {title}
              </p>
              <span
                className="text-5xl font-black"
                style={{ color }}
                data-invest={value}
                data-prefix={prefix}
                data-suffix={suffix}
                data-isfloat={isFloat.toString()}
              >
                {prefix}{value}{suffix}
              </span>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                {label}
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureStory() {
  return (
    <section>
      <Feature1 />
      <div className="section-divider mx-6 md:mx-12" />
      <Feature2 />
      <div className="section-divider mx-6 md:mx-12" />
      <Feature3 />
    </section>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StickySearch from "@/components/StickySearch";
import StatsRow from "@/components/StatsRow";
import FeatureStory from "@/components/FeatureStory";
import HorizontalScroll from "@/components/HorizontalScroll";
import TopCities from "@/components/TopCities";
import InsightsBlog from "@/components/InsightsBlog";
import CinematicCTA from "@/components/CinematicCTA";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      {/* ── 1. HERO ── */}
      <HeroSection />

      {/* ── 2. STICKY SEARCH BAR ── */}
      <StickySearch />

      {/* ── 3. STATS ROW ── */}
      <StatsRow />

      {/* ── 4. FEATURE STORY (Parallax alternating) ── */}
      <div className="section-divider mx-6 md:mx-12 mt-12" />
      <FeatureStory />

      {/* ── 5. HORIZONTAL SCROLL PROPERTIES ── */}
      <div className="section-divider mx-6 md:mx-12" />
      <HorizontalScroll />

      {/* ── 6. TOP CITIES ── */}
      <div className="section-divider mx-6 md:mx-12" />
      <TopCities />

      {/* ── 7. INSIGHTS / BLOG ── */}
      <div className="section-divider mx-6 md:mx-12" />
      <InsightsBlog />

      {/* ── 8. CINEMATIC CTA ── */}
      <CinematicCTA />

      {/* ── 9. FOOTER ── */}
      <footer
        className="border-t"
        style={{ background: "#080e16", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #b6ff3b, #7ef8a8)",
                  }}
                >
                  <Building2 className="w-5 h-5" style={{ color: "#0f1720" }} />
                </div>
                <span className="text-lg font-bold" style={{ color: "#ffffff" }}>
                  Habitat<span style={{ color: "var(--accent)" }}>IQ</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                India&apos;s premier AI-powered real estate intelligence platform. Smart decisions.
                Premium properties.
              </p>
              {/* Social links */}
              <div className="flex gap-3 mt-5">
                {["𝕏", "in", "▶"].map((s) => (
                  <button
                    key={s}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <p
                className="text-sm font-bold mb-5 uppercase tracking-widest"
                style={{ color: "#ffffff" }}
              >
                Explore
              </p>
              <ul className="space-y-3">
                {[
                  "Properties",
                  "Price Predictions",
                  "Compare",
                  "Investment Tools",
                  "Dashboard",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="/dashboard"
                      className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-2 group"
                      style={{ color: "var(--muted)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "var(--accent)" }}
                      />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p
                className="text-sm font-bold mb-5 uppercase tracking-widest"
                style={{ color: "#ffffff" }}
              >
                Company
              </p>
              <ul className="space-y-3">
                {["About Us", "Blog", "Privacy Policy", "Terms of Service", "Support"].map(
                  (item) => (
                    <li key={item}>
                      <span
                        className="text-sm cursor-pointer transition-colors duration-200 hover:text-white flex items-center gap-2 group"
                        style={{ color: "var(--muted)" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: "var(--accent)" }}
                        />
                        {item}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-sm font-bold mb-5 uppercase tracking-widest"
                style={{ color: "#ffffff" }}
              >
                Contact
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    1201, Prestige Tower, MG Road, Bangalore 560001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    +91 98765 43210
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    hello@habitatiq.in
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              color: "var(--muted)",
            }}
          >
            <p>© {new Date().getFullYear()} HabitatIQ. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Cookie Settings
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

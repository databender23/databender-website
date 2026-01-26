"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { ProspectPage } from "@/lib/prospect-pages-data";
import { caseStudies, testimonials } from "@/lib/case-studies-data";
import { isProspectPageExpired } from "@/lib/prospect-pages-data";
import { SearchJourneyAnimation, KnowledgeHubAnimation } from "@/components/prospect";
import Link from "next/link";

interface Props {
  page: ProspectPage;
}

type TrackingEvent =
  | "page_opened"
  | "password_success"
  | "password_failure"
  | "scroll_50"
  | "scroll_100"
  | "section_viewed"
  | "time_2min"
  | "time_5min"
  | "cta_clicked"
  | "page_closed"
  | "return_visit";

async function trackEvent(
  slug: string,
  event: TrackingEvent,
  data?: Record<string, unknown>
) {
  try {
    await fetch("/api/prospect/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        event,
        data: {
          ...data,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        },
      }),
    });
  } catch (error) {
    console.error("Tracking error:", error);
  }
}

function getSessionId(slug: string): string {
  const key = `prospect_session_${slug}`;
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `${slug}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

function getVisitCount(slug: string): number {
  const key = `prospect_visits_${slug}`;
  const count = parseInt(localStorage.getItem(key) || "0", 10);
  localStorage.setItem(key, String(count + 1));
  return count + 1;
}

function isAuthenticated(slug: string): boolean {
  return localStorage.getItem(`prospect_auth_${slug}`) === "true";
}

function setAuthenticated(slug: string) {
  localStorage.setItem(`prospect_auth_${slug}`, "true");
}

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseFloat(numericMatch[0]);
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      if (Number.isInteger(target)) {
        setDisplayValue(Math.round(current).toString());
      } else {
        setDisplayValue(current.toFixed(1));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

// ============================================
// SECTION BADGE
// ============================================
function SectionBadge({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: "teal" | "orange" | "red" | "green" | "blue" | "purple";
}) {
  const colors = {
    teal: "bg-teal-50 text-teal-600 border-teal-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    red: "bg-red-50 text-red-600 border-red-100",
    green: "bg-green-50 text-green-600 border-green-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${colors[color]}`}>
      {icon}
      {label}
    </div>
  );
}

// ============================================
// ICONS
// ============================================
const Icons = {
  lock: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  x: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  chart: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  calculator: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  question: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  arrow: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
};

// ============================================
// PASSWORD GATE
// ============================================
function PasswordGate({
  page,
  onSuccess,
}: {
  page: ProspectPage;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    if (password.toLowerCase() === page.password.toLowerCase()) {
      setAuthenticated(page.slug);
      await trackEvent(page.slug, "password_success");
      onSuccess();
    } else {
      await trackEvent(page.slug, "password_failure", { attemptedPassword: password });
      setError(true);
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-secondary to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Logo */}
        {page.companyLogo && (
          <div className="mb-8">
            <img
              src={page.companyLogo}
              alt={page.companyName}
              className="h-16 w-auto mx-auto object-contain"
            />
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-black/5">
          <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Private Assessment
          </h1>
          <p className="text-text-secondary mb-8">
            Prepared exclusively for {page.companyName}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access code"
                className={`w-full px-4 py-3 bg-bg-secondary border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                  error ? "border-red-500" : "border-border"
                }`}
                autoFocus
              />
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-500">
                  Incorrect code. Please try again.
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-medium rounded-xl transition-colors shadow-lg shadow-teal-500/20"
            >
              {isLoading ? "Verifying..." : "View Assessment"}
            </button>
          </form>
        </div>

        <p className="text-text-muted text-sm mt-6">
          Access code was included in your email or card.
        </p>
      </motion.div>
    </div>
  );
}

// ============================================
// EXPIRATION BANNER
// ============================================
function ExpirationBanner({ page }: { page: ProspectPage }) {
  const createdDate = new Date(page.createdDate);
  const monthYear = createdDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
      <p className="text-center text-amber-800 text-sm">
        This assessment was prepared {monthYear}.{" "}
        <Link href="/contact" className="underline hover:text-amber-900 font-medium">Contact us</Link>{" "}
        for an updated analysis.
      </p>
    </div>
  );
}

// ============================================
// COST CALCULATOR
// ============================================
function CostCalculator({ page }: { page: ProspectPage }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [step, setStep] = useState(0);

  // Extract attorney count from companySize (e.g., "80 attorneys" → 80)
  const attorneyMatch = page.companySize.match(/(\d+)/);
  const attorneyCount = attorneyMatch ? parseInt(attorneyMatch[1], 10) : 50;

  // Calculations
  const hoursPerWeek = 10; // midpoint of 8-12
  const weeksPerYear = 48;
  const avgHourlyRate = 300; // blended rate
  const duplicateResearchCost = attorneyCount * hoursPerWeek * weeksPerYear * avgHourlyRate;

  const interruptionsPerWeek = 3;
  const interruptionCost = 600; // midpoint of $400-800
  const partnerInterruptionsCost = attorneyCount * interruptionsPerWeek * weeksPerYear * interruptionCost * 0.3; // 30% are partners

  const totalAnnualCost = duplicateResearchCost + partnerInterruptionsCost;

  useEffect(() => {
    if (!isInView) return;

    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2100),
      setTimeout(() => setStep(4), 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-2xl p-8 border border-black/5 shadow-lg">
        <p className="text-sm font-medium text-text-muted mb-6 text-center">Conservative estimate for {page.companyName}</p>

        <div className="space-y-4 font-mono text-sm">
          {/* Line 1: Duplicate research */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -20 }}
            className="flex items-center justify-between py-2 border-b border-dashed border-gray-200"
          >
            <span className="text-text-secondary">{attorneyCount} attorneys × 10 hrs/week × 48 weeks × $300/hr</span>
            <span className="font-bold text-text-primary">{formatCurrency(duplicateResearchCost)}</span>
          </motion.div>

          {/* Line 2: Partner interruptions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : -20 }}
            className="flex items-center justify-between py-2 border-b border-dashed border-gray-200"
          >
            <span className="text-text-secondary">Partner interruptions (est.)</span>
            <span className="font-bold text-text-primary">+ {formatCurrency(partnerInterruptionsCost)}</span>
          </motion.div>

          {/* Line 3: Divider with equals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            className="border-t-2 border-gray-300 pt-4"
          />

          {/* Line 4: Total */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: step >= 4 ? 1 : 0, scale: step >= 4 ? 1 : 0.95 }}
            className="flex items-center justify-between"
          >
            <span className="text-lg font-medium text-text-primary">Estimated annual cost</span>
            <span className="text-3xl font-bold text-red-500">{formatCurrency(totalAnnualCost)}+</span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 4 ? 1 : 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-text-muted text-sm mt-6"
        >
          Before counting missed business development opportunities
        </motion.p>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN CONTENT
// ============================================
function ProspectContent({ page }: { page: ProspectPage }) {
  const [scrollDepth, setScrollDepth] = useState(0);
  const sectionsViewedRef = useRef<Set<string>>(new Set());
  const startTimeRef = useRef(Date.now());
  const trackedMilestonesRef = useRef<Set<string>>(new Set());
  const isExpired = isProspectPageExpired(page);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const depth = Math.round((currentScroll / scrollHeight) * 100);
      setScrollDepth(depth);

      if (depth >= 50 && !trackedMilestonesRef.current.has("scroll_50")) {
        trackedMilestonesRef.current.add("scroll_50");
        trackEvent(page.slug, "scroll_50");
      }
      if (depth >= 100 && !trackedMilestonesRef.current.has("scroll_100")) {
        trackedMilestonesRef.current.add("scroll_100");
        trackEvent(page.slug, "scroll_100");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page.slug]);

  // Time tracking
  useEffect(() => {
    const timer2min = setTimeout(() => {
      if (!trackedMilestonesRef.current.has("time_2min")) {
        trackedMilestonesRef.current.add("time_2min");
        trackEvent(page.slug, "time_2min");
      }
    }, 2 * 60 * 1000);
    const timer5min = setTimeout(() => {
      if (!trackedMilestonesRef.current.has("time_5min")) {
        trackedMilestonesRef.current.add("time_5min");
        trackEvent(page.slug, "time_5min");
      }
    }, 5 * 60 * 1000);
    return () => { clearTimeout(timer2min); clearTimeout(timer5min); };
  }, [page.slug]);

  // Page close tracking
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      navigator.sendBeacon("/api/prospect/track", JSON.stringify({
        slug: page.slug,
        event: "page_closed",
        data: {
          timeOnPageSeconds: timeOnPage,
          scrollDepth,
          sectionsViewed: Array.from(sectionsViewedRef.current),
          timestamp: new Date().toISOString(),
        },
      }));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [page.slug, scrollDepth]);

  const trackSectionView = useCallback((sectionId: string) => {
    if (!sectionsViewedRef.current.has(sectionId)) {
      sectionsViewedRef.current.add(sectionId);
      trackEvent(page.slug, "section_viewed", { section: sectionId });
    }
  }, [page.slug]);

  const handleCtaClick = () => {
    trackEvent(page.slug, "cta_clicked");
  };

  return (
    <div className="min-h-screen bg-white">
      {isExpired && <ExpirationBanner page={page} />}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-bg-secondary z-50">
        <motion.div className="h-full bg-teal-500" style={{ width: `${scrollDepth}%` }} />
      </div>

      {/* ===== HERO ===== */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-bg-secondary to-white">
        <div className="container mx-auto px-6">
          {/* Two-column hero */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-teal-500/10 text-teal-500 rounded-full border border-teal-500/20">
                  Private Assessment
                </span>
              </div>

              {/* Logo */}
              {page.companyLogo && (
                <img
                  src={page.companyLogo}
                  alt={page.companyName}
                  className="h-12 md:h-14 w-auto object-contain mb-6"
                />
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                The Knowledge Access Problem at{" "}
                <span className="text-teal-500">{page.companyName.split(" ")[0]}</span>
              </h1>

              <p className="text-lg text-text-secondary mb-8 max-w-xl">
                {page.introHook}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="px-4 py-2 bg-white rounded-lg border border-border">
                  <span className="text-text-muted">Industry:</span>{" "}
                  <span className="font-medium text-text-primary capitalize">{page.industry}</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border border-border">
                  <span className="text-text-muted">Size:</span>{" "}
                  <span className="font-medium text-text-primary">{page.companySize}</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border border-border">
                  <span className="text-text-muted">Location:</span>{" "}
                  <span className="font-medium text-text-primary">{page.companyLocation}</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Key insight card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-black/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full" />
                <div className="relative">
                  <p className="text-sm font-medium text-teal-500 tracking-wide mb-4">The Key Insight</p>
                  <blockquote className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed">
                    "{page.keyInsight}"
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <motion.section
        className="py-20 bg-white"
        onViewportEnter={() => trackSectionView("problem")}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge icon={Icons.warning} label="The Problem" color="orange" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-3">
              {page.gapHeadline}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {page.gapSummary}
            </p>
          </div>

          {/* Stacked layout: Text then Diagram */}
          <div className="max-w-4xl mx-auto">
            {/* Problem cards */}
            <div className="mb-10">
              <p className="text-sm font-medium text-text-muted mb-4">Questions your current tools can't answer:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {page.failedQueries.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-red-50/50 border border-red-100 rounded-xl p-4"
                  >
                    <p className="font-medium text-text-primary mb-1 text-sm">"{item.query}"</p>
                    <p className="text-sm text-red-600">{item.whyFails}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-text-secondary mt-6">{page.gapConsequence}</p>
            </div>

            {/* Frustration diagram - below text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-black/5">
                <SearchJourneyAnimation
                  searchQuery="MedTech Partners earnout"
                  dmsName={page.currentTools.find(t => t.category === "Document Management")?.tools.split(" ")[0] || "iManage"}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== THE COST ===== */}
      <motion.section
        className="py-20 bg-bg-secondary"
        onViewportEnter={() => trackSectionView("cost")}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge icon={Icons.chart} label="The Cost" color="red" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-3">
              What This Gap Costs You
            </h2>
          </div>

          {/* Cost cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {page.inefficiencies.map((item, i) => {
              // Parse impact to extract the number portion vs unit vs context
              // e.g., "8-12 hours per week per attorney" → ["8-12", "hours", "per week per attorney"]
              const impactMatch = item.impact.match(/^([\d$,.\-–]+)\s*(hours?|months?)?\s*(.*)/i);

              // If no number match, treat the whole impact as a text-only display
              const hasNumber = impactMatch && impactMatch[1];
              const mainNumber = hasNumber ? impactMatch[1].trim() : "";
              const unit = hasNumber && impactMatch[2] ? impactMatch[2] : "";
              const restOfImpact = hasNumber && impactMatch[3] ? impactMatch[3].trim() : "";
              const fullTextImpact = !hasNumber ? item.impact : "";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm text-center flex flex-col"
                >
                  {fullTextImpact ? (
                    // Text-only impact (no leading number)
                    <p className="text-lg md:text-xl font-bold text-red-500 leading-snug min-h-[80px] flex items-center justify-center">
                      {fullTextImpact}
                    </p>
                  ) : (
                    <>
                      <div className="text-3xl md:text-4xl font-bold text-red-500 leading-tight">
                        {/* Handle currency ranges like $400-800 by breaking at the dash */}
                        {mainNumber.match(/^\$[\d,]+-[\d,]+$/) ? (
                          <>
                            {mainNumber.split("-")[0]}-<br />
                            <span>{mainNumber.split("-")[1]}</span>
                          </>
                        ) : (
                          mainNumber
                        )}
                        {unit && <><br /><span className="text-2xl md:text-3xl">{unit}</span></>}
                      </div>
                      <p className="text-sm text-text-secondary mt-1 min-h-[40px] flex items-center justify-center">
                        {restOfImpact || "\u00A0"}
                      </p>
                    </>
                  )}
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide mt-auto pt-2 border-t border-gray-100">{item.issue}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Animated cost calculator */}
          <CostCalculator page={page} />
        </div>
      </motion.section>

      {/* ===== THE SOLUTION ===== */}
      <motion.section
        className="py-20 bg-white"
        onViewportEnter={() => trackSectionView("solution")}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge icon={Icons.check} label="The Solution" color="teal" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-3">
              {page.opportunityHeadline}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {page.opportunityIntro}
            </p>
          </div>

          {/* Two-column: Benefits + Diagram */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto mb-16">
            {/* Left: Benefits */}
            <div>
              <p className="text-sm font-medium text-text-muted mb-4">What this unlocks:</p>
              <div className="space-y-3">
                {page.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 bg-teal-50/50 border border-teal-100 rounded-xl p-4"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-text-primary">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Knowledge hub diagram */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-black/5">
                <KnowledgeHubAnimation
                  companyName={page.companyName.split(" ")[0]}
                  practiceAreas={
                    page.industry === "legal"
                      ? ["Real Estate", "Corporate M&A", "Employment", "Trusts & Estates"]
                      : page.industry === "healthcare"
                      ? ["Clinical Ops", "Revenue Cycle", "Compliance", "Quality"]
                      : page.industry === "manufacturing"
                      ? ["Production", "Supply Chain", "Quality", "Maintenance"]
                      : ["Operations", "Finance", "Sales", "HR"]
                  }
                />
              </div>
            </div>
          </div>

          {/* Differentiators - 4 icon cards */}
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-medium text-text-muted mb-6 text-center">What&apos;s different now:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {page.differentiators.map((diff, i) => {
                // Icons for each differentiator
                const icons = [
                  // You own it - key icon
                  <svg key="own" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>,
                  // Weeks not months - lightning bolt
                  <svg key="speed" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>,
                  // Your infrastructure - server/building
                  <svg key="infra" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>,
                  // Senior attention - user with star
                  <svg key="senior" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>,
                ];

                const colors = [
                  "from-teal-500 to-emerald-500",
                  "from-amber-500 to-orange-500",
                  "from-blue-500 to-indigo-500",
                  "from-purple-500 to-pink-500",
                ];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-lg transition-all text-center group"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[i]} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                      {icons[i]}
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">{diff.title}</h4>
                    <p className="text-sm text-text-secondary">{diff.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== THE MATH ===== */}
      <motion.section
        className="py-20 bg-bg-secondary"
        onViewportEnter={() => trackSectionView("math")}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge icon={Icons.calculator} label="The Math" color="blue" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-3">
              Traditional vs. New Approach
            </h2>
          </div>

          {/* Comparison cards */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4">
              {page.comparison.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm"
                >
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div>
                      <p className="text-sm text-text-muted mb-1">{row.metric}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-text-muted line-through">{row.traditional}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-teal-500">{row.newApproach}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Math conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <div className="inline-block bg-teal-50 border border-teal-200 rounded-2xl px-8 py-4">
                <p className="text-lg font-medium text-teal-700">{page.mathConclusion}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== QUESTIONS ===== */}
      <motion.section
        className="py-20 bg-white"
        onViewportEnter={() => trackSectionView("questions")}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge icon={Icons.question} label="Worth Considering" color="purple" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-3">
              Questions for {page.companyName.split(" ")[0]}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {page.questionsIntro}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {page.questions.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 bg-purple-50/50 border border-purple-100 rounded-xl p-5"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-text-primary pt-1">{q}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== SOCIAL PROOF ===== */}
      <motion.section
        className="py-20 bg-bg-secondary"
        onViewportEnter={() => trackSectionView("social-proof")}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge icon={Icons.check} label="Proven Results" color="green" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-3">
              What Others Are Saying
            </h2>
          </div>

          {/* Featured Case Study */}
          <div className="max-w-4xl mx-auto mb-12">
            {(() => {
              // Pick most relevant case study based on industry
              const relevantCase = page.industry === "legal" || page.industry === "healthcare"
                ? caseStudies.find(cs => cs.slug === "agentic-document-intelligence")
                : caseStudies.find(cs => cs.slug === "army-of-ai-agents");

              if (!relevantCase) return null;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 border border-black/5 shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-teal-500 mb-1">Case Study</p>
                      <h3 className="text-xl font-bold text-text-primary">{relevantCase.title}</h3>
                      <p className="text-sm text-text-muted">{relevantCase.client} • {relevantCase.industry}</p>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-6">{relevantCase.challengeBrief}</p>

                  {/* Results grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {relevantCase.results.slice(0, 4).map((result, i) => (
                      <div key={i} className="text-center p-3 bg-bg-secondary rounded-lg">
                        <p className="text-2xl font-bold text-teal-500">
                          {result.prefix}{result.value}{result.suffix}
                        </p>
                        <p className="text-xs text-text-muted">{result.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/case-studies/${relevantCase.slug}`}
                    className="text-sm text-teal-500 hover:text-teal-600 font-medium inline-flex items-center gap-1"
                  >
                    Read full case study
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              );
            })()}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.slice(0, 2).map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-primary font-medium mb-4">"{testimonial.highlight}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">{testimonial.name}</p>
                    <p className="text-xs text-text-muted">{testimonial.title}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== CTA ===== */}
      <motion.section
        className="py-24 bg-gradient-to-r from-teal-500/5 via-bg-secondary to-teal-500/5"
        onViewportEnter={() => trackSectionView("cta")}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Next Step
              </h2>
              <p className="text-text-secondary text-lg">
                {page.ctaIntro}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?ref=prospect"
                onClick={handleCtaClick}
                className="px-8 py-4 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20"
              >
                Schedule a Conversation
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <p className="text-text-muted text-sm mb-4">Typical outcomes</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">6-8 weeks</p>
                  <p className="text-xs text-text-muted">To working system</p>
                </div>
                <div className="w-px h-8 bg-border hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">10x</p>
                  <p className="text-xs text-text-muted">Faster answers</p>
                </div>
                <div className="w-px h-8 bg-border hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">You own it</p>
                  <p className="text-xs text-text-muted">No subscriptions</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== ABOUT DATABENDER ===== */}
      <section className="py-12 bg-white border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            <p className="text-text-muted text-sm">
              Want to learn more about who we are?
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="text-sm text-text-secondary hover:text-teal-500 transition-colors underline underline-offset-2"
              >
                About Databender
              </Link>
              <span className="text-border">•</span>
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-teal-500 transition-colors underline underline-offset-2"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ProspectPageClient({ page }: Props) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated(page.slug)) {
      setIsUnlocked(true);
    }
    const visitCount = getVisitCount(page.slug);
    const sessionId = getSessionId(page.slug);
    if (visitCount > 1) {
      trackEvent(page.slug, "return_visit", { visitCount, sessionId });
    } else {
      trackEvent(page.slug, "page_opened", { sessionId });
    }
    setIsLoading(false);
  }, [page.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isUnlocked ? (
        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <ProspectContent page={page} />
        </motion.div>
      ) : (
        <motion.div key="gate" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <PasswordGate page={page} onSuccess={() => setIsUnlocked(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

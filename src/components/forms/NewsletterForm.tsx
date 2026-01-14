"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getVisitorId, getSessionId } from "@/lib/analytics/visitor-id";

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get visitor tracking data
      const visitorId = getVisitorId();
      const sessionId = getSessionId();
      const pageJourney = sessionStorage.getItem("db_session_journey");
      const sourcePage = window.location.pathname;

      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          formType: "newsletter",
          resourceSlug: "newsletter",
          resourceTitle: "Newsletter Subscription",
          submittedAt: new Date().toISOString(),
          visitorId,
          sessionId,
          pageJourney: pageJourney ? JSON.parse(pageJourney) : [],
          sourcePage,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Newsletter form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-2 text-teal-400 ${className}`}
      >
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm">Thanks for subscribing!</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 min-w-0 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2.5 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? "..." : "Subscribe"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-400 text-xs">{error}</p>
      )}
    </form>
  );
}

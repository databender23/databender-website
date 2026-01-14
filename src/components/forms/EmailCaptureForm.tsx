"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui";
import { getVisitorId, getSessionId } from "@/lib/analytics/visitor-id";

interface EmailCaptureFormProps {
  formType: "audit" | "guide" | "assessment";
  resourceSlug: string;
  resourceTitle: string;
  submitButtonText?: string;
  showCompanyField?: boolean;
  showPhoneField?: boolean;
  showMessageField?: boolean;
  onSuccess?: () => void;
  className?: string;
  downloadUrl?: string; // Direct download URL to show after success
}

export default function EmailCaptureForm({
  formType,
  resourceSlug,
  resourceTitle,
  submitButtonText = "Get Access",
  showCompanyField = true,
  showPhoneField = false,
  showMessageField = false,
  onSuccess,
  className = "",
  downloadUrl,
}: EmailCaptureFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          ...formData,
          formType,
          resourceSlug,
          resourceTitle,
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
      onSuccess?.();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center p-8 rounded-2xl bg-teal-500/10 border border-teal-500/20 ${className}`}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-teal-500"
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
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {formType === "audit" ? "Request Received!" : "You're In!"}
        </h3>
        <p className="text-text-secondary mb-4">
          {formType === "audit"
            ? "We'll review your information and reach out within 1 business day."
            : "Your guide is ready. We've also sent a copy to your email."}
        </p>
        {downloadUrl && formType === "guide" && (
          <div className="space-y-3">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Your Guide
            </a>
            <a
              href={`/resources/guides/${resourceSlug}/content`}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-teal-600 font-medium rounded-xl border border-teal-500/30 hover:bg-teal-500/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Online
            </a>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="Work Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {showCompanyField && (
        <Input
          label="Company / Firm"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      )}

      {showPhoneField && (
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
      )}

      {showMessageField && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tell us about your situation (optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
            placeholder="What challenges are you trying to solve?"
          />
        </div>
      )}

      {error && (
        <p className="text-error text-sm">{error}</p>
      )}

      <Button
        variant="primary"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : submitButtonText}
      </Button>

      <p className="text-text-muted text-xs text-center">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}

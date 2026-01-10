"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui";

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
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType,
          resourceSlug,
          resourceTitle,
          submittedAt: new Date().toISOString(),
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
        <p className="text-text-secondary">
          {formType === "audit"
            ? "We'll review your information and reach out within 1 business day."
            : "Check your email for access to your resource."}
        </p>
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

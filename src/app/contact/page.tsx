"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections";
import { Button, Input, Textarea } from "@/components/ui";

export default function ContactPage() {
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
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <>
        <Hero
          subtitle="Thank You"
          title="We'll be in touch soon"
          description="We've received your message and will get back to you within one business day."
          primaryCta={{ label: "Back to Home", href: "/" }}
        />
      </>
    );
  }

  return (
    <>
      <Hero
        subtitle="Contact Us"
        title="Let's talk about your data"
        description="Schedule a 30-minute call or send us a message. We'll talk about your situation and whether we can help."
      />

      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone (Optional)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Textarea
                  label="How can we help?"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                {error && (
                  <p className="text-error text-sm">{error}</p>
                )}

                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-h-[48px] text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">
                Schedule a consultation
              </h2>
              <p className="text-text-secondary mb-6 sm:mb-8">
                Prefer to talk? Schedule a 30-minute consultation. We&apos;ll discuss your current situation, challenges, and potential solutions—no obligations.
              </p>

              <div className="p-4 sm:p-6 rounded-xl bg-[#F8F9FA] border border-black/10 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">
                  What to expect
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-text-secondary">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    30-minute focused conversation
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-text-secondary">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Understand your current challenges
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-text-secondary">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Get initial recommendations
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-text-secondary">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No pressure, no obligations
                  </li>
                </ul>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-text-muted mb-1">Email</h3>
                  <a
                    href="mailto:info@databender.co"
                    className="text-teal-500 hover:text-teal-400 transition-colors"
                  >
                    info@databender.co
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

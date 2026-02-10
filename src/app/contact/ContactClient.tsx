"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/sections";
import { Button, Input, Textarea } from "@/components/ui";
import { getVisitorId, getSessionId } from "@/lib/analytics/visitor-id";

const TOTAL_STEPS = 3;

export default function ContactClient() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Get visitor tracking data
      const visitorId = getVisitorId();
      const sessionId = getSessionId();
      const pageJourney = sessionStorage.getItem("db_session_journey");
      const sourcePage = window.location.pathname;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          visitorId,
          sessionId,
          pageJourney: pageJourney ? JSON.parse(pageJourney) : [],
          sourcePage,
        }),
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

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceedStep1 = formData.firstName.trim() !== "" && formData.email.trim() !== "";
  const canProceedStep2 = true; // Company and phone are optional for step 2
  const canSubmit = formData.message.trim() !== "";

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
        title="Let's talk about what's possible"
        description="Schedule a 30-minute call or send us a message. Tell us what perfect looks like. We'll tell you how fast we can build it."
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

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Step {currentStep} of {TOTAL_STEPS}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 bg-[#F8F9FA] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Name & Email */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-6"
                    >
                      <p className="text-text-secondary mb-4">
                        Let&apos;s start with the basics
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          autoFocus
                        />
                        <Input
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
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
                      <div className="flex justify-end pt-4">
                        <Button
                          variant="primary"
                          onClick={handleNext}
                          disabled={!canProceedStep1}
                          className="min-h-[48px]"
                          icon={
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          }
                        >
                          Continue
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Company & Phone */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-6"
                    >
                      <p className="text-text-secondary mb-4">
                        Tell us about your company (optional)
                      </p>
                      <Input
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        autoFocus
                      />
                      <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <div className="flex justify-between pt-4">
                        <Button
                          variant="secondary"
                          onClick={handleBack}
                          className="min-h-[48px]"
                        >
                          Back
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleNext}
                          disabled={!canProceedStep2}
                          className="min-h-[48px]"
                          icon={
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          }
                        >
                          Continue
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-6"
                    >
                      <p className="text-text-secondary mb-4">
                        How can we help?
                      </p>
                      <Textarea
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        autoFocus
                        placeholder="Tell us about your project, challenges, or questions..."
                      />

                      {error && (
                        <p className="text-error text-sm">{error}</p>
                      )}

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="secondary"
                          onClick={handleBack}
                          className="min-h-[48px]"
                        >
                          Back
                        </Button>
                        <Button
                          variant="primary"
                          disabled={isSubmitting || !canSubmit}
                          className="min-h-[48px] text-base"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                Prefer to talk? Schedule a 30-minute consultation. We&apos;ll discuss your current situation, challenges, and potential solutions. No obligations.
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import {
  manufacturingQuestions,
  calculateManufacturingScores,
} from "@/lib/manufacturing-assessment";

export default function ManufacturingClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    revenue: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = manufacturingQuestions.length + 1; // +1 for contact form
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentQuestion = manufacturingQuestions[currentStep];
  const isLastQuestion = currentStep === manufacturingQuestions.length - 1;
  const isContactStep = currentStep === manufacturingQuestions.length;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

    // Auto-advance after short delay
    setTimeout(() => {
      if (isLastQuestion) {
        setCurrentStep(manufacturingQuestions.length);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setContactInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scores = calculateManufacturingScores(answers);

    try {
      // Store results in sessionStorage for results page
      sessionStorage.setItem(
        "manufacturingAssessmentResults",
        JSON.stringify({ scores, contactInfo, answers })
      );

      // Submit to API
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "manufacturing",
          answers,
          scores,
          contact: contactInfo,
        }),
      });

      router.push("/assessments/manufacturing/results");
    } catch (error) {
      console.error("Assessment submission error:", error);
      router.push("/assessments/manufacturing/results");
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "dataInfrastructure":
        return "Data Infrastructure";
      case "salesProduction":
        return "Sales & Production";
      case "visibility":
        return "Operational Visibility";
      case "automation":
        return "Automation & AI";
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 h-1 bg-[#F8F9FA] z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-teal-300"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link
              href="/industries/manufacturing"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm mb-4 inline-block"
            >
              ← Back to Manufacturing
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Manufacturing Operations Assessment
            </h1>
            <p className="text-text-secondary">
              See where you're losing time to spreadsheets, phone calls, and firefighting
            </p>
          </motion.div>

          {/* Question/Contact Form */}
          <AnimatePresence mode="wait">
            {!isContactStep ? (
              // Question Step
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-teal-500 text-sm font-medium">
                      Question {currentStep + 1} of {manufacturingQuestions.length}
                    </span>
                    <span className="text-text-muted text-sm">
                      {getCategoryLabel(currentQuestion.category)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary mt-2">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        answers[currentQuestion.id] === option.value
                          ? "bg-teal-500/10 border-teal-500"
                          : "bg-[#F8F9FA] border-black/10 hover:border-teal-500/50"
                      }`}
                    >
                      <span className="block text-text-primary font-medium">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="block text-text-muted text-sm mt-1">
                          {option.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-8 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              // Contact Step
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <span className="text-teal-500 text-sm font-medium">
                    Almost done!
                  </span>
                  <h2 className="text-2xl font-semibold text-text-primary mt-2">
                    Where should we send your results?
                  </h2>
                  <p className="text-text-secondary mt-2">
                    We&apos;ll email you a detailed report with personalized
                    recommendations for your growth stage.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={contactInfo.firstName}
                      onChange={handleContactChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={contactInfo.lastName}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                  <Input
                    label="Work Email"
                    name="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={handleContactChange}
                    required
                  />
                  <Input
                    label="Company"
                    name="company"
                    value={contactInfo.company}
                    onChange={handleContactChange}
                    required
                  />
                  <Input
                    label="Your Role"
                    name="role"
                    value={contactInfo.role}
                    onChange={handleContactChange}
                    placeholder="e.g., CEO, COO, VP Operations"
                  />
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Annual Revenue
                    </label>
                    <select
                      name="revenue"
                      value={contactInfo.revenue}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                    >
                      <option value="">Select range</option>
                      <option value="5-10m">$5M - $10M</option>
                      <option value="10-25m">$10M - $25M</option>
                      <option value="25-50m">$25M - $50M</option>
                      <option value="50-100m">$50M - $100M</option>
                      <option value="100m+">$100M+</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Processing..." : "Get My Results"}
                    </Button>
                  </div>
                </form>

                <button
                  onClick={handleBack}
                  className="mt-8 text-text-secondary hover:text-text-primary transition-colors"
                >
                  ← Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

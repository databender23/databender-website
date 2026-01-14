"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import {
  legalQuestions,
  calculateLegalScores,
} from "@/lib/legal-assessment";

export default function LegalClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    firmSize: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = legalQuestions.length + 1; // +1 for contact form
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentQuestion = legalQuestions[currentStep];
  const isLastQuestion = currentStep === legalQuestions.length - 1;
  const isContactStep = currentStep === legalQuestions.length;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

    // Auto-advance after short delay
    setTimeout(() => {
      if (isLastQuestion) {
        setCurrentStep(legalQuestions.length);
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

    const scores = calculateLegalScores(answers);

    try {
      // Store results in sessionStorage for results page
      sessionStorage.setItem(
        "legalAssessmentResults",
        JSON.stringify({ scores, contactInfo, answers })
      );

      // Submit to API
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "legal",
          answers,
          scores,
          contact: contactInfo,
        }),
      });

      router.push("/assessments/legal/results");
    } catch (error) {
      console.error("Assessment submission error:", error);
      router.push("/assessments/legal/results");
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "aiOpportunity":
        return "AI Opportunity";
      case "dataReadiness":
        return "Data Readiness";
      case "privacyPosture":
        return "Privacy Posture";
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
              href="/industries/legal"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm mb-4 inline-block"
            >
              ← Back to Legal Solutions
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Legal AI Readiness Assessment
            </h1>
            <p className="text-text-secondary">
              Discover if your firm is ready to adopt AI while protecting
              attorney-client privilege
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
                      Question {currentStep + 1} of {legalQuestions.length}
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
                    recommendations for your firm.
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
                    label="Firm Name"
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
                    placeholder="e.g., Partner, Associate, CIO, Director of IT"
                  />
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Firm Size
                    </label>
                    <select
                      name="firmSize"
                      value={contactInfo.firmSize}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">Solo / Small (1-10 attorneys)</option>
                      <option value="11-50">Mid-size (11-50 attorneys)</option>
                      <option value="51-200">Large (51-200 attorneys)</option>
                      <option value="200+">Am Law 200 (200+ attorneys)</option>
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from "@/components/ui";
import { assessmentQuestions, calculateScores } from "@/lib/assessment-scoring";

export default function DataAIReadinessClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = assessmentQuestions.length + 1; // +1 for contact form
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentQuestion = assessmentQuestions[currentStep];
  const isLastQuestion = currentStep === assessmentQuestions.length - 1;
  const isContactStep = currentStep === assessmentQuestions.length;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

    // Auto-advance after short delay
    setTimeout(() => {
      if (isLastQuestion) {
        setCurrentStep(assessmentQuestions.length); // Go to contact step
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

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scores = calculateScores(answers);

    try {
      // Store results in sessionStorage for results page
      sessionStorage.setItem(
        "assessmentResults",
        JSON.stringify({ scores, contactInfo, answers })
      );

      // Submit to API
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, scores, contact: contactInfo }),
      });

      // Navigate to results
      router.push("/assessments/data-ai-readiness/results");
    } catch (error) {
      console.error("Assessment submission error:", error);
      // Still navigate to results - they can view offline
      router.push("/assessments/data-ai-readiness/results");
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

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
              Data & AI Readiness Assessment
            </h1>
            <p className="text-text-secondary text-sm sm:text-base">
              Answer a few questions to get personalized recommendations
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
                <div className="mb-6 sm:mb-8">
                  <span className="text-teal-500 text-xs sm:text-sm font-medium">
                    Question {currentStep + 1} of {assessmentQuestions.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mt-2">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 min-h-[56px] ${
                        answers[currentQuestion.id] === option.value
                          ? "bg-teal-500/10 border-teal-500"
                          : "bg-[#F8F9FA] border-black/10 hover:border-teal-500/50"
                      }`}
                    >
                      <span className="block text-text-primary font-medium text-sm sm:text-base">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="block text-text-muted text-xs sm:text-sm mt-1">
                          {option.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 sm:mt-8 text-text-secondary hover:text-text-primary transition-colors min-h-[44px] py-2"
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
                <div className="mb-6 sm:mb-8">
                  <span className="text-teal-500 text-xs sm:text-sm font-medium">
                    Almost done!
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mt-2">
                    Where should we send your results?
                  </h2>
                  <p className="text-text-secondary text-sm sm:text-base mt-2">
                    We&apos;ll email you a detailed report with personalized recommendations.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="pt-4">
                    <Button
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full min-h-[48px]"
                    >
                      {isSubmitting ? "Processing..." : "Get My Results"}
                    </Button>
                  </div>
                </form>

                <button
                  onClick={handleBack}
                  className="mt-6 sm:mt-8 text-text-secondary hover:text-text-primary transition-colors min-h-[44px] py-2"
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

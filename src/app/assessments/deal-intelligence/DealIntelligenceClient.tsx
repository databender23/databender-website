"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import {
  profileQuestions,
  dealQuestions,
  calculateDealScores,
  DealProfile,
} from "@/lib/cre-deal-assessment";

export default function DealIntelligenceClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<DealProfile>({
    companyName: "",
    dealVolume: "",
    propertyTypes: [],
    teamSize: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    phone: "",
    biggestChallenge: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile questions (4) + Assessment questions (10) + Contact form (1)
  const profileSteps = profileQuestions.length;
  const assessmentSteps = dealQuestions.length;
  const totalSteps = profileSteps + assessmentSteps + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const isProfileStep = currentStep < profileSteps;
  const isAssessmentStep = currentStep >= profileSteps && currentStep < profileSteps + assessmentSteps;
  const isContactStep = currentStep === profileSteps + assessmentSteps;

  const currentProfileQuestion = isProfileStep ? profileQuestions[currentStep] : null;
  const currentAssessmentQuestion = isAssessmentStep
    ? dealQuestions[currentStep - profileSteps]
    : null;

  const canProceed = () => {
    if (isProfileStep && currentProfileQuestion) {
      const q = currentProfileQuestion;
      if (!q.required) return true;
      if (q.type === "text") return (profile[q.id as keyof DealProfile] as string)?.length > 0;
      if (q.type === "select") return (profile[q.id as keyof DealProfile] as string)?.length > 0;
      if (q.type === "multiselect") return (profile[q.id as keyof DealProfile] as string[])?.length > 0;
    }
    return true;
  };

  const handleProfileSelect = (questionId: string, value: string) => {
    setProfile((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 300);
  };

  const handleProfileMultiSelect = (questionId: string, value: string) => {
    setProfile((prev) => {
      const current = prev[questionId as keyof DealProfile] as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleProfileText = (questionId: string, value: string) => {
    setProfile((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleAnswer = (value: number) => {
    if (!currentAssessmentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentAssessmentQuestion.id]: value }));

    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setContactInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scores = calculateDealScores(answers, profile);

    try {
      sessionStorage.setItem(
        "dealAssessmentResults",
        JSON.stringify({ scores, contactInfo, answers, profile })
      );

      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "deal-intelligence",
          answers,
          scores,
          profile,
          contact: contactInfo,
        }),
      });

      router.push("/assessments/deal-intelligence/results");
    } catch (error) {
      console.error("Assessment submission error:", error);
      router.push("/assessments/deal-intelligence/results");
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "ownershipData":
        return "Ownership Data";
      case "dueDiligence":
        return "Due Diligence";
      case "pipelinePrioritization":
        return "Pipeline Prioritization";
      default:
        return category;
    }
  };

  const roleOptions = [
    { value: "", label: "Select your role" },
    { value: "broker", label: "Investment Sales Broker" },
    { value: "acquisitions", label: "Acquisitions / Deal Team" },
    { value: "principal", label: "Principal / Partner" },
    { value: "asset-manager", label: "Asset Manager" },
    { value: "analyst", label: "Analyst" },
    { value: "other", label: "Other" },
  ];

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
              href="/industries/commercial-real-estate"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm mb-4 inline-block"
            >
              &#8592; Back to Commercial Real Estate
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Deal Intelligence Assessment
            </h1>
            <p className="text-text-secondary">
              See how fast you&apos;re finding owners, reviewing data rooms, and
              prioritizing your pipeline
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isProfileStep && currentProfileQuestion ? (
              <motion.div
                key={currentProfileQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-teal-500 text-sm font-medium">
                      Company Profile
                    </span>
                    <span className="text-text-muted text-sm">
                      Step {currentStep + 1} of {totalSteps}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary mt-2">
                    {currentProfileQuestion.question}
                  </h2>
                </div>

                {currentProfileQuestion.type === "select" && (
                  <div className="space-y-3">
                    {currentProfileQuestion.options?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleProfileSelect(currentProfileQuestion.id, option.value)
                        }
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                          profile[currentProfileQuestion.id as keyof DealProfile] === option.value
                            ? "bg-teal-500/10 border-teal-500"
                            : "bg-[#F8F9FA] border-black/10 hover:border-teal-500/50"
                        }`}
                      >
                        <span className="block text-text-primary font-medium">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {currentProfileQuestion.type === "multiselect" && (
                  <>
                    <div className="space-y-3 mb-6">
                      {currentProfileQuestion.options?.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleProfileMultiSelect(currentProfileQuestion.id, option.value)
                          }
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                            (profile[currentProfileQuestion.id as keyof DealProfile] as string[])?.includes(
                              option.value
                            )
                              ? "bg-teal-500/10 border-teal-500"
                              : "bg-[#F8F9FA] border-black/10 hover:border-teal-500/50"
                          }`}
                        >
                          <span className="block text-text-primary font-medium">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </>
                )}

                {currentProfileQuestion.type === "text" && (
                  <>
                    <Input
                      value={(profile[currentProfileQuestion.id as keyof DealProfile] as string) || ""}
                      onChange={(e) =>
                        handleProfileText(currentProfileQuestion.id, e.target.value)
                      }
                      placeholder="Enter company name"
                      className="mb-6"
                    />
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      className="w-full"
                    >
                      {currentProfileQuestion.required ? "Continue" : "Skip / Continue"}
                    </Button>
                  </>
                )}

                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-8 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    &#8592; Back
                  </button>
                )}
              </motion.div>
            ) : isAssessmentStep && currentAssessmentQuestion ? (
              <motion.div
                key={currentAssessmentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-teal-500 text-sm font-medium">
                      Question {currentStep - profileSteps + 1} of {assessmentSteps}
                    </span>
                    <span className="text-text-muted text-sm">
                      {getCategoryLabel(currentAssessmentQuestion.category)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary mt-2">
                    {currentAssessmentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentAssessmentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        answers[currentAssessmentQuestion.id] === option.value
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

                <button
                  onClick={handleBack}
                  className="mt-8 text-text-secondary hover:text-text-primary transition-colors"
                >
                  &#8592; Back
                </button>
              </motion.div>
            ) : isContactStep ? (
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
                    recommendations for your deal flow.
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
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Your Role
                    </label>
                    <select
                      name="role"
                      value={contactInfo.role}
                      onChange={handleContactChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={handleContactChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      What&apos;s your biggest deal flow challenge? (optional)
                    </label>
                    <textarea
                      name="biggestChallenge"
                      value={contactInfo.biggestChallenge}
                      onChange={handleContactChange}
                      rows={3}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors resize-none"
                    />
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
                  &#8592; Back
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { CTA } from "@/components/sections";

interface FormData {
  organizationType: string;
  state: string;
  bedCount: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
}

export default function HealthcareBenchmarkClient() {
  const [step, setStep] = useState<"preview" | "form" | "success">("preview");
  const [formData, setFormData] = useState<FormData>({
    organizationType: "",
    state: "",
    bedCount: "",
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePreviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("form");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "assessment",
          resourceSlug: "healthcare-benchmark",
          resourceTitle: "Healthcare Price Transparency Benchmark",
          submittedAt: new Date().toISOString(),
        }),
      });

      setStep("success");
    } catch (error) {
      console.error("Submission error:", error);
      setStep("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample benchmark data for preview
  const sampleBenchmarks = [
    { procedure: "MRI Brain w/o Contrast", yourRange: "$800 - $1,200", marketMedian: "$950", percentile: "45th" },
    { procedure: "CT Abdomen w/ Contrast", yourRange: "$600 - $900", marketMedian: "$750", percentile: "52nd" },
    { procedure: "X-Ray Chest 2 Views", yourRange: "$100 - $150", marketMedian: "$125", percentile: "48th" },
    { procedure: "Mammogram Screening", yourRange: "$150 - $250", marketMedian: "$200", percentile: "55th" },
  ];

  if (step === "success") {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-500/20 flex items-center justify-center"
            >
              <svg
                className="w-10 h-10 text-teal-500"
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
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Request Received!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-text-secondary text-lg mb-8"
            >
              Thanks, {formData.firstName}! Our team will prepare your
              personalized Price Transparency Benchmark report for{" "}
              {formData.organization}. Expect to hear from us within 1-2
              business days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" href="/industries/healthcare">
                Explore Healthcare Solutions
              </Button>
              <Button variant="secondary" href="/contact">
                Schedule a Call
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link
              href="/industries/healthcare"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm mb-4 inline-block"
            >
              ← Back to Healthcare
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Healthcare Price Transparency Benchmark
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              See how your pricing compares to competitors in your market.
              Get a preview of your competitive position.
            </p>
          </motion.div>

          {step === "preview" ? (
            <>
              {/* Preview Step */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              >
                {/* Left - Form */}
                <div className="bg-white rounded-2xl p-8 border border-black/10">
                  <h2 className="text-xl font-bold text-text-primary mb-2">
                    Get Your Preview
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Tell us about your organization to see sample benchmarks
                  </p>

                  <form onSubmit={handlePreviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Organization Type
                      </label>
                      <select
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                      >
                        <option value="">Select type</option>
                        <option value="hospital">Hospital</option>
                        <option value="health-system">Health System</option>
                        <option value="ambulatory">Ambulatory Surgery Center</option>
                        <option value="imaging">Imaging Center</option>
                        <option value="urgent-care">Urgent Care</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                      >
                        <option value="">Select state</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                        <option value="NY">New York</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="IL">Illinois</option>
                        <option value="OH">Ohio</option>
                        <option value="GA">Georgia</option>
                        <option value="NC">North Carolina</option>
                        <option value="MI">Michigan</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {(formData.organizationType === "hospital" ||
                      formData.organizationType === "health-system") && (
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Bed Count
                        </label>
                        <select
                          name="bedCount"
                          value={formData.bedCount}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                        >
                          <option value="">Select range</option>
                          <option value="1-50">1-50 beds</option>
                          <option value="51-100">51-100 beds</option>
                          <option value="101-250">101-250 beds</option>
                          <option value="251-500">251-500 beds</option>
                          <option value="500+">500+ beds</option>
                        </select>
                      </div>
                    )}

                    <Button variant="primary" className="w-full mt-6">
                      See Sample Benchmarks
                    </Button>
                  </form>
                </div>

                {/* Right - What You'll Get */}
                <div className="bg-[#F8F9FA] rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-text-primary mb-4">
                    What&apos;s Included
                  </h2>

                  <ul className="space-y-4">
                    {[
                      "Comparison to regional competitors",
                      "Percentile ranking by procedure category",
                      "Price opportunity analysis",
                      "Payer-specific insights",
                      "Compliance risk indicators",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5"
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
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 bg-teal-500/10 rounded-xl">
                    <p className="text-sm text-text-secondary">
                      <span className="font-semibold text-text-primary">
                        Full benchmark reports
                      </span>{" "}
                      include detailed procedure-level analysis across 500+
                      shoppable services, customized for your specific market and
                      payer mix.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sample Data Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 border border-black/10 mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    Sample Benchmark Preview
                  </h2>
                  <span className="text-sm text-text-muted bg-black/5 px-3 py-1 rounded-full">
                    Demo Data
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/10">
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">
                          Procedure
                        </th>
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">
                          Your Price Range
                        </th>
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">
                          Market Median
                        </th>
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">
                          Your Percentile
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleBenchmarks.map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-black/5 last:border-0"
                        >
                          <td className="py-3 px-4 text-text-secondary">
                            {row.procedure}
                          </td>
                          <td className="py-3 px-4 text-text-secondary blur-sm select-none">
                            {row.yourRange}
                          </td>
                          <td className="py-3 px-4 text-text-secondary blur-sm select-none">
                            {row.marketMedian}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-text-secondary blur-sm select-none">
                              {row.percentile}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-text-muted text-sm mb-4">
                    Complete the form above to unlock your personalized preview
                  </p>
                </div>
              </motion.div>
            </>
          ) : (
            /* Full Form Step */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-8 border border-black/10">
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  Get Your Full Benchmark Report
                </h2>
                <p className="text-text-secondary mb-6">
                  We&apos;ll prepare a personalized benchmark analysis for your
                  organization
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                    label="Organization Name"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Your Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g., CFO, Revenue Cycle Director"
                  />

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setStep("preview")}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Get My Report"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* CTA */}
      <CTA
        title="Need a full pricing analysis?"
        description="Our Price Transparency solutions help healthcare organizations optimize pricing, ensure compliance, and improve competitive positioning."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Learn More", href: "/industries/healthcare" }}
        variant="gradient"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { CTA } from "@/components/sections";

interface CustomerSegment {
  name: string;
  revenue: number;
  grossMarginPercent: number;
  orderFrequency: number; // orders per month
  avgDeliveryDistance: number; // miles
  returnsPercent: number;
  serviceHoursPerMonth: number;
}

interface CalculatedSegment extends CustomerSegment {
  grossProfit: number;
  costToServe: number;
  netProfit: number;
  netMarginPercent: number;
}

const defaultSegments: CustomerSegment[] = [
  {
    name: "Large Accounts",
    revenue: 500000,
    grossMarginPercent: 22,
    orderFrequency: 20,
    avgDeliveryDistance: 25,
    returnsPercent: 3,
    serviceHoursPerMonth: 8,
  },
  {
    name: "Mid-Size Accounts",
    revenue: 150000,
    grossMarginPercent: 28,
    orderFrequency: 8,
    avgDeliveryDistance: 15,
    returnsPercent: 2,
    serviceHoursPerMonth: 3,
  },
  {
    name: "Small Accounts",
    revenue: 25000,
    grossMarginPercent: 35,
    orderFrequency: 2,
    avgDeliveryDistance: 20,
    returnsPercent: 4,
    serviceHoursPerMonth: 1,
  },
];

// Cost assumptions (can be customized)
const COST_PER_ORDER = 45; // picking, packing, processing
const COST_PER_MILE = 2.5; // delivery cost
const COST_PER_SERVICE_HOUR = 75; // customer service, sales support
const RETURN_PROCESSING_COST_PERCENT = 15; // % of returned goods value

export default function CustomerProfitabilityCalculatorClient() {
  const [step, setStep] = useState<"input" | "contact" | "results">("input");
  const [segments, setSegments] = useState<CustomerSegment[]>(defaultSegments);
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState<CalculatedSegment[]>([]);

  const calculateProfitability = (segment: CustomerSegment): CalculatedSegment => {
    const grossProfit = segment.revenue * (segment.grossMarginPercent / 100);

    // Calculate cost-to-serve
    const orderCosts = segment.orderFrequency * 12 * COST_PER_ORDER;
    const deliveryCosts = segment.orderFrequency * 12 * segment.avgDeliveryDistance * COST_PER_MILE;
    const serviceCosts = segment.serviceHoursPerMonth * 12 * COST_PER_SERVICE_HOUR;
    const returnCosts = segment.revenue * (segment.returnsPercent / 100) * RETURN_PROCESSING_COST_PERCENT;

    const costToServe = orderCosts + deliveryCosts + serviceCosts + returnCosts;
    const netProfit = grossProfit - costToServe;
    const netMarginPercent = (netProfit / segment.revenue) * 100;

    return {
      ...segment,
      grossProfit,
      costToServe,
      netProfit,
      netMarginPercent,
    };
  };

  const handleSegmentChange = (index: number, field: keyof CustomerSegment, value: string | number) => {
    const newSegments = [...segments];
    newSegments[index] = {
      ...newSegments[index],
      [field]: typeof value === "string" ? value : Number(value),
    };
    setSegments(newSegments);
  };

  const handleCalculate = () => {
    const results = segments.map(calculateProfitability);
    setCalculatedResults(results);
    setStep("contact");
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

    try {
      await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "customer-profitability-calculator",
          contact: contactInfo,
          segments: calculatedResults,
        }),
      });
    } catch (error) {
      console.error("Lead capture error:", error);
    }

    setIsSubmitting(false);
    setStep("results");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Calculate totals for results
  const totalRevenue = calculatedResults.reduce((sum, s) => sum + s.revenue, 0);
  const totalGrossProfit = calculatedResults.reduce((sum, s) => sum + s.grossProfit, 0);
  const totalCostToServe = calculatedResults.reduce((sum, s) => sum + s.costToServe, 0);
  const totalNetProfit = calculatedResults.reduce((sum, s) => sum + s.netProfit, 0);
  const avgNetMargin = totalRevenue > 0 ? (totalNetProfit / totalRevenue) * 100 : 0;

  // Sort for whale curve (best to worst margin)
  const sortedResults = [...calculatedResults].sort((a, b) => b.netMarginPercent - a.netMarginPercent);

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
              href="/industries/wholesale-distribution"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm mb-4 inline-block"
            >
              &larr; Back to Wholesale Distribution
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Customer Profitability Calculator
            </h1>
            <p className="text-text-secondary text-lg">
              Your top customers by revenue might not be your top customers by profit.
              <br />
              See the real picture in 2 minutes.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Intro */}
                <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
                  <h2 className="font-semibold text-text-primary mb-2">How this works</h2>
                  <p className="text-text-secondary text-sm">
                    Enter data for up to 3 customer segments. We calculate true profitability after cost-to-serve: order processing, delivery, service time, and returns.
                    The results often surprise people.
                  </p>
                </div>

                {/* Segment Inputs */}
                <div className="space-y-8">
                  {segments.map((segment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-black/10 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <input
                          type="text"
                          value={segment.name}
                          onChange={(e) => handleSegmentChange(index, "name", e.target.value)}
                          className="text-lg font-semibold text-text-primary bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                        <span className="text-teal-500 text-sm font-medium">
                          Segment {index + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Annual Revenue
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                            <input
                              type="number"
                              value={segment.revenue}
                              onChange={(e) => handleSegmentChange(index, "revenue", e.target.value)}
                              className="w-full pl-7 pr-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Gross Margin %
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={segment.grossMarginPercent}
                              onChange={(e) => handleSegmentChange(index, "grossMarginPercent", e.target.value)}
                              className="w-full pl-3 pr-7 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Orders/Month
                          </label>
                          <input
                            type="number"
                            value={segment.orderFrequency}
                            onChange={(e) => handleSegmentChange(index, "orderFrequency", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Avg Delivery Miles
                          </label>
                          <input
                            type="number"
                            value={segment.avgDeliveryDistance}
                            onChange={(e) => handleSegmentChange(index, "avgDeliveryDistance", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Return Rate %
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={segment.returnsPercent}
                              onChange={(e) => handleSegmentChange(index, "returnsPercent", e.target.value)}
                              className="w-full pl-3 pr-7 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Service Hrs/Month
                          </label>
                          <input
                            type="number"
                            value={segment.serviceHoursPerMonth}
                            onChange={(e) => handleSegmentChange(index, "serviceHoursPerMonth", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Assumptions Note */}
                <div className="mt-6 text-sm text-text-muted">
                  <p>
                    <strong>Cost assumptions:</strong> $45/order processing, $2.50/mile delivery, $75/hr service time, 15% return processing cost.
                    These are industry averages. Your actual costs may differ.
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <Button variant="primary" size="lg" onClick={handleCalculate}>
                    Calculate Profitability
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Preview */}
                <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 rounded-xl p-6 mb-8 border border-teal-500/20">
                  <h2 className="font-semibold text-text-primary mb-4">Results Preview</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary">{formatCurrency(totalRevenue)}</div>
                      <div className="text-sm text-text-muted">Total Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary">{formatCurrency(totalGrossProfit)}</div>
                      <div className="text-sm text-text-muted">Gross Profit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">{formatCurrency(totalCostToServe)}</div>
                      <div className="text-sm text-text-muted">Cost to Serve</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${totalNetProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {formatCurrency(totalNetProfit)}
                      </div>
                      <div className="text-sm text-text-muted">True Profit</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-black/10 p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Get your full analysis
                  </h2>
                  <p className="text-text-secondary mb-6">
                    See the complete breakdown by segment, whale curve visualization, and recommendations.
                  </p>

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
                      placeholder="e.g., CEO, CFO, VP Sales"
                    />

                    <div className="pt-4">
                      <Button variant="primary" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Processing..." : "See Full Results"}
                      </Button>
                    </div>
                  </form>
                </div>

                <button
                  onClick={() => setStep("input")}
                  className="mt-6 text-text-secondary hover:text-text-primary transition-colors"
                >
                  &larr; Back to edit inputs
                </button>
              </motion.div>
            )}

            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Summary */}
                <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 rounded-xl p-6 mb-8 border border-teal-500/20">
                  <h2 className="font-semibold text-text-primary mb-4">
                    {contactInfo.company}&apos;s Profitability Summary
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-text-primary">{formatCurrency(totalRevenue)}</div>
                      <div className="text-xs text-text-muted">Total Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-text-primary">{formatCurrency(totalGrossProfit)}</div>
                      <div className="text-xs text-text-muted">Gross Profit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-500">{formatCurrency(totalCostToServe)}</div>
                      <div className="text-xs text-text-muted">Cost to Serve</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-xl font-bold ${totalNetProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {formatCurrency(totalNetProfit)}
                      </div>
                      <div className="text-xs text-text-muted">True Profit</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-xl font-bold ${avgNetMargin >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {formatPercent(avgNetMargin)}
                      </div>
                      <div className="text-xs text-text-muted">True Margin</div>
                    </div>
                  </div>
                </div>

                {/* Segment Breakdown */}
                <div className="bg-white rounded-xl border border-black/10 p-6 mb-8">
                  <h3 className="font-semibold text-text-primary mb-4">Segment Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-black/10">
                          <th className="text-left py-2 font-medium text-text-secondary">Segment</th>
                          <th className="text-right py-2 font-medium text-text-secondary">Revenue</th>
                          <th className="text-right py-2 font-medium text-text-secondary">Gross Profit</th>
                          <th className="text-right py-2 font-medium text-text-secondary">Cost to Serve</th>
                          <th className="text-right py-2 font-medium text-text-secondary">True Profit</th>
                          <th className="text-right py-2 font-medium text-text-secondary">True Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculatedResults.map((segment, index) => (
                          <tr key={index} className="border-b border-black/5">
                            <td className="py-3 font-medium text-text-primary">{segment.name}</td>
                            <td className="py-3 text-right text-text-secondary">{formatCurrency(segment.revenue)}</td>
                            <td className="py-3 text-right text-text-secondary">{formatCurrency(segment.grossProfit)}</td>
                            <td className="py-3 text-right text-red-500">{formatCurrency(segment.costToServe)}</td>
                            <td className={`py-3 text-right font-medium ${segment.netProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {formatCurrency(segment.netProfit)}
                            </td>
                            <td className={`py-3 text-right font-medium ${segment.netMarginPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {formatPercent(segment.netMarginPercent)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Whale Curve Visualization */}
                <div className="bg-white rounded-xl border border-black/10 p-6 mb-8">
                  <h3 className="font-semibold text-text-primary mb-2">The Whale Curve</h3>
                  <p className="text-text-secondary text-sm mb-6">
                    This is how profit concentrates across your customer base.
                    Most distributors find their top 20% of customers generate 150-300% of profits, while the bottom 20% lose money.
                  </p>

                  <div className="space-y-3">
                    {sortedResults.map((segment, index) => {
                      const maxProfit = Math.max(...sortedResults.map(s => Math.abs(s.netProfit)));
                      const barWidth = maxProfit > 0 ? (Math.abs(segment.netProfit) / maxProfit) * 100 : 0;
                      const isPositive = segment.netProfit >= 0;

                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-medium text-text-primary truncate">
                            {segment.name}
                          </div>
                          <div className="flex-1 h-8 bg-black/5 rounded-lg overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${barWidth}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={`h-full rounded-lg ${isPositive ? "bg-green-500" : "bg-red-500"}`}
                            />
                          </div>
                          <div className={`w-24 text-right text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                            {formatCurrency(segment.netProfit)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Insights */}
                <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-text-primary mb-4">What This Means</h3>
                  <ul className="space-y-3">
                    {sortedResults[0] && sortedResults[0].netMarginPercent > sortedResults[sortedResults.length - 1].netMarginPercent + 5 && (
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-text-secondary">
                          Your <strong className="text-text-primary">{sortedResults[0].name}</strong> segment has the highest true margin at {formatPercent(sortedResults[0].netMarginPercent)}.
                          Consider what makes these customers profitable and look for more like them.
                        </span>
                      </li>
                    )}
                    {sortedResults.some(s => s.netProfit < 0) && (
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-text-secondary">
                          Some segments are <strong className="text-red-500">losing money</strong> after cost-to-serve.
                          These customers need repricing, service level adjustments, or hard conversations.
                        </span>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-text-secondary">
                        This analysis uses industry-average costs. Your actual cost-to-serve data would make this more precise.
                        That&apos;s what we help distributors build.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" href="/contact">
                    Discuss Your Results
                  </Button>
                  <Button variant="secondary" size="lg" href="/industries/wholesale-distribution#guides">
                    Get the Full Guide
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <CTA
        title="Want the real numbers?"
        description="This calculator uses industry averages. We can help you build true customer profitability analytics with your actual cost data."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take the Assessment", href: "/assessments/distribution" }}
        variant="gradient"
      />
    </div>
  );
}

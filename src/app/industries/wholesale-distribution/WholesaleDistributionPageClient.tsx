"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { industryContent } from "@/lib/industries-data";
import { distributionGuides } from "@/lib/lead-magnets-data";

const DISTRIBUTION_LOTTIE_URL = "/animations/wholesale-distribution.json";

export default function WholesaleDistributionPageClient() {
  const content = industryContent["wholesale-distribution"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={DISTRIBUTION_LOTTIE_URL}
            className="mb-6"
            loop={true}
            heroTextHeight={280}
            maxSize={420}
            minSize={200}
          />

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Link
                href="/industries"
                className="text-text-secondary hover:text-teal-500 transition-colors text-sm"
              >
                Industries
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-teal-500 text-sm font-medium">Wholesale Distribution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Wholesale Distribution
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
            >
              Too much cash tied up in the wrong inventory. Customer profitability invisible until year-end. Pricing in spreadsheets. Amazon uses data to win. Now you can too.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
            >
              <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto min-h-[48px]">
                Schedule Consultation
              </Button>
              <Button variant="secondary" size="lg" href="/assessments/distribution" className="w-full sm:w-auto min-h-[48px]">
                Take Readiness Assessment
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
            >
              Common Challenges
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6 sm:mb-8"
            >
              Sound familiar?
            </motion.h2>

            <ul className="space-y-3 sm:space-y-4">
              {content.challenges.map((challenge, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-6 h-6 text-error flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-text-secondary text-base sm:text-lg">{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Inventory Intelligence Section */}
      <section id="inventory" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
                >
                  Inventory Intelligence
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Free Up Cash Tied in Dead Stock
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    20-40% of your revenue is tied up in inventory. But too much of it is the wrong stuff. Slow movers sit for months. Fast movers stock out. Your forecasting is based on &quot;last year plus 10%.&quot;
                  </p>
                  <p>
                    We build inventory intelligence that actually predicts demand. Seasonality. Trends. Sales pipeline. Dead stock flagged automatically. Reorder points optimized by SKU.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button variant="secondary" href="/resources/guides/inventory-intelligence-guide" className="min-h-[48px]">
                    Get the Guide
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-5 sm:p-8 rounded-2xl border border-teal-500/20"
              >
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6">
                  What changes
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Dead stock flagged automatically",
                      description: "SKUs that haven't moved in 6 months? Visible immediately. Liquidate before they become write-offs."
                    },
                    {
                      title: "Demand forecasting that works",
                      description: "Models that incorporate seasonality, trends, and sales pipeline. Not just last year's numbers."
                    },
                    {
                      title: "Optimized reorder points",
                      description: "By SKU, by location. Right inventory in the right place at the right time."
                    },
                    {
                      title: "30% less cash tied up",
                      description: "From 4x turns to 6x turns. That's working capital you can use for growth."
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
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
                      <div>
                        <span className="font-medium text-text-primary text-sm sm:text-base">{item.title}</span>
                        <p className="text-text-secondary text-xs sm:text-sm">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Profitability Section */}
      <section id="profitability" className="section bg-[#F8F9FA] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="order-2 lg:order-1"
              >
                <div className="bg-white p-5 sm:p-8 rounded-2xl border border-black/10">
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6">
                    What we typically find
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      {
                        title: "Your top 10 isn't what you think",
                        description: "Ranked by true margin, not revenue. Some 'best customers' are actually underwater."
                      },
                      {
                        title: "Cost-to-serve varies wildly",
                        description: "Same gross margin, different net. Delivery frequency, returns, support time. It all matters."
                      },
                      {
                        title: "Sales comp drives wrong behavior",
                        description: "Paying on revenue rewards the wrong deals. Margin-based comp changes everything."
                      },
                      {
                        title: "Some customers should go",
                        description: "Not every customer is worth keeping. Now you can see which ones and have the conversation."
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <span className="font-medium text-text-primary">{item.title}</span>
                          <p className="text-text-secondary text-sm">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <div className="order-1 lg:order-2">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
                >
                  Customer Profitability
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Know Who Actually Makes You Money
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Customer profitability is invisible until year-end. If ever. Some &quot;best customers&quot; generate revenue but eat your margin with returns, expedited shipping, and hand-holding.
                  </p>
                  <p>
                    We build true customer profitability analytics. Revenue minus cost-to-serve. By customer, by product line. The conversations you&apos;ve been avoiding? Now you have the data.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button variant="secondary" href="/case-studies/what-predicts-lead-conversion" className="min-h-[48px]">
                    See the Case Study
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Discipline Section */}
      <section id="pricing" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
                >
                  Pricing Discipline
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Stop Giving Away Margin
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Pricing lives in spreadsheets and sales rep heads. Every deal is a negotiation. Some reps give away margin they don&apos;t have to. Nobody knows until year-end.
                  </p>
                  <p>
                    We build pricing visibility and guardrails. Real-time margin by deal. Exception alerts before approval. Your sales team sees the margin impact before they quote. <strong className="text-text-primary">1-3% margin improvement</strong> from discipline alone.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button variant="secondary" href="/resources/guides/pricing-discipline-distribution" className="min-h-[48px]">
                    Get the Guide
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-5 sm:p-8 rounded-2xl border border-black/10"
              >
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6">
                  How it works
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Real-time margin visibility",
                      description: "Sales sees the margin on every quote before they send it. No surprises."
                    },
                    {
                      title: "Pricing guardrails",
                      description: "Below-margin deals flag automatically. Manager approval required."
                    },
                    {
                      title: "Exception alerts",
                      description: "Deal below threshold? Alert fires before it's approved. Fix it or justify it."
                    },
                    {
                      title: "Historical context",
                      description: "What did we quote this customer last time? What margin did we get? It's all there."
                    },
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-text-primary">{item.title}</span>
                        <p className="text-text-secondary text-sm">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
            >
              What You Get
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
            >
              The outcomes that matter
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {content.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-teal-500/5 to-teal-500/10 border border-teal-500/20"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500 flex-shrink-0 mt-0.5"
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
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-xs sm:text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
            >
              Use Cases
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
            >
              What this looks like in practice
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {content.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 sm:p-6 rounded-xl bg-white border border-black/10"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2 sm:mb-3">
                  {useCase.title}
                </h3>
                <p className="text-text-secondary text-sm sm:text-base">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Guides Section */}
      <section id="guides" className="section bg-[#F8F9FA] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
            >
              Free Resources
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4"
            >
              Guides for Mid-Sized Distributors
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            >
              Practical guides for inventory optimization, customer profitability, and pricing discipline. No fluff, just strategies that work.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {distributionGuides.map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="block p-5 sm:p-8 rounded-2xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all group min-h-[48px] h-full"
                >
                  <div className="flex items-center gap-2 text-teal-500 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Free Guide
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1 group-hover:text-teal-500 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm mb-2 sm:mb-3">{guide.subtitle}</p>
                  <p className="text-text-secondary text-sm sm:text-base mb-3 sm:mb-4">{guide.description}</p>
                  <span className="inline-flex items-center gap-1 text-teal-500 font-medium text-xs sm:text-sm group-hover:gap-2 transition-all">
                    Get the Guide
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to compete with data?"
        description="Schedule a call to talk through your specific situation, or take our assessment to see where you stand."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take the Assessment", href: "/assessments/distribution" }}
        variant="gradient"
      />
    </>
  );
}

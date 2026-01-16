"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { industryContent } from "@/lib/industries-data";
import { constructionGuides } from "@/lib/lead-magnets-data";

const CONSTRUCTION_LOTTIE_URL = "/animations/construction-industry.json";

export default function ConstructionPageClient() {
  const content = industryContent["construction"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={CONSTRUCTION_LOTTIE_URL}
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
              <span className="text-teal-500 text-sm font-medium">Construction</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Construction
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
            >
              Your project data is scattered across five different systems. You find out about cost overruns at close-out, not when they happen. Change orders get approved in the field and never billed. We fix that.
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
              <Button variant="secondary" size="lg" href="/assessments/construction" className="w-full sm:w-auto min-h-[48px]">
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

      {/* Project Visibility Section */}
      <section id="project-visibility" className="section scroll-mt-24">
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
                  Project Visibility
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  See All Your Projects in One Place
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Right now, answering &quot;what&apos;s our margin on this project?&quot; takes days. Estimating in one system. Scheduling in another. Field data somewhere else. Accounting closed the books last week.
                  </p>
                  <p>
                    We connect Procore, your accounting system, field apps, and even your spreadsheets into one dashboard. Real-time cost-to-complete. No more surprises at close-out.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button variant="secondary" href="/resources/guides/project-visibility-playbook" className="min-h-[48px]">
                    Get the Playbook
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
                  What you see
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Real-time margin by project",
                      description: "Cost-to-complete updated daily. Know where you stand, not where you stood last month."
                    },
                    {
                      title: "At-risk projects flagged early",
                      description: "See margin problems at week 4, not month 8. Fix issues before they become write-offs."
                    },
                    {
                      title: "One source of truth",
                      description: "No more arguing about whose spreadsheet is right. Everyone sees the same numbers."
                    },
                    {
                      title: "Board-ready reporting",
                      description: "Portfolio dashboards that generate automatically. No fire drill before investor meetings."
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

      {/* Change Order Recovery Section */}
      <section id="change-orders" className="section bg-[#F8F9FA] scroll-mt-24">
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
                    Revenue you&apos;re leaving behind
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      {
                        title: "2-5% of revenue",
                        description: "That's what most contractors give away in unbilled change orders. Every year."
                      },
                      {
                        title: "Field approvals that never make it",
                        description: "PM approves extra work. Paperwork sits in a truck. Six months later, it's too late to bill."
                      },
                      {
                        title: "No system of record",
                        description: "Change orders live in emails, texts, and memory. Nothing connects to billing."
                      },
                      {
                        title: "Month-end scramble",
                        description: "Someone remembers unbilled work. Maybe. If you're lucky."
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
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                  Change Order Recovery
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Stop Leaving Money on the Table
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Change orders approved in the field should automatically flow to billing. They don&apos;t. So you lose money you already earned.
                  </p>
                  <p>
                    We build the connection. Field approval triggers a billing alert within 7 days. Nothing slips through. Every change order tracked from approval to payment.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button variant="secondary" href="/resources/guides/change-order-recovery" className="min-h-[48px]">
                    Get the Guide
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Acquisition Section */}
      <section id="post-acquisition" className="section scroll-mt-24">
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
                  Post-Acquisition Integration
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Unified Visibility in Weeks, Not Years
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    You bought a company. Now you have two sets of books, different job costing methods, and no consolidated view. The &quot;full integration&quot; timeline? 18 months. Maybe.
                  </p>
                  <p>
                    We build unified reporting across acquired entities in weeks. Same dashboard, all companies. No waiting for system migration. Investors see consolidated performance immediately.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button variant="secondary" href="/case-studies/army-of-ai-agents" className="min-h-[48px]">
                    See How We Did It
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
                  What you get
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Consolidated dashboards",
                      description: "All entities in one view. Same KPIs, same format, real-time updates."
                    },
                    {
                      title: "Standardized job costing",
                      description: "Different systems? Different methods? We normalize so you can compare."
                    },
                    {
                      title: "Investor-ready reporting",
                      description: "Board decks that pull automatically. No two-week scramble."
                    },
                    {
                      title: "Clear integration roadmap",
                      description: "We show you what to tackle first and what can wait."
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
              Guides for Growing Contractors
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            >
              Practical guides for project visibility, change order recovery, and post-acquisition integration. No fluff, just strategies that work.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {constructionGuides.map((guide, index) => (
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
        title="Ready to see your projects clearly?"
        description="Schedule a call to talk through your specific situation, or take our assessment to see where you stand."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take the Assessment", href: "/assessments/construction" }}
        variant="gradient"
      />
    </>
  );
}

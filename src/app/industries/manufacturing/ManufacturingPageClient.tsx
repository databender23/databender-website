"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { industryContent } from "@/lib/industries-data";
import { manufacturingGuides } from "@/lib/lead-magnets-data";

const MANUFACTURING_LOTTIE_URL = "/animations/manufacturing-industry.json";

export default function ManufacturingPageClient() {
  const content = industryContent["manufacturing"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Lottie Animation - dynamically sized to fit viewport */}
          <HeroLottie
            lottieUrl={MANUFACTURING_LOTTIE_URL}
            className="mb-6"
            loop={true}
            heroTextHeight={280}
            maxSize={420}
            minSize={200}
          />

          {/* Hero Content */}
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
              <span className="text-teal-500 text-sm font-medium">Manufacturing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Manufacturing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
            >
              Clean up messy customer data in hours instead of months.
              Score leads based on who actually buys. Find any product spec in seconds.
              AI that delivers real results—and stays inside your building.
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
              <Button variant="secondary" size="lg" href="/assessments/manufacturing" className="w-full sm:w-auto min-h-[48px]">
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

      {/* Data Cleanup Section */}
      <section id="data-cleanup" className="section scroll-mt-24">
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
                  Data Cleanup
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Fix Your Customer Data in Hours, Not Months
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Your customer database is a mess. The same person listed five different ways.
                    Contacts at companies they left years ago. Duplicates everywhere.
                    Your team wastes time chasing dead ends and missing the real opportunities.
                  </p>
                  <p>
                    We cleaned <strong className="text-text-primary">1.69 million records</strong> for another client—same
                    person under different names, same ID on different people.
                    AI sorted it out in hours at <strong className="text-text-primary">125x less cost</strong> than doing it by hand.
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
                    See the Case Study
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
                  What we fix
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Duplicate contacts merged",
                      description: "Same person, five different records? We match and merge without losing history."
                    },
                    {
                      title: "Stale data cleaned",
                      description: "Contacts at wrong companies, old phone numbers, bounced emails—all identified and flagged."
                    },
                    {
                      title: "Company hierarchies untangled",
                      description: "Parent companies, subsidiaries, acquisitions—see who actually owns what."
                    },
                    {
                      title: "Ongoing data hygiene",
                      description: "Not just a one-time fix. We set up processes to keep your data clean going forward."
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

      {/* Lead Scoring Section */}
      <section id="lead-scoring" className="section bg-[#F8F9FA] scroll-mt-24">
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
                    What we discovered
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      {
                        title: "Urgency beats everything",
                        description: "Leads with near-term deadlines close at 3x the rate. Timing matters more than size."
                      },
                      {
                        title: "Ability to pay > desire to buy",
                        description: "Funded projects close. Wish lists don't. We score based on purchase readiness."
                      },
                      {
                        title: "Property value was backwards",
                        description: "High property value was actually a negative predictor—the opposite of what everyone assumed."
                      },
                      {
                        title: "Sales trusts these scores",
                        description: "Because they match what sales actually sees in the field. No more ignored CRM recommendations."
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
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
                  Lead Scoring
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Lead Scores That Match Reality
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Your sales team ignores the CRM lead scores because they don&apos;t match
                    who actually buys. The scores are based on guesses from a decade ago,
                    not what your data actually shows.
                  </p>
                  <p>
                    We trained on 3 years of a client&apos;s actual sales data. Found that property
                    value was a <em>negative</em> predictor—the opposite of what everyone assumed.
                    Result: <strong className="text-text-primary">31% more wins</strong> when reps focused on the right leads.
                  </p>
                  <p className="font-medium text-text-primary">
                    Real data, real results. Scores your team will actually use.
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

      {/* Document Intelligence Section */}
      <section id="document-intelligence" className="section scroll-mt-24">
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
                  Document Intelligence
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Find Any Product Spec in Seconds
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Someone asks about a product spec and three people spend an hour hunting
                    through old folders and emails. New hires take months to learn where
                    everything is. Knowledge walks out the door when experienced people leave.
                  </p>
                  <p>
                    We turned thousands of product specs from 70+ suppliers into a searchable
                    system. Now anyone can ask &quot;What&apos;s the torque rating on the X200?&quot;
                    and get an instant answer with the source document.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button variant="secondary" href="/case-studies/agentic-document-intelligence" className="min-h-[48px]">
                    See How It Works
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
                  What becomes searchable
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Product Specifications",
                      description: "\"What's the weight capacity?\" Instant answers with links to the source document."
                    },
                    {
                      title: "Supplier Documentation",
                      description: "Specs from 70+ suppliers, all searchable in one place. No more hunting through folders."
                    },
                    {
                      title: "Procedures & Standards",
                      description: "\"What's our process for X?\" New hires find answers themselves from day one."
                    },
                    {
                      title: "Quality Records",
                      description: "Past issues, resolutions, corrective actions—all searchable when you need them."
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

      {/* Privacy Section */}
      <section id="privacy" className="section bg-[#F8F9FA] scroll-mt-24">
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
                <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-5 sm:p-8 rounded-2xl border border-teal-500/20">
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6">
                    Why IT and legal say yes
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      {
                        title: "Everything stays in-house",
                        description: "AI runs on your servers. Customer data never touches external clouds."
                      },
                      {
                        title: "No new vendor agreements",
                        description: "No contracts with OpenAI or any AI company. Your data, your equipment, your control."
                      },
                      {
                        title: "Complete audit trails",
                        description: "Every query is logged. You can see exactly who searched for what."
                      },
                      {
                        title: "You control everything",
                        description: "It's your system. Modify it, restrict it, or shut it down whenever you want."
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <div>
                          <span className="font-medium text-text-primary text-sm sm:text-base">{item.title}</span>
                          <p className="text-text-secondary text-xs sm:text-sm">{item.description}</p>
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
                  Privacy & Control
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  AI That Stays in Your Building
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Your pricing, your costs, your customer lists—that&apos;s competitive
                    advantage. Most AI tools want to send it all to their cloud.
                    That&apos;s a non-starter.
                  </p>
                  <p>
                    We do it differently. Everything runs on your own computers.
                    Your sensitive data never goes anywhere. You get full AI capabilities
                    without the risk of exposure.
                  </p>
                  <p className="font-medium text-text-primary">
                    Built for manufacturers who take competitive advantage seriously.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
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
      <section className="section bg-[#F8F9FA]">
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
      <section id="guides" className="section scroll-mt-24">
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
              Guides for Manufacturing Leaders
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            >
              Practical insights for cleaning data, scoring leads, and getting real-time visibility. No fluff, just strategies that work.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {manufacturingGuides.map((guide, index) => (
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
        title="Ready to see what's possible?"
        description="Schedule a consultation to discuss your specific challenges, or take our 5-minute readiness assessment to see where you stand."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take the Assessment", href: "/assessments/manufacturing" }}
        variant="gradient"
      />
    </>
  );
}

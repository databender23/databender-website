"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { ResponsiveAnimation, HealthcareAnimation } from "@/components/animations";
import { industryContent } from "@/lib/industries-data";

const HEALTHCARE_LOTTIE_URL = "/animations/healthcare-industry.json";

export default function HealthcareIndustryPage() {
  const content = industryContent["healthcare"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Lottie Animation - Above Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center mb-8"
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <ResponsiveAnimation
                lottieUrl={HEALTHCARE_LOTTIE_URL}
                MobileComponent={HealthcareAnimation}
                className="w-full aspect-square"
              />
            </div>
          </motion.div>

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
              <span className="text-teal-500 text-sm font-medium">Healthcare</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Healthcare
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
            >
              Years of clinical knowledge locked in documents. AI that finally
              understands them (reading prior auths, clinical protocols, and policy
              manuals) without your data leaving the building.
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
              <Button variant="secondary" size="lg" href="/case-studies/agentic-document-intelligence" className="w-full sm:w-auto min-h-[48px]">
                See Document Intelligence
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

      {/* Document Intelligence Section */}
      <section id="document-intelligence" className="section bg-[#F8F9FA] scroll-mt-24">
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
                  AI That Reads Like Your Best Staff, At Scale
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Prior authorization requests. Clinical protocols. Formularies. Policy
                    manuals. Insurance cards. Years of institutional knowledge scattered
                    across thousands of documents that AI tools like ChatGPT can&apos;t access.
                  </p>
                  <p>
                    We built Document Intelligence that turns unstructured documents
                    into an AI-ready knowledge base. Now AI can search, answer questions,
                    and power workflows, all using your organization&apos;s own data.
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
                  What AI can read
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Prior Auth Documentation",
                      description: "AI gathers required docs, checks payer requirements, drafts submissions"
                    },
                    {
                      title: "Clinical Protocols & Formularies",
                      description: "Instant answers: 'What's our sepsis protocol?' 'Show me the formulary for this drug class.'"
                    },
                    {
                      title: "Policy & Procedure Manuals",
                      description: "Every policy searchable by anyone, from day one. No more hunting through SharePoint."
                    },
                    {
                      title: "Insurance Cards & Patient Forms",
                      description: "Extract member IDs, group numbers, payer info. Eligibility checks start automatically."
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

      {/* Knowledge & AI Agents Section */}
      <section id="knowledge-agents" className="section scroll-mt-24">
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
                    How knowledge stays
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      {
                        title: "Institutional memory",
                        description: "Every protocol, policy, and clinical reference searchable forever. When staff leave, the knowledge doesn't."
                      },
                      {
                        title: "Research agents",
                        description: "AI scans clinical literature, synthesizes findings, surfaces relevant protocols. Hours of research in minutes."
                      },
                      {
                        title: "Natural language Q&A",
                        description: "'What's our referral protocol?' 'Which payer is slowest?' Ask in plain English, get answers with sources."
                      },
                      {
                        title: "Living knowledge base",
                        description: "New documents automatically expand what AI knows. The system gets smarter as you use it."
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
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
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
                  Knowledge Management & AI Agents
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Knowledge That Stays When People Leave
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Every healthcare organization has decades of institutional knowledge:
                    clinical protocols, policy decisions, operational expertise. It&apos;s trapped in
                    documents, systems, and people&apos;s heads.
                  </p>
                  <p>
                    We build AI systems that capture, organize, and surface that knowledge.
                    Research agents that scan clinical literature. Q&A systems that answer
                    questions in plain English with sources. Knowledge that compounds instead
                    of walking out the door.
                  </p>
                  <p className="font-medium text-text-primary">
                    New hires productive in weeks, not months. Expertise accessible to
                    everyone, forever.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Systems Section */}
      <section id="legacy-systems" className="section bg-[#F8F9FA] scroll-mt-24">
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
                  Legacy Systems Modernization
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Your EHR Isn&apos;t Going Anywhere. That&apos;s Fine.
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Nobody wants a three-year EHR migration. The disruption, the training,
                    the risk. It&apos;s rarely worth it. But that legacy system is holding
                    you back from AI, analytics, and the integrations you actually need.
                  </p>
                  <p>
                    We build a modern data layer on top of what you have. Your systems
                    stay in place. Data flows out into a unified platform where AI and
                    analytics can actually work. No rip-and-replace required.
                  </p>
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
                  How we connect legacy systems
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "HL7 & FHIR Integration",
                      description: "We speak the languages your systems speak, connecting to Epic, Cerner, Meditech, and everything in between"
                    },
                    {
                      title: "Unified Data Layer",
                      description: "Patient, billing, and operational data in one place. Query across systems that were never designed to talk"
                    },
                    {
                      title: "Real-Time & Batch",
                      description: "Some data needs to flow in real-time. Some can batch overnight. We architect for both."
                    },
                    {
                      title: "Zero Disruption",
                      description: "Clinical workflows stay exactly the same. The integration layer sits alongside, not inside, your EHR"
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
                          d="M5 13l4 4L19 7"
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

      {/* AI Without Risk Section */}
      <section id="ai-compliance" className="section bg-[#F8F9FA] scroll-mt-24">
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
                    How it works
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      {
                        title: "Your servers, your data",
                        description: "AI models run inside your infrastructure. Nothing goes out."
                      },
                      {
                        title: "No third-party BAAs",
                        description: "No agreements with OpenAI, no cloud AI vendors in your compliance chain."
                      },
                      {
                        title: "Full audit trails",
                        description: "Every query logged. See who asked what, when. Compliance loves it."
                      },
                      {
                        title: "You own the models",
                        description: "Inspect, tune, or retrain. No vendor lock-in, no black boxes."
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
                  HIPAA-Compliant AI
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
                >
                  Yes, You Can Use AI. No, Your Data Doesn&apos;t Leave.
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg"
                >
                  <p>
                    Every other AI tool wants your data in their cloud. For healthcare,
                    that&apos;s a dealbreaker. PHI in someone else&apos;s infrastructure means
                    BAAs, breach risk, and compliance headaches you don&apos;t need.
                  </p>
                  <p>
                    We deploy AI differently. Local language models that run entirely
                    within your walls. The capabilities you need without the regulatory exposure.
                  </p>
                  <p className="font-medium text-text-primary">
                    This isn&apos;t AI adapted for healthcare as an afterthought.
                    It&apos;s AI built for healthcare from day one.
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
                className="p-5 sm:p-6 rounded-xl bg-[#F8F9FA] border border-black/10"
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

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="Schedule a consultation to discuss your specific challenges, or see how Document Intelligence turns scattered documents into searchable knowledge."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "See Document Intelligence", href: "/case-studies/agentic-document-intelligence" }}
        variant="gradient"
      />
    </>
  );
}

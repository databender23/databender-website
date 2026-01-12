"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button, Card } from "@/components/ui";
import { EmailCaptureForm } from "@/components/forms";
import { LottieWrapper } from "@/components/animations";
import { legalAudits, legalGuides } from "@/lib/lead-magnets-data";

const LEGAL_LOTTIE_URL = "/animations/legal.json";

// Icon components
const IconClock = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconTrophy = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconBrain = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconLayers = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  clock: IconClock,
  trophy: IconTrophy,
  brain: IconBrain,
  layers: IconLayers,
};

export default function LegalIndustryPage() {
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);
  const [lottieData, setLottieData] = useState<object | null>(null);

  // Load Lottie animation
  useEffect(() => {
    fetch(LEGAL_LOTTIE_URL)
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch(() => setLottieData(null));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <Link
                  href="/industries"
                  className="text-text-secondary hover:text-teal-500 transition-colors text-sm"
                >
                  Industries
                </Link>
                <span className="text-text-muted">/</span>
                <span className="text-teal-500 text-sm font-medium">Legal</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
              >
                AI for Law Firms That Stays Inside Your Walls
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8"
              >
                Your associates spend 60% of their time on work that doesn&apos;t need
                a law degree. We fix that with AI that never touches third-party clouds.
                Client files stay on your servers. Privilege stays intact.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="primary" size="lg" href="#audits">
                  Request a Custom Audit
                </Button>
                <Button variant="secondary" size="lg" href="#guides">
                  Download Free Guides
                </Button>
              </motion.div>
            </div>

            {/* Right side - Lottie Animation */}
            {lottieData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center items-center"
              >
                <div className="w-full max-w-md">
                  <LottieWrapper
                    animationData={lottieData}
                    loop={true}
                    autoplay={true}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Sound Familiar?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-8"
            >
              The challenges keeping managing partners up at night
            </motion.h2>

            <ul className="space-y-4">
              {[
                "Associates spending 60% of their time on work that doesn't require a law degree",
                "Knowledge walking out the door every time a partner retires",
                "Losing pitches to firms that seem to know more about prospects than you do",
                "15+ software systems that don't talk to each other",
                "Client relationships trapped in individual inboxes",
              ].map((challenge, index) => (
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
                  <span className="text-text-secondary text-lg">{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AI Privacy Section */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
                >
                  Privacy-First AI
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
                >
                  AI Without the Ethics Headache
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 text-text-secondary text-lg"
                >
                  <p>
                    Client data in OpenAI&apos;s cloud? Good luck explaining that to the
                    partnership. Privileged communications running through third-party
                    servers? The ethics committee will have questions.
                  </p>
                  <p>
                    We deploy AI differently. Local models that run entirely within your
                    infrastructure. Client files never leave your walls. Attorney-client
                    privilege stays intact.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-8 rounded-2xl border border-teal-500/20"
              >
                <h3 className="text-xl font-bold text-text-primary mb-6">
                  How it works
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Your servers only",
                      description: "AI models run inside your infrastructure. Nothing goes to external APIs."
                    },
                    {
                      title: "No cloud dependencies",
                      description: "No OpenAI, no Azure AI, no third-party processors in your data chain."
                    },
                    {
                      title: "Full audit trails",
                      description: "Every query logged. See who asked what, when. Compliance and ethics covered."
                    },
                    {
                      title: "You control the models",
                      description: "Inspect, tune, or retrain. No vendor lock-in, no black boxes."
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

      {/* Custom Audits Section */}
      <section id="audits" className="section bg-[#F8F9FA] scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Personalized for Your Firm
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Request a Custom Audit
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              We don&apos;t do cookie-cutter assessments. Each audit is tailored to
              your firm&apos;s specific situation and delivered by consultants who
              understand legal operations.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Audit Cards */}
            <div className="space-y-6">
              {legalAudits.map((audit, index) => {
                const IconComponent = iconMap[audit.icon] || IconClock;
                const isSelected = selectedAudit === audit.slug;

                return (
                  <motion.div
                    key={audit.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-teal-500/5 border-teal-500"
                        : "bg-[#F8F9FA] border-black/10 hover:border-teal-500/30"
                    }`}
                    onClick={() => setSelectedAudit(audit.slug)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
                        <IconComponent />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                          {audit.title}
                        </h3>
                        <p className="text-text-secondary mb-3">
                          {audit.description}
                        </p>
                        <p className="text-sm text-text-muted">
                          <span className="font-medium">You&apos;ll receive:</span>{" "}
                          {audit.deliverable}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Request Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm sticky top-24"
            >
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Request Your Audit
              </h3>
              <p className="text-text-secondary mb-6">
                {selectedAudit
                  ? `Selected: ${legalAudits.find((a) => a.slug === selectedAudit)?.title}`
                  : "Select an audit type or tell us about your needs"}
              </p>

              <EmailCaptureForm
                formType="audit"
                resourceSlug={selectedAudit || "general"}
                resourceTitle={
                  legalAudits.find((a) => a.slug === selectedAudit)?.title ||
                  "Custom Audit Request"
                }
                submitButtonText="Request Audit"
                showPhoneField
                showMessageField
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Guides Section */}
      <section id="guides" className="section bg-[#F8F9FA] scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Free Resources
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Guides for Forward-Thinking Firms
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              Practical insights you can use today. No fluff, no sales pitches—just
              actionable strategies from firms that have done it.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legalGuides.map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="block p-8 rounded-2xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-2 text-teal-500 text-sm font-medium mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Free Guide
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-teal-500 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-3">{guide.subtitle}</p>
                  <p className="text-text-secondary mb-4">{guide.description}</p>
                  <ul className="space-y-2 mb-4">
                    {guide.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-teal-500 font-medium text-sm group-hover:gap-2 transition-all">
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

      {/* Solutions Section */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              What We Build
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              Solutions for Legal
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Knowledge Management",
                description: "Ask a question, get the precedent. AI searches every matter, document, and email you've ever touched. Finds the relevant clause in seconds.",
                icon: "search",
              },
              {
                title: "Document Intelligence",
                description: "AI reads contracts, extracts key terms, flags issues. What took a first-year associate 10 hours takes 10 minutes.",
                icon: "book",
              },
              {
                title: "Client Intelligence",
                description: "See every touchpoint across every partner. Spot who's growing, who's at risk, and who hasn't heard from you in six months.",
                icon: "users",
              },
              {
                title: "Agentic Research",
                description: "Point AI at a legal question. It searches case law, synthesizes holdings, and delivers a memo with citations. Research that used to take days.",
                icon: "brain",
              },
              {
                title: "Associate Multiplier",
                description: "First drafts in minutes. AI handles the boilerplate, associates handle the judgment calls. Same quality, half the hours.",
                icon: "zap",
              },
              {
                title: "Matter Analytics",
                description: "Real-time visibility into matter profitability, budget burn, and resource allocation. Know which matters make money before they close.",
                icon: "chart",
              },
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[#F8F9FA] border border-black/10"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {solution.title}
                </h3>
                <p className="text-text-secondary">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="Request a custom audit or schedule a consultation to discuss your specific challenges."
        primaryCta={{ label: "Request Audit", href: "#audits" }}
        secondaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}

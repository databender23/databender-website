"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import Link from "next/link";

interface ProcessPhase {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  proofPoint: {
    text: string;
    source: string;
    link: string;
  };
  deliverables: string[];
}

const processPhases: ProcessPhase[] = [
  {
    number: "01",
    title: "Understand",
    subtitle: "We find what's actually broken",
    description:
      "We don't start with solutions. We start by understanding your data reality. What seems like a simple ID field might have 670 different people assigned to the same value. What your team assumes predicts success often doesn't. We dig into your systems to find the real problems, not the obvious ones.",
    proofPoint: {
      text: "In one engagement, we discovered a trusted ID field had the same value assigned to 670 different people—a problem invisible to the client until we audited their data.",
      source: "Entity Resolution Case Study",
      link: "/case-studies/army-of-ai-agents",
    },
    deliverables: [
      "Audit data quality across your systems—not just structure, but accuracy",
      "Identify hidden problems your team doesn't know exist",
      "Document what insights you actually need vs. what reports you're getting",
      "Find quick wins that prove value before the big build",
    ],
  },
  {
    number: "02",
    title: "Architect",
    subtitle: "We design what's actually possible",
    description:
      "Once we understand your reality, we design solutions that fit. Not every problem needs AI. Not every AI problem needs a data warehouse. We recommend approaches based on your constraints, team capabilities, and what will actually get adopted. No vendor loyalty, no one-size-fits-all templates.",
    proofPoint: {
      text: "For a medical device distributor, we designed a document intelligence system that could read 70+ different file formats—because their knowledge was trapped in decades of PDFs, scans, and spreadsheets.",
      source: "Document Intelligence Case Study",
      link: "/case-studies/agentic-document-intelligence",
    },
    deliverables: [
      "Evaluate approaches based on your specific constraints and team",
      "Design architecture that your organization can actually maintain",
      "Plan for quick wins first, infrastructure second",
      "Define success metrics tied to business outcomes, not technical vanity",
    ],
  },
  {
    number: "03",
    title: "Deploy",
    subtitle: "We deliver what actually works",
    description:
      "The people who designed your solution build it. No handoffs to junior developers, no knowledge lost in translation. Our AI-augmented approach means 10 agents working in parallel, not 10 analysts working in sequence. You see working solutions in weeks—dashboards that answer real questions, pipelines that actually run, AI that works on your data.",
    proofPoint: {
      text: "Our AI-augmented approach delivered 125x cost savings vs. traditional manual methods—$200 in AI costs vs. $25,000 for human review of the same records.",
      source: "Entity Resolution Case Study",
      link: "/case-studies/army-of-ai-agents",
    },
    deliverables: [
      "Deploy production-ready infrastructure (not prototypes that need rebuilding)",
      "Build dashboards that answer questions leadership actually asks",
      "Train AI models on your data with documented confidence scores",
      "Enable your team so they're not dependent on us to operate",
    ],
  },
  {
    number: "04",
    title: "Evolve",
    subtitle: "We ensure it keeps working",
    description:
      "Go-live isn't goodbye. The best AI systems learn from outcomes. We monitor performance, catch data quality issues early, and continuously improve based on real results. When our lead scoring model showed 31% better results, it was because we built feedback loops that learned from every conversion.",
    proofPoint: {
      text: "Our lead scoring model achieved 31% higher accuracy than standard CRM scoring—not from better algorithms, but from continuous learning based on actual conversion outcomes.",
      source: "Lead Scoring Case Study",
      link: "/case-studies/what-predicts-lead-conversion",
    },
    deliverables: [
      "Monitor system health and data quality proactively",
      "Improve models based on real outcomes, not assumptions",
      "Expand capabilities when you're ready, not before",
      "Provide ongoing partnership without vendor lock-in",
    ],
  },
];

const differentiators = [
  {
    title: "Same team, start to finish",
    description:
      "The person who understands your broken data is the one fixing it. No handoffs, no knowledge loss, no explaining the same problem twice.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "10 agents, not 10 analysts",
    description:
      "AI agents work in parallel on complex problems—entity resolution, document extraction, pattern recognition—while humans make the judgment calls that matter.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Working solutions in weeks",
    description:
      "You see progress fast—dashboards, pipelines, AI that runs on your data. Not months of planning followed by months of building.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Built to hand off",
    description:
      "Clean code, documented decisions, trained teams. You own the solution. We're here when you need us, not because you're stuck without us.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const insights = [
  {
    insight: "Property value doesn't predict lead quality",
    detail: "Higher property values actually correlated with lower conversion rates. What mattered? Urgency signals and ability to act.",
    link: "/case-studies/what-predicts-lead-conversion",
  },
  {
    insight: "The same ID was assigned to 670 different people",
    detail: "Government data quality varies wildly. What looks like a unique identifier often isn't. We found 1.69M records with broken IDs.",
    link: "/case-studies/army-of-ai-agents",
  },
  {
    insight: "ChatGPT can't read your documents",
    detail: "Standard AI tools can't access proprietary files. Vision AI can read documents like a human—70+ formats, no custom rules per format.",
    link: "/case-studies/agentic-document-intelligence",
  },
];

export default function OurProcessClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Lottie Animation - dynamically sized to fit viewport */}
          <HeroLottie
            lottieUrl="/animations/workflow-process.json"
            className="mb-6"
            loop={true}
            heroTextHeight={350}
            maxSize={350}
            minSize={150}
          />

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Our Process
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              We solve problems your competitors can&apos;t
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-4"
            >
              Agentic AI changes what&apos;s economically feasible. Problems that would take 50 analysts months to solve? We solve them in hours. Data that seemed impossible to clean? We make it a competitive advantage.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-teal-600 font-medium text-base sm:text-lg mb-6 sm:mb-8"
            >
              1.69M broken records. 125x cost savings. 31% better predictions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
            >
              <Button variant="primary" size="lg" href="/contact">
                Start a Conversation
              </Button>
              <Button variant="secondary" size="lg" href="/case-studies">
                See Case Studies
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm">
                Why We&apos;re Different
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                AI changes what&apos;s possible
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-text-secondary text-lg leading-relaxed"
            >
              <p>
                Most data projects fail because they start with technology instead of understanding. But even projects that start right often fail at scale—the manual effort required to clean messy data, resolve conflicting records, or extract insights from documents makes them economically unfeasible.
              </p>
              <p>
                <span className="text-text-primary font-medium">Agentic AI changes that equation.</span> We deploy AI agents that reason through complexity—10 agents working in parallel on entity resolution, vision AI reading documents like a human, models that learn from every outcome. Problems that would cost $25,000 in manual review cost $200 with our approach.
              </p>
              <p>
                This isn&apos;t about replacing humans with AI. It&apos;s about making previously impossible projects possible. The judgment calls stay human. The grunt work becomes automated. The result? Enterprise-quality delivery at a fraction of traditional costs.
              </p>
            </motion.div>

            {/* Industries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 p-6 rounded-xl bg-[#F8F9FA]"
            >
              <p className="text-text-primary font-medium mb-3">
                Proven in regulated industries
              </p>
              <p className="text-text-secondary">
                Healthcare, legal, energy, financial services. We build with HIPAA, GDPR, and SOC 2 compliance from day one—not bolted on at the end. Every AI decision is documented with reasoning and confidence scores for audit trails.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              The Approach
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
            >
              Four phases. Real outcomes.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              Every engagement follows the same structure—but every solution is tailored to your specific situation and constraints.
            </motion.p>
          </div>

          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processPhases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-white border border-black/10 hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl font-bold text-teal-500/20 absolute top-4 right-4">
                  {phase.number}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {phase.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {phase.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Phases */}
      {processPhases.map((phase, index) => (
        <section
          key={phase.number}
          className={`section ${index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}`}
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl font-bold text-teal-500/30">
                    {phase.number}
                  </span>
                  <div>
                    <h2 className="text-3xl font-bold text-text-primary">
                      {phase.title}
                    </h2>
                    <p className="text-teal-600 font-medium">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  {phase.description}
                </p>

                {/* Proof Point */}
                <div className="p-4 rounded-lg bg-teal-500/5 border-l-4 border-teal-500 mb-6">
                  <p className="text-text-secondary text-sm italic mb-2">
                    &ldquo;{phase.proofPoint.text}&rdquo;
                  </p>
                  <Link
                    href={phase.proofPoint.link}
                    className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
                  >
                    {phase.proofPoint.source} &rarr;
                  </Link>
                </div>
              </motion.div>

              {/* Deliverables */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-xl bg-gradient-to-br ${
                  index % 2 === 0
                    ? "from-teal-500/5 to-transparent"
                    : "from-white to-teal-500/5"
                } border border-black/10 ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  What we deliver
                </h3>
                <ul className="space-y-3">
                  {phase.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
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
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* What Sets Us Apart */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Why this approach works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              Most data projects fail. Ours don&apos;t. Here&apos;s why.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-black/10"
              >
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4 text-teal-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We've Learned */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Counter-Intuitive Insights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              What we&apos;ve learned
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              Every engagement reveals something surprising. Here are insights that challenged assumptions—and changed outcomes.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {insights.map((item, index) => (
              <motion.div
                key={item.insight}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.link}
                  className="block p-6 rounded-xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    &ldquo;{item.insight}&rdquo;
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {item.detail}
                  </p>
                  <span className="text-teal-600 text-sm font-medium">
                    Read case study &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Let's talk about your challenge"
        description="30 minutes. We'll discuss your situation and whether our approach makes sense for what you're trying to accomplish. No pitch deck, just conversation."
        primaryCta={{ label: "Schedule a Call", href: "/contact" }}
        secondaryCta={{ label: "Take Free Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}

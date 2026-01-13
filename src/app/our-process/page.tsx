"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { ResponsiveAnimation, RoadmapAnimation } from "@/components/animations";

interface ProcessPhase {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const processPhases: ProcessPhase[] = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "We learn your business before we touch your data",
    description:
      "We don't start with solutions. We start with questions. What are you trying to accomplish? Where does your data live? What's working, what isn't? This isn't a checkbox exercise. We dig in to understand your situation so we can design something that actually fits.",
    deliverables: [
      "Document your business objectives, KPIs, and what insights you actually need",
      "Audit your existing data sources, systems, and workflows",
      "Identify quick wins that can show value fast",
      "Create a practical roadmap with clear priorities",
    ],
  },
  {
    number: "02",
    title: "Design",
    subtitle: "We architect a solution for your specific situation",
    description:
      "Once we understand what you're dealing with, we figure out the right approach. Cloud data warehouse? Modern BI tools? AI for data cleanup? We recommend what makes sense for your goals, budget, and existing systems. No vendor loyalty, no one-size-fits-all templates.",
    deliverables: [
      "Evaluate options based on your specific constraints",
      "Design architecture that fits your team's capabilities",
      "Plan for quick wins first, foundation second",
      "Define success metrics you can actually measure",
    ],
  },
  {
    number: "03",
    title: "Build",
    subtitle: "AI-enabled developers build it, start to finish",
    description:
      "The people who designed your solution build it too. AI-enabled developers handle execution, moving faster without cutting corners. We deliver working dashboards, connected pipelines, and AI that runs on your data. You see progress in weeks, not months.",
    deliverables: [
      "Deploy data infrastructure (warehouses, pipelines, integrations)",
      "Build dashboards that answer questions leadership actually asks",
      "Stand up AI models trained on your data, not demo data",
      "Train your team so they're not dependent on us",
    ],
  },
  {
    number: "04",
    title: "Support",
    subtitle: "We stick around to make sure it works",
    description:
      "Go-live isn't goodbye. We monitor performance, catch issues early, and adapt as your needs change. When you want to expand what we've built, we're already up to speed on your systems. Long-term partnership without long-term lock-in.",
    deliverables: [
      "Monitor system health and data quality",
      "Tune models and dashboards as your business evolves",
      "Add capabilities when you're ready, not before",
      "Provide ongoing support without adding to your headcount",
    ],
  },
];

export default function OurProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
              >
                How we turn data chaos into clarity
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8"
              >
                Most data projects fail because they start with technology instead of understanding. Our 4-phase approach puts your business goals first and builds from there.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="primary" size="lg" href="/contact">
                  Start a Conversation
                </Button>
                <Button variant="secondary" size="lg" href="/assessments/data-ai-readiness">
                  Take Free Assessment
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center lg:col-span-2"
            >
              <div className="w-full max-w-md">
                <ResponsiveAnimation
                  lottieUrl="/animations/workflow-process.json"
                  MobileComponent={RoadmapAnimation}
                  loop={true}
                  speed={1}
                  className="w-full aspect-square"
                />
              </div>
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
              Four phases. No surprises.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              Every engagement follows the same structure. We learn your business, design a solution, build it ourselves, and stick around to make sure it works.
            </motion.p>
          </div>

          {/* Phase Cards in a row */}
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
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {phase.description}
                </p>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white border border-black/10"
            >
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Same team, start to finish
              </h3>
              <p className="text-text-secondary">
                The senior consultant who runs discovery is the same one who builds your solution. No handoffs, no knowledge loss, no surprises.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-white border border-black/10"
            >
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                AI-augmented delivery
              </h3>
              <p className="text-text-secondary">
                AI-first approach with expert oversight. Humans make judgment calls. AI handles the grunt work. Enterprise quality at a fraction of traditional costs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-white border border-black/10"
            >
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Quick wins, then foundations
              </h3>
              <p className="text-text-secondary">
                We find opportunities to show value in weeks, not months. You see progress while we build the infrastructure for long-term success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-white border border-black/10"
            >
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Built to hand off
              </h3>
              <p className="text-text-secondary">
                We build solutions your team can own. Documentation, training, and clean code so you&apos;re never dependent on us to keep things running.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="30 minutes. We'll talk through your situation and see if our approach makes sense for what you're trying to accomplish."
        primaryCta={{ label: "Schedule a Call", href: "/contact" }}
        secondaryCta={{ label: "Take Free Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}

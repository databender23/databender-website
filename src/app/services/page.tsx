"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button, Badge } from "@/components/ui";
import { LottieWrapper } from "@/components/animations";
import {
  services,
  serviceCategories,
  serviceDecisionHelper,
} from "@/lib/services-data";

// Service icons
const ServiceIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.ReactNode> = {
    database: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    "chart-bar": (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    sparkles: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    book: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  };

  return <>{icons[icon] || icons.database}</>;
};

export default function ServicesPage() {
  const serviceKeys = ["data-ai-strategy", "analytics-bi", "ai-services"] as const;
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/assistant-bot.json")
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch(() => setLottieData(null));
  }, []);

  return (
    <>
      {/* Hero with Lottie */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                Our Services
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
              >
                Everything you need to turn data into results
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8"
              >
                From cleaning up scattered systems to AI that works—we build complete solutions, not pieces.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="primary" size="lg" href="/assessments/data-ai-readiness">
                  Take Free Assessment
                </Button>
                <Button variant="secondary" size="lg" href="/contact">
                  Talk to an Expert
                </Button>
              </motion.div>
            </div>

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
                    playOnView={true}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Foundation Services Flow */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-2 tracking-wide uppercase text-sm"
            >
              The Foundation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-text-primary"
            >
              Build, See, Automate
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceKeys.map((categoryKey, index) => {
              const category = serviceCategories[categoryKey];
              return (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-500/10 text-teal-500 mb-4">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {category.title}
                  </h3>
                  <p className="text-teal-500 font-medium text-sm mb-2">
                    {category.position}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {category.message}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Arrow connections */}
          <div className="hidden md:flex justify-center items-center gap-4 mt-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-teal-500/50" />
            <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="flex-1 h-px bg-gradient-to-r from-teal-500/50 via-teal-500/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Foundation Service Cards */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Core Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              Three offerings that work together. Pick one or use all three.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services
              .filter((s) => serviceKeys.includes(s.slug as typeof serviceKeys[number]))
              .map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block p-8 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 mb-6">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-teal-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Sub-services preview */}
                  <div className="space-y-2 mb-6">
                    {service.subServices.slice(0, 4).map((sub) => (
                      <div key={sub.title} className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {sub.title}
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center text-teal-500 font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <svg
                      className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Helper */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Not sure where to start?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg"
            >
              Match your challenge to the right solution
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
              {serviceDecisionHelper.map((item, index) => {
                const service = services.find((s) => s.category === item.service);
                return (
                  <motion.div
                    key={`${item.service}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/services/${service?.slug || item.service}`}
                      className="flex items-center justify-between p-4 hover:bg-black/5 transition-colors border-b border-black/5 last:border-0"
                    >
                      <span className="text-text-secondary">{item.problem}</span>
                      <span className="flex items-center gap-2 text-teal-500 font-medium">
                        {service?.shortTitle || item.service}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-text-secondary mb-4">
              Still not sure? Take our free assessment.
            </p>
            <Button variant="primary" href="/assessments/data-ai-readiness">
              Take the Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to get started?"
        description="Schedule a 30-minute consultation. No pitch decks—just a conversation about your situation."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment First", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}

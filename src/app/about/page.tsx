"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { LottieWrapper } from "@/components/animations";

export default function AboutPage() {
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/wavey-birdie.json")
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch(() => setLottieData(null));
  }, []);

  const differentiators = [
    {
      title: "Senior-Led, Not Junior-Staffed",
      description: "The consultant who designs your solution builds it too. No bait-and-switch. No learning on your dime.",
    },
    {
      title: "Built to Deliver",
      description: "We have the team depth to execute quickly without sacrificing quality. When we commit to a timeline, we hit it.",
    },
    {
      title: "Right-Sized for You",
      description: "We work with growing companies that need sophisticated solutions without the bureaucracy of enterprise consulting.",
    },
    {
      title: "Technology-Agnostic",
      description: "We recommend what works for your situation, not what earns us the biggest license fee.",
    },
  ];

  const whatWeDo = [
    "Connect your CRM, ERP, and everything else into one view",
    "Clean messy data at scale using AI",
    "Build dashboards that answer what leadership actually asks",
    "Deploy AI that works on your data, not demo data",
    "Provide ongoing support without adding headcount",
  ];

  const whatWeDont = [
    "Send junior consultants to learn on your project",
    "Push specific vendors because of partnership agreements",
    "Build solutions that only we can maintain",
    "Charge for scope creep that we should have anticipated",
    "Disappear after go-live",
  ];

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
                About Databender
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
              >
                Boutique strategy. Enterprise delivery.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8"
              >
                We&apos;re a data analytics and AI consultancy that makes enterprise-grade capabilities accessible to growing businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="primary" size="lg" href="/contact">
                  Talk to Us
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
                    autoplay={true}
                    speed={0.5}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Our Mission
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
            >
              Making enterprise capabilities accessible
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg"
            >
              You shouldn't need a Fortune 500 budget to get Fortune 500-grade data infrastructure. We build sophisticated solutions in months, not years—with the hands-on attention that only comes from a team small enough to care about your outcomes.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Why Databender
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              What makes us different
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-black/10"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do / Don't Do */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                What we do
              </h2>
              <ul className="space-y-4">
                {whatWeDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5"
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

            {/* What We Don't Do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                What we don&apos;t do
              </h2>
              <ul className="space-y-4">
                {whatWeDont.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
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
                        d="M6 18L18 6M6 6l12 12"
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

      {/* CTA */}
      <CTA
        title="Ready to work together?"
        description="30 minutes. We'll talk about your situation and whether we can help. If we can't, we'll tell you."
        primaryCta={{ label: "Schedule a Call", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}

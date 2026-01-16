"use client";

import { motion } from "framer-motion";

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ProcessSteps({
  steps,
  title = "How We Work",
  subtitle = "Our AI-accelerated delivery process",
}: ProcessStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="section bg-[#F8F9FA]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
          >
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative flex gap-4 md:gap-6 pb-8 last:pb-0"
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 md:left-6 top-12 w-0.5 h-[calc(100%-48px)] bg-gradient-to-b from-teal-500/30 to-transparent" />
              )}

              {/* Step number circle */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-teal-500/20">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-text-primary">
                    {step.title}
                  </h3>
                  {step.duration && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600">
                      {step.duration}
                    </span>
                  )}
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

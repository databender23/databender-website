"use client";

import { motion } from "framer-motion";
import { engagementTypes, type EngagementType } from "@/lib/pricing-data";

interface EngagementTypesProps {
  title?: string;
  subtitle?: string;
  types?: EngagementType[];
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

export default function EngagementTypes({
  title = "How We Work Together",
  subtitle = "Flexible engagement options designed for your needs",
  types = engagementTypes,
}: EngagementTypesProps) {
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
            Engagement Options
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {types.map((engagement, index) => (
            <motion.div
              key={engagement.name}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  {engagement.name}
                </h3>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600">
                  {engagement.duration}
                </span>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                {engagement.description}
              </p>

              {/* Deliverables */}
              <div className="mb-4">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                  What&apos;s Included
                </p>
                <ul className="space-y-2">
                  {engagement.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg
                        className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5"
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div className="pt-4 border-t border-black/5">
                <p className="text-xs text-text-muted italic">
                  {engagement.idealFor}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface WhoThisIsForProps {
  profiles: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export default function WhoThisIsFor({ profiles }: WhoThisIsForProps) {
  if (!profiles || profiles.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Who This Is For
            </h2>
            <p className="text-text-secondary">
              This service is designed for organizations that fit these profiles
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {profiles.map((profile, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F9FA] border border-black/5"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4 text-teal-500"
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
                </div>
                <p className="text-text-primary">{profile}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

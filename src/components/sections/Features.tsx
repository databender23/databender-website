"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Features({
  title,
  subtitle,
  features,
  columns = 3,
}: FeaturesProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="section bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide text-sm"
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-text-primary"
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                href={feature.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

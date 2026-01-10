"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/animations";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsProps {
  title?: string;
  subtitle?: string;
  stats: Stat[];
}

export default function Stats({ title, subtitle, stats }: StatsProps) {
  return (
    <section className="section bg-[#F8F9FA] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-spot glow-spot-teal-subtle glow-spot-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <CountUp
                end={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                scramble={true}
                glowOnComplete={true}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient"
              />
              <p className="mt-2 text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

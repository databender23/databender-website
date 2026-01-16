"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface PainPoint {
  text: string;
  icon?: "scatter" | "question" | "clock" | "puzzle";
}

interface AnimatedStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface PainPointsProps {
  title?: string;
  subtitle?: string;
  points?: PainPoint[];
  stat?: AnimatedStat;
}

const defaultPainPoints: PainPoint[] = [
  { text: "Data scattered across 15 different tools", icon: "scatter" },
  { text: "AI sounds exciting, but you're not sure where to start", icon: "question" },
  { text: "Your team wastes hours on repetitive data work", icon: "clock" },
  { text: "The tools you bought don't quite fit how you work", icon: "puzzle" },
];

const defaultStat: AnimatedStat = {
  value: 73,
  suffix: "%",
  label: "of growing companies struggle with fragmented data systems",
};

// Animated counter component
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

// Icon components for pain points
function PainPointIcon({ type }: { type?: string }) {
  const iconClass = "w-5 h-5";

  switch (type) {
    case "scatter":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case "question":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "clock":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "puzzle":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
  }
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
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function PainPoints({
  title = "Sound familiar?",
  subtitle,
  points = defaultPainPoints,
  stat = defaultStat,
}: PainPointsProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 border-b border-black/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Animated Statistic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 blur-2xl opacity-20 rounded-full scale-150" />
                <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 text-white px-8 py-6 md:px-12 md:py-8 rounded-2xl shadow-lg">
                  <span className="text-5xl md:text-7xl font-bold tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </span>
                </div>
              </div>
            </div>
            <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto">
              {stat.label}
            </p>
          </motion.div>

          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-text-secondary text-lg">{subtitle}</p>
            )}
          </motion.div>

          {/* Pain Point Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            {points.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group flex items-start gap-4 p-5 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:border-amber-200/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600 group-hover:from-amber-200 group-hover:to-orange-200 transition-colors duration-300">
                  <PainPointIcon type={point.icon} />
                </div>
                <p className="text-text-primary font-medium leading-relaxed pt-1.5">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-10 text-text-secondary text-lg"
          >
            You&apos;re not alone.{" "}
            <span className="text-teal-600 font-medium">
              We help companies like yours fix this.
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

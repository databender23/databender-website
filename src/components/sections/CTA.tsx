"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface CTAProps {
  title: string;
  description?: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: "default" | "gradient";
}

export default function CTA({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "default",
}: CTAProps) {
  return (
    <section
      className={`section ${
        variant === "gradient"
          ? "bg-gradient-to-br from-teal-500/10 via-white to-white"
          : ""
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-text-secondary text-lg md:text-xl mb-8">
              {description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              href={primaryCta.href}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button variant="secondary" size="lg" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { FloatingNodes } from "@/components/animations";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  centered?: boolean;
  size?: "default" | "large";
  showFloatingNodes?: boolean;
  media?: React.ReactNode;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  centered = false,
  size = "default",
  showFloatingNodes = true,
  media,
}: HeroProps) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />

      {/* Teal glow spots */}
      <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
      <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

      {/* Floating nodes background */}
      {showFloatingNodes && <FloatingNodes nodeCount={20} showConnections={true} />}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className={`container mx-auto px-6 relative z-10 ${centered ? "text-center" : ""}`}>
        <div className={`${media ? "grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center" : ""}`}>
          <div className={`max-w-4xl ${centered ? "mx-auto" : ""} ${media ? "lg:col-span-3" : ""}`}>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`font-bold tracking-tight text-text-primary mb-6 ${
                size === "large"
                  ? "text-4xl md:text-5xl lg:text-7xl"
                  : "text-3xl md:text-4xl lg:text-5xl"
              }`}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
              >
                {description}
              </motion.div>
            )}

            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}
              >
                {primaryCta && (
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
                )}
                {secondaryCta && (
                  <Button variant="secondary" size="lg" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {media && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex lg:col-span-2 items-center justify-center lg:order-last max-w-sm mx-auto lg:max-w-none mt-8 lg:mt-0"
            >
              {media}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

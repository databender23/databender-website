"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { FloatingNodes } from "@/components/animations";
import { DataPlayground } from "@/components/interactive";
import { services, type ConsolidatedService } from "@/lib/services-data";
import { useEffect, useState, useRef } from "react";
import type { LottieRefCurrentProps } from "lottie-react";

// Icon components
const IconDatabase = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const IconLink = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconChartBar = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconEye = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconTrendingUp = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const IconChat = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconLightbulb = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconBook = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconCpu = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  database: IconDatabase,
  link: IconLink,
  sparkles: IconSparkles,
  "chart-bar": IconChartBar,
  eye: IconEye,
  "trending-up": IconTrendingUp,
  chat: IconChat,
  lightbulb: IconLightbulb,
  book: IconBook,
  cpu: IconCpu,
};

interface Props {
  service: ConsolidatedService;
}

const DATA_MANAGEMENT_LOTTIE_URL = "/animations/data-management.json";
const ANALYTICS_BI_LOTTIE_URL = "/animations/analytics-bi.json";
const AI_SERVICES_LOTTIE_URL = "/animations/ai-services.json";

export default function ServicePageClient({ service }: Props) {
  const [lottieData, setLottieData] = useState<object | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let lottieUrl: string | null = null;

    if (service.slug === "data-ai-strategy") {
      lottieUrl = DATA_MANAGEMENT_LOTTIE_URL;
    } else if (service.slug === "analytics-bi") {
      lottieUrl = ANALYTICS_BI_LOTTIE_URL;
    } else if (service.slug === "ai-services") {
      lottieUrl = AI_SERVICES_LOTTIE_URL;
    }

    if (lottieUrl) {
      fetch(lottieUrl)
        .then((res) => res.json())
        .then((data) => setLottieData(data))
        .catch(() => console.error("Failed to load Lottie animation"));
    }
  }, [service.slug]);

  // Set speed for specific animations
  useEffect(() => {
    if (lottieRef.current) {
      if (service.slug === "data-ai-strategy") {
        // Slower on mobile for smoother rendering
        lottieRef.current.setSpeed(isMobile ? 0.5 : 1.3);
      } else if (service.slug === "analytics-bi") {
        lottieRef.current.setSpeed(0.5);
      }
    }
  }, [lottieData, service.slug, isMobile]);

  const hasLottie = ["data-ai-strategy", "analytics-bi", "ai-services"].includes(service.slug);

  return (
    <>
      {/* Hero Section with Lottie Above */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />

        {/* Teal glow spots */}
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        {/* Floating nodes background */}
        <FloatingNodes nodeCount={20} showConnections={true} />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Lottie Animation - Above Hero */}
          {hasLottie && lottieData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center mb-8"
            >
              <div className={`w-full ${service.slug === "ai-services" ? "max-w-[25rem]" : "max-w-md"}`}>
                <Lottie
                  lottieRef={lottieRef}
                  animationData={lottieData}
                  loop={true}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          )}

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Services
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
            >
              {service.longDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Schedule Consultation
              </Button>
              <Button variant="secondary" size="lg" href="/assessments/data-ai-readiness">
                Take Assessment
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included - Sub-services */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              What&apos;s Included
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              Everything you need
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.subServices.map((subService, index) => {
              const IconComponent = iconMap[subService.icon] || IconDatabase;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/30 transition-colors"
                >
                  <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {subService.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {subService.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo - Data Management only */}
      {service.slug === "data-management" && (
        <section className="section bg-[#F8F9FA]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                Try It Yourself
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-text-primary"
              >
                See AI data cleanup in action
              </motion.h2>
            </div>
            <DataPlayground />
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className={`section ${service.slug === "data-management" ? "" : "bg-[#F8F9FA]"}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Why It Works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              The results you can expect
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-gradient mb-3">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-text-primary"
            >
              Explore Other Services
            </motion.h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Button key={s.slug} variant="secondary" href={`/services/${s.slug}`}>
                  {s.shortTitle}
                </Button>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="Schedule a consultation to discuss how we can help your business."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}

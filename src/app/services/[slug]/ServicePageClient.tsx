"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CTA, WhoThisIsFor, ServiceTestimonials, FAQ, ProcessSteps, EngagementTypes, MeetYourExpert } from "@/components/sections";
import { getTestimonialsByService } from "@/lib/case-studies-data";
import { Button } from "@/components/ui";
import { FloatingNodes } from "@/components/animations";
import LottieWrapper from "@/components/animations/LottieWrapper";
import { services, type ConsolidatedService } from "@/lib/services-data";

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

const IconCode = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const IconShield = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
  code: IconCode,
  shield: IconShield,
};

interface Props {
  service: ConsolidatedService;
}

// Lottie animation URLs (using .json format for lottie-react)
const LOTTIE_URLS: Record<string, string> = {
  "data-ai-strategy": "/animations/data-management.json",
  "analytics-bi": "/animations/analytics-bi.json",
  "ai-services": "/animations/ai-services.json",
  "custom-software": "/animations/custom-software.json",
};

// Animation speeds per service
const ANIMATION_SPEEDS: Record<string, number> = {
  "data-ai-strategy": 1.3,
  "analytics-bi": 0.5,
  "ai-services": 1,
  "custom-software": 1,
};

// Animation crop percentages per service (crops from top)
const ANIMATION_CROPS: Record<string, number> = {
  "data-ai-strategy": 12,
  "analytics-bi": 12,
  "ai-services": 12,
  "custom-software": 12,
};

export default function ServicePageClient({ service }: Props) {
  const hasLottie = service.slug in LOTTIE_URLS;
  const [animationSize, setAnimationSize] = useState<number>(340);
  const lastWidthRef = useRef<number>(0);
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    const calculateSize = (forceRecalc = false) => {
      const currentWidth = window.innerWidth;

      // Only recalculate if width changed or on initial mount
      // This prevents resize events from mobile URL bar changes
      if (!forceRecalc && initializedRef.current && currentWidth === lastWidthRef.current) {
        return;
      }

      lastWidthRef.current = currentWidth;
      initializedRef.current = true;

      const vh = window.innerHeight;
      // Calculate size based on viewport, constrained between 150-340px
      const size = Math.max(150, Math.min(340, vh - 440));
      setAnimationSize(size);
    };

    calculateSize(true);

    const handleResize = () => calculateSize(false);
    window.addEventListener('resize', handleResize);

    const handleOrientationChange = () => {
      setTimeout(() => calculateSize(true), 100);
    };
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <>
      {/* Hero Section with Lottie Above */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden pt-16 md:pt-20">
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
          {/* Lottie Animation - JS viewport constrained for data-management.json compatibility */}
          {hasLottie && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center mb-6"
            >
              {/* Outer container clips the animation, inner container positions it */}
              <div
                className="overflow-hidden"
                style={{
                  width: animationSize,
                  height: animationSize * (1 - (ANIMATION_CROPS[service.slug] || 20) / 100),
                  maxWidth: '100%',
                }}
              >
                <div
                  style={{
                    width: animationSize,
                    height: animationSize,
                    marginTop: -(animationSize * (ANIMATION_CROPS[service.slug] || 20) / 100),
                  }}
                >
                  <LottieWrapper
                    animationUrl={LOTTIE_URLS[service.slug]}
                    speed={ANIMATION_SPEEDS[service.slug] || 1}
                    loop={false}
                    priority={true}
                    mobileOptimized={true}
                    mobileSpeed={0.5}
                    freezeAfterFirstLoop={true}
                    className="w-full h-full"
                  />
                </div>
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
              {service.shortTitle}
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

      {/* Who This Is For */}
      {service.targetAudience && (
        <WhoThisIsFor profiles={service.targetAudience.profiles} />
      )}

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

      {/* Process Steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <ProcessSteps steps={service.processSteps} />
      )}

      {/* Benefits */}
      <section className="section">
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

      {/* Service Testimonials */}
      <ServiceTestimonials testimonials={getTestimonialsByService(service.slug)} />

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQ
          title="Common Questions"
          faqs={service.faqs}
          variant="accordion"
        />
      )}

      {/* Meet Your Expert */}
      <MeetYourExpert />

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

      {/* Engagement Types */}
      <EngagementTypes />

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

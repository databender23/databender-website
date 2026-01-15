"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { ResponsiveAnimation, GrowthChartAnimation } from "@/components/animations";

export default function AboutClient() {

  return (
    <>
      {/* Hero - Founder Focused */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                About Databender
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
              >
                Senior expertise. AI-powered speed.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
              >
                Databender is a data analytics and AI consultancy that makes enterprise-grade capabilities accessible to growing businesses. Direct founder involvement on every engagement. Senior expertise from day one.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <Button variant="primary" size="lg" href="/contact">
                  Start a Conversation
                </Button>
                <Button variant="secondary" size="lg" href="/our-process">
                  See How We Work
                </Button>
              </motion.div>
            </div>

            {/* Lottie Animation - above on mobile, right side on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center lg:col-span-2 order-first lg:order-last"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <ResponsiveAnimation
                  lottieUrl="/animations/wavey-birdie.json"
                  MobileComponent={GrowthChartAnimation}
                  loop={true}
                  speed={1}
                  className="w-full aspect-square"
                  keepPlayingOnMobile={true}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Founder - Expanded */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Photo/Avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/team/grant-bender.jpg"
                alt="Grant Bender, Founder of Databender"
                className="w-48 sm:w-56 md:w-64 rounded-2xl border border-black/10 shadow-lg"
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Grant Bender
              </h2>
              <p className="text-teal-600 font-medium mb-4 sm:mb-6">Founder</p>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-text-secondary">
                <p>
                  Eight years in enterprise consulting taught Grant what works and what doesn&apos;t. He ran global sales operations data initiatives for pharmaceutical companies. Reported directly to leadership teams at Fortune 500 corporations. Built healthcare pricing pipelines processing terabytes of hospital data.
                </p>
                <p>
                  He&apos;s been building with AI since before it was sexy. Not chasing trends, but solving real problems: entity resolution, document processing, predictive models that actually get used. He knows firsthand what it takes to turn AI from a demo into a business outcome.
                </p>
                <p>
                  The projects varied. The frustrations didn&apos;t. Large consultancies sent junior analysts who needed hand-holding. Vendors pushed platforms that solved yesterday&apos;s problems. Internal teams got buried in maintenance and never touched strategy.
                </p>
                <p className="text-text-primary font-medium">
                  Databender was built differently: senior expertise from day one, AI woven into every workflow. Experienced builders augmented by the tools they know how to use.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Track Record - Proof */}
      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              What we&apos;ve built
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                metric: "125x",
                description: "Cost savings on AI entity resolution. 1.69 million broken records cleaned by an army of AI agents.",
              },
              {
                metric: "31%",
                description: "Higher success rate with custom lead scoring vs. generic CRM tools. Data-driven insights that challenge assumptions.",
              },
              {
                metric: "Instant",
                description: "AI answers from decades of institutional knowledge. Documents transformed into a searchable, AI-ready knowledge base.",
              },
              {
                metric: "100+ TB",
                description: "Healthcare pricing pipelines processing hospital data into actionable intelligence.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 rounded-xl bg-[#F8F9FA] border border-black/10"
              >
                <span className="text-3xl sm:text-4xl font-bold text-gradient">{item.metric}</span>
                <p className="text-text-secondary text-sm sm:text-base mt-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              What clients say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                quote: "Incredible asset. Detail-oriented, responsive, adaptable. Deep knowledge of data concepts and engineering best practices.",
                name: "Rajiv Vuddaraju",
                title: "Senior Lead Analytics Consultant",
                company: "Wells Fargo",
              },
              {
                quote: "Technically sound, scalable, well-documented. Built a complex data processing system from high-level requirements with flawless execution.",
                name: "Jay Williamson",
                title: "Founder",
                company: "Health Price Compare",
              },
              {
                quote: "Like magic. Took an idea from my head and made it reality. Constant communication and test-runs for real-time feedback.",
                name: "Reid Valentine",
                title: "Landman",
                company: "707 Advisors LLC",
              },
              {
                quote: "Outstanding. Surpassed all expectations. Completed a large task in limited time and transformed complex data into meaningful insights.",
                name: "Austin Mault",
                title: "Principal",
                company: "Hoosier OsteoTronix",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 rounded-xl bg-white border border-black/10"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500/30 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-text-secondary text-sm sm:text-base mb-3 sm:mb-4">&quot;{item.quote}&quot;</p>
                <div>
                  <p className="text-text-primary font-medium text-sm sm:text-base">{item.name}</p>
                  <p className="text-text-muted text-xs sm:text-sm">{item.title}</p>
                  <p className="text-teal-600 text-xs sm:text-sm">{item.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - Brief */}
      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6"
            >
              How we work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-base sm:text-lg mb-6 sm:mb-8 italic"
            >
              We take an AI-first approach to everything we do with a heavy touch from experts. Enterprise quality and hyper-customized solutions at a fraction of the cost of traditional firms.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="secondary" href="/our-process">
                See Our 4-Phase Process
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="30 minutes. We'll talk about your situation and see if we can help."
        primaryCta={{ label: "Schedule a Call", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}

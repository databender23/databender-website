"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hero, CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { industries } from "@/lib/industries-data";

const IndustryIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.ReactNode> = {
    briefcase: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    heart: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    building: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    factory: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  };

  return <>{icons[icon] || icons.briefcase}</>;
};

export default function IndustriesPage() {
  return (
    <>
      <Hero
        subtitle="Industries We Serve"
        title="Experience in your industry"
        description="We've solved data problems across healthcare, legal, real estate, and manufacturing. That cross-industry experience means we bring proven approaches—not experiments."
        primaryCta={{ label: "Take Free Assessment", href: "/assessments/data-ai-readiness" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact" }}
      />

      {/* Industries Grid */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group block p-8 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 mb-6">
                    <IndustryIcon icon={industry.icon} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-3">
                    {industry.title}
                  </h2>
                  <p className="text-text-secondary mb-6">
                    {industry.description}
                  </p>
                  {industry.subIndustries && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {industry.subIndustries.map((sub) => (
                        <span
                          key={sub.slug}
                          className="px-3 py-1 text-sm bg-white rounded-full text-text-muted"
                        >
                          {sub.title}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="inline-flex items-center text-teal-500 font-medium">
                    Learn more
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Industry Value */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
            >
              Don&apos;t see your industry?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg mb-8"
            >
              Our data management, business intelligence, and AI capabilities apply across industries. The patterns we&apos;ve learned solving problems in healthcare often apply to manufacturing. Insights from real estate projects inform how we approach professional services. Let&apos;s talk about your specific situation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="primary" href="/contact">
                Let&apos;s Talk
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to solve your industry's data challenges?"
        description="Take our free assessment or schedule a consultation to discuss your specific needs."
        primaryCta={{ label: "Take Assessment", href: "/assessments/data-ai-readiness" }}
        secondaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}

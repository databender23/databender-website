"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/lib/case-studies-data";

interface ServiceTestimonialsProps {
  testimonials: Testimonial[];
  maxDisplay?: number;
}

export default function ServiceTestimonials({
  testimonials,
  maxDisplay = 2,
}: ServiceTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  const displayTestimonials = testimonials.slice(0, maxDisplay);

  return (
    <section className="section">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
          >
            Client Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary"
          >
            What clients say
          </motion.h2>
        </div>

        <div
          className={`max-w-4xl mx-auto grid gap-6 ${
            displayTestimonials.length === 1
              ? "grid-cols-1 max-w-2xl"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {displayTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

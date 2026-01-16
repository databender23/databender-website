"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/case-studies-data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 md:p-8 rounded-2xl bg-[#F8F9FA] border border-black/5"
    >
      {/* Quote Icon */}
      <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Highlight Quote */}
      <p className="text-lg font-semibold text-text-primary mb-4 leading-relaxed">
        &quot;{testimonial.highlight}&quot;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
          <span className="text-teal-600 font-semibold text-sm">
            {testimonial.name.split(" ").map(n => n[0]).join("")}
          </span>
        </div>
        <div>
          <p className="font-semibold text-text-primary text-sm">{testimonial.name}</p>
          <p className="text-text-muted text-xs">
            {testimonial.title}
            {testimonial.company && `, ${testimonial.company}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

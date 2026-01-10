"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui";

interface SlideItem {
  type: "case-study" | "blog";
  title: string;
  description: string;
  href: string;
  tag?: string;
  stat?: {
    value: string;
    label: string;
  };
}

interface ContentSliderProps {
  items: SlideItem[];
  autoPlayInterval?: number;
}

export default function ContentSlider({
  items,
  autoPlayInterval = 6000,
}: ContentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [items.length, autoPlayInterval, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <section
      className="section bg-[#F8F9FA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Main slide content */}
          <div className="min-h-[320px] md:min-h-[280px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Left side - Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={currentItem.type === "case-study" ? "teal" : "default"}>
                      {currentItem.type === "case-study" ? "Case Study" : "Blog Post"}
                    </Badge>
                    {currentItem.tag && (
                      <span className="text-text-muted text-sm">{currentItem.tag}</span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                    {currentItem.title}
                  </h3>

                  <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                    {currentItem.description}
                  </p>

                  <Link
                    href={currentItem.href}
                    className="inline-flex items-center gap-2 text-teal-500 font-medium hover:text-teal-400 transition-colors group"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </Link>
                </div>

                {/* Right side - Stat highlight (for case studies) */}
                {currentItem.stat && (
                  <div className="flex justify-center lg:justify-end">
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/20">
                      <div className="text-5xl md:text-6xl font-bold text-teal-500 mb-2">
                        {currentItem.stat.value}
                      </div>
                      <div className="text-text-secondary">
                        {currentItem.stat.label}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-teal-500"
                      : "bg-black/20 hover:bg-black/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-lg bg-black/5 text-text-secondary hover:bg-black/10 hover:text-text-primary transition-colors"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-lg bg-black/5 text-text-secondary hover:bg-black/10 hover:text-text-primary transition-colors"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

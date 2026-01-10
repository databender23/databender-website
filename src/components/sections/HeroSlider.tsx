"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

interface HeroSliderProps {
  items: SlideItem[];
  autoPlayInterval?: number;
}

export default function HeroSlider({
  items,
  autoPlayInterval = 5000,
}: HeroSliderProps) {
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

  const currentItem = items[currentIndex];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Card container */}
      <div className="rounded-2xl bg-[#F8F9FA]/80 backdrop-blur-sm border border-black/10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {/* Badge and tag */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                  currentItem.type === "case-study"
                    ? "bg-teal-500/10 text-teal-500"
                    : "bg-black/10 text-text-secondary"
                }`}
              >
                {currentItem.type === "case-study" ? "Case Study" : "Blog"}
              </span>
              {currentItem.tag && (
                <span className="text-text-muted text-xs">{currentItem.tag}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-text-primary mb-2">
              {currentItem.title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {currentItem.description}
            </p>

            {/* Stat (if case study) */}
            {currentItem.stat && (
              <div className="flex items-baseline gap-2 mb-4 p-3 rounded-lg bg-teal-500/5 border border-teal-500/10">
                <span className="text-2xl font-bold text-teal-500">
                  {currentItem.stat.value}
                </span>
                <span className="text-text-muted text-sm">
                  {currentItem.stat.label}
                </span>
              </div>
            )}

            {/* Link */}
            <Link
              href={currentItem.href}
              className="inline-flex items-center gap-2 text-teal-500 text-sm font-medium hover:text-teal-400 transition-colors group"
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
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="px-6 pb-4 flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 bg-teal-500"
                  : "w-1.5 bg-black/20 hover:bg-black/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

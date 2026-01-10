"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ShowcaseItem {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

interface ScrollingShowcaseProps {
  items: ShowcaseItem[];
  title?: string;
  subtitle?: string;
}

export default function ScrollingShowcase({
  items,
  title,
  subtitle,
}: ScrollingShowcaseProps) {
  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items];

  return (
    <section className="section overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        {(subtitle || title) && (
          <div className="text-center">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-text-primary"
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}
      </div>

      {/* Scrolling container */}
      <div className="relative">
        {/* Gradient masks for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -50 * items.length + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex-shrink-0 w-80 group"
            >
              <div className="p-6 rounded-xl bg-[#F8F9FA] border border-black/10 h-full transition-all duration-300 group-hover:border-teal-500/50 group-hover:bg-white">
                {item.icon && (
                  <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20 transition-colors">
                    {item.icon}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-teal-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

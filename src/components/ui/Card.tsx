"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CardProps } from "@/types";

export default function Card({
  title,
  description,
  icon,
  href,
  className = "",
  children,
}: CardProps) {
  const cardContent = (
    <>
      {icon && (
        <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary leading-relaxed">{description}</p>
      )}
      {children}
      {href && (
        <div className="mt-auto pt-4 flex items-center text-teal-500 font-medium text-sm">
          Learn more
          <svg
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </>
  );

  const cardStyles = `
    group
    block
    h-full
    flex flex-col
    p-6
    rounded-xl
    bg-white
    border border-black/10
    transition-all duration-300
    hover:border-teal-500/50
    hover:shadow-xl
    hover:shadow-black/10
    hover:-translate-y-1
    ${className}
  `;

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Link href={href} className={cardStyles}>
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cardStyles}
    >
      {cardContent}
    </motion.div>
  );
}

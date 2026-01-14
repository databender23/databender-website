"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useCallback, MouseEvent } from "react";
import type { ButtonProps } from "@/types";

const MotionLink = motion.create(Link);

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  onClick,
  disabled = false,
  className = "",
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback((e: MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

  const variants = {
    primary:
      "bg-teal-500 text-white hover:bg-teal-600 shadow-lg hover:shadow-teal-500/25",
    secondary:
      "bg-transparent border border-black/20 text-text-primary hover:bg-black/5 hover:border-teal-500/50",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-black/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const rippleColor = variant === "primary" ? "bg-white/30" : "bg-teal-500/30";

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className={`absolute rounded-full ${rippleColor} pointer-events-none`}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      {icon && iconPosition === "left" && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && <span className="relative z-10">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        className={classes}
        onClick={createRipple}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      onClick={(e) => {
        createRipple(e);
        onClick?.();
      }}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}

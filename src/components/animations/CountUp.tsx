"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  scramble?: boolean;
  className?: string;
  glowOnComplete?: boolean;
}

export default function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  scramble = true,
  className = "",
  glowOnComplete = true,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasAnimated = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Scramble effect - shows random numbers briefly before settling
  useEffect(() => {
    if (!inView || hasAnimated.current || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setDisplayValue(end.toFixed(decimals));
        setIsComplete(true);
      }
      return;
    }

    hasAnimated.current = true;

    if (scramble) {
      // Scramble phase - show random numbers
      const scrambleDuration = 300;
      const scrambleInterval = 50;
      let scrambleTime = 0;

      const scrambleTimer = setInterval(() => {
        scrambleTime += scrambleInterval;
        const randomNum = Math.floor(Math.random() * end * 1.5);
        setDisplayValue(randomNum.toFixed(decimals));

        if (scrambleTime >= scrambleDuration) {
          clearInterval(scrambleTimer);
          startCountUp();
        }
      }, scrambleInterval);

      return () => clearInterval(scrambleTimer);
    } else {
      startCountUp();
    }
  }, [inView, end, decimals, scramble, prefersReducedMotion]);

  const startCountUp = () => {
    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Easing function (ease out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      setCount(current);
      setDisplayValue(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end.toFixed(decimals));
        setIsComplete(true);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <motion.span
        animate={
          isComplete && glowOnComplete
            ? {
                textShadow: [
                  "0 0 0px rgba(26, 153, 136, 0)",
                  "0 0 20px rgba(26, 153, 136, 0.5)",
                  "0 0 0px rgba(26, 153, 136, 0)",
                ],
              }
            : {}
        }
        transition={{ duration: 0.6 }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </motion.span>
    </span>
  );
}

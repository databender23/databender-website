"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useInView } from "react-intersection-observer";

interface LottieWrapperProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  playOnView?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Enable mobile optimizations (slower speed, pause when not in view) */
  mobileOptimized?: boolean;
  /** Show static first frame on mobile instead of animating */
  staticOnMobile?: boolean;
}

export default function LottieWrapper({
  animationData,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnView = false,
  speed = 1,
  className = "",
  style,
  mobileOptimized = true,
  staticOnMobile = false,
}: LottieWrapperProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { ref: viewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    requestAnimationFrame(() => setPrefersReducedMotion(mediaQuery.matches));

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Calculate effective speed (slower on mobile)
  const effectiveSpeed = isMobile && mobileOptimized ? Math.min(speed, 0.5) : speed;

  // Set animation speed
  useEffect(() => {
    if (lottieRef.current && effectiveSpeed !== 1) {
      lottieRef.current.setSpeed(effectiveSpeed);
    }
  }, [animationData, effectiveSpeed]);

  // Handle play on view
  useEffect(() => {
    if (!lottieRef.current || prefersReducedMotion) return;

    if (playOnView) {
      if (inView) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [inView, playOnView, prefersReducedMotion]);

  // Handle play on hover
  useEffect(() => {
    if (!lottieRef.current || prefersReducedMotion) return;

    if (playOnHover) {
      if (isHovered) {
        lottieRef.current.play();
      } else {
        lottieRef.current.goToAndStop(0, true);
      }
    }
  }, [isHovered, playOnHover, prefersReducedMotion]);

  // Pause animation when not in view on mobile to save battery/CPU
  useEffect(() => {
    if (!lottieRef.current || !mobileOptimized || !isMobile) return;
    if (prefersReducedMotion || (staticOnMobile && isMobile)) return;

    if (inView) {
      lottieRef.current.play();
    } else {
      lottieRef.current.pause();
    }
  }, [inView, isMobile, mobileOptimized, prefersReducedMotion, staticOnMobile]);

  // Determine if we should show static frame
  const showStatic = prefersReducedMotion || (staticOnMobile && isMobile);
  const shouldAutoplay = autoplay && !playOnHover && !playOnView && !showStatic;

  return (
    <div
      ref={viewRef}
      className={className}
      style={style}
      onMouseEnter={() => playOnHover && setIsHovered(true)}
      onMouseLeave={() => playOnHover && setIsHovered(false)}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={showStatic ? false : loop}
        autoplay={shouldAutoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

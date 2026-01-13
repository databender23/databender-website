"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { LottieRefCurrentProps } from "lottie-react";
import { useInView } from "react-intersection-observer";

// Dynamically import Lottie to reduce initial bundle size
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full min-h-[200px]" />,
});

interface LottieWrapperProps {
  /** Animation data object OR URL to fetch animation from */
  animationData?: object;
  /** URL to fetch animation data from (lazy loaded) */
  animationUrl?: string;
  /** Static image to show on mobile (recommended for performance) */
  staticImage?: string;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  playOnView?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Enable mobile optimizations (default: true) */
  mobileOptimized?: boolean;
  /** Show static image on mobile instead of animating */
  staticOnMobile?: boolean;
}

export default function LottieWrapper({
  animationData: providedAnimationData,
  animationUrl,
  staticImage,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnView = false,
  speed = 1,
  className = "",
  style,
  mobileOptimized = true,
  staticOnMobile = false, // Animations play on mobile by default
}: LottieWrapperProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(providedAnimationData || null);
  const [isLoading, setIsLoading] = useState(!providedAnimationData && !!animationUrl);
  const hasLoadedRef = useRef(false);

  // Lazy load trigger - only load when close to viewport
  const { ref: viewRef, inView } = useInView({
    threshold: 0,
    rootMargin: "200px", // Start loading 200px before entering viewport
    triggerOnce: false,
  });

  // Check for mobile device - do this synchronously on mount to avoid flash
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Determine if we should show static content
  const showStatic = prefersReducedMotion || (staticOnMobile && isMobile);

  // Lazy load animation data when entering viewport (only if not showing static)
  useEffect(() => {
    if (
      !animationUrl ||
      providedAnimationData ||
      hasLoadedRef.current ||
      showStatic ||
      !inView
    ) {
      return;
    }

    hasLoadedRef.current = true;
    setIsLoading(true);

    fetch(animationUrl)
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load animation:", err);
        setIsLoading(false);
      });
  }, [animationUrl, providedAnimationData, showStatic, inView]);

  // Set animation speed
  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [animationData, speed]);

  // Handle play on view
  useEffect(() => {
    if (!lottieRef.current || prefersReducedMotion || showStatic) return;

    if (playOnView) {
      if (inView) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [inView, playOnView, prefersReducedMotion, showStatic]);

  // Handle play on hover
  useEffect(() => {
    if (!lottieRef.current || prefersReducedMotion || showStatic) return;

    if (playOnHover) {
      if (isHovered) {
        lottieRef.current.play();
      } else {
        lottieRef.current.goToAndStop(0, true);
      }
    }
  }, [isHovered, playOnHover, prefersReducedMotion, showStatic]);

  // Pause animation when not in view to save battery/CPU
  useEffect(() => {
    if (!lottieRef.current || showStatic) return;

    if (inView) {
      lottieRef.current.play();
    } else {
      lottieRef.current.pause();
    }
  }, [inView, showStatic]);

  const handleMouseEnter = useCallback(() => {
    if (playOnHover) setIsHovered(true);
  }, [playOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (playOnHover) setIsHovered(false);
  }, [playOnHover]);

  const shouldAutoplay = autoplay && !playOnHover && !playOnView && !showStatic;

  // Show static image on mobile for best performance
  if (showStatic && staticImage) {
    return (
      <div ref={viewRef} className={className} style={style}>
        <img
          src={staticImage}
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  // Show loading placeholder while fetching animation
  if (isLoading || (!animationData && animationUrl)) {
    return (
      <div ref={viewRef} className={className} style={style}>
        <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full min-h-[200px]" />
      </div>
    );
  }

  // Don't render Lottie if no animation data
  if (!animationData) {
    return <div ref={viewRef} className={className} style={style} />;
  }

  return (
    <div
      ref={viewRef}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={shouldAutoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

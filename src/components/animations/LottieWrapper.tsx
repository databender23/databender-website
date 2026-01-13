"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

/**
 * Preload a Lottie animation file
 * Call this early to fetch critical animations before they're needed
 */
export function preloadLottie(url: string): void {
  if (typeof window === 'undefined') return;

  // Convert .json to .lottie if needed
  const src = url.endsWith('.lottie') ? url : url.replace('.json', '.lottie');

  // Use link preload for better browser optimization
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.href = src;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Preload multiple Lottie animations
 */
export function preloadLotties(urls: string[]): void {
  urls.forEach(preloadLottie);
}

// Use DotLottieReact for all devices (more compatible than worker version)
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full min-h-[200px]" />,
  }
);

interface LottieWrapperProps {
  /** URL to .lottie file (preferred) or .json file */
  animationUrl?: string;
  /** Animation data object (legacy, prefer animationUrl with .lottie) */
  animationData?: object;
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
  /** Speed multiplier for mobile (default: 0.75 for smoother playback) */
  mobileSpeed?: number;
  /** Freeze on last frame after first loop on mobile (default: true) */
  freezeAfterFirstLoop?: boolean;
  /** Use canvas renderer for better mobile performance (default: true on mobile) */
  useCanvasRenderer?: boolean;
  /** Priority loading - preload this animation (default: false) */
  priority?: boolean;
}

export default function LottieWrapper({
  animationUrl,
  animationData,
  staticImage,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnView = false,
  speed = 1,
  className = "",
  style,
  mobileOptimized = true,
  staticOnMobile = false,
  mobileSpeed = 0.75,
  freezeAfterFirstLoop = true,
  useCanvasRenderer = true,
  priority = false,
}: LottieWrapperProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dotLottieRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedFirstLoop, setHasCompletedFirstLoop] = useState(false);
  const loopCountRef = useRef(0);

  // Lazy load trigger - only load when close to viewport
  // Priority animations load immediately
  const { ref: viewRef, inView } = useInView({
    threshold: 0,
    rootMargin: priority ? "1000px" : "200px",
    triggerOnce: false,
  });

  // Check for mobile device
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

  const showStatic = prefersReducedMotion || (staticOnMobile && isMobile);

  // Convert .json URL to .lottie URL if available
  const getSrc = () => {
    if (!animationUrl) return undefined;
    // If it's already a .lottie file, use it directly
    if (animationUrl.endsWith('.lottie')) return animationUrl;
    // Try .lottie version first (smaller), fallback handled by component
    return animationUrl.replace('.json', '.lottie');
  };

  const src = getSrc();

  // Set speed when ready
  useEffect(() => {
    if (!dotLottieRef.current || !isReady) return;
    const effectiveSpeed = isMobile && mobileOptimized ? speed * mobileSpeed : speed;
    dotLottieRef.current.setSpeed(effectiveSpeed);
  }, [isReady, speed, isMobile, mobileOptimized, mobileSpeed]);

  // Handle play/pause based on viewport
  useEffect(() => {
    if (!dotLottieRef.current || !isReady || showStatic) return;

    if (inView) {
      dotLottieRef.current.play();
    } else {
      dotLottieRef.current.pause();
    }
  }, [inView, isReady, showStatic]);

  // Handle play on hover
  useEffect(() => {
    if (!dotLottieRef.current || !isReady || showStatic || !playOnHover) return;

    if (isHovered) {
      dotLottieRef.current.play();
    } else {
      dotLottieRef.current.stop();
    }
  }, [isHovered, isReady, showStatic, playOnHover]);

  const handleMouseEnter = useCallback(() => {
    if (playOnHover) setIsHovered(true);
  }, [playOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (playOnHover) setIsHovered(false);
  }, [playOnHover]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDotLottieRef = useCallback((ref: any) => {
    dotLottieRef.current = ref;
    if (ref) {
      // Listen for load event on the dotLottie instance
      ref.addEventListener('load', () => {
        setIsReady(true);
      });

      // Listen for loop completion to freeze after first loop on mobile
      ref.addEventListener('loop', () => {
        loopCountRef.current += 1;
        if (isMobile && mobileOptimized && freezeAfterFirstLoop && loopCountRef.current >= 1) {
          setHasCompletedFirstLoop(true);
          // Pause at current frame instead of stopping
          ref.pause();
        }
      });
    }
  }, [isMobile, mobileOptimized, freezeAfterFirstLoop]);

  // Show static image for reduced motion or mobile static mode
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

  // Don't render until in view (lazy load)
  if (!inView && !isReady) {
    return (
      <div ref={viewRef} className={className} style={style}>
        <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full min-h-[200px]" />
      </div>
    );
  }

  if (!src && !animationData) {
    return <div ref={viewRef} className={className} style={style} />;
  }

  const shouldAutoplay = autoplay && !playOnHover && !playOnView && !showStatic;

  // Effective loop - disable looping if already completed first loop on mobile
  const effectiveLoop = hasCompletedFirstLoop ? false : loop;

  // Mobile-optimized render config
  // Use canvas renderer and lower DPI for better performance
  const renderConfig = isMobile && mobileOptimized && useCanvasRenderer ? {
    // Use canvas renderer for better mobile performance
    devicePixelRatio: 1.5, // Lower than default 2x for smoother playback
  } : undefined;

  return (
    <div
      ref={viewRef}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DotLottieReact
        dotLottieRefCallback={handleDotLottieRef}
        src={src}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={animationData as any}
        loop={effectiveLoop}
        autoplay={shouldAutoplay}
        renderConfig={renderConfig}
        useFrameInterpolation={!isMobile} // Disable frame interpolation on mobile for performance
      />
    </div>
  );
}

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

  // Use link preload for better browser optimization
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.href = url;
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
  mobileSpeed = 0.5,
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
  // Ref to track isMobile for use in event listeners (avoids stale closure)
  const isMobileRef = useRef(false);

  // Lazy load trigger - only load when close to viewport
  // Priority animations load immediately, use triggerOnce to avoid re-triggering
  const { ref: viewRef, inView } = useInView({
    threshold: 0,
    rootMargin: priority ? "2000px" : "200px",
    triggerOnce: true,
  });

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      isMobileRef.current = mobile; // Keep ref in sync for event listeners
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

  // Use the animation URL as-is (no auto-conversion to .lottie)
  const src = animationUrl;

  // Set speed when ready - add small delay to ensure isMobile detection has settled
  useEffect(() => {
    if (!dotLottieRef.current || !isReady) return;

    // Small timeout to ensure isMobile has settled after hydration
    const timer = setTimeout(() => {
      const effectiveSpeed = isMobileRef.current && mobileOptimized ? speed * mobileSpeed : speed;
      dotLottieRef.current?.setSpeed(effectiveSpeed);
    }, 50);

    return () => clearTimeout(timer);
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
      // Use isMobileRef to get current value (not stale closure)
      ref.addEventListener('loop', () => {
        loopCountRef.current += 1;
        if (isMobileRef.current && mobileOptimized && freezeAfterFirstLoop && loopCountRef.current >= 1) {
          setHasCompletedFirstLoop(true);
          // Pause at current frame instead of stopping
          ref.pause();
        }
      });
    }
  }, [mobileOptimized, freezeAfterFirstLoop]);

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

  // Don't render until in view (lazy load) - but priority animations render immediately
  if (!priority && !inView && !isReady) {
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

  // Render config - use native DPR on desktop, cap at 2 on mobile for performance
  const getNativeDpr = () => {
    if (typeof window === 'undefined') return 2;
    const nativeDpr = window.devicePixelRatio;
    // Cap mobile DPR at 2 to balance quality vs performance (3x DPR = 9x pixels)
    return isMobile ? Math.min(nativeDpr, 2) : nativeDpr;
  };

  const renderConfig = {
    devicePixelRatio: getNativeDpr(),
    freezeOnOffscreen: true,
    autoResize: true,
  };

  return (
    <div
      ref={viewRef}
      className={className}
      style={{ minHeight: '100px', ...style }}
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
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

/**
 * Preload a Lottie animation file
 */
export function preloadLottie(url: string): void {
  if (typeof window === 'undefined') return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

export function preloadLotties(urls: string[]): void {
  urls.forEach(preloadLottie);
}

// Use lottie-react for JSON files (more compatible)
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full min-h-[200px]" />,
});

interface LottieWrapperProps {
  animationUrl?: string;
  animationData?: object;
  staticImage?: string;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  playOnView?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  mobileOptimized?: boolean;
  staticOnMobile?: boolean;
  mobileSpeed?: number;
  freezeAfterFirstLoop?: boolean;
  useCanvasRenderer?: boolean;
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
  priority = false,
}: LottieWrapperProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedAnimationData, setLoadedAnimationData] = useState<object | null>(animationData || null);
  const [hasCompletedFirstLoop, setHasCompletedFirstLoop] = useState(false);
  const loopCountRef = useRef(0);

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

  // Fetch animation data from URL
  useEffect(() => {
    if (!animationUrl || animationData) return;

    // Only fetch if in view or priority
    if (!priority && !inView) return;

    fetch(animationUrl)
      .then(res => res.json())
      .then(data => setLoadedAnimationData(data))
      .catch(err => console.error('Failed to load animation:', err));
  }, [animationUrl, animationData, inView, priority]);

  // Set speed
  useEffect(() => {
    if (!lottieRef.current) return;
    const effectiveSpeed = isMobile && mobileOptimized ? speed * mobileSpeed : speed;
    lottieRef.current.setSpeed(effectiveSpeed);
  }, [isMobile, mobileOptimized, speed, mobileSpeed, loadedAnimationData]);

  // Handle play/pause based on viewport
  useEffect(() => {
    if (!lottieRef.current) return;
    if (inView && !playOnHover) {
      lottieRef.current.play();
    } else if (!inView) {
      lottieRef.current.pause();
    }
  }, [inView, playOnHover]);

  // Handle play on hover
  useEffect(() => {
    if (!lottieRef.current || !playOnHover) return;
    if (isHovered) {
      lottieRef.current.play();
    } else {
      lottieRef.current.stop();
    }
  }, [isHovered, playOnHover]);

  const handleMouseEnter = useCallback(() => {
    if (playOnHover) setIsHovered(true);
  }, [playOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (playOnHover) setIsHovered(false);
  }, [playOnHover]);

  const handleLoopComplete = useCallback(() => {
    loopCountRef.current += 1;
    if (isMobile && mobileOptimized && freezeAfterFirstLoop && loopCountRef.current >= 1) {
      setHasCompletedFirstLoop(true);
      lottieRef.current?.pause();
    }
  }, [isMobile, mobileOptimized, freezeAfterFirstLoop]);

  const showStatic = prefersReducedMotion || (staticOnMobile && isMobile);

  // Show static image for reduced motion
  if (showStatic && staticImage) {
    return (
      <div ref={viewRef} className={className} style={style}>
        <img src={staticImage} alt="" className="w-full h-full object-contain" loading="lazy" />
      </div>
    );
  }

  // Show placeholder while loading (unless priority)
  if (!priority && !inView && !loadedAnimationData) {
    return (
      <div ref={viewRef} className={className} style={style}>
        <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full min-h-[200px]" />
      </div>
    );
  }

  // No animation data available
  if (!loadedAnimationData) {
    return (
      <div ref={viewRef} className={className} style={{ minHeight: '200px', ...style }}>
        <div className="animate-pulse bg-gray-100 rounded-lg w-full h-full" />
      </div>
    );
  }

  const shouldAutoplay = autoplay && !playOnHover && !playOnView && !showStatic;
  const effectiveLoop = hasCompletedFirstLoop ? false : loop;

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
        animationData={loadedAnimationData}
        loop={effectiveLoop}
        autoplay={shouldAutoplay}
        onLoopComplete={handleLoopComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

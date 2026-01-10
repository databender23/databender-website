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
  className?: string;
  style?: React.CSSProperties;
}

export default function LottieWrapper({
  animationData,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnView = false,
  className = "",
  style,
}: LottieWrapperProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { ref: viewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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

  // If user prefers reduced motion, show static first frame
  if (prefersReducedMotion) {
    return (
      <div ref={viewRef} className={className} style={style}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  const shouldAutoplay = autoplay && !playOnHover && !playOnView;

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
        loop={loop}
        autoplay={shouldAutoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

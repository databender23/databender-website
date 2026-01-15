"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export default function LinkedInCoverPage() {
  // Only accessible in development
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  // Callback to freeze animation at halfway point
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const freezeAtHalfway = useCallback((dotLottie: any) => {
    if (dotLottie) {
      dotLottie.addEventListener('load', () => {
        const totalFrames = dotLottie.totalFrames;
        const halfwayFrame = Math.floor(totalFrames / 2);
        dotLottie.setFrame(halfwayFrame);
        dotLottie.pause();
      });
    }
  }, []);

  // Callback to freeze animation at 25%
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const freezeAtQuarter = useCallback((dotLottie: any) => {
    if (dotLottie) {
      dotLottie.addEventListener('load', () => {
        const totalFrames = dotLottie.totalFrames;
        const quarterFrame = Math.floor(totalFrames / 4);
        dotLottie.setFrame(quarterFrame);
        dotLottie.pause();
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 gap-12">
      {/* Instructions */}
      <div className="text-white/60 text-sm text-center max-w-md">
        <p className="mb-2">Company LinkedIn Cover: 1584 x 396px</p>
        <p>Screenshot the banner you like, or use Chrome DevTools to capture exact size.</p>
      </div>

      {/* Option A - Three Lotties with minimal tagline */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option A - Lottie Trio</p>
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Subtle gradient background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(135deg, #e0f7f5 0%, #ffffff 50%, #f0fdfa 100%)'
            }}
          />

          {/* Left - Data management Lottie */}
          <div className="absolute left-48 top-1/2 -translate-y-1/2 w-[260px] h-[260px] opacity-90">
            <DotLottieReact
              src="/animations/data-management.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Center - Hero data Lottie + minimal text */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-[240px] h-[240px] opacity-90 -mb-4">
              <DotLottieReact
                src="/animations/hero-data.json"
                loop={false}
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-[#1A1A1A]"
            >
              Senior Expertise. <span className="text-teal-500">AI-Powered Speed.</span>
            </motion.p>
          </div>

          {/* Right - Growth chart Lottie */}
          <div className="absolute right-48 top-1/2 -translate-y-1/2 w-[260px] h-[260px] opacity-90">
            <DotLottieReact
              src="/animations/growth-chart.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Option B - Four Lotties with data stream story */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option B - Data Story</p>
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Sleek stream with single curve around mountain */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1584 396" preserveAspectRatio="none">
            {/* Single subtle mountain peak */}
            <path
              d="M500 396 L500 200 L750 80 L1000 200 L1000 396 Z"
              fill="#e5e7eb"
              opacity="0.15"
            />

            {/* Sleek stream - single elegant curve around the peak, shooting to top right corner */}
            <path
              d="M-50 70 C 200 70, 400 70, 550 120 C 700 170, 800 170, 950 120 C 1100 70, 1250 30, 1650 -50"
              stroke="url(#sleekStreamGradient)"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
            />
            {/* Inner highlight */}
            <path
              d="M-50 70 C 200 70, 400 70, 550 120 C 700 170, 800 170, 950 120 C 1100 70, 1250 30, 1650 -50"
              stroke="#ffffff"
              strokeWidth="15"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />

            <defs>
              <linearGradient id="sleekStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#e5e7eb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Teal accent at bottom */}
          <svg className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none" viewBox="0 0 1584 50" preserveAspectRatio="none">
            <path d="M0 25 Q 400 50 792 25 Q 1184 0 1584 25 L 1584 50 L 0 50 Z" fill="#1A9988" />
          </svg>

          {/* Story flow: AI Collaboration > Growth > Databender */}
          {/* All items floating through space with shadows and slight rotations */}

          {/* Position 1 - AI collaboration (frozen, floating) */}
          <div
            className="absolute left-[640px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] z-10"
            style={{
              transform: 'translate(-50%, -50%) rotate(-2deg) translateY(55px)',
              filter: 'drop-shadow(0 20px 40px rgba(26, 153, 136, 0.25)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))'
            }}
          >
            <DotLottieReact
              src="/animations/man-robot-workplace.json"
              loop={false}
              autoplay={false}
              dotLottieRefCallback={freezeAtQuarter}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Position 2 - Growth/transformation (frozen, floating) */}
          <div
            className="absolute left-[1005px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] z-10"
            style={{
              transform: 'translate(-50%, -50%) rotate(3deg) translateY(-10px)',
              filter: 'drop-shadow(0 20px 40px rgba(26, 153, 136, 0.25)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))'
            }}
          >
            <DotLottieReact
              src="/animations/growth-chart.json"
              loop={false}
              autoplay={false}
              dotLottieRefCallback={freezeAtHalfway}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Position 3 - Databender logo (aligned with tagline) */}
          <div
            className="absolute right-48 top-1/2 z-10"
            style={{
              transform: 'translateY(calc(-50% - 75px)) translateX(-40px)'
            }}
          >
            <Image
              src="/images/logo-color.png"
              alt="Databender"
              width={180}
              height={180}
              className="rounded-2xl"
            />
          </div>

          {/* Bottom - Subtle tagline */}
          <p className="absolute bottom-44 right-48 text-sm italic text-[#6B7280] z-10">
            Senior Expertise. <span className="text-teal-500">AI-Powered Speed.</span>
          </p>
        </div>
      </div>

      {/* Option C - Visual with subtle tagline */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option C - Visual Focus</p>
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Subtle gradient background */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 40%, #e0f7f5 100%)'
            }}
          />

          {/* Left - Workflow */}
          <div className="absolute left-56 top-1/2 -translate-y-1/2 w-[240px] h-[240px] opacity-90">
            <DotLottieReact
              src="/animations/workflow-process.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Center - Hero data (larger) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[320px] h-[320px] opacity-95">
            <DotLottieReact
              src="/animations/hero-data.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Right - Automation */}
          <div className="absolute right-56 top-1/2 -translate-y-1/2 w-[240px] h-[240px] opacity-90">
            <DotLottieReact
              src="/animations/automation.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Bottom right - Subtle tagline */}
          <p className="absolute bottom-4 right-8 text-sm italic text-[#6B7280]">
            Senior Expertise. <span className="text-teal-500">AI-Powered Speed.</span>
          </p>
        </div>
      </div>

      {/* Option D - Playful with student/learning vibe */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option D - Friendly & Fun</p>
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Warmer gradient */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: 'linear-gradient(120deg, #f0fdfa 0%, #ffffff 50%, #ccfbf1 100%)'
            }}
          />

          {/* Left - Student/learning */}
          <div className="absolute left-48 top-1/2 -translate-y-1/2 w-[250px] h-[250px] opacity-90">
            <DotLottieReact
              src="/animations/student.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Center - Wavey birdie + tiny text */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-[200px] h-[200px] opacity-90 -mb-2">
              <DotLottieReact
                src="/animations/wavey-birdie.json"
                loop={false}
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <p className="text-xl font-medium text-[#4A4A4A]">
              Data & AI that <span className="text-teal-500 font-bold">works</span>
            </p>
          </div>

          {/* Right - Roadmap */}
          <div className="absolute right-48 top-1/2 -translate-y-1/2 w-[250px] h-[250px] opacity-90">
            <DotLottieReact
              src="/animations/roadmap.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

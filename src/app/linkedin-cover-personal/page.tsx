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

// Callback to freeze animation at halfway point
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const freezeAtHalfway = (dotLottie: any) => {
  if (dotLottie) {
    dotLottie.addEventListener('load', () => {
      const totalFrames = dotLottie.totalFrames;
      const halfwayFrame = Math.floor(totalFrames / 2);
      dotLottie.setFrame(halfwayFrame);
      dotLottie.pause();
    });
  }
};

// Floating data nodes component
function FloatingElements() {
  const elements = [
    { x: "15%", y: "20%", size: 12, delay: 0, color: "#1A9988" },
    { x: "25%", y: "70%", size: 8, delay: 0.2, color: "#2dd4bf" },
    { x: "75%", y: "25%", size: 10, delay: 0.4, color: "#1A9988" },
    { x: "85%", y: "65%", size: 14, delay: 0.1, color: "#2dd4bf" },
    { x: "70%", y: "80%", size: 6, delay: 0.3, color: "#1A9988" },
    { x: "20%", y: "45%", size: 8, delay: 0.5, color: "#5eead4" },
  ];

  return (
    <>
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            backgroundColor: el.color,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// Mini chart illustration
function MiniChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <motion.rect
        x="5" y="35" width="12" height="20" rx="2" fill="#1A9988"
        initial={{ height: 0, y: 55 }}
        animate={{ height: 20, y: 35 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.rect
        x="22" y="25" width="12" height="30" rx="2" fill="#2dd4bf"
        initial={{ height: 0, y: 55 }}
        animate={{ height: 30, y: 25 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.rect
        x="39" y="15" width="12" height="40" rx="2" fill="#1A9988"
        initial={{ height: 0, y: 55 }}
        animate={{ height: 40, y: 15 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.rect
        x="56" y="5" width="12" height="50" rx="2" fill="#5eead4"
        initial={{ height: 0, y: 55 }}
        animate={{ height: 50, y: 5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
    </svg>
  );
}

// Sparkle/star decoration
function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      fill="#1A9988"
      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, delay, repeat: Infinity }}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </motion.svg>
  );
}

export default function LinkedInCoverPersonalPage() {
  // Only accessible in development
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 gap-12">
      {/* Instructions */}
      <div className="text-white/60 text-sm text-center max-w-md">
        <p className="mb-2">Personal LinkedIn Cover: 1584 x 396px</p>
        <p>Screenshot the banner you like, or use Chrome DevTools to capture exact size.</p>
      </div>

      {/* Option A - Playful with animations and logo */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option A - Animated & Fun</p>
        <div
          className="relative overflow-hidden bg-gradient-to-br from-white via-white to-teal-50"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <FloatingElements />

          {/* Teal gradient blobs */}
          <div
            className="absolute -left-20 -bottom-20 w-[300px] h-[300px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' }}
          />
          <div
            className="absolute -right-10 -top-10 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #1A9988 0%, transparent 70%)' }}
          />

          {/* Left side - Lottie animation */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 w-[280px] h-[280px]">
            <DotLottieReact
              src="/animations/man-robot-workplace.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center ml-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-4 mb-2"
              >
                <Image
                  src="/images/logo-icon.png"
                  alt="Databender"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <span className="text-2xl font-bold text-teal-600">Databender</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-medium text-[#1A1A1A]"
              >
                Making data <span className="text-teal-500 font-bold">fun</span> & AI <span className="text-teal-500 font-bold">useful</span>
              </motion.p>
            </div>
          </div>

          {/* Right side decorations */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2">
            <MiniChart className="w-24 h-20" />
          </div>

          <Sparkle className="absolute right-48 top-12 w-6 h-6" delay={0} />
          <Sparkle className="absolute right-16 bottom-16 w-4 h-4" delay={0.5} />
          <Sparkle className="absolute left-[340px] top-8 w-5 h-5" delay={1} />
        </div>
      </div>

      {/* Option B - Visual Focus with teal styling */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option B - Teal Pop</p>
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Teal accent at top */}
          <svg className="absolute top-0 left-0 w-full h-20 opacity-25" viewBox="0 0 1584 80" preserveAspectRatio="none">
            <path d="M0 40 Q 400 0 792 40 Q 1184 80 1584 40 L 1584 0 L 0 0 Z" fill="#1A9988" />
          </svg>

          {/* Evenly distributed: Lottie - Logo - Lottie */}
          {/* Usable area: 350px to 1484px (leaving room for profile pic on left) */}
          {/* Centers at: 533px, 917px, 1300px */}

          {/* Position 1 - Hero data */}
          <div className="absolute left-[530px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px]">
            <DotLottieReact
              src="/animations/hero-data.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Position 2 - Floating Databender logo (center) */}
          <div
            className="absolute left-[917px] top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: 'translate(-50%, -50%) rotate(-3deg) translateY(90px) translateX(95px)',
              filter: 'drop-shadow(0 25px 50px rgba(26, 153, 136, 0.35)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))'
            }}
          >
            <Image
              src="/images/logo-icon.png"
              alt="Databender"
              width={170}
              height={170}
              className="rounded-2xl"
            />
          </div>

          {/* Position 3 - Analytics BI */}
          <div className="absolute left-[1314px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px]">
            <DotLottieReact
              src="/animations/analytics-bi.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

        </div>
      </div>

      {/* Option C - Empowerment theme */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option C - Empowerment</p>
        <div
          className="relative overflow-hidden"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 40%, #f0fdfa 100%)'
          }}
        >
          <FloatingElements />

          {/* Wave decoration at bottom */}
          <svg className="absolute bottom-0 left-0 w-full h-20 opacity-20" viewBox="0 0 1584 80" preserveAspectRatio="none">
            <path d="M0 40 Q 400 80 792 40 Q 1184 0 1584 40 L 1584 80 L 0 80 Z" fill="#1A9988" />
          </svg>

          {/* Left - Person with robot */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 w-[300px] h-[300px]">
            <DotLottieReact
              src="/animations/man-robot-workplace.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl font-bold text-[#1A1A1A] mb-2"
              >
                Empowering teams with
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-bold text-teal-500"
              >
                data superpowers ⚡
              </motion.p>
            </div>
          </div>

          {/* Right - Data viz */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[280px] h-[280px]">
            <DotLottieReact
              src="/animations/data-visualization.json"
              loop={false}
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Logo in corner */}
          <div className="absolute bottom-4 right-6">
            <Image
              src="/images/logo-icon.png"
              alt="Databender"
              width={40}
              height={40}
              className="opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Option D - Minimal but playful */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-wider">Option D - Clean & Playful</p>
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: '1584px',
            height: '396px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Dotted pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #1A9988 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Teal corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <circle cx="0" cy="0" r="80" fill="#1A9988" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-15">
              <circle cx="100" cy="100" r="90" fill="#2dd4bf" />
            </svg>
          </div>

          {/* Floating emojis/icons */}
          <motion.span
            className="absolute left-[15%] top-[25%] text-4xl"
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📊
          </motion.span>
          <motion.span
            className="absolute right-[20%] top-[20%] text-3xl"
            animate={{ y: [0, -6, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          >
            🤖
          </motion.span>
          <motion.span
            className="absolute left-[20%] bottom-[25%] text-3xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute right-[15%] bottom-[30%] text-4xl"
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: 0.2 }}
          >
            🚀
          </motion.span>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-8">
              <Image
                src="/images/logo-icon.png"
                alt="Databender"
                width={80}
                height={80}
                className="rounded-xl shadow-lg"
              />
              <div>
                <p className="text-4xl font-bold text-[#1A1A1A]">
                  Let&apos;s make your data
                </p>
                <p className="text-4xl font-bold text-teal-500">
                  work for you 🎯
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

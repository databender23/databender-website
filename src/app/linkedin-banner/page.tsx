"use client";

import { motion } from "framer-motion";

export default function LinkedInCoverPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {/* Instructions */}
      <div className="fixed top-4 left-4 text-white/60 text-sm max-w-xs">
        <p className="mb-2">LinkedIn Cover: 1584 x 396px</p>
        <p className="mb-2">To export: Screenshot the banner below, or use browser dev tools to capture at exact size.</p>
        <p className="text-xs">Tip: Zoom browser to 100% for accurate dimensions</p>
      </div>

      {/* The actual banner - exact LinkedIn dimensions */}
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: '1584px',
          height: '396px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Teal gradient accent - right side */}
        <div
          className="absolute -right-20 -top-20 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #1A9988 0%, transparent 70%)',
          }}
        />

        {/* Secondary smaller accent */}
        <div
          className="absolute right-40 bottom-0 w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)',
          }}
        />

        {/* Flowing curved line accent */}
        <svg
          className="absolute right-0 top-0 h-full w-1/3 opacity-30"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMaxYMid slice"
        >
          <path
            d="M 350 0 Q 250 100 300 200 Q 350 300 250 400"
            stroke="#1A9988"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 400 50 Q 300 150 350 250 Q 400 350 300 450"
            stroke="#1A9988"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
        </svg>

        {/* Text content - centered */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold text-[#1A1A1A] leading-tight tracking-tight"
          >
            Senior Expertise.
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl font-bold text-teal-500 leading-tight tracking-tight"
          >
            AI-Powered Speed.
          </motion.h1>
        </div>
      </div>
    </div>
  );
}

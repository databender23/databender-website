"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ClientLogo {
  name: string;
  src: string;
  width?: number;
  height?: number;
  invert?: boolean; // For white logos that need to be inverted on white background
}

const clientLogos: ClientLogo[] = [
  { name: "4CX", src: "/images/logos/4cx_logo.png", width: 100, height: 40, invert: true },
  { name: "Reformed", src: "/images/logos/reformed_logo.png", width: 120, height: 40 },
  { name: "Health Price Compare", src: "/images/logos/hpc_logo.svg", width: 100, height: 40 },
  { name: "AAN", src: "/images/logos/aan_logo.png", width: 80, height: 40 },
  { name: "Brava", src: "/images/logos/brava_logo.webp", width: 100, height: 40 },
  { name: "707 Advisors", src: "/images/logos/707_logo.avif", width: 80, height: 40 },
  { name: "Hoosier OsteoTronix", src: "/images/logos/hoosier_logo.png", width: 140, height: 40 },
  { name: "Haystack", src: "/images/logos/haystack_logo.svg", width: 140, height: 40 },
  { name: "SurgiScribe", src: "/images/logos/surgiscribe_logo.png", width: 120, height: 40 },
  { name: "Show Goat", src: "/images/logos/show_goat_logo.avif", width: 140, height: 40 },
  { name: "Arctec", src: "/images/logos/arctec_logo.avif", width: 100, height: 40, invert: true },
];

// Logo item component for reuse
function LogoItem({ logo }: { logo: ClientLogo }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <Image
        src={logo.src}
        alt={`${logo.name} logo`}
        width={logo.width || 120}
        height={logo.height || 40}
        className={`h-8 md:h-10 w-auto object-contain ${logo.invert ? "invert" : ""}`}
      />
    </div>
  );
}

export default function ClientLogos() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 md:py-16 overflow-hidden border-b border-black/5">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-text-muted mb-8 tracking-wide"
        >
          Trusted by growing companies
        </motion.p>
      </div>

      {/* Infinite Scroll Marquee - CSS only for true seamless loop */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Two identical tracks side by side for seamless infinite scroll */}
        <div
          className="flex"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {/* First track */}
          <div
            className="flex items-center gap-12 md:gap-16 animate-scroll"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {clientLogos.map((logo, index) => (
              <LogoItem key={`track1-${logo.name}-${index}`} logo={logo} />
            ))}
          </div>
          {/* Second track (duplicate for seamless loop) */}
          <div
            className="flex items-center gap-12 md:gap-16 animate-scroll"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {clientLogos.map((logo, index) => (
              <LogoItem key={`track2-${logo.name}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

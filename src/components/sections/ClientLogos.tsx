"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ClientLogo {
  name: string;
  src: string;
  width?: number;
  height?: number;
}

const clientLogos: ClientLogo[] = [
  { name: "4CX", src: "/images/logos/4cx_logo.png", width: 100, height: 40 },
  { name: "Reformed", src: "/images/logos/reformed_logo.png", width: 120, height: 40 },
  { name: "Health Price Compare", src: "/images/logos/hpc_logo.svg", width: 100, height: 40 },
  { name: "AAN", src: "/images/logos/aan_logo.png", width: 80, height: 40 },
  { name: "Brava", src: "/images/logos/brava_logo.webp", width: 100, height: 40 },
  { name: "707 Advisors", src: "/images/logos/707_logo.avif", width: 80, height: 40 },
  { name: "Hoosier OsteoTronix", src: "/images/logos/hoosier_logo.png", width: 140, height: 40 },
];

export default function ClientLogos() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...clientLogos, ...clientLogos];

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

      {/* Infinite Scroll Marquee */}
      <div
        ref={containerRef}
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div
          className={`flex items-center gap-12 md:gap-16 ${isPaused ? "animate-marquee-paused" : "animate-marquee"}`}
          style={{
            width: "fit-content",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width || 120}
                height={logo.height || 40}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee-paused {
          animation: marquee 30s linear infinite;
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

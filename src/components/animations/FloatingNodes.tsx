"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Seeded random for consistent node positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  offsetX: number;
  offsetY: number;
  isSpecial: boolean;
}

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
}

interface FloatingNodesProps {
  nodeCount?: number;
  className?: string;
  showConnections?: boolean;
}

export default function FloatingNodes({
  nodeCount = 18,
  className = "",
  showConnections = true,
}: FloatingNodesProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [specialNodeActive, setSpecialNodeActive] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate nodes on client-side only to avoid hydration mismatch
  useEffect(() => {
    const seed = 42; // Consistent seed for deterministic generation
    const generatedNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: seededRandom(seed + i * 6) * 100,
      y: seededRandom(seed + i * 6 + 1) * 100,
      size: 2 + seededRandom(seed + i * 6 + 2) * 2,
      duration: 20 + seededRandom(seed + i * 6 + 3) * 15,
      delay: seededRandom(seed + i * 6 + 4) * 5,
      offsetX: (seededRandom(seed + i * 6 + 5) - 0.5) * 10,
      offsetY: (seededRandom(seed + i * 6 + 6) - 0.5) * 10,
      isSpecial: i === 0,
    }));
    // Schedule state update to avoid synchronous setState in effect
    requestAnimationFrame(() => setNodes(generatedNodes));

    // Generate connections
    if (showConnections) {
      const lines: Connection[] = [];
      const maxDistance = 25;

      for (let i = 0; i < generatedNodes.length; i++) {
        for (let j = i + 1; j < generatedNodes.length; j++) {
          const dx = generatedNodes[i].x - generatedNodes[j].x;
          const dy = generatedNodes[i].y - generatedNodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            lines.push({
              x1: generatedNodes[i].x,
              y1: generatedNodes[i].y,
              x2: generatedNodes[j].x,
              y2: generatedNodes[j].y,
              id: `${i}-${j}`,
            });
          }
        }
      }
      // Schedule state update to avoid synchronous setState in effect
      requestAnimationFrame(() => setConnections(lines));
    }

    // Schedule state update to avoid synchronous setState in effect
    requestAnimationFrame(() => setIsMounted(true));
  }, [nodeCount, showConnections]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Schedule state update to avoid synchronous setState in effect
    requestAnimationFrame(() => setPrefersReducedMotion(mediaQuery.matches));

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Easter egg: Special node blinks teal occasionally
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Use a fixed interval (30s) to avoid Math.random during effect setup
    const interval = setInterval(() => {
      setSpecialNodeActive(true);
      setTimeout(() => setSpecialNodeActive(false), 800);
    }, 30000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Don't render anything on server to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      />
    );
  }

  if (prefersReducedMotion) {
    // Show static nodes for reduced motion
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        {nodes.slice(0, 8).map((node) => (
          <div
            key={node.id}
            className="absolute rounded-full bg-white/5"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="rgba(26, 153, 136, 0.08)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute rounded-full ${
            node.isSpecial && specialNodeActive
              ? "bg-teal-500/60"
              : "bg-white/6"
          }`}
          style={{
            width: node.size,
            height: node.size,
            willChange: "transform",
          }}
          initial={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            left: [`${node.x}%`, `${node.x + node.offsetX}%`, `${node.x}%`],
            top: [`${node.y}%`, `${node.y + node.offsetY}%`, `${node.y}%`],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
        />
      ))}

      {/* Special node glow effect */}
      {specialNodeActive && nodes[0] && (
        <motion.div
          className="absolute rounded-full bg-teal-500/20 blur-md"
          style={{
            width: 20,
            height: 20,
            left: `${nodes[0].x}%`,
            top: `${nodes[0].y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 0.8 }}
        />
      )}
    </div>
  );
}

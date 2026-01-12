'use client';

import { type ReactNode, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDiagram } from './DiagramProvider';
import { defaultTheme, ANIMATION, type DiagramTheme, type ViewportConfig } from './types';

// ============================================================================
// Types
// ============================================================================

interface DiagramCanvasProps {
  children: ReactNode;
  className?: string;
  /** Override theme from config */
  theme?: Partial<DiagramTheme>;
  /** Override viewport from config */
  viewport?: Partial<ViewportConfig>;
  /** Show grid pattern overlay */
  showGrid?: boolean;
  /** Show decorative glow spots */
  showGlowSpots?: boolean;
  /** Number of glow spots to render */
  glowSpotCount?: number;
}

interface GlowSpotProps {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  reducedMotion: boolean;
}

// ============================================================================
// Default Configuration
// ============================================================================

const DEFAULT_VIEWPORT: ViewportConfig = {
  width: 100,
  height: 100,
  padding: 4,
};

// ============================================================================
// Glow Spot Component
// ============================================================================

function GlowSpot({ x, y, size, color, delay, reducedMotion }: GlowSpotProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0.3 }}
      animate={
        reducedMotion
          ? { opacity: 0.3 }
          : {
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }
      }
      transition={{
        duration: ANIMATION.pulseDuration / 1000,
        delay: delay / 1000,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ============================================================================
// Grid Pattern Component
// ============================================================================

interface GridPatternProps {
  color: string;
  size?: number;
}

function GridPattern({ color, size = 30 }: GridPatternProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

// ============================================================================
// Main Canvas Component
// ============================================================================

export function DiagramCanvas({
  children,
  className = '',
  theme: themeProp,
  viewport: viewportProp,
  showGrid = true,
  showGlowSpots = true,
  glowSpotCount = 3,
}: DiagramCanvasProps) {
  const { state, config } = useDiagram();

  // Merge theme from props > config > default
  const theme = useMemo<DiagramTheme>(
    () => ({
      ...defaultTheme,
      ...(config.theme ?? {}),
      ...(themeProp ?? {}),
    }),
    [config.theme, themeProp]
  );

  // Merge viewport from props > config > default
  const viewport = useMemo<ViewportConfig>(
    () => ({
      ...DEFAULT_VIEWPORT,
      ...(config.viewport ?? {}),
      ...(viewportProp ?? {}),
    }),
    [config.viewport, viewportProp]
  );

  // Generate random but consistent glow spot positions
  const glowSpots = useMemo(() => {
    const spots = [];
    const positions = [
      { x: 85, y: 15 }, // Top right
      { x: 10, y: 80 }, // Bottom left
      { x: 50, y: 50 }, // Center (subtle)
      { x: 20, y: 20 }, // Top left
      { x: 80, y: 85 }, // Bottom right
    ];

    for (let i = 0; i < Math.min(glowSpotCount, positions.length); i++) {
      const pos = positions[i];
      spots.push({
        id: i,
        x: pos.x,
        y: pos.y,
        size: i === 2 ? 200 : 180 + i * 20, // Center spot is larger
        color:
          i % 2 === 0
            ? theme.glowColor
            : theme.glowColor.replace('0.6', '0.4'),
        delay: i * 300,
      });
    }
    return spots;
  }, [glowSpotCount, theme.glowColor]);

  const viewBoxString = `0 0 ${viewport.width} ${viewport.height}`;

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, ${theme.backgroundStart} 0%, ${theme.backgroundEnd} 40%, #251545 100%)`,
      }}
    >
      {/* Grid pattern overlay */}
      {showGrid && <GridPattern color={theme.gridColor} />}

      {/* Decorative glow spots */}
      {showGlowSpots &&
        glowSpots.map((spot) => (
          <GlowSpot
            key={spot.id}
            x={spot.x}
            y={spot.y}
            size={spot.size}
            color={spot.color}
            delay={spot.delay}
            reducedMotion={state.reducedMotion}
          />
        ))}

      {/* SVG Canvas */}
      <svg
        viewBox={viewBoxString}
        className="relative w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ padding: viewport.padding }}
      >
        {/* Gradient definitions */}
        <defs>
          {/* Primary glow gradient for nodes */}
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.primary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
          </radialGradient>

          {/* Connection flow gradient */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.primary} stopOpacity="0" />
            <stop offset="50%" stopColor={theme.primary} stopOpacity="1" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
          </linearGradient>

          {/* Highlight glow filter */}
          <filter
            id="highlightGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft drop shadow */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#000"
              floodOpacity="0.3"
            />
          </filter>

          {/* Animated dash pattern for connections */}
          <pattern
            id="animatedDash"
            patternUnits="userSpaceOnUse"
            width="10"
            height="1"
          >
            <line
              x1="0"
              y1="0.5"
              x2="5"
              y2="0.5"
              stroke={theme.primary}
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Render children (nodes, connections, etc.) */}
        {children}
      </svg>
    </div>
  );
}

// ============================================================================
// Canvas Sub-components for organization
// ============================================================================

interface CanvasLayerProps {
  children: ReactNode;
}

/**
 * Layer for rendering connections (below nodes).
 */
export function ConnectionLayer({ children }: CanvasLayerProps) {
  return <g className="connections-layer">{children}</g>;
}

/**
 * Layer for rendering nodes (above connections).
 */
export function NodeLayer({ children }: CanvasLayerProps) {
  return <g className="nodes-layer">{children}</g>;
}

/**
 * Layer for rendering labels and annotations (topmost).
 */
export function LabelLayer({ children }: CanvasLayerProps) {
  return <g className="labels-layer">{children}</g>;
}

// ============================================================================
// Hero Metric Component (for displaying main KPIs)
// ============================================================================

interface HeroMetricProps {
  x?: number;
  y?: number;
  className?: string;
}

export function HeroMetric({ x = 50, y = 12, className = '' }: HeroMetricProps) {
  const { config } = useDiagram();
  const heroMetric = config.heroMetric;

  if (!heroMetric) return null;

  const color = heroMetric.color ?? '#ffffff';

  return (
    <motion.g
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <text
        x={x}
        y={y}
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
      >
        {heroMetric.prefix && (
          <tspan fill={color}>{heroMetric.prefix}</tspan>
        )}
        {heroMetric.value}
        {heroMetric.suffix && (
          <tspan fill={color}>{heroMetric.suffix}</tspan>
        )}
      </text>
      <text
        x={x}
        y={y + 6}
        fill="rgba(255,255,255,0.6)"
        fontSize="3"
        textAnchor="middle"
      >
        {heroMetric.label}
      </text>
    </motion.g>
  );
}

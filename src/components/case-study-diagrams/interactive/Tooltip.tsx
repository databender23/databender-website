'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION } from '../core/types';

// ============================================================================
// Types
// ============================================================================

interface TooltipProps {
  /** Content to display in the tooltip */
  content: ReactNode;
  /** Element that triggers the tooltip */
  children: ReactNode;
  /** Position preference (will auto-adjust if needed) */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Offset from trigger element in pixels */
  offset?: number;
  /** Delay before showing tooltip in ms */
  delay?: number;
  /** Whether the tooltip is currently visible (controlled mode) */
  visible?: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Additional class name for tooltip container */
  className?: string;
  /** Whether to show the arrow pointer */
  showArrow?: boolean;
  /** Max width of tooltip */
  maxWidth?: number;
}

interface TooltipPosition {
  x: number;
  y: number;
  actualPosition: 'top' | 'bottom' | 'left' | 'right';
}

// ============================================================================
// Hook for Position Calculation
// ============================================================================

function useTooltipPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  tooltipRef: React.RefObject<HTMLDivElement | null>,
  preferredPosition: 'top' | 'bottom' | 'left' | 'right',
  offset: number,
  visible: boolean
): TooltipPosition {
  const [position, setPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
    actualPosition: preferredPosition,
  });

  const calculatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;

    if (!trigger || !tooltip || !visible) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = 0;
    let y = 0;
    let actualPosition = preferredPosition;

    // Calculate initial position based on preference
    const positions = {
      top: () => {
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - offset;
      },
      bottom: () => {
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + offset;
      },
      left: () => {
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      },
      right: () => {
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      },
    };

    positions[preferredPosition]();

    // Check if tooltip overflows viewport and adjust
    const padding = 8;

    // Horizontal overflow check
    if (x < padding) {
      x = padding;
    } else if (x + tooltipRect.width > viewportWidth - padding) {
      x = viewportWidth - tooltipRect.width - padding;
    }

    // Vertical overflow check - flip position if needed
    if (preferredPosition === 'top' && y < padding) {
      positions.bottom();
      actualPosition = 'bottom';
    } else if (
      preferredPosition === 'bottom' &&
      y + tooltipRect.height > viewportHeight - padding
    ) {
      positions.top();
      actualPosition = 'top';
    }

    // Left/right flip
    if (preferredPosition === 'left' && x < padding) {
      positions.right();
      actualPosition = 'right';
    } else if (
      preferredPosition === 'right' &&
      x + tooltipRect.width > viewportWidth - padding
    ) {
      positions.left();
      actualPosition = 'left';
    }

    // Final boundary clamp
    y = Math.max(padding, Math.min(y, viewportHeight - tooltipRect.height - padding));

    setPosition({ x, y, actualPosition });
  }, [triggerRef, tooltipRef, preferredPosition, offset, visible]);

  useEffect(() => {
    if (visible) {
      // Initial calculation
      calculatePosition();

      // Recalculate on scroll/resize
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);

      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [visible, calculatePosition]);

  return position;
}

// ============================================================================
// Arrow Component
// ============================================================================

interface ArrowProps {
  position: 'top' | 'bottom' | 'left' | 'right';
}

function Arrow({ position }: ArrowProps) {
  const rotations = {
    top: 'rotate-180',
    bottom: 'rotate-0',
    left: 'rotate-90',
    right: '-rotate-90',
  };

  const positions = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full',
  };

  return (
    <div className={`absolute ${positions[position]}`}>
      <svg
        className={`w-3 h-2 ${rotations[position]}`}
        viewBox="0 0 12 8"
        fill="none"
      >
        <path
          d="M6 0L12 8H0L6 0Z"
          fill="rgba(0, 0, 0, 0.9)"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// Animation Variants
// ============================================================================

const tooltipVariants = {
  hidden: (position: 'top' | 'bottom' | 'left' | 'right') => {
    const offsets = {
      top: { opacity: 0, y: 5, scale: 0.95 },
      bottom: { opacity: 0, y: -5, scale: 0.95 },
      left: { opacity: 0, x: 5, scale: 0.95 },
      right: { opacity: 0, x: -5, scale: 0.95 },
    };
    return offsets[position];
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
  exit: (position: 'top' | 'bottom' | 'left' | 'right') => {
    const offsets = {
      top: { opacity: 0, y: 5, scale: 0.95 },
      bottom: { opacity: 0, y: -5, scale: 0.95 },
      left: { opacity: 0, x: 5, scale: 0.95 },
      right: { opacity: 0, x: -5, scale: 0.95 },
    };
    return offsets[position];
  },
};

// ============================================================================
// Main Component
// ============================================================================

export function Tooltip({
  content,
  children,
  position: preferredPosition = 'top',
  offset = 8,
  delay = 0,
  visible: controlledVisible,
  onVisibilityChange,
  className = '',
  showArrow = true,
  maxWidth = 250,
}: TooltipProps) {
  const [internalVisible, setInternalVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use controlled or internal visibility
  const isVisible = controlledVisible ?? internalVisible;

  const { x, y, actualPosition } = useTooltipPosition(
    triggerRef,
    tooltipRef,
    preferredPosition,
    offset,
    isVisible
  );

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setInternalVisible(true);
        onVisibilityChange?.(true);
      }, delay);
    } else {
      setInternalVisible(true);
      onVisibilityChange?.(true);
    }
  }, [delay, onVisibilityChange]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setInternalVisible(false);
    onVisibilityChange?.(false);
  }, [onVisibilityChange]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Trigger element */}
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </span>

      {/* Tooltip portal */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            role="tooltip"
            className={`
              fixed z-50 px-3 py-2 rounded-lg
              bg-black/90 backdrop-blur-sm
              text-white text-sm
              shadow-lg shadow-black/20
              pointer-events-none
              ${className}
            `}
            style={{
              left: x,
              top: y,
              maxWidth,
            }}
            custom={actualPosition}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: ANIMATION.tooltipDuration / 1000,
              ease: ANIMATION.easeOut,
            }}
          >
            {content}
            {showArrow && <Arrow position={actualPosition} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================================
// SVG Tooltip Component (for use within SVG diagrams)
// ============================================================================

interface SVGTooltipProps {
  /** X position in SVG coordinates */
  x: number;
  /** Y position in SVG coordinates */
  y: number;
  /** Content to display */
  content: string;
  /** Whether tooltip is visible */
  visible: boolean;
  /** Width of tooltip box */
  width?: number;
  /** Position relative to point */
  position?: 'top' | 'bottom';
}

export function SVGTooltip({
  x,
  y,
  content,
  visible,
  width = 30,
  position = 'top',
}: SVGTooltipProps) {
  const yOffset = position === 'top' ? -12 : 8;
  const textY = position === 'top' ? y - 6 : y + 14;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0, y: position === 'top' ? 3 : -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? 3 : -3 }}
          transition={{
            duration: ANIMATION.tooltipDuration / 1000,
            ease: ANIMATION.easeOut,
          }}
        >
          <rect
            x={x - width / 2}
            y={y + yOffset}
            width={width}
            height={10}
            rx={2}
            fill="rgba(0, 0, 0, 0.9)"
          />
          <text
            x={x}
            y={textY}
            fill="white"
            fontSize={3}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {content}
          </text>
        </motion.g>
      )}
    </AnimatePresence>
  );
}

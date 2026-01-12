'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDiagram } from '../core/DiagramProvider';
import type { ExperienceMode } from '../core/types';

// ============================================================================
// Types
// ============================================================================

interface ModeSwitchProps {
  /** Visual style variant */
  variant?: 'pills' | 'segmented' | 'minimal';
  /** Persist selection to localStorage */
  persist?: boolean;
  /** Storage key for persistence */
  storageKey?: string;
  /** Show labels or icons only */
  showLabels?: boolean;
  /** Custom labels for modes */
  labels?: {
    'deep-dive': string;
    'guided-tour': string;
  };
  className?: string;
}

interface ModeOptionProps {
  mode: ExperienceMode;
  isActive: boolean;
  label: string;
  icon: React.ReactNode;
  showLabel: boolean;
  onClick: () => void;
  variant: 'pills' | 'segmented' | 'minimal';
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_LABELS = {
  'deep-dive': 'Deep Dive',
  'guided-tour': 'Guided Tour',
};

const STORAGE_KEY_DEFAULT = 'diagram-experience-mode';

// ============================================================================
// Icons
// ============================================================================

function DeepDiveIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  );
}

function GuidedTourIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

// ============================================================================
// Mode Option Component
// ============================================================================

function ModeOption({
  isActive,
  label,
  icon,
  showLabel,
  onClick,
  variant,
}: ModeOptionProps) {
  const baseClasses = 'relative flex items-center gap-2 transition-all duration-200';

  const variantClasses = {
    pills: `
      px-4 py-2 rounded-full
      ${isActive ? 'text-white' : 'text-white/60 hover:text-white/80'}
    `,
    segmented: `
      px-4 py-2
      ${isActive ? 'text-white' : 'text-white/60 hover:text-white/80'}
    `,
    minimal: `
      px-3 py-1.5
      ${isActive ? 'text-teal-400' : 'text-white/50 hover:text-white/70'}
    `,
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isActive}
      aria-label={`Switch to ${label} mode`}
    >
      {/* Active background for pills/segmented */}
      {isActive && variant !== 'minimal' && (
        <motion.span
          layoutId="mode-active-bg"
          className={`
            absolute inset-0 bg-teal-500/20 border border-teal-500/40
            ${variant === 'pills' ? 'rounded-full' : 'rounded-lg'}
          `}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      )}

      {/* Active underline for minimal */}
      {isActive && variant === 'minimal' && (
        <motion.span
          layoutId="mode-active-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      )}

      <span className="relative z-10">{icon}</span>
      {showLabel && <span className="relative z-10 text-sm font-medium">{label}</span>}
    </motion.button>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ModeSwitch({
  variant = 'pills',
  persist = true,
  storageKey = STORAGE_KEY_DEFAULT,
  showLabels = true,
  labels = DEFAULT_LABELS,
  className = '',
}: ModeSwitchProps) {
  const { state, setMode } = useDiagram();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    // Schedule state update to avoid synchronous setState in effect
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Load persisted preference
  useEffect(() => {
    if (!persist || typeof window === 'undefined') return;

    const stored = localStorage.getItem(storageKey);
    if (stored === 'deep-dive' || stored === 'guided-tour') {
      setMode(stored);
    }
  }, [persist, storageKey, setMode]);

  // Handle mode change
  const handleModeChange = (mode: ExperienceMode) => {
    setMode(mode);

    if (persist && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, mode);
    }
  };

  // Container classes based on variant
  const containerClasses = {
    pills: 'flex items-center gap-1 p-1 bg-white/5 rounded-full',
    segmented: 'flex items-center bg-white/5 rounded-lg overflow-hidden',
    minimal: 'flex items-center gap-4',
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`${containerClasses[variant]} ${className}`}>
        <div className="px-4 py-2 opacity-50">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`${containerClasses[variant]} ${className}`}
      role="tablist"
      aria-label="Experience mode selection"
    >
      <ModeOption
        mode="guided-tour"
        isActive={state.mode === 'guided-tour'}
        label={labels['guided-tour']}
        icon={<GuidedTourIcon />}
        showLabel={showLabels}
        onClick={() => handleModeChange('guided-tour')}
        variant={variant}
      />

      {/* Divider for segmented variant */}
      {variant === 'segmented' && (
        <div className="w-px h-6 bg-white/20" />
      )}

      <ModeOption
        mode="deep-dive"
        isActive={state.mode === 'deep-dive'}
        label={labels['deep-dive']}
        icon={<DeepDiveIcon />}
        showLabel={showLabels}
        onClick={() => handleModeChange('deep-dive')}
        variant={variant}
      />
    </div>
  );
}

// ============================================================================
// Preset Variants
// ============================================================================

/**
 * Compact icon-only mode switch.
 */
export function CompactModeSwitch({ className = '' }: { className?: string }) {
  return (
    <ModeSwitch
      variant="minimal"
      showLabels={false}
      className={className}
    />
  );
}

/**
 * Full mode switch with labels and persistence.
 */
export function FullModeSwitch({ className = '' }: { className?: string }) {
  return (
    <ModeSwitch
      variant="pills"
      showLabels={true}
      persist={true}
      className={className}
    />
  );
}

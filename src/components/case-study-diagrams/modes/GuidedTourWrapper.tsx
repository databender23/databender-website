'use client';

import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiagram } from '../core/DiagramProvider';
import { ANIMATION } from '../core/types';

// ============================================================================
// Types
// ============================================================================

interface GuidedTourWrapperProps {
  children: ReactNode;
  /** Show navigation buttons */
  showNavigation?: boolean;
  /** Show progress dots */
  showProgressDots?: boolean;
  /** Show step info panel */
  showStepInfo?: boolean;
  /** Position of step info */
  stepInfoPosition?: 'top' | 'bottom' | 'overlay';
  /** Enable auto-play by default */
  autoPlay?: boolean;
  /** Show play/pause control */
  showPlayControl?: boolean;
  className?: string;
}

// ============================================================================
// Navigation Buttons Component
// ============================================================================

interface NavigationButtonsProps {
  showPlayControl: boolean;
}

function NavigationButtons({ showPlayControl }: NavigationButtonsProps) {
  const {
    state,
    nextStep,
    prevStep,
    togglePlay,
    canGoNext,
    canGoPrev,
    totalSteps,
  } = useDiagram();

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Previous button */}
      <motion.button
        onClick={prevStep}
        disabled={!canGoPrev}
        className={`
          p-3 rounded-full transition-all duration-200
          ${
            canGoPrev
              ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }
        `}
        whileHover={canGoPrev ? { scale: 1.05 } : {}}
        whileTap={canGoPrev ? { scale: 0.95 } : {}}
        aria-label="Previous step"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>

      {/* Play/Pause button */}
      {showPlayControl && totalSteps > 1 && (
        <motion.button
          onClick={togglePlay}
          className="p-3 rounded-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={state.isPlaying ? 'Pause' : 'Play'}
        >
          {state.isPlaying ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
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
            </svg>
          )}
        </motion.button>
      )}

      {/* Next button */}
      <motion.button
        onClick={nextStep}
        disabled={!canGoNext}
        className={`
          p-3 rounded-full transition-all duration-200
          ${
            canGoNext
              ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }
        `}
        whileHover={canGoNext ? { scale: 1.05 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
        aria-label="Next step"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>
    </div>
  );
}

// ============================================================================
// Progress Dots Component
// ============================================================================

function ProgressDots() {
  const { state, goToStep, totalSteps, config } = useDiagram();

  if (totalSteps <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {config.steps?.map((step, index) => {
        const isActive = state.currentStep === index;
        const isPast = state.currentStep > index;

        return (
          <motion.button
            key={step.id}
            onClick={() => goToStep(index)}
            className={`
              relative rounded-full transition-all duration-300 cursor-pointer
              ${isActive ? 'w-8 h-2' : 'w-2 h-2'}
              ${
                isActive
                  ? 'bg-teal-500'
                  : isPast
                    ? 'bg-teal-500/50'
                    : 'bg-white/30 hover:bg-white/50'
              }
            `}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to step ${index + 1}: ${step.title}`}
            aria-current={isActive ? 'step' : undefined}
          >
            {/* Active indicator glow */}
            {isActive && (
              <motion.span
                className="absolute inset-0 rounded-full bg-teal-500"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    '0 0 0 0 rgba(26, 153, 136, 0)',
                    '0 0 8px 2px rgba(26, 153, 136, 0.4)',
                    '0 0 0 0 rgba(26, 153, 136, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Step Info Panel Component
// ============================================================================

interface StepInfoPanelProps {
  position: 'top' | 'bottom' | 'overlay';
}

function StepInfoPanel({ position }: StepInfoPanelProps) {
  const { currentStepData, state, totalSteps } = useDiagram();

  if (!currentStepData) return null;

  const positionClasses = {
    top: 'mb-4',
    bottom: 'mt-4',
    overlay: 'absolute bottom-4 left-4 right-4',
  };

  return (
    <div className={positionClasses[position]}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepData.id}
          className={`
            p-4 rounded-xl
            ${position === 'overlay' ? 'bg-black/60 backdrop-blur-sm' : 'bg-white/5'}
          `}
          initial={{ opacity: 0, y: position === 'top' ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -10 : 10 }}
          transition={{
            duration: ANIMATION.stepTransition / 1000,
            ease: ANIMATION.easeOut,
          }}
        >
          {/* Step counter */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-teal-400 font-medium">
              Step {state.currentStep + 1} of {totalSteps}
            </span>
            {state.isPlaying && (
              <span className="text-xs text-white/50">(Auto-playing)</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-1">
            {currentStepData.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/70">{currentStepData.description}</p>

          {/* Metric if available */}
          {currentStepData.metric && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-teal-400">
                  {currentStepData.metric.prefix}
                  {currentStepData.metric.value}
                  {currentStepData.metric.suffix}
                </span>
                <span className="text-sm text-white/60">
                  {currentStepData.metric.label}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// Main Wrapper Component
// ============================================================================

export function GuidedTourWrapper({
  children,
  showNavigation = true,
  showProgressDots = true,
  showStepInfo = true,
  stepInfoPosition = 'bottom',
  autoPlay = false,
  showPlayControl = true,
  className = '',
}: GuidedTourWrapperProps) {
  const { setPlaying, state, totalSteps } = useDiagram();

  // Start auto-play if requested
  useEffect(() => {
    if (autoPlay && totalSteps > 1 && !state.reducedMotion) {
      setPlaying(true);
    }
  }, [autoPlay, totalSteps, state.reducedMotion, setPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          // Handled by context, but we could add direct navigation here
          break;
        case 'ArrowRight':
          break;
        case ' ':
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Step info at top */}
      {showStepInfo && stepInfoPosition === 'top' && (
        <StepInfoPanel position="top" />
      )}

      {/* Main diagram area */}
      <div className="relative">
        {children}

        {/* Overlay step info */}
        {showStepInfo && stepInfoPosition === 'overlay' && (
          <StepInfoPanel position="overlay" />
        )}
      </div>

      {/* Step info at bottom */}
      {showStepInfo && stepInfoPosition === 'bottom' && (
        <StepInfoPanel position="bottom" />
      )}

      {/* Controls */}
      <div className="mt-4 space-y-4">
        {showProgressDots && <ProgressDots />}
        {showNavigation && (
          <NavigationButtons showPlayControl={showPlayControl} />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Compact Tour Variant
// ============================================================================

interface CompactTourProps {
  children: ReactNode;
  className?: string;
}

/**
 * A minimal variant of the guided tour with just dots and arrows.
 * Good for embedded diagrams or space-constrained layouts.
 */
export function CompactTour({ children, className = '' }: CompactTourProps) {
  return (
    <GuidedTourWrapper
      showStepInfo={false}
      showPlayControl={false}
      showProgressDots={true}
      showNavigation={true}
      className={className}
    >
      {children}
    </GuidedTourWrapper>
  );
}

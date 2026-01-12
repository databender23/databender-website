'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDiagram } from '../core/DiagramProvider';
import { ANIMATION } from '../core/types';

// ============================================================================
// Types
// ============================================================================

interface DeepDiveWrapperProps {
  children: ReactNode;
  /** Content sections that trigger step changes on scroll */
  sections?: DeepDiveSection[];
  /** Height of each section for scroll calculations */
  sectionHeight?: number;
  /** Whether to show the vertical progress indicator */
  showProgress?: boolean;
  /** Position of progress indicator */
  progressPosition?: 'left' | 'right';
  className?: string;
}

interface DeepDiveSection {
  id: string;
  title: string;
  description: string;
  /** Step index to activate when this section is in view */
  stepIndex: number;
}

interface SectionTriggerProps {
  section: DeepDiveSection;
  index: number;
  onInView: (stepIndex: number) => void;
  sectionHeight: number;
}

interface ProgressIndicatorProps {
  sections: DeepDiveSection[];
  currentIndex: number;
  position: 'left' | 'right';
}

// ============================================================================
// Section Trigger Component
// ============================================================================

function SectionTrigger({
  section,
  index,
  onInView,
  sectionHeight,
}: SectionTriggerProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '-20% 0px -20% 0px',
  });

  useEffect(() => {
    if (inView) {
      onInView(section.stepIndex);
    }
  }, [inView, section.stepIndex, onInView]);

  const { state } = useDiagram();
  const isActive = state.currentStep === section.stepIndex;

  return (
    <div
      ref={ref}
      className="flex items-center"
      style={{ minHeight: sectionHeight }}
    >
      <motion.div
        className={`
          p-6 rounded-xl transition-colors duration-300
          ${isActive ? 'bg-white/10' : 'bg-transparent'}
        `}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: ANIMATION.stepTransition / 1000,
          delay: index * 0.1,
          ease: ANIMATION.easeOut,
        }}
      >
        <h3
          className={`
            text-lg font-semibold mb-2 transition-colors duration-300
            ${isActive ? 'text-teal-400' : 'text-white/80'}
          `}
        >
          {section.title}
        </h3>
        <p
          className={`
            text-sm transition-colors duration-300
            ${isActive ? 'text-white/90' : 'text-white/60'}
          `}
        >
          {section.description}
        </p>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Progress Indicator Component
// ============================================================================

function ProgressIndicator({
  sections,
  currentIndex,
  position,
}: ProgressIndicatorProps) {
  const { state } = useDiagram();

  return (
    <div
      className={`
        fixed top-1/2 -translate-y-1/2 z-20
        flex flex-col items-center gap-3
        ${position === 'left' ? 'left-4' : 'right-4'}
      `}
    >
      {/* Progress line */}
      <div className="relative h-48 w-0.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-teal-500 rounded-full"
          initial={{ height: '0%' }}
          animate={{
            height: `${((currentIndex + 1) / sections.length) * 100}%`,
          }}
          transition={{
            duration: ANIMATION.stepTransition / 1000,
            ease: ANIMATION.easeOut,
          }}
        />
      </div>

      {/* Step dots */}
      <div className="flex flex-col gap-2">
        {sections.map((section) => {
          const isActive = state.currentStep === section.stepIndex;
          const isPast = state.currentStep > section.stepIndex;

          return (
            <motion.div
              key={section.id}
              className={`
                w-2 h-2 rounded-full transition-colors duration-300
                ${isActive ? 'bg-teal-500' : isPast ? 'bg-teal-500/50' : 'bg-white/30'}
              `}
              animate={
                isActive
                  ? {
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(26, 153, 136, 0)',
                        '0 0 0 4px rgba(26, 153, 136, 0.3)',
                        '0 0 0 0 rgba(26, 153, 136, 0)',
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: isActive ? Infinity : 0,
              }}
            />
          );
        })}
      </div>

      {/* Current step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="text-xs text-white/60 text-center max-w-20"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {currentIndex + 1}/{sections.length}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// Main Wrapper Component
// ============================================================================

export function DeepDiveWrapper({
  children,
  sections = [],
  sectionHeight = 400,
  showProgress = true,
  progressPosition = 'right',
  className = '',
}: DeepDiveWrapperProps) {
  const { state, goToStep, highlightNodes, config } = useDiagram();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle section becoming visible
  const handleSectionInView = (stepIndex: number) => {
    goToStep(stepIndex);

    // Update highlights based on step
    const step = config.steps?.[stepIndex];
    if (step) {
      highlightNodes(step.highlightNodes);
    }
  };

  // Find current section index for progress indicator
  const currentSectionIndex = sections.findIndex(
    (s) => s.stepIndex === state.currentStep
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Sticky diagram container */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Scrollable content section */}
        <div className="relative">
          {sections.length > 0 ? (
            <div className="space-y-8">
              {sections.map((section, index) => (
                <SectionTrigger
                  key={section.id}
                  section={section}
                  index={index}
                  onInView={handleSectionInView}
                  sectionHeight={sectionHeight}
                />
              ))}
            </div>
          ) : (
            // If no sections provided, just render as regular scrollable content
            <div className="py-8">{children}</div>
          )}
        </div>

        {/* Sticky diagram */}
        <div className="hidden lg:block">
          <div className="sticky top-24">{children}</div>
        </div>
      </div>

      {/* Mobile: diagram above content */}
      <div className="lg:hidden mb-8">{children}</div>

      {/* Progress indicator */}
      {showProgress && sections.length > 0 && (
        <ProgressIndicator
          sections={sections}
          currentIndex={Math.max(0, currentSectionIndex)}
          position={progressPosition}
        />
      )}
    </div>
  );
}

// ============================================================================
// Content Card Component (for use within sections)
// ============================================================================

interface ContentCardProps {
  title: string;
  description: string;
  metric?: {
    value: string | number;
    label: string;
  };
  children?: ReactNode;
  className?: string;
}

export function ContentCard({
  title,
  description,
  metric,
  children,
  className = '',
}: ContentCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={`
        bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: ANIMATION.stepTransition / 1000,
        ease: ANIMATION.easeOut,
      }}
    >
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-white/70 text-sm mb-4">{description}</p>

      {metric && (
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-teal-400">
            {metric.value}
          </span>
          <span className="text-white/60 text-sm">{metric.label}</span>
        </div>
      )}

      {children}
    </motion.div>
  );
}

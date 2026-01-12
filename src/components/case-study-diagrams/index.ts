/**
 * Case Study Diagrams - Shared Infrastructure
 *
 * This module provides the core components for creating interactive
 * case study diagrams with two experience modes:
 *
 * 1. Deep Dive - Scrollable, all nodes interactive, user-driven exploration
 * 2. Guided Tour - Step-by-step walkthrough with auto-play option
 *
 * Usage:
 * ```tsx
 * import {
 *   DiagramProvider,
 *   DiagramCanvas,
 *   GuidedTourWrapper,
 *   ModeSwitch,
 *   useDiagram,
 * } from '@/components/case-study-diagrams';
 *
 * function MyDiagram() {
 *   return (
 *     <DiagramProvider config={myConfig}>
 *       <ModeSwitch />
 *       <GuidedTourWrapper>
 *         <DiagramCanvas>
 *           {/* Your diagram content *\/}
 *         </DiagramCanvas>
 *       </GuidedTourWrapper>
 *     </DiagramProvider>
 *   );
 * }
 * ```
 */

// ============================================================================
// Core Exports
// ============================================================================

// Types
export type {
  ExperienceMode,
  NodeVariant,
  NodeShape,
  DiagramNode,
  ConnectionStyle,
  DiagramConnection,
  DiagramStep,
  DiagramTheme,
  ViewportConfig,
  DiagramConfig,
  DiagramState,
  DiagramAction,
} from './core/types';

export {
  defaultTheme,
  createInitialState,
  ANIMATION,
} from './core/types';

// Provider and hooks
export {
  DiagramProvider,
  useDiagram,
  useNodeHighlight,
  useConnectionHighlight,
} from './core/DiagramProvider';

// Canvas components
export {
  DiagramCanvas,
  ConnectionLayer,
  NodeLayer,
  LabelLayer,
  HeroMetric,
} from './core/DiagramCanvas';

// ============================================================================
// Mode Wrappers
// ============================================================================

export {
  DeepDiveWrapper,
  ContentCard,
} from './modes/DeepDiveWrapper';

export {
  GuidedTourWrapper,
  CompactTour,
} from './modes/GuidedTourWrapper';

export {
  ModeSwitch,
  CompactModeSwitch,
  FullModeSwitch,
} from './modes/ModeSwitch';

// ============================================================================
// Interactive Components
// ============================================================================

export {
  Tooltip,
  SVGTooltip,
} from './interactive/Tooltip';

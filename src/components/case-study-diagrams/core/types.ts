/**
 * Core type definitions for case study diagram components.
 * These types support both Deep Dive and Guided Tour experience modes.
 */

// ============================================================================
// Experience Modes
// ============================================================================

/**
 * The two primary ways users can interact with case study diagrams:
 * - 'deep-dive': Scrollable, all nodes interactive, user-driven exploration
 * - 'guided-tour': Step-by-step walkthrough with auto-play option
 */
export type ExperienceMode = 'deep-dive' | 'guided-tour';

// ============================================================================
// Node Types
// ============================================================================

/**
 * Visual style variants for diagram nodes.
 */
export type NodeVariant = 'primary' | 'secondary' | 'accent' | 'muted';

/**
 * Shape options for diagram nodes.
 */
export type NodeShape = 'circle' | 'rect' | 'diamond' | 'hexagon';

/**
 * Represents a single node in the diagram.
 */
export interface DiagramNode {
  /** Unique identifier for the node */
  id: string;
  /** Display label for the node */
  label: string;
  /** Optional longer description shown in tooltips */
  description?: string;
  /** X position as percentage (0-100) of viewBox */
  x: number;
  /** Y position as percentage (0-100) of viewBox */
  y: number;
  /** Visual shape of the node */
  shape?: NodeShape;
  /** Visual style variant */
  variant?: NodeVariant;
  /** Custom color override (hex or CSS color) */
  color?: string;
  /** Icon or emoji to display inside the node */
  icon?: string;
  /** Size multiplier (1 = default size) */
  size?: number;
  /** Whether this node is interactive (hoverable, clickable) */
  interactive?: boolean;
  /** Optional metadata for extended functionality */
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Connection Types
// ============================================================================

/**
 * Visual style for connection lines.
 */
export type ConnectionStyle = 'solid' | 'dashed' | 'dotted' | 'animated';

/**
 * Represents a connection between two nodes.
 */
export interface DiagramConnection {
  /** Unique identifier for the connection */
  id: string;
  /** ID of the source node */
  from: string;
  /** ID of the target node */
  to: string;
  /** Visual style of the line */
  style?: ConnectionStyle;
  /** Line color (hex or CSS color) */
  color?: string;
  /** Whether to show an arrow at the end */
  arrow?: boolean;
  /** Optional label for the connection */
  label?: string;
  /** Whether the connection animates (flowing particles, etc.) */
  animated?: boolean;
  /** Animation delay in milliseconds */
  animationDelay?: number;
}

// ============================================================================
// Step Types (for Guided Tour mode)
// ============================================================================

/**
 * Represents a single step in the guided tour.
 */
export interface DiagramStep {
  /** Unique identifier for the step */
  id: string;
  /** Step number for display (1-indexed) */
  number: number;
  /** Short title for the step */
  title: string;
  /** Longer description explaining this step */
  description: string;
  /** IDs of nodes to highlight during this step */
  highlightNodes: string[];
  /** IDs of connections to highlight during this step */
  highlightConnections?: string[];
  /** Duration to show this step in auto-play mode (ms) */
  duration?: number;
  /** Optional metric to display during this step */
  metric?: {
    value: string | number;
    label: string;
    prefix?: string;
    suffix?: string;
  };
}

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Theme configuration for the diagram.
 */
export interface DiagramTheme {
  /** Primary accent color */
  primary: string;
  /** Secondary color for backgrounds/borders */
  secondary: string;
  /** Background gradient start color */
  backgroundStart: string;
  /** Background gradient end color */
  backgroundEnd: string;
  /** Color for grid lines */
  gridColor: string;
  /** Color for node glow effects */
  glowColor: string;
  /** Text color */
  textColor: string;
  /** Muted text color */
  textMuted: string;
}

/**
 * Default teal theme matching DataBender brand.
 */
export const defaultTheme: DiagramTheme = {
  primary: '#1A9988',
  secondary: '#14b8a6',
  backgroundStart: '#0f0a1e',
  backgroundEnd: '#1a1033',
  gridColor: 'rgba(26, 153, 136, 0.1)',
  glowColor: 'rgba(26, 153, 136, 0.6)',
  textColor: '#ffffff',
  textMuted: 'rgba(255, 255, 255, 0.6)',
};

/**
 * Viewport configuration for the SVG.
 */
export interface ViewportConfig {
  /** Width of the viewBox */
  width: number;
  /** Height of the viewBox */
  height: number;
  /** Padding inside the viewBox */
  padding: number;
}

/**
 * Full configuration for a diagram.
 */
export interface DiagramConfig {
  /** Unique identifier for the diagram */
  id: string;
  /** Display title for the diagram */
  title: string;
  /** All nodes in the diagram */
  nodes: DiagramNode[];
  /** All connections between nodes */
  connections: DiagramConnection[];
  /** Steps for guided tour mode */
  steps?: DiagramStep[];
  /** Theme configuration */
  theme?: DiagramTheme;
  /** Viewport configuration */
  viewport?: ViewportConfig;
  /** Default experience mode */
  defaultMode?: ExperienceMode;
  /** Hero metric to display */
  heroMetric?: {
    value: string | number;
    label: string;
    prefix?: string;
    suffix?: string;
    color?: string;
  };
}

// ============================================================================
// State Types
// ============================================================================

/**
 * Full state for a diagram instance.
 */
export interface DiagramState {
  /** Current step index in guided tour mode (0-indexed) */
  currentStep: number;
  /** ID of the currently hovered node */
  hoveredNode: string | null;
  /** ID of the currently expanded/focused node */
  expandedNode: string | null;
  /** Whether auto-play is active in guided tour mode */
  isPlaying: boolean;
  /** Current experience mode */
  mode: ExperienceMode;
  /** Whether animations should be reduced */
  reducedMotion: boolean;
  /** IDs of currently highlighted nodes */
  highlightedNodes: string[];
  /** IDs of currently highlighted connections */
  highlightedConnections: string[];
}

/**
 * Initial state factory function.
 */
export function createInitialState(
  mode: ExperienceMode = 'guided-tour',
  reducedMotion = false
): DiagramState {
  return {
    currentStep: 0,
    hoveredNode: null,
    expandedNode: null,
    isPlaying: false,
    mode,
    reducedMotion,
    highlightedNodes: [],
    highlightedConnections: [],
  };
}

// ============================================================================
// Action Types
// ============================================================================

/**
 * All possible actions for the diagram reducer.
 */
export type DiagramAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'SET_MODE'; payload: ExperienceMode }
  | { type: 'SET_HOVERED_NODE'; payload: string | null }
  | { type: 'SET_EXPANDED_NODE'; payload: string | null }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'HIGHLIGHT_NODES'; payload: string[] }
  | { type: 'HIGHLIGHT_CONNECTIONS'; payload: string[] }
  | { type: 'RESET' };

// ============================================================================
// Animation Constants
// ============================================================================

/**
 * Shared animation timing constants.
 */
export const ANIMATION = {
  /** Ease out curve for smooth decelerating animations */
  easeOut: [0.22, 1, 0.36, 1] as const,
  /** Step transition duration in milliseconds */
  stepTransition: 500,
  /** Default auto-play interval in milliseconds */
  autoPlayInterval: 4000,
  /** Tooltip entrance duration in milliseconds */
  tooltipDuration: 200,
  /** Node pulse animation duration in milliseconds */
  pulseDuration: 2000,
  /** Connection flow animation duration in milliseconds */
  flowDuration: 1500,
} as const;

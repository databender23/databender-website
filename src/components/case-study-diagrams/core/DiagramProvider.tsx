'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  DiagramState,
  DiagramAction,
  DiagramConfig,
  DiagramStep,
  ExperienceMode,
} from './types';
import { createInitialState, ANIMATION } from './types';

// ============================================================================
// Context Types
// ============================================================================

interface DiagramContextValue {
  state: DiagramState;
  config: DiagramConfig;
  dispatch: React.Dispatch<DiagramAction>;
  // Convenience action dispatchers
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setMode: (mode: ExperienceMode) => void;
  setHoveredNode: (nodeId: string | null) => void;
  setExpandedNode: (nodeId: string | null) => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  highlightNodes: (nodeIds: string[]) => void;
  highlightConnections: (connectionIds: string[]) => void;
  reset: () => void;
  // Computed values
  currentStepData: DiagramStep | null;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrev: boolean;
}

// ============================================================================
// Reducer
// ============================================================================

function diagramReducer(
  state: DiagramState,
  action: DiagramAction,
  config: DiagramConfig
): DiagramState {
  const totalSteps = config.steps?.length ?? 0;

  switch (action.type) {
    case 'NEXT_STEP': {
      const nextStep = Math.min(state.currentStep + 1, totalSteps - 1);
      const step = config.steps?.[nextStep];
      return {
        ...state,
        currentStep: nextStep,
        highlightedNodes: step?.highlightNodes ?? [],
        highlightedConnections: step?.highlightConnections ?? [],
      };
    }

    case 'PREV_STEP': {
      const prevStep = Math.max(state.currentStep - 1, 0);
      const step = config.steps?.[prevStep];
      return {
        ...state,
        currentStep: prevStep,
        highlightedNodes: step?.highlightNodes ?? [],
        highlightedConnections: step?.highlightConnections ?? [],
      };
    }

    case 'GO_TO_STEP': {
      const targetStep = Math.max(0, Math.min(action.payload, totalSteps - 1));
      const step = config.steps?.[targetStep];
      return {
        ...state,
        currentStep: targetStep,
        highlightedNodes: step?.highlightNodes ?? [],
        highlightedConnections: step?.highlightConnections ?? [],
      };
    }

    case 'SET_MODE': {
      // Reset highlights when changing mode
      const isGuidedTour = action.payload === 'guided-tour';
      const step = isGuidedTour ? config.steps?.[state.currentStep] : null;
      return {
        ...state,
        mode: action.payload,
        isPlaying: false, // Stop auto-play when switching modes
        highlightedNodes: step?.highlightNodes ?? [],
        highlightedConnections: step?.highlightConnections ?? [],
      };
    }

    case 'SET_HOVERED_NODE':
      return { ...state, hoveredNode: action.payload };

    case 'SET_EXPANDED_NODE':
      return { ...state, expandedNode: action.payload };

    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };

    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };

    case 'SET_REDUCED_MOTION':
      return { ...state, reducedMotion: action.payload };

    case 'HIGHLIGHT_NODES':
      return { ...state, highlightedNodes: action.payload };

    case 'HIGHLIGHT_CONNECTIONS':
      return { ...state, highlightedConnections: action.payload };

    case 'RESET': {
      const initialStep = config.steps?.[0];
      return {
        ...createInitialState(config.defaultMode, state.reducedMotion),
        highlightedNodes: initialStep?.highlightNodes ?? [],
        highlightedConnections: initialStep?.highlightConnections ?? [],
      };
    }

    default:
      return state;
  }
}

// ============================================================================
// Context
// ============================================================================

const DiagramContext = createContext<DiagramContextValue | null>(null);

// ============================================================================
// Provider Props
// ============================================================================

interface DiagramProviderProps {
  children: ReactNode;
  config: DiagramConfig;
  initialMode?: ExperienceMode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// ============================================================================
// Provider Component
// ============================================================================

export function DiagramProvider({
  children,
  config,
  initialMode,
  autoPlay = false,
  autoPlayInterval = ANIMATION.autoPlayInterval,
}: DiagramProviderProps) {
  // Create reducer with config in closure
  const reducerWithConfig = useCallback(
    (state: DiagramState, action: DiagramAction) =>
      diagramReducer(state, action, config),
    [config]
  );

  // Initialize state
  const [state, dispatch] = useReducer(
    reducerWithConfig,
    createInitialState(initialMode ?? config.defaultMode ?? 'guided-tour')
  );

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    dispatch({ type: 'SET_REDUCED_MOTION', payload: mediaQuery.matches });

    const handler = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_REDUCED_MOTION', payload: e.matches });
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize highlights for first step
  useEffect(() => {
    const firstStep = config.steps?.[0];
    if (firstStep && state.mode === 'guided-tour') {
      dispatch({ type: 'HIGHLIGHT_NODES', payload: firstStep.highlightNodes });
      if (firstStep.highlightConnections) {
        dispatch({
          type: 'HIGHLIGHT_CONNECTIONS',
          payload: firstStep.highlightConnections,
        });
      }
    }
  }, [config.steps, state.mode]);

  // Auto-play functionality
  useEffect(() => {
    if (!state.isPlaying || state.mode !== 'guided-tour' || state.reducedMotion) {
      return;
    }

    const totalSteps = config.steps?.length ?? 0;
    if (totalSteps === 0) return;

    const currentStepData = config.steps?.[state.currentStep];
    const duration = currentStepData?.duration ?? autoPlayInterval;

    const timer = setTimeout(() => {
      if (state.currentStep < totalSteps - 1) {
        dispatch({ type: 'NEXT_STEP' });
      } else {
        // Loop back to start or stop
        dispatch({ type: 'GO_TO_STEP', payload: 0 });
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [
    state.isPlaying,
    state.currentStep,
    state.mode,
    state.reducedMotion,
    config.steps,
    autoPlayInterval,
  ]);

  // Start auto-play if requested
  useEffect(() => {
    if (autoPlay && state.mode === 'guided-tour') {
      dispatch({ type: 'SET_PLAYING', payload: true });
    }
  }, [autoPlay, state.mode]);

  // Memoized action dispatchers
  const actions = useMemo(
    () => ({
      nextStep: () => dispatch({ type: 'NEXT_STEP' }),
      prevStep: () => dispatch({ type: 'PREV_STEP' }),
      goToStep: (step: number) => dispatch({ type: 'GO_TO_STEP', payload: step }),
      setMode: (mode: ExperienceMode) =>
        dispatch({ type: 'SET_MODE', payload: mode }),
      setHoveredNode: (nodeId: string | null) =>
        dispatch({ type: 'SET_HOVERED_NODE', payload: nodeId }),
      setExpandedNode: (nodeId: string | null) =>
        dispatch({ type: 'SET_EXPANDED_NODE', payload: nodeId }),
      togglePlay: () => dispatch({ type: 'TOGGLE_PLAY' }),
      setPlaying: (playing: boolean) =>
        dispatch({ type: 'SET_PLAYING', payload: playing }),
      highlightNodes: (nodeIds: string[]) =>
        dispatch({ type: 'HIGHLIGHT_NODES', payload: nodeIds }),
      highlightConnections: (connectionIds: string[]) =>
        dispatch({ type: 'HIGHLIGHT_CONNECTIONS', payload: connectionIds }),
      reset: () => dispatch({ type: 'RESET' }),
    }),
    []
  );

  // Computed values
  const totalSteps = config.steps?.length ?? 0;
  const currentStepData = config.steps?.[state.currentStep] ?? null;
  const canGoNext = state.currentStep < totalSteps - 1;
  const canGoPrev = state.currentStep > 0;

  const contextValue = useMemo<DiagramContextValue>(
    () => ({
      state,
      config,
      dispatch,
      ...actions,
      currentStepData,
      totalSteps,
      canGoNext,
      canGoPrev,
    }),
    [state, config, actions, currentStepData, totalSteps, canGoNext, canGoPrev]
  );

  return (
    <DiagramContext.Provider value={contextValue}>
      {children}
    </DiagramContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access the diagram context.
 * Must be used within a DiagramProvider.
 */
export function useDiagram(): DiagramContextValue {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error('useDiagram must be used within a DiagramProvider');
  }
  return context;
}

/**
 * Hook to check if a node is currently highlighted.
 */
export function useNodeHighlight(nodeId: string): boolean {
  const { state } = useDiagram();
  return state.highlightedNodes.includes(nodeId);
}

/**
 * Hook to check if a connection is currently highlighted.
 */
export function useConnectionHighlight(connectionId: string): boolean {
  const { state } = useDiagram();
  return state.highlightedConnections.includes(connectionId);
}

// DiagramConfig.ts - Configuration for Entity Resolution interactive diagram
// Multi-workflow agentic pipeline with parallel matching strategies

export interface DiagramNode {
  id: string
  label: string
  sublabel?: string
  x: number
  y: number
  type: 'source' | 'orchestrator' | 'workflow' | 'subagent' | 'validator' | 'output' | 'strategy'
  color: string
  glowColor: string
  size: number
  icon?: string
}

export interface DiagramConnection {
  id: string
  from: string
  to: string
  color: string
  animated?: boolean
  particles?: boolean
  type?: 'normal' | 'parallel' | 'feedback'
}

export interface DiagramStep {
  id: number
  title: string
  description: string
  highlightNodes: string[]
  highlightConnections: string[]
  annotation: {
    title: string
    description: string
    position: 'left' | 'right' | 'top' | 'bottom'
  }
}

export interface DiagramConfig {
  nodes: DiagramNode[]
  connections: DiagramConnection[]
  steps: DiagramStep[]
}

// Node positions are in percentages (0-100) for responsive scaling
export const diagramConfig: DiagramConfig = {
  nodes: [
    // Source nodes - Multiple data sources
    {
      id: 'source-collision',
      label: 'Source A',
      sublabel: 'Legacy Records',
      x: 8,
      y: 20,
      type: 'source',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.5)',
      size: 40,
      icon: 'database',
    },
    {
      id: 'source-unstable',
      label: 'Source B',
      sublabel: 'Active Records',
      x: 8,
      y: 50,
      type: 'source',
      color: '#f97316',
      glowColor: 'rgba(249, 115, 22, 0.5)',
      size: 44,
      icon: 'server',
    },
    {
      id: 'source-stable',
      label: 'Source C',
      sublabel: 'Master Records',
      x: 8,
      y: 80,
      type: 'source',
      color: '#eab308',
      glowColor: 'rgba(234, 179, 8, 0.5)',
      size: 48,
      icon: 'archive',
    },
    // Orchestrator (central coordinator - runs multiple workflows)
    {
      id: 'orchestrator',
      label: 'Orchestrator',
      sublabel: 'Multi-Workflow Pipeline',
      x: 28,
      y: 50,
      type: 'orchestrator',
      color: '#1A9988',
      glowColor: 'rgba(26, 153, 136, 0.6)',
      size: 65,
      icon: 'brain',
    },
    // Workflow Nodes
    {
      id: 'workflow-collision',
      label: 'Workflow A',
      sublabel: 'Group Matching',
      x: 45,
      y: 15,
      type: 'workflow',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.5)',
      size: 36,
      icon: 'filter',
    },
    {
      id: 'workflow-unstable',
      label: 'Workflow B',
      sublabel: 'Temporal Alignment',
      x: 45,
      y: 38,
      type: 'workflow',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.5)',
      size: 36,
      icon: 'link',
    },
    {
      id: 'workflow-stable',
      label: 'Workflow C',
      sublabel: 'Cross-Reference',
      x: 45,
      y: 62,
      type: 'workflow',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.5)',
      size: 36,
      icon: 'search',
    },
    {
      id: 'workflow-exclude',
      label: 'Strategy Cascade',
      sublabel: 'Parallel Matching',
      x: 45,
      y: 85,
      type: 'workflow',
      color: '#6366f1',
      glowColor: 'rgba(99, 102, 241, 0.5)',
      size: 40,
      icon: 'parallel',
    },
    // Matching Strategies (parallel subagents)
    {
      id: 'strategy-1',
      label: 'Exact Match',
      sublabel: 'High Confidence',
      x: 62,
      y: 70,
      type: 'strategy',
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      size: 28,
      icon: 'match',
    },
    {
      id: 'strategy-2',
      label: 'Fuzzy Match',
      sublabel: 'Name Variations',
      x: 66,
      y: 82,
      type: 'strategy',
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      size: 28,
      icon: 'match',
    },
    {
      id: 'strategy-3',
      label: 'Contextual',
      sublabel: 'Pattern Detection',
      x: 62,
      y: 94,
      type: 'strategy',
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      size: 28,
      icon: 'match',
    },
    // Validation Agent with Post-Match Rules
    {
      id: 'validator',
      label: 'Validator',
      sublabel: 'Quality Assurance',
      x: 78,
      y: 50,
      type: 'validator',
      color: '#22c55e',
      glowColor: 'rgba(34, 197, 94, 0.5)',
      size: 50,
      icon: 'shield',
    },
    // AI Review System
    {
      id: 'ai-review',
      label: 'AI Review',
      sublabel: 'Ambiguous Cases',
      x: 78,
      y: 80,
      type: 'subagent',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.5)',
      size: 38,
      icon: 'brain',
    },
    // Golden Records output
    {
      id: 'golden',
      label: 'Unified Records',
      sublabel: 'Golden Master',
      x: 92,
      y: 50,
      type: 'output',
      color: '#14b8a6',
      glowColor: 'rgba(20, 184, 166, 0.6)',
      size: 52,
      icon: 'users',
    },
  ],

  connections: [
    // Source to Orchestrator
    {
      id: 'collision-to-orch',
      from: 'source-collision',
      to: 'orchestrator',
      color: '#ef4444',
      animated: true,
      particles: true,
    },
    {
      id: 'unstable-to-orch',
      from: 'source-unstable',
      to: 'orchestrator',
      color: '#f97316',
      animated: true,
      particles: true,
    },
    {
      id: 'stable-to-orch',
      from: 'source-stable',
      to: 'orchestrator',
      color: '#eab308',
      animated: true,
      particles: true,
    },
    // Orchestrator to Workflows
    {
      id: 'orch-to-collision',
      from: 'orchestrator',
      to: 'workflow-collision',
      color: '#8b5cf6',
      animated: true,
      type: 'normal',
    },
    {
      id: 'orch-to-unstable',
      from: 'orchestrator',
      to: 'workflow-unstable',
      color: '#8b5cf6',
      animated: true,
      type: 'normal',
    },
    {
      id: 'orch-to-stable',
      from: 'orchestrator',
      to: 'workflow-stable',
      color: '#8b5cf6',
      animated: true,
      type: 'normal',
    },
    {
      id: 'orch-to-exclude',
      from: 'orchestrator',
      to: 'workflow-exclude',
      color: '#6366f1',
      animated: true,
      type: 'normal',
    },
    // Exclude to Strategies (parallel cascade)
    {
      id: 'exclude-to-strat1',
      from: 'workflow-exclude',
      to: 'strategy-1',
      color: '#3b82f6',
      animated: true,
      type: 'parallel',
    },
    {
      id: 'exclude-to-strat2',
      from: 'workflow-exclude',
      to: 'strategy-2',
      color: '#3b82f6',
      animated: true,
      type: 'parallel',
    },
    {
      id: 'exclude-to-strat3',
      from: 'workflow-exclude',
      to: 'strategy-3',
      color: '#3b82f6',
      animated: true,
      type: 'parallel',
    },
    // Workflows to Validator
    {
      id: 'collision-to-val',
      from: 'workflow-collision',
      to: 'validator',
      color: '#8b5cf6',
      animated: true,
    },
    {
      id: 'unstable-to-val',
      from: 'workflow-unstable',
      to: 'validator',
      color: '#8b5cf6',
      animated: true,
    },
    {
      id: 'stable-to-val',
      from: 'workflow-stable',
      to: 'validator',
      color: '#8b5cf6',
      animated: true,
    },
    {
      id: 'strat1-to-val',
      from: 'strategy-1',
      to: 'validator',
      color: '#3b82f6',
      animated: true,
    },
    {
      id: 'strat2-to-val',
      from: 'strategy-2',
      to: 'validator',
      color: '#3b82f6',
      animated: true,
    },
    {
      id: 'strat3-to-val',
      from: 'strategy-3',
      to: 'validator',
      color: '#3b82f6',
      animated: true,
    },
    // Validator to Output
    {
      id: 'val-to-golden',
      from: 'validator',
      to: 'golden',
      color: '#14b8a6',
      animated: true,
      particles: true,
    },
    // Validator to AI Review
    {
      id: 'val-to-ai-review',
      from: 'validator',
      to: 'ai-review',
      color: '#f59e0b',
      animated: true,
    },
    // AI Review feedback to Validator (approval/rejection)
    {
      id: 'ai-review-to-val',
      from: 'ai-review',
      to: 'validator',
      color: '#22c55e',
      animated: true,
      type: 'feedback',
    },
  ],

  steps: [
    {
      id: 1,
      title: 'The Data Chaos',
      description: 'Scattered records across multiple source systems with no unified view',
      highlightNodes: ['source-collision', 'source-unstable', 'source-stable'],
      highlightConnections: [],
      annotation: {
        title: 'Step 1: The Data Chaos',
        description: 'Millions of records across multiple source systems. Each has different formats, ID schemes, and data quality levels. No way to identify which records refer to the same entity.',
        position: 'left',
      },
    },
    {
      id: 2,
      title: 'Orchestrator Coordination',
      description: 'Central coordinator routes data through specialized workflows',
      highlightNodes: ['source-collision', 'source-unstable', 'source-stable', 'orchestrator'],
      highlightConnections: ['collision-to-orch', 'unstable-to-orch', 'stable-to-orch'],
      annotation: {
        title: 'Step 2: Orchestrator Coordination',
        description: 'The Orchestrator Agent autonomously coordinates the entire pipeline, routing records through specialized workflows and managing the resolution process end-to-end.',
        position: 'top',
      },
    },
    {
      id: 3,
      title: 'Parallel Workflows',
      description: 'Specialized workflows handle different record types',
      highlightNodes: ['orchestrator', 'workflow-collision', 'workflow-unstable'],
      highlightConnections: ['orch-to-collision', 'orch-to-unstable'],
      annotation: {
        title: 'Step 3: Parallel Workflows',
        description: 'Multiple workflows process different record types simultaneously. Group matching identifies clusters, temporal alignment handles records that changed over time.',
        position: 'right',
      },
    },
    {
      id: 4,
      title: 'Cross-Reference Matching',
      description: 'Intelligent matching across data sources',
      highlightNodes: ['orchestrator', 'workflow-stable', 'workflow-collision', 'workflow-unstable'],
      highlightConnections: ['orch-to-stable', 'collision-to-val', 'unstable-to-val'],
      annotation: {
        title: 'Step 4: Cross-Reference Matching',
        description: 'Multi-step process: deduplication within sources, cross-referencing between sources, and confidence-based matching to create unified identifiers.',
        position: 'bottom',
      },
    },
    {
      id: 5,
      title: 'Strategy Cascade',
      description: 'Parallel subagents run specialized matching strategies',
      highlightNodes: ['workflow-exclude', 'strategy-1', 'strategy-2', 'strategy-3'],
      highlightConnections: ['orch-to-exclude', 'exclude-to-strat1', 'exclude-to-strat2', 'exclude-to-strat3'],
      annotation: {
        title: 'Step 5: Strategy Cascade',
        description: 'Multiple matching strategies run in parallel: exact matching for high confidence, fuzzy matching for variations, contextual matching for pattern detection. Each optimized for different scenarios.',
        position: 'right',
      },
    },
    {
      id: 6,
      title: 'Post-Match Validation',
      description: 'Quality rules filter false positives',
      highlightNodes: ['validator', 'strategy-1', 'strategy-2', 'strategy-3'],
      highlightConnections: ['strat1-to-val', 'strat2-to-val', 'strat3-to-val', 'stable-to-val'],
      annotation: {
        title: 'Step 6: Post-Match Validation',
        description: 'Rejection rules catch false positives automatically. Confidence scoring ensures only high-quality matches proceed. Edge cases flagged for AI review.',
        position: 'left',
      },
    },
    {
      id: 7,
      title: 'AI Review System',
      description: 'AI agents validate ambiguous matches with human-level reasoning',
      highlightNodes: ['validator', 'ai-review'],
      highlightConnections: ['val-to-ai-review', 'ai-review-to-val'],
      annotation: {
        title: 'Step 7: AI Review',
        description: 'AI agents review ambiguous matches using human-level reasoning. Decisions are documented with full explanations. Feedback loops improve future matching.',
        position: 'bottom',
      },
    },
    {
      id: 8,
      title: 'Unified Records',
      description: 'Clean output with full audit trail',
      highlightNodes: ['validator', 'golden', 'ai-review'],
      highlightConnections: ['val-to-golden'],
      annotation: {
        title: 'Step 8: Unified Records',
        description: 'Golden master records with unique identifiers. Every decision documented with match type, confidence score, and reasoning. Full audit trail for compliance.',
        position: 'right',
      },
    },
  ],
}

// Metrics for the final reveal - generalized for case study
export const heroMetrics = {
  recordsProcessed: 1500000,
  stableRecords: 1000000,
  uniqueEntities: 100000,
  matchRate: 87,
  workflows: 4,
  strategies: 10,
  speedupFactor: '10x',
  aiCost: 200,
  manualCost: 25000,
  costSavingsMultiplier: 125,
  blockingReduction: 90000, // 90,000x reduction in comparisons
}

// Color themes
export const colors = {
  chaos: {
    red: '#ef4444',
    orange: '#f97316',
    yellow: '#eab308',
  },
  orchestrator: {
    teal: '#1A9988',
  },
  subagent: {
    purple: '#8b5cf6',
    blue: '#3b82f6',
    indigo: '#6366f1',
  },
  success: {
    green: '#22c55e',
    emerald: '#10b981',
    teal: '#14b8a6',
  },
  background: {
    dark: '#0f0a1e',
    medium: '#1a1033',
    light: '#251545',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.4)',
  },
}

export default diagramConfig

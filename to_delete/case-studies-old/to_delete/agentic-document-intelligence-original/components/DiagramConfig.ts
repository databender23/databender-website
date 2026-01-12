// Agent types and their configurations for the multi-agent document processing architecture
export type AgentType =
  | 'orchestrator'
  | 'assessment-agent'
  | 'category-extractor-1'
  | 'category-extractor-2'
  | 'category-extractor-3'
  | 'refinement-agent'
  | 'validator'

export interface AgentNodeConfig {
  id: AgentType
  label: string
  shortLabel: string
  description: string
  icon: 'brain' | 'search' | 'table' | 'wand' | 'shield' | 'parallel'
  color: string
  glowColor: string
  position: { x: number; y: number }
  size: 'large' | 'medium' | 'small'
}

export interface ConnectionConfig {
  from: AgentType
  to: AgentType
  label?: string
  type: 'normal' | 'parallel' | 'feedback'
  color: string
}

export interface StepConfig {
  id: number
  title: string
  subtitle: string
  description: string
  highlightAgents: AgentType[]
  activeConnections: string[]
  annotation: string
}

// Agent node definitions for multi-agent document processing
export const agentNodes: AgentNodeConfig[] = [
  {
    id: 'orchestrator',
    label: 'Orchestrator',
    shortLabel: 'Orchestrator',
    description: 'Central coordinator managing the document-to-data pipeline, routing tasks to specialized agents autonomously',
    icon: 'brain',
    color: '#1A9988',
    glowColor: 'rgba(26, 153, 136, 0.4)',
    position: { x: 50, y: 15 },
    size: 'large',
  },
  {
    id: 'assessment-agent',
    label: 'Document Assessment Agent',
    shortLabel: 'Assessment',
    description: 'Analyzes document structure using AI vision, detecting layouts and mapping extraction strategies automatically',
    icon: 'search',
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    position: { x: 50, y: 38 },
    size: 'medium',
  },
  {
    id: 'category-extractor-1',
    label: 'Parallel Extraction Agent',
    shortLabel: 'Category A',
    description: 'Specialized subagent processing one category in parallel with other extractors',
    icon: 'table',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    position: { x: 22, y: 58 },
    size: 'small',
  },
  {
    id: 'category-extractor-2',
    label: 'Parallel Extraction Agent',
    shortLabel: 'Category B',
    description: 'Specialized subagent processing one category in parallel with other extractors',
    icon: 'table',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    position: { x: 50, y: 58 },
    size: 'small',
  },
  {
    id: 'category-extractor-3',
    label: 'Parallel Extraction Agent',
    shortLabel: 'Category C',
    description: 'Specialized subagent processing one category in parallel with other extractors',
    icon: 'table',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    position: { x: 78, y: 58 },
    size: 'small',
  },
  {
    id: 'refinement-agent',
    label: 'Refinement Agent',
    shortLabel: 'Refinement',
    description: 'AI-powered corrections using conversational guidance to fix categorization and clean extracted data',
    icon: 'wand',
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    position: { x: 50, y: 76 },
    size: 'medium',
  },
  {
    id: 'validator',
    label: 'Validator Agent',
    shortLabel: 'Validator',
    description: 'Comprehensive validation ensuring production-ready data with external data enrichment',
    icon: 'shield',
    color: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    position: { x: 50, y: 92 },
    size: 'medium',
  },
]

// Connection paths between agents
export const connections: ConnectionConfig[] = [
  {
    from: 'orchestrator',
    to: 'assessment-agent',
    label: 'Analyze PDF',
    type: 'normal',
    color: '#F59E0B',
  },
  {
    from: 'assessment-agent',
    to: 'category-extractor-1',
    label: 'Extract',
    type: 'parallel',
    color: '#3B82F6',
  },
  {
    from: 'assessment-agent',
    to: 'category-extractor-2',
    label: 'Extract',
    type: 'parallel',
    color: '#3B82F6',
  },
  {
    from: 'assessment-agent',
    to: 'category-extractor-3',
    label: 'Extract',
    type: 'parallel',
    color: '#3B82F6',
  },
  {
    from: 'category-extractor-1',
    to: 'refinement-agent',
    type: 'normal',
    color: '#3B82F6',
  },
  {
    from: 'category-extractor-2',
    to: 'refinement-agent',
    type: 'normal',
    color: '#3B82F6',
  },
  {
    from: 'category-extractor-3',
    to: 'refinement-agent',
    type: 'normal',
    color: '#3B82F6',
  },
  {
    from: 'refinement-agent',
    to: 'validator',
    label: 'Validate',
    type: 'normal',
    color: '#8B5CF6',
  },
  {
    from: 'validator',
    to: 'refinement-agent',
    label: 'Retry on error',
    type: 'feedback',
    color: '#EF4444',
  },
]

// Step definitions for the interactive walkthrough
export const storySteps: StepConfig[] = [
  {
    id: 1,
    title: 'The Document Challenge',
    subtitle: 'Where Traditional Tools Fail',
    description: 'Complex multi-page documents with tables, multi-column layouts, and varying formats. Traditional OCR and rule-based systems produce unusable output that still requires manual cleanup.',
    highlightAgents: [],
    activeConnections: [],
    annotation: 'Complex documents require understanding context, not just recognizing text. Every code, description, and category relationship matters.',
  },
  {
    id: 2,
    title: 'Autonomous Orchestration',
    subtitle: 'Self-Coordinating Workflow',
    description: 'The Orchestrator autonomously manages the entire pipeline, making decisions about document analysis, parallel extraction, and validation without human intervention.',
    highlightAgents: ['orchestrator'],
    activeConnections: [],
    annotation: 'The agentic approach means no manual configuration per document. The system adapts to any format automatically.',
  },
  {
    id: 3,
    title: 'Intelligent Assessment',
    subtitle: 'AI Vision Understanding',
    description: 'The Assessment Agent uses AI vision to understand document structure like a human would - detecting layouts, identifying sections, and creating extraction plans without pre-configuration.',
    highlightAgents: ['orchestrator', 'assessment-agent'],
    activeConnections: ['orchestrator-assessment-agent'],
    annotation: 'Zero-configuration document understanding. The AI sees the document and determines the best extraction strategy.',
  },
  {
    id: 4,
    title: 'Parallel Subagents',
    subtitle: 'Concurrent Processing Power',
    description: 'Multiple extraction subagents work in parallel, each specialized for different content categories. This dramatically reduces processing time while maintaining accuracy.',
    highlightAgents: ['assessment-agent', 'category-extractor-1', 'category-extractor-2', 'category-extractor-3'],
    activeConnections: ['assessment-agent-category-extractor-1', 'assessment-agent-category-extractor-2', 'assessment-agent-category-extractor-3'],
    annotation: 'Parallelization is key to scale. A document with many sections processes as fast as one with few sections.',
  },
  {
    id: 5,
    title: 'Conversational Refinement',
    subtitle: 'Human-in-the-Loop When Needed',
    description: 'The Refinement Agent enables natural language corrections: operators can guide the AI with simple instructions to fix edge cases or apply domain-specific patterns.',
    highlightAgents: ['category-extractor-1', 'category-extractor-2', 'category-extractor-3', 'refinement-agent'],
    activeConnections: ['category-extractor-1-refinement-agent', 'category-extractor-2-refinement-agent', 'category-extractor-3-refinement-agent'],
    annotation: 'Conversational interface means anyone can guide corrections without technical knowledge.',
  },
  {
    id: 6,
    title: 'Validation & Enrichment',
    subtitle: 'Production-Ready Output',
    description: 'Comprehensive validation ensures data quality with external data enrichment from authoritative sources. Self-healing loops automatically retry failed validations.',
    highlightAgents: ['refinement-agent', 'validator'],
    activeConnections: ['refinement-agent-validator', 'validator-refinement-agent'],
    annotation: 'Validation feedback loops mean the system learns from errors and improves over time.',
  },
  {
    id: 7,
    title: 'The Results',
    subtitle: 'Document Processing Transformed',
    description: 'Autonomous document processing at scale. Two-stage architecture (AI extraction + validation) ensures consistent, production-ready output with full audit trails.',
    highlightAgents: ['orchestrator', 'assessment-agent', 'category-extractor-1', 'category-extractor-2', 'category-extractor-3', 'refinement-agent', 'validator'],
    activeConnections: ['orchestrator-assessment-agent', 'assessment-agent-category-extractor-1', 'assessment-agent-category-extractor-2', 'assessment-agent-category-extractor-3', 'category-extractor-1-refinement-agent', 'category-extractor-2-refinement-agent', 'category-extractor-3-refinement-agent', 'refinement-agent-validator'],
    annotation: 'From document upload to production-ready data in minutes. Set it up once, process any document.',
  },
]

// Results metrics for the final step
export const resultsMetrics = [
  { value: '10x', label: 'Faster Processing', color: '#1A9988' },
  { value: '95%+', label: 'Accuracy Rate', color: '#3B82F6' },
  { value: '100%', label: 'Audit Trail', color: '#22C55E' },
  { value: '24/7', label: 'Autonomous', color: '#8B5CF6' },
]

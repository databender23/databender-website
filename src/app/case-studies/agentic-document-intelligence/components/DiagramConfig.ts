// Agent types and their configurations for the multi-agent document processing architecture
// V2: Updated with plain English translations for non-technical decision makers

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
  plainEnglishLabel: string // V2: Added plain English label
  shortLabel: string
  description: string
  plainEnglishDescription: string // V2: Added plain English description
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
  plainEnglishTitle: string // V2: Added plain English title
  subtitle: string
  description: string
  plainEnglishDescription: string // V2: Added plain English description
  highlightAgents: AgentType[]
  activeConnections: string[]
  annotation: string
}

// V2: Updated story progress labels
export const storyProgressLabels = [
  { id: 1, label: 'The Problem', anchor: 'act1' },
  { id: 2, label: 'What Didn\'t Work', anchor: 'act2' },
  { id: 3, label: 'The Breakthrough', anchor: 'act3' },
  { id: 4, label: 'How It Works', anchor: 'act4' },
  { id: 5, label: 'The Results', anchor: 'act5' },
]

// Agent node definitions for multi-agent document processing
// V2: Enhanced with plain English descriptions
export const agentNodes: AgentNodeConfig[] = [
  {
    id: 'orchestrator',
    label: 'Orchestrator',
    plainEnglishLabel: 'Project Manager AI',
    shortLabel: 'Manager',
    description: 'Central coordinator managing the document-to-data pipeline, routing tasks to specialized agents autonomously',
    plainEnglishDescription: 'The "boss" that coordinates the whole team - decides what needs to happen and assigns work to specialists',
    icon: 'brain',
    color: '#1A9988',
    glowColor: 'rgba(26, 153, 136, 0.4)',
    position: { x: 50, y: 15 },
    size: 'large',
  },
  {
    id: 'assessment-agent',
    label: 'Document Assessment Agent',
    plainEnglishLabel: 'Document Scanner',
    shortLabel: 'Scanner',
    description: 'Analyzes document structure using AI vision, detecting layouts and mapping extraction strategies automatically',
    plainEnglishDescription: 'AI that can see and read documents like a human - figures out where the tables, text, and important info are',
    icon: 'search',
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    position: { x: 50, y: 38 },
    size: 'medium',
  },
  {
    id: 'category-extractor-1',
    label: 'Parallel Extraction Agent',
    plainEnglishLabel: 'Specialist Worker A',
    shortLabel: 'Worker A',
    description: 'Specialized subagent processing one category in parallel with other extractors',
    plainEnglishDescription: 'A specialist that focuses on one section of the document - works at the same time as other specialists',
    icon: 'table',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    position: { x: 22, y: 58 },
    size: 'small',
  },
  {
    id: 'category-extractor-2',
    label: 'Parallel Extraction Agent',
    plainEnglishLabel: 'Specialist Worker B',
    shortLabel: 'Worker B',
    description: 'Specialized subagent processing one category in parallel with other extractors',
    plainEnglishDescription: 'A specialist that focuses on one section of the document - works at the same time as other specialists',
    icon: 'table',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    position: { x: 50, y: 58 },
    size: 'small',
  },
  {
    id: 'category-extractor-3',
    label: 'Parallel Extraction Agent',
    plainEnglishLabel: 'Specialist Worker C',
    shortLabel: 'Worker C',
    description: 'Specialized subagent processing one category in parallel with other extractors',
    plainEnglishDescription: 'A specialist that focuses on one section of the document - works at the same time as other specialists',
    icon: 'table',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    position: { x: 78, y: 58 },
    size: 'small',
  },
  {
    id: 'refinement-agent',
    label: 'Refinement Agent',
    plainEnglishLabel: 'Error Fixer',
    shortLabel: 'Fixer',
    description: 'AI-powered corrections using conversational guidance to fix categorization and clean extracted data',
    plainEnglishDescription: 'Catches mistakes and fixes them - you can talk to it in plain English to make corrections',
    icon: 'wand',
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    position: { x: 50, y: 76 },
    size: 'medium',
  },
  {
    id: 'validator',
    label: 'Validator Agent',
    plainEnglishLabel: 'Quality Checker',
    shortLabel: 'Checker',
    description: 'Comprehensive validation ensuring production-ready data with external data enrichment',
    plainEnglishDescription: 'Final quality control - makes sure everything is correct before the data goes into your systems',
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
// V2: Enhanced with plain English versions
export const storySteps: StepConfig[] = [
  {
    id: 1,
    title: 'The Document Challenge',
    plainEnglishTitle: 'The Problem: Documents That Machines Can\'t Read',
    subtitle: 'Where Traditional Tools Fail',
    description: 'Complex multi-page documents with tables, multi-column layouts, and varying formats. Traditional OCR and rule-based systems produce unusable output that still requires manual cleanup.',
    plainEnglishDescription: 'Your documents have tables, multiple columns, and different layouts. Regular scanning tools turn them into gibberish that someone still has to fix by hand.',
    highlightAgents: [],
    activeConnections: [],
    annotation: 'Every code, description, and category relationship matters - and traditional tools lose all of that context.',
  },
  {
    id: 2,
    title: 'Autonomous Orchestration',
    plainEnglishTitle: 'Enter the Project Manager AI',
    subtitle: 'Self-Coordinating Workflow',
    description: 'The Orchestrator autonomously manages the entire pipeline, making decisions about document analysis, parallel extraction, and validation without human intervention.',
    plainEnglishDescription: 'Think of this as a smart project manager that automatically decides how to handle each document - no configuration needed from you.',
    highlightAgents: ['orchestrator'],
    activeConnections: [],
    annotation: 'No manual setup per document type. The AI figures out what to do on its own.',
  },
  {
    id: 3,
    title: 'Intelligent Assessment',
    plainEnglishTitle: 'AI That Can See Your Documents',
    subtitle: 'AI Vision Understanding',
    description: 'The Assessment Agent uses AI vision to understand document structure like a human would - detecting layouts, identifying sections, and creating extraction plans without pre-configuration.',
    plainEnglishDescription: 'The AI literally looks at your document and understands it like a person would - it sees where tables are, what headers mean, and how information relates.',
    highlightAgents: ['orchestrator', 'assessment-agent'],
    activeConnections: ['orchestrator-assessment-agent'],
    annotation: 'Zero-configuration: the AI sees and understands, just like a skilled human would.',
  },
  {
    id: 4,
    title: 'Parallel Subagents',
    plainEnglishTitle: 'Team of Specialists Working Together',
    subtitle: 'Concurrent Processing Power',
    description: 'Multiple extraction subagents work in parallel, each specialized for different content categories. This dramatically reduces processing time while maintaining accuracy.',
    plainEnglishDescription: 'Multiple specialist workers tackle different parts of the document at the same time - like having a whole team instead of one person.',
    highlightAgents: ['assessment-agent', 'category-extractor-1', 'category-extractor-2', 'category-extractor-3'],
    activeConnections: ['assessment-agent-category-extractor-1', 'assessment-agent-category-extractor-2', 'assessment-agent-category-extractor-3'],
    annotation: 'A 100-page document processes as fast as a 10-page one because work happens simultaneously.',
  },
  {
    id: 5,
    title: 'Conversational Refinement',
    plainEnglishTitle: 'Talk to It to Fix Issues',
    subtitle: 'Human-in-the-Loop When Needed',
    description: 'The Refinement Agent enables natural language corrections: operators can guide the AI with simple instructions to fix edge cases or apply domain-specific patterns.',
    plainEnglishDescription: 'If something is wrong, just tell the AI in plain English. "Move this to that category" or "These items should be grouped together."',
    highlightAgents: ['category-extractor-1', 'category-extractor-2', 'category-extractor-3', 'refinement-agent'],
    activeConnections: ['category-extractor-1-refinement-agent', 'category-extractor-2-refinement-agent', 'category-extractor-3-refinement-agent'],
    annotation: 'No coding or technical knowledge needed - just talk to it like you would a colleague.',
  },
  {
    id: 6,
    title: 'Validation & Enrichment',
    plainEnglishTitle: 'Quality Control Checks',
    subtitle: 'Production-Ready Output',
    description: 'Comprehensive validation ensures data quality with external data enrichment from authoritative sources. Self-healing loops automatically retry failed validations.',
    plainEnglishDescription: 'Automatic quality checks catch any remaining errors. The system even adds missing information from trusted databases.',
    highlightAgents: ['refinement-agent', 'validator'],
    activeConnections: ['refinement-agent-validator', 'validator-refinement-agent'],
    annotation: 'If something fails validation, the system fixes it automatically - no human needed.',
  },
  {
    id: 7,
    title: 'The Results',
    plainEnglishTitle: 'Clean Data, Ready to Use',
    subtitle: 'Document Processing Transformed',
    description: 'Autonomous document processing at scale. Two-stage architecture (AI extraction + validation) ensures consistent, production-ready output with full audit trails.',
    plainEnglishDescription: 'Your documents become clean, accurate data that flows directly into your systems. No manual cleanup. Full record of everything.',
    highlightAgents: ['orchestrator', 'assessment-agent', 'category-extractor-1', 'category-extractor-2', 'category-extractor-3', 'refinement-agent', 'validator'],
    activeConnections: ['orchestrator-assessment-agent', 'assessment-agent-category-extractor-1', 'assessment-agent-category-extractor-2', 'assessment-agent-category-extractor-3', 'category-extractor-1-refinement-agent', 'category-extractor-2-refinement-agent', 'category-extractor-3-refinement-agent', 'refinement-agent-validator'],
    annotation: 'From document upload to production-ready data in minutes, not hours.',
  },
]

// Results metrics for the final step
export const resultsMetrics = [
  { value: '10x', label: 'Faster Processing', color: '#1A9988' },
  { value: '95%+', label: 'Accuracy Rate', color: '#3B82F6' },
  { value: '100%', label: 'Audit Trail', color: '#22C55E' },
  { value: '24/7', label: 'Autonomous', color: '#8B5CF6' },
]

// Industry cards focused on format standardization and operational enablement
export const industryCards = [
  {
    industry: 'Healthcare',
    challenge: 'Medical Device Catalogs',
    description: '70+ manufacturers, each with unique document formats. AI agents process Patient Charge Sheets, Usage Tickets, and Product Catalogs - all with zero custom code per vendor.',
    metric: 'Powers a sales rep mobile app',
    isCta: false,
  },
  {
    industry: 'Legal',
    challenge: 'Multi-Vendor Contracts',
    description: 'Contracts from different firms use different templates. One AI system handles them all - extracting clauses, obligations, and key terms regardless of format.',
    metric: 'Unified contract database',
    isCta: false,
  },
  {
    industry: 'Insurance',
    challenge: 'Varied Claim Documents',
    description: 'Medical records, invoices, and supporting docs come in hundreds of formats. Dynamic processing extracts key facts without format-specific rules.',
    metric: 'Any document, same output',
    isCta: false,
  },
  {
    industry: 'Financial Services',
    challenge: 'Multi-Source Reporting',
    description: 'Financial statements from different institutions follow different standards. AI agents understand context, not just patterns - standardizing data across sources.',
    metric: 'Consolidated analytics',
    isCta: false,
  },
  {
    industry: 'Supply Chain',
    challenge: 'Supplier Documentation',
    description: 'Specs, invoices, and compliance docs from global suppliers in countless formats. One system processes them all into your ERP-ready format.',
    metric: 'Vendor-agnostic processing',
    isCta: false,
  },
  {
    industry: 'Your Industry',
    challenge: 'Format Standardization',
    description: 'Any scenario where documents come from multiple sources in varied formats - we build an AI solution that handles them all dynamically.',
    metric: 'Let\'s discuss your use case',
    isCta: true,
  },
]

// Configuration for the Lead Scoring Diagram
// Multi-source ML pipeline for intelligent lead prioritization

export type PipelineStage = 'etl' | 'scoring' | 'listener' | 'posting' | 'salesforce'

export interface DataNode {
  id: string
  label: string
  shortLabel: string
  icon: string
  description: string
  dataTypes: string[]
  color: string
  glowColor: string
  position: { x: number; y: number }
}

export interface OutputBucket {
  id: string
  label: string
  color: string
  bgColor: string
  borderColor: string
  percentage: number
  beforePercentage: number
  description: string
}

export interface StoryStep {
  id: number
  title: string
  subtitle: string
  narrative: string
  highlightNodes: string[]
  showConnections: boolean
  showOutputs: boolean
  showBeforeAfter?: 'before' | 'after' | 'transition'
  annotation?: string
}

// Input data sources for the ML model
export const inputNodes: DataNode[] = [
  {
    id: 'salesforce',
    label: 'CRM Data',
    shortLabel: 'CRM',
    icon: '☁️',
    description: 'Lead and opportunity data from CRM',
    dataTypes: ['Leads', 'Opportunities', 'Project details', 'Timeline', 'Estimated value'],
    color: 'bg-blue-500',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    position: { x: 15, y: 30 },
  },
  {
    id: 'redfin',
    label: 'Market Data',
    shortLabel: 'Market',
    icon: '🏠',
    description: 'External market intelligence by geography',
    dataTypes: ['Property values', 'Market trends', 'Geographic signals', 'Competitive data'],
    color: 'bg-red-500',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    position: { x: 15, y: 50 },
  },
  {
    id: 'census',
    label: 'Demographic Data',
    shortLabel: 'Demographics',
    icon: '📊',
    description: 'Demographic and economic signals',
    dataTypes: ['Income levels', 'Population data', 'Demographics', 'Economic indicators'],
    color: 'bg-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    position: { x: 15, y: 70 },
  },
]

// Processing pipeline nodes
export const pipelineNodes: DataNode[] = [
  {
    id: 'etl',
    label: 'Data Pipeline',
    shortLabel: 'ETL',
    icon: '🔄',
    description: 'Autonomous data integration and enrichment',
    dataTypes: ['Data extraction', 'Enrichment', 'Geographic matching', 'Validation'],
    color: 'bg-indigo-500',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    position: { x: 35, y: 50 },
  },
  {
    id: 'ml-model',
    label: 'ML Scoring Engine',
    shortLabel: 'ML Model',
    icon: '🧠',
    description: 'Custom ML model with discovered features',
    dataTypes: ['Feature engineering', 'Prediction', 'Probability scoring', 'Business rules'],
    color: 'bg-teal-500',
    glowColor: 'rgba(26, 153, 136, 0.4)',
    position: { x: 50, y: 50 },
  },
  {
    id: 'listener',
    label: 'Real-time Listener',
    shortLabel: 'Listener',
    icon: '📡',
    description: 'Continuous monitoring for new data',
    dataTypes: ['Change detection', 'Priority processing', 'Deduplication', 'Batch optimization'],
    color: 'bg-amber-500',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    position: { x: 65, y: 30 },
  },
  {
    id: 'poster',
    label: 'Score Sync',
    shortLabel: 'Sync',
    icon: '📤',
    description: 'Adaptive score delivery with retry logic',
    dataTypes: ['Intelligent posting', 'Bulk processing', 'Auto-retry', 'Audit trail'],
    color: 'bg-green-500',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    position: { x: 80, y: 50 },
  },
]

// Model features - generalized for case study
export const modelFeatures = [
  {
    name: 'Financial Capacity',
    field: 'financial_indicator',
    importance: 85,
    discovered: true,
    genericRank: 4,
    description: 'Financial capacity signal - strongest predictor of conversion'
  },
  {
    name: 'Urgency Signal',
    field: 'urgency_encoded',
    importance: 72,
    discovered: true,
    genericRank: 6,
    description: 'Encoded urgency/timeline signals'
  },
  {
    name: 'Local Success Rate',
    field: 'local_conversion_rate',
    importance: 68,
    discovered: true,
    genericRank: 5,
    description: 'Historical success rate in geographic area'
  },
  {
    name: 'Deal Size',
    field: 'estimated_value',
    importance: 55,
    discovered: false,
    genericRank: 1,
    description: 'Estimated deal value'
  },
  {
    name: 'Property Attributes',
    field: 'property_size',
    importance: 45,
    discovered: false,
    genericRank: 2,
    description: 'Property characteristics'
  },
  {
    name: 'Economic Indicators',
    field: 'area_income',
    importance: 38,
    discovered: true,
    genericRank: 7,
    description: 'Area economic indicators'
  },
  {
    name: 'Demographics',
    field: 'demographic_signals',
    importance: 28,
    discovered: true,
    genericRank: 8,
    description: 'Demographic characteristics'
  },
]

// Output lead buckets
export const outputBuckets: OutputBucket[] = [
  {
    id: 'hot',
    label: 'Hot Leads',
    color: 'text-success',
    bgColor: 'bg-success/20',
    borderColor: 'border-success',
    percentage: 15,
    beforePercentage: 33,
    description: 'High equity, urgent timeline, proven ZIP code',
  },
  {
    id: 'warm',
    label: 'Warm Leads',
    color: 'text-warning',
    bgColor: 'bg-warning/20',
    borderColor: 'border-warning',
    percentage: 35,
    beforePercentage: 34,
    description: 'Good indicators, prioritized follow-up',
  },
  {
    id: 'cold',
    label: 'Cold Leads',
    color: 'text-gray-400',
    bgColor: 'bg-gray-200/50',
    borderColor: 'border-gray-300',
    percentage: 50,
    beforePercentage: 33,
    description: 'Automated nurture sequence',
  },
]

// Safeguard scoring rules - business logic overrides
export const safeguardRules = [
  {
    condition: 'Strategic Segment',
    field: 'Strategic segment match',
    minScore: 75,
    description: 'Strategic segments get minimum priority score',
  },
  {
    condition: 'High Value',
    field: 'Deal size threshold',
    minScore: 75,
    description: 'High-value opportunities get minimum priority score',
  },
]

// Filter rules - generalized
export const filterRules = {
  opportunities: [
    { name: 'Closed', rule: 'Status = Closed', action: 'Excluded' },
    { name: 'Terminal Stages', rule: 'Final pipeline stages', action: 'Excluded' },
    { name: 'Missing Location', rule: 'No geographic data', action: 'Excluded (unless safeguard)' },
    { name: 'Invalid Location', rule: 'Invalid format', action: 'Excluded (unless safeguard)' },
    { name: 'Missing Value', rule: 'No deal value', action: 'Excluded (unless safeguard)' },
  ],
  leads: [
    { name: 'Converted', rule: 'Already converted', action: 'Excluded' },
    { name: 'Disqualified', rule: 'Marked as lost or unqualified', action: 'Excluded' },
    { name: 'Missing Location', rule: 'No geographic data', action: 'Excluded (unless safeguard)' },
    { name: 'Invalid Location', rule: 'Invalid format', action: 'Excluded (unless safeguard)' },
    { name: 'Missing Value', rule: 'No deal value', action: 'Excluded (unless safeguard)' },
  ],
}

// Story steps for the interactive experience
export const storySteps: StoryStep[] = [
  {
    id: 1,
    title: 'The Guessing Game',
    subtitle: 'Generic scoring fails',
    narrative: 'Hundreds of leads per month with no way to tell which would convert. Generic scoring treats all leads equally, wasting sales time on low-quality prospects.',
    highlightNodes: [],
    showConnections: false,
    showOutputs: false,
    showBeforeAfter: 'before',
    annotation: 'Sales teams spending significant time on leads that will never convert.',
  },
  {
    id: 2,
    title: 'Multi-Source Integration',
    subtitle: 'Connecting data sources',
    narrative: 'We integrate multiple data sources: CRM data, external market intelligence, and demographic signals. Each lead becomes enriched with dozens of predictive signals.',
    highlightNodes: ['salesforce', 'redfin', 'census'],
    showConnections: false,
    showOutputs: false,
    annotation: 'Data integration is the foundation. Multi-source enrichment enables predictive power.',
  },
  {
    id: 3,
    title: 'Hidden Patterns',
    subtitle: 'Discovering real predictors',
    narrative: 'The breakthrough: our ML analysis discovered that non-obvious signals predict conversions far better than traditional metrics. Local success patterns and urgency signals outperform generic indicators.',
    highlightNodes: ['redfin', 'census'],
    showConnections: false,
    showOutputs: false,
    annotation: 'Generic tools miss the patterns. Custom ML discovers what actually drives conversions.',
  },
  {
    id: 4,
    title: 'Autonomous Pipeline',
    subtitle: 'ML scoring architecture',
    narrative: 'A complete autonomous pipeline extracts and enriches data, feeding a custom ML model. Safeguard logic ensures high-value opportunities get appropriate priority.',
    highlightNodes: ['salesforce', 'redfin', 'census', 'etl', 'ml-model'],
    showConnections: true,
    showOutputs: false,
    annotation: 'Custom ML with discovered features, optimized for your conversion patterns.',
  },
  {
    id: 5,
    title: 'Real-Time Scoring',
    subtitle: 'Near-instant response',
    narrative: 'A real-time listener monitors for changes continuously. New leads and updates are scored instantly and synced back to the CRM with automatic retry logic.',
    highlightNodes: ['listener', 'poster', 'ml-model'],
    showConnections: true,
    showOutputs: true,
    showBeforeAfter: 'after',
    annotation: 'Smart batching and intelligent processing keeps the system responsive.',
  },
  {
    id: 6,
    title: 'The Results',
    subtitle: 'Measurable impact',
    narrative: 'Real-time lead scoring with 40-60% reduction in wasted effort. Sales teams focus on leads that actually convert, with scores updating automatically.',
    highlightNodes: ['salesforce', 'redfin', 'census', 'etl', 'ml-model', 'listener', 'poster'],
    showConnections: true,
    showOutputs: true,
    showBeforeAfter: 'after',
    annotation: 'The system runs autonomously 24/7, continuously improving from new data.',
  },
]

// Results metrics for the final reveal
export const resultsMetrics = [
  { value: '40-60%', label: 'Less Wasted Effort', color: '#22C55E' },
  { value: '30s', label: 'Real-time Updates', color: '#1A9988' },
  { value: '7', label: 'ML Features', color: '#3B82F6' },
  { value: '24/7', label: 'Autonomous Scoring', color: '#8B5CF6' },
]

// Feature importance data for the FeatureImportance component
// Maps modelFeatures to the expected format
export const featureImportance = modelFeatures.map(f => ({
  feature: f.name,
  importance: f.importance,
  genericRank: f.genericRank,
  discovered: f.discovered,
}))

// Colors for the diagram theme
export const diagramColors = {
  blue: {
    primary: '#3B82F6',
    light: 'rgba(59, 130, 246, 0.2)',
    glow: 'rgba(59, 130, 246, 0.4)',
  },
  green: {
    primary: '#22C55E',
    light: 'rgba(34, 197, 94, 0.2)',
    glow: 'rgba(34, 197, 94, 0.4)',
  },
  yellow: {
    primary: '#F59E0B',
    light: 'rgba(245, 158, 11, 0.2)',
    glow: 'rgba(245, 158, 11, 0.4)',
  },
  gray: {
    primary: '#9CA3AF',
    light: 'rgba(156, 163, 175, 0.2)',
    glow: 'rgba(156, 163, 175, 0.4)',
  },
  teal: {
    primary: '#1A9988',
    light: 'rgba(26, 153, 136, 0.2)',
    glow: 'rgba(26, 153, 136, 0.4)',
  },
  red: {
    primary: '#EF4444',
    light: 'rgba(239, 68, 68, 0.2)',
    glow: 'rgba(239, 68, 68, 0.4)',
  },
  purple: {
    primary: '#8B5CF6',
    light: 'rgba(139, 92, 246, 0.2)',
    glow: 'rgba(139, 92, 246, 0.4)',
  },
}

// DiagramConfig.ts - Single source of truth for entity resolution case study

// Pipeline stage types
export type StageId = 'input' | 'collision' | 'unstable' | 'crossref' | 'match' | 'output'

export interface PipelineStage {
  id: StageId
  label: string
  plainEnglish: string
  color: string
  icon: 'database' | 'split' | 'merge' | 'link' | 'check' | 'sparkles'
}

// Pipeline stages for entity resolution
export const pipelineStages: PipelineStage[] = [
  {
    id: 'input',
    label: 'Raw Records',
    plainEnglish: '1.69M owner records',
    color: 'orange',
    icon: 'database'
  },
  {
    id: 'collision',
    label: 'Fix Collisions',
    plainEnglish: 'Separate shared IDs',
    color: 'orange',
    icon: 'split'
  },
  {
    id: 'unstable',
    label: 'Consolidate',
    plainEnglish: 'Merge duplicates',
    color: 'purple',
    icon: 'merge'
  },
  {
    id: 'crossref',
    label: 'Cross-Reference',
    plainEnglish: 'Find overlaps',
    color: 'blue',
    icon: 'link'
  },
  {
    id: 'match',
    label: 'Match Records',
    plainEnglish: 'Connect stable records',
    color: 'teal',
    icon: 'check'
  },
  {
    id: 'output',
    label: 'Clean Data',
    plainEnglish: '1.25M unique owners',
    color: 'emerald',
    icon: 'sparkles'
  }
]

// Connection between stages
export interface StageConnection {
  id: string
  from: StageId
  to: StageId
}

export const stageConnections: StageConnection[] = [
  { id: 'input-collision', from: 'input', to: 'collision' },
  { id: 'collision-unstable', from: 'collision', to: 'unstable' },
  { id: 'unstable-crossref', from: 'unstable', to: 'crossref' },
  { id: 'crossref-match', from: 'crossref', to: 'match' },
  { id: 'input-match', from: 'input', to: 'match' }, // Stable records bypass
  { id: 'match-output', from: 'match', to: 'output' }
]

// Story step configuration
export interface StoryStep {
  id: number
  title: string
  plainEnglishTitle: string
  description: string
  plainEnglishDescription: string
  highlightStages: StageId[]
  activeConnections: string[]
  stats?: { label: string; value: string; color: string }[]
}

export const storySteps: StoryStep[] = [
  {
    id: 1,
    title: 'The Problem',
    plainEnglishTitle: 'Inconsistent Public Records',
    description: 'Public tax rolls aggregated from counties with wildly different data quality. Same ID assigned to multiple people, same person scattered across multiple IDs.',
    plainEnglishDescription: 'Owner ID 817132 had 670 different people assigned to it. Miller Paula appeared under 4 separate IDs. Anyone working with government data at the county level knows this pain.',
    highlightStages: ['input'],
    activeConnections: [],
    stats: [
      { label: 'Total Records', value: '1.69M', color: 'orange' },
      { label: 'Collision Groups', value: '44,421', color: 'orange' },
      { label: 'Unstable Groups', value: '99,581', color: 'purple' }
    ]
  },
  {
    id: 2,
    title: 'Fix Collision IDs',
    plainEnglishTitle: 'Separate People Sharing IDs',
    description: '44,421 groups where completely unrelated people shared the same Owner ID. Split into unique COL-* identifiers.',
    plainEnglishDescription: 'When one ID has 670 different people, you need to give each person their own ID. We created 51,609 new unique IDs.',
    highlightStages: ['input', 'collision'],
    activeConnections: ['input-collision'],
    stats: [
      { label: 'Groups Found', value: '44,421', color: 'orange' },
      { label: 'Worst Case', value: '670 people', color: 'orange' },
      { label: 'New IDs Created', value: '51,609', color: 'teal' }
    ]
  },
  {
    id: 3,
    title: 'Consolidate Unstable IDs',
    plainEnglishTitle: 'Merge Records for Same Person',
    description: '99,581 groups where the same person had multiple different Owner IDs. Consolidated using 10 different match types.',
    plainEnglishDescription: 'Miller Paula had 4 different IDs across Texas. We merged them into one. No more sending the same offer four times.',
    highlightStages: ['collision', 'unstable'],
    activeConnections: ['input-collision', 'collision-unstable'],
    stats: [
      { label: 'Groups Found', value: '99,581', color: 'purple' },
      { label: 'Worst Case', value: '257 IDs', color: 'purple' },
      { label: 'Match Types Used', value: '10', color: 'teal' }
    ]
  },
  {
    id: 4,
    title: 'Cross-Reference Check',
    plainEnglishTitle: 'Find Duplicates Across Processes',
    description: 'Some owners appeared in both collision and unstable groups. Found 3,889 matches, created 3,670 UNIFIED-* identifiers.',
    plainEnglishDescription: 'After fixing collisions and merging unstable IDs, we checked for overlaps. Found 3,889 cases where the same person appeared in both.',
    highlightStages: ['unstable', 'crossref'],
    activeConnections: ['collision-unstable', 'unstable-crossref'],
    stats: [
      { label: 'Matches Found', value: '3,889', color: 'blue' },
      { label: 'Unified IDs', value: '3,670', color: 'teal' }
    ]
  },
  {
    id: 5,
    title: 'Match Stable Records',
    plainEnglishTitle: 'Connect Clean Records to Groups',
    description: '1.38 million stable records matched to consolidated groups using location, address, and name-based matching.',
    plainEnglishDescription: 'Most records were already clean. We connected them to the fixed groups using location, address, and name matching.',
    highlightStages: ['input', 'crossref', 'match'],
    activeConnections: ['unstable-crossref', 'crossref-match', 'input-match'],
    stats: [
      { label: 'Stable Records', value: '1.38M', color: 'teal' },
      { label: 'Match Rate', value: '100%', color: 'emerald' }
    ]
  },
  {
    id: 6,
    title: 'AI Validation',
    plainEnglishTitle: 'Validate Every Decision',
    description: '50,000+ merge and split decisions validated by 10 parallel AI agents. Every decision documented with reasoning.',
    plainEnglishDescription: '10 AI agents work in parallel, each reviewing 20 owners at a time. What would take a human 500 hours costs $200.',
    highlightStages: ['collision', 'unstable', 'crossref', 'match'],
    activeConnections: ['input-collision', 'collision-unstable', 'unstable-crossref', 'crossref-match', 'input-match'],
    stats: [
      { label: 'Parallel Agents', value: '10', color: 'purple' },
      { label: 'Owners per Batch', value: '200', color: 'teal' },
      { label: 'Total AI Cost', value: '$200', color: 'emerald' }
    ]
  },
  {
    id: 7,
    title: 'The Results',
    plainEnglishTitle: 'Competitive Advantage Achieved',
    description: '1.25 million unique owners identified. More accurate offers, better ownership tracking, first-mover advantage on deals.',
    plainEnglishDescription: 'Everyone using public tax data has these problems. Agentic AI made it financially feasible to fix them. This client did. Their competitors haven\'t.',
    highlightStages: ['match', 'output'],
    activeConnections: ['crossref-match', 'input-match', 'match-output']
  }
]

// Results metrics for final step
export interface ResultMetric {
  label: string
  value: string
  color: 'teal' | 'emerald' | 'orange' | 'purple'
}

export const resultsMetrics: ResultMetric[] = [
  { label: 'Records Processed', value: '1.69M', color: 'teal' },
  { label: 'Unique Owners', value: '1.25M', color: 'emerald' },
  { label: 'Cost Savings', value: '125x', color: 'orange' },
  { label: 'Time to Market', value: '10x', color: 'purple' }
]

// Industry use cases
export interface IndustryCard {
  industry: string
  challenge: string
  description: string
  metric: string
  isCta?: boolean
}

export const industryCards: IndustryCard[] = [
  {
    industry: 'Oil & Gas',
    challenge: 'Mineral Rights Ownership',
    description: 'Track ownership changes across millions of records. Reach the right person on the first try.',
    metric: 'First-mover advantage'
  },
  {
    industry: 'Real Estate',
    challenge: 'Property & Owner Records',
    description: 'Same property, different records over time. Track ownership accurately.',
    metric: '10x faster research'
  },
  {
    industry: 'Financial Services',
    challenge: 'Customer Data Unification',
    description: 'One customer, multiple products, multiple names. Create a single customer view.',
    metric: 'Single source of truth'
  },
  {
    industry: 'Healthcare',
    challenge: 'Patient Record Matching',
    description: 'Same patient, different visits, different systems. Unify records across facilities.',
    metric: '90%+ duplicate reduction'
  },
  {
    industry: 'Manufacturing',
    challenge: 'Supplier Consolidation',
    description: 'Same vendor, different names from M&A. Consolidate your supplier base.',
    metric: '30%+ duplicate suppliers found'
  },
  {
    industry: 'Your Industry',
    challenge: 'Custom Data Challenges',
    description: 'Any messy data that needs matching, deduplication, or consolidation.',
    metric: "Let's discuss your use case",
    isCta: true
  }
]

// Helper function to get stage by ID
export function getStageById(id: StageId): PipelineStage | undefined {
  return pipelineStages.find(stage => stage.id === id)
}

// Helper function to get step by ID
export function getStepById(id: number): StoryStep | undefined {
  return storySteps.find(step => step.id === id)
}

// Color mapping for Tailwind classes
export const colorClasses = {
  orange: {
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-500'
  },
  purple: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-500'
  },
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-500'
  },
  teal: {
    bg: 'bg-teal-500',
    bgLight: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    text: 'text-teal-500'
  },
  emerald: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-500'
  }
} as const

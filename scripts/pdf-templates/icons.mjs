/**
 * SVG Icons for PDF Generation
 *
 * Exports hero icons for guide PDFs and section icons for h3 headings.
 * All SVGs are inline strings for Puppeteer compatibility.
 */

// =============================================================================
// HERO ICONS - 80x80px icons for guide headers
// =============================================================================

export const HERO_ICONS = {
  // ---------------------------------------------------------------------------
  // Legal (7 guides)
  // ---------------------------------------------------------------------------

  // associate-multiplier: Person with upward arrows (multiplication/growth)
  "associate-multiplier": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="20" r="12" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M20 60c0-11 9-20 20-20s20 9 20 20" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M50 35l8-12m0 0l8 12m-8-12v24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M58 55l8-12m0 0l8 12m-8-12v20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // partner-succession: People connected with knowledge flow arrows
  "partner-succession": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="24" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M8 52c0-8 5-14 12-14s12 6 12 14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="24" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M48 52c0-8 5-14 12-14s12 6 12 14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M32 30h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M44 26l4 4-4 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="40" cy="62" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M30 75c0-6 4-10 10-10s10 4 10 10" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M20 52v4l20 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/>
    <path d="M60 52v4l-20 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/>
  </svg>`,

  // win-more-pitches: Trophy with document/ribbon
  "win-more-pitches": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12h32v24c0 9-7 16-16 16s-16-7-16-16V12z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M24 20H14c0 8 4 14 10 16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M56 20h10c0 8-4 14-10 16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M36 52v6h8v-6" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M28 58h24v4H28z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M32 62v10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M48 62v10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M28 72h24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="40" cy="30" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>`,

  // last-vendor: Puzzle pieces coming together
  "last-vendor": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 28h14c0-4 3-7 7-7s7 3 7 7h14v14c-4 0-7 3-7 7s3 7 7 7v14H12V28z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M54 28h14v42H40V56c4 0 7-3 7-7s-3-7-7-7V28h14c0-4 3-7 7-7s7 3 7 7z" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="40" cy="40" r="4" fill="currentColor"/>
  </svg>`,

  // own-your-ai: Lock with code brackets
  "own-your-ai": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="32" width="44" height="36" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M28 32V22c0-7 5-12 12-12s12 5 12 12v10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="50" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M40 56v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M10 40l-6 10 6 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M70 40l6 10-6 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // economics-of-legal-ai: Dollar sign with downward trend arrow
  "economics-of-legal-ai": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="40" r="24" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M32 24v32M26 30c0-3 3-5 6-5s6 2 6 5-3 5-6 5-6 2-6 5 3 5 6 5 6-2 6-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M52 20l18 24-8-2-2 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M54 18h18v2" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // simplify-tech-stack: Converging lines to single point
  "simplify-tech-stack": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="16" cy="40" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="16" cy="64" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="64" cy="40" r="10" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M22 16l32 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M22 40h32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M22 64l32-20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="64" cy="40" r="4" fill="currentColor"/>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Healthcare (5 guides)
  // ---------------------------------------------------------------------------

  // hipaa-compliant-ai: Shield with medical cross
  "hipaa-compliant-ai": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 8L12 20v20c0 18 12 28 28 32 16-4 28-14 28-32V20L40 8z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M36 32h8v8h8v8h-8v8h-8v-8h-8v-8h8v-8z" stroke="currentColor" stroke-width="2.5" fill="none"/>
  </svg>`,

  // institutional-knowledge-healthcare: Brain with connection nodes
  "institutional-knowledge-healthcare": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 12c-12 0-22 8-22 22 0 6 2 11 6 15v15c0 2 2 4 4 4h24c2 0 4-2 4-4V49c4-4 6-9 6-15 0-14-10-22-22-22z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M32 68v-8m16 8v-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="32" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="48" cy="32" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="40" cy="44" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M35 35l3 6m7-6l-3 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 32h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // document-intelligence-healthcare: Document with magnifying glass
  "document-intelligence-healthcare": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8h32l16 16v48c0 2-2 4-4 4H20c-2 0-4-2-4-4V12c0-2 2-4 4-4z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M48 8v12c0 2 2 4 4 4h12" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M24 36h20m-20 8h16m-16 8h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="56" cy="56" r="12" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M64 64l10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // prior-auth-burden: Clock with medical clipboard
  "prior-auth-burden": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="44" r="24" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M32 28v16l10 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="48" y="8" width="24" height="32" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M54 8v-2c0-1 1-2 2-2h8c1 0 2 1 2 2v2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M54 18h12m-12 6h12m-12 6h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // pe-healthcare-operations: Building blocks in portfolio arrangement
  "pe-healthcare-operations": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="44" width="20" height="28" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <rect x="30" y="32" width="20" height="40" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <rect x="52" y="20" width="20" height="52" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M14 52h8m-8 8h8m-8 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 40h8m-8 8h8m-8 8h8m-8 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M58 28h8m-8 8h8m-8 8h8m-8 8h8m-8 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 12h64" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="40" cy="12" r="4" fill="currentColor"/>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Manufacturing (8 guides)
  // ---------------------------------------------------------------------------

  // operational-visibility-playbook: Eye with factory silhouette
  "operational-visibility-playbook": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 40c0 0 16-24 36-24s36 24 36 24-16 24-36 24S4 40 4 40z" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="40" cy="40" r="12" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="40" cy="40" r="5" fill="currentColor"/>
    <path d="M20 60v12h8v-8l8-4v12h8v-12l8 4v8h8V60" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // lead-scoring-manufacturing: Target with checkmarks
  "lead-scoring-manufacturing": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="28" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="40" cy="40" r="18" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="40" cy="40" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="40" cy="40" r="3" fill="currentColor"/>
    <path d="M56 20l4 4 8-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 32l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // manufacturing-ai-privacy: Lock with factory icon
  "manufacturing-ai-privacy": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="36" width="48" height="36" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M28 36V24c0-7 5-12 12-12s12 5 12 12v12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M32 52v8h4v-4l4-4v8h4v-8l4 4v4h4v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="44" y="48" width="4" height="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
  </svg>`,

  // data-cleanup-manufacturing: Broom with database icon
  "data-cleanup-manufacturing": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8l4 28" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M24 36c-8 2-14 8-14 16 0 10 10 18 20 20l4-36" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M18 48l8 12m-4-16l8 16m0-20l8 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="56" cy="28" rx="16" ry="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M40 28v24c0 3 7 6 16 6s16-3 16-6V28" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M40 40c0 3 7 6 16 6s16-3 16-6" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M50 44l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // do-more-with-fewer-people: Single person with multiplication symbol
  "do-more-with-fewer-people": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="24" r="14" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M12 72c0-14 9-24 20-24s20 10 20 24" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M52 32l16 16m0-16l-16 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M48 52h24m-12-12v24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // 90-day-data-roadmap: Calendar with checkpoint markers
  "90-day-data-roadmap": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="64" height="56" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M8 32h64" stroke="currentColor" stroke-width="3"/>
    <path d="M24 8v16m32-16v16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="24" cy="48" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="40" cy="48" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="56" cy="48" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M30 48h4m12 0h4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 45l4 3-4 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 45l4 3-4 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M53 46l3 3 5-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="24" y="64" font-size="8" fill="currentColor" text-anchor="middle">30</text>
    <text x="40" y="64" font-size="8" fill="currentColor" text-anchor="middle">60</text>
    <text x="56" y="64" font-size="8" fill="currentColor" text-anchor="middle">90</text>
  </svg>`,

  // supply-chain-visibility-playbook: Truck with radar waves
  "supply-chain-visibility-playbook": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="32" width="40" height="24" rx="2" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M48 40h16l8 12v4H48V40z" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="24" cy="60" r="6" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="60" cy="60" r="6" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M30 56h24" stroke="currentColor" stroke-width="3"/>
    <path d="M18 24c8-8 22-8 30 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M24 18c5-5 14-5 19 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M30 12c3-3 8-3 11 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  </svg>`,

  // erp-integration-guide: Gears connecting together
  "erp-integration-guide": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="32" r="12" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="28" cy="32" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M28 16v4m0 24v4m-14-18h4m24 0h4m-26-10l3 3m16 14l3 3m-22 0l3-3m16-14l3-3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="52" cy="52" r="16" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="52" cy="52" r="7" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M52 32v4m0 32v4m-18-22h4m32 0h4m-32-14l3 3m22 22l3 3m-28 0l3-3m22-22l3-3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ---------------------------------------------------------------------------
  // CRE (8 guides)
  // ---------------------------------------------------------------------------

  // entity-resolution-cre: Network nodes connecting
  "entity-resolution-cre": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="10" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="16" cy="20" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="64" cy="20" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="16" cy="60" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="64" cy="60" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M24 24l8 10m24-10l-8 10m-24 12l8-10m24 10l-8-10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="40" cy="40" r="4" fill="currentColor"/>
  </svg>`,

  // data-room-review: Folder with AI/scan lines
  "data-room-review": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 24h24l8 8h32v40c0 2-2 4-4 4H12c-2 0-4-2-4-4V24z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M8 24V16c0-2 2-4 4-4h20l8 8" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M24 44h32m-32 10h24m-24 10h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M16 44v20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/>
  </svg>`,

  // deal-prioritization: Funnel with target markers
  "deal-prioritization": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12h64L48 44v20l-16 8V44L8 12z" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="24" cy="24" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="40" cy="20" r="4" fill="currentColor"/>
    <circle cx="56" cy="24" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="40" cy="36" r="4" fill="currentColor"/>
    <path d="M64 48l8-8m-8 0l8 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M64 64l8-8m-8 0l8 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // portfolio-visibility-cre: Multiple buildings with dashboard overlay
  "portfolio-visibility-cre": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="36" width="18" height="36" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <rect x="31" y="24" width="18" height="48" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <rect x="54" y="32" width="18" height="40" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M14 44h6m-6 8h6m-6 8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M37 32h6m-6 8h6m-6 8h6m-6 8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M60 40h6m-6 8h6m-6 8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="16" y="8" width="48" height="20" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M24 14v8m8-4v4m8-6v6m8-8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // investor-reporting-cre: Chart with clock
  "investor-reporting-cre": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="56" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M16 24h32m-32 8h24m-24 8h28m-28 8h20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 48l6 6 10-12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="60" cy="52" r="16" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M60 44v8l6 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // lease-intelligence-cre: Calendar with alert/notification
  "lease-intelligence-cre": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="48" height="56" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M8 32h48" stroke="currentColor" stroke-width="3"/>
    <path d="M20 8v16m24-16v16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M16 44h8m-8 8h8m-8 8h8m12-16h8m-8 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="64" cy="24" r="12" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M64 18v8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="64" cy="30" r="2" fill="currentColor"/>
  </svg>`,

  // debt-maturity-wall: Graph showing cliff/wall
  "debt-maturity-wall": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 72h64" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M8 72V16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M16 56h12V48h8V40h8V24h8v48" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round"/>
    <path d="M52 24v48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M56 20l-4-8-4 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M60 32h8m-8 8h8m-8 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2"/>
  </svg>`,

  // cam-reconciliation-guide: Calculator with checkmark
  "cam-reconciliation-guide": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="8" width="40" height="56" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
    <rect x="20" y="16" width="24" height="12" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="24" cy="40" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="40" cy="40" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="24" cy="52" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="40" cy="52" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="60" cy="56" r="16" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M52 56l6 6 12-12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Construction (3 guides)
  // ---------------------------------------------------------------------------

  // project-visibility-playbook: Hard hat with eye icon
  "project-visibility-playbook": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 40c0-16 12-28 28-28s28 12 28 28" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M8 44h64v8c0 4-4 8-8 8H16c-4 0-8-4-8-8v-8z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M40 12v16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="40" cy="68" rx="20" ry="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="40" cy="68" r="3" fill="currentColor"/>
  </svg>`,

  // change-order-recovery: Dollar with upward arrow
  "change-order-recovery": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="44" r="24" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M36 28v32M30 34c0-3 3-5 6-5s6 2 6 5-3 5-6 5-6 2-6 5 3 5 6 5 6-2 6-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M56 8v24l8-8m-8 8l-8-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // construction-post-acquisition: Buildings merging together
  "construction-post-acquisition": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="28" width="24" height="44" rx="2" stroke="currentColor" stroke-width="3" fill="none"/>
    <rect x="48" y="28" width="24" height="44" rx="2" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M14 36h12m-12 8h12m-12 8h12m-12 8h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M54 36h12m-12 8h12m-12 8h12m-12 8h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 44h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M36 40l-4 4 4 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M44 40l4 4-4 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="32" y="8" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M40 8v-4m0 24v4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ---------------------------------------------------------------------------
  // Distribution (5 guides)
  // ---------------------------------------------------------------------------

  // inventory-intelligence-guide: Warehouse with chart bars
  "inventory-intelligence-guide": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 32L40 12l32 20v40H8V32z" stroke="currentColor" stroke-width="3" fill="none"/>
    <path d="M8 32h64" stroke="currentColor" stroke-width="3"/>
    <rect x="32" y="52" width="16" height="20" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M16 44v20" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M24 52v12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M56 48v16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M64 40v24" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  // customer-profitability-distribution: People with profit/dollar indicators
  "customer-profitability-distribution": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M12 56c0-9 5-16 12-16s12 7 12 16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="56" cy="24" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M44 56c0-9 5-16 12-16s12 7 12 16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M20 64l4 8 8-4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M60 64l-4-8-8 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="24" y="72" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">$</text>
    <text x="56" y="72" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">$</text>
  </svg>`,

  // pricing-discipline-distribution: Price tag with shield
  "pricing-discipline-distribution": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12h28l32 32-28 28L8 40V12z" stroke="currentColor" stroke-width="3" fill="none"/>
    <circle cx="24" cy="28" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M52 16L60 8v12c0 12-8 20-8 28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M68 8v12c0 12-8 20-8 28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M52 16h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M56 24l4 4 6-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // distribution-labor-shortage-playbook: Team/people being multiplied
  "distribution-labor-shortage-playbook": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="20" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M14 44c0-7 4-12 10-12s10 5 10 12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="52" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M14 76c0-7 4-12 10-12s10 5 10 12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M40 32l16 16m0-16l-16 16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="64" cy="24" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="56" cy="40" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="72" cy="40" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="56" cy="56" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="72" cy="56" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="64" cy="72" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>`,

  // distribution-tariff-response-guide: Globe with price arrows
  "distribution-tariff-response-guide": `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="40" r="28" stroke="currentColor" stroke-width="3" fill="none"/>
    <ellipse cx="36" cy="40" rx="12" ry="28" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M8 40h56" stroke="currentColor" stroke-width="2"/>
    <path d="M12 24h48M12 56h48" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
    <path d="M60 20v16l6-6m-6 6l-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M68 44v16l6-6m-6 6l-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="62" y="18" font-size="10" font-weight="bold" fill="currentColor">$</text>
    <text x="70" y="42" font-size="10" font-weight="bold" fill="currentColor">$</text>
  </svg>`,
};

// =============================================================================
// SECTION ICONS - 24x24px icons for h3 headings
// =============================================================================

export const SECTION_ICONS = {
  // time: Clock icon
  time: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M12 6v6l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // cost: Dollar/money icon
  cost: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M12 6v12M9 9c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // process: Flowchart/workflow icon
  process: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="6" height="6" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
    <rect x="16" y="4" width="6" height="6" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
    <rect x="9" y="14" width="6" height="6" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M8 7h8M5 10v7l4 0M19 10v7l-4 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // data: Database/chart icon
  data: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" stroke-width="2" fill="none"/>
  </svg>`,

  // team: People/users icon
  team: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M3 20c0-4 3-6 6-6s6 2 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="17" cy="8" r="2.5" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M21 20c0-3-2-5-4-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  // check: Checkmark/verification icon
  check: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M7 12l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // alert: Warning/attention icon
  alert: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 20h20L12 2z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
    <path d="M12 9v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
  </svg>`,

  // growth: Upward arrow/trend icon
  growth: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 20l6-6 4 4 8-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 4h4v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // security: Lock/shield icon
  security: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6v5c0 5.5 3.4 10.3 8 12 4.6-1.7 8-6.5 8-12V6l-8-4z" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // integration: Connected pieces icon
  integration: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M10 8.5h4c1 0 2 1 2 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 10v4c0 1 1 2 2 2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get hero icon SVG for a guide slug with specified color
 * @param {string} slug - The guide slug
 * @param {string} color - The color to apply (default: #1A9988)
 * @returns {string} SVG string with color applied
 */
export function getHeroIcon(slug, color = '#1A9988') {
  const icon = HERO_ICONS[slug];
  if (!icon) {
    console.warn(`No hero icon found for slug: ${slug}`);
    // Return a default icon (document icon)
    return `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: ${color}">
      <path d="M16 8h32l16 16v48c0 2-2 4-4 4H20c-2 0-4-2-4-4V12c0-2 2-4 4-4z" stroke="currentColor" stroke-width="3" fill="none"/>
      <path d="M48 8v12c0 2 2 4 4 4h12" stroke="currentColor" stroke-width="3" fill="none"/>
      <path d="M24 36h32m-32 10h24m-24 10h28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  }
  return icon.replace('<svg', `<svg style="color: ${color}"`);
}

/**
 * Get section icon SVG with specified color
 * @param {string} name - The section icon name
 * @param {string} color - The color to apply (default: #1A9988)
 * @returns {string} SVG string with color applied
 */
export function getSectionIcon(name, color = '#1A9988') {
  const icon = SECTION_ICONS[name];
  if (!icon) {
    console.warn(`No section icon found for name: ${name}`);
    // Return a default icon (bullet point)
    return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: ${color}">
      <circle cx="12" cy="12" r="6" fill="currentColor"/>
    </svg>`;
  }
  return icon.replace('<svg', `<svg style="color: ${color}"`);
}

// Export all icons for convenience
export default {
  HERO_ICONS,
  SECTION_ICONS,
  getHeroIcon,
  getSectionIcon,
};

/**
 * Industry-specific color themes and patterns for PDF generation
 */

/**
 * Color themes for each industry
 * All industries use Teal #1A9988 as primary with industry-specific accents
 */
export const INDUSTRY_THEMES = {
  legal: {
    primary: '#1A9988',
    accent: '#1E3A5F',
    accentLight: 'rgba(30, 58, 95, 0.1)',
    gradient: 'linear-gradient(135deg, #1A9988 0%, #1E3A5F 100%)',
    gradientLight: 'linear-gradient(135deg, rgba(26, 153, 136, 0.08) 0%, rgba(30, 58, 95, 0.08) 100%)',
  },
  healthcare: {
    primary: '#1A9988',
    accent: '#2563EB',
    accentLight: 'rgba(37, 99, 235, 0.1)',
    gradient: 'linear-gradient(135deg, #1A9988 0%, #2563EB 100%)',
    gradientLight: 'linear-gradient(135deg, rgba(26, 153, 136, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
  },
  manufacturing: {
    primary: '#1A9988',
    accent: '#EA580C',
    accentLight: 'rgba(234, 88, 12, 0.1)',
    gradient: 'linear-gradient(135deg, #1A9988 0%, #EA580C 100%)',
    gradientLight: 'linear-gradient(135deg, rgba(26, 153, 136, 0.08) 0%, rgba(234, 88, 12, 0.08) 100%)',
  },
  cre: {
    primary: '#1A9988',
    accent: '#7C3AED',
    accentLight: 'rgba(124, 58, 237, 0.1)',
    gradient: 'linear-gradient(135deg, #1A9988 0%, #7C3AED 100%)',
    gradientLight: 'linear-gradient(135deg, rgba(26, 153, 136, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
  },
  construction: {
    primary: '#1A9988',
    accent: '#D97706',
    accentLight: 'rgba(217, 119, 6, 0.1)',
    gradient: 'linear-gradient(135deg, #1A9988 0%, #D97706 100%)',
    gradientLight: 'linear-gradient(135deg, rgba(26, 153, 136, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)',
  },
  distribution: {
    primary: '#1A9988',
    accent: '#059669',
    accentLight: 'rgba(5, 150, 105, 0.1)',
    gradient: 'linear-gradient(135deg, #1A9988 0%, #059669 100%)',
    gradientLight: 'linear-gradient(135deg, rgba(26, 153, 136, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%)',
  },
};

/**
 * Maps guide slugs to their respective industries
 */
export const GUIDE_INDUSTRY_MAP = {
  // Legal (7 guides)
  'associate-multiplier': 'legal',
  'partner-succession': 'legal',
  'win-more-pitches': 'legal',
  'last-vendor': 'legal',
  'own-your-ai': 'legal',
  'economics-of-legal-ai': 'legal',
  'simplify-tech-stack': 'legal',

  // Healthcare (5 guides)
  'hipaa-compliant-ai': 'healthcare',
  'institutional-knowledge-healthcare': 'healthcare',
  'document-intelligence-healthcare': 'healthcare',
  'prior-auth-burden': 'healthcare',
  'pe-healthcare-operations': 'healthcare',

  // Manufacturing (8 guides)
  'operational-visibility-playbook': 'manufacturing',
  'lead-scoring-manufacturing': 'manufacturing',
  'manufacturing-ai-privacy': 'manufacturing',
  'data-cleanup-manufacturing': 'manufacturing',
  'do-more-with-fewer-people': 'manufacturing',
  '90-day-data-roadmap': 'manufacturing',
  'supply-chain-visibility-playbook': 'manufacturing',
  'erp-integration-guide': 'manufacturing',

  // CRE (8 guides)
  'entity-resolution-cre': 'cre',
  'data-room-review': 'cre',
  'deal-prioritization': 'cre',
  'portfolio-visibility-cre': 'cre',
  'investor-reporting-cre': 'cre',
  'lease-intelligence-cre': 'cre',
  'debt-maturity-wall': 'cre',
  'cam-reconciliation-guide': 'cre',

  // Construction (3 guides)
  'project-visibility-playbook': 'construction',
  'change-order-recovery': 'construction',
  'construction-post-acquisition': 'construction',

  // Distribution (5 guides)
  'inventory-intelligence-guide': 'distribution',
  'customer-profitability-distribution': 'distribution',
  'pricing-discipline-distribution': 'distribution',
  'distribution-labor-shortage-playbook': 'distribution',
  'distribution-tariff-response-guide': 'distribution',
};

/**
 * Returns an SVG pattern string for the specified industry
 * These patterns are designed for subtle background decoration
 * @param {string} industry - The industry key
 * @returns {string} SVG markup string
 */
export function getGeometricPattern(industry) {
  const theme = INDUSTRY_THEMES[industry];
  if (!theme) {
    return '';
  }

  const patterns = {
    // Legal: Horizontal lines suggesting documents/contracts
    legal: `
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="legal-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="5" y="10" width="50" height="2" fill="${theme.accent}" opacity="0.15"/>
            <rect x="5" y="20" width="40" height="2" fill="${theme.accent}" opacity="0.12"/>
            <rect x="5" y="30" width="45" height="2" fill="${theme.accent}" opacity="0.15"/>
            <rect x="5" y="40" width="35" height="2" fill="${theme.accent}" opacity="0.12"/>
            <rect x="5" y="50" width="50" height="2" fill="${theme.accent}" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="60" height="60" fill="url(#legal-pattern)"/>
      </svg>
    `,

    // Healthcare: Circles and crosses suggesting medical symbols
    healthcare: `
      <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="healthcare-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="15" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <circle cx="40" cy="40" r="8" fill="none" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <rect x="37" y="25" width="6" height="30" fill="${theme.accent}" opacity="0.1"/>
            <rect x="25" y="37" width="30" height="6" fill="${theme.accent}" opacity="0.1"/>
            <circle cx="10" cy="10" r="3" fill="${theme.accent}" opacity="0.08"/>
            <circle cx="70" cy="10" r="3" fill="${theme.accent}" opacity="0.08"/>
            <circle cx="10" cy="70" r="3" fill="${theme.accent}" opacity="0.08"/>
            <circle cx="70" cy="70" r="3" fill="${theme.accent}" opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="80" height="80" fill="url(#healthcare-pattern)"/>
      </svg>
    `,

    // Manufacturing: Interlocking gears/cogs
    manufacturing: `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="manufacturing-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <!-- Large gear -->
            <circle cx="35" cy="35" r="20" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <circle cx="35" cy="35" r="8" fill="none" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <!-- Gear teeth (large) -->
            <rect x="33" y="10" width="4" height="8" fill="${theme.accent}" opacity="0.12"/>
            <rect x="33" y="52" width="4" height="8" fill="${theme.accent}" opacity="0.12"/>
            <rect x="10" y="33" width="8" height="4" fill="${theme.accent}" opacity="0.12"/>
            <rect x="52" y="33" width="8" height="4" fill="${theme.accent}" opacity="0.12"/>
            <!-- Small gear -->
            <circle cx="70" cy="70" r="14" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <circle cx="70" cy="70" r="5" fill="none" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <!-- Gear teeth (small) -->
            <rect x="68" y="52" width="4" height="6" fill="${theme.accent}" opacity="0.12"/>
            <rect x="68" y="82" width="4" height="6" fill="${theme.accent}" opacity="0.12"/>
            <rect x="52" y="68" width="6" height="4" fill="${theme.accent}" opacity="0.12"/>
            <rect x="82" y="68" width="6" height="4" fill="${theme.accent}" opacity="0.12"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#manufacturing-pattern)"/>
      </svg>
    `,

    // CRE: Building/grid patterns suggesting real estate
    cre: `
      <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cre-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <!-- Building outline -->
            <rect x="15" y="20" width="25" height="50" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <!-- Windows -->
            <rect x="20" y="28" width="6" height="8" fill="${theme.accent}" opacity="0.1"/>
            <rect x="29" y="28" width="6" height="8" fill="${theme.accent}" opacity="0.1"/>
            <rect x="20" y="42" width="6" height="8" fill="${theme.accent}" opacity="0.1"/>
            <rect x="29" y="42" width="6" height="8" fill="${theme.accent}" opacity="0.1"/>
            <rect x="20" y="56" width="6" height="8" fill="${theme.accent}" opacity="0.1"/>
            <rect x="29" y="56" width="6" height="8" fill="${theme.accent}" opacity="0.1"/>
            <!-- Second building -->
            <rect x="45" y="35" width="20" height="35" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.1"/>
            <rect x="50" y="42" width="4" height="6" fill="${theme.accent}" opacity="0.08"/>
            <rect x="56" y="42" width="4" height="6" fill="${theme.accent}" opacity="0.08"/>
            <rect x="50" y="54" width="4" height="6" fill="${theme.accent}" opacity="0.08"/>
            <rect x="56" y="54" width="4" height="6" fill="${theme.accent}" opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="80" height="80" fill="url(#cre-pattern)"/>
      </svg>
    `,

    // Construction: Angular/triangular patterns suggesting structures
    construction: `
      <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="construction-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <!-- Main triangle/truss -->
            <polygon points="40,10 70,60 10,60" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <!-- Internal support lines -->
            <line x1="40" y1="10" x2="40" y2="60" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <line x1="25" y1="35" x2="55" y2="35" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <line x1="25" y1="35" x2="40" y2="60" stroke="${theme.accent}" stroke-width="1" opacity="0.08"/>
            <line x1="55" y1="35" x2="40" y2="60" stroke="${theme.accent}" stroke-width="1" opacity="0.08"/>
            <!-- Corner accents -->
            <rect x="5" y="65" width="10" height="10" fill="none" stroke="${theme.accent}" stroke-width="1" opacity="0.08"/>
            <rect x="65" y="65" width="10" height="10" fill="none" stroke="${theme.accent}" stroke-width="1" opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="80" height="80" fill="url(#construction-pattern)"/>
      </svg>
    `,

    // Distribution: Connected nodes/network suggesting supply chain
    distribution: `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="distribution-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <!-- Network nodes -->
            <circle cx="20" cy="20" r="6" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <circle cx="80" cy="20" r="6" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <circle cx="50" cy="50" r="8" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.15"/>
            <circle cx="20" cy="80" r="6" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <circle cx="80" cy="80" r="6" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.12"/>
            <!-- Connection lines -->
            <line x1="26" y1="24" x2="44" y2="44" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <line x1="74" y1="24" x2="56" y2="44" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <line x1="26" y1="76" x2="44" y2="56" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <line x1="74" y1="76" x2="56" y2="56" stroke="${theme.accent}" stroke-width="1" opacity="0.1"/>
            <!-- Horizontal/vertical connections -->
            <line x1="26" y1="20" x2="74" y2="20" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4" opacity="0.08"/>
            <line x1="26" y1="80" x2="74" y2="80" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="4,4" opacity="0.08"/>
            <!-- Center dot -->
            <circle cx="50" cy="50" r="3" fill="${theme.accent}" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#distribution-pattern)"/>
      </svg>
    `,
  };

  return patterns[industry] || '';
}

/**
 * Helper function to get the theme for a given guide slug
 * @param {string} slug - The guide slug
 * @returns {object|null} The theme object or null if not found
 */
export function getThemeForGuide(slug) {
  const industry = GUIDE_INDUSTRY_MAP[slug];
  if (!industry) {
    console.warn(`No industry mapping found for guide: ${slug}`);
    return null;
  }
  return {
    industry,
    ...INDUSTRY_THEMES[industry],
  };
}

/**
 * Enhanced PDF Template for Guide Generation
 *
 * This module exports the HTML/CSS template for PDF generation with
 * industry-specific theming support, geometric patterns, and modern design.
 *
 * @param {Object} options - Template options
 * @param {string} options.title - Guide title
 * @param {string} options.subtitle - Guide subtitle
 * @param {string} options.content - HTML content for the guide body
 * @param {string} options.heroIcon - SVG string for the hero icon (80x80px)
 * @param {string} [options.diagram] - Optional SVG string for main diagram
 * @param {Object} options.theme - Color theme object
 * @param {string} options.theme.primary - Primary brand color (default: #1A9988)
 * @param {string} options.theme.accent - Industry accent color
 * @param {string} options.theme.accentLight - Light version of accent for backgrounds
 * @param {string} options.theme.gradient - CSS gradient string for decorative elements
 * @param {string} options.geometricPattern - SVG pattern string for cover decoration
 * @param {Object} [options.statCallout] - Optional key stat callout
 * @param {string} options.statCallout.number - The stat number (e.g., "31%")
 * @param {string} options.statCallout.label - Short label (e.g., "Higher Success Rate")
 * @param {string} options.statCallout.context - Explanatory context text
 *
 * @returns {string} Complete HTML document string for PDF generation
 */
export function createPdfHtml(options) {
  const {
    title,
    subtitle,
    content,
    heroIcon,
    diagram,
    theme,
    geometricPattern,
    statCallout,
  } = options;

  // Default theme values
  const primaryColor = theme?.primary || '#1A9988';
  const accentColor = theme?.accent || '#1A9988';
  const accentLight = theme?.accentLight || 'rgba(26, 153, 136, 0.05)';
  const gradient = theme?.gradient || 'linear-gradient(135deg, #1A9988 0%, #15786a 100%)';

  // Generate stat callout section if provided
  const statCalloutHtml = statCallout ? `
    <div class="stat-callout">
      <div class="stat-number">${statCallout.number}</div>
      <div class="stat-label">${statCallout.label}</div>
      <div class="stat-context">${statCallout.context}</div>
    </div>
  ` : '';

  // Generate diagram section if provided
  const diagramHtml = diagram ? `
    <div class="diagram-section">
      ${diagram}
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    /* CSS Custom Properties for theming */
    :root {
      --primary: ${primaryColor};
      --accent: ${accentColor};
      --accent-light: ${accentLight};
      --gradient: ${gradient};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @page {
      margin: 0.75in 0.65in;
      @bottom-center {
        content: counter(page);
        font-family: 'Inter', sans-serif;
        font-size: 9pt;
        color: #999;
      }
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 10.5pt;
      line-height: 1.75;
      color: #333;
      max-width: 100%;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ============================================
       COVER PAGE STYLES
       ============================================ */
    .cover {
      height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 60px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }

    /* Gradient accent bar at top */
    .accent-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--gradient);
    }

    /* Geometric pattern decoration */
    .geometric-pattern {
      position: absolute;
      top: 0;
      right: 0;
      width: 400px;
      height: 400px;
      opacity: 0.08;
      pointer-events: none;
    }

    .geometric-pattern svg {
      width: 100%;
      height: 100%;
    }

    .cover-header {
      margin-bottom: auto;
      position: relative;
      z-index: 1;
    }

    .logo {
      font-size: 14pt;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: -0.5px;
    }

    .cover-content {
      margin-bottom: auto;
      position: relative;
      z-index: 1;
    }

    /* Hero icon styling */
    .hero-icon {
      width: 80px;
      height: 80px;
      margin-bottom: 28px;
    }

    .hero-icon svg {
      width: 100%;
      height: 100%;
    }

    .guide-badge {
      display: inline-block;
      background: var(--accent-light);
      color: var(--accent);
      font-size: 8pt;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 28px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .cover h1 {
      font-size: 42pt;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.08;
      margin-bottom: 20px;
      letter-spacing: -1.5px;
    }

    .cover .subtitle {
      font-size: 16pt;
      color: #666;
      font-weight: 400;
      line-height: 1.5;
    }

    .cover-footer {
      padding-top: 24px;
      border-top: 1px solid #eee;
      position: relative;
      z-index: 1;
    }

    .cover-footer-text {
      font-size: 9pt;
      color: #999;
    }

    /* ============================================
       STAT CALLOUT COMPONENT
       ============================================ */
    .stat-callout {
      background: var(--accent-light);
      padding: 32px 40px;
      margin: 40px 0;
      border-radius: 8px;
      text-align: center;
      page-break-inside: avoid;
    }

    .stat-number {
      font-size: 42pt;
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
      margin-bottom: 8px;
      letter-spacing: -1px;
    }

    .stat-label {
      font-size: 14pt;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 12px;
    }

    .stat-context {
      font-size: 10.5pt;
      color: #666;
      max-width: 500px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* ============================================
       DIAGRAM SECTION
       ============================================ */
    .diagram-section {
      margin: 40px 0;
      padding: 24px;
      background: #fafafa;
      border-radius: 8px;
      text-align: center;
      page-break-inside: avoid;
    }

    .diagram-section svg {
      max-width: 100%;
      height: auto;
    }

    /* ============================================
       CONTENT STYLES
       ============================================ */
    .content {
      padding: 0;
    }

    /* H3 headings with accent left border */
    .content h3 {
      font-size: 13pt;
      font-weight: 600;
      color: #1a1a1a;
      margin-top: 36px;
      margin-bottom: 16px;
      letter-spacing: -0.3px;
      padding-top: 24px;
      padding-left: 16px;
      border-top: 1px solid #f0f0f0;
      border-left: 3px solid var(--accent);
      page-break-after: avoid;
    }

    .content h3:first-child {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }

    .content p {
      margin-bottom: 18px;
      color: #444;
    }

    /* First paragraph emphasis */
    .content > p:first-of-type {
      font-size: 11.5pt;
      color: #333;
      line-height: 1.8;
    }

    .content em {
      font-style: italic;
    }

    .content strong {
      font-weight: 600;
      color: #1a1a1a;
    }

    /* Pull quotes - paragraphs containing only em */
    .content p:has(> em:only-child) {
      font-size: 11pt;
      line-height: 1.65;
      color: #333;
      padding: 20px 0 20px 24px;
      margin: 28px 0;
      border-left: 3px solid var(--accent);
      background: transparent;
    }

    /* Key insight boxes - paragraphs starting with strong */
    .content p:has(strong:first-child) {
      background: var(--accent-light);
      padding: 16px 20px;
      border-radius: 6px;
      margin: 24px 0;
      border-left: 3px solid var(--accent);
    }

    /* Lists */
    .content ul, .content ol {
      margin: 20px 0;
      padding-left: 0;
      list-style: none;
    }

    .content li {
      position: relative;
      padding-left: 22px;
      margin-bottom: 12px;
      color: #444;
    }

    .content ul > li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 5px;
      height: 5px;
      background: var(--accent);
      border-radius: 1px;
    }

    .content ol {
      counter-reset: list-counter;
    }

    .content ol > li {
      counter-increment: list-counter;
    }

    .content ol > li::before {
      content: counter(list-counter) ".";
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: 600;
      font-size: 10pt;
    }

    /* Nested lists */
    .content li > ul,
    .content li > ol {
      margin: 10px 0 6px 0;
    }

    /* Section divider */
    .content hr {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #e0e0e0 15%, #e0e0e0 85%, transparent 100%);
      margin: 40px 0;
    }

    .content a {
      color: var(--primary);
      text-decoration: none;
    }

    /* ============================================
       TABLE STYLES
       ============================================ */
    .content table {
      width: 100%;
      margin: 24px 0;
      border-collapse: collapse;
      font-size: 9.5pt;
    }

    .content th {
      text-align: left;
      padding: 12px 14px;
      border-bottom: 2px solid #e0e0e0;
      font-weight: 600;
      color: #1a1a1a;
      background: var(--accent-light);
    }

    .content td {
      padding: 12px 14px;
      border-bottom: 1px solid #f0f0f0;
      color: #555;
    }

    .content tr:last-child td {
      border-bottom: none;
    }

    /* Alternating row colors for better readability */
    .content tr:nth-child(even) td {
      background: #fafafa;
    }

    /* ============================================
       BLOCKQUOTES
       ============================================ */
    .content blockquote {
      margin: 28px 0;
      padding: 20px 24px;
      border-left: 3px solid var(--accent);
      background: var(--accent-light);
      border-radius: 0 6px 6px 0;
    }

    .content blockquote p {
      margin-bottom: 0;
      font-style: italic;
      color: #333;
    }

    /* ============================================
       PRINT STYLES
       ============================================ */
    @media print {
      h3 {
        page-break-after: avoid;
      }
      p, li {
        orphans: 3;
        widows: 3;
      }
      .cover {
        page-break-after: always;
      }
      .stat-callout,
      .diagram-section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover">
    <div class="accent-bar"></div>
    <div class="geometric-pattern">${geometricPattern || ''}</div>

    <div class="cover-header">
      <div class="logo">Databender</div>
    </div>

    <div class="cover-content">
      <div class="hero-icon">${heroIcon || ''}</div>
      <div class="guide-badge">Free Guide</div>
      <h1>${title}</h1>
      <div class="subtitle">${subtitle}</div>
    </div>

    <div class="cover-footer">
      <div class="cover-footer-text">databender.co | Data & AI Consulting for Growing Businesses</div>
    </div>
  </div>

  ${statCalloutHtml}

  ${diagramHtml}

  <!-- Content -->
  <div class="content">
    ${content}
  </div>
</body>
</html>
`;
}

/**
 * Default geometric pattern SVG for cover decoration
 * Can be overridden by passing a custom pattern
 *
 * @param {string} accentColor - The accent color to use in the pattern
 * @returns {string} SVG pattern string
 */
export function createDefaultGeometricPattern(accentColor = '#1A9988') {
  return `
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Concentric circles -->
  <circle cx="200" cy="200" r="180" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.3"/>
  <circle cx="200" cy="200" r="140" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.4"/>
  <circle cx="200" cy="200" r="100" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.5"/>
  <circle cx="200" cy="200" r="60" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.6"/>

  <!-- Diagonal lines -->
  <line x1="0" y1="0" x2="400" y2="400" stroke="${accentColor}" stroke-width="1" opacity="0.2"/>
  <line x1="400" y1="0" x2="0" y2="400" stroke="${accentColor}" stroke-width="1" opacity="0.2"/>
  <line x1="200" y1="0" x2="200" y2="400" stroke="${accentColor}" stroke-width="1" opacity="0.15"/>
  <line x1="0" y1="200" x2="400" y2="200" stroke="${accentColor}" stroke-width="1" opacity="0.15"/>

  <!-- Corner dots -->
  <circle cx="50" cy="50" r="4" fill="${accentColor}" opacity="0.4"/>
  <circle cx="350" cy="50" r="4" fill="${accentColor}" opacity="0.4"/>
  <circle cx="50" cy="350" r="4" fill="${accentColor}" opacity="0.4"/>
  <circle cx="350" cy="350" r="4" fill="${accentColor}" opacity="0.4"/>

  <!-- Scattered smaller circles -->
  <circle cx="100" cy="100" r="2" fill="${accentColor}" opacity="0.3"/>
  <circle cx="300" cy="100" r="2" fill="${accentColor}" opacity="0.3"/>
  <circle cx="100" cy="300" r="2" fill="${accentColor}" opacity="0.3"/>
  <circle cx="300" cy="300" r="2" fill="${accentColor}" opacity="0.3"/>
</svg>
`;
}

/**
 * Industry-specific theme presets
 */
export const industryThemes = {
  legal: {
    primary: '#1A9988',
    accent: '#2563EB', // Blue for legal/professional
    accentLight: 'rgba(37, 99, 235, 0.05)',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
  },
  healthcare: {
    primary: '#1A9988',
    accent: '#059669', // Green for healthcare
    accentLight: 'rgba(5, 150, 105, 0.05)',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  },
  manufacturing: {
    primary: '#1A9988',
    accent: '#D97706', // Orange/amber for manufacturing
    accentLight: 'rgba(217, 119, 6, 0.05)',
    gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
  },
  cre: {
    primary: '#1A9988',
    accent: '#7C3AED', // Purple for commercial real estate
    accentLight: 'rgba(124, 58, 237, 0.05)',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
  },
  construction: {
    primary: '#1A9988',
    accent: '#DC2626', // Red for construction
    accentLight: 'rgba(220, 38, 38, 0.05)',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
  },
  distribution: {
    primary: '#1A9988',
    accent: '#0891B2', // Cyan for distribution/logistics
    accentLight: 'rgba(8, 145, 178, 0.05)',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
  },
  default: {
    primary: '#1A9988',
    accent: '#1A9988', // Teal (DataBender brand)
    accentLight: 'rgba(26, 153, 136, 0.05)',
    gradient: 'linear-gradient(135deg, #1A9988 0%, #15786a 100%)',
  },
};

/**
 * Helper to create a simple document icon SVG
 *
 * @param {string} color - The icon color
 * @returns {string} SVG string
 */
export function createDocumentIcon(color = '#1A9988') {
  return `
<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="12" y="8" width="44" height="56" rx="4" stroke="${color}" stroke-width="2" fill="none"/>
  <path d="M56 8L68 20V68C68 70.2091 66.2091 72 64 72H16C13.7909 72 12 70.2091 12 68V12C12 9.79086 13.7909 8 16 8H56Z" stroke="${color}" stroke-width="2" fill="none"/>
  <path d="M56 8V20H68" stroke="${color}" stroke-width="2" fill="none"/>
  <line x1="24" y1="32" x2="56" y2="32" stroke="${color}" stroke-width="2" opacity="0.5"/>
  <line x1="24" y1="42" x2="56" y2="42" stroke="${color}" stroke-width="2" opacity="0.5"/>
  <line x1="24" y1="52" x2="44" y2="52" stroke="${color}" stroke-width="2" opacity="0.5"/>
</svg>
`;
}

/**
 * Helper to create a chart/analytics icon SVG
 *
 * @param {string} color - The icon color
 * @returns {string} SVG string
 */
export function createChartIcon(color = '#1A9988') {
  return `
<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="64" height="64" rx="8" stroke="${color}" stroke-width="2" fill="none"/>
  <rect x="16" y="44" width="10" height="20" rx="2" fill="${color}" opacity="0.3"/>
  <rect x="30" y="32" width="10" height="32" rx="2" fill="${color}" opacity="0.5"/>
  <rect x="44" y="20" width="10" height="44" rx="2" fill="${color}" opacity="0.7"/>
  <rect x="58" y="28" width="10" height="36" rx="2" fill="${color}" opacity="0.9"/>
</svg>
`;
}

/**
 * Helper to create a process/workflow icon SVG
 *
 * @param {string} color - The icon color
 * @returns {string} SVG string
 */
export function createProcessIcon(color = '#1A9988') {
  return `
<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="40" r="12" stroke="${color}" stroke-width="2" fill="none"/>
  <circle cx="60" cy="20" r="10" stroke="${color}" stroke-width="2" fill="none"/>
  <circle cx="60" cy="60" r="10" stroke="${color}" stroke-width="2" fill="none"/>
  <line x1="32" y1="34" x2="48" y2="24" stroke="${color}" stroke-width="2"/>
  <line x1="32" y1="46" x2="48" y2="56" stroke="${color}" stroke-width="2"/>
  <circle cx="20" cy="40" r="4" fill="${color}" opacity="0.5"/>
  <circle cx="60" cy="20" r="4" fill="${color}" opacity="0.5"/>
  <circle cx="60" cy="60" r="4" fill="${color}" opacity="0.5"/>
</svg>
`;
}

export default {
  createPdfHtml,
  createDefaultGeometricPattern,
  industryThemes,
  createDocumentIcon,
  createChartIcon,
  createProcessIcon,
};

/**
 * Legal Industry Diagrams for PDF Generation
 *
 * SVG diagrams for legal industry guide PDFs.
 * All diagrams are 600px wide x 300px tall and use currentColor for theming.
 *
 * Usage:
 *   import { getLegalDiagram, LEGAL_DIAGRAMS } from './diagrams-legal.mjs';
 *   const svg = getLegalDiagram('associate-multiplier');
 */

// =============================================================================
// LEGAL INDUSTRY DIAGRAMS
// =============================================================================

export const LEGAL_DIAGRAMS = {
  // ---------------------------------------------------------------------------
  // associate-multiplier: Before/After time comparison showing productivity gains
  // ---------------------------------------------------------------------------
  'associate-multiplier': `
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="300" y="28" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Associate Productivity: Before vs. After AI</text>

  <!-- BEFORE Section -->
  <text x="150" y="60" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.7">BEFORE</text>

  <!-- Before time blocks (8 hours = 100% width of section) -->
  <rect x="30" y="75" width="240" height="35" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>

  <!-- Research block (40%) -->
  <rect x="32" y="77" width="94" height="31" rx="3" fill="currentColor" opacity="0.25"/>
  <text x="79" y="97" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Research</text>
  <text x="79" y="107" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">3.2 hrs</text>

  <!-- Drafting block (35%) -->
  <rect x="128" y="77" width="82" height="31" rx="3" fill="currentColor" opacity="0.35"/>
  <text x="169" y="97" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Drafting</text>
  <text x="169" y="107" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">2.8 hrs</text>

  <!-- Review block (25%) -->
  <rect x="212" y="77" width="56" height="31" rx="3" fill="currentColor" opacity="0.45"/>
  <text x="240" y="97" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Review</text>
  <text x="240" y="107" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">2.0 hrs</text>

  <!-- Before total -->
  <text x="150" y="135" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" fill="currentColor" text-anchor="middle">Total: 8 hours per matter</text>

  <!-- Arrow -->
  <path d="M300 100 L320 100" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M315 95 L325 100 L315 105" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- AFTER Section -->
  <text x="450" y="60" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.7">AFTER</text>

  <!-- After time blocks (reduced) -->
  <rect x="330" y="75" width="240" height="35" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>

  <!-- Research block (reduced to 15%) -->
  <rect x="332" y="77" width="35" height="31" rx="3" fill="currentColor" opacity="0.6"/>
  <text x="349" y="97" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">AI</text>
  <text x="349" y="107" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">0.8h</text>

  <!-- Drafting block (reduced to 20%) -->
  <rect x="369" y="77" width="47" height="31" rx="3" fill="currentColor" opacity="0.7"/>
  <text x="392" y="97" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Draft</text>
  <text x="392" y="107" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">1.0h</text>

  <!-- Review block (same 25%) -->
  <rect x="418" y="77" width="56" height="31" rx="3" fill="currentColor" opacity="0.8"/>
  <text x="446" y="97" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Review</text>
  <text x="446" y="107" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">1.5h</text>

  <!-- Free capacity indicator -->
  <rect x="476" y="77" width="92" height="31" rx="3" stroke="currentColor" stroke-width="1" stroke-dasharray="4 2" fill="none" opacity="0.4"/>
  <text x="522" y="97" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Free Capacity</text>
  <text x="522" y="107" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">+4.7 hrs</text>

  <!-- After total -->
  <text x="450" y="135" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" fill="currentColor" text-anchor="middle">Total: 3.3 hours per matter</text>

  <!-- Productivity Multiplier Callout -->
  <rect x="200" y="160" width="200" height="60" rx="8" fill="currentColor" opacity="0.08"/>
  <rect x="200" y="160" width="200" height="60" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
  <text x="300" y="188" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="700" fill="currentColor" text-anchor="middle">2.4x</text>
  <text x="300" y="208" font-family="Inter, system-ui, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.7">Productivity Multiplier</text>

  <!-- Bottom metrics -->
  <g transform="translate(75, 240)">
    <rect width="120" height="45" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.2"/>
    <text x="60" y="20" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">59%</text>
    <text x="60" y="35" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Time Saved</text>
  </g>

  <g transform="translate(240, 240)">
    <rect width="120" height="45" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.2"/>
    <text x="60" y="20" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">+140%</text>
    <text x="60" y="35" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">More Matters</text>
  </g>

  <g transform="translate(405, 240)">
    <rect width="120" height="45" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.2"/>
    <text x="60" y="20" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">+$180K</text>
    <text x="60" y="35" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Revenue/Assoc/Yr</text>
  </g>
</svg>`,

  // ---------------------------------------------------------------------------
  // partner-succession: Knowledge capture flowchart showing senior to junior transfer
  // ---------------------------------------------------------------------------
  'partner-succession': `
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="300" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Knowledge Transfer Pipeline</text>

  <!-- Senior Partner Node -->
  <g transform="translate(40, 50)">
    <circle cx="45" cy="45" r="40" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="45" cy="35" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M25 65 C25 52 45 48 45 48 C45 48 65 52 65 65" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <text x="45" y="105" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="500" fill="currentColor" text-anchor="middle">Senior Partner</text>
    <text x="45" y="118" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">30+ years experience</text>
  </g>

  <!-- Knowledge Extraction -->
  <path d="M130 95 L175 95" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
  <path d="M170 90 L180 95 L170 100" stroke="currentColor" stroke-width="1.5" fill="none"/>

  <!-- AI Processing Center -->
  <g transform="translate(185, 55)">
    <rect width="100" height="80" rx="8" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.05"/>
    <text x="50" y="25" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">AI System</text>

    <!-- Brain/processing icon -->
    <circle cx="50" cy="50" r="18" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
    <path d="M42 45 Q50 38 58 45 M42 55 Q50 62 58 55" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <circle cx="45" cy="50" r="3" fill="currentColor" opacity="0.5"/>
    <circle cx="55" cy="50" r="3" fill="currentColor" opacity="0.5"/>

    <text x="50" y="85" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Captures & Structures</text>
  </g>

  <!-- Knowledge outputs -->
  <path d="M290 75 L330 55" stroke="currentColor" stroke-width="1.5"/>
  <path d="M290 95 L330 95" stroke="currentColor" stroke-width="1.5"/>
  <path d="M290 115 L330 135" stroke="currentColor" stroke-width="1.5"/>

  <!-- Knowledge types -->
  <g transform="translate(335, 35)">
    <rect width="90" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/>
    <text x="45" y="15" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="500" fill="currentColor" text-anchor="middle">Client History</text>
    <text x="45" y="27" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Relationships & Context</text>
  </g>

  <g transform="translate(335, 78)">
    <rect width="90" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.12"/>
    <text x="45" y="15" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="500" fill="currentColor" text-anchor="middle">Deal Patterns</text>
    <text x="45" y="27" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Strategies & Outcomes</text>
  </g>

  <g transform="translate(335, 121)">
    <rect width="90" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.16"/>
    <text x="45" y="15" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="500" fill="currentColor" text-anchor="middle">Judgment Calls</text>
    <text x="45" y="27" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Decision Frameworks</text>
  </g>

  <!-- Distribution arrows -->
  <path d="M430 55 L470 75" stroke="currentColor" stroke-width="1.5"/>
  <path d="M430 95 L470 95" stroke="currentColor" stroke-width="1.5"/>
  <path d="M430 135 L470 115" stroke="currentColor" stroke-width="1.5"/>

  <!-- Junior Associates -->
  <g transform="translate(475, 55)">
    <rect width="100" height="85" rx="8" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.05"/>
    <text x="50" y="20" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Team Access</text>

    <!-- Multiple person icons -->
    <circle cx="30" cy="45" r="8" stroke="currentColor" stroke-width="1" fill="none"/>
    <circle cx="50" cy="45" r="8" stroke="currentColor" stroke-width="1" fill="none"/>
    <circle cx="70" cy="45" r="8" stroke="currentColor" stroke-width="1" fill="none"/>

    <path d="M22 60 Q30 55 38 60" stroke="currentColor" stroke-width="1" fill="none"/>
    <path d="M42 60 Q50 55 58 60" stroke="currentColor" stroke-width="1" fill="none"/>
    <path d="M62 60 Q70 55 78 60" stroke="currentColor" stroke-width="1" fill="none"/>

    <text x="50" y="78" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Instant access to</text>
    <text x="50" y="88" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">institutional knowledge</text>
  </g>

  <!-- Bottom metrics section -->
  <g transform="translate(40, 180)">
    <rect width="520" height="105" rx="8" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.03"/>

    <text x="260" y="25" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Succession Readiness Impact</text>

    <!-- Metric boxes -->
    <g transform="translate(25, 40)">
      <rect width="110" height="50" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
      <text x="55" y="22" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="currentColor" text-anchor="middle">85%</text>
      <text x="55" y="38" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Knowledge Retained</text>
    </g>

    <g transform="translate(155, 40)">
      <rect width="110" height="50" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
      <text x="55" y="22" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="currentColor" text-anchor="middle">60%</text>
      <text x="55" y="38" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Faster Onboarding</text>
    </g>

    <g transform="translate(285, 40)">
      <rect width="110" height="50" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
      <text x="55" y="22" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="currentColor" text-anchor="middle">90%</text>
      <text x="55" y="38" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Client Retention</text>
    </g>

    <g transform="translate(415, 40)">
      <rect width="80" height="50" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
      <text x="40" y="22" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="currentColor" text-anchor="middle">3x</text>
      <text x="40" y="38" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">ROI Year 1</text>
    </g>
  </g>
</svg>`,

  // ---------------------------------------------------------------------------
  // win-more-pitches: Pitch prep timeline diagram
  // ---------------------------------------------------------------------------
  'win-more-pitches': `
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="300" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">AI-Powered Pitch Preparation Timeline</text>

  <!-- Timeline base -->
  <line x1="60" y1="130" x2="540" y2="130" stroke="currentColor" stroke-width="2" opacity="0.3"/>

  <!-- Time markers -->
  <text x="60" y="155" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.5">Day 1</text>
  <text x="180" y="155" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.5">Day 2</text>
  <text x="300" y="155" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.5">Day 3</text>
  <text x="420" y="155" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.5">Day 4</text>
  <text x="540" y="155" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.5">Pitch</text>

  <!-- Tick marks -->
  <line x1="60" y1="125" x2="60" y2="135" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <line x1="180" y1="125" x2="180" y2="135" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <line x1="300" y1="125" x2="300" y2="135" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <line x1="420" y1="125" x2="420" y2="135" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <line x1="540" y1="125" x2="540" y2="135" stroke="currentColor" stroke-width="2" opacity="0.4"/>

  <!-- Stage 1: Prospect Research -->
  <g transform="translate(40, 45)">
    <rect width="100" height="65" rx="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/>
    <circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <text x="20" y="24" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">1</text>
    <text x="58" y="18" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Prospect</text>
    <text x="58" y="29" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Research</text>
    <text x="10" y="48" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">AI scans news, filings,</text>
    <text x="10" y="58" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">and social in 30 min</text>
  </g>

  <!-- Connector -->
  <path d="M145 95 L160 95 L160 130" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.4"/>

  <!-- Stage 2: Competitive Intel -->
  <g transform="translate(160, 45)">
    <rect width="100" height="65" rx="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.12"/>
    <circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <text x="20" y="24" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">2</text>
    <text x="58" y="18" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Competitive</text>
    <text x="58" y="29" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Analysis</text>
    <text x="10" y="48" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">Map incumbent firms,</text>
    <text x="10" y="58" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">find differentiation</text>
  </g>

  <!-- Connector -->
  <path d="M265 95 L280 95 L280 130" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.4"/>

  <!-- Stage 3: Case Studies -->
  <g transform="translate(280, 45)">
    <rect width="100" height="65" rx="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.16"/>
    <circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <text x="20" y="24" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">3</text>
    <text x="58" y="18" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Relevant</text>
    <text x="58" y="29" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Experience</text>
    <text x="10" y="48" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">Auto-match similar</text>
    <text x="10" y="58" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">matters from history</text>
  </g>

  <!-- Connector -->
  <path d="M385 95 L400 95 L400 130" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.4"/>

  <!-- Stage 4: Presentation -->
  <g transform="translate(400, 45)">
    <rect width="100" height="65" rx="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.2"/>
    <circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <text x="20" y="24" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">4</text>
    <text x="58" y="18" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Materials</text>
    <text x="58" y="29" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="start">Generation</text>
    <text x="10" y="48" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">Draft deck, bios,</text>
    <text x="10" y="58" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" opacity="0.7">and talking points</text>
  </g>

  <!-- Connector to pitch -->
  <path d="M505 95 L520 95 L520 130" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.4"/>

  <!-- Pitch star/target -->
  <g transform="translate(520, 100)">
    <circle cx="20" cy="30" r="20" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
    <polygon points="20,15 23,25 34,25 25,32 28,42 20,36 12,42 15,32 6,25 17,25" fill="currentColor" opacity="0.6"/>
  </g>

  <!-- Comparison section -->
  <g transform="translate(60, 175)">
    <rect width="220" height="100" rx="8" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.03"/>
    <text x="110" y="22" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.6">Traditional Approach</text>

    <text x="20" y="45" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" opacity="0.7">Research time:</text>
    <text x="200" y="45" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="end">8-12 hours</text>

    <text x="20" y="62" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" opacity="0.7">Prep lead time:</text>
    <text x="200" y="62" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="end">2 weeks</text>

    <text x="20" y="79" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" opacity="0.7">Win rate:</text>
    <text x="200" y="79" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="end">~25%</text>
  </g>

  <g transform="translate(320, 175)">
    <rect width="220" height="100" rx="8" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/>
    <text x="110" y="22" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">AI-Assisted Approach</text>

    <text x="20" y="45" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" opacity="0.7">Research time:</text>
    <text x="200" y="45" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="end">2 hours</text>

    <text x="20" y="62" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" opacity="0.7">Prep lead time:</text>
    <text x="200" y="62" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="end">4 days</text>

    <text x="20" y="79" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" opacity="0.7">Win rate:</text>
    <text x="200" y="79" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="end">~38%</text>
  </g>
</svg>`,

  // ---------------------------------------------------------------------------
  // last-vendor: Vendor consolidation diagram (many vendors to one)
  // ---------------------------------------------------------------------------
  'last-vendor': `
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="300" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Vendor Consolidation: From Fragmentation to Integration</text>

  <!-- BEFORE Section - Multiple vendors -->
  <text x="130" y="52" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.6">CURRENT STATE</text>

  <!-- Vendor boxes (fragmented) -->
  <g transform="translate(30, 65)">
    <rect width="70" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/>
    <text x="35" y="18" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="currentColor" text-anchor="middle">Doc Mgmt</text>
    <text x="35" y="30" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">$45K/yr</text>
    <text x="35" y="40" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Vendor A</text>
  </g>

  <g transform="translate(110, 65)">
    <rect width="70" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.12"/>
    <text x="35" y="18" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="currentColor" text-anchor="middle">E-Discovery</text>
    <text x="35" y="30" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">$65K/yr</text>
    <text x="35" y="40" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Vendor B</text>
  </g>

  <g transform="translate(30, 120)">
    <rect width="70" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/>
    <text x="35" y="18" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="currentColor" text-anchor="middle">Contract AI</text>
    <text x="35" y="30" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">$38K/yr</text>
    <text x="35" y="40" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Vendor C</text>
  </g>

  <g transform="translate(110, 120)">
    <rect width="70" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.14"/>
    <text x="35" y="18" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="currentColor" text-anchor="middle">Research</text>
    <text x="35" y="30" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">$52K/yr</text>
    <text x="35" y="40" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Vendor D</text>
  </g>

  <g transform="translate(30, 175)">
    <rect width="70" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.06"/>
    <text x="35" y="18" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="currentColor" text-anchor="middle">Analytics</text>
    <text x="35" y="30" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">$28K/yr</text>
    <text x="35" y="40" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Vendor E</text>
  </g>

  <g transform="translate(110, 175)">
    <rect width="70" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.16"/>
    <text x="35" y="18" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="currentColor" text-anchor="middle">Billing</text>
    <text x="35" y="30" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">$22K/yr</text>
    <text x="35" y="40" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Vendor F</text>
  </g>

  <!-- Problems callout -->
  <g transform="translate(30, 235)">
    <text x="75" y="12" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">6 vendors | 6 contracts | 6 logins</text>
    <text x="75" y="24" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">$250K/year total</text>
  </g>

  <!-- Consolidation arrow -->
  <g transform="translate(205, 130)">
    <line x1="0" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="2"/>
    <polygon points="70,20 60,14 60,26" fill="currentColor"/>
    <text x="35" y="8" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Consolidate</text>
  </g>

  <!-- AFTER Section - Unified Platform -->
  <text x="430" y="52" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.6">FUTURE STATE</text>

  <!-- Unified platform -->
  <g transform="translate(300, 65)">
    <rect width="260" height="165" rx="10" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.05"/>

    <!-- Platform header -->
    <rect x="0" y="0" width="260" height="35" rx="10" fill="currentColor" fill-opacity="0.1"/>
    <rect x="0" y="25" width="260" height="10" fill="currentColor" fill-opacity="0.1"/>
    <text x="130" y="23" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Unified AI Platform</text>

    <!-- Modules grid -->
    <g transform="translate(15, 45)">
      <rect width="70" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/>
      <text x="35" y="22" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Documents</text>
    </g>

    <g transform="translate(95, 45)">
      <rect width="70" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/>
      <text x="35" y="22" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Discovery</text>
    </g>

    <g transform="translate(175, 45)">
      <rect width="70" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/>
      <text x="35" y="22" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Contracts</text>
    </g>

    <g transform="translate(15, 90)">
      <rect width="70" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/>
      <text x="35" y="22" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Research</text>
    </g>

    <g transform="translate(95, 90)">
      <rect width="70" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/>
      <text x="35" y="22" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Analytics</text>
    </g>

    <g transform="translate(175, 90)">
      <rect width="70" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/>
      <text x="35" y="22" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Billing</text>
    </g>

    <!-- Shared AI core indicator -->
    <circle cx="130" cy="145" r="12" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.15"/>
    <text x="130" y="149" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">AI</text>
  </g>

  <!-- Benefits callout -->
  <g transform="translate(300, 240)">
    <text x="130" y="12" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">1 vendor | 1 contract | 1 login</text>
    <text x="130" y="26" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">$120K/year (52% savings)</text>
  </g>

  <!-- Bottom comparison -->
  <g transform="translate(180, 272)">
    <rect width="240" height="22" rx="4" fill="currentColor" fill-opacity="0.08"/>
    <text x="120" y="15" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="500" fill="currentColor" text-anchor="middle">Annual Savings: $130,000+</text>
  </g>
</svg>`,

  // ---------------------------------------------------------------------------
  // own-your-ai: Cost comparison over 5 years (build vs buy)
  // ---------------------------------------------------------------------------
  'own-your-ai': `
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="300" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">5-Year Total Cost of Ownership: Build vs. Buy</text>

  <!-- Y-axis -->
  <line x1="70" y1="50" x2="70" y2="220" stroke="currentColor" stroke-width="1" opacity="0.3"/>
  <text x="55" y="55" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$1.5M</text>
  <text x="55" y="95" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$1.0M</text>
  <text x="55" y="135" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$0.5M</text>
  <text x="55" y="220" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$0</text>

  <!-- Gridlines -->
  <line x1="70" y1="55" x2="540" y2="55" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
  <line x1="70" y1="95" x2="540" y2="95" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
  <line x1="70" y1="135" x2="540" y2="135" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
  <line x1="70" y1="175" x2="540" y2="175" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>

  <!-- X-axis -->
  <line x1="70" y1="220" x2="540" y2="220" stroke="currentColor" stroke-width="1" opacity="0.3"/>
  <text x="120" y="238" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Year 1</text>
  <text x="214" y="238" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Year 2</text>
  <text x="308" y="238" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Year 3</text>
  <text x="402" y="238" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Year 4</text>
  <text x="496" y="238" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Year 5</text>

  <!-- SaaS/Buy line (higher, steeper) -->
  <path d="M120 190 L214 150 L308 110 L402 70 L496 30" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
  <circle cx="120" cy="190" r="4" fill="currentColor" opacity="0.4"/>
  <circle cx="214" cy="150" r="4" fill="currentColor" opacity="0.4"/>
  <circle cx="308" cy="110" r="4" fill="currentColor" opacity="0.4"/>
  <circle cx="402" cy="70" r="4" fill="currentColor" opacity="0.4"/>
  <circle cx="496" cy="30" r="4" fill="currentColor" opacity="0.4"/>

  <!-- Build/Own line (lower after year 1) -->
  <path d="M120 130 L214 150 L308 155 L402 160 L496 165" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="120" cy="130" r="5" fill="currentColor"/>
  <circle cx="214" cy="150" r="5" fill="currentColor"/>
  <circle cx="308" cy="155" r="5" fill="currentColor"/>
  <circle cx="402" cy="160" r="5" fill="currentColor"/>
  <circle cx="496" cy="165" r="5" fill="currentColor"/>

  <!-- Crossover indicator -->
  <line x1="214" y1="150" x2="214" y2="225" stroke="currentColor" stroke-width="1" stroke-dasharray="4 2" opacity="0.3"/>
  <text x="214" y="250" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Breakeven</text>

  <!-- Legend -->
  <g transform="translate(90, 255)">
    <line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="10" cy="8" r="3" fill="currentColor"/>
    <text x="28" y="12" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor">Build (Own Your AI)</text>
  </g>

  <g transform="translate(250, 255)">
    <line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" stroke-width="2.5" opacity="0.4"/>
    <circle cx="10" cy="8" r="3" fill="currentColor" opacity="0.4"/>
    <text x="28" y="12" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" opacity="0.8">Buy (SaaS Subscriptions)</text>
  </g>

  <!-- Cost breakdown side panel -->
  <g transform="translate(420, 250)">
    <rect width="170" height="40" rx="4" fill="currentColor" fill-opacity="0.08"/>
    <text x="85" y="16" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">5-Year Savings</text>
    <text x="85" y="32" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle">$680,000+</text>
  </g>

  <!-- Annotations -->
  <g transform="translate(85, 125)">
    <rect width="75" height="30" rx="3" fill="currentColor" fill-opacity="0.1"/>
    <text x="37" y="13" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Build: Higher</text>
    <text x="37" y="23" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">upfront cost</text>
  </g>

  <g transform="translate(450, 50)">
    <rect width="85" height="30" rx="3" fill="currentColor" fill-opacity="0.1"/>
    <text x="42" y="13" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Buy: Recurring</text>
    <text x="42" y="23" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">fees compound</text>
  </g>

  <!-- Year 5 cost labels -->
  <text x="510" y="25" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" opacity="0.6">$1.48M</text>
  <text x="510" y="160" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor">$800K</text>
</svg>`,

  // ---------------------------------------------------------------------------
  // economics-of-legal-ai: Price drop timeline showing AI cost reduction
  // ---------------------------------------------------------------------------
  'economics-of-legal-ai': `
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="300" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">The Economics of AI: Rapidly Declining Costs</text>

  <!-- Y-axis label -->
  <text x="20" y="135" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" transform="rotate(-90, 20, 135)" opacity="0.7">Cost per 1M tokens ($)</text>

  <!-- Y-axis -->
  <line x1="70" y1="50" x2="70" y2="220" stroke="currentColor" stroke-width="1" opacity="0.3"/>
  <text x="60" y="55" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$60</text>
  <text x="60" y="95" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$40</text>
  <text x="60" y="135" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$20</text>
  <text x="60" y="175" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$10</text>
  <text x="60" y="215" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="end" opacity="0.6">$0</text>

  <!-- Gridlines -->
  <line x1="70" y1="55" x2="540" y2="55" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
  <line x1="70" y1="95" x2="540" y2="95" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
  <line x1="70" y1="135" x2="540" y2="135" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
  <line x1="70" y1="175" x2="540" y2="175" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>

  <!-- X-axis -->
  <line x1="70" y1="220" x2="540" y2="220" stroke="currentColor" stroke-width="1" opacity="0.3"/>
  <text x="100" y="238" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">2022</text>
  <text x="210" y="238" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">2023</text>
  <text x="320" y="238" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">2024</text>
  <text x="430" y="238" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">2025</text>
  <text x="520" y="238" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">2026</text>

  <!-- Declining cost curve (exponential decay) -->
  <path d="M100 60 Q150 85 210 140 Q270 175 320 195 Q380 205 430 208 Q480 210 520 211" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>

  <!-- Cost markers with annotations -->
  <g transform="translate(100, 50)">
    <circle cx="0" cy="10" r="6" fill="currentColor"/>
    <rect x="8" y="-2" width="55" height="24" rx="3" fill="currentColor" fill-opacity="0.1"/>
    <text x="35" y="10" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">$60</text>
    <text x="35" y="20" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">GPT-4 launch</text>
  </g>

  <g transform="translate(210, 130)">
    <circle cx="0" cy="10" r="5" fill="currentColor" opacity="0.8"/>
    <rect x="8" y="-2" width="55" height="24" rx="3" fill="currentColor" fill-opacity="0.08"/>
    <text x="35" y="10" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">$20</text>
    <text x="35" y="20" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">Competition</text>
  </g>

  <g transform="translate(320, 185)">
    <circle cx="0" cy="10" r="5" fill="currentColor" opacity="0.8"/>
    <rect x="8" y="-2" width="55" height="24" rx="3" fill="currentColor" fill-opacity="0.08"/>
    <text x="35" y="10" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">$5</text>
    <text x="35" y="20" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">Open source</text>
  </g>

  <g transform="translate(430, 198)">
    <circle cx="0" cy="10" r="5" fill="currentColor" opacity="0.8"/>
    <rect x="8" y="-2" width="55" height="24" rx="3" fill="currentColor" fill-opacity="0.08"/>
    <text x="35" y="10" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">$2</text>
    <text x="35" y="20" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">Optimization</text>
  </g>

  <g transform="translate(520, 201)">
    <circle cx="0" cy="10" r="6" fill="currentColor"/>
    <rect x="-55" y="-2" width="50" height="24" rx="3" fill="currentColor" fill-opacity="0.1"/>
    <text x="-30" y="10" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">$0.50</text>
    <text x="-30" y="20" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">Today</text>
  </g>

  <!-- Cost reduction arrow -->
  <g transform="translate(85, 248)">
    <path d="M0 10 L400 10" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.3"/>
    <polygon points="400,10 390,5 390,15" fill="currentColor" opacity="0.3"/>
    <text x="200" y="28" font-family="Inter, system-ui, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">99% cost reduction in 4 years</text>
  </g>

  <!-- Key insight box -->
  <g transform="translate(400, 55)">
    <rect width="135" height="65" rx="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
    <text x="67" y="18" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">What This Means</text>
    <text x="67" y="35" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">A doc review that cost</text>
    <text x="67" y="47" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">$6,000 in 2022 now</text>
    <text x="67" y="59" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">costs $50</text>
  </g>
</svg>`,

  // ---------------------------------------------------------------------------
  // simplify-tech-stack: Fragmented to Unified diagram
  // ---------------------------------------------------------------------------
  'simplify-tech-stack': `
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="300" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Tech Stack Simplification: From Chaos to Clarity</text>

  <!-- BEFORE - Fragmented -->
  <text x="140" y="50" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.6">FRAGMENTED</text>

  <!-- Scattered disconnected boxes -->
  <g transform="translate(40, 60)">
    <!-- Random scattered tools -->
    <rect x="0" y="0" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.06" transform="rotate(-8)"/>
    <text x="25" y="18" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(-8)">CRM</text>

    <rect x="70" y="15" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08" transform="rotate(5)"/>
    <text x="95" y="33" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(5)">Billing</text>

    <rect x="140" y="-5" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.1" transform="rotate(-3)"/>
    <text x="165" y="12" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(-3)">DMS</text>

    <rect x="20" y="55" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.12" transform="rotate(7)"/>
    <text x="45" y="73" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(7)">Email</text>

    <rect x="90" y="70" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08" transform="rotate(-6)"/>
    <text x="115" y="87" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(-6)">Calendar</text>

    <rect x="150" y="50" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.14" transform="rotate(4)"/>
    <text x="175" y="67" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(4)">Research</text>

    <rect x="5" y="110" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.06" transform="rotate(-4)"/>
    <text x="30" y="127" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(-4)">E-Sign</text>

    <rect x="75" y="120" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.1" transform="rotate(6)"/>
    <text x="100" y="137" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(6)">Analytics</text>

    <rect x="145" y="105" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08" transform="rotate(-5)"/>
    <text x="170" y="122" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" transform="rotate(-5)">Intake</text>

    <!-- Tangled connection lines -->
    <path d="M50 15 Q60 45 70 30" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
    <path d="M120 30 Q130 20 150 10" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
    <path d="M45 55 Q65 60 90 70" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
    <path d="M140 65 Q115 90 115 105" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
    <path d="M70 85 Q50 95 55 110" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
    <path d="M175 80 Q175 95 170 105" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
  </g>

  <!-- Problems list -->
  <g transform="translate(40, 210)">
    <text x="0" y="0" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" opacity="0.6">9 disconnected systems</text>
    <text x="0" y="14" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" opacity="0.6">Manual data re-entry</text>
    <text x="0" y="28" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" opacity="0.6">No single source of truth</text>
  </g>

  <!-- Transformation arrow -->
  <g transform="translate(255, 120)">
    <rect width="90" height="40" rx="20" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
    <text x="45" y="18" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="500" fill="currentColor" text-anchor="middle">Simplify</text>
    <path d="M35 28 L55 28" stroke="currentColor" stroke-width="1.5"/>
    <polygon points="55,28 50,24 50,32" fill="currentColor"/>
  </g>

  <!-- AFTER - Unified -->
  <text x="460" y="50" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.6">UNIFIED</text>

  <!-- Clean unified platform -->
  <g transform="translate(360, 60)">
    <!-- Central hub -->
    <circle cx="100" cy="75" r="65" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.03"/>
    <circle cx="100" cy="75" r="45" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
    <circle cx="100" cy="75" r="25" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/>

    <!-- Core label -->
    <text x="100" y="72" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Unified</text>
    <text x="100" y="84" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Platform</text>

    <!-- Integrated modules on the ring -->
    <g transform="translate(100, 10)">
      <circle cx="0" cy="0" r="12" fill="currentColor" fill-opacity="0.15"/>
      <text x="0" y="4" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle">Docs</text>
    </g>

    <g transform="translate(155, 40)">
      <circle cx="0" cy="0" r="12" fill="currentColor" fill-opacity="0.15"/>
      <text x="0" y="4" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle">CRM</text>
    </g>

    <g transform="translate(165, 90)">
      <circle cx="0" cy="0" r="12" fill="currentColor" fill-opacity="0.15"/>
      <text x="0" y="4" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle">Bills</text>
    </g>

    <g transform="translate(140, 135)">
      <circle cx="0" cy="0" r="12" fill="currentColor" fill-opacity="0.15"/>
      <text x="0" y="4" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle">Time</text>
    </g>

    <g transform="translate(60, 135)">
      <circle cx="0" cy="0" r="12" fill="currentColor" fill-opacity="0.15"/>
      <text x="0" y="4" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle">Cal</text>
    </g>

    <g transform="translate(35, 90)">
      <circle cx="0" cy="0" r="12" fill="currentColor" fill-opacity="0.15"/>
      <text x="0" y="4" font-family="Inter, system-ui, sans-serif" font-size="6" fill="currentColor" text-anchor="middle">Email</text>
    </g>

    <g transform="translate(45, 40)">
      <circle cx="0" cy="0" r="12" fill="currentColor" fill-opacity="0.15"/>
      <text x="0" y="3" font-family="Inter, system-ui, sans-serif" font-size="5" fill="currentColor" text-anchor="middle">Research</text>
    </g>

    <!-- Connection lines from hub to modules -->
    <line x1="100" y1="50" x2="100" y2="22" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    <line x1="125" y1="55" x2="145" y2="40" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    <line x1="140" y1="85" x2="153" y2="88" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    <line x1="125" y1="105" x2="135" y2="125" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    <line x1="75" y1="105" x2="65" y2="125" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    <line x1="60" y1="85" x2="47" y2="88" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    <line x1="75" y1="55" x2="55" y2="45" stroke="currentColor" stroke-width="1" opacity="0.3"/>
  </g>

  <!-- Benefits list -->
  <g transform="translate(360, 210)">
    <text x="100" y="0" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Single login, unified data</text>
    <text x="100" y="14" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Automated workflows</text>
    <text x="100" y="28" font-family="Inter, system-ui, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Real-time insights</text>
  </g>

  <!-- Bottom comparison metrics -->
  <g transform="translate(100, 260)">
    <rect width="100" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.05"/>
    <text x="50" y="14" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">70%</text>
    <text x="50" y="25" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Less admin time</text>
  </g>

  <g transform="translate(250, 260)">
    <rect width="100" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.05"/>
    <text x="50" y="14" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">40%</text>
    <text x="50" y="25" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Cost reduction</text>
  </g>

  <g transform="translate(400, 260)">
    <rect width="100" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.05"/>
    <text x="50" y="14" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">1</text>
    <text x="50" y="25" font-family="Inter, system-ui, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Vendor to manage</text>
  </g>
</svg>`,
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a Legal industry diagram SVG by guide slug
 * @param {string} slug - The guide slug
 * @returns {string|null} SVG string or null if not found
 */
export function getLegalDiagram(slug) {
  const diagram = LEGAL_DIAGRAMS[slug];
  if (!diagram) {
    console.warn(`No Legal diagram found for slug: ${slug}`);
    return null;
  }
  return diagram.trim();
}

/**
 * Get all available Legal diagram slugs
 * @returns {string[]} Array of available slugs
 */
export function getLegalDiagramSlugs() {
  return Object.keys(LEGAL_DIAGRAMS);
}

/**
 * Check if a Legal diagram exists for a given slug
 * @param {string} slug - The guide slug
 * @returns {boolean} True if diagram exists
 */
export function hasLegalDiagram(slug) {
  return slug in LEGAL_DIAGRAMS;
}

export default {
  LEGAL_DIAGRAMS,
  getLegalDiagram,
  getLegalDiagramSlugs,
  hasLegalDiagram,
};

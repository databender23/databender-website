/**
 * CRE (Commercial Real Estate) Industry Diagrams for PDF Generation
 *
 * Exports SVG diagram functions for CRE guide PDFs.
 * All diagrams are 600px wide x 300px tall and use 'currentColor' for theming.
 */

// =============================================================================
// CRE DIAGRAM DEFINITIONS
// =============================================================================

export const CRE_DIAGRAMS = {
  /**
   * Entity Resolution CRE - LLC tracing flowchart showing entity connections
   * Shows how multiple LLCs connect to reveal true ownership
   */
  'entity-resolution-cre': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">LLC Entity Tracing Flowchart</text>

      <!-- Top Level: Multiple LLCs -->
      <rect x="40" y="50" width="100" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="90" y="72" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">Property A LLC</text>
      <text x="90" y="86" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">123 Main St</text>

      <rect x="170" y="50" width="100" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="220" y="72" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">Maple Holdings</text>
      <text x="220" y="86" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">456 Oak Ave</text>

      <rect x="330" y="50" width="100" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="380" y="72" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">Summit RE LLC</text>
      <text x="380" y="86" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">789 Pine Rd</text>

      <rect x="460" y="50" width="100" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="510" y="72" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">Blue Sky Prop</text>
      <text x="510" y="86" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">321 Elm Blvd</text>

      <!-- Connecting Lines to Middle -->
      <path d="M90 100 L90 130 L220 130 L220 150" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <path d="M220 100 L220 150" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <path d="M380 100 L380 130 L300 130 L300 150" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <path d="M510 100 L510 130 L380 130 L380 150" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>

      <!-- Middle Level: Holding Companies -->
      <rect x="145" y="150" width="150" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="none"/>
      <text x="220" y="172" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">Westside Ventures Inc</text>
      <text x="220" y="186" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Registered Agent Match</text>

      <rect x="305" y="150" width="150" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="380" y="172" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">Eastside Capital LP</text>
      <text x="380" y="186" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Address Match</text>

      <!-- Connecting Lines to Bottom -->
      <path d="M220 200 L220 220 L300 220 L300 240" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M380 200 L380 220 L300 220" stroke="currentColor" stroke-width="2" fill="none"/>

      <!-- Bottom: True Owner -->
      <rect x="200" y="240" width="200" height="50" rx="6" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.1"/>
      <text x="300" y="262" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="currentColor" text-anchor="middle">True Owner Identified</text>
      <text x="300" y="278" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">$47M Portfolio | 4 Properties</text>

      <!-- Legend -->
      <rect x="460" y="250" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="478" y="260" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Entity</text>
      <line x1="460" y1="275" x2="472" y2="275" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2"/>
      <text x="478" y="278" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Data Link</text>
    </svg>
  `,

  /**
   * Data Room Review - Due diligence timeline diagram
   * Shows traditional vs AI-assisted review timeline
   */
  'data-room-review': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Data Room Review: Traditional vs AI-Assisted</text>

      <!-- Timeline Base -->
      <line x1="50" y1="150" x2="550" y2="150" stroke="currentColor" stroke-width="2" opacity="0.3"/>

      <!-- Time markers -->
      <text x="50" y="170" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Day 1</text>
      <text x="175" y="170" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Day 7</text>
      <text x="300" y="170" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Day 14</text>
      <text x="425" y="170" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Day 21</text>
      <text x="550" y="170" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Day 30</text>

      <!-- Traditional Process (Top) -->
      <text x="50" y="60" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor">Traditional Review</text>

      <!-- Traditional phases -->
      <rect x="50" y="75" width="125" height="35" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
      <text x="112" y="96" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Document Sorting</text>

      <rect x="175" y="75" width="175" height="35" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/>
      <text x="262" y="96" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Manual Review & Extraction</text>

      <rect x="350" y="75" width="100" height="35" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
      <text x="400" y="96" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Summary Prep</text>

      <rect x="450" y="75" width="100" height="35" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.12"/>
      <text x="500" y="96" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Final Report</text>

      <!-- AI Process (Bottom) -->
      <text x="50" y="200" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor">AI-Assisted Review</text>

      <!-- AI phases -->
      <rect x="50" y="215" width="75" height="35" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
      <text x="87" y="236" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">AI Scan</text>

      <rect x="125" y="215" width="75" height="35" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
      <text x="162" y="236" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Auto-Extract</text>

      <rect x="200" y="215" width="100" height="35" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
      <text x="250" y="236" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Human Review</text>

      <!-- Completion markers -->
      <circle cx="550" cy="92" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="550" y="127" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">30 days</text>

      <circle cx="300" cy="232" r="8" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.2"/>
      <path d="M295 232 L298 235 L306 227" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="300" y="267" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">Complete in 10-14 days</text>

      <!-- Time saved callout -->
      <rect x="420" y="200" width="130" height="60" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/>
      <text x="485" y="222" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="currentColor" text-anchor="middle">50-65%</text>
      <text x="485" y="240" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Time Reduction</text>
      <text x="485" y="252" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">with AI-assist</text>
    </svg>
  `,

  /**
   * Deal Prioritization - Deal scoring funnel visualization
   * Shows deals flowing through qualification stages
   */
  'deal-prioritization': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Deal Scoring Funnel</text>

      <!-- Funnel Shape -->
      <path d="M100 50 L500 50 L420 140 L180 140 Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.05"/>
      <path d="M180 140 L420 140 L380 200 L220 200 Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/>
      <path d="M220 200 L380 200 L340 260 L260 260 Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>

      <!-- Stage Labels -->
      <text x="300" y="85" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="currentColor" text-anchor="middle">All Opportunities</text>
      <text x="300" y="100" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">150 deals</text>

      <text x="300" y="160" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="currentColor" text-anchor="middle">Qualified Leads</text>
      <text x="300" y="175" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">45 deals</text>

      <text x="300" y="235" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Priority Targets</text>
      <text x="300" y="250" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">12 high-fit deals</text>

      <!-- Scoring Criteria (Right Side) -->
      <text x="520" y="60" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor">Scoring Criteria</text>

      <rect x="505" y="75" width="12" height="12" rx="2" fill="currentColor" fill-opacity="0.3"/>
      <text x="525" y="85" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Asset Quality</text>

      <rect x="505" y="95" width="12" height="12" rx="2" fill="currentColor" fill-opacity="0.5"/>
      <text x="525" y="105" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Location Score</text>

      <rect x="505" y="115" width="12" height="12" rx="2" fill="currentColor" fill-opacity="0.7"/>
      <text x="525" y="125" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Seller Motivation</text>

      <rect x="505" y="135" width="12" height="12" rx="2" fill="currentColor" fill-opacity="0.9"/>
      <text x="525" y="145" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Price Alignment</text>

      <!-- Deal Cards (Left Side) -->
      <rect x="20" y="70" width="65" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
      <text x="52" y="90" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Deal A</text>
      <text x="52" y="102" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Score: 42</text>

      <rect x="20" y="125" width="65" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.7"/>
      <text x="52" y="145" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Deal B</text>
      <text x="52" y="157" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Score: 67</text>

      <rect x="20" y="180" width="65" height="45" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/>
      <text x="52" y="200" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">Deal C</text>
      <text x="52" y="212" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Score: 89</text>

      <!-- Arrows showing flow -->
      <path d="M85 92 L100 85" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
      <path d="M85 147 L130 140" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <path d="M85 202 L170 210" stroke="currentColor" stroke-width="1.5" fill="none"/>

      <!-- Bottom result -->
      <rect x="220" y="270" width="160" height="25" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
      <text x="300" y="287" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">92% close rate on priority deals</text>
    </svg>
  `,

  /**
   * Portfolio Visibility CRE - Multi-system unification diagram
   * Shows multiple data sources converging into unified view
   */
  'portfolio-visibility-cre': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Multi-System Data Unification</text>

      <!-- Left Side: Data Sources -->
      <text x="80" y="55" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Data Sources</text>

      <!-- Property Management -->
      <rect x="20" y="70" width="120" height="40" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="80" y="90" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Property Mgmt</text>
      <text x="80" y="102" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Yardi, MRI, AppFolio</text>

      <!-- Accounting -->
      <rect x="20" y="120" width="120" height="40" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="80" y="140" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Accounting</text>
      <text x="80" y="152" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">QuickBooks, Sage</text>

      <!-- Leasing -->
      <rect x="20" y="170" width="120" height="40" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="80" y="190" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Leasing Systems</text>
      <text x="80" y="202" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">CRM, Deal tracking</text>

      <!-- Spreadsheets -->
      <rect x="20" y="220" width="120" height="40" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="80" y="240" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Spreadsheets</text>
      <text x="80" y="252" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Excel, Google Sheets</text>

      <!-- Connecting Lines -->
      <path d="M140 90 Q200 90 230 150" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <path d="M140 140 L230 150" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <path d="M140 190 L230 170" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <path d="M140 240 Q200 240 230 170" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>

      <!-- Center: Integration Hub -->
      <rect x="230" y="115" width="140" height="70" rx="8" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/>
      <text x="300" y="145" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Data Integration</text>
      <text x="300" y="162" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Hub</text>
      <text x="300" y="178" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Clean | Match | Merge</text>

      <!-- Right Side: Unified Views -->
      <path d="M370 140 L420 90" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M370 150 L420 150" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M370 160 L420 210" stroke="currentColor" stroke-width="2" fill="none"/>

      <!-- Unified Dashboard -->
      <rect x="420" y="60" width="160" height="60" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/>
      <text x="500" y="85" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="currentColor" text-anchor="middle">Portfolio Dashboard</text>
      <text x="500" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Real-time KPIs</text>
      <text x="500" y="112" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Occupancy | NOI | Collections</text>

      <!-- Property View -->
      <rect x="420" y="130" width="160" height="40" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="500" y="152" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Property-Level View</text>
      <text x="500" y="164" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Single source of truth</text>

      <!-- Investor Reports -->
      <rect x="420" y="180" width="160" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
      <text x="500" y="202" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Investor Reporting</text>
      <text x="500" y="216" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Auto-generated | Accurate</text>

      <!-- Before/After Stats -->
      <rect x="230" y="240" width="140" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="300" y="258" font-family="Inter, sans-serif" font-size="9" font-weight="500" fill="currentColor" text-anchor="middle">Reporting Time</text>
      <text x="260" y="275" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Before: 5 days</text>
      <text x="340" y="275" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">After: 2 hours</text>
    </svg>
  `,

  /**
   * Investor Reporting CRE - Manual vs automated reporting diagram
   * Shows the contrast between manual and automated workflows
   */
  'investor-reporting-cre': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Investor Reporting: Manual vs Automated</text>

      <!-- Manual Process (Top) -->
      <text x="50" y="55" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor">Manual Process</text>
      <text x="50" y="70" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.6">Current state for most firms</text>

      <!-- Manual steps -->
      <rect x="50" y="85" width="80" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="90" y="105" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Export Data</text>
      <text x="90" y="118" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">from 5+ systems</text>
      <text x="90" y="130" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">2-4 hours</text>

      <path d="M130 110 L150 110" stroke="currentColor" stroke-width="1" fill="none"/>
      <polygon points="150,106 158,110 150,114" fill="currentColor"/>

      <rect x="160" y="85" width="80" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="200" y="105" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Manual Entry</text>
      <text x="200" y="118" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">copy/paste data</text>
      <text x="200" y="130" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">4-8 hours</text>

      <path d="M240 110 L260 110" stroke="currentColor" stroke-width="1" fill="none"/>
      <polygon points="260,106 268,110 260,114" fill="currentColor"/>

      <rect x="270" y="85" width="80" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="310" y="105" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Reconcile</text>
      <text x="310" y="118" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">fix errors</text>
      <text x="310" y="130" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">3-6 hours</text>

      <path d="M350 110 L370 110" stroke="currentColor" stroke-width="1" fill="none"/>
      <polygon points="370,106 378,110 370,114" fill="currentColor"/>

      <rect x="380" y="85" width="80" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="420" y="105" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Format</text>
      <text x="420" y="118" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">create report</text>
      <text x="420" y="130" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">2-4 hours</text>

      <path d="M460 110 L480 110" stroke="currentColor" stroke-width="1" fill="none"/>
      <polygon points="480,106 488,110 480,114" fill="currentColor"/>

      <rect x="490" y="85" width="70" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
      <text x="525" y="105" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Review</text>
      <text x="525" y="118" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">& approve</text>
      <text x="525" y="130" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">1-2 hours</text>

      <!-- Manual Total -->
      <rect x="490" y="145" width="70" height="25" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="525" y="162" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">12-24 hrs</text>

      <!-- Automated Process (Bottom) -->
      <text x="50" y="195" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor">Automated Process</text>
      <text x="50" y="210" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.6">With integrated systems</text>

      <!-- Automated steps -->
      <rect x="50" y="225" width="140" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/>
      <text x="120" y="245" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Auto-Sync Data</text>
      <text x="120" y="260" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Real-time integration</text>
      <text x="120" y="272" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">Continuous</text>

      <path d="M190 250 L220 250" stroke="currentColor" stroke-width="2" fill="none"/>
      <polygon points="220,246 232,250 220,254" fill="currentColor"/>

      <rect x="235" y="225" width="140" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/>
      <text x="305" y="245" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Generate Report</text>
      <text x="305" y="260" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">One-click generation</text>
      <text x="305" y="272" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">10 minutes</text>

      <path d="M375 250 L405 250" stroke="currentColor" stroke-width="2" fill="none"/>
      <polygon points="405,246 417,250 405,254" fill="currentColor"/>

      <rect x="420" y="225" width="100" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/>
      <text x="470" y="245" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Review & Send</text>
      <text x="470" y="260" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Quick approval</text>
      <text x="470" y="272" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">20 minutes</text>

      <!-- Automated Total -->
      <rect x="530" y="232" width="60" height="35" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
      <text x="560" y="252" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">30 min</text>
      <text x="560" y="262" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">total</text>
    </svg>
  `,

  /**
   * Lease Intelligence CRE - Renewal pipeline visual/timeline
   * Shows upcoming lease expirations and renewal tracking
   */
  'lease-intelligence-cre': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Lease Renewal Pipeline</text>

      <!-- Timeline Base -->
      <line x1="60" y1="80" x2="540" y2="80" stroke="currentColor" stroke-width="2"/>

      <!-- Timeline Markers -->
      <circle cx="100" cy="80" r="6" fill="currentColor"/>
      <text x="100" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Now</text>

      <circle cx="180" cy="80" r="5" stroke="currentColor" stroke-width="2" fill="white"/>
      <text x="180" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Q1</text>

      <circle cx="260" cy="80" r="5" stroke="currentColor" stroke-width="2" fill="white"/>
      <text x="260" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Q2</text>

      <circle cx="340" cy="80" r="5" stroke="currentColor" stroke-width="2" fill="white"/>
      <text x="340" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Q3</text>

      <circle cx="420" cy="80" r="5" stroke="currentColor" stroke-width="2" fill="white"/>
      <text x="420" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Q4</text>

      <circle cx="500" cy="80" r="5" stroke="currentColor" stroke-width="2" fill="white"/>
      <text x="500" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">+1 Yr</text>

      <!-- Lease Cards -->
      <!-- Critical - expiring soon -->
      <line x1="140" y1="80" x2="140" y2="120" stroke="currentColor" stroke-width="1.5"/>
      <rect x="100" y="120" width="80" height="55" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
      <text x="140" y="137" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">Acme Corp</text>
      <text x="140" y="150" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Suite 200 | 8,500 SF</text>
      <text x="140" y="163" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">$28/SF | Exp: Feb 15</text>
      <rect x="113" y="167" width="54" height="5" rx="2" fill="currentColor" fill-opacity="0.2"/>
      <rect x="113" y="167" width="45" height="5" rx="2" fill="currentColor"/>

      <!-- In Progress -->
      <line x1="220" y1="80" x2="220" y2="120" stroke="currentColor" stroke-width="1.5"/>
      <rect x="180" y="120" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/>
      <text x="220" y="137" font-family="Inter, sans-serif" font-size="8" font-weight="500" fill="currentColor" text-anchor="middle">TechStart Inc</text>
      <text x="220" y="150" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Suite 450 | 12,200 SF</text>
      <text x="220" y="163" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">$32/SF | Exp: May 1</text>
      <rect x="193" y="167" width="54" height="5" rx="2" fill="currentColor" fill-opacity="0.2"/>
      <rect x="193" y="167" width="27" height="5" rx="2" fill="currentColor"/>

      <!-- Upcoming -->
      <line x1="300" y1="80" x2="300" y2="120" stroke="currentColor" stroke-width="1.5"/>
      <rect x="260" y="120" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="300" y="137" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Global Finance</text>
      <text x="300" y="150" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Suite 100 | 22,000 SF</text>
      <text x="300" y="163" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">$35/SF | Exp: Aug 30</text>
      <rect x="273" y="167" width="54" height="5" rx="2" fill="currentColor" fill-opacity="0.2"/>

      <!-- Later -->
      <line x1="380" y1="80" x2="380" y2="120" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>
      <rect x="340" y="120" width="80" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="380" y="140" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.8">Med Solutions</text>
      <text x="380" y="153" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">15,500 SF | Oct</text>

      <line x1="460" y1="80" x2="460" y2="120" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>
      <rect x="420" y="120" width="80" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="460" y="140" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.8">Retail Plus</text>
      <text x="460" y="153" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">6,200 SF | Dec</text>

      <!-- Summary Stats -->
      <rect x="60" y="200" width="160" height="80" rx="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>
      <text x="140" y="220" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Pipeline Summary</text>
      <text x="90" y="245" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="currentColor" text-anchor="middle">12</text>
      <text x="90" y="260" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Active</text>
      <text x="140" y="245" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="currentColor" text-anchor="middle">5</text>
      <text x="140" y="260" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Critical</text>
      <text x="190" y="245" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="currentColor" text-anchor="middle">87%</text>
      <text x="190" y="260" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Retention</text>

      <!-- Alert Actions -->
      <rect x="240" y="200" width="300" height="80" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="390" y="220" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Auto-Generated Alerts</text>

      <circle cx="260" cy="242" r="4" fill="currentColor"/>
      <text x="275" y="245" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Acme Corp: Send renewal proposal (30 days out)</text>

      <circle cx="260" cy="262" r="4" fill="currentColor" fill-opacity="0.6"/>
      <text x="275" y="265" font-family="Inter, sans-serif" font-size="8" fill="currentColor">TechStart: Schedule walkthrough (90 days out)</text>
    </svg>
  `,

  /**
   * Debt Maturity Wall - $957B maturity wave chart
   * Shows the looming CRE debt maturity timeline
   */
  'debt-maturity-wall': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">CRE Debt Maturity Wall: $957B Coming Due</text>

      <!-- Y-Axis -->
      <line x1="70" y1="50" x2="70" y2="240" stroke="currentColor" stroke-width="1"/>
      <text x="60" y="55" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="end">$300B</text>
      <text x="60" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="end">$250B</text>
      <text x="60" y="145" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="end">$200B</text>
      <text x="60" y="190" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="end">$150B</text>
      <text x="60" y="235" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="end">$100B</text>

      <!-- X-Axis -->
      <line x1="70" y1="240" x2="560" y2="240" stroke="currentColor" stroke-width="1"/>

      <!-- Grid lines -->
      <line x1="70" y1="55" x2="560" y2="55" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>
      <line x1="70" y1="100" x2="560" y2="100" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>
      <line x1="70" y1="145" x2="560" y2="145" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>
      <line x1="70" y1="190" x2="560" y2="190" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>

      <!-- Bars -->
      <!-- 2024 - Already past / manageable -->
      <rect x="90" y="175" width="55" height="65" fill="currentColor" fill-opacity="0.3"/>
      <text x="117" y="255" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">2024</text>
      <text x="117" y="168" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">$156B</text>

      <!-- 2025 - Critical year -->
      <rect x="160" y="80" width="55" height="160" fill="currentColor" fill-opacity="0.7"/>
      <text x="187" y="255" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">2025</text>
      <text x="187" y="73" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">$267B</text>

      <!-- 2026 - Peak -->
      <rect x="230" y="55" width="55" height="185" fill="currentColor"/>
      <text x="257" y="255" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="currentColor" text-anchor="middle">2026</text>
      <text x="257" y="48" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="currentColor" text-anchor="middle">$298B</text>

      <!-- Peak marker -->
      <path d="M257 38 L252 28 L262 28 Z" fill="currentColor"/>
      <text x="257" y="24" font-family="Inter, sans-serif" font-size="7" font-weight="600" fill="currentColor" text-anchor="middle">PEAK</text>

      <!-- 2027 -->
      <rect x="300" y="130" width="55" height="110" fill="currentColor" fill-opacity="0.5"/>
      <text x="327" y="255" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">2027</text>
      <text x="327" y="123" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">$178B</text>

      <!-- 2028 -->
      <rect x="370" y="200" width="55" height="40" fill="currentColor" fill-opacity="0.25"/>
      <text x="397" y="255" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">2028</text>
      <text x="397" y="193" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">$58B</text>

      <!-- 2029+ -->
      <rect x="440" y="220" width="55" height="20" fill="currentColor" fill-opacity="0.15"/>
      <text x="467" y="255" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">2029+</text>

      <!-- Callout box -->
      <rect x="420" y="60" width="140" height="90" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/>
      <text x="490" y="82" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">The Challenge</text>
      <text x="490" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">60% originated at</text>
      <text x="490" y="112" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">lower rates (3-4%)</text>
      <line x1="440" y1="120" x2="540" y2="120" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
      <text x="490" y="135" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Current rates: 7-8%</text>
      <text x="490" y="147" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">= Refinancing crisis</text>

      <!-- Data source -->
      <text x="70" y="285" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.5">Source: Mortgage Bankers Association, Fed data 2024</text>
    </svg>
  `,

  /**
   * CAM Reconciliation Guide - CAM recovery flowchart
   * Shows the process of CAM reconciliation and recovery
   */
  'cam-reconciliation-guide': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">CAM Reconciliation Process Flow</text>

      <!-- Process Flow -->
      <!-- Step 1: Collect Data -->
      <rect x="30" y="55" width="100" height="60" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/>
      <text x="80" y="78" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">1. Collect Data</text>
      <text x="80" y="92" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Actual expenses</text>
      <text x="80" y="104" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Budget estimates</text>

      <path d="M130 85 L155 85" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <polygon points="155,81 165,85 155,89" fill="currentColor"/>

      <!-- Step 2: Calculate Pro-Rata -->
      <rect x="165" y="55" width="100" height="60" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/>
      <text x="215" y="75" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">2. Calculate</text>
      <text x="215" y="88" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">Pro-Rata Share</text>
      <text x="215" y="104" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">By SF or % method</text>

      <path d="M265 85 L290 85" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <polygon points="290,81 300,85 290,89" fill="currentColor"/>

      <!-- Step 3: Compare -->
      <rect x="300" y="55" width="100" height="60" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/>
      <text x="350" y="75" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">3. Compare</text>
      <text x="350" y="88" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">Actual vs Billed</text>
      <text x="350" y="104" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Identify variance</text>

      <path d="M400 85 L425 85" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <polygon points="425,81 435,85 425,89" fill="currentColor"/>

      <!-- Step 4: Reconcile -->
      <rect x="435" y="55" width="130" height="60" rx="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/>
      <text x="500" y="78" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">4. Reconcile & Bill</text>
      <text x="500" y="92" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Issue credit or invoice</text>
      <text x="500" y="104" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Update tenant accounts</text>

      <!-- Common Issues Section -->
      <text x="150" y="145" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor">Common Issues Found</text>

      <rect x="30" y="160" width="240" height="120" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>

      <circle cx="50" cy="182" r="4" fill="currentColor" fill-opacity="0.6"/>
      <text x="62" y="185" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Excluded expense categories billed</text>

      <circle cx="50" cy="202" r="4" fill="currentColor" fill-opacity="0.6"/>
      <text x="62" y="205" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Incorrect SF measurements</text>

      <circle cx="50" cy="222" r="4" fill="currentColor" fill-opacity="0.6"/>
      <text x="62" y="225" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Cap violations (admin fee caps)</text>

      <circle cx="50" cy="242" r="4" fill="currentColor" fill-opacity="0.6"/>
      <text x="62" y="245" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Missing gross-up calculations</text>

      <circle cx="50" cy="262" r="4" fill="currentColor" fill-opacity="0.6"/>
      <text x="62" y="265" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Base year adjustments missed</text>

      <!-- Recovery Potential Section -->
      <text x="420" y="145" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor">Recovery Potential</text>

      <rect x="295" y="160" width="270" height="120" rx="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/>

      <text x="430" y="185" font-family="Inter, sans-serif" font-size="32" font-weight="700" fill="currentColor" text-anchor="middle">3-8%</text>
      <text x="430" y="205" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">of Total CAM</text>
      <text x="430" y="220" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">Typical under-recovery found</text>

      <line x1="310" y1="235" x2="550" y2="235" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>

      <text x="365" y="255" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">$50K CAM</text>
      <text x="365" y="270" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">per property</text>

      <text x="430" y="255" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">=</text>

      <text x="495" y="255" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">$1.5K-$4K</text>
      <text x="495" y="270" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">recoverable</text>
    </svg>
  `,
};

// =============================================================================
// HELPER FUNCTION
// =============================================================================

/**
 * Get CRE diagram SVG for a guide slug
 * @param {string} slug - The guide slug
 * @param {string} [color] - Optional color to apply (replaces currentColor)
 * @returns {string|null} SVG string or null if not found
 */
export function getCREDiagram(slug, color = null) {
  const diagram = CRE_DIAGRAMS[slug];

  if (!diagram) {
    console.warn(`No CRE diagram found for slug: ${slug}`);
    return null;
  }

  if (color) {
    // Replace currentColor with the specified color
    return diagram.replace(/currentColor/g, color);
  }

  return diagram;
}

/**
 * Check if a CRE diagram exists for a given slug
 * @param {string} slug - The guide slug
 * @returns {boolean} True if diagram exists
 */
export function hasCREDiagram(slug) {
  return slug in CRE_DIAGRAMS;
}

/**
 * Get all available CRE diagram slugs
 * @returns {string[]} Array of available slug names
 */
export function getAvailableCREDiagrams() {
  return Object.keys(CRE_DIAGRAMS);
}

export default {
  CRE_DIAGRAMS,
  getCREDiagram,
  hasCREDiagram,
  getAvailableCREDiagrams,
};

/**
 * Manufacturing Industry Diagrams for PDF Generation
 *
 * SVG diagram functions for Manufacturing guides.
 * All diagrams use 'currentColor' for strokes so colors can be applied via CSS.
 * Designed for 600px wide x 300px tall viewing area.
 */

// =============================================================================
// MANUFACTURING DIAGRAMS - 8 guides
// =============================================================================

export const MANUFACTURING_DIAGRAMS = {
  // ---------------------------------------------------------------------------
  // operational-visibility-playbook: Connected systems diagram showing data flows
  // ---------------------------------------------------------------------------
  'operational-visibility-playbook': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Connected Manufacturing Systems</text>

      <!-- Central Hub - Unified Data Platform -->
      <rect x="225" y="110" width="150" height="80" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="300" y="145" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Unified Data</text>
      <text x="300" y="162" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Platform</text>
      <circle cx="300" cy="180" r="4" fill="currentColor" opacity="0.5"/>

      <!-- Left Systems - ERP -->
      <rect x="40" y="50" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="90" y="72" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">ERP</text>
      <text x="90" y="86" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Orders & Finance</text>

      <!-- Left Systems - MES -->
      <rect x="40" y="125" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="90" y="147" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">MES</text>
      <text x="90" y="161" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Production</text>

      <!-- Left Systems - SCADA/IoT -->
      <rect x="40" y="200" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="90" y="222" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">SCADA / IoT</text>
      <text x="90" y="236" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Equipment</text>

      <!-- Right Systems - CRM -->
      <rect x="460" y="50" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="510" y="72" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">CRM</text>
      <text x="510" y="86" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Customers</text>

      <!-- Right Systems - Quality -->
      <rect x="460" y="125" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="510" y="147" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">QMS</text>
      <text x="510" y="161" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Quality</text>

      <!-- Right Systems - Supply Chain -->
      <rect x="460" y="200" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="510" y="222" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">SCM</text>
      <text x="510" y="236" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Supply Chain</text>

      <!-- Connection Lines - Left to Center -->
      <path d="M140 75 L225 130" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
      <path d="M140 150 L225 150" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
      <path d="M140 225 L225 170" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>

      <!-- Connection Lines - Right to Center -->
      <path d="M460 75 L375 130" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
      <path d="M460 150 L375 150" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
      <path d="M460 225 L375 170" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>

      <!-- Data Flow Arrows -->
      <polygon points="220,130 230,125 230,135" fill="currentColor" opacity="0.6"/>
      <polygon points="220,150 230,145 230,155" fill="currentColor" opacity="0.6"/>
      <polygon points="220,170 230,165 230,175" fill="currentColor" opacity="0.6"/>
      <polygon points="380,130 370,125 370,135" fill="currentColor" opacity="0.6"/>
      <polygon points="380,150 370,145 370,155" fill="currentColor" opacity="0.6"/>
      <polygon points="380,170 370,165 370,175" fill="currentColor" opacity="0.6"/>

      <!-- Bottom Legend -->
      <text x="300" y="280" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Real-time data integration enables end-to-end operational visibility</text>
    </svg>
  `,

  // ---------------------------------------------------------------------------
  // lead-scoring-manufacturing: Scoring model visualization with criteria
  // ---------------------------------------------------------------------------
  'lead-scoring-manufacturing': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Manufacturing Lead Scoring Model</text>

      <!-- Scoring Criteria Section - Left -->
      <rect x="30" y="50" width="200" height="200" rx="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="130" y="72" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Scoring Criteria</text>

      <!-- Criteria Items -->
      <g transform="translate(45, 90)">
        <rect x="0" y="0" width="170" height="28" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        <text x="10" y="18" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Company Size</text>
        <text x="155" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="end">25 pts</text>
      </g>
      <g transform="translate(45, 125)">
        <rect x="0" y="0" width="170" height="28" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        <text x="10" y="18" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Industry Fit</text>
        <text x="155" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="end">20 pts</text>
      </g>
      <g transform="translate(45, 160)">
        <rect x="0" y="0" width="170" height="28" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        <text x="10" y="18" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Engagement Level</text>
        <text x="155" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="end">30 pts</text>
      </g>
      <g transform="translate(45, 195)">
        <rect x="0" y="0" width="170" height="28" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        <text x="10" y="18" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Budget Authority</text>
        <text x="155" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="end">25 pts</text>
      </g>

      <!-- Arrow to center -->
      <path d="M240 150 L280 150" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <polygon points="285,150 275,145 275,155" fill="currentColor" opacity="0.6"/>

      <!-- Score Calculation - Center -->
      <circle cx="330" cy="150" r="50" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="330" y="140" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.7">TOTAL</text>
      <text x="330" y="162" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="currentColor" text-anchor="middle">100</text>
      <text x="330" y="178" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">points</text>

      <!-- Arrow to right -->
      <path d="M385 150 L420 150" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <polygon points="425,150 415,145 415,155" fill="currentColor" opacity="0.6"/>

      <!-- Lead Tiers - Right -->
      <rect x="440" y="50" width="130" height="200" rx="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="505" y="72" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Lead Tiers</text>

      <!-- Tier Items -->
      <g transform="translate(450, 90)">
        <rect x="0" y="0" width="110" height="36" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="18" cy="18" r="8" fill="currentColor"/>
        <text x="34" y="15" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor">Hot</text>
        <text x="34" y="28" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">75-100 pts</text>
      </g>
      <g transform="translate(450, 135)">
        <rect x="0" y="0" width="110" height="36" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.8"/>
        <circle cx="18" cy="18" r="8" fill="currentColor" opacity="0.7"/>
        <text x="34" y="15" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor">Warm</text>
        <text x="34" y="28" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">50-74 pts</text>
      </g>
      <g transform="translate(450, 180)">
        <rect x="0" y="0" width="110" height="36" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <circle cx="18" cy="18" r="8" fill="currentColor" opacity="0.4"/>
        <text x="34" y="15" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" opacity="0.8">Cold</text>
        <text x="34" y="28" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.5">0-49 pts</text>
      </g>

      <!-- Bottom Legend -->
      <text x="300" y="280" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Data-driven scoring prioritizes sales effort on high-potential leads</text>
    </svg>
  `,

  // ---------------------------------------------------------------------------
  // manufacturing-ai-privacy: Data boundary diagram showing on-prem vs cloud
  // ---------------------------------------------------------------------------
  'manufacturing-ai-privacy': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">AI Privacy Architecture: On-Premises vs Cloud</text>

      <!-- On-Premises Section -->
      <rect x="30" y="50" width="240" height="200" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="30" y="50" width="240" height="30" rx="8" stroke="none" fill="currentColor" opacity="0.1"/>
      <text x="150" y="70" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">ON-PREMISES (Secure)</text>

      <!-- Lock icon -->
      <rect x="50" y="95" width="36" height="28" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <path d="M60 95 L60 87 A8 8 0 0 1 76 87 L76 95" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <circle cx="68" cy="107" r="4" fill="currentColor" opacity="0.5"/>

      <!-- On-prem data items -->
      <rect x="100" y="90" width="155" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="177" y="104" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Proprietary Designs</text>
      <text x="177" y="117" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Trade secrets, CAD files</text>

      <rect x="100" y="135" width="155" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="177" y="149" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Customer Data</text>
      <text x="177" y="162" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Orders, contracts, pricing</text>

      <rect x="100" y="180" width="155" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="177" y="194" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">Production IP</text>
      <text x="177" y="207" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Processes, formulas</text>

      <!-- Secure Boundary Line -->
      <line x1="295" y1="60" x2="295" y2="240" stroke="currentColor" stroke-width="2" stroke-dasharray="8 4"/>
      <rect x="280" y="140" width="30" height="20" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1"/>
      <text x="295" y="154" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">API</text>

      <!-- Cloud Section -->
      <rect x="330" y="50" width="240" height="200" rx="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/>
      <rect x="330" y="50" width="240" height="30" rx="8" stroke="none" fill="currentColor" opacity="0.05"/>
      <text x="450" y="70" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">CLOUD (Processed)</text>

      <!-- Cloud icon -->
      <path d="M365 115 A15 15 0 0 1 395 115 A10 10 0 0 1 410 125 A12 12 0 0 1 410 143 L360 143 A12 12 0 0 1 360 125 A8 8 0 0 1 365 115" stroke="currentColor" stroke-width="1.5" fill="none"/>

      <!-- Cloud data items -->
      <rect x="350" y="160" width="90" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
      <text x="395" y="178" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Aggregated</text>
      <text x="395" y="188" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Metrics</text>

      <rect x="460" y="160" width="90" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
      <text x="505" y="178" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Anonymized</text>
      <text x="505" y="188" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Patterns</text>

      <rect x="405" y="200" width="90" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
      <text x="450" y="218" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">AI Model</text>
      <text x="450" y="228" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Insights</text>

      <!-- Arrows showing data flow -->
      <path d="M270 110 Q295 110 295 130" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
      <path d="M295 160 Q295 180 330 180" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
      <polygon points="330,180 322,176 322,184" fill="currentColor" opacity="0.5"/>

      <!-- Bottom Legend -->
      <text x="300" y="280" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Sensitive data stays on-premises; only anonymized insights reach the cloud</text>
    </svg>
  `,

  // ---------------------------------------------------------------------------
  // data-cleanup-manufacturing: Data quality progression (messy -> clean)
  // ---------------------------------------------------------------------------
  'data-cleanup-manufacturing': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Data Quality Transformation Journey</text>

      <!-- Stage 1: Messy Data -->
      <g transform="translate(30, 55)">
        <rect x="0" y="0" width="140" height="160" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
        <text x="70" y="25" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Raw Data</text>
        <text x="70" y="40" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">(Messy)</text>

        <!-- Messy lines representing bad data -->
        <line x1="20" y1="60" x2="90" y2="60" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <line x1="35" y1="75" x2="120" y2="75" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <line x1="15" y1="90" x2="70" y2="90" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <line x1="50" y1="105" x2="115" y2="105" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <line x1="25" y1="120" x2="100" y2="120" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <line x1="40" y1="135" x2="85" y2="135" stroke="currentColor" stroke-width="1" opacity="0.3"/>

        <!-- X marks for errors -->
        <g opacity="0.5">
          <path d="M100 58 L108 66 M108 58 L100 66" stroke="currentColor" stroke-width="1.5"/>
          <path d="M30 88 L38 96 M38 88 L30 96" stroke="currentColor" stroke-width="1.5"/>
          <path d="M80 118 L88 126 M88 118 L80 126" stroke="currentColor" stroke-width="1.5"/>
        </g>

        <!-- Stats -->
        <text x="70" y="155" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">~40% Error Rate</text>
      </g>

      <!-- Arrow 1 -->
      <g transform="translate(180, 120)">
        <path d="M0 15 L30 15" stroke="currentColor" stroke-width="2" opacity="0.6"/>
        <polygon points="35,15 25,10 25,20" fill="currentColor" opacity="0.6"/>
        <text x="17" y="5" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">Validate</text>
      </g>

      <!-- Stage 2: In Progress -->
      <g transform="translate(230, 55)">
        <rect x="0" y="0" width="140" height="160" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.7"/>
        <text x="70" y="25" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Validating</text>
        <text x="70" y="40" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">(In Progress)</text>

        <!-- Partially cleaned lines -->
        <rect x="20" y="55" width="100" height="18" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <rect x="20" y="80" width="100" height="18" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <rect x="20" y="105" width="100" height="18" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <rect x="20" y="130" width="100" height="18" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>

        <!-- Check and warning marks -->
        <path d="M108 60 L112 66 L122 54" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
        <path d="M108 85 L112 91 L122 79" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
        <circle cx="115" cy="114" r="6" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
        <text x="115" y="117" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.5">?</text>

        <!-- Stats -->
        <text x="70" y="155" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">~15% Remaining</text>
      </g>

      <!-- Arrow 2 -->
      <g transform="translate(380, 120)">
        <path d="M0 15 L30 15" stroke="currentColor" stroke-width="2" opacity="0.6"/>
        <polygon points="35,15 25,10 25,20" fill="currentColor" opacity="0.6"/>
        <text x="17" y="5" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.5">Enrich</text>
      </g>

      <!-- Stage 3: Clean Data -->
      <g transform="translate(430, 55)">
        <rect x="0" y="0" width="140" height="160" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="70" y="25" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Clean Data</text>
        <text x="70" y="40" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">(Ready to Use)</text>

        <!-- Clean structured rows -->
        <rect x="15" y="55" width="110" height="20" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <rect x="15" y="80" width="110" height="20" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <rect x="15" y="105" width="110" height="20" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <rect x="15" y="130" width="110" height="20" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>

        <!-- All checkmarks -->
        <path d="M108 60 L112 66 L122 54" stroke="currentColor" stroke-width="2"/>
        <path d="M108 85 L112 91 L122 79" stroke="currentColor" stroke-width="2"/>
        <path d="M108 110 L112 116 L122 104" stroke="currentColor" stroke-width="2"/>
        <path d="M108 135 L112 141 L122 129" stroke="currentColor" stroke-width="2"/>

        <!-- Stats -->
        <text x="70" y="155" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">99%+ Accuracy</text>
      </g>

      <!-- Bottom quality meter -->
      <g transform="translate(100, 250)">
        <text x="0" y="0" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.6">Data Quality:</text>
        <rect x="70" y="-10" width="330" height="14" rx="7" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
        <rect x="70" y="-10" width="330" height="14" rx="7" fill="currentColor" opacity="0.15"/>
        <text x="135" y="0" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.5">Poor</text>
        <text x="235" y="0" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.5">Fair</text>
        <text x="335" y="0" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.5">Excellent</text>
      </g>

      <!-- Bottom Legend -->
      <text x="300" y="285" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Systematic cleanup transforms chaotic data into reliable business intelligence</text>
    </svg>
  `,

  // ---------------------------------------------------------------------------
  // do-more-with-fewer-people: Productivity multiplier diagram
  // ---------------------------------------------------------------------------
  'do-more-with-fewer-people': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Productivity Multiplier Effect</text>

      <!-- Before Section -->
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="180" height="180" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
        <text x="90" y="25" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">Before: Manual Process</text>

        <!-- 5 people icons -->
        <g transform="translate(25, 50)">
          <circle cx="15" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 35 A10 10 0 0 1 25 35" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </g>
        <g transform="translate(60, 50)">
          <circle cx="15" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 35 A10 10 0 0 1 25 35" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </g>
        <g transform="translate(95, 50)">
          <circle cx="15" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 35 A10 10 0 0 1 25 35" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </g>
        <g transform="translate(60, 100)">
          <circle cx="15" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 35 A10 10 0 0 1 25 35" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </g>
        <g transform="translate(95, 100)">
          <circle cx="15" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 35 A10 10 0 0 1 25 35" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </g>

        <!-- Output -->
        <rect x="130" y="75" width="40" height="50" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="150" y="95" font-family="Inter, sans-serif" font-size="16" font-weight="700" fill="currentColor" text-anchor="middle">1x</text>
        <text x="150" y="115" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Output</text>

        <!-- Bottom label -->
        <text x="90" y="170" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">5 FTEs required</text>
      </g>

      <!-- Transformation Arrow -->
      <g transform="translate(235, 120)">
        <path d="M0 20 L50 20" stroke="currentColor" stroke-width="3"/>
        <polygon points="55,20 45,12 45,28" fill="currentColor"/>
        <text x="27" y="10" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">+ AI</text>
        <text x="27" y="45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Automation</text>
      </g>

      <!-- After Section -->
      <g transform="translate(310, 50)">
        <rect x="0" y="0" width="250" height="180" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="125" y="25" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">After: AI-Augmented</text>

        <!-- 2 people with AI assistant -->
        <g transform="translate(30, 60)">
          <circle cx="15" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M5 35 A10 10 0 0 1 25 35" stroke="currentColor" stroke-width="2" fill="none"/>
          <!-- Star badge for AI-enhanced -->
          <circle cx="30" cy="5" r="8" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1"/>
          <text x="30" y="8" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">AI</text>
        </g>
        <g transform="translate(80, 60)">
          <circle cx="15" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M5 35 A10 10 0 0 1 25 35" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="30" cy="5" r="8" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1"/>
          <text x="30" y="8" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">AI</text>
        </g>

        <!-- Multiplied Output -->
        <rect x="145" y="55" width="90" height="80" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="190" y="90" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="currentColor" text-anchor="middle">3x</text>
        <text x="190" y="115" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.6">Output</text>

        <!-- Efficiency gain bars -->
        <g transform="translate(30, 115)">
          <text x="0" y="0" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.6">Speed</text>
          <rect x="45" y="-8" width="60" height="10" rx="5" fill="currentColor" opacity="0.3"/>
        </g>
        <g transform="translate(30, 132)">
          <text x="0" y="0" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.6">Quality</text>
          <rect x="45" y="-8" width="50" height="10" rx="5" fill="currentColor" opacity="0.25"/>
        </g>
        <g transform="translate(30, 149)">
          <text x="0" y="0" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.6">Capacity</text>
          <rect x="45" y="-8" width="70" height="10" rx="5" fill="currentColor" opacity="0.35"/>
        </g>

        <!-- Bottom label -->
        <text x="125" y="170" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">2 FTEs + AI = 3x output</text>
      </g>

      <!-- Key Stat Callout -->
      <g transform="translate(300, 250)">
        <rect x="-120" y="-10" width="240" height="35" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="0" y="8" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">60% fewer FTEs, 3x the throughput</text>
        <text x="0" y="20" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Redeploy saved capacity to growth initiatives</text>
      </g>
    </svg>
  `,

  // ---------------------------------------------------------------------------
  // 90-day-data-roadmap: 90-day timeline roadmap with milestones at 30/60/90
  // ---------------------------------------------------------------------------
  '90-day-data-roadmap': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">90-Day Data Transformation Roadmap</text>

      <!-- Main Timeline -->
      <line x1="50" y1="140" x2="550" y2="140" stroke="currentColor" stroke-width="3"/>

      <!-- Progress fill -->
      <line x1="50" y1="140" x2="550" y2="140" stroke="currentColor" stroke-width="3" stroke-dasharray="500" opacity="0.2"/>

      <!-- Start marker -->
      <circle cx="50" cy="140" r="8" fill="currentColor"/>
      <text x="50" y="165" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Start</text>

      <!-- Day 30 Milestone -->
      <g transform="translate(217, 140)">
        <circle cx="0" cy="0" r="20" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="0" y="5" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">30</text>

        <!-- Milestone box above -->
        <rect x="-70" y="-110" width="140" height="70" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="0" y="-85" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Phase 1: Assess</text>
        <line x1="-60" y1="-72" x2="60" y2="-72" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <text x="0" y="-57" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Data inventory</text>
        <text x="0" y="-45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">System mapping</text>
        <line x1="0" y1="-35" x2="0" y2="-20" stroke="currentColor" stroke-width="1.5"/>
      </g>

      <!-- Day 60 Milestone -->
      <g transform="translate(383, 140)">
        <circle cx="0" cy="0" r="20" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="0" y="5" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">60</text>

        <!-- Milestone box below -->
        <rect x="-70" y="35" width="140" height="70" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <line x1="0" y1="20" x2="0" y2="35" stroke="currentColor" stroke-width="1.5"/>
        <text x="0" y="55" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Phase 2: Build</text>
        <line x1="-60" y1="63" x2="60" y2="63" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <text x="0" y="78" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Data pipelines</text>
        <text x="0" y="90" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Quality rules</text>
      </g>

      <!-- Day 90 Milestone -->
      <g transform="translate(550, 140)">
        <circle cx="0" cy="0" r="24" stroke="currentColor" stroke-width="3" fill="none"/>
        <circle cx="0" cy="0" r="16" fill="currentColor" opacity="0.2"/>
        <text x="0" y="5" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">90</text>

        <!-- Milestone box above -->
        <rect x="-70" y="-110" width="140" height="70" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="0" y="-85" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Phase 3: Deploy</text>
        <line x1="-60" y1="-72" x2="60" y2="-72" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <text x="0" y="-57" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Dashboards live</text>
        <text x="0" y="-45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Team trained</text>
        <line x1="0" y1="-35" x2="0" y2="-24" stroke="currentColor" stroke-width="1.5"/>

        <!-- Success flag -->
        <path d="M18 -115 L18 -75 M18 -115 L35 -105 L18 -95" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/>
      </g>

      <!-- Phase connectors -->
      <path d="M237 140 L363 140" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <path d="M403 140 L526 140" stroke="currentColor" stroke-width="2" opacity="0.4"/>

      <!-- Key deliverables section -->
      <g transform="translate(50, 250)">
        <rect x="0" y="-15" width="500" height="40" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
        <text x="15" y="5" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor">Key Deliverables:</text>
        <text x="120" y="5" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Data Strategy Doc</text>
        <circle cx="108" cy="2" r="3" fill="currentColor" opacity="0.5"/>
        <text x="250" y="5" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Integration Architecture</text>
        <circle cx="238" cy="2" r="3" fill="currentColor" opacity="0.5"/>
        <text x="400" y="5" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Working Dashboards</text>
        <circle cx="388" cy="2" r="3" fill="currentColor" opacity="0.5"/>
        <text x="250" y="20" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.5">Quick wins every 30 days maintain momentum and stakeholder buy-in</text>
      </g>
    </svg>
  `,

  // ---------------------------------------------------------------------------
  // supply-chain-visibility-playbook: Supply chain early warning system diagram
  // ---------------------------------------------------------------------------
  'supply-chain-visibility-playbook': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Supply Chain Early Warning System</text>

      <!-- Supply Chain Flow - Background -->
      <path d="M50 150 L550 150" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.2"/>

      <!-- Node 1: Suppliers -->
      <g transform="translate(70, 110)">
        <rect x="0" y="0" width="80" height="80" rx="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="40" y="35" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Suppliers</text>
        <circle cx="40" cy="55" r="12" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="40" y="59" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">15</text>
        <!-- Alert indicator -->
        <circle cx="70" cy="10" r="8" fill="currentColor" opacity="0.3"/>
        <text x="70" y="13" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">!</text>
      </g>

      <!-- Arrow 1 -->
      <g transform="translate(155, 140)">
        <path d="M0 10 L30 10" stroke="currentColor" stroke-width="1.5"/>
        <polygon points="35,10 28,6 28,14" fill="currentColor"/>
      </g>

      <!-- Node 2: Logistics -->
      <g transform="translate(200, 110)">
        <rect x="0" y="0" width="80" height="80" rx="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="40" y="35" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Logistics</text>
        <!-- Truck icon simplified -->
        <rect x="20" y="48" width="40" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
        <circle cx="28" cy="68" r="5" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
        <circle cx="52" cy="68" r="5" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      </g>

      <!-- Arrow 2 -->
      <g transform="translate(285, 140)">
        <path d="M0 10 L30 10" stroke="currentColor" stroke-width="1.5"/>
        <polygon points="35,10 28,6 28,14" fill="currentColor"/>
      </g>

      <!-- Node 3: Warehouse (Central) -->
      <g transform="translate(330, 100)">
        <rect x="0" y="0" width="100" height="100" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="50" y="30" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Warehouse</text>
        <!-- Inventory bars -->
        <rect x="15" y="45" width="12" height="35" rx="2" stroke="currentColor" stroke-width="1" fill="none"/>
        <rect x="15" y="55" width="12" height="25" fill="currentColor" opacity="0.3"/>
        <rect x="35" y="45" width="12" height="35" rx="2" stroke="currentColor" stroke-width="1" fill="none"/>
        <rect x="35" y="50" width="12" height="30" fill="currentColor" opacity="0.4"/>
        <rect x="55" y="45" width="12" height="35" rx="2" stroke="currentColor" stroke-width="1" fill="none"/>
        <rect x="55" y="60" width="12" height="20" fill="currentColor" opacity="0.2"/>
        <rect x="75" y="45" width="12" height="35" rx="2" stroke="currentColor" stroke-width="1" fill="none"/>
        <rect x="75" y="48" width="12" height="32" fill="currentColor" opacity="0.5"/>
        <text x="50" y="92" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Inventory Levels</text>
      </g>

      <!-- Arrow 3 -->
      <g transform="translate(435, 140)">
        <path d="M0 10 L30 10" stroke="currentColor" stroke-width="1.5"/>
        <polygon points="35,10 28,6 28,14" fill="currentColor"/>
      </g>

      <!-- Node 4: Customers -->
      <g transform="translate(480, 110)">
        <rect x="0" y="0" width="80" height="80" rx="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="40" y="35" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Customers</text>
        <!-- Demand indicator -->
        <path d="M20 70 L35 55 L50 60 L60 50" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="60" cy="50" r="4" fill="currentColor" opacity="0.5"/>
      </g>

      <!-- Alert System Panel -->
      <g transform="translate(100, 220)">
        <rect x="0" y="0" width="400" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="200" y="18" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">Early Warning Signals</text>

        <!-- Alert types -->
        <g transform="translate(25, 30)">
          <circle cx="8" cy="8" r="6" fill="currentColor" opacity="0.8"/>
          <text x="20" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Lead time delays</text>
        </g>
        <g transform="translate(140, 30)">
          <circle cx="8" cy="8" r="6" fill="currentColor" opacity="0.5"/>
          <text x="20" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Low stock alerts</text>
        </g>
        <g transform="translate(255, 30)">
          <circle cx="8" cy="8" r="6" fill="currentColor" opacity="0.3"/>
          <text x="20" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Demand spikes</text>
        </g>
      </g>

      <!-- Monitoring connections -->
      <path d="M110 200 L110 220" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" opacity="0.4"/>
      <path d="M240 190 L240 220" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" opacity="0.4"/>
      <path d="M380 200 L380 220" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" opacity="0.4"/>
      <path d="M520 190 L470 220" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" opacity="0.4"/>
    </svg>
  `,

  // ---------------------------------------------------------------------------
  // erp-integration-guide: ERP integration architecture showing connected systems
  // ---------------------------------------------------------------------------
  'erp-integration-guide': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">ERP Integration Architecture</text>

      <!-- Central ERP System -->
      <rect x="220" y="100" width="160" height="100" rx="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <text x="300" y="135" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle">ERP</text>
      <text x="300" y="155" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Central System</text>
      <!-- Core modules -->
      <g transform="translate(235, 165)">
        <rect x="0" y="0" width="40" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="20" y="14" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Finance</text>
      </g>
      <g transform="translate(280, 165)">
        <rect x="0" y="0" width="40" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="20" y="14" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Ops</text>
      </g>
      <g transform="translate(325, 165)">
        <rect x="0" y="0" width="40" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="20" y="14" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">HR</text>
      </g>

      <!-- Integration Layer Ring -->
      <circle cx="300" cy="150" r="100" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" fill="none" opacity="0.3"/>
      <text x="300" y="58" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.5">Integration Layer</text>

      <!-- Top Left: CRM -->
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="90" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="45" y="28" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">CRM</text>
        <text x="45" y="45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Customer Data</text>
      </g>
      <path d="M150 70 L220 110" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <polygon points="220,110 212,104 214,113" fill="currentColor" opacity="0.6"/>

      <!-- Top Right: E-Commerce -->
      <g transform="translate(450, 40)">
        <rect x="0" y="0" width="90" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="45" y="28" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">E-Commerce</text>
        <text x="45" y="45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Orders</text>
      </g>
      <path d="M450 70 L380 110" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <polygon points="380,110 388,104 386,113" fill="currentColor" opacity="0.6"/>

      <!-- Left: MES -->
      <g transform="translate(20, 120)">
        <rect x="0" y="0" width="90" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="45" y="28" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">MES</text>
        <text x="45" y="45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Production</text>
      </g>
      <path d="M110 150 L220 150" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <polygon points="220,150 210,145 210,155" fill="currentColor" opacity="0.6"/>

      <!-- Right: WMS -->
      <g transform="translate(490, 120)">
        <rect x="0" y="0" width="90" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="45" y="28" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">WMS</text>
        <text x="45" y="45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Inventory</text>
      </g>
      <path d="M490 150 L380 150" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <polygon points="380,150 390,145 390,155" fill="currentColor" opacity="0.6"/>

      <!-- Bottom Left: Quality -->
      <g transform="translate(60, 200)">
        <rect x="0" y="0" width="90" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="45" y="28" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">QMS</text>
        <text x="45" y="45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Quality</text>
      </g>
      <path d="M150 230 L220 190" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <polygon points="220,190 212,196 214,187" fill="currentColor" opacity="0.6"/>

      <!-- Bottom Right: BI/Analytics -->
      <g transform="translate(450, 200)">
        <rect x="0" y="0" width="90" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="45" y="28" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">BI Platform</text>
        <text x="45" y="45" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Analytics</text>
      </g>
      <path d="M450 230 L380 190" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <polygon points="380,190 388,196 386,187" fill="currentColor" opacity="0.6"/>

      <!-- Data flow indicators -->
      <g transform="translate(230, 275)">
        <text x="70" y="0" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Bidirectional data sync via APIs and middleware</text>
        <line x1="-30" y1="8" x2="20" y2="8" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <polygon points="25,8 18,5 18,11" fill="currentColor" opacity="0.3"/>
        <line x1="170" y1="8" x2="120" y2="8" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <polygon points="115,8 122,5 122,11" fill="currentColor" opacity="0.3"/>
      </g>
    </svg>
  `,
};

// =============================================================================
// HELPER FUNCTION
// =============================================================================

/**
 * Get manufacturing diagram SVG for a guide slug
 * @param {string} slug - The guide slug
 * @returns {string|null} SVG string or null if not found
 */
export function getManufacturingDiagram(slug) {
  const diagram = MANUFACTURING_DIAGRAMS[slug];
  if (!diagram) {
    console.warn(`No manufacturing diagram found for slug: ${slug}`);
    return null;
  }
  return diagram.trim();
}

/**
 * Check if a manufacturing diagram exists for a given slug
 * @param {string} slug - The guide slug
 * @returns {boolean} True if diagram exists
 */
export function hasManufacturingDiagram(slug) {
  return slug in MANUFACTURING_DIAGRAMS;
}

// Export default for convenience
export default {
  MANUFACTURING_DIAGRAMS,
  getManufacturingDiagram,
  hasManufacturingDiagram,
};

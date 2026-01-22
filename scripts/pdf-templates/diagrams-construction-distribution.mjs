/**
 * SVG Diagrams for Construction and Distribution Industry PDF Guides
 *
 * Each diagram is approximately 600px wide x 300px tall and uses 'currentColor'
 * for strokes so colors can be applied via CSS.
 *
 * Construction Guides:
 * - project-visibility-playbook: System connection map showing integrated project data
 * - change-order-recovery: Change order lifecycle diagram
 * - construction-post-acquisition: Unified reporting structure diagram
 *
 * Distribution Guides:
 * - inventory-intelligence-guide: Inventory optimization curve
 * - customer-profitability-distribution: Profitability matrix (customers vs profit)
 * - pricing-discipline-distribution: Margin protection flow diagram
 * - distribution-labor-shortage-playbook: Productivity gains visual
 * - distribution-tariff-response-guide: Tariff response timeline
 */

// =============================================================================
// CONSTRUCTION DIAGRAMS
// =============================================================================

/**
 * Project Visibility Playbook: System connection map showing integrated project data
 * Shows disparate systems (Estimating, Scheduling, Field Apps, Accounting) connecting
 * to a central unified visibility layer
 */
function createProjectVisibilityDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Unified Project Visibility</text>

    <!-- Source Systems (Left side) -->
    <g transform="translate(40, 60)">
      <!-- Estimating System Box -->
      <rect x="0" y="0" width="100" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="50" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">ESTIMATING</text>
      <text x="50" y="32" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Bid data, costs</text>

      <!-- Scheduling System Box -->
      <rect x="0" y="55" width="100" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="50" y="73" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">SCHEDULING</text>
      <text x="50" y="87" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Timelines, crews</text>

      <!-- Field Apps Box -->
      <rect x="0" y="110" width="100" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="50" y="128" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">FIELD APPS</text>
      <text x="50" y="142" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Daily logs, photos</text>

      <!-- Accounting Box -->
      <rect x="0" y="165" width="100" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="50" y="183" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">ACCOUNTING</text>
      <text x="50" y="197" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Invoices, costs</text>
    </g>

    <!-- Connection Lines to Integration Layer -->
    <g stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5">
      <line x1="140" y1="82" x2="200" y2="150"/>
      <line x1="140" y1="137" x2="200" y2="150"/>
      <line x1="140" y1="192" x2="200" y2="150"/>
      <line x1="140" y1="247" x2="200" y2="150"/>
    </g>

    <!-- Central Integration Layer -->
    <g transform="translate(200, 100)">
      <rect x="0" y="0" width="200" height="100" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="0" y="0" width="200" height="100" rx="8" fill="currentColor" opacity="0.05"/>
      <text x="100" y="35" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">DATA INTEGRATION LAYER</text>
      <text x="100" y="55" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">Real-time sync</text>
      <text x="100" y="70" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">Automated reconciliation</text>
      <text x="100" y="85" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">Single source of truth</text>
    </g>

    <!-- Connection Lines to Output -->
    <g stroke="currentColor" stroke-width="1.5" opacity="0.5">
      <line x1="400" y1="150" x2="440" y2="90"/>
      <line x1="400" y1="150" x2="440" y2="150"/>
      <line x1="400" y1="150" x2="440" y2="210"/>
    </g>

    <!-- Output Dashboards (Right side) -->
    <g transform="translate(440, 50)">
      <!-- Project Dashboard -->
      <rect x="0" y="0" width="120" height="60" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="120" height="60" rx="4" fill="currentColor" opacity="0.03"/>
      <text x="60" y="20" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">PROJECT DASHBOARD</text>
      <!-- Mini chart bars -->
      <rect x="15" y="30" width="12" height="20" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="32" y="35" width="12" height="15" rx="2" fill="currentColor" opacity="0.4"/>
      <rect x="49" y="28" width="12" height="22" rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="66" y="32" width="12" height="18" rx="2" fill="currentColor" opacity="0.4"/>
      <rect x="83" y="26" width="12" height="24" rx="2" fill="currentColor" opacity="0.6"/>
    </g>

    <g transform="translate(440, 120)">
      <!-- Cost Tracking -->
      <rect x="0" y="0" width="120" height="60" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="120" height="60" rx="4" fill="currentColor" opacity="0.03"/>
      <text x="60" y="20" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">COST TRACKING</text>
      <!-- Donut chart -->
      <circle cx="60" cy="40" r="12" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/>
      <circle cx="60" cy="40" r="12" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="50 75" stroke-dashoffset="20"/>
    </g>

    <g transform="translate(440, 190)">
      <!-- Alerts -->
      <rect x="0" y="0" width="120" height="60" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="120" height="60" rx="4" fill="currentColor" opacity="0.03"/>
      <text x="60" y="20" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">PROACTIVE ALERTS</text>
      <!-- Alert icons -->
      <circle cx="35" cy="40" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="35" y="44" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle">!</text>
      <rect x="55" y="34" width="40" height="4" rx="2" fill="currentColor" opacity="0.4"/>
      <rect x="55" y="42" width="30" height="4" rx="2" fill="currentColor" opacity="0.3"/>
    </g>

    <!-- Arrows indicating flow -->
    <polygon points="196,150 186,145 186,155" fill="currentColor" opacity="0.5"/>
    <polygon points="444,90 434,85 434,95" fill="currentColor" opacity="0.5"/>
    <polygon points="444,150 434,145 434,155" fill="currentColor" opacity="0.5"/>
    <polygon points="444,210 434,205 434,215" fill="currentColor" opacity="0.5"/>

    <!-- Bottom label -->
    <text x="300" y="285" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.6">From hours of data hunting to instant project answers</text>
  </svg>`;
}

/**
 * Change Order Recovery: Change order lifecycle diagram
 * Shows the flow from field work to billing, highlighting where change orders get lost
 */
function createChangeOrderRecoveryDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Change Order Lifecycle</text>

    <!-- Timeline base -->
    <line x1="50" y1="150" x2="550" y2="150" stroke="currentColor" stroke-width="2" opacity="0.3"/>

    <!-- Stage 1: Field Work -->
    <g transform="translate(70, 90)">
      <circle cx="0" cy="60" r="20" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="0" cy="60" r="20" fill="currentColor" opacity="0.1"/>
      <text x="0" y="65" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">1</text>
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">FIELD WORK</text>
      <text x="0" y="14" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Work identified</text>
      <text x="0" y="25" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Super approves</text>
    </g>

    <!-- Arrow 1 -->
    <g transform="translate(105, 150)">
      <line x1="0" y1="0" x2="50" y2="0" stroke="currentColor" stroke-width="2" opacity="0.5"/>
      <polygon points="50,0 42,-4 42,4" fill="currentColor" opacity="0.5"/>
    </g>

    <!-- Stage 2: Documentation - RISK ZONE -->
    <g transform="translate(180, 90)">
      <circle cx="0" cy="60" r="20" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="3 2"/>
      <circle cx="0" cy="60" r="20" fill="currentColor" opacity="0.05"/>
      <text x="0" y="65" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">2</text>
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">DOCUMENTATION</text>
      <text x="0" y="14" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Paperwork filed</text>
      <!-- Warning indicator -->
      <rect x="-30" y="95" width="60" height="18" rx="3" fill="currentColor" opacity="0.15"/>
      <text x="0" y="107" font-family="Inter, sans-serif" font-size="7" font-weight="600" fill="currentColor" text-anchor="middle">RISK ZONE</text>
    </g>

    <!-- Arrow 2 with gap indicator -->
    <g transform="translate(215, 150)">
      <line x1="0" y1="0" x2="20" y2="0" stroke="currentColor" stroke-width="2" opacity="0.5"/>
      <line x1="35" y1="0" x2="55" y2="0" stroke="currentColor" stroke-width="2" opacity="0.5" stroke-dasharray="3 2"/>
      <text x="27" y="-8" font-family="Inter, sans-serif" font-size="16" fill="currentColor" text-anchor="middle">?</text>
    </g>

    <!-- Stage 3: Review -->
    <g transform="translate(295, 90)">
      <circle cx="0" cy="60" r="20" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="3 2"/>
      <circle cx="0" cy="60" r="20" fill="currentColor" opacity="0.05"/>
      <text x="0" y="65" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">3</text>
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">REVIEW</text>
      <text x="0" y="14" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">PM approval</text>
      <!-- Warning indicator -->
      <rect x="-30" y="95" width="60" height="18" rx="3" fill="currentColor" opacity="0.15"/>
      <text x="0" y="107" font-family="Inter, sans-serif" font-size="7" font-weight="600" fill="currentColor" text-anchor="middle">RISK ZONE</text>
    </g>

    <!-- Arrow 3 -->
    <g transform="translate(330, 150)">
      <line x1="0" y1="0" x2="20" y2="0" stroke="currentColor" stroke-width="2" opacity="0.5"/>
      <line x1="35" y1="0" x2="55" y2="0" stroke="currentColor" stroke-width="2" opacity="0.5" stroke-dasharray="3 2"/>
      <text x="27" y="-8" font-family="Inter, sans-serif" font-size="16" fill="currentColor" text-anchor="middle">?</text>
    </g>

    <!-- Stage 4: Billing -->
    <g transform="translate(410, 90)">
      <circle cx="0" cy="60" r="20" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="0" cy="60" r="20" fill="currentColor" opacity="0.1"/>
      <text x="0" y="65" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">4</text>
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">BILLING</text>
      <text x="0" y="14" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Invoice created</text>
    </g>

    <!-- Arrow 4 -->
    <g transform="translate(445, 150)">
      <line x1="0" y1="0" x2="50" y2="0" stroke="currentColor" stroke-width="2" opacity="0.5"/>
      <polygon points="50,0 42,-4 42,4" fill="currentColor" opacity="0.5"/>
    </g>

    <!-- Stage 5: Revenue -->
    <g transform="translate(520, 90)">
      <circle cx="0" cy="60" r="20" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="0" cy="60" r="20" fill="currentColor" opacity="0.15"/>
      <text x="0" y="65" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle">$</text>
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">REVENUE</text>
      <text x="0" y="14" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Cash collected</text>
    </g>

    <!-- Lost Revenue Callout -->
    <g transform="translate(180, 200)">
      <rect x="0" y="0" width="230" height="70" rx="6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <rect x="0" y="0" width="230" height="70" rx="6" fill="currentColor" opacity="0.03"/>
      <text x="115" y="22" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">WITHOUT TRACKING:</text>
      <text x="115" y="40" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">2-5% of revenue lost</text>
      <text x="115" y="56" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">$600K-$1.5M annually on $30M operation</text>
    </g>

    <!-- With Tracking Callout -->
    <g transform="translate(430, 200)">
      <rect x="0" y="0" width="130" height="70" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="0" y="0" width="130" height="70" rx="6" fill="currentColor" opacity="0.08"/>
      <text x="65" y="22" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">WITH TRACKING:</text>
      <text x="65" y="42" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle">95%+</text>
      <text x="65" y="58" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">capture rate</text>
    </g>
  </svg>`;
}

/**
 * Construction Post-Acquisition: Unified reporting structure diagram
 * Shows two acquired companies connecting to unified reporting without full system migration
 */
function createConstructionPostAcquisitionDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Unified Reporting Without System Migration</text>

    <!-- Company A Box -->
    <g transform="translate(40, 55)">
      <rect x="0" y="0" width="150" height="120" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="150" height="25" rx="6" fill="currentColor" opacity="0.1"/>
      <rect x="0" y="25" width="150" height="1" fill="currentColor" opacity="0.1"/>
      <text x="75" y="17" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">COMPANY A</text>

      <!-- Systems -->
      <rect x="10" y="35" width="60" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="40" y="48" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.8">ERP System 1</text>

      <rect x="80" y="35" width="60" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="110" y="48" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.8">Scheduling</text>

      <rect x="10" y="60" width="60" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="40" y="73" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.8">Job Costing</text>

      <rect x="80" y="60" width="60" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="110" y="73" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.8">Field Apps</text>

      <!-- Projects indicator -->
      <text x="75" y="100" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">47 Active Projects</text>
    </g>

    <!-- Company B Box -->
    <g transform="translate(40, 185)">
      <rect x="0" y="0" width="150" height="100" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="150" height="25" rx="6" fill="currentColor" opacity="0.1"/>
      <rect x="0" y="25" width="150" height="1" fill="currentColor" opacity="0.1"/>
      <text x="75" y="17" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">COMPANY B (Acquired)</text>

      <!-- Different systems -->
      <rect x="10" y="35" width="60" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="40" y="48" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.8">ERP System 2</text>

      <rect x="80" y="35" width="60" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <text x="110" y="48" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.8">PM Software</text>

      <text x="75" y="80" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">28 Active Projects</text>
    </g>

    <!-- Connection Lines -->
    <g stroke="currentColor" stroke-width="1.5" opacity="0.4">
      <path d="M190 115 Q230 115, 260 160" fill="none"/>
      <path d="M190 235 Q230 235, 260 185" fill="none"/>
    </g>

    <!-- Central Integration Hub -->
    <g transform="translate(260, 120)">
      <rect x="0" y="0" width="140" height="110" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="0" y="0" width="140" height="110" rx="8" fill="currentColor" opacity="0.06"/>

      <text x="70" y="25" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">INTEGRATION LAYER</text>

      <!-- Features -->
      <circle cx="20" cy="48" r="4" fill="currentColor" opacity="0.4"/>
      <text x="30" y="51" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Unified chart of accounts</text>

      <circle cx="20" cy="65" r="4" fill="currentColor" opacity="0.4"/>
      <text x="30" y="68" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Standardized cost codes</text>

      <circle cx="20" cy="82" r="4" fill="currentColor" opacity="0.4"/>
      <text x="30" y="85" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Automated sync</text>

      <circle cx="20" cy="99" r="4" fill="currentColor" opacity="0.4"/>
      <text x="30" y="102" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Exception handling</text>
    </g>

    <!-- Arrow to Output -->
    <line x1="400" y1="175" x2="440" y2="175" stroke="currentColor" stroke-width="2" opacity="0.5"/>
    <polygon points="445,175 437,170 437,180" fill="currentColor" opacity="0.5"/>

    <!-- Unified Reports -->
    <g transform="translate(450, 70)">
      <rect x="0" y="0" width="120" height="210" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="0" y="0" width="120" height="30" rx="6" fill="currentColor" opacity="0.1"/>
      <text x="60" y="20" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">UNIFIED VIEW</text>

      <!-- Combined metrics -->
      <text x="60" y="55" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">75 Projects</text>
      <text x="60" y="68" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Combined portfolio</text>

      <!-- Mini chart -->
      <rect x="15" y="80" width="90" height="50" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
      <polyline points="20,120 35,110 50,115 65,100 80,105 95,95" stroke="currentColor" stroke-width="1.5" fill="none"/>

      <!-- Report items -->
      <rect x="15" y="140" width="90" height="15" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="60" y="150" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Portfolio Dashboard</text>

      <rect x="15" y="160" width="90" height="15" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="60" y="170" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">P&L by Project</text>

      <rect x="15" y="180" width="90" height="15" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="60" y="190" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Cash Flow Forecast</text>
    </g>

    <!-- Timeline comparison -->
    <g transform="translate(115, 295)">
      <text x="0" y="0" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="start" opacity="0.5">Traditional: 18+ months</text>
      <text x="190" y="0" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="start">With integration layer: 4-6 weeks</text>
    </g>
  </svg>`;
}

// Export Construction diagrams
export const CONSTRUCTION_DIAGRAMS = {
  'project-visibility-playbook': createProjectVisibilityDiagram,
  'change-order-recovery': createChangeOrderRecoveryDiagram,
  'construction-post-acquisition': createConstructionPostAcquisitionDiagram,
};

/**
 * Get a construction diagram by slug
 * @param {string} slug - The guide slug
 * @returns {string|null} SVG string or null if not found
 */
export function getConstructionDiagram(slug) {
  const diagramFn = CONSTRUCTION_DIAGRAMS[slug];
  if (diagramFn) {
    return diagramFn();
  }
  return null;
}

// =============================================================================
// DISTRIBUTION DIAGRAMS
// =============================================================================

/**
 * Inventory Intelligence Guide: Inventory optimization curve
 * Shows the relationship between inventory levels, carrying costs, and stockout risk
 */
function createInventoryIntelligenceDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Inventory Optimization Balance</text>

    <!-- Y-axis -->
    <line x1="80" y1="260" x2="80" y2="50" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="40" y="155" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" transform="rotate(-90, 40, 155)">COST / RISK</text>

    <!-- X-axis -->
    <line x1="80" y1="260" x2="550" y2="260" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="315" y="290" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">INVENTORY LEVEL</text>

    <!-- Axis labels -->
    <text x="100" y="275" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Low</text>
    <text x="520" y="275" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">High</text>

    <!-- Carrying Cost Curve (rises with inventory) -->
    <path d="M100 240 Q200 230, 280 180 Q360 130, 450 80 Q500 60, 530 55" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
    <text x="540" y="60" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Carrying Cost</text>

    <!-- Stockout Risk Curve (falls with inventory) -->
    <path d="M100 60 Q180 70, 250 120 Q320 170, 400 210 Q460 235, 530 245" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="5 3" opacity="0.6"/>
    <text x="540" y="250" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Stockout Risk</text>

    <!-- Total Cost Curve (U-shape) -->
    <path d="M100 160 Q200 155, 280 150 Q315 148, 340 150 Q400 155, 480 170 Q520 185, 530 195" stroke="currentColor" stroke-width="3" fill="none"/>
    <text x="540" y="200" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor">Total Cost</text>

    <!-- Optimal Point -->
    <circle cx="315" cy="148" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="315" cy="148" r="4" fill="currentColor"/>

    <!-- Vertical line from optimal point -->
    <line x1="315" y1="156" x2="315" y2="260" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>

    <!-- Optimal Zone Highlight -->
    <rect x="265" y="145" width="100" height="110" rx="4" fill="currentColor" opacity="0.05"/>
    <rect x="265" y="145" width="100" height="110" rx="4" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" fill="none" opacity="0.3"/>

    <!-- Optimal Zone Label -->
    <text x="315" y="125" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor" text-anchor="middle">OPTIMAL ZONE</text>

    <!-- Dead Stock Zone -->
    <g transform="translate(450, 90)">
      <rect x="0" y="0" width="95" height="45" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4" stroke-dasharray="3 2"/>
      <text x="47" y="18" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.7">DEAD STOCK</text>
      <text x="47" y="32" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Cash tied up</text>
      <text x="47" y="42" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Storage costs</text>
    </g>

    <!-- Stockout Zone -->
    <g transform="translate(95, 65)">
      <rect x="0" y="0" width="80" height="45" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4" stroke-dasharray="3 2"/>
      <text x="40" y="18" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.7">STOCKOUTS</text>
      <text x="40" y="32" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Lost sales</text>
      <text x="40" y="42" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Customer churn</text>
    </g>

    <!-- Key insight -->
    <g transform="translate(80, 200)">
      <rect x="0" y="0" width="160" height="50" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="160" height="50" rx="4" fill="currentColor" opacity="0.05"/>
      <text x="80" y="18" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">DATA-DRIVEN REORDER</text>
      <text x="80" y="32" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Right product, right time</text>
      <text x="80" y="44" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Right quantity</text>
    </g>
  </svg>`;
}

/**
 * Customer Profitability Distribution: Profitability matrix
 * Shows customers plotted by revenue vs actual profitability
 */
function createCustomerProfitabilityDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Customer Profitability Matrix</text>

    <!-- Y-axis -->
    <line x1="100" y1="260" x2="100" y2="50" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="50" y="155" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" transform="rotate(-90, 50, 155)">PROFITABILITY</text>

    <!-- X-axis -->
    <line x1="100" y1="260" x2="550" y2="260" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="325" y="290" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">REVENUE</text>

    <!-- Axis labels -->
    <text x="60" y="60" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">High</text>
    <text x="60" y="255" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Low</text>
    <text x="120" y="275" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Low</text>
    <text x="530" y="275" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">High</text>

    <!-- Quadrant dividers -->
    <line x1="325" y1="50" x2="325" y2="260" stroke="currentColor" stroke-width="1" stroke-dasharray="5 5" opacity="0.2"/>
    <line x1="100" y1="155" x2="550" y2="155" stroke="currentColor" stroke-width="1" stroke-dasharray="5 5" opacity="0.2"/>

    <!-- Quadrant Labels -->
    <!-- Top Left: Hidden Gems -->
    <g transform="translate(115, 60)">
      <rect x="0" y="0" width="90" height="35" rx="4" fill="currentColor" opacity="0.08"/>
      <text x="45" y="15" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">HIDDEN GEMS</text>
      <text x="45" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Grow these accounts</text>
    </g>

    <!-- Top Right: Stars -->
    <g transform="translate(435, 60)">
      <rect x="0" y="0" width="100" height="35" rx="4" fill="currentColor" opacity="0.15"/>
      <text x="50" y="15" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">STAR CUSTOMERS</text>
      <text x="50" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Protect & nurture</text>
    </g>

    <!-- Bottom Left: Evaluate -->
    <g transform="translate(115, 220)">
      <rect x="0" y="0" width="90" height="35" rx="4" fill="currentColor" opacity="0.05"/>
      <text x="45" y="15" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">EVALUATE</text>
      <text x="45" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Fix or fire</text>
    </g>

    <!-- Bottom Right: Revenue Traps -->
    <g transform="translate(430, 220)">
      <rect x="0" y="0" width="105" height="35" rx="4" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" fill="none" opacity="0.5"/>
      <text x="52" y="15" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">REVENUE TRAPS</text>
      <text x="52" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Reprice or restructure</text>
    </g>

    <!-- Customer dots - Top Right (Stars) -->
    <circle cx="480" cy="90" r="12" fill="currentColor" opacity="0.6"/>
    <circle cx="450" cy="110" r="10" fill="currentColor" opacity="0.5"/>
    <circle cx="510" cy="130" r="8" fill="currentColor" opacity="0.4"/>

    <!-- Customer dots - Top Left (Hidden Gems) -->
    <circle cx="180" cy="100" r="7" fill="currentColor" opacity="0.4"/>
    <circle cx="220" cy="120" r="6" fill="currentColor" opacity="0.35"/>
    <circle cx="160" cy="130" r="5" fill="currentColor" opacity="0.3"/>

    <!-- Customer dots - Bottom Right (Revenue Traps) -->
    <circle cx="460" cy="200" r="14" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
    <circle cx="500" cy="220" r="11" stroke="currentColor" stroke-width="2" fill="none" opacity="0.4"/>
    <circle cx="420" cy="230" r="9" stroke="currentColor" stroke-width="2" fill="none" opacity="0.35"/>

    <!-- Customer dots - Bottom Left (Evaluate) -->
    <circle cx="170" cy="200" r="5" fill="currentColor" opacity="0.2"/>
    <circle cx="200" cy="220" r="4" fill="currentColor" opacity="0.15"/>
    <circle cx="150" cy="230" r="6" fill="currentColor" opacity="0.2"/>

    <!-- Insight callout -->
    <g transform="translate(240, 165)">
      <rect x="0" y="0" width="170" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="170" height="55" rx="4" fill="currentColor" opacity="0.05"/>
      <text x="85" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">THE INSIGHT</text>
      <text x="85" y="34" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.8">Your biggest customer</text>
      <text x="85" y="47" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.8">may not be your best</text>
    </g>

    <!-- Legend -->
    <g transform="translate(120, 105)">
      <circle cx="5" cy="5" r="5" fill="currentColor" opacity="0.4"/>
      <text x="15" y="8" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.7">Profitable</text>
    </g>
    <g transform="translate(120, 120)">
      <circle cx="5" cy="5" r="5" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
      <text x="15" y="8" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.7">Cost-to-serve exceeds margin</text>
    </g>
  </svg>`;
}

/**
 * Pricing Discipline Distribution: Margin protection flow diagram
 * Shows the pricing approval workflow with guardrails
 */
function createPricingDisciplineDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Pricing Guardrails Flow</text>

    <!-- Start: Quote Request -->
    <g transform="translate(40, 80)">
      <rect x="0" y="0" width="90" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="90" height="50" rx="6" fill="currentColor" opacity="0.05"/>
      <text x="45" y="22" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">QUOTE</text>
      <text x="45" y="36" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Sales rep enters</text>
    </g>

    <!-- Arrow to check -->
    <line x1="130" y1="105" x2="165" y2="105" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <polygon points="170,105 162,100 162,110" fill="currentColor" opacity="0.5"/>

    <!-- Decision: Margin Check -->
    <g transform="translate(170, 70)">
      <polygon points="55,0 110,35 55,70 0,35" stroke="currentColor" stroke-width="2" fill="none"/>
      <polygon points="55,0 110,35 55,70 0,35" fill="currentColor" opacity="0.08"/>
      <text x="55" y="32" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">MARGIN</text>
      <text x="55" y="44" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">CHECK</text>
    </g>

    <!-- Yes path (above floor) -->
    <g transform="translate(280, 60)">
      <line x1="0" y1="45" x2="40" y2="45" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
      <polygon points="45,45 37,40 37,50" fill="currentColor" opacity="0.5"/>
      <text x="22" y="38" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Above floor</text>
    </g>

    <!-- Auto-approve box -->
    <g transform="translate(330, 80)">
      <rect x="0" y="0" width="90" height="50" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="0" y="0" width="90" height="50" rx="6" fill="currentColor" opacity="0.12"/>
      <text x="45" y="22" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">AUTO</text>
      <text x="45" y="36" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">APPROVE</text>
    </g>

    <!-- No path (below floor) -->
    <g transform="translate(225, 140)">
      <line x1="0" y1="0" x2="0" y2="35" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
      <polygon points="0,40 -5,32 5,32" fill="currentColor" opacity="0.5"/>
      <text x="35" y="20" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="start" opacity="0.7">Below floor</text>
    </g>

    <!-- Escalation box -->
    <g transform="translate(170, 180)">
      <rect x="0" y="0" width="110" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
      <rect x="0" y="0" width="110" height="50" rx="6" fill="currentColor" opacity="0.05"/>
      <text x="55" y="22" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">ESCALATION</text>
      <text x="55" y="36" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Manager review</text>
    </g>

    <!-- Arrow from escalation -->
    <line x1="280" y1="205" x2="325" y2="205" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <polygon points="330,205 322,200 322,210" fill="currentColor" opacity="0.5"/>

    <!-- Override or Adjust -->
    <g transform="translate(330, 170)">
      <rect x="0" y="0" width="90" height="70" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="90" height="70" rx="6" fill="currentColor" opacity="0.05"/>
      <text x="45" y="20" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">DECISION</text>
      <text x="45" y="38" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Override with</text>
      <text x="45" y="50" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">documentation</text>
      <text x="45" y="62" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">OR adjust price</text>
    </g>

    <!-- Arrow to customer -->
    <line x1="420" y1="105" x2="455" y2="105" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <line x1="420" y1="205" x2="455" y2="150" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <polygon points="460,105 452,100 452,110" fill="currentColor" opacity="0.5"/>

    <!-- Customer / Quote Sent -->
    <g transform="translate(460, 80)">
      <rect x="0" y="0" width="100" height="50" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="0" y="0" width="100" height="50" rx="6" fill="currentColor" opacity="0.1"/>
      <text x="50" y="22" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">QUOTE SENT</text>
      <text x="50" y="36" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Protected margin</text>
    </g>

    <!-- Floor Line Indicator -->
    <g transform="translate(40, 255)">
      <rect x="0" y="0" width="520" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
      <rect x="0" y="0" width="520" height="35" rx="4" fill="currentColor" opacity="0.03"/>

      <text x="20" y="15" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" opacity="0.8">CONFIGURABLE GUARDRAILS:</text>

      <text x="20" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.6">Min margin by product</text>
      <text x="130" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.6">Customer tier rules</text>
      <text x="240" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.6">Volume exceptions</text>
      <text x="340" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.6">Approval thresholds</text>
      <text x="450" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.6">Audit trail</text>
    </g>
  </svg>`;
}

/**
 * Distribution Labor Shortage Playbook: Productivity gains visual
 * Shows how automation multiplies workforce effectiveness
 */
function createLaborShortagePlaybookDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Productivity Multiplier Effect</text>

    <!-- Before Section -->
    <g transform="translate(50, 60)">
      <text x="80" y="0" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">BEFORE</text>
      <text x="80" y="14" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Manual processes</text>

      <!-- Workers doing manual tasks -->
      <g transform="translate(0, 30)">
        <!-- Person 1 -->
        <circle cx="30" cy="20" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="30" cy="12" r="5" stroke="currentColor" stroke-width="1" fill="none"/>

        <!-- Person 2 -->
        <circle cx="80" cy="20" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="80" cy="12" r="5" stroke="currentColor" stroke-width="1" fill="none"/>

        <!-- Person 3 -->
        <circle cx="130" cy="20" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="130" cy="12" r="5" stroke="currentColor" stroke-width="1" fill="none"/>
      </g>

      <!-- Tasks below -->
      <g transform="translate(0, 90)">
        <rect x="5" y="0" width="50" height="25" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        <text x="30" y="16" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Data entry</text>

        <rect x="55" y="0" width="50" height="25" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        <text x="80" y="16" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Checking</text>

        <rect x="105" y="0" width="50" height="25" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        <text x="130" y="16" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Reporting</text>
      </g>

      <!-- Output indicator -->
      <g transform="translate(0, 140)">
        <rect x="30" y="0" width="100" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="80" y="13" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">OUTPUT</text>
        <rect x="40" y="18" width="80" height="8" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="40" y="18" width="32" height="8" rx="2" fill="currentColor" opacity="0.4"/>
      </g>

      <text x="80" y="190" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">3 FTEs = 1x capacity</text>
    </g>

    <!-- Arrow -->
    <g transform="translate(215, 140)">
      <line x1="0" y1="0" x2="50" y2="0" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <polygon points="55,0 45,-5 45,5" fill="currentColor" opacity="0.4"/>
      <text x="27" y="-10" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Automation</text>
    </g>

    <!-- After Section -->
    <g transform="translate(280, 60)">
      <text x="135" y="0" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle">AFTER</text>
      <text x="135" y="14" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Automated workflows</text>

      <!-- Automation System -->
      <g transform="translate(0, 30)">
        <rect x="60" y="0" width="150" height="55" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="60" y="0" width="150" height="55" rx="6" fill="currentColor" opacity="0.08"/>
        <text x="135" y="22" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">INTELLIGENT AUTOMATION</text>

        <!-- Automated tasks -->
        <rect x="70" y="32" width="40" height="15" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="115" y="32" width="40" height="15" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="160" y="32" width="40" height="15" rx="2" fill="currentColor" opacity="0.2"/>
      </g>

      <!-- Workers focus on high-value -->
      <g transform="translate(0, 100)">
        <!-- Person with impact multiplier -->
        <circle cx="135" cy="20" r="15" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="135" cy="10" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>

        <!-- Expanded circles showing impact -->
        <circle cx="135" cy="20" r="25" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" fill="none" opacity="0.3"/>
        <circle cx="135" cy="20" r="35" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" fill="none" opacity="0.2"/>
      </g>

      <!-- Output indicator - much larger -->
      <g transform="translate(60, 140)">
        <rect x="0" y="0" width="150" height="30" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="0" y="0" width="150" height="30" rx="4" fill="currentColor" opacity="0.1"/>
        <text x="75" y="13" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">OUTPUT</text>
        <rect x="10" y="18" width="130" height="8" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="10" y="18" width="110" height="8" rx="2" fill="currentColor" opacity="0.5"/>
      </g>

      <text x="135" y="190" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">Same team = 3-4x capacity</text>
    </g>

    <!-- Key metrics at bottom -->
    <g transform="translate(80, 235)">
      <rect x="0" y="0" width="440" height="50" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>

      <g transform="translate(30, 12)">
        <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor">76%</text>
        <text x="0" y="14" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.7">report labor shortage</text>
      </g>

      <g transform="translate(140, 12)">
        <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor">60%</text>
        <text x="0" y="14" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.7">longer fulfillment</text>
      </g>

      <g transform="translate(240, 12)">
        <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="currentColor">40%</text>
        <text x="0" y="14" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.7">waste on manual tasks</text>
      </g>

      <g transform="translate(345, 12)">
        <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="currentColor">3-4x</text>
        <text x="0" y="14" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.7">productivity gain</text>
      </g>
    </g>
  </svg>`;
}

/**
 * Distribution Tariff Response Guide: Tariff response timeline
 * Shows the rapid response workflow when tariffs are announced
 */
function createTariffResponseDiagram() {
  return `<svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Title -->
    <text x="300" y="24" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Tariff Response Timeline</text>

    <!-- Timeline base -->
    <line x1="50" y1="140" x2="560" y2="140" stroke="currentColor" stroke-width="2" opacity="0.3"/>

    <!-- Day 0: Announcement -->
    <g transform="translate(70, 60)">
      <rect x="-25" y="75" width="50" height="10" rx="2" fill="currentColor" opacity="0.3"/>
      <circle cx="0" cy="80" r="6" fill="currentColor"/>

      <rect x="-40" y="0" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="-40" y="0" width="80" height="55" rx="4" fill="currentColor" opacity="0.08"/>
      <text x="0" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">ANNOUNCEMENT</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">6 PM Friday</text>
      <text x="0" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">25% tariff on steel</text>

      <text x="0" y="105" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">DAY 0</text>
    </g>

    <!-- Day 1: Analysis -->
    <g transform="translate(170, 60)">
      <line x1="-50" y1="80" x2="-25" y2="80" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <rect x="-25" y="75" width="50" height="10" rx="2" fill="currentColor" opacity="0.4"/>
      <circle cx="0" cy="80" r="6" fill="currentColor"/>

      <rect x="-40" y="0" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="-40" y="0" width="80" height="55" rx="4" fill="currentColor" opacity="0.05"/>
      <text x="0" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">ANALYSIS</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Impact assessment</text>
      <text x="0" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Affected SKUs</text>

      <text x="0" y="105" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">DAY 1</text>
    </g>

    <!-- Day 2-3: Strategy -->
    <g transform="translate(280, 60)">
      <line x1="-60" y1="80" x2="-25" y2="80" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <rect x="-25" y="75" width="50" height="10" rx="2" fill="currentColor" opacity="0.5"/>
      <circle cx="0" cy="80" r="6" fill="currentColor"/>

      <rect x="-45" y="0" width="90" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="-45" y="0" width="90" height="55" rx="4" fill="currentColor" opacity="0.05"/>
      <text x="0" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">STRATEGY</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Pricing scenarios</text>
      <text x="0" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Supplier options</text>

      <text x="0" y="105" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">DAY 2-3</text>
    </g>

    <!-- Day 4-5: Communicate -->
    <g transform="translate(395, 60)">
      <line x1="-70" y1="80" x2="-25" y2="80" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <rect x="-25" y="75" width="50" height="10" rx="2" fill="currentColor" opacity="0.6"/>
      <circle cx="0" cy="80" r="6" fill="currentColor"/>

      <rect x="-45" y="0" width="90" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="-45" y="0" width="90" height="55" rx="4" fill="currentColor" opacity="0.05"/>
      <text x="0" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">COMMUNICATE</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Sales briefed</text>
      <text x="0" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Customer letters</text>

      <text x="0" y="105" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">DAY 4-5</text>
    </g>

    <!-- Day 7: Execute -->
    <g transform="translate(510, 60)">
      <line x1="-70" y1="80" x2="-25" y2="80" stroke="currentColor" stroke-width="2" opacity="0.4"/>
      <rect x="-25" y="75" width="50" height="10" rx="2" fill="currentColor" opacity="0.8"/>
      <circle cx="0" cy="80" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="0" cy="80" r="4" fill="currentColor"/>

      <rect x="-40" y="0" width="80" height="55" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="-40" y="0" width="80" height="55" rx="4" fill="currentColor" opacity="0.1"/>
      <text x="0" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">EXECUTE</text>
      <text x="0" y="32" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">New prices live</text>
      <text x="0" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Margin protected</text>

      <text x="0" y="105" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="currentColor" text-anchor="middle">DAY 7</text>
    </g>

    <!-- Requirements Box -->
    <g transform="translate(50, 185)">
      <rect x="0" y="0" width="250" height="95" rx="6" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
      <rect x="0" y="0" width="250" height="95" rx="6" fill="currentColor" opacity="0.03"/>

      <text x="125" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">WHAT YOU NEED</text>

      <circle cx="20" cy="38" r="3" fill="currentColor" opacity="0.5"/>
      <text x="30" y="41" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Product-level cost visibility</text>

      <circle cx="20" cy="55" r="3" fill="currentColor" opacity="0.5"/>
      <text x="30" y="58" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Country-of-origin data</text>

      <circle cx="20" cy="72" r="3" fill="currentColor" opacity="0.5"/>
      <text x="30" y="75" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Pricing system integration</text>

      <circle cx="20" cy="89" r="3" fill="currentColor" opacity="0.5"/>
      <text x="30" y="92" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Customer communication tools</text>
    </g>

    <!-- Outcome Box -->
    <g transform="translate(320, 185)">
      <rect x="0" y="0" width="230" height="95" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <rect x="0" y="0" width="230" height="95" rx="6" fill="currentColor" opacity="0.06"/>

      <text x="115" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor" text-anchor="middle">VS. COMPETITORS</text>

      <g transform="translate(15, 28)">
        <text x="0" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">You respond in:</text>
        <text x="80" y="12" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="currentColor">7 days</text>
      </g>

      <g transform="translate(15, 50)">
        <text x="0" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Competitors need:</text>
        <text x="80" y="12" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="currentColor" opacity="0.5">4-6 weeks</text>
      </g>

      <g transform="translate(15, 72)">
        <text x="0" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Result:</text>
        <text x="80" y="12" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="currentColor">Margin protected</text>
      </g>
    </g>
  </svg>`;
}

// Export Distribution diagrams
export const DISTRIBUTION_DIAGRAMS = {
  'inventory-intelligence-guide': createInventoryIntelligenceDiagram,
  'customer-profitability-distribution': createCustomerProfitabilityDiagram,
  'pricing-discipline-distribution': createPricingDisciplineDiagram,
  'distribution-labor-shortage-playbook': createLaborShortagePlaybookDiagram,
  'distribution-tariff-response-guide': createTariffResponseDiagram,
};

/**
 * Get a distribution diagram by slug
 * @param {string} slug - The guide slug
 * @returns {string|null} SVG string or null if not found
 */
export function getDistributionDiagram(slug) {
  const diagramFn = DISTRIBUTION_DIAGRAMS[slug];
  if (diagramFn) {
    return diagramFn();
  }
  return null;
}

/**
 * Check if a construction diagram exists for a given slug
 * @param {string} slug - The guide slug
 * @returns {boolean} True if diagram exists
 */
export function hasConstructionDiagram(slug) {
  return slug in CONSTRUCTION_DIAGRAMS;
}

/**
 * Check if a distribution diagram exists for a given slug
 * @param {string} slug - The guide slug
 * @returns {boolean} True if diagram exists
 */
export function hasDistributionDiagram(slug) {
  return slug in DISTRIBUTION_DIAGRAMS;
}

// Default export with all diagrams and getters
export default {
  CONSTRUCTION_DIAGRAMS,
  DISTRIBUTION_DIAGRAMS,
  getConstructionDiagram,
  getDistributionDiagram,
  hasConstructionDiagram,
  hasDistributionDiagram,
};

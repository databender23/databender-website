/**
 * Healthcare Industry Diagrams for PDF Generation
 *
 * SVG diagrams for healthcare-related guides.
 * All diagrams use 'currentColor' for strokes to allow CSS color application.
 * Designed for ~600x300px rendering in Puppeteer PDF generation.
 */

// =============================================================================
// HEALTHCARE DIAGRAMS
// =============================================================================

export const HEALTHCARE_DIAGRAMS = {
  /**
   * HIPAA-Compliant AI: On-premise vs Cloud Comparison
   * Shows two deployment models side by side with data flow visualization
   */
  'hipaa-compliant-ai': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left Side: On-Premise (Secure) -->
      <g transform="translate(30, 30)">
        <!-- Header -->
        <text x="105" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">On-Premise AI</text>
        <text x="105" y="18" font-family="Inter, sans-serif" font-size="10" fill="currentColor" opacity="0.7" text-anchor="middle">Data Never Leaves Your Building</text>

        <!-- Building/Facility Box -->
        <rect x="10" y="35" width="190" height="200" rx="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="6 3"/>
        <text x="105" y="52" font-family="Inter, sans-serif" font-size="9" fill="currentColor" opacity="0.6" text-anchor="middle">YOUR FACILITY</text>

        <!-- Patient Data Source -->
        <rect x="30" y="65" width="60" height="45" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="60" y="85" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Patient</text>
        <text x="60" y="95" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Data</text>
        <path d="M50 70 h20 M50 75 h15 M50 105 h20" stroke="currentColor" stroke-width="1" opacity="0.5"/>

        <!-- Local AI Server -->
        <rect x="120" y="65" width="60" height="45" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="150" y="82" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Local</text>
        <text x="150" y="92" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">AI Server</text>
        <circle cx="135" cy="105" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="150" cy="105" r="3" fill="currentColor" opacity="0.6"/>
        <circle cx="165" cy="105" r="3" fill="currentColor" opacity="0.8"/>

        <!-- Arrow from Data to AI -->
        <path d="M90 87 L115 87" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrowhead)"/>

        <!-- Results back to staff -->
        <rect x="75" y="135" width="60" height="40" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="105" y="152" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Clinical</text>
        <text x="105" y="162" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Staff</text>

        <!-- Bidirectional arrows -->
        <path d="M105 110 L105 130" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="105" cy="123" r="2" fill="currentColor"/>

        <!-- Security Shield -->
        <path d="M95 195 L105 190 L115 195 L115 210 C115 215 105 220 105 220 C105 220 95 215 95 210 Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M102 202 L105 205 L110 198" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="105" y="235" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" font-weight="500">HIPAA Compliant</text>
      </g>

      <!-- Center Divider -->
      <line x1="300" y1="40" x2="300" y2="260" stroke="currentColor" stroke-width="1" opacity="0.2"/>
      <text x="300" y="280" font-family="Inter, sans-serif" font-size="10" fill="currentColor" opacity="0.5" text-anchor="middle">vs</text>

      <!-- Right Side: Cloud (Risk) -->
      <g transform="translate(320, 30)">
        <!-- Header -->
        <text x="125" y="0" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle" opacity="0.6">Cloud-Based AI</text>
        <text x="125" y="18" font-family="Inter, sans-serif" font-size="10" fill="currentColor" opacity="0.5" text-anchor="middle">Data Leaves Your Control</text>

        <!-- Your Facility (small) -->
        <rect x="10" y="55" width="80" height="70" rx="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
        <text x="50" y="72" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.6" text-anchor="middle">Your Facility</text>
        <rect x="25" y="82" width="50" height="30" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="50" y="100" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.5" text-anchor="middle">Patient Data</text>

        <!-- Data flowing out (with warning) -->
        <path d="M90 95 C120 95 120 70 150 70" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6" stroke-dasharray="4 2"/>
        <circle cx="115" cy="85" r="8" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
        <text x="115" y="88" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.7">!</text>

        <!-- Internet Cloud -->
        <ellipse cx="175" cy="70" rx="35" ry="20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4" stroke-dasharray="3 2"/>
        <text x="175" y="73" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.4" text-anchor="middle">Internet</text>

        <!-- Vendor Cloud -->
        <rect x="140" y="110" width="90" height="60" rx="6" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
        <text x="185" y="130" font-family="Inter, sans-serif" font-size="9" fill="currentColor" opacity="0.6" text-anchor="middle">Vendor Cloud</text>
        <text x="185" y="145" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.4" text-anchor="middle">(Their servers)</text>
        <text x="185" y="160" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.4" text-anchor="middle">Your data stored here</text>

        <!-- Data flow arrow -->
        <path d="M175 90 L175 105" stroke="currentColor" stroke-width="1" opacity="0.4" marker-end="url(#arrowhead-dim)"/>

        <!-- Warning/Risk indicators -->
        <g transform="translate(50, 145)">
          <circle cx="0" cy="0" r="10" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
          <line x1="0" y1="-5" x2="0" y2="2" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
          <circle cx="0" cy="5" r="1" fill="currentColor" opacity="0.6"/>
        </g>
        <text x="50" y="175" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.5" text-anchor="middle">Data Risk</text>

        <!-- Compliance concern -->
        <rect x="30" y="190" width="90" height="35" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4" stroke-dasharray="4 2"/>
        <text x="75" y="205" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.5" text-anchor="middle">Compliance</text>
        <text x="75" y="217" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.4" text-anchor="middle">Uncertainty</text>
      </g>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor"/>
        </marker>
        <marker id="arrowhead-dim" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor" opacity="0.4"/>
        </marker>
      </defs>
    </svg>
  `,

  /**
   * Institutional Knowledge Healthcare: Knowledge Preservation Flow
   * Shows knowledge flowing from experienced staff into systems and to new hires
   */
  'institutional-knowledge-healthcare': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="25" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Knowledge Preservation Flow</text>

      <!-- Left: Experienced Staff -->
      <g transform="translate(40, 60)">
        <!-- Person icon (experienced) -->
        <circle cx="50" cy="30" r="20" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M25 90 C25 65 75 65 75 90" stroke="currentColor" stroke-width="2" fill="none"/>

        <!-- Years of experience badge -->
        <rect x="20" y="95" width="60" height="22" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="50" y="110" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">20+ Years</text>

        <!-- Knowledge indicators -->
        <g transform="translate(5, 125)">
          <rect x="0" y="0" width="90" height="18" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="45" y="12" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.8" text-anchor="middle">Tribal Knowledge</text>
        </g>
        <g transform="translate(5, 148)">
          <rect x="0" y="0" width="90" height="18" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="45" y="12" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.8" text-anchor="middle">Best Practices</text>
        </g>
        <g transform="translate(5, 171)">
          <rect x="0" y="0" width="90" height="18" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="45" y="12" font-family="Inter, sans-serif" font-size="7" fill="currentColor" opacity="0.8" text-anchor="middle">Edge Cases</text>
        </g>

        <text x="50" y="210" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="500">Retiring Staff</text>
      </g>

      <!-- Arrow: Staff to Capture System -->
      <g transform="translate(130, 120)">
        <path d="M10 40 L60 40" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-knowledge)"/>
        <text x="35" y="30" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Capture</text>
      </g>

      <!-- Center: Knowledge Capture System -->
      <g transform="translate(200, 55)">
        <!-- Main system box -->
        <rect x="0" y="0" width="200" height="180" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="100" y="25" font-family="Inter, sans-serif" font-size="11" fill="currentColor" text-anchor="middle" font-weight="600">Knowledge Capture System</text>

        <!-- Brain/AI processing icon -->
        <g transform="translate(70, 40)">
          <ellipse cx="30" cy="25" rx="25" ry="20" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M20 20 Q25 15 30 20 Q35 15 40 20" stroke="currentColor" stroke-width="1" fill="none"/>
          <path d="M20 30 Q25 35 30 30 Q35 35 40 30" stroke="currentColor" stroke-width="1" fill="none"/>
          <circle cx="22" cy="25" r="3" stroke="currentColor" stroke-width="1" fill="none"/>
          <circle cx="38" cy="25" r="3" stroke="currentColor" stroke-width="1" fill="none"/>
          <line x1="25" y1="25" x2="35" y2="25" stroke="currentColor" stroke-width="1"/>
        </g>

        <!-- Process steps -->
        <g transform="translate(15, 100)">
          <rect x="0" y="0" width="50" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="none"/>
          <text x="25" y="13" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Record</text>
          <text x="25" y="23" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Sessions</text>
        </g>
        <path d="M65 115 L75 115" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-sm)"/>
        <g transform="translate(75, 100)">
          <rect x="0" y="0" width="50" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="none"/>
          <text x="25" y="13" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Process</text>
          <text x="25" y="23" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">& Index</text>
        </g>
        <path d="M125 115 L135 115" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-sm)"/>
        <g transform="translate(135, 100)">
          <rect x="0" y="0" width="50" height="30" rx="4" stroke="currentColor" stroke-width="1" fill="none"/>
          <text x="25" y="13" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Make</text>
          <text x="25" y="23" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Searchable</text>
        </g>

        <!-- Database icon -->
        <g transform="translate(70, 140)">
          <ellipse cx="30" cy="5" rx="25" ry="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 5 L5 30 C5 38 55 38 55 30 L55 5" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <ellipse cx="30" cy="30" rx="25" ry="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
        </g>
      </g>

      <!-- Arrow: System to New Staff -->
      <g transform="translate(410, 120)">
        <path d="M10 40 L60 40" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-knowledge)"/>
        <text x="35" y="30" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Access</text>
      </g>

      <!-- Right: New Hires / All Staff -->
      <g transform="translate(480, 60)">
        <!-- Person icon (new hire) -->
        <circle cx="50" cy="30" r="18" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M28 85 C28 62 72 62 72 85" stroke="currentColor" stroke-width="2" fill="none"/>

        <!-- Star/new badge -->
        <circle cx="70" cy="25" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="70" y="29" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle">N</text>

        <!-- Benefits -->
        <g transform="translate(5, 100)">
          <path d="M0 8 L10 8" stroke="currentColor" stroke-width="2" opacity="0.6"/>
          <text x="15" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Instant answers</text>
        </g>
        <g transform="translate(5, 120)">
          <path d="M0 8 L10 8" stroke="currentColor" stroke-width="2" opacity="0.6"/>
          <text x="15" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Best practices</text>
        </g>
        <g transform="translate(5, 140)">
          <path d="M0 8 L10 8" stroke="currentColor" stroke-width="2" opacity="0.6"/>
          <text x="15" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Edge case handling</text>
        </g>
        <g transform="translate(5, 160)">
          <path d="M0 8 L10 8" stroke="currentColor" stroke-width="2" opacity="0.6"/>
          <text x="15" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.8">Faster onboarding</text>
        </g>

        <text x="50" y="200" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="500">New Hires</text>
        <text x="50" y="215" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">& All Staff</text>
      </g>

      <!-- Bottom stat callout -->
      <g transform="translate(200, 250)">
        <rect x="0" y="0" width="200" height="35" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="100" y="15" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" font-weight="500">Training Time Reduction</text>
        <text x="100" y="28" font-family="Inter, sans-serif" font-size="11" fill="currentColor" text-anchor="middle" font-weight="600">Up to 50% Faster Onboarding</text>
      </g>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrow-knowledge" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="currentColor"/>
        </marker>
        <marker id="arrow-sm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="currentColor"/>
        </marker>
      </defs>
    </svg>
  `,

  /**
   * Document Intelligence Healthcare: Time Reduction Graphic
   * Shows dramatic speedup from 15 minutes to 30 seconds
   */
  'document-intelligence-healthcare': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="25" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="currentColor" text-anchor="middle">Document Lookup Time: Before vs After</text>

      <!-- Left: Before (15 minutes) -->
      <g transform="translate(30, 50)">
        <text x="100" y="15" font-family="Inter, sans-serif" font-size="12" fill="currentColor" text-anchor="middle" font-weight="500" opacity="0.6">BEFORE</text>

        <!-- Large clock showing 15 minutes -->
        <g transform="translate(40, 30)">
          <circle cx="60" cy="60" r="55" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>

          <!-- Clock marks -->
          <line x1="60" y1="12" x2="60" y2="18" stroke="currentColor" stroke-width="2"/>
          <line x1="60" y1="102" x2="60" y2="108" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="60" x2="18" y2="60" stroke="currentColor" stroke-width="2"/>
          <line x1="102" y1="60" x2="108" y2="60" stroke="currentColor" stroke-width="2"/>

          <!-- Minor marks -->
          <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.3"/>

          <!-- Clock hands - showing ~15 min position -->
          <line x1="60" y1="60" x2="60" y2="25" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="60" y1="60" x2="90" y2="60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>

          <!-- Center dot -->
          <circle cx="60" cy="60" r="4" fill="currentColor"/>
        </g>

        <!-- Time display -->
        <rect x="20" y="160" width="160" height="50" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="100" y="183" font-family="Inter, sans-serif" font-size="24" fill="currentColor" text-anchor="middle" font-weight="700">15 min</text>
        <text x="100" y="200" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">per protocol lookup</text>

        <!-- Pain points -->
        <g transform="translate(10, 220)">
          <circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <line x1="5" y1="5" x2="11" y2="11" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          <line x1="11" y1="5" x2="5" y2="11" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          <text x="18" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Searching multiple systems</text>
        </g>
        <g transform="translate(10, 238)">
          <circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <line x1="5" y1="5" x2="11" y2="11" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          <line x1="11" y1="5" x2="5" y2="11" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          <text x="18" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" opacity="0.7">Asking colleagues</text>
        </g>
      </g>

      <!-- Center: Transformation Arrow -->
      <g transform="translate(240, 100)">
        <!-- Large arrow -->
        <path d="M0 50 L80 50" stroke="currentColor" stroke-width="3"/>
        <polygon points="80,40 100,50 80,60" fill="currentColor"/>

        <!-- AI badge in center -->
        <rect x="25" y="25" width="50" height="20" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <text x="50" y="38" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" font-weight="500">AI Search</text>

        <!-- Reduction indicator -->
        <text x="50" y="80" font-family="Inter, sans-serif" font-size="20" fill="currentColor" text-anchor="middle" font-weight="700">30x</text>
        <text x="50" y="95" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">faster</text>
      </g>

      <!-- Right: After (30 seconds) -->
      <g transform="translate(370, 50)">
        <text x="100" y="15" font-family="Inter, sans-serif" font-size="12" fill="currentColor" text-anchor="middle" font-weight="600">AFTER</text>

        <!-- Small clock showing 30 seconds -->
        <g transform="translate(40, 30)">
          <circle cx="60" cy="60" r="55" stroke="currentColor" stroke-width="2.5" fill="none"/>
          <circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>

          <!-- Clock marks -->
          <line x1="60" y1="12" x2="60" y2="18" stroke="currentColor" stroke-width="2"/>
          <line x1="60" y1="102" x2="60" y2="108" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="60" x2="18" y2="60" stroke="currentColor" stroke-width="2"/>
          <line x1="102" y1="60" x2="108" y2="60" stroke="currentColor" stroke-width="2"/>

          <!-- Clock hands - showing ~30 sec position (second hand halfway around) -->
          <line x1="60" y1="60" x2="60" y2="28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="60" y1="60" x2="60" y2="100" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>

          <!-- Center dot -->
          <circle cx="60" cy="60" r="5" fill="currentColor"/>

          <!-- Speed lines -->
          <path d="M115 40 L125 35" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
          <path d="M115 60 L128 60" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
          <path d="M115 80 L125 85" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
        </g>

        <!-- Time display -->
        <rect x="20" y="160" width="160" height="50" rx="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
        <text x="100" y="183" font-family="Inter, sans-serif" font-size="24" fill="currentColor" text-anchor="middle" font-weight="700">30 sec</text>
        <text x="100" y="200" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.7">with source citations</text>

        <!-- Benefits -->
        <g transform="translate(10, 220)">
          <circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 8 L7 10 L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="18" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Ask in plain English</text>
        </g>
        <g transform="translate(10, 238)">
          <circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 8 L7 10 L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="18" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor">Verified sources included</text>
        </g>
      </g>

      <!-- Bottom: Use case examples -->
      <g transform="translate(50, 275)">
        <text x="250" y="0" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Protocol lookups | Policy questions | Treatment guidelines | Compliance requirements</text>
      </g>
    </svg>
  `,

  /**
   * Prior Authorization Burden: Manual vs Automated Workflow
   * Shows PA workflow comparison between manual process and AI-automated
   */
  'prior-auth-burden': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="20" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="currentColor" text-anchor="middle">Prior Authorization: Manual vs Automated</text>

      <!-- Top: Manual Process (complicated) -->
      <g transform="translate(20, 40)">
        <text x="0" y="12" font-family="Inter, sans-serif" font-size="10" fill="currentColor" font-weight="500" opacity="0.6">MANUAL PROCESS</text>
        <text x="400" y="12" font-family="Inter, sans-serif" font-size="9" fill="currentColor" opacity="0.5">13 hrs/week per physician</text>

        <!-- Process steps -->
        <g transform="translate(0, 25)">
          <!-- Step 1: Order placed -->
          <rect x="0" y="0" width="65" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="32" y="17" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Order</text>
          <text x="32" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Placed</text>

          <!-- Arrow -->
          <path d="M65 20 L75 20" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-pa)" opacity="0.5"/>

          <!-- Step 2: Check PA Required -->
          <rect x="80" y="0" width="65" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="112" y="17" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Check if PA</text>
          <text x="112" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Required</text>

          <path d="M145 20 L155 20" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-pa)" opacity="0.5"/>

          <!-- Step 3: Gather docs -->
          <rect x="160" y="0" width="65" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="192" y="17" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Gather</text>
          <text x="192" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Documents</text>

          <path d="M225 20 L235 20" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-pa)" opacity="0.5"/>

          <!-- Step 4: Fill forms -->
          <rect x="240" y="0" width="65" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="272" y="17" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Fill Forms</text>
          <text x="272" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Manually</text>

          <path d="M305 20 L315 20" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-pa)" opacity="0.5"/>

          <!-- Step 5: Fax/call -->
          <rect x="320" y="0" width="65" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="352" y="17" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Fax/Call</text>
          <text x="352" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Payer</text>

          <path d="M385 20 L395 20" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-pa)" opacity="0.5"/>

          <!-- Step 6: Wait -->
          <rect x="400" y="0" width="65" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
          <text x="432" y="17" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Wait for</text>
          <text x="432" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Response</text>

          <path d="M465 20 L475 20" stroke="currentColor" stroke-width="1" marker-end="url(#arrow-pa)" opacity="0.5"/>

          <!-- Step 7: Follow up loop -->
          <rect x="480" y="0" width="65" height="40" rx="4" stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.7"/>
          <text x="512" y="17" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Follow-up</text>
          <text x="512" y="28" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">(repeat)</text>

          <!-- Loop back arrow -->
          <path d="M512 45 L512 55 L400 55 L400 45" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4" marker-end="url(#arrow-pa)"/>
        </g>

        <!-- Time indicators -->
        <g transform="translate(0, 85)">
          <line x1="0" y1="0" x2="545" y2="0" stroke="currentColor" stroke-width="1" opacity="0.2"/>
          <text x="272" y="15" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.5">Average: 2-5 days | 93% report care delays</text>
        </g>
      </g>

      <!-- Divider -->
      <line x1="40" y1="155" x2="560" y2="155" stroke="currentColor" stroke-width="1" opacity="0.15"/>

      <!-- Bottom: Automated Process (streamlined) -->
      <g transform="translate(20, 165)">
        <text x="0" y="12" font-family="Inter, sans-serif" font-size="10" fill="currentColor" font-weight="600">AI-AUTOMATED</text>
        <text x="400" y="12" font-family="Inter, sans-serif" font-size="9" fill="currentColor" font-weight="500">60%+ time reduction</text>

        <!-- Process steps -->
        <g transform="translate(0, 25)">
          <!-- Step 1: Order placed -->
          <rect x="0" y="0" width="80" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="40" y="20" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Order</text>
          <text x="40" y="32" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Placed</text>
          <text x="40" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">(same)</text>

          <!-- Arrow -->
          <path d="M85 25 L105 25" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-pa-bold)"/>

          <!-- Step 2: AI Auto-Detection & Prep (combined) -->
          <rect x="110" y="0" width="180" height="50" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>
          <text x="200" y="15" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" font-weight="500">AI Document Intelligence</text>
          <line x1="130" y1="25" x2="270" y2="25" stroke="currentColor" stroke-width="1" opacity="0.3"/>
          <text x="155" y="38" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Auto-detect PA</text>
          <text x="200" y="38" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">|</text>
          <text x="245" y="38" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle">Pull records</text>
          <text x="200" y="48" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">Pre-fill forms automatically</text>

          <!-- Arrow -->
          <path d="M295 25 L315 25" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-pa-bold)"/>

          <!-- Step 3: Review & Submit -->
          <rect x="320" y="0" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="370" y="20" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Staff Review</text>
          <text x="370" y="32" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">& Submit</text>
          <text x="370" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">(1-click approve)</text>

          <!-- Arrow -->
          <path d="M425 25 L445 25" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-pa-bold)"/>

          <!-- Step 4: Auto-tracking -->
          <rect x="450" y="0" width="100" height="50" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="500" y="20" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Auto Status</text>
          <text x="500" y="32" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle">Tracking</text>
          <text x="500" y="44" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.6">(alerts if needed)</text>
        </g>

        <!-- Time indicator -->
        <g transform="translate(0, 85)">
          <line x1="0" y1="0" x2="545" y2="0" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
          <text x="272" y="15" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" font-weight="500">Average: Same day | Physician time: minutes, not hours</text>
        </g>
      </g>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrow-pa" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="currentColor" opacity="0.5"/>
        </marker>
        <marker id="arrow-pa-bold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor"/>
        </marker>
      </defs>
    </svg>
  `,

  /**
   * PE Healthcare Operations: Multi-Practice Unification
   * Shows portfolio companies being unified without full system integration
   */
  'pe-healthcare-operations': `
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="300" y="22" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="currentColor" text-anchor="middle">Portfolio-Wide Visibility Without System Integration</text>
      <text x="300" y="38" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">Weeks, not the 18 months your integration vendor quoted</text>

      <!-- Left side: Multiple disconnected practices -->
      <g transform="translate(20, 55)">
        <text x="90" y="0" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="500" opacity="0.6">PORTFOLIO COMPANIES</text>

        <!-- Practice 1 -->
        <g transform="translate(0, 15)">
          <rect x="0" y="0" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="40" y="15" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" font-weight="500">Practice A</text>
          <rect x="10" y="22" width="25" height="12" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <text x="22" y="31" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">EHR 1</text>
          <rect x="40" y="22" width="30" height="12" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <text x="55" y="31" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">PM Sys</text>
          <text x="40" y="48" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Own processes</text>
        </g>

        <!-- Practice 2 -->
        <g transform="translate(90, 15)">
          <rect x="0" y="0" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="40" y="15" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" font-weight="500">Practice B</text>
          <rect x="10" y="22" width="25" height="12" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <text x="22" y="31" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">EHR 2</text>
          <rect x="40" y="22" width="30" height="12" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <text x="55" y="31" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">Billing</text>
          <text x="40" y="48" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Different metrics</text>
        </g>

        <!-- Practice 3 -->
        <g transform="translate(0, 80)">
          <rect x="0" y="0" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="40" y="15" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" font-weight="500">Practice C</text>
          <rect x="10" y="22" width="25" height="12" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <text x="22" y="31" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">EHR 3</text>
          <rect x="40" y="22" width="30" height="12" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <text x="55" y="31" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">Spread</text>
          <text x="40" y="48" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Separate books</text>
        </g>

        <!-- Practice 4 -->
        <g transform="translate(90, 80)">
          <rect x="0" y="0" width="80" height="55" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="40" y="15" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" font-weight="500">Practice D</text>
          <rect x="10" y="22" width="60" height="12" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
          <text x="40" y="31" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.7">Legacy System</text>
          <text x="40" y="48" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">No integration</text>
        </g>

        <!-- More practices indicator -->
        <g transform="translate(45, 150)">
          <text x="45" y="8" font-family="Inter, sans-serif" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.5">+ more practices...</text>
        </g>
      </g>

      <!-- Center: Data Unification Layer -->
      <g transform="translate(210, 60)">
        <!-- Connection lines from practices -->
        <path d="M-20 40 L20 90" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
        <path d="M-20 70 L20 90" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
        <path d="M-20 115 L20 100" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
        <path d="M-20 145 L20 100" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>

        <!-- Unification box -->
        <rect x="20" y="50" width="150" height="100" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <text x="95" y="72" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="600">Data Unification</text>
        <text x="95" y="85" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="600">Layer</text>

        <!-- Features inside -->
        <line x1="35" y1="95" x2="155" y2="95" stroke="currentColor" stroke-width="1" opacity="0.2"/>
        <text x="95" y="110" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Standardize metrics</text>
        <text x="95" y="122" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Normalize data</text>
        <text x="95" y="134" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.7">Connect existing systems</text>

        <!-- No replacement badge -->
        <rect x="45" y="155" width="100" height="18" rx="9" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
        <text x="95" y="167" font-family="Inter, sans-serif" font-size="7" fill="currentColor" text-anchor="middle" opacity="0.8">No system replacement</text>

        <!-- Arrow to dashboard -->
        <path d="M175 100 L195 100" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-pe)"/>
      </g>

      <!-- Right side: Unified Dashboard -->
      <g transform="translate(405, 50)">
        <text x="90" y="5" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="600">UNIFIED VIEW</text>

        <!-- Dashboard frame -->
        <rect x="0" y="15" width="175" height="155" rx="6" stroke="currentColor" stroke-width="2" fill="none"/>

        <!-- Header bar -->
        <rect x="5" y="20" width="165" height="20" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <text x="87" y="34" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">Portfolio Application</text>

        <!-- KPI boxes -->
        <g transform="translate(10, 48)">
          <rect x="0" y="0" width="48" height="35" rx="3" stroke="currentColor" stroke-width="1" fill="none"/>
          <text x="24" y="13" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.6">Revenue</text>
          <text x="24" y="27" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="600">$12.4M</text>
        </g>
        <g transform="translate(63, 48)">
          <rect x="0" y="0" width="48" height="35" rx="3" stroke="currentColor" stroke-width="1" fill="none"/>
          <text x="24" y="13" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.6">EBITDA</text>
          <text x="24" y="27" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="600">$2.1M</text>
        </g>
        <g transform="translate(116, 48)">
          <rect x="0" y="0" width="48" height="35" rx="3" stroke="currentColor" stroke-width="1" fill="none"/>
          <text x="24" y="13" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.6">Patients</text>
          <text x="24" y="27" font-family="Inter, sans-serif" font-size="10" fill="currentColor" text-anchor="middle" font-weight="600">48.2K</text>
        </g>

        <!-- Trend chart placeholder -->
        <g transform="translate(10, 90)">
          <rect x="0" y="0" width="155" height="45" rx="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
          <path d="M10 35 L40 25 L70 30 L100 15 L130 20 L145 10" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <text x="77" y="42" font-family="Inter, sans-serif" font-size="6" fill="currentColor" text-anchor="middle" opacity="0.5">Portfolio Performance Trend</text>
        </g>

        <!-- Practice comparison -->
        <g transform="translate(10, 140)">
          <text x="0" y="8" font-family="Inter, sans-serif" font-size="6" fill="currentColor" opacity="0.6">By Practice:</text>
          <rect x="45" y="0" width="20" height="12" fill="currentColor" opacity="0.3"/>
          <rect x="68" y="3" width="15" height="9" fill="currentColor" opacity="0.4"/>
          <rect x="86" y="1" width="22" height="11" fill="currentColor" opacity="0.5"/>
          <rect x="111" y="4" width="12" height="8" fill="currentColor" opacity="0.6"/>
          <rect x="126" y="2" width="18" height="10" fill="currentColor" opacity="0.7"/>
        </g>
      </g>

      <!-- Bottom: Key benefits -->
      <g transform="translate(40, 235)">
        <g transform="translate(0, 0)">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 8 L7 10 L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="20" y="12" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Weeks to deploy</text>
        </g>
        <g transform="translate(130, 0)">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 8 L7 10 L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="20" y="12" font-family="Inter, sans-serif" font-size="9" fill="currentColor">No system replacement</text>
        </g>
        <g transform="translate(280, 0)">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 8 L7 10 L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="20" y="12" font-family="Inter, sans-serif" font-size="9" fill="currentColor">Exit-ready reporting</text>
        </g>
        <g transform="translate(420, 0)">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M5 8 L7 10 L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="20" y="12" font-family="Inter, sans-serif" font-size="9" fill="currentColor">EBITDA opportunities</text>
        </g>
      </g>

      <!-- Timeline comparison -->
      <g transform="translate(100, 265)">
        <text x="200" y="12" font-family="Inter, sans-serif" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.6">Traditional integration: 18+ months | This approach: 4-8 weeks</text>
      </g>

      <!-- Arrow marker -->
      <defs>
        <marker id="arrow-pe" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor"/>
        </marker>
      </defs>
    </svg>
  `,
};

// =============================================================================
// HELPER FUNCTION
// =============================================================================

/**
 * Get healthcare diagram SVG for a guide slug
 * @param {string} slug - The guide slug
 * @returns {string|null} SVG string or null if not found
 */
export function getHealthcareDiagram(slug) {
  return HEALTHCARE_DIAGRAMS[slug] || null;
}

/**
 * Check if a healthcare diagram exists for a given slug
 * @param {string} slug - The guide slug
 * @returns {boolean} True if diagram exists
 */
export function hasHealthcareDiagram(slug) {
  return slug in HEALTHCARE_DIAGRAMS;
}

export default {
  HEALTHCARE_DIAGRAMS,
  getHealthcareDiagram,
  hasHealthcareDiagram,
};

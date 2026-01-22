/**
 * PDF Generation Script for Guide Content
 *
 * Usage: node scripts/generate-guide-pdfs.mjs [slug]
 *
 * If no slug provided, generates PDFs for all guides.
 * If slug provided, generates PDF for that specific guide.
 *
 * Uses the enhanced PDF template system with:
 * - Industry-specific color themes
 * - Custom hero icons per guide
 * - Guide-specific diagrams
 * - Geometric background patterns
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the enhanced template modules
import { createPdfHtml } from './pdf-templates/base-template.mjs';
import { getHeroIcon } from './pdf-templates/icons.mjs';
import { getDiagram, hasDiagram } from './pdf-templates/diagrams.mjs';
import {
  INDUSTRY_THEMES,
  getGeometricPattern,
  getThemeForGuide,
} from './pdf-templates/industry-themes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

// All guides by industry with stat callouts
const LEGAL_GUIDES = [
  {
    slug: 'associate-multiplier',
    title: 'The Associate Multiplier',
    subtitle: 'How Top Firms Get 3x Output Without Adding Headcount',
    statCallout: {
      number: '3x',
      label: 'Output Multiplier',
      context: 'Associates using AI-assisted workflows produce three times the work product without additional hours.',
    },
  },
  {
    slug: 'partner-succession',
    title: 'The Partner Succession Problem',
    subtitle: 'Preserving Institutional Knowledge Before It\'s Too Late',
    statCallout: {
      number: '85%',
      label: 'Knowledge Retention',
      context: 'Firms with proper knowledge capture systems retain 85% of departing partner expertise.',
    },
  },
  {
    slug: 'win-more-pitches',
    title: 'Win More Pitches',
    subtitle: 'A Law Firm\'s Guide to Experience Intelligence',
    statCallout: {
      number: '38%',
      label: 'Win Rate',
      context: 'Firms using AI-powered pitch prep see win rates increase from 25% to 38%.',
    },
  },
  {
    slug: 'last-vendor',
    title: 'The Last Vendor You Need',
    subtitle: 'Simplifying Law Firm Knowledge Technology',
    statCallout: {
      number: '52%',
      label: 'Cost Savings',
      context: 'Consolidating fragmented systems into a unified platform saves 52% on technology costs.',
    },
  },
  {
    slug: 'own-your-ai',
    title: 'Own Your AI',
    subtitle: 'Why Per-Seat Licensing Is Eating Your Margins',
    statCallout: {
      number: '$680K',
      label: '5-Year Savings',
      context: 'Building your own AI solution vs. per-seat licensing saves $680K+ over five years.',
    },
  },
  {
    slug: 'economics-of-legal-ai',
    title: 'The Economics Changed',
    subtitle: 'What Used to Cost $200K Now Costs $30-50K',
    statCallout: {
      number: '80%',
      label: 'Cost Reduction',
      context: 'Custom legal technology projects cost 80% less than they did just two years ago.',
    },
  },
  {
    slug: 'simplify-tech-stack',
    title: 'Simplify Your Legal Tech Stack',
    subtitle: 'Stop Managing Five Vendors Who Point Fingers',
    statCallout: {
      number: '70%',
      label: 'Less Admin Time',
      context: 'Unified platforms reduce administrative overhead by 70% compared to fragmented systems.',
    },
  },
];

const HEALTHCARE_GUIDES = [
  {
    slug: 'hipaa-compliant-ai',
    title: 'HIPAA-Compliant AI',
    subtitle: 'Document Intelligence Without the Compliance Headache',
    statCallout: {
      number: '100%',
      label: 'Data Privacy',
      context: 'On-premise AI keeps all patient data within your facility, never touching external servers.',
    },
  },
  {
    slug: 'institutional-knowledge-healthcare',
    title: 'Capture What Your Best People Know',
    subtitle: 'Before They Walk Out the Door',
    statCallout: {
      number: '50%',
      label: 'Faster Onboarding',
      context: 'Knowledge capture systems cut new hire training time in half.',
    },
  },
  {
    slug: 'document-intelligence-healthcare',
    title: 'Find Any Document in Seconds',
    subtitle: 'Make Your Clinical Knowledge Searchable',
    statCallout: {
      number: '30 sec',
      label: 'Protocol Lookup',
      context: 'Reduce protocol lookup time from 15 minutes to 30 seconds.',
    },
  },
  {
    slug: 'prior-auth-burden',
    title: 'The Prior Authorization Problem',
    subtitle: '13 Hours a Week Per Physician. Here\'s How to Fix It.',
    statCallout: {
      number: '13 hrs',
      label: 'Weekly PA Burden',
      context: 'Each physician spends 13 hours per week on prior authorization paperwork.',
    },
  },
  {
    slug: 'pe-healthcare-operations',
    title: 'PE Portfolio Operations',
    subtitle: 'Portfolio-Wide Visibility Without the 18-Month Integration',
    statCallout: {
      number: 'Weeks',
      label: 'Not 18 Months',
      context: 'Get unified portfolio visibility in weeks, not the typical 18-month integration timeline.',
    },
  },
];

const MANUFACTURING_GUIDES = [
  {
    slug: 'operational-visibility-playbook',
    title: 'The Operational Visibility Playbook',
    subtitle: 'Stop Hunting for Answers Across Spreadsheets',
    statCallout: {
      number: '1 Day',
      label: 'To Answers',
      context: 'Get answers in a day instead of spending weeks hunting through spreadsheets.',
    },
  },
  {
    slug: 'lead-scoring-manufacturing',
    title: 'Lead Scoring That Actually Works',
    subtitle: 'What 3 Years of Sales Data Taught Us',
    statCallout: {
      number: '31%',
      label: 'Higher Success Rate',
      context: 'Data-driven lead scoring improves sales success rates by 31%.',
    },
  },
  {
    slug: 'manufacturing-ai-privacy',
    title: 'AI Without the Cloud Risk',
    subtitle: 'Keep Your Competitive Data Where It Belongs',
    statCallout: {
      number: '0%',
      label: 'Data Exposure',
      context: 'On-premise AI means zero exposure of competitive data to external systems.',
    },
  },
  {
    slug: 'data-cleanup-manufacturing',
    title: 'Data Cleanup for Manufacturing',
    subtitle: 'Fix Your Data Foundation First',
    statCallout: {
      number: '80-90%',
      label: 'Cost Reduction',
      context: 'AI-powered data cleanup costs 80-90% less than traditional methods.',
    },
  },
  {
    slug: 'do-more-with-fewer-people',
    title: 'Do More With Fewer People',
    subtitle: 'How Growing Manufacturers Get 20% More Output Without Adding Headcount',
    statCallout: {
      number: '20%',
      label: 'More Output',
      context: 'Process automation enables 20% more output without adding staff.',
    },
  },
  {
    slug: '90-day-data-roadmap',
    title: 'The 90-Day Data Roadmap',
    subtitle: 'From Spreadsheets to Unified Visibility in One Quarter',
    statCallout: {
      number: '90 Days',
      label: 'To Visibility',
      context: 'Transform from scattered spreadsheets to unified visibility in one quarter.',
    },
  },
  {
    slug: 'supply-chain-visibility-playbook',
    title: 'The Supply Chain Visibility Playbook',
    subtitle: 'Know What\'s Coming Before It\'s a Problem',
    statCallout: {
      number: '2 Weeks',
      label: 'Early Warning',
      context: 'Get 2+ weeks early warning on supply chain disruptions.',
    },
  },
  {
    slug: 'erp-integration-guide',
    title: 'The ERP Integration Guide',
    subtitle: 'Connect Your Systems Without Replacing Anything',
    statCallout: {
      number: '$0',
      label: 'System Replacement',
      context: 'Connect existing systems without expensive replacements.',
    },
  },
];

const CRE_BROKER_GUIDES = [
  {
    slug: 'entity-resolution-cre',
    title: 'Entity Resolution for CRE',
    subtitle: 'Connect the Dots Across Your Deal Data',
    statCallout: {
      number: '1.69M',
      label: 'Records Processed',
      context: 'Entity resolution systems can process 1.69 million records to identify hidden connections.',
    },
  },
  {
    slug: 'data-room-review',
    title: 'Data Room Review',
    subtitle: 'Cut Due Diligence Time in Half',
    statCallout: {
      number: '50%',
      label: 'Time Savings',
      context: 'AI-powered document review cuts due diligence time in half.',
    },
  },
  {
    slug: 'deal-prioritization',
    title: 'Smart Deal Prioritization',
    subtitle: 'Know Which 100 of 10,000 Targets to Call First',
    statCallout: {
      number: '100',
      label: 'Top Targets',
      context: 'Data-driven scoring identifies the 100 most promising targets from 10,000 prospects.',
    },
  },
];

const CRE_PM_GUIDES = [
  {
    slug: 'portfolio-visibility-cre',
    title: 'One View, All Properties',
    subtitle: 'Connect Your Portfolio Without Ripping Out Systems',
    statCallout: {
      number: '1 View',
      label: 'All Properties',
      context: 'See your entire portfolio in one unified view without replacing systems.',
    },
  },
  {
    slug: 'investor-reporting-cre',
    title: 'Investor Reports in a Day',
    subtitle: 'Automate the Quarterly Scramble',
    statCallout: {
      number: '1 Day',
      label: 'Report Generation',
      context: 'Generate investor reports in a day instead of weeks of scrambling.',
    },
  },
  {
    slug: 'lease-intelligence-cre',
    title: 'Catch Renewals Before They Slip',
    subtitle: 'Turn Lease Data Into Proactive Decisions',
    statCallout: {
      number: '90 Days',
      label: 'Advance Notice',
      context: 'Get 90+ days advance notice on lease renewals and critical dates.',
    },
  },
  {
    slug: 'debt-maturity-wall',
    title: 'Navigating the $957B Maturity Wall',
    subtitle: 'How CRE Professionals Turn Debt Pressure Into Deal Flow',
    statCallout: {
      number: '$957B',
      label: 'Maturity Wall',
      context: 'Track the $957B in CRE debt maturing in 2024-2025.',
    },
  },
  {
    slug: 'cam-reconciliation-guide',
    title: 'CAM Reconciliation: Stop Losing 5-15%',
    subtitle: 'How Property Managers Recover Lost Expenses Without Adding Staff',
    statCallout: {
      number: '5-15%',
      label: 'Revenue Recovery',
      context: 'Automated CAM reconciliation recovers 5-15% of previously lost expenses.',
    },
  },
];

const CONSTRUCTION_GUIDES = [
  {
    slug: 'project-visibility-playbook',
    title: 'The Project Visibility Playbook',
    subtitle: 'Stop Hunting for Answers Across Five Different Systems',
    statCallout: {
      number: '5→1',
      label: 'Systems Unified',
      context: 'Consolidate 5 disconnected systems into one unified view.',
    },
  },
  {
    slug: 'change-order-recovery',
    title: 'Stop Leaving Money on the Table',
    subtitle: 'How to Capture Every Change Order Before It Slips Through',
    statCallout: {
      number: '2-5%',
      label: 'Revenue Recovered',
      context: 'Contractors leave 2-5% of revenue on the table from unbilled change orders.',
    },
  },
  {
    slug: 'construction-post-acquisition',
    title: 'Post-Acquisition Visibility',
    subtitle: 'Unified Reporting in Weeks, Not the 18-Month Integration Timeline',
    statCallout: {
      number: 'Weeks',
      label: 'Not 18 Months',
      context: 'Get unified reporting in weeks instead of the typical 18-month timeline.',
    },
  },
];

const DISTRIBUTION_GUIDES = [
  {
    slug: 'inventory-intelligence-guide',
    title: 'Free Up Cash Tied in Dead Stock',
    subtitle: 'Inventory Intelligence for Mid-Sized Distributors',
    statCallout: {
      number: '15-25%',
      label: 'Cash Released',
      context: 'Inventory intelligence frees up 15-25% of working capital tied in dead stock.',
    },
  },
  {
    slug: 'customer-profitability-distribution',
    title: 'Know Who Actually Makes You Money',
    subtitle: 'Customer Profitability for Distributors',
    statCallout: {
      number: '20%',
      label: 'Hidden Loss Makers',
      context: '20% of customers may actually be unprofitable when true costs are calculated.',
    },
  },
  {
    slug: 'pricing-discipline-distribution',
    title: 'Stop Giving Away Margin',
    subtitle: 'Pricing Visibility and Guardrails for Distribution',
    statCallout: {
      number: '2-5%',
      label: 'Margin Recovery',
      context: 'Pricing visibility and guardrails recover 2-5% of lost margin.',
    },
  },
  {
    slug: 'distribution-labor-shortage-playbook',
    title: 'Do More With Fewer People',
    subtitle: 'The Labor Shortage Playbook for Distributors',
    statCallout: {
      number: '76%',
      label: 'Report Shortages',
      context: '76% of distributors report ongoing labor shortages affecting operations.',
    },
  },
  {
    slug: 'distribution-tariff-response-guide',
    title: 'Respond to Tariffs Fast',
    subtitle: 'Pricing Agility for Uncertain Markets',
    statCallout: {
      number: '48 hrs',
      label: 'Response Time',
      context: 'Respond to tariff changes within 48 hours instead of weeks.',
    },
  },
];

/**
 * Generate a PDF for a single guide
 */
async function generatePdf(guide, htmlContent, outputPath) {
  console.log(`  Generating: ${guide.slug}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Get theme for this guide
    const themeData = getThemeForGuide(guide.slug);
    const industry = themeData?.industry || 'default';
    const theme = themeData || INDUSTRY_THEMES.legal; // Fallback to legal theme

    // Get hero icon with theme color
    const heroIcon = getHeroIcon(guide.slug, theme.accent);

    // Get diagram if available
    const diagram = hasDiagram(guide.slug) ? getDiagram(guide.slug) : null;

    // Get geometric pattern for the industry
    const geometricPattern = getGeometricPattern(industry);

    // Generate the full HTML using the enhanced template
    const fullHtml = createPdfHtml({
      title: guide.title,
      subtitle: guide.subtitle,
      content: htmlContent,
      heroIcon,
      diagram,
      theme,
      geometricPattern,
      statCallout: guide.statCallout,
    });

    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0',
    });

    await page.pdf({
      path: outputPath,
      format: 'letter',
      printBackground: true,
      margin: {
        top: '0.75in',
        right: '0.65in',
        bottom: '0.75in',
        left: '0.65in',
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="width: 100%; font-size: 8pt; padding: 0 0.65in; display: flex; justify-content: space-between; color: #999; font-family: Inter, -apple-system, sans-serif;">
          <span style="color: ${theme.accent}; font-weight: 600;">databender.co</span>
          <span><span class="pageNumber"></span></span>
        </div>
      `,
    });

    console.log(`  ✓ Created: ${path.basename(outputPath)}`);
  } finally {
    await browser.close();
  }
}

/**
 * Get guide content from the guide-content-data.ts file
 */
async function getGuideContent(slug) {
  const filePath = path.join(ROOT_DIR, 'src/lib/guide-content-data.ts');
  const fileContent = await fs.readFile(filePath, 'utf-8');

  // Find the guide content by slug
  const slugPattern = new RegExp(
    `slug:\\s*"${slug}"[\\s\\S]*?content:\\s*\`([\\s\\S]*?)\`\\s*,?\\s*\\}`,
    'm'
  );
  const match = fileContent.match(slugPattern);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Main function
 */
async function main() {
  const specificSlug = process.argv[2];
  const outputDir = path.join(ROOT_DIR, 'public/downloads');

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  const ALL_GUIDES = [
    ...LEGAL_GUIDES,
    ...HEALTHCARE_GUIDES,
    ...MANUFACTURING_GUIDES,
    ...CRE_BROKER_GUIDES,
    ...CRE_PM_GUIDES,
    ...CONSTRUCTION_GUIDES,
    ...DISTRIBUTION_GUIDES,
  ];

  const guidesToGenerate = specificSlug
    ? ALL_GUIDES.filter((g) => g.slug === specificSlug)
    : ALL_GUIDES;

  if (guidesToGenerate.length === 0) {
    console.log(`No guide found with slug: ${specificSlug}`);
    process.exit(1);
  }

  console.log(`\nGenerating ${guidesToGenerate.length} PDF(s)...\n`);
  console.log('Using enhanced templates with:');
  console.log('  - Industry-specific color themes');
  console.log('  - Custom hero icons');
  console.log('  - Guide-specific diagrams');
  console.log('  - Geometric background patterns');
  console.log('  - Stat callout boxes\n');

  let generated = 0;
  let skipped = 0;

  for (const guide of guidesToGenerate) {
    const content = await getGuideContent(guide.slug);

    if (!content) {
      console.log(`  ⚠ No content found for: ${guide.slug}`);
      skipped++;
      continue;
    }

    const outputPath = path.join(outputDir, `${guide.slug}.pdf`);
    await generatePdf(guide, content, outputPath);
    generated++;
  }

  console.log(
    `\n✓ Done! Generated ${generated} PDF(s)${skipped > 0 ? `, skipped ${skipped}` : ''}`
  );
  console.log(`  Output: public/downloads/\n`);
}

main().catch(console.error);

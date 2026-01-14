/**
 * Seed Sample Leads
 *
 * Run with: npx tsx scripts/seed-sample-leads.ts
 */

import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { Lead, LeadNote, ContactRecord, EmailSequence } from "../src/lib/leads/types";

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "databender-leads";

const sampleLeads: Partial<Lead>[] = [
  // Hot Legal Lead - High score, Tier A
  {
    email: "sarah.chen@martinezlaw.com",
    firstName: "Sarah",
    lastName: "Chen",
    company: "Martinez & Associates LLP",
    phone: "(415) 555-0123",
    status: "qualified",
    tier: "A",
    industry: "Legal",
    formType: "assessment",
    resourceSlug: "data-ai-readiness",
    resourceTitle: "Data & AI Readiness Assessment",
    sourcePage: "/assessments/data-ai-readiness",
    behaviorScore: 85,
    behaviorTier: "hot",
    pagesVisited: ["/", "/industries/legal", "/case-studies/agentic-document-intelligence", "/assessments/data-ai-readiness"],
    pageJourney: "Homepage → Legal → Case Study → Assessment",
    identifiedCompany: "Martinez & Associates LLP",
    identifiedDomain: "martinezlaw.com",
    utmSource: "linkedin",
    utmMedium: "paid",
    utmCampaign: "legal-ai-2025",
    assessmentScores: {
      dataInfrastructure: 45,
      analyticsCapability: 60,
      aiReadiness: 35,
      organizationalAlignment: 70,
      total: 52
    },
    contactHistory: [
      {
        id: uuidv4(),
        channel: "linkedin",
        contactedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        campaign: "Q1-Legal-Outreach",
        notes: "Connected, sent intro message"
      },
      {
        id: uuidv4(),
        channel: "email",
        contactedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        campaign: "Legal-Nurture-Sequence",
        notes: "Sent case study follow-up"
      }
    ],
    notes: [
      {
        id: uuidv4(),
        content: "Very interested in document automation. Has 50+ attorneys. Decision maker.",
        author: "Admin",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    tags: ["decision-maker", "50+ employees", "document-automation"]
  },

  // New Manufacturing Lead - Just submitted assessment
  {
    email: "mike.rodriguez@precisionmfg.com",
    firstName: "Mike",
    lastName: "Rodriguez",
    company: "Precision Manufacturing Co",
    phone: "(312) 555-0456",
    status: "new",
    tier: "B",
    industry: "Manufacturing",
    formType: "assessment",
    resourceSlug: "manufacturing",
    resourceTitle: "Manufacturing AI Readiness Assessment",
    sourcePage: "/assessments/manufacturing",
    behaviorScore: 62,
    behaviorTier: "warm",
    pagesVisited: ["/", "/industries/manufacturing", "/assessments/manufacturing"],
    pageJourney: "Homepage → Manufacturing → Assessment",
    identifiedCompany: "Precision Manufacturing Co",
    identifiedDomain: "precisionmfg.com",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "manufacturing-ai",
    assessmentScores: {
      productionEfficiency: 55,
      qualityControl: 70,
      predictiveMaintenance: 40,
      supplyChainVisibility: 60,
      total: 56
    },
    emailSequence: {
      sequenceType: "assessment",
      enrolledAt: new Date().toISOString(),
      status: "active",
      currentDay: 0,
      emailsSent: {
        day0: { sentAt: new Date().toISOString(), messageId: "ses-msg-001" }
      }
    }
  },

  // Healthcare Lead - Downloaded guide
  {
    email: "dr.amanda.foster@brightsmiledso.com",
    firstName: "Amanda",
    lastName: "Foster",
    company: "BrightSmile Dental Group",
    status: "contacted",
    tier: "A",
    industry: "Healthcare",
    formType: "guide",
    resourceSlug: "healthcare-data-guide",
    resourceTitle: "Healthcare Data Integration Guide",
    sourcePage: "/resources/guides/healthcare-data-guide",
    behaviorScore: 78,
    behaviorTier: "hot",
    pagesVisited: ["/", "/industries/healthcare", "/resources/guides/healthcare-data-guide", "/case-studies"],
    pageJourney: "Homepage → Healthcare → Guide Download → Case Studies",
    identifiedCompany: "BrightSmile Dental Group",
    utmSource: "referral",
    referrerSource: "dentaleconomics.com",
    contactHistory: [
      {
        id: uuidv4(),
        channel: "email",
        contactedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        campaign: "Healthcare-Guide-Followup"
      }
    ],
    notes: [
      {
        id: uuidv4(),
        content: "DSO with 12 locations. Looking to consolidate patient data across practices.",
        author: "Admin",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    tags: ["DSO", "multi-location", "data-consolidation"]
  },

  // Accounting Firm - Opportunity stage
  {
    email: "james.wu@hendersonwcpa.com",
    firstName: "James",
    lastName: "Wu",
    company: "Henderson & Wu CPAs",
    phone: "(617) 555-0789",
    status: "opportunity",
    tier: "A",
    industry: "Accounting",
    formType: "contact",
    message: "We're a mid-size CPA firm looking to automate our document processing and client reporting. Would like to discuss your AI solutions.",
    sourcePage: "/contact",
    behaviorScore: 92,
    behaviorTier: "hot",
    pagesVisited: ["/", "/services/ai-services", "/services/analytics-bi", "/case-studies/agentic-document-intelligence", "/contact"],
    pageJourney: "Homepage → AI Services → Analytics → Case Study → Contact",
    identifiedCompany: "Henderson & Wu CPAs",
    identifiedDomain: "hendersonwcpa.com",
    utmSource: "linkedin",
    utmMedium: "organic",
    contactHistory: [
      {
        id: uuidv4(),
        channel: "linkedin",
        contactedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        campaign: "Accounting-Q1"
      },
      {
        id: uuidv4(),
        channel: "email",
        contactedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        campaign: "Accounting-Q1",
        notes: "Scheduled discovery call"
      },
      {
        id: uuidv4(),
        channel: "phone",
        contactedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        notes: "Discovery call completed. Very interested. Sending proposal."
      }
    ],
    notes: [
      {
        id: uuidv4(),
        content: "Discovery call went great. 25-person firm, processing 500+ tax returns annually. Pain point is manual data entry from client documents.",
        author: "Admin",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        content: "Sent proposal for Document AI pilot. Decision expected within 2 weeks.",
        author: "Admin",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    tags: ["proposal-sent", "document-ai", "tax-processing"]
  },

  // Commercial Real Estate - Cold lead
  {
    email: "patricia.banks@silversteincre.com",
    firstName: "Patricia",
    lastName: "Banks",
    company: "Silverstein Commercial Properties",
    status: "new",
    industry: "Commercial Real Estate",
    formType: "newsletter",
    sourcePage: "/blog/ai-trends-2025",
    behaviorScore: 25,
    behaviorTier: "cold",
    pagesVisited: ["/blog/ai-trends-2025"],
    pageJourney: "Blog Post",
    utmSource: "twitter",
    utmMedium: "organic"
  },

  // Lost Lead - Went with competitor
  {
    email: "robert.kim@techstartupxyz.com",
    firstName: "Robert",
    lastName: "Kim",
    company: "TechStartup XYZ",
    phone: "(650) 555-0321",
    status: "lost",
    tier: "B",
    industry: "Technology",
    formType: "contact",
    message: "Looking for data analytics solutions for our SaaS platform.",
    sourcePage: "/contact",
    behaviorScore: 55,
    behaviorTier: "warm",
    pagesVisited: ["/", "/services/analytics-bi", "/contact"],
    contactHistory: [
      {
        id: uuidv4(),
        channel: "email",
        contactedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        campaign: "Tech-Outreach"
      },
      {
        id: uuidv4(),
        channel: "phone",
        contactedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        notes: "Had call, seemed interested"
      }
    ],
    notes: [
      {
        id: uuidv4(),
        content: "Went with Looker instead. Said our solution was impressive but they wanted something more established.",
        author: "Admin",
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    tags: ["competitor-loss", "looker"]
  },

  // Customer - Converted
  {
    email: "jennifer.martinez@oaklandlegal.com",
    firstName: "Jennifer",
    lastName: "Martinez",
    company: "Oakland Legal Partners",
    phone: "(510) 555-0999",
    status: "customer",
    tier: "A",
    industry: "Legal",
    formType: "assessment",
    resourceSlug: "data-ai-readiness",
    sourcePage: "/assessments/data-ai-readiness",
    behaviorScore: 95,
    behaviorTier: "hot",
    pagesVisited: ["/", "/industries/legal", "/case-studies/agentic-document-intelligence", "/assessments/data-ai-readiness", "/contact"],
    identifiedCompany: "Oakland Legal Partners",
    identifiedDomain: "oaklandlegal.com",
    assessmentScores: {
      dataInfrastructure: 40,
      analyticsCapability: 50,
      aiReadiness: 30,
      organizationalAlignment: 65,
      total: 46
    },
    contactHistory: [
      {
        id: uuidv4(),
        channel: "linkedin",
        contactedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        campaign: "Legal-AI-Launch"
      },
      {
        id: uuidv4(),
        channel: "email",
        contactedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        channel: "phone",
        contactedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        notes: "Discovery call"
      },
      {
        id: uuidv4(),
        channel: "phone",
        contactedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        notes: "Proposal review"
      }
    ],
    notes: [
      {
        id: uuidv4(),
        content: "Signed contract for Document AI implementation. 3-month pilot starting next week.",
        author: "Admin",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        content: "Kickoff meeting scheduled. Primary contact is Jennifer, IT contact is David Chen.",
        author: "Admin",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    tags: ["active-customer", "document-ai", "pilot-phase"]
  },

  // Guide download - Legal
  {
    email: "david.thompson@lawsonlitigation.com",
    firstName: "David",
    lastName: "Thompson",
    company: "Lawson Litigation Group",
    status: "new",
    tier: "B",
    industry: "Legal",
    formType: "guide",
    resourceSlug: "associate-multiplier",
    resourceTitle: "The Associate Multiplier Guide",
    sourcePage: "/resources/guides/associate-multiplier",
    behaviorScore: 48,
    behaviorTier: "warm",
    pagesVisited: ["/industries/legal", "/resources/guides/associate-multiplier"],
    pageJourney: "Legal Page → Guide Download",
    utmSource: "google",
    utmMedium: "organic",
    emailSequence: {
      sequenceType: "guide-legal",
      enrolledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active",
      currentDay: 2,
      emailsSent: {
        day0: { sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        day2: { sentAt: new Date().toISOString() }
      }
    }
  },

  // Warm lead - Multiple page views
  {
    email: "lisa.nguyen@bayareamedical.org",
    firstName: "Lisa",
    lastName: "Nguyen",
    company: "Bay Area Medical Center",
    status: "new",
    industry: "Healthcare",
    formType: "contact",
    message: "Interested in learning more about your healthcare analytics solutions. We have multiple imaging centers and struggle with data silos.",
    sourcePage: "/contact",
    behaviorScore: 72,
    behaviorTier: "hot",
    pagesVisited: ["/", "/industries/healthcare", "/services/analytics-bi", "/services/data-ai-strategy", "/case-studies", "/contact"],
    pageJourney: "Homepage → Healthcare → Analytics → Strategy → Case Studies → Contact",
    identifiedCompany: "Bay Area Medical Center",
    identifiedDomain: "bayareamedical.org",
    referrerSource: "google.com",
    tags: ["imaging-center", "data-silos", "multi-location"]
  },

  // Newsletter signup only
  {
    email: "alex.johnson@randomcompany.com",
    firstName: "Alex",
    lastName: "Johnson",
    status: "new",
    industry: "Unknown",
    formType: "newsletter",
    sourcePage: "/",
    behaviorScore: 15,
    behaviorTier: "cold",
    pagesVisited: ["/"],
    pageJourney: "Homepage"
  }
];

async function seedLead(leadData: Partial<Lead>) {
  const now = new Date().toISOString();
  const createdAt = leadData.status === "customer"
    ? new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    : leadData.status === "lost"
    ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    : leadData.status === "opportunity"
    ? new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    : new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString();

  const lead: Lead = {
    pk: `LEAD#${leadData.email!.toLowerCase()}`,
    sk: `#CREATED#${createdAt}`,
    leadId: uuidv4(),
    email: leadData.email!,
    firstName: leadData.firstName || "",
    lastName: leadData.lastName || "",
    company: leadData.company,
    phone: leadData.phone,
    message: leadData.message,
    formType: leadData.formType || "contact",
    resourceSlug: leadData.resourceSlug,
    resourceTitle: leadData.resourceTitle,
    sourcePage: leadData.sourcePage || "/",
    visitorId: uuidv4(),
    sessionId: uuidv4(),
    behaviorScore: leadData.behaviorScore || 0,
    behaviorTier: leadData.behaviorTier || "cold",
    pagesVisited: leadData.pagesVisited || [],
    pageJourney: leadData.pageJourney,
    identifiedCompany: leadData.identifiedCompany,
    identifiedDomain: leadData.identifiedDomain,
    utmSource: leadData.utmSource,
    utmMedium: leadData.utmMedium,
    utmCampaign: leadData.utmCampaign,
    referrerSource: leadData.referrerSource,
    status: leadData.status || "new",
    tier: leadData.tier,
    industry: leadData.industry,
    notes: leadData.notes || [],
    tags: leadData.tags || [],
    contactHistory: leadData.contactHistory || [],
    assessmentScores: leadData.assessmentScores,
    emailSequence: leadData.emailSequence,
    createdAt,
    updatedAt: now,
    lastActivityAt: now
  };

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: lead
  }));

  console.log(`✓ Created lead: ${lead.firstName} ${lead.lastName} (${lead.email}) - ${lead.status}`);
}

async function main() {
  console.log("Seeding sample leads to DynamoDB...\n");

  for (const lead of sampleLeads) {
    try {
      await seedLead(lead);
    } catch (error) {
      console.error(`✗ Failed to create lead ${lead.email}:`, error);
    }
  }

  console.log("\n✓ Done! Created", sampleLeads.length, "sample leads.");
  console.log("\nView them at: https://databender.co/admin/leads");
}

main().catch(console.error);

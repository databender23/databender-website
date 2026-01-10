# Databender Website Restructure Plan

## Executive Summary

This document outlines the complete restructure of databender.co around a clear positioning and differentiated service architecture designed to resonate with business executives.

### Core Positioning

> **"Boutique Strategy. Enterprise Delivery."**
>
> Senior-led expertise backed by a 200-person delivery team. The strategic thinking of a boutique consultancy with the execution capacity of a large firm—at mid-market prices.

### Primary Goals

1. **Communicate value in business terms** — Not technology jargon, but outcomes executives care about
2. **Highlight unique capabilities** — AI that works, scale delivery, full-stack solutions
3. **Create clear pathways** — From any page, visitors can find how we help their industry
4. **Capture leads effectively** — Self-service assessments and consultation booking
5. **Build credibility** — Case studies and social proof from target industries

---

## Site Architecture

```
databender.co/
│
├── / (Homepage)
│   └── Primary entry point with positioning, capabilities, industries, CTAs
│
├── /services/
│   ├── Hub page (three pillars overview)
│   │
│   ├── DATA MANAGEMENT
│   │   ├── /data-integration/
│   │   ├── /ai-data-cleanup/        ★ Flagship
│   │   └── /data-foundation/
│   │
│   ├── BUSINESS INTELLIGENCE
│   │   ├── /dashboards-analytics/
│   │   ├── /natural-language-bi/    ★ Flagship
│   │   └── /operational-visibility/
│   │
│   ├── AI & AUTOMATION
│   │   ├── /ai-insights/            ★ Flagship
│   │   └── /predictive-analytics/
│   │
│   └── EXTENDED CAPABILITIES
│       ├── /custom-applications/
│       ├── /managed-services/
│       └── /compliance-security/
│
├── /industries/
│   ├── Hub page (cross-industry positioning)
│   ├── /professional-services/
│   │   ├── Overview page
│   │   ├── /legal/
│   │   └── /accounting/
│   ├── /healthcare-dental/
│   │   ├── Overview page
│   │   ├── /medical/
│   │   └── /dental-dso/
│   ├── /commercial-real-estate/
│   └── /manufacturing/
│
├── /case-studies/
│   ├── Hub page (filterable by industry/service)
│   └── Individual case study pages
│
├── /assessments/
│   ├── /data-ai-readiness/          (General)
│   └── Industry-specific assessments (future)
│
├── /about/
├── /blog/
└── /contact/
```

---

## Key Differentiators to Communicate

### On Every Page

These messages should be reinforced throughout the site:

| Differentiator | Executive-Friendly Message |
|----------------|---------------------------|
| **Senior + Scale** | "Senior experts guide your project. A 200-person team delivers it." |
| **AI That Works** | "AI analytics that actually answers correctly—because we build the foundation first." |
| **From Insight to Action** | "We don't stop at dashboards. We build systems that put your data to work." |
| **Regulated-Ready** | "HIPAA, GDPR, SOC 2. Compliance built in from day one." |
| **Cross-Industry Intelligence** | "Best practices from healthcare, legal, manufacturing—applied to your business." |

---

## Voice & Tone Guidelines

### Do Use

- **Direct language**: "We connect your systems" not "We enable digital transformation"
- **Specific outcomes**: "See profitability by location" not "Gain actionable insights"
- **Business terms**: "Revenue," "efficiency," "visibility" not "data lakes," "ETL," "pipelines"
- **Confident but not arrogant**: "We've done this before" not "We're the best"

### Avoid

| Don't Say | Say Instead |
|-----------|-------------|
| "Cutting-edge technology" | "Proven approaches" |
| "Digital transformation" | "Modern data capabilities" |
| "Leverage your data assets" | "Use your data" |
| "Seamless integration" | "Connected systems" |
| "Unlock insights" | "See what's happening" |
| "Best-in-class" | (just show the results) |
| "End-to-end solution" | "Complete solution" |

### Headlines Should Be

- **Outcome-focused**: What the visitor gets, not what we do
- **Specific**: Concrete benefits, not abstract promises
- **Scannable**: Key message in 5-7 words

---

## Cross-Linking Strategy

### Service Pages → Industry Pages

Every service page includes a section: **"How This Applies to Your Industry"**

```
┌─────────────────────────────────────────────────────────────────┐
│  HOW THIS APPLIES TO YOUR INDUSTRY                              │
│                                                                 │
│  [Professional Services]  [Healthcare-Dental]                   │
│   CRM cleanup, client     Patient record matching,              │
│   record reconciliation   insurance data cleanup                │
│                                                                 │
│  [Commercial Real Estate] [Manufacturing]                       │
│   Tenant database         Salesforce cleanup,                   │
│   reconciliation          lead deduplication                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Industry Pages → Service Pages

Every industry page highlights relevant services with industry-specific framing:

```
┌─────────────────────────────────────────────────────────────────┐
│  CAPABILITIES FOR [INDUSTRY]                                    │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ [Industry Term]  │  │ [Industry Term]  │                    │
│  │ (Service Name)   │  │ (Service Name)   │                    │
│  │ Brief benefit    │  │ Brief benefit    │                    │
│  │ [Learn More →]   │  │ [Learn More →]   │                    │
│  └──────────────────┘  └──────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Lead Capture Strategy

### Primary CTAs (In Priority Order)

1. **"Take Our Free Assessment"** → Self-service qualification tool
2. **"Schedule a Consultation"** → Calendly booking (15-30 min)
3. **"See How We've Helped"** → Case studies
4. **"Contact Us"** → Fallback for those who prefer forms

### CTA Placement

| Page Type | Primary CTA | Secondary CTA |
|-----------|-------------|---------------|
| Homepage | Assessment | Schedule Consultation |
| Service Pages | Assessment | Schedule Consultation |
| Industry Pages | Industry Assessment (if available) | Schedule Consultation |
| Case Studies | Schedule Consultation | Related Case Study |
| Blog Posts | Related Assessment | Newsletter Signup |

### Assessment Flow

```
Visitor clicks "Take Assessment"
        ↓
Quick qualification questions (2 min)
        ↓
Email capture before results
        ↓
Personalized recommendations
        ↓
CTA: Schedule consultation
        ↓
Automated email nurture sequence
```

---

## Case Studies & Social Proof

### Case Study Template

Each case study follows this structure:

```
INDUSTRY TAG | SERVICE TAGS

HEADLINE: [Outcome-focused, specific result]

THE SITUATION (2-3 sentences)
What the client was dealing with. Business context, not technical details.

THE CHALLENGE (2-3 sentences)
The specific problem that needed solving. Written in business terms.

WHAT WE BUILT (3-5 bullets)
Concrete deliverables. Outcomes, not technical implementations.

THE RESULTS (3-4 metrics)
Quantified impact wherever possible:
- Time saved
- Revenue impact
- Efficiency gains
- Specific capabilities enabled

QUOTE (if available)
Client testimonial with name, title, company (or anonymized)

[Schedule a Consultation] [See More Case Studies]
```

### Priority Case Studies to Create

| Case Study | Industry | Services | Status |
|------------|----------|----------|--------|
| Healthcare Pricing Intelligence | Healthcare | Data Integration, Analytics | Create from existing project |
| Secure Knowledge Platform | Professional Services | AI, Data Integration | Create from RAG project |
| Sales Intelligence Pipeline | Manufacturing | Predictive Analytics, CRM | Create from lead scoring project |
| Multi-Location Analytics | Healthcare-Dental | Dashboards, Data Integration | Template for future |
| Portfolio Intelligence | CRE | Data Integration, Dashboards | Template for future |

### Testimonial Requirements

**Current State:** Testimonials lack industry context

**Target State:** Each target industry has at least one testimonial

**Action Items:**
1. Add industry/project context to existing testimonials
2. Request testimonials from healthcare pricing project
3. Request testimonials from any legal/professional services work
4. Collect testimonials as new projects complete

---

## Self-Service Assessments

### General Assessment: Data & AI Readiness

**Purpose:** Qualify leads, demonstrate expertise, capture email

**URL:** `/assessments/data-ai-readiness/`

**Questions:**

```
1. What's your biggest data challenge right now?
   [ ] Data scattered across too many systems
   [ ] Can't trust our data quality
   [ ] Reporting takes too long
   [ ] Missing insights for decisions
   [ ] Manual processes eating up time
   [ ] Want to use AI but don't know how

2. Do you have internal data/analytics staff?
   [ ] No dedicated data roles
   [ ] 1-2 people handling data among other duties
   [ ] Small data team
   [ ] Mature data organization

3. What's your timeline?
   [ ] Urgent - need help now
   [ ] Near-term - within 3 months
   [ ] Planning - within 6 months
   [ ] Exploring - no specific timeline

4. What industry are you in?
   [ ] Healthcare / Dental
   [ ] Legal / Professional Services
   [ ] Commercial Real Estate
   [ ] Manufacturing
   [ ] Other (specify)

5. What's your approximate budget range?
   [ ] Under $10K
   [ ] $10K - $25K
   [ ] $25K - $50K
   [ ] $50K - $100K
   [ ] Over $100K
   [ ] Not sure yet

CONTACT INFO:
- Name (required)
- Email (required)
- Company (required)
- Phone (optional)
- Anything else? (optional text)
```

**Results Page:**

Based on responses, show:
1. Summary of their situation
2. 2-3 recommended next steps
3. Relevant case study link
4. CTA: Schedule consultation

### Future Industry-Specific Assessments

| Assessment | Industry | Focus |
|------------|----------|-------|
| Firm Knowledge Readiness | Professional Services | Document search, AI readiness |
| Practice Data Readiness | Healthcare-Dental | Multi-location visibility, integration |
| Portfolio Analytics Readiness | CRE | System connectivity, reporting needs |
| Scale-Up Data Readiness | Manufacturing | Infrastructure gaps, analytics maturity |

---

## Email Nurture Sequences

### Post-Assessment Sequence

**Day 0 (Immediate):**
- Thank you for completing the assessment
- Summary of their responses
- Link to relevant resource

**Day 2:**
- Case study relevant to their industry
- "Here's how we helped a similar company..."

**Day 5:**
- Educational content related to their primary challenge
- Blog post or guide

**Day 10:**
- Direct invitation to schedule consultation
- Mention specific ways we could help based on their responses

**Day 21:**
- Check-in email
- "Still thinking about [their challenge]?"
- New resource or case study

---

## Content to Remove/Redirect

### Pages to Remove

| Page | Action | Redirect To |
|------|--------|-------------|
| /current-projects/ | Delete | /case-studies/ |
| /industries/agriculture/ | Delete | /industries/ |
| /industries/beverage-spirits/ | Delete | /industries/ |
| /industries/cannabis/ | Delete | /industries/ |
| /industries/content-creators/ | Delete | /industries/ |
| /industries/small-businesses/ | Delete | / (homepage) |
| /technologies/ (entire section) | Delete or merge | /services/ |
| "Our Process" nav link | Remove | (broken link) |

### Content to Update

| Element | Current Issue | Action |
|---------|--------------|--------|
| Client logos | Enterprise logos conflict with SMB positioning | Replace with SMB-appropriate or remove |
| Testimonials | No industry context | Add project/industry tags |
| Jobs/Current Projects | 4-year-old listings | Convert to case studies |
| Hero messaging | Generic, corporate speak | Update to new positioning |

---

## Technical Requirements

### Essential Integrations

| Tool | Purpose | Priority |
|------|---------|----------|
| Calendly | Consultation booking | High |
| WPForms or Typeform | Assessment forms | High |
| Mailchimp/ActiveCampaign | Email automation | High |
| Yoast SEO | SEO optimization | High |
| Google Analytics 4 | Tracking | High |
| Redirection plugin | URL redirects | Medium |

### Assessment Tool Options

| Option | Cost | Pros | Cons |
|--------|------|------|------|
| Typeform | $25+/mo | Beautiful UX, easy conditional logic | External service, limited free tier |
| Gravity Forms | $59/yr | WordPress native, powerful | Requires more setup |
| WPForms Pro | $49/yr | Easy to use, good support | Less flexible than Gravity |

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-3)
- [ ] Update homepage with new positioning
- [ ] Fix broken navigation links
- [ ] Remove outdated industry pages
- [ ] Create services hub page

### Phase 2: Flagship Services (Weeks 4-6)
- [ ] Create AI Data Cleanup page
- [ ] Create Natural Language BI page
- [ ] Create AI Insights page
- [ ] Set up assessment form

### Phase 3: Core Services (Weeks 7-10)
- [ ] Create remaining service pages
- [ ] Create extended capabilities pages
- [ ] Implement cross-linking

### Phase 4: Industries (Weeks 11-14)
- [ ] Create industry hub page
- [ ] Create Professional Services pages
- [ ] Create Healthcare-Dental pages
- [ ] Create CRE and Manufacturing pages

### Phase 5: Social Proof (Weeks 15-17)
- [ ] Create case studies hub
- [ ] Write 3 initial case studies
- [ ] Update testimonials
- [ ] Add industry context throughout

### Phase 6: Lead Capture (Weeks 18-20)
- [ ] Implement Calendly booking
- [ ] Set up email nurture sequences
- [ ] Test assessment flow
- [ ] Launch and monitor

---

## Folder Structure for Page Specs

```
Website Plans/
├── _overview.md                    ← This document
├── Homepage/
│   └── homepage.md
├── Services/
│   ├── _services-overview.md
│   ├── Data-Management/
│   │   ├── data-integration.md
│   │   ├── ai-data-cleanup.md
│   │   └── data-foundation.md
│   ├── Business-Intelligence/
│   │   ├── dashboards-analytics.md
│   │   ├── natural-language-bi.md
│   │   └── operational-visibility.md
│   ├── AI-Automation/
│   │   ├── ai-insights.md
│   │   └── predictive-analytics.md
│   └── Extended-Capabilities/
│       ├── custom-applications.md
│       ├── managed-services.md
│       └── compliance-security.md
├── Industries/
│   ├── _industries-overview.md
│   ├── Professional-Services/
│   │   ├── _overview.md
│   │   ├── legal.md
│   │   └── accounting.md
│   ├── Healthcare-Dental/
│   │   ├── _overview.md
│   │   ├── medical.md
│   │   └── dental-dso.md
│   ├── Commercial-Real-Estate/
│   │   └── cre.md
│   └── Manufacturing/
│       └── manufacturing.md
├── Case-Studies/
│   └── _case-studies-overview.md
└── Assessments/
    └── _assessments-overview.md
```

Each page spec document includes:
1. URL and page title
2. Headline and subheadline copy
3. Section-by-section content outline
4. Cross-links to other pages
5. CTAs and lead capture elements
6. SEO keywords

---

## Success Metrics

### Traffic & SEO
- Organic traffic to service pages (+50% in 6 months)
- Keyword rankings for target terms
- Reduced bounce rate on key pages

### Engagement
- Time on page: 2+ minutes for service pages
- Pages per session: 3+
- Assessment completion rate: 40%+

### Conversion
- Assessment completions per month
- Consultation bookings per month
- Lead → Opportunity conversion rate

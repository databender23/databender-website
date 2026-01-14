# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server

# Testing
npm test              # Run Jest unit tests (required before deployment)
npm run test:watch    # Jest in watch mode for development
npm run test:coverage # Jest with coverage report
npm run test:e2e      # Run Playwright E2E tests
npm run test:e2e:ui   # Playwright with interactive UI
npm run test:all      # Run both Jest and E2E tests
```

## Testing Infrastructure

**CRITICAL: All unit tests must pass before deployment.** The `amplify.yml` runs `npm test` before `npm run build` - failing tests will block deployment.

### Test Structure

```
tests/
├── unit/                          # Jest unit tests
│   ├── api/                       # API route tests
│   │   └── contact.test.ts        # Contact form API
│   └── lib/                       # Library/utility tests
│       └── analytics/
│           └── lead-scoring.test.ts
├── e2e/                           # Playwright E2E tests
│   ├── flows/                     # User journey tests
│   │   └── contact-submission.spec.ts
│   ├── admin/                     # Admin flow tests
│   │   └── login.spec.ts
│   └── public/                    # Public page tests
│       └── homepage.spec.ts
└── setup/
    └── jest.setup.ts              # Jest configuration and mocks
```

### Writing Tests

**API Route Tests** (use `@jest-environment node`):
```typescript
/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'

jest.mock('@/lib/leads/lead-service', () => ({
  createLead: jest.fn().mockResolvedValue({ leadId: 'test-123' }),
}))

describe('POST /api/contact', () => {
  it('should return 200 for valid submission', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({ firstName: 'John', email: 'john@test.com' }),
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
```

**Component Tests** (default jsdom environment):
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

**E2E Tests** (Playwright):
```typescript
import { test, expect } from '@playwright/test'

test('contact form submission', async ({ page }) => {
  await page.goto('/contact')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=Thank you')).toBeVisible()
})
```

### Test Coverage Requirements

When making changes, **think deeply about what tests should be added or updated**:

1. **New API Routes**: Add unit tests in `tests/unit/api/` covering:
   - Valid request scenarios (200 responses)
   - Validation errors (400 responses)
   - Authentication requirements (401/403)
   - Edge cases and error handling

2. **New Components**: Add tests in `tests/unit/components/` for:
   - Rendering with different props
   - User interactions (clicks, form inputs)
   - Conditional rendering logic

3. **New Utility Functions**: Add tests in `tests/unit/lib/` for:
   - Expected outputs for various inputs
   - Edge cases (empty arrays, null values)
   - Error conditions

4. **New User Flows**: Add E2E tests in `tests/e2e/flows/` for:
   - Complete user journeys (form submission → success)
   - Error states and recovery
   - Mobile responsiveness

5. **Bug Fixes**: Add regression tests that would have caught the bug

**Before completing any feature or fix, ask yourself:**
- What existing tests might break from this change?
- What new tests would verify this change works correctly?
- What edge cases should be tested?

See `docs/testing-setup-plan.md` for comprehensive test case suggestions.

## AWS Configuration

**CRITICAL: Always use the `databender` AWS profile for ALL AWS operations.**

```bash
# CORRECT - Always include --profile databender
aws amplify list-apps --profile databender --region us-east-2
aws ses list-identities --profile databender --region us-east-1
aws route53 list-hosted-zones --profile databender

# WRONG - Never use default profile for this project
aws amplify list-apps  # ❌ Uses wrong account
```

### AWS Accounts

| Profile | Account ID | Purpose |
|---------|------------|---------|
| `databender` | 028699705186 | **Production** - Amplify, SES, Route 53, DynamoDB |
| `default` | 792782107668 | Personal account - DO NOT USE for this project |

### Key AWS Resources (databender account)

- **Amplify App**: `dmjrh5y3hpi2d` (us-east-2)
- **SES Region**: us-east-1
- **DynamoDB Region**: us-east-1
- **Domain DNS**: Currently at SiteGround (pending transfer to Route 53)

### Before ANY AWS CLI Command

1. Verify you're using the correct profile: `aws sts get-caller-identity --profile databender`
2. Expected account: `028699705186`
3. If you see `792782107668`, you're in the WRONG account

## Architecture

This is the DataBender marketing website built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and Framer Motion.

### Key Directories

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components organized by purpose:
  - `ui/` - Base components (Button, Card, Input, Badge)
  - `sections/` - Page sections (Hero, CTA, Features)
  - `layout/` - Header, Footer, ClientProviders
  - `interactive/` - Complex interactive components (ROICalculator, DataPlayground)
  - `chat/` - AI chatbot widget components
  - `animations/` - Lottie and animation wrappers
  - `forms/` - Form components (EmailCaptureForm)
  - `case-studies/` - Shared case study components
  - `case-study-diagrams/` - Interactive diagram system for case studies
- `src/lib/` - Data and utilities:
  - `services-data.ts` - Service definitions and content
  - `industries-data.ts` - Industry pages data
  - `case-studies-data.ts` - Case study definitions and testimonials
  - `blog-data.ts` - Blog post content and metadata
  - `lead-magnets-data.ts` - Lead magnet/guide definitions
  - `navigation.ts` - Main and footer navigation structure
  - `chat-logger.ts` - Chat conversation logging
  - `assessment-scoring.ts` - Assessment scoring logic
  - `manufacturing-assessment.ts` - Manufacturing assessment questions
  - `admin/` - Admin authentication (`auth.ts`)
  - `analytics/` - Analytics tracking system:
    - `AnalyticsProvider.tsx` - React context for client-side tracking
    - `company-lookup.ts` - IP-to-company identification
    - `dynamodb.ts` - DynamoDB operations for analytics storage
    - `events.ts` - Event type definitions
    - `lead-scoring.ts` - Visitor lead scoring algorithm
    - `visitor-id.ts` - Anonymous visitor ID management
  - `leads/` - Lead management system:
    - `types.ts` - Lead, ContactRecord, EmailSequence interfaces
    - `dynamodb.ts` - Lead CRUD operations, active sequence scanning
    - `lead-service.ts` - Business logic (createLead, enrichLeadWithAnalytics, getLeadStats)
  - `sequences/` - Email nurture sequence system:
    - `types.ts` - Sequence type definitions
    - `sequence-service.ts` - Enroll, pause, unsubscribe, tracking
    - `sequence-emails.ts` - Template selection and SES sending
    - `processor.ts` - Daily batch processor for scheduled emails
    - `templates/` - Email templates (assessment/, guide-legal/, guide-general/)
  - `notifications/` - Notification system (Slack, email)
- `src/types/` - TypeScript type definitions

### Non-Production Directories

The `docs/` folder contains all development documentation and strategy content (excluded from git via `.gitignore`):

- `docs/strategy/` - Brand voice, industry messaging, website plans, assessment specs
- `docs/*.md` - Technical planning (AWS deployment, case study development, interactive design)
- `docs/style-guides/` - Content style guidelines
- `docs/drafts/` - Work in progress

See `docs/README.md` for full structure.

### Design System

Defined in `src/app/globals.css` using Tailwind CSS 4's `@theme` directive:
- **Primary brand color**: Teal (`#1A9988`, used as `teal-500`)
- **Text colors**: `text-primary` (#1A1A1A), `text-secondary` (#4A4A4A), `text-muted` (#6B7280)
- **Backgrounds**: White primary, `#F8F9FA` secondary

### API Routes

- `/api/chat` - Claude-powered chatbot (requires `ANTHROPIC_API_KEY`)
- `/api/contact` - Contact form submissions
- `/api/lead-capture` - Lead magnet form submissions (auto-enrolls in email sequences)
- `/api/assessment` - Assessment result submissions (auto-enrolls in email sequences)
- `/api/analytics` - Analytics event tracking
- `/api/unsubscribe` - Token-based email unsubscribe with confirmation page
- `/api/admin/login` - Admin authentication
- `/api/admin/logout` - Admin logout
- `/api/admin/analytics/overview` - Analytics dashboard data
- `/api/admin/analytics/companies` - Company identification data
- `/api/admin/analytics/attribution` - Marketing attribution data
- `/api/admin/analytics/summary` - Daily summary cron endpoint
- `/api/admin/dashboard` - Lead Generation Command Center data
- `/api/admin/leads` - Lead listing with filters and pagination
- `/api/admin/leads/[leadId]` - Individual lead CRUD
- `/api/admin/leads/[leadId]/notes` - Add notes to lead
- `/api/admin/leads/[leadId]/contacts` - Record contact attempts
- `/api/admin/leads/export` - Lead export with filtering (CSV format)
- `/api/admin/leads/stats` - Lead statistics
- `/api/cron/sequences/process` - Daily cron to send scheduled nurture emails
- `/api/leads/webhook` - External webhook for automation tools (Instantly, Apollo.io, Dripify)
- `/api/admin/sequences` - Sequence management (list, pause, resume, check)
- `/api/admin/leads/import` - Bulk CSV lead import with sequence enrollment
- `/api/webhooks/ses-events` - AWS SES bounce/complaint/delivery webhook

### Environment Variables

```
# Chatbot
ANTHROPIC_API_KEY=         # Required for chatbot
NEXT_PUBLIC_BOOKING_URL=   # Calendar booking link for chatbot
DISABLE_CHAT_EMAILS=       # Optional: set to "true" to disable chat email notifications

# AWS Services
SES_FROM_EMAIL=            # SES sender (notifications@mail.databender.co)
SES_REGION=                # SES region (us-east-1)
DYNAMODB_REGION=           # DynamoDB region (us-east-1)

# Notifications
CHAT_NOTIFY_EMAIL=         # Email for chat digests
ANALYTICS_SUMMARY_EMAIL=   # Email for analytics summaries (falls back to CHAT_NOTIFY_EMAIL)
SLACK_WEBHOOK_URL=         # Slack incoming webhook for notifications

# Admin Dashboard
JWT_SECRET=                # Secret for admin JWT tokens (required in production)
ADMIN_USERNAME=            # Admin login username (default: "admin")
ADMIN_PASSWORD_HASH=       # Bcrypt hash of admin password

# Cron Jobs
CRON_SECRET=               # Secret for authenticating cron endpoints

# External Webhooks
WEBHOOK_API_KEY=           # API key for external automation tools (Instantly, Apollo.io, Dripify)
```

### Amplify Environment Variables

**IMPORTANT**: Amplify SSR doesn't automatically pass console env vars to Lambda runtime. The `amplify.yml` writes env vars to `.env.production` during build as a workaround.

To add/update environment variables:
1. Set them in Amplify Console (App settings → Environment variables)
2. Also add them to the `amplify.yml` preBuild phase
3. Redeploy for changes to take effect

### Component Patterns

- All client components use `"use client"` directive
- Animations use Framer Motion (`motion.div`, `AnimatePresence`)
- Lottie animations use optimized `LottieWrapper` component (see below)
- Forms follow controlled input pattern with useState

### Lottie Animation System

All Lottie animations use the optimized `LottieWrapper` component (`src/components/animations/LottieWrapper.tsx`), which uses `lottie-react` under the hood.

**CRITICAL: data-management.json CANNOT be compressed to .lottie format!**

> ⚠️ **WARNING**: The `data-management.json` animation (used on `/services/data-ai-strategy`) has embedded assets that break when converted to `.lottie` format. This animation MUST:
> - Use the raw `.json` file, NOT `.lottie`
> - Be rendered with `lottie-react`, NOT `@lottiefiles/dotlottie-react`
> - Never be auto-converted or compressed
>
> The `LottieWrapper` component fetches JSON directly and passes it to `lottie-react` to handle this correctly. DO NOT attempt to optimize this animation by converting to `.lottie` format - it will break rendering on both desktop and mobile.

**Key components:**
- `LottieWrapper` - Core component using `lottie-react` (fetches JSON, handles mobile optimizations)
- `ResponsiveAnimation` - Wrapper with sensible defaults for hero animations

**Optimizations built-in:**
- Lazy loading via intersection observer
- Mobile optimizations: 0.5x speed, freezes after first loop
- Respects `prefers-reduced-motion` accessibility setting
- Priority preloading for hero animations

**Usage:**
```tsx
// Preferred - use ResponsiveAnimation for page heroes
<ResponsiveAnimation
  lottieUrl="/animations/hero-data.json"
  className="w-full aspect-square"
/>

// Direct usage when you need more control
<LottieWrapper
  animationUrl="/animations/data-management.json"
  speed={1.3}
  priority={true}
  mobileOptimized={true}
/>
```

**Animation files:** Located in `public/animations/`. Use `.json` format for all animations (the `.lottie` compressed versions exist but are not currently used due to compatibility issues).

### Dynamic Routes

- `/services/[slug]` - Service pages (data-ai-strategy, analytics-bi, ai-services)
- `/industries/[slug]` - Industry pages (uses `industries-data.ts`)
- `/industries/legal` - Custom Legal page (not dynamic, has special content)
- `/industries/healthcare` - Custom Healthcare page (not dynamic, has special content)
- `/blog/[slug]` - Blog posts
- `/resources/guides/[slug]` - Lead magnet guides
- `/case-studies/[slug]` - Dynamic case study pages (uses `case-studies-data.ts`)

### Assessment Pages

- `/assessments` - Assessment hub page listing all assessments
- `/assessments/data-ai-readiness` - Data & AI readiness assessment
- `/assessments/data-ai-readiness/results` - Data & AI readiness results
- `/assessments/manufacturing` - Manufacturing AI assessment
- `/assessments/manufacturing/results` - Manufacturing results
- `/assessments/healthcare-benchmark` - Healthcare benchmark assessment

### Admin Pages

- `/admin/login` - Admin authentication page
- `/admin/dashboard` - **Lead Generation Command Center** (main admin landing page)
  - Action Required cards (hot leads, new today, need follow-up)
  - Priority leads list (high-score, not contacted)
  - Lead generation funnel visualization
  - Top converting pages
  - Outreach coverage (LinkedIn/Email progress)
  - Channel quality by avg lead score
- `/admin/leads` - Lead management hub with filtering, contact tracking, and export
- `/admin/leads/[leadId]` - Individual lead detail with notes, contact history, status updates
- `/admin/analytics` - Full analytics dashboard (pageviews, sessions, engagement)
- `/admin/analytics/attribution` - Marketing attribution dashboard

### Case Study Pages

Case studies have custom interactive pages in `src/app/case-studies/`:
- `agentic-document-intelligence/` - Document AI processing case study
- `army-of-ai-agents/` - AI entity resolution case study
- `what-predicts-lead-conversion/` - Lead scoring ML case study

Each has its own `components/` folder for page-specific interactive elements.

### Blog Post Formatting

Blog posts are stored in `src/lib/blog-data.ts`. When creating blog content, follow these HTML formatting rules for clean, readable posts:

**Structure:**
- Use `<h3>` for section headings (not h2 - the title is h1)
- Use `<p>` for paragraphs with proper spacing
- Use `<hr/>` for section dividers (renders as elegant gradient line)

**Emphasis & Highlights:**
- `<strong>` for bold key terms - paragraphs starting with `<strong>` get a teal-accented highlight box
- `<em>` for italics/emphasis - paragraphs containing only `<em>` render as pull quotes with left border
- Combine for impact: `<strong>Key point.</strong> Explanation here.`

**Lists:**
- Use `<ol>` for numbered steps/sequences
- Use `<ul>` for bullet points
- Wrap items in `<li>` tags

**Links:**
- Use `<a href="/path">text</a>` for internal links
- Links render in teal with underline on hover

**Example pattern for key points:**
```html
<p><strong>1. First key point.</strong></p>
<p>Explanation paragraph that follows.</p>
```

This creates a highlighted box for the key point with the explanation as regular text below.

### Notification System

The site has a comprehensive notification system in `src/lib/notifications/`:

- **Slack Notifications** (`slack.ts`): Real-time alerts for leads, company identification, conversions
- **Email Summaries** (`email-summary.ts`): Daily analytics digest via AWS SES
- **Chat Notifications** (`chat-logger.ts`): Email + Slack alerts for chat conversations

**Slack Configuration:**
- **Channel**: `#web-analytics`
- **Webhook format**: Uses simple `{ text: "..." }` format (not blocks) for webhook compatibility
- Admin page visits are excluded from notifications

### AWS SES Configuration

- **Sending Domain**: `mail.databender.co` (subdomain to avoid DMARC conflicts with main domain)
- **From Address**: `notifications@mail.databender.co`
- **Region**: us-east-1
- **DNS Records**: DKIM CNAMEs configured at SiteGround

### Analytics System

The site includes a custom analytics system (`src/lib/analytics/`) that tracks:
- Page views and user journeys
- Company identification via IP lookup
- Lead scoring based on behavior
- Marketing attribution (UTM parameters, referrers)

Data is stored in DynamoDB and viewable in the admin dashboard at `/admin/analytics`.

### SEO & Structured Data

The site implements comprehensive SEO for both traditional search engines and AI search tools.

**Schema.org Structured Data (`src/lib/schema.ts`):**
- `organizationSchema()` - Company info, used on homepage
- `serviceSchema(service)` - Service structured data
- `caseStudySchema(study)` - Case study as Article schema
- `breadcrumbSchema(items)` - Breadcrumb navigation
- `reviewSchema(testimonials)` - Aggregate reviews from testimonials
- `faqSchema(faqs)` - FAQ page schema

**Usage in pages:**
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

// In page component:
const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: service.title, url: `/services/${service.slug}` },
];

return (
  <>
    <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    <JsonLd data={serviceSchema(service)} />
    <ServicePageClient service={service} />
  </>
);
```

**Pages with structured data:**
- Homepage: `organizationSchema`
- `/services`: `faqSchema` with FAQ section
- `/services/[slug]`: `serviceSchema` + `breadcrumbSchema`
- `/case-studies`: `reviewSchema` from testimonials
- `/case-studies/[slug]`: `caseStudySchema` + `breadcrumbSchema`
- `/blog/[slug]`: `breadcrumbSchema`
- `/industries/[slug]`: `breadcrumbSchema`
- `/resources/guides/[slug]`: `breadcrumbSchema`

**AI Search Optimization:**
- `public/llms.txt` - Comprehensive content for AI crawlers (Claude, ChatGPT, Perplexity)
- `src/app/robots.ts` - Allows AI crawlers: GPTBot, Claude-Web, PerplexityBot, Googlebot-Extended, etc.
- `src/app/sitemap.ts` - Dynamic sitemap with all pages

**FAQ Component (`src/components/sections/FAQ.tsx`):**
Reusable FAQ section with Framer Motion animations. Use with `faqSchema()` for structured data.

```tsx
import { FAQ } from "@/components/sections";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const faqs = [
  { question: "What services do you offer?", answer: "..." },
  { question: "How long do projects take?", answer: "..." },
];

return (
  <>
    <JsonLd data={faqSchema(faqs)} />
    <FAQ faqs={faqs} />
  </>
);
```

**When adding new pages:**
1. Add appropriate schema (breadcrumbs for nested pages, specific schema for content type)
2. Include in sitemap.ts if dynamic route
3. Ensure images have descriptive alt text
4. Consider adding FAQ section for key pages

### Email Sequence System

Automated nurture email sequences in `src/lib/sequences/`:

**Sequences Available:**
- `assessment` - For assessment completers (5 emails over 21 days)
- `guide-legal` - For legal guide downloaders
- `guide-general` - For general guide downloaders

**Sequence Statuses:** `active`, `completed`, `paused`, `unsubscribed`, `bounced`

**How It Works:**
1. Lead completes assessment or downloads guide → Auto-enrolled in appropriate sequence
2. Day 0 email sent immediately
3. Daily cron (`/api/cron/sequences/process`) sends Day 2/7/14/21 emails based on enrollment date
4. Unsubscribe link in each email → Updates lead status, shows confirmation page

**Email Templates:** `src/lib/sequences/templates/` with 15 templates (5 per sequence)

**Cron Setup:** Call `/api/cron/sequences/process` daily with `Authorization: Bearer {CRON_SECRET}`

**Bounce/Reply Detection:**
- SES webhook at `/api/webhooks/ses-events` receives bounce/complaint events
- Hard bounce → Marks sequence as `bounced` (permanent, cannot re-enroll)
- Soft bounce → Counts bounces, pauses after 3 soft bounces
- Complaint → Auto-unsubscribes (cannot re-enroll)
- Reply detection → Pauses sequence for manual follow-up

**Sequence Management API** (`/api/admin/sequences`):
- `GET ?email=x` - Check sequence status for specific email
- `POST action=pause` - Pause with reason
- `POST action=resume` - Resume paused sequence
- `POST action=reply` - Mark as replied (pauses sequence)
- `POST action=check` - Check if email can be enrolled

**AWS SES Setup:** See `docs/ses-events-setup.md` for SNS topic and webhook configuration

### Lead Management & Automation Support

Lead hub at `/admin/leads` with:

**Contact Channel Tracking:**
- Track which channels (LinkedIn, Email, Phone) have been used
- Record campaign names and notes for each contact
- View contact history timeline in lead detail page

**Export Filtering:**
| Param | Purpose | Example |
|-------|---------|---------|
| `notContacted=true` | Only leads never contacted | Fresh leads for outreach |
| `excludeContactedVia=linkedin` | Exclude LinkedIn contacts | For email campaigns |
| `contactedVia=email` | Only email contacts | For follow-up sequences |

**Webhook for External Tools:**
`POST /api/leads/webhook` with `x-api-key: {WEBHOOK_API_KEY}`

| Action | Purpose |
|--------|---------|
| `update_status` | Change lead status from Instantly/Apollo |
| `record_contact` | Log contact via LinkedIn/email |
| `add_note` | Add notes from automation tools |
| `update_tier` | Update lead tier |

**Bulk Lead Import:**
`POST /api/admin/leads/import` (requires admin auth)

| Query Param | Purpose |
|-------------|---------|
| `dryRun=true` | Validate CSV without importing |
| `skipExisting=true` | Skip leads that already exist |
| `sequenceType=assessment` | Auto-enroll in email sequence |

CSV columns: `email` (required), `firstName`, `lastName`, `company`, `industry`, `tier`, `tags`, `notes`

```bash
# Example import with dry run
curl -X POST 'https://databender.co/api/admin/leads/import?dryRun=true' \
  -b 'admin_authenticated=true' \
  -F 'file=@leads.csv'
```

### DynamoDB Tables

All tables in `us-east-1` region:

| Table | Purpose | Key Schema |
|-------|---------|------------|
| `databender-leads` | Lead storage and management | `pk` (LEAD#{email}), `sk` (#CREATED#{timestamp}) |
| `databender-analytics-events` | Raw analytics events | `pk`, `sk` |
| `databender-analytics-sessions` | Session aggregates | `pk`, `sk` |
| `databender-analytics-conversions` | Conversion paths | `pk`, `sk` |

**GSIs on leads table:**
- `status-createdAt-index` - Filter by lead status
- `industry-createdAt-index` - Filter by industry
- `tier-behaviorScore-index` - Prioritize high-value leads
- `visitorId-createdAt-index` - Link multiple submissions

### Utility Scripts

Located in `scripts/`:

```bash
# Seed sample leads for testing
AWS_PROFILE=databender npx tsx scripts/seed-sample-leads.ts

# Clear all DynamoDB tables (analytics + leads)
AWS_PROFILE=databender npx tsx scripts/clear-tables.ts
```

### Pending Infrastructure Tasks

- **Domain Transfer**: Transfer `databender.co` from SiteGround to AWS Route 53
  - Status: DNS managed at SiteGround (pointing to Amplify)
  - Remaining: Transfer domain registration from SiteGround (Tucows) to AWS
  - Steps: Unlock domain → Get auth code → Transfer via Route 53 console

- **Daily Cron**: Set up scheduled trigger for `/api/cron/sequences/process`
  - Requires: AWS EventBridge or external cron service
  - Auth: `Authorization: Bearer {CRON_SECRET}` header

- **SES Event Notifications**: Configure bounce/complaint webhook
  - Create SNS topic for SES events
  - Subscribe webhook endpoint: `https://databender.co/api/webhooks/ses-events`
  - Configure SES identity to publish to SNS topic
  - See `docs/ses-events-setup.md` for detailed steps

### Test Scripts

```bash
# Test email sequence system (requires npm run dev)
./scripts/test-sequences.sh http://localhost:3000

# Tests: SES webhook, sequence management, lead import
# All tests should pass before deployment
```

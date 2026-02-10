# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Rules

**NEVER DELETE FILES** - Instead of deleting files, always move them to a `to_delete/` folder. This allows for review before permanent removal and prevents accidental data loss.

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
  - `services-data.ts` - Service definitions and content (4 services: Get Clarity, See What's Happening, Put AI to Work, Build What You Need)
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
- `/api/admin/login` - Admin authentication (returns MFA token if MFA enabled)
- `/api/admin/logout` - Admin logout
- `/api/admin/mfa/verify` - Verify MFA code (TOTP, email, or backup)
- `/api/admin/mfa/email-otp` - Request email OTP code
- `/api/admin/mfa/setup` - Generate TOTP QR code for setup
- `/api/admin/mfa/enable` - Enable MFA after verification (GET for status, POST to enable)
- `/api/admin/mfa/disable` - Disable MFA (requires password)
- `/api/admin/mfa/backup-codes` - Regenerate backup codes (requires password)
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
- `/api/admin/cold-outreach/overview` - Cold outreach dashboard metrics
- `/api/admin/cold-outreach/daily` - Daily send/open/click chart data
- `/api/admin/cold-outreach/leads` - Filtered cold outreach lead lists
- `/api/admin/cold-outreach/activity` - Cold outreach activity feed
- `/api/admin/email/compose` - Send tracked high-touch email
- `/api/admin/email/templates` - Email template CRUD
- `/api/track/open/[trackingId]` - Email open tracking (returns 1x1 GIF)
- `/api/track/click/[trackingId]` - Email click tracking (redirects to URL)

### Environment Variables

```
# Chatbot
ANTHROPIC_API_KEY=         # Required for chatbot
NEXT_PUBLIC_BOOKING_URL=   # Calendar booking link for chatbot
DISABLE_CHAT_EMAILS=       # Optional: set to "true" to disable chat email notifications

# AWS Services
SES_FROM_EMAIL=            # Website notifications sender (info@databender.co)
SES_REGION=                # SES region (us-east-1)
DYNAMODB_REGION=           # DynamoDB region (us-east-1)

# Cold Outreach (uses COLD_ prefix to avoid Amplify AWS_* restriction)
COLD_SES_ACCESS_KEY_ID=    # IAM user for cold outreach SES
COLD_SES_SECRET_ACCESS_KEY=# IAM secret for cold outreach SES
COLD_SES_FROM_EMAIL=       # Cold sequences sender (grant@mail.databender.co)
COLD_SES_FROM_NAME=        # Cold sequences sender name (Grant Bender)
COLD_SES_REGION=           # SES region (us-east-1)

# Notifications
CHAT_NOTIFY_EMAIL=         # Email for chat digests
ANALYTICS_SUMMARY_EMAIL=   # Email for analytics summaries (falls back to CHAT_NOTIFY_EMAIL)
SLACK_WEBHOOK_URL=         # Slack incoming webhook for notifications

# Admin Dashboard
JWT_SECRET=                # Secret for admin JWT tokens (required in production)
ADMIN_USERNAME=            # Admin login username (default: "admin")
ADMIN_PASSWORD_HASH=       # Bcrypt hash of admin password

# MFA (Multi-Factor Authentication)
MFA_ENABLED=               # "true" to enable, defaults to NODE_ENV === "production"
MFA_ENCRYPTION_KEY=        # 32-byte base64 key for TOTP encryption (openssl rand -base64 32)
ADMIN_EMAIL=               # Admin email for OTP delivery

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
- `/industries/[slug]` - Industry pages (6 total, uses `industries-data.ts`)
  - `/industries/legal` - Custom page with special content
  - `/industries/healthcare` - Custom page with special content
  - `/industries/manufacturing` - Dynamic from data
  - `/industries/commercial-real-estate` - Dynamic from data
  - `/industries/construction` - Dynamic from data
  - `/industries/wholesale-distribution` - Dynamic from data
- `/blog/[slug]` - Blog posts (6 posts in `blog-data.ts`)
- `/resources/guides/[slug]` - Lead magnet guides (19 guides across 4 industries)
- `/resources/guides/[slug]/content` - Full guide content for web reading
- `/case-studies/[slug]` - Dynamic case study pages (uses `case-studies-data.ts`)

### Assessment Pages

- `/assessments` - Assessment hub page listing all assessments
- `/assessments/data-ai-readiness` - Data & AI readiness assessment (universal)
- `/assessments/data-ai-readiness/results` - Data & AI readiness results
- `/assessments/manufacturing` - Manufacturing AI assessment
- `/assessments/manufacturing/results` - Manufacturing results
- `/assessments/legal` - Legal AI readiness assessment
- `/assessments/legal/results` - Legal results
- `/assessments/healthcare-ai-readiness` - Healthcare AI readiness assessment
- `/assessments/healthcare-ai-readiness/results` - Healthcare AI results
- `/assessments/healthcare-benchmark` - Healthcare price transparency tool (no results page)
- `/assessments/commercial-real-estate` - CRE data readiness assessment
- `/assessments/commercial-real-estate/results` - CRE results
- `/assessments/deal-intelligence` - CRE deal prioritization assessment
- `/assessments/deal-intelligence/results` - Deal intelligence results

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
- `/admin/mfa-verify` - MFA verification step during login (TOTP, Email OTP, or backup code)
- `/admin/settings` - Admin settings with MFA setup/management
  - Enable/disable MFA with QR code setup
  - View remaining backup codes
  - Regenerate backup codes
- `/admin/cold-outreach` - Cold outreach dashboard
  - Overview metrics (sent, opens, clicks, replies)
  - Sequence performance by industry
  - Daily send/open/click chart
  - Deliverability health indicators
  - Activity feed (recent events)
  - Leads requiring attention
- `/admin/cold-outreach/compose` - High-touch email composer
  - Sends from `grant@databender.co`
  - Template selection
  - Variable substitution ({{firstName}}, {{company}}, etc.)
  - Open/click tracking
  - Email preview

### Case Study Pages

Case studies have custom interactive pages in `src/app/case-studies/`:
- `agentic-document-intelligence/` - Document AI processing case study
- `army-of-ai-agents/` - AI entity resolution case study (1.69M records)
- `what-predicts-lead-conversion/` - Lead scoring ML case study (31% improvement)

Each has its own `components/` folder for page-specific interactive elements.

### Key Metrics & Messaging Guidelines

When referencing case study results in content, use these approved formulations:

| Metric | Approved Phrasing | Context |
|--------|-------------------|---------|
| Entity Resolution Cost | "80-90% less cost" or "$25K→$200" | Not "125x" - leads with concrete numbers |
| AI Cleanup | "80-90% cost reduction" | Percentage is more credible than multiplier |
| Project Economics | "$150-200K → $30-50K (comparable scope)" | Always add "comparable scope" context |
| Lead Scoring | "31% higher success rate" | Specific, verifiable number |
| Records Processed | "1.69 million records" | Concrete number, no rounding |

**Avoid:**
- Unqualified multiplier claims ("125x faster")
- Cost comparisons without context ("$200K → $30K" needs scope qualifier)
- Generic superlatives ("revolutionary", "game-changing")

**Content Style Guide:** See `Sales & Marketing/_content-style-guide.md` for full content rules including:
- AI slop word ban list (delve, leverage, robust, seamless, etc.)
- Em dash prohibition (use periods, commas, parentheses instead)
- Filler phrase elimination
- Sentence length variation requirements
- First-person restrictions (company voice uses "we", not "I")

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

**Sending Domains:**
- `databender.co` - Main domain for personal/transactional emails
- `mail.databender.co` - Subdomain for cold outreach (isolates deliverability, used for warmup)

**Email Sender Separation:**
| Use Case | From Address | Code File |
|----------|--------------|-----------|
| High-touch emails (compose UI) | `grant@databender.co` | `src/lib/email/send-email.ts` |
| Cold sequences (automated) | `grant@mail.databender.co` | `src/lib/sequences/sequence-emails.ts` |
| Guide downloads | `info@databender.co` | `src/lib/notifications/guide-email.ts` |
| Analytics summary | `info@databender.co` | `src/lib/notifications/email-summary.ts` |

**Region:** us-east-1
**DNS Records:** DKIM CNAMEs, SPF, MX configured in Route 53

### Analytics System

The site includes a comprehensive custom analytics system (`src/lib/analytics/`) that tracks:
- Page views and user journeys
- Company identification via IP lookup (enhanced with RB2B + Leadfeeder)
- Behavioral lead scoring with time decay
- W-shaped marketing attribution
- Privacy-compliant consent management

Data is stored in DynamoDB and viewable in the admin dashboard at `/admin/analytics`.

#### Lead Scoring System (`lead-scoring.ts`, `lead-scoring-decay.ts`, `lead-scoring-signals.ts`)

**Score Thresholds:**
| Tier | Score Range | Recommended Action |
|------|-------------|-------------------|
| Cold | 0-25 | Automated nurture sequences |
| Warm | 26-50 | Slack alert, review within 2 hours |
| Hot | 51-75 | Immediate outreach within 5 minutes |
| Very Hot | 76+ | Priority call, calendar booking |

**Page-Based Scoring:**
- Contact page: 30 pts | Case studies: 20 pts | Our Process: 20 pts
- Services/Industries: 15 pts | Resources/Guides: 15 pts | Blog: 5 pts

**Behavioral Scoring:**
- Guide download: 75 pts | Newsletter signup: 60 pts | Form submit: 50 pts
- Assessment complete: 40 pts | Returning visitor: 25 pts | Chat opened: 20 pts

**Time Decay (50% per 30 days):**
```typescript
Decayed Score = Original Score × (1 - 0.5 × (Days Since Event / 30))
```
Scores zero out after 90 days of inactivity. Apply to returning visitor calculations.

**Negative Scoring:**
| Signal | Points | Rationale |
|--------|--------|-----------|
| Careers page visit | -15 | Job seeker, not buyer |
| Personal email domain (Gmail, Yahoo, etc.) | -10 | B2B focus |
| Competitor email domain | -100 (disqualify) | Competitive intel |
| >60 days since last visit | -10 | Stale lead |

**Sequential Pattern Bonuses:**
- Case Study → Contact: +15 pts
- Multiple service pages → Contact: +12 pts
- 3+ visits within 7 days: +15 pts
- Blog → Guide → Case Study: +10 pts

**Session Velocity:**
- 5+ actions per session: +8 pts
- High engagement (>30s per page): +5 pts

#### Event Tracking (`events.ts`, `AnalyticsProvider.tsx`)

**Core Events:** `pageview`, `scroll_depth`, `click`, `form_submit`, `chat_open`, `chat_message`, `chat_lead_detected`, `cta_click`, `page_exit`

**New Events (Jan 2026):**
| Event | Description | Data |
|-------|-------------|------|
| `form_start` | User focuses first form field | formName, firstFieldFocused |
| `form_abandon` | User leaves with partial form | formName, fieldsCompleted, lastFieldFocused, timeSpent |
| `rage_click` | 3+ clicks in same area within 750ms | element, clickCount, coordinates |
| `video_play` | Video started | videoId, videoTitle, duration |
| `video_progress` | 25/50/75/90% milestones | videoId, milestone, currentTime |
| `video_complete` | Video finished | videoId, duration, watchTime |
| `copy_text` | User copies text (comparison shopping) | page, element type, textLength |

**Form Tracking Hook:**
```tsx
import { useFormTracking } from "@/lib/analytics";
const { formProps, fieldProps } = useFormTracking("contact-form");
<form {...formProps}><input {...fieldProps("email")} /></form>
```

**Video Tracking Hook:**
```tsx
import { useVideoTracking } from "@/lib/analytics";
const { videoRef, handlePlay, handleTimeUpdate } = useVideoTracking(videoId, title);
<video ref={videoRef} onPlay={handlePlay} onTimeUpdate={handleTimeUpdate} />
```

#### Company Identification (`company-lookup.ts`, `rb2b-lookup.ts`, `leadfeeder-lookup.ts`)

**Identification Strategy (cascading):**
1. **US Visitors**: RB2B (person-level) → Leadfeeder (company) → Reverse DNS
2. **Non-US Visitors**: Leadfeeder → Reverse DNS

**Enriched Company Data:**
```typescript
interface EnrichedCompanyInfo {
  name: string;
  domain: string;
  industry?: string;
  // Person-level (RB2B)
  personName?: string;
  personEmail?: string;
  linkedInUrl?: string;
  jobTitle?: string;
  // Company-level (Leadfeeder)
  employeeCount?: string;
  revenue?: string;
  // Metadata
  source: 'rb2b' | 'leadfeeder' | 'reverse_dns';
  confidence: 'high' | 'medium' | 'low';
}
```

**Free Tier Limits:**
- RB2B: 150 credits/month (person-level US identification)
- Leadfeeder: 100 companies/month

**Environment Variables:**
```
RB2B_API_KEY=your_key
LEADFEEDER_API_KEY=your_key
```

#### Cookie Consent System (`src/lib/consent/`, `src/components/consent/`)

**Consent Categories:**
- `necessary` - Always enabled (cannot opt out)
- `analytics` - Behavioral tracking (scroll, clicks, etc.)
- `marketing` - Not currently used

**Components:**
- `ConsentProvider` - App-wide consent state context
- `CookieConsent` - Bottom banner with preferences modal
- `ManageCookiesButton` - Footer link to reopen preferences

**Consent-Aware Tracking:**
```typescript
// AnalyticsProvider checks consent before tracking
if (!hasAnalyticsConsent()) return; // Skips behavioral events
// Basic pageviews are "necessary" and always tracked
```

**Global Privacy Control (GPC):** Automatically respected. If `navigator.globalPrivacyControl === true`, non-essential tracking is disabled.

**Consent Expiry:** Re-prompts after 12 months.

#### HubSpot CRM Integration (`src/lib/integrations/hubspot.ts`)

**Auto-sync on Lead Capture:**
- Creates/updates HubSpot contact with lead score, pages visited, attribution data
- Fire-and-forget (doesn't block API response)
- Rate limiting: 100 requests/10 seconds

**Functions:**
```typescript
// Sync lead (async, non-blocking)
syncLeadToHubSpotAsync({ email, firstName, lead_score, pages_visited, ... })

// Create deal for hot leads
createDeal({ contactEmail, dealName, amount, stage, source })

// Closed-loop attribution
getDealAttribution(dealId) // Returns first touch source for won deals
```

**Required HubSpot Custom Properties:**
`lead_score` (number), `lead_tier` (dropdown), `first_touch_source`, `first_touch_page`, `pages_visited`, `page_journey`, `identified_company`, `assessment_score`

**Environment Variable:** `HUBSPOT_API_KEY`

#### W-Shaped Attribution (`src/lib/analytics/attribution/`)

**Credit Distribution:**
- 30% First Touch (awareness)
- 30% Lead Creation (form submit, chat lead, assessment, guide download)
- 30% Opportunity Creation (marked in CRM)
- 10% Middle Touchpoints (distributed)

**Pre-opportunity (if no deal yet):** 40% first / 40% lead / 20% middle

**Functions:**
```typescript
storeTouchpoint(touchpoint)              // Store on significant events
calculateAttribution(visitorId, date)    // W-shaped calculation
getChannelAttribution(startDate, endDate) // Channel summary
markOpportunityCreated(visitorId, date)   // For full W-shape
recordSelfReportedSource(visitorId, text) // "How did you hear about us?"
```

**API Endpoints:**
- `GET /api/admin/analytics/attribution/channel-summary?days=30`
- `POST /api/admin/analytics/attribution/opportunity`
- `POST /api/analytics/self-reported`

#### Dashboard Enhancements (`src/app/admin/analytics/`)

**New Components (Jan 2026):**

| Component | Purpose | Key Metrics |
|-----------|---------|-------------|
| `FunnelChart` | Visual funnel | Visitors→Companies→Leads→Contacted→Qualified→Opps→Customers |
| `LeadVelocityRate` | LVR trend | Month-over-month qualified lead growth (target: 15%+) |
| `ResponseTimeTracker` | Hot lead response | Time from alert to first contact (target: <5 min) |
| `CohortAnalysis` | Lead quality by cohort | Weekly cohorts, conversion rates by source |

**New API Endpoints:**
- `GET /api/admin/analytics/funnel` - Funnel stage counts
- `GET /api/admin/analytics/lead-velocity` - 6-month LVR data
- `GET /api/admin/analytics/response-time` - Hot lead response metrics
- `GET /api/admin/analytics/cohorts` - Weekly cohort analysis

**Excluding Internal Team from Analytics:**

Internal team members can be excluded from analytics tracking by adding their visitor ID to the `EXCLUDED_VISITOR_IDS` set in `src/lib/analytics/visitor-id.ts`.

To find your visitor ID: Open browser DevTools → Application → Local Storage → look for `db_visitor_id`.

```typescript
// src/lib/analytics/visitor-id.ts
const EXCLUDED_VISITOR_IDS = new Set([
  "2ae176ee-90d0-4bb9-8ba3-fe231fdcb1e9", // Grant Bender (desktop)
  "bc58fd1a-3ed0-4bf2-a99b-8b8b5bf9afb0", // Grant Bender (mobile)
  // Add more team member IDs here with a comment identifying them
]);
```

Excluded visitors will not generate any analytics events (pageviews, scroll depth, clicks, form submissions, chat events).

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

**Inbound Sequences (website conversions):**
- `assessment` - For assessment completers (5 emails over 21 days: Day 0, 2, 7, 14, 21)
- `guide-legal` - For legal guide downloaders (5 emails over 21 days)
- `guide-general` - For general guide downloaders (5 emails over 21 days)

**Cold Outreach Sequences (imported leads):**
- `cold-legal` - Legal industry cold outreach (4 emails: Day 0, 3, 7, 14)
- `cold-manufacturing` - Manufacturing cold outreach (4 emails: Day 0, 3, 7, 14)
- `cold-healthcare` - Healthcare cold outreach (4 emails: Day 0, 3, 7, 14)
- `cold-cre` - Commercial real estate cold outreach (4 emails: Day 0, 3, 7, 14)

Cold sequences send from `grant@mail.databender.co` (subdomain for deliverability isolation).

**Sequence Statuses:** `active`, `completed`, `paused`, `unsubscribed`, `bounced`

**How It Works:**
1. Lead completes assessment/downloads guide OR imported via CSV → Auto-enrolled in appropriate sequence
2. Day 0 email sent immediately
3. Daily cron (`/api/cron/sequences/process`) sends scheduled emails based on enrollment date
4. Unsubscribe link in each email → Updates lead status, shows confirmation page

**Email Templates:** `src/lib/sequences/templates/` with templates organized by sequence type

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
  - Status: **Transfer in progress** (initiated 2026-01-21)
  - DNS: Already managed in Route 53 (Hosted Zone: `Z077800635RFZRCPNNKNO`)
  - Operation ID: `86972d28-df79-4c58-8b3a-114dff344b69`
  - Next: Confirm transfer via email, wait 5-7 days for completion
  - Monitor: `aws route53domains get-operation-detail --operation-id 86972d28-df79-4c58-8b3a-114dff344b69 --profile databender --region us-east-1`

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

### Deployment SOP

Standard operating procedure for deploying changes:

**Pre-Deployment Checklist:**
1. `npm run lint` - Fix any errors (warnings OK for pre-existing issues)
2. `npm run build` - Verify successful compilation
3. `npm test` - All tests must pass (required by Amplify)
4. Check git status for unintended changes

**Commit & Deploy:**
1. Stage specific files (avoid `git add -A` for sensitive content)
2. Write descriptive commit message with Co-Authored-By trailer
3. `git push origin main` - Triggers Amplify auto-deploy
4. Monitor deployment: `aws amplify list-jobs --app-id dmjrh5y3hpi2d --branch-name main --profile databender --region us-east-2`

**Post-Deployment Testing:**
1. Wait for Amplify status: `SUCCEED`
2. Test critical paths (PDF downloads, forms, assessments)
3. Verify new pages return 200 status
4. Check browser console for errors on key pages

**SEO & Metadata Checklist (for new pages):**

When adding new guide, blog, or dynamic content pages:

1. **Metadata Export** - Ensure page.tsx has `generateMetadata`:
   ```tsx
   export async function generateMetadata({ params }): Promise<Metadata> {
     return {
       title: `${content.title} | Databender`,
       description: content.description,
       openGraph: {
         title: content.title,
         description: content.description,
         type: "article",
         images: [{ url: "https://databender.co/opengraph-image", width: 1200, height: 630 }],
       },
       twitter: {
         card: "summary_large_image",
         title: content.title,
         description: content.description,
       },
       alternates: {
         canonical: `https://databender.co/path/${slug}`,
       },
     };
   }
   ```

2. **Static Params** - Include all data sources in `generateStaticParams`:
   ```tsx
   export function generateStaticParams() {
     const allItems = [...source1, ...source2, ...sourceN];
     return allItems.map((item) => ({ slug: item.slug }));
   }
   ```

3. **Structured Data** - Add JsonLd with appropriate schema:
   ```tsx
   import JsonLd from "@/components/seo/JsonLd";
   import { breadcrumbSchema } from "@/lib/schema";
   // Include <JsonLd data={breadcrumbSchema(breadcrumbs)} /> in return
   ```

4. **Sitemap** - Verify sitemap.ts includes new route patterns

5. **Data Alignment** - Ensure content data files are consistent:
   - lead-magnets-data.ts (landing pages)
   - guide-content-data.ts (full content)
   - downloads route.ts (PDF mappings)

**Bulk Testing Commands:**
```bash
# Test all PDF downloads (36 guides)
for g in associate-multiplier hipaa-compliant-ai ...; do
  curl -s -o /dev/null -w "%{http_code} $g\n" "https://databender.co/api/downloads/$g"
done

# Test all guide landing pages
for g in ...; do
  curl -s -o /dev/null -w "%{http_code} $g\n" "https://databender.co/resources/guides/$g"
done

# Test all guide content pages
for g in ...; do
  curl -s -o /dev/null -w "%{http_code} $g\n" "https://databender.co/resources/guides/$g/content"
done
```

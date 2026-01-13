# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

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
- `/api/lead-capture` - Lead magnet form submissions
- `/api/assessment` - Assessment result submissions
- `/api/analytics` - Analytics event tracking
- `/api/admin/login` - Admin authentication
- `/api/admin/logout` - Admin logout
- `/api/admin/analytics/overview` - Analytics dashboard data
- `/api/admin/analytics/companies` - Company identification data
- `/api/admin/analytics/attribution` - Marketing attribution data
- `/api/admin/analytics/summary` - Daily summary cron endpoint

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

All Lottie animations use the optimized `LottieWrapper` component (`src/components/animations/LottieWrapper.tsx`), NOT raw `lottie-react`.

**Key components:**
- `LottieWrapper` - Core optimized component using `@lottiefiles/dotlottie-react`
- `ResponsiveAnimation` - Wrapper with sensible defaults for hero animations

**Optimizations built-in:**
- Auto-converts `.json` URLs to compressed `.lottie` format (~50% smaller)
- Lazy loading via intersection observer
- Mobile optimizations: 0.5x speed, freezes after first loop, disabled frame interpolation
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

**Animation files:** Both `.json` (source) and `.lottie` (compressed) versions in `public/animations/`. The component auto-selects `.lottie` for smaller file sizes.

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
- `/admin/analytics` - Analytics dashboard
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

**Slack webhook format**: Uses simple `{ text: "..." }` format (not blocks) for webhook compatibility.

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

### Pending Infrastructure Tasks

- **Domain Transfer**: Transfer `databender.co` from SiteGround to AWS Route 53
  - Status: DNS managed at SiteGround (pointing to Amplify)
  - Remaining: Transfer domain registration from SiteGround (Tucows) to AWS
  - Steps: Unlock domain → Get auth code → Transfer via Route 53 console

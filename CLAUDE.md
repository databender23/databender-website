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
  - `navigation.ts` - Main and footer navigation structure
  - `chat-logger.ts` - Chat conversation logging
- `src/types/` - TypeScript type definitions

### Non-Production Directories

These folders contain reference materials, not production code:

- `docs/` - Development documentation and planning notes
- `src/content/` - Strategy and planning documents (75+ markdown files)
- `ai_document/` - Sample PDFs for document intelligence R&D (~38 MB)
- `lead_scoring/` - Historical sales analysis and modeling reports (~13 MB)
- `to_delete/` - Files staged for deletion (see `to_delete/README.md`)

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

### Environment Variables

```
ANTHROPIC_API_KEY=         # Required for chatbot
SES_FROM_EMAIL=            # SES sender (notifications@mail.databender.co)
SES_REGION=                # SES region (us-east-1)
CHAT_NOTIFY_EMAIL=         # Email for chat digests
SLACK_WEBHOOK_URL=         # Slack incoming webhook for notifications
DYNAMODB_REGION=           # DynamoDB region (us-east-1)
NEXT_PUBLIC_BOOKING_URL=   # Calendar booking link for chatbot
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
- Lottie animations loaded via URL fetch, rendered with `lottie-react`
- Forms follow controlled input pattern with useState

### Dynamic Routes

- `/services/[slug]` - Service pages (data-ai-strategy, analytics-bi, ai-services)
- `/industries/[slug]` - Industry pages (uses `industries-data.ts`)
- `/industries/legal` - Custom Legal page (not dynamic, has special content)
- `/blog/[slug]` - Blog posts
- `/resources/guides/[slug]` - Lead magnet guides
- `/case-studies/[slug]` - Dynamic case study pages (uses `case-studies-data.ts`)

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

### Pending Infrastructure Tasks

- **Domain Transfer**: Transfer `databender.co` from SiteGround to AWS Route 53
  - Status: DNS managed at SiteGround (pointing to Amplify)
  - Remaining: Transfer domain registration from SiteGround (Tucows) to AWS
  - Auth code from SiteGround: Request new EPP code when ready
  - Steps: Unlock domain → Get auth code → Transfer via Route 53 console
  - Note: Previous auth code had special characters causing CLI issues; use AWS Console for transfer

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

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
RESEND_API_KEY=            # Optional: email notifications
CHAT_NOTIFY_EMAIL=         # Optional: email for chat digests
NEXT_PUBLIC_BOOKING_URL=   # Calendar booking link for chatbot
```

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

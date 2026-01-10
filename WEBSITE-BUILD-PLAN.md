# Databender Website Rebuild: Next.js + AWS Amplify

## Overview
Rebuild databender.co as a modern Next.js site with AWS Amplify hosting. Full site (28+ pages) with custom assessment form and scoring logic.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom design system
- **Hosting:** AWS Amplify
- **Forms:** Custom Next.js API routes + email integration
- **Analytics:** Vercel Analytics or Google Analytics
- **CMS:** Markdown files (no external CMS needed)

## Design System (Inspired by SDG Group + Databender Brand)

**Reference:** https://www.sdggroup.com/en-us/ - Clean, enterprise consulting aesthetic

### Color Palette
```
Primary Dark:
- Background: #0D1117 (deep dark, GitHub-style)
- Surface/Card: #161B22
- Card Hover: #1C2128
- Border: rgba(255,255,255,0.1)

Accent Colors:
- Teal Primary: #1A9988 (Databender brand)
- Teal Bright: #00E6D9 (SDG-inspired cyan for highlights)
- Teal Glow: rgba(26, 153, 136, 0.3)

Text:
- Primary: #F0F6FC
- Secondary: #8B949E
- Muted: #6E7681

Gradients:
- Hero overlay: linear-gradient(135deg, rgba(13,17,23,0.95), rgba(26,153,136,0.1))
- Card accent: linear-gradient(135deg, #1A9988, #00E6D9)
```

### Typography
```
Font Stack:
- Primary: 'Inter', system-ui, sans-serif
- Alternative: 'DM Sans' for body (SDG uses this)

Sizes:
- Hero H1: 56-72px, weight 700, letter-spacing -0.02em
- Section H2: 40-48px, weight 600
- Card H3: 24-28px, weight 600
- Body: 16-18px, weight 400, line-height 1.7
- Small: 14px, weight 400

Mobile:
- Hero: 36-44px
- Section: 28-32px
```

### Layout Patterns (SDG-inspired)
```
Spacing:
- Section padding: 80-120px vertical
- Container max-width: 1280px
- Card gap: 24-32px
- Mobile section padding: 48-64px

Grid:
- 12-column responsive
- Industries/Services: 2-3 column card grid
- Breakpoints: 640px, 768px, 1024px, 1280px
```

### Effects & Animations
```
Transitions:
- Default: 0.3s ease
- Hover transforms: 0.2s ease-out
- Page transitions: 0.4s ease-in-out

Card Hover:
- transform: translateY(-4px)
- box-shadow: 0 20px 40px rgba(0,0,0,0.3)
- border-color: rgba(26,153,136,0.5)

Buttons:
- Primary: bg-teal-500, hover:bg-teal-400, shadow glow
- Secondary: bg-transparent, border, hover:bg-white/5

Subtle Effects:
- Gradient text for key headlines
- Soft glow on accent elements
- Smooth scroll behavior
```

### Component Patterns (SDG-style)
```
Hero Section:
- Full-width with gradient overlay
- Large headline + subtext
- Dual CTA buttons
- Optional background pattern/image

Industry/Service Cards:
- Icon + Title + Description + Link
- Consistent card sizing
- Hover state with border accent
- Dark surface with subtle border

Stats Section:
- Large numbers with labels
- Grid layout (4 columns desktop)
- Accent color for numbers

Timeline (About page):
- Vertical or horizontal
- Milestone markers
- Year labels with descriptions
```

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Initialize Next.js Project
```bash
# Create in a new directory (not in Sales & Marketing folder)
npx create-next-app@latest databender-site --typescript --tailwind --app --src-dir
```

### 1.2 Project Structure
```
databender-site/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Homepage
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx                # Services hub
│   │   │   ├── [slug]/page.tsx         # Dynamic service pages
│   │   ├── industries/
│   │   │   ├── page.tsx                # Industries hub
│   │   │   ├── [slug]/page.tsx         # Dynamic industry pages
│   │   ├── case-studies/
│   │   │   ├── page.tsx                # Case studies hub
│   │   │   ├── [slug]/page.tsx         # Individual case studies
│   │   ├── assessments/
│   │   │   ├── page.tsx                # Assessments hub
│   │   │   ├── data-ai-readiness/
│   │   │       ├── page.tsx            # Assessment form
│   │   │       ├── results/page.tsx    # Results display
│   │   ├── blog/
│   │   │   ├── page.tsx                # Blog listing
│   │   │   ├── [slug]/page.tsx         # Blog posts
│   │   └── api/
│   │       ├── contact/route.ts        # Contact form handler
│   │       ├── assessment/route.ts     # Assessment submission
│   │       └── subscribe/route.ts      # Newsletter signup
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Input.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── CTA.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Stats.tsx
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       └── AssessmentForm.tsx
│   ├── content/
│   │   ├── services/                   # Service page content (MDX or JSON)
│   │   ├── industries/                 # Industry page content
│   │   ├── case-studies/               # Case study content
│   │   └── blog/                       # Blog posts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── assessment-scoring.ts       # Assessment scoring logic
│   │   └── email.ts                    # Email sending utility
│   └── types/
│       └── index.ts
├── public/
│   ├── images/
│   └── fonts/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

### 1.3 AWS Setup (can be done in parallel)
1. Create AWS account at aws.amazon.com
2. Set up IAM user for Amplify
3. Install AWS CLI: `brew install awscli`
4. Configure: `aws configure`

---

## Phase 2: Core Components & Layout (Days 1-2)

### 2.1 Design System Setup
- [ ] Configure Tailwind with custom colors/fonts
- [ ] Create base UI components (Button, Card, Badge, Input)
- [ ] Build Header with navigation
- [ ] Build Footer with links and newsletter signup
- [ ] Create responsive mobile menu

### 2.2 Section Components
- [ ] Hero section (reusable, multiple variants)
- [ ] Features grid (3-4 column cards)
- [ ] Stats/metrics display
- [ ] CTA sections (multiple variants)
- [ ] Testimonial/quote blocks

### 2.3 Page Templates
- [ ] Hub page template (for Services, Industries, Case Studies)
- [ ] Detail page template (for individual service/industry pages)
- [ ] Content page template (About, Contact)

---

## Phase 3: Homepage (Day 2)

### Content Sections:
1. Hero: "Boutique Strategy. Enterprise Delivery."
2. What We Do (3 capabilities)
3. Why Databender (4 differentiators)
4. Industries (4 cards)
5. Results/Stats (4 metrics)
6. Featured Case Studies (2)
7. About brief
8. Footer CTA

---

## Phase 4: Services Pages (Days 3-4)

### Services Hub (`/services`)
- Three pillars visualization
- Service cards with links
- Decision helper section

### Individual Service Pages (9 pages):
1. `/services/ai-data-cleanup` (flagship)
2. `/services/natural-language-bi` (flagship)
3. `/services/ai-insights` (flagship)
4. `/services/data-integration`
5. `/services/data-foundation`
6. `/services/dashboards-analytics`
7. `/services/operational-visibility`
8. `/services/predictive-analytics`
9. `/services/extended-capabilities`

Each page follows template:
- Hero with headline
- Problem section
- How It Works (steps)
- What You Get (deliverables)
- Industry applications
- Related services
- CTA

---

## Phase 5: Industries Pages (Days 4-5)

### Industries Hub (`/industries`)
- Industry cards (4)
- Cross-industry capabilities matrix
- "Don't see your industry?" section

### Individual Industry Pages (6 pages):
1. `/industries/professional-services`
2. `/industries/professional-services/legal`
3. `/industries/professional-services/accounting`
4. `/industries/healthcare-dental`
5. `/industries/commercial-real-estate`
6. `/industries/manufacturing`

---

## Phase 6: Case Studies (Day 5)

### Case Studies Hub (`/case-studies`)
- Filter by industry/service
- Featured case studies grid

### Individual Case Studies (2 initial):
1. `/case-studies/ai-entity-resolution`
2. `/case-studies/custom-lead-scoring`

---

## Phase 7: Assessment System (Days 6-7)

### Assessment Form (`/assessments/data-ai-readiness`)
Multi-step form with:
- Step 1: Business Profile (4 questions)
- Step 2: Data Infrastructure (6 questions)
- Step 3: Contact Capture
- Step 4: Results display

### Scoring Logic (`lib/assessment-scoring.ts`)
```typescript
interface AssessmentScores {
  dataInfrastructure: number;    // 0-25
  analyticsCapability: number;   // 0-25
  automationMaturity: number;    // 0-25
  aiReadiness: number;           // 0-25
  total: number;                 // 0-100
  tier: 'early' | 'emerging' | 'developing' | 'advanced';
}
```

### Results Page (`/assessments/data-ai-readiness/results`)
- Score visualization
- Category breakdown
- Personalized recommendations
- CTA to schedule consultation

### API Route (`/api/assessment`)
- Save submission to database/email
- Send results email with PDF (optional)
- Trigger follow-up email sequence

---

## Phase 8: Supporting Pages (Day 7)

### About Page (`/about`)
- Mission & vision
- Key differentiators
- What we do / don't do

### Contact Page (`/contact`)
- Contact form
- Calendly embed
- Company info

### Blog (basic structure)
- Blog listing page
- Individual post template
- MDX support for content

---

## Phase 9: Forms & API Routes (Day 8)

### Contact Form API (`/api/contact`)
- Validate input
- Send email notification (Resend, SendGrid, or AWS SES)
- Return success/error

### Newsletter Signup (`/api/subscribe`)
- Email validation
- Add to mailing list (Mailchimp, ConvertKit, or custom)

---

## Phase 10: AWS Amplify Deployment (Day 8-9)

### 10.1 Amplify Setup
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify in project
amplify init

# Add hosting
amplify add hosting
# Select: Hosting with Amplify Console
# Select: Continuous deployment
```

### 10.2 Connect GitHub Repository
1. Push code to GitHub
2. In AWS Amplify Console, connect repository
3. Configure build settings:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 10.3 Custom Domain
1. In Amplify Console > Domain Management
2. Add domain: databender.co
3. Update DNS records at registrar
4. Wait for SSL certificate provisioning

---

## Phase 11: Testing & Launch (Day 9-10)

### Pre-launch Checklist
- [ ] All pages render correctly
- [ ] Mobile responsive on all breakpoints
- [ ] Forms submit and send emails
- [ ] Assessment scoring works correctly
- [ ] All internal links work
- [ ] Meta tags and OG images set
- [ ] Favicon and site icons
- [ ] 404 page styled
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility check

### DNS Cutover
1. Update DNS to point to Amplify
2. Verify SSL working
3. Test all pages on production domain
4. Monitor for issues

---

## File Locations

### Content Source (read from):
- `/Users/grantbender/Databender/Biz Functions/Sales & Marketing/Channels/Website/Website Plans/` - Page specs
- `/Users/grantbender/Databender/Biz Functions/Sales & Marketing/Brand/Core/positioning.md` - Brand voice
- `/Users/grantbender/Databender/Biz Functions/Sales & Marketing/Content/Case-Studies/` - Case study content

### New Site Location:
- `/Users/grantbender/Databender/databender-site/` - New Next.js project

---

## Verification

### Local Testing
```bash
cd /Users/grantbender/Databender/databender-site
npm run dev
# Visit http://localhost:3000
```

### Build Test
```bash
npm run build
npm run start
```

### Amplify Preview
- Each PR creates preview deployment
- Test on preview URL before merging

---

## Timeline Estimate

| Phase | Days | Description |
|-------|------|-------------|
| 1 | 0.5 | Project setup |
| 2 | 1.5 | Components & layout |
| 3 | 1 | Homepage |
| 4 | 2 | Services pages (10) |
| 5 | 1.5 | Industries pages (7) |
| 6 | 0.5 | Case studies (3) |
| 7 | 2 | Assessment system |
| 8 | 0.5 | About, Contact, Blog |
| 9 | 0.5 | Forms & APIs |
| 10 | 1 | AWS Amplify deployment |
| 11 | 1 | Testing & launch |

**Total: ~12 working days**

---

## Notes

- All content sourced from existing Sales & Marketing documentation
- Design inspired by Stripe/Linear/Vercel (dark, modern, clean)
- Assessment scoring logic based on specs in Website Plans
- Email integration TBD (Resend recommended for simplicity)
- Can iterate and add features post-launch

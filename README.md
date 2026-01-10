# Databender Website Development

This folder contains all content and plans for rebuilding databender.co as a modern Next.js site.

## Key Planning Documents

| File | Description |
|------|-------------|
| `WEBSITE-BUILD-PLAN.md` | Complete build plan with phases, design system, timeline |
| `INTERACTIVE-DESIGN-SPEC.md` | Lottie animations, micro-interactions, easter eggs, interactive components |

## Quick Start

```bash
# 1. Create new repo and clone
git init
git remote add origin <your-repo-url>

# 2. Create Next.js project in this folder
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir

# 3. Install dependencies and run
npm install
npm run dev
```

## Folder Structure

```
website_dev/
├── README.md                    # This file
├── WEBSITE-BUILD-PLAN.md        # Complete build plan with phases, design system, timeline
│
└── content/                     # All source content for pages
    ├── website-plans/           # Page specifications and structure
    │   ├── _overview.md         # Website strategy overview
    │   ├── IMPLEMENTATION-GUIDE.md
    │   ├── Homepage/            # Homepage content spec
    │   ├── Services/            # Service page specs (9 services)
    │   │   ├── Data-Management/
    │   │   ├── Business-Intelligence/
    │   │   ├── AI-Automation/
    │   │   └── Extended-Capabilities/
    │   ├── Industries/          # Industry page specs (6 industries)
    │   ├── Case-Studies/        # Case study content
    │   └── Assessments/         # Assessment form specs
    │
    ├── brand/                   # Brand guidelines
    │   ├── positioning.md       # Company positioning & differentiators
    │   ├── voice-guidelines.md  # Tone and style
    │   ├── value-propositions.md
    │   └── elevator-pitches.md
    │
    ├── industries/              # Industry-specific messaging
    │   ├── Professional-Services/
    │   ├── Healthcare-Dental/
    │   ├── Commercial-Real-Estate/
    │   ├── Manufacturing/
    │   └── General/
    │
    └── case-studies/            # Case study source content
```

## Build Plan Overview

See `WEBSITE-BUILD-PLAN.md` for the complete plan. Summary:

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** AWS Amplify
- **Forms:** Custom API routes

### Design System
- Dark theme (#0D1117 background)
- Teal accent (#1A9988)
- Inter/DM Sans typography
- SDG Group-inspired layout (https://www.sdggroup.com/en-us/)

### Pages to Build (28+)
1. Homepage
2. Services Hub + 9 service pages
3. Industries Hub + 6 industry pages
4. Case Studies Hub + 2 case studies
5. Assessments Hub + Data & AI Readiness Assessment
6. About, Contact, Blog

### Timeline
~12 working days total

## Key Content Files

| Page | Content Source |
|------|----------------|
| Homepage | `content/website-plans/Homepage/homepage.md` |
| Services Hub | `content/website-plans/Services/_services-overview.md` |
| AI Data Cleanup | `content/website-plans/Services/Data-Management/ai-data-cleanup.md` |
| Industries Hub | `content/website-plans/Industries/_industries-overview.md` |
| Professional Services | `content/website-plans/Industries/Professional-Services/_overview.md` |
| Case Studies | `content/website-plans/Case-Studies/` |
| Assessment | `content/website-plans/Assessments/Specs/general-assessment-spec.md` |
| Brand Voice | `content/brand/positioning.md` |

## AWS Amplify Setup

1. Create AWS account
2. Install Amplify CLI: `npm install -g @aws-amplify/cli`
3. Initialize: `amplify init`
4. Add hosting: `amplify add hosting`
5. Deploy: `amplify publish`

See `WEBSITE-BUILD-PLAN.md` for detailed setup instructions.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Push to GitHub, AWS Amplify auto-deploys on merge to main.

## Contact

Databender Consulting
https://databender.co

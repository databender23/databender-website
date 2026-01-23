# Development Documentation

This folder contains development planning, strategy content, and reference materials for the Databender website. It is excluded from version control (`.gitignore`).

## Folder Structure

```
docs/
├── README.md                    # This file
│
├── infrastructure/              # AWS, deployment, security
│   ├── AWS-DEPLOYMENT-PLAN.md   # AWS Amplify deployment guide
│   ├── DEPLOYMENT-SOP.md        # Deployment standard operating procedures
│   ├── SECURITY.md              # Security credentials & secrets
│   ├── mfa-setup.md             # MFA implementation & setup guide
│   ├── ses-events-setup.md      # AWS SES webhook configuration
│   └── aws-cleanup-*.md         # AWS resource cleanup logs
│
├── planning/                    # Website planning & design specs
│   ├── WEBSITE-BUILD-PLAN.md    # Original build plan & architecture
│   ├── WEBSITE-IMPROVEMENTS.md  # Planned improvements
│   ├── INTERACTIVE-DESIGN-SPEC.md # Interactive component specs
│   ├── CASE-STUDIES-PLANNING.md # Case study structure & graphics
│   ├── analytics-dashboard-redesign.md
│   └── seo-implementation-plan.md
│
├── testing/                     # Testing plans & validation
│   ├── testing-setup-plan.md    # Jest & Playwright setup
│   ├── TESTING-PLAN-LEADS.md    # Lead management testing
│   ├── EMAIL-SEQUENCES-TESTING-PLAN.md
│   ├── WEBSITE-VALIDATION-REPORT.md
│   ├── issue-tracker.md
│   └── Website Testing.md
│
├── gtm/                         # Go-to-market strategies by industry
│   ├── GTM-GENERAL-CRE.md       # General SMB + Commercial Real Estate
│   ├── GTM-PROFESSIONAL-SERVICES.md # Legal + Accounting/CPA
│   ├── GTM-HEALTHCARE.md        # Medical + Dental DSO
│   └── GTM-MANUFACTURING.md     # Manufacturing
│
├── brand/                       # Brand & content guidelines
│   ├── BRAND-GUIDE.md           # Brand voice, positioning, value props
│   ├── content-style-guide.md   # Content writing guidelines
│   └── GUIDE-REVIEW-PROCESS.md  # Lead magnet review process
│
├── reference/                   # Technical documentation & specs
│   ├── WEBSITE-DOCUMENTATION.md # Site docs, email sequences, lead management
│   ├── DOCUMENTATION-SUMMARY.md # Overview of all documentation
│   ├── ASSESSMENTS-SPECS.md     # Assessment specifications & scoring
│   └── linkedin-about.txt       # LinkedIn profile content
│
├── drafts/                      # Work in progress
│
├── content/                     # Content assets
│
└── archive/                     # Historical/source files
    ├── strategy/                # Original 80+ source files (consolidated)
    └── *.md                     # Older planning docs
```

## Quick Reference

| Need | File |
|------|------|
| **Infrastructure** |
| AWS deployment | `infrastructure/AWS-DEPLOYMENT-PLAN.md` |
| Deployment steps | `infrastructure/DEPLOYMENT-SOP.md` |
| MFA setup | `infrastructure/mfa-setup.md` |
| Security & secrets | `infrastructure/SECURITY.md` |
| SES webhooks | `infrastructure/ses-events-setup.md` |
| **Planning** |
| Site architecture | `planning/WEBSITE-BUILD-PLAN.md` |
| Case study planning | `planning/CASE-STUDIES-PLANNING.md` |
| Interactive components | `planning/INTERACTIVE-DESIGN-SPEC.md` |
| **Go-to-Market** |
| Legal/Accounting | `gtm/GTM-PROFESSIONAL-SERVICES.md` |
| Healthcare/Dental | `gtm/GTM-HEALTHCARE.md` |
| Manufacturing | `gtm/GTM-MANUFACTURING.md` |
| General/CRE | `gtm/GTM-GENERAL-CRE.md` |
| **Brand & Content** |
| Brand voice | `brand/BRAND-GUIDE.md` |
| Writing style | `brand/content-style-guide.md` |
| **Reference** |
| Assessment specs | `reference/ASSESSMENTS-SPECS.md` |
| Email sequences | `reference/WEBSITE-DOCUMENTATION.md` |
| **Testing** |
| Test setup | `testing/testing-setup-plan.md` |
| Lead testing | `testing/TESTING-PLAN-LEADS.md` |

## Key Documents

### Infrastructure
- **mfa-setup.md** - Complete MFA implementation guide including TOTP, email OTP, and backup codes
- **DEPLOYMENT-SOP.md** - Step-by-step deployment checklist for production releases
- **SECURITY.md** - Environment variables, API keys, and secrets reference

### Strategy (GTM)
- **GTM-PROFESSIONAL-SERVICES.md** - Legal + Accounting/CPA firms
- **GTM-HEALTHCARE.md** - Medical (imaging, ASCs) + Dental DSOs
- **GTM-MANUFACTURING.md** - Manufacturing outreach, offerings, lead magnets
- **GTM-GENERAL-CRE.md** - Cross-industry strategy + Commercial Real Estate

### Brand
- **BRAND-GUIDE.md** - Core positioning, voice & tone, value propositions, elevator pitches
- **content-style-guide.md** - Writing guidelines, banned words, formatting rules

## Archive

The `archive/` folder contains the original source files that were consolidated. These are preserved for reference but the files in the main folders are the authoritative versions.

## Production Code

The actual website code is in the parent directory. See `/CLAUDE.md` for development commands and architecture overview.

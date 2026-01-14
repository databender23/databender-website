# Development Documentation

This folder contains development planning, strategy content, and reference materials for the Databender website. It is excluded from version control (`.gitignore`).

## Folder Structure

```
docs/
├── README.md                           # This file
│
├── CONSOLIDATED STRATEGY (Active)
│   ├── BRAND-GUIDE.md                  # Brand voice, positioning, value props, pitches
│   ├── ASSESSMENTS-SPECS.md            # All assessment specifications & scoring
│   ├── CASE-STUDIES-PLANNING.md        # Case study structure, graphics, UX plans
│   │
│   ├── GTM-GENERAL-CRE.md              # General SMB + Commercial Real Estate GTM
│   ├── GTM-PROFESSIONAL-SERVICES.md    # Legal + Accounting/CPA GTM
│   ├── GTM-HEALTHCARE.md               # Medical + Dental DSO GTM
│   └── GTM-MANUFACTURING.md            # Manufacturing GTM
│
├── TECHNICAL DOCUMENTATION
│   ├── WEBSITE-BUILD-PLAN.md           # Original build plan & architecture
│   ├── WEBSITE-DOCUMENTATION.md        # Site docs, email sequences, lead management
│   ├── AWS-DEPLOYMENT-PLAN.md          # AWS Amplify deployment guide
│   ├── INTERACTIVE-DESIGN-SPEC.md      # Interactive component specs
│   ├── WEBSITE-IMPROVEMENTS.md         # Planned improvements
│   └── WEBSITE-VALIDATION-REPORT.md    # Site validation status
│
├── style-guides/
│   └── content-style-guide.md          # Content writing guidelines
│
├── drafts/                             # Work in progress
│
└── archive/                            # Historical/source files
    ├── strategy/                       # Original 80+ source files (now consolidated)
    └── *.md                            # Older case study planning docs
```

## Quick Reference

| Need | File |
|------|------|
| Brand voice & positioning | `BRAND-GUIDE.md` |
| Assessment specifications | `ASSESSMENTS-SPECS.md` |
| Case study planning | `CASE-STUDIES-PLANNING.md` |
| Legal/Accounting GTM | `GTM-PROFESSIONAL-SERVICES.md` |
| Healthcare/Dental GTM | `GTM-HEALTHCARE.md` |
| Manufacturing GTM | `GTM-MANUFACTURING.md` |
| General/CRE GTM | `GTM-GENERAL-CRE.md` |
| AWS deployment | `AWS-DEPLOYMENT-PLAN.md` |
| Interactive components | `INTERACTIVE-DESIGN-SPEC.md` |
| Content writing style | `style-guides/content-style-guide.md` |
| Email sequences & lead management | `WEBSITE-DOCUMENTATION.md` (sections 13-15) |

## Consolidated Documents

The documentation has been consolidated from 95+ files into 7 active strategy documents:

1. **BRAND-GUIDE.md** - Core positioning, voice & tone, value propositions, elevator pitches, channel strategy
2. **ASSESSMENTS-SPECS.md** - All assessment flows, scoring logic, email sequences
3. **CASE-STUDIES-PLANNING.md** - Data structure, graphics system, UX improvements
4. **GTM-GENERAL-CRE.md** - Cross-industry strategy + Commercial Real Estate
5. **GTM-PROFESSIONAL-SERVICES.md** - Legal + Accounting/CPA firms
6. **GTM-HEALTHCARE.md** - Medical (imaging, ASCs) + Dental DSOs
7. **GTM-MANUFACTURING.md** - Manufacturing outreach, offerings, lead magnets, staffing

## Archive

The `archive/` folder contains the original source files that were consolidated. These are preserved for reference but the consolidated files above are the authoritative versions.

## Production Code

The actual website code is in the parent directory. See `/CLAUDE.md` for development commands and architecture overview.

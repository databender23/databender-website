# Development Documentation

This folder contains development planning, strategy content, and reference materials for the Databender website. It is excluded from version control (`.gitignore`).

## Folder Structure

```
docs/
├── README.md                           # This file
├── strategy/                           # Business strategy & content planning
│   ├── brand/                          # Brand voice, positioning, value props
│   ├── website-plans/                  # Page specs, assessments, services
│   ├── industries/                     # Industry-specific messaging
│   └── case-studies/                   # Case study collection process
│
├── WEBSITE-BUILD-PLAN.md               # Original build plan & architecture
├── WEBSITE-DOCUMENTATION.md            # Technical documentation
├── AWS-DEPLOYMENT-PLAN.md              # AWS Amplify deployment guide
│
├── Case Study Development/
│   ├── CASE-STUDIES-UPDATE-PLAN.md
│   ├── CASE-STUDY-GRAPHICS.md
│   ├── CASE-STUDY-STORY-CONCEPT.md
│   └── CASE-STUDY-UX-IMPROVEMENTS.md
│
├── Interactive Design/
│   ├── INTERACTIVE-DESIGN-SPEC.md
│   ├── ENTITY-RESOLUTION-STORY-IMPLEMENTATION.md
│   └── DOCUMENT-INTELLIGENCE-REFRAME.md
│
├── style-guides/
│   └── content-style-guide.md
│
└── drafts/                             # Work in progress
```

## Quick Reference

| Need | File |
|------|------|
| Brand voice & positioning | `strategy/brand/` |
| Industry messaging | `strategy/industries/` |
| Assessment specs | `strategy/website-plans/Assessments/` |
| Service page content | `strategy/website-plans/Services/` |
| AWS deployment | `AWS-DEPLOYMENT-PLAN.md` |
| Interactive components | `INTERACTIVE-DESIGN-SPEC.md` |

## Full Documentation Index

See **[DOCUMENTATION-SUMMARY.md](./DOCUMENTATION-SUMMARY.md)** for a complete aggregated summary of all 98 documentation files, organized by category with status indicators.

## Production Code

The actual website code is in the parent directory. See `/CLAUDE.md` for development commands and architecture overview.

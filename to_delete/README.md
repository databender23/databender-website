# Files Marked for Deletion

This folder contains files that have been moved here for cleanup. Review and delete this entire folder when ready.

## Contents

### `/case-studies-old/`
Old case study implementations that have been replaced:
- `agentic-document-intelligence-original/` - Replaced by `/src/app/case-studies/agentic-document-intelligence/`
- `ai-entity-resolution-original/` - Replaced by `/src/app/case-studies/army-of-ai-agents/`
- `custom-lead-scoring-original/` - Replaced by `/src/app/case-studies/what-predicts-lead-conversion/`

### `/template-svgs/`
Default Next.js template SVG files that are unused:
- `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`

### `/duplicate-logos/`
Redundant logo variants (keep `logo-color.png` and `logo-white.png` in `/public/images/`):
- `DataBender_mainLogo.png` - Duplicate of `logo-color.png`
- `main-logo.png` - Duplicate of `logo-color.png`
- `logo-black.png` - Unused variant
- `logo-white.jpeg` - Lower quality duplicate of `logo-white.png`

## To Delete

Run this command to remove all files:
```bash
rm -rf to_delete/
```

**Date moved:** January 12, 2025

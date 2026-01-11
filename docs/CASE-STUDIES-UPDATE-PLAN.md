# Case Studies Update Plan

## Overview
Update the case studies hub and individual pages to match the new specification, including new hero copy, filtering system, third case study, and testimonials section.

---

## Changes Required

### 1. Create Case Studies Data File
**File:** `src/lib/case-studies-data.ts`

Extract case study data from embedded components into a centralized data file:

```typescript
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  industrySlug: string;
  services: string[];
  challenge: string;
  challengeType: string; // For filtering
  solution: string;
  approach: string[];
  results: { value: string; label: string }[];
  quote: string;
  quoteAuthor?: string;
  quoteRole?: string;
  images: string[];
  featured: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company?: string;
  industry: string;
}
```

**Case Studies to include:**
1. AI Entity Resolution (existing)
2. Custom Lead Scoring (existing)
3. Agentic Document Intelligence (new - from spec)

**Filter categories:**
- Industries: Professional Services, Healthcare & Dental, Commercial Real Estate, Manufacturing, Other
- Challenges: Scattered Data, Manual Reporting, No Visibility, Data Quality, AI/Automation
- Services: Data Integration, Data Cleanup, Dashboards & Analytics, AI & Automation, Custom Applications

---

### 2. Update Case Studies Hub Page
**File:** `src/app/case-studies/page.tsx`

**Hero Section Changes:**
- Headline: "Results that speak for themselves"
- Subheadline: "See how we've helped companies turn scattered data into clear answers, manual processes into automation, and guesswork into insight."
- Primary CTA: "Schedule Consultation" → /contact

**Add Filter Section:**
- Headline: "Find relevant stories"
- Three filter dropdowns/buttons:
  - By Industry
  - By Challenge
  - By Service
- Client-side filtering with useState

**Featured Section:**
- Headline: "Featured success stories"
- Display featured case studies prominently

**Add Testimonials Section:**
- Headline: "What our clients say"
- 3-4 testimonial cards with quote, name, title, industry context

**Update Bottom CTA:**
- Primary: "Start your success story" → /contact
- Secondary: "Take the assessment" → /assessments/data-ai-readiness

---

### 3. Add Third Case Study
**New Case Study:** Agentic Document Intelligence (Medical Devices)

**Data:**
- slug: "agentic-document-intelligence"
- title: "Agentic Document Intelligence for Medical Devices"
- industry: "Healthcare"
- services: ["AI & Automation", "Document Intelligence"]
- challenge: "Manual document processing costing $10K+ with ongoing validation needs"
- Key stats: 1,000+ PDFs, <$5K vs $10K OCR, zero ongoing effort
- quote: "We spent $10K on OCR that still needed manual validation. The agentic approach cost half that—and runs itself."

**Images needed:** Placeholder paths for images to be added later

---

### 4. Update Individual Case Study Template
**File:** `src/app/case-studies/[slug]/page.tsx`

Ensure template matches spec structure:
1. Industry tag + Service tags at top
2. Outcome-focused headline
3. The Situation section (2-3 sentences)
4. The Challenge section (2-3 sentences)
5. What We Built section (3-5 bullets)
6. The Results section (3-4 metrics)
7. Quote section (if available)
8. CTAs: "Schedule a Consultation" + "See More Case Studies"

---

## Files to Modify

| File | Action |
|------|--------|
| `src/lib/case-studies-data.ts` | CREATE - centralized data |
| `src/app/case-studies/page.tsx` | UPDATE - new hero, filters, testimonials |
| `src/app/case-studies/[slug]/page.tsx` | UPDATE - import from data file |

---

## Verification

1. Run `npm run dev`
2. Visit `/case-studies` - verify new hero, filters work, testimonials display
3. Test each filter category
4. Click through to each case study
5. Verify new "Agentic Document Intelligence" case study displays correctly
6. Test CTAs link correctly
7. Run `npm run build` to verify no errors

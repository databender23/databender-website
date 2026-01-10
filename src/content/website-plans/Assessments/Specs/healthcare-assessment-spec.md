# Healthcare Assessment Spec: Hospital Price Comparison Tool

## Overview

**Assessment Name**: Hospital Price Comparison Tool

**Target Audience**: Independent healthcare providers—imaging centers, ASCs, weight loss clinics, PT centers, physician groups

**Value Proposition**: "Hospitals are required to publish their prices. See exactly what they charge in your market—and quantify your cost advantage."

**Key Differentiator**: We use PUBLIC hospital price transparency data to help independent providers prove they're the better value. They compete against hospitals, not each other. We arm them with the data to win.

**Estimated Completion Time**: 3-5 minutes

---

## Assessment Flow

### Step 1: Provider Type

**Q1: What type of facility do you operate?** (Required)
- Imaging Center (MRI, CT, X-ray, etc.)
- Ambulatory Surgery Center (ASC)
- Weight Loss / Bariatric Clinic
- Physical Therapy Center
- Independent Physician Practice
- Other Specialty Clinic (specify)

**Purpose**: Determines which procedures to show in Step 2 and tailors results

---

### Step 2: Location

**Q2: State** (Required)
- Dropdown list of all US states
- Purpose: Determines which hospital benchmark dataset to display

**Q3: City or ZIP Code** (Optional but recommended)
- Free text
- Purpose: Narrows to local market for more relevant hospital comparisons

---

### Step 3: Service Selection

**Instructions**: "Select 3-5 services you want to compare against hospital pricing"

**Options vary by provider type selected in Step 1:**

**For Imaging Centers:**
- [ ] MRI (brain, spine, extremity)
- [ ] CT Scan (head, chest, abdomen)
- [ ] X-ray
- [ ] Ultrasound
- [ ] Mammography
- [ ] PET Scan
- [ ] DEXA Scan

**For ASCs:**
- [ ] Knee arthroscopy
- [ ] Colonoscopy
- [ ] Upper GI endoscopy
- [ ] Cataract surgery
- [ ] Hernia repair
- [ ] Rotator cuff repair
- [ ] Carpal tunnel release
- [ ] Spine procedures

**For Weight Loss Clinics:**
- [ ] Medical weight management program
- [ ] Bariatric surgery (gastric sleeve, bypass)
- [ ] Nutritional counseling
- [ ] Medically supervised weight loss

**For PT Centers:**
- [ ] Physical therapy evaluation
- [ ] PT treatment session
- [ ] Sports rehabilitation
- [ ] Post-surgical rehab

**For Physician Practices:**
- [ ] Office visit (new patient)
- [ ] Office visit (established)
- [ ] Specific procedures (based on specialty)

---

### Step 4: Contact Capture

**Q4: Work Email** (Required)
- Email validation
- Soft warning for personal domains (gmail, yahoo, etc.) but allow through

**Q5: Name** (Required)
- Free text

**Q6: Title/Role** (Required)
- Dropdown:
  - Owner / Partner
  - Administrator / Practice Manager
  - CEO
  - CFO
  - Marketing Director
  - Business Development
  - Other (specify)

**Q7: Facility/Practice Name** (Optional)
- Free text
- Purpose: Personalization, CRM enrichment

**Q8: Number of Locations** (Optional)
- 1
- 2-5
- 6-10
- 10+

**Q9: Phone** (Optional)
- Phone number field

**Q10: How did you hear about us?** (Optional)
- Dropdown:
  - LinkedIn
  - Google Search
  - Referral
  - Industry Association
  - Conference/Event
  - Other

---

### Step 5: Results Delivery

See [Output/Results Format](#outputresults-format) section below.

---

## Data Query Logic

Based on user inputs, query hospital benchmark database for:

```
WHERE state = [user_state]
AND (city = [user_city] OR within [X] mile radius)
AND procedure_category IN [user_selected_services]
```

### Procedure Mapping

Map user-friendly service names to underlying CPT codes for database queries:

| User Selection | CPT Code Examples |
|----------------|-------------------|
| MRI (brain) | 70551, 70552, 70553 |
| MRI (spine) | 72141, 72146, 72148 |
| CT Scan (head) | 70450, 70460, 70470 |
| Colonoscopy | 45378, 45380, 45385 |
| Knee arthroscopy | 29881, 29880 |
| Cataract surgery | 66984 |

---

## Output/Results Format

### Immediate On-Screen Preview

**Header**: "Hospital Pricing in [State/City] for [Provider Type]"

**Summary Section**:
> Based on our analysis of hospital price transparency files in [Region], here's what hospitals charge for your services:

**Service-by-Service Breakdown** (for each selected service):

| Service | Hospital Price Range | Hospital Median | Your Opportunity |
|---------|---------------------|-----------------|------------------|
| [Service 1] | $XXX - $X,XXX | $X,XXX | "If you're below $X,XXX, you have a story to tell" |
| [Service 2] | $XXX - $X,XXX | $X,XXX | "Hospital prices vary 3x—your consistency is an advantage" |
| [Service 3] | $XXX - $X,XXX | $X,XXX | "Employers are paying hospitals $X,XXX for this" |

**Visual Element**: Bar chart showing hospital price range with median marked

**Key Insights** (dynamically generated, 2-3 based on data):

Example insights:
1. "Hospitals in [Region] charge $[X]-[Y] for MRIs—a [Z]% variance"
2. "The median hospital price for [procedure] is $[X]. How does your rate compare?"
3. "Employers in your area are paying hospitals $[X] for [procedure]—there's an opportunity to pitch direct contracts"

**Teaser for Full Report**:
> "Want the full breakdown with named hospitals and marketing-ready comparison claims? Check your email for your detailed report—or schedule a call to discuss how to use this data."

**CTA Button**: "Schedule a Free Strategy Call" (links to calendar)

---

### PDF Report (Emailed)

**Contents**:

1. **Executive Summary**
   - Your market at a glance
   - Key opportunities identified

2. **Hospital Price Comparison by Service**
   - Price ranges by hospital (anonymized in free version, named in paid)
   - Median and percentile breakdowns
   - Variance analysis

3. **How to Use This Data**
   - Patient marketing suggestions
   - Employer outreach talking points
   - Payer negotiation angles

4. **Methodology**
   - Data sources (CMS hospital price transparency files)
   - Analysis approach
   - Limitations and caveats

5. **Next Steps**
   - CTA for Market Positioning Report ($500-2,500)
   - CTA for Competitive Positioning Package ($2,500-5,000)
   - Contact information

---

## Landing Page Copy

### Headline Options (A/B Test)

**Option A**: "See What Hospitals Charge for Your Services"

**Option B**: "Quantify Your Cost Advantage vs. Hospitals"

**Option C**: "Hospital Prices in Your Market—Now You Know"

---

### Subheadline

"Hospitals are required to publish their prices. We've analyzed them so you can prove your value to patients, employers, and payers."

---

### Bullet Points

- **You're probably 30-50% cheaper than hospitals**—now you can prove it
- **No data sharing required**—we use public hospital price transparency files
- **Instant insights**—get hospital pricing data in under 5 minutes
- **Actionable for marketing, negotiations, and strategy**—not just interesting data

---

### Body Copy

> Independent imaging centers, surgery centers, and clinics are typically far more affordable than hospital outpatient departments. But "we're cheaper" doesn't win contracts—data does.
>
> Hospital price transparency requirements mean their prices are now public. We've aggregated and normalized the data across hundreds of facilities so you can see exactly what hospitals in your market charge.
>
> In just a few minutes, you'll know:
> - What hospitals charge for the same services you provide
> - How much variance exists in your market
> - Where you have the strongest competitive positioning
>
> Use it to win patients, pitch employers, and push back on payer rate cuts.

---

### CTA Button

**Primary**: "See Hospital Prices in Your Market"

**Secondary** (in navigation): "See Sample Report"

---

### Trust Elements

- "Data from [X]+ hospital price transparency files analyzed"
- "Covering [X] states and [X]+ procedures"
- Testimonial quote (once available)

---

## Thank You Page Copy

### Headline

"Your Hospital Price Comparison Is Ready!"

---

### Subheadline

"Check your inbox for your detailed report. Here's a preview of what we found."

---

### Preview Content

Display the on-screen results summary (see Output section above)

---

### Next Steps Section

> **Ready to Put This Data to Work?**
>
> Your comparison report is just the beginning. We can help you turn these insights into:
> - Marketing materials with defensible price comparison claims
> - Employer pitch decks for direct contracting conversations
> - Payer negotiation briefs with market rate evidence
>
> **Starting at $500** for a detailed Market Positioning Report with named hospitals and ready-to-use positioning statements.

**CTA Button**: "Schedule Your Free Strategy Call"

---

## Technical Notes

### Database Requirements

1. **Hospital Price Data**
   - Aggregated from CMS-mandated price transparency files
   - Normalized by CPT code, payer type, region
   - Refreshed quarterly minimum

2. **Query Performance**
   - Results should return in <3 seconds
   - Consider caching common region/procedure combinations

3. **Data Display**
   - Show "Data as of [date]" on all results
   - Include confidence indicators if sample sizes vary

### Build Approach

**Phase 1 (MVP)**:
- Typeform or Tally for form capture
- Static regional benchmarks in Airtable
- Semi-manual PDF generation from template
- Zapier for automation

**Phase 2 (Production)**:
- Custom frontend (React or similar)
- Live database queries to Snowflake/PostgreSQL
- Automated PDF generation (e.g., Anvil, DocRaptor)
- Full CRM integration

### Integration Points

| System | Integration | Priority |
|--------|-------------|----------|
| CRM (HubSpot) | Push lead data, provider type, services selected | Required |
| Email (ActiveCampaign/HubSpot) | Trigger PDF delivery, nurture sequence | Required |
| Benchmark Database | Query for results | Required |
| PDF Generator | Create personalized reports | Required |
| Analytics (GA4) | Track conversions, funnel steps | Required |
| Calendar (Calendly) | Book strategy calls | Required |

---

## Qualification Criteria

### High-Priority Leads (Immediate Follow-up)

- Provider type: Imaging Center, ASC (strongest hospital competition)
- Multi-location (2+ locations)
- Title: Owner, Administrator, CEO, CFO
- Completed all fields including phone
- Engaged with report (opened PDF, clicked links)

### Medium-Priority Leads (Nurture Sequence)

- Single-location practices
- PT centers, weight loss clinics (less direct hospital competition)
- Marketing/BD titles (influencer, not final decision maker)
- Completed assessment but limited engagement

### Low-Priority Leads (Long-term Nurture Only)

- Personal email addresses
- Incomplete information
- Vendors/competitors (filter by email domain)
- "Other" provider type without clear hospital competition

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Assessment page visits | 400/month | Google Analytics |
| Assessment starts | 160/month (40% start rate) | Form analytics |
| Assessment completions | 60/month (37.5% of starts) | Form analytics |
| Completion → consultation | 15/month (25% conversion) | CRM |
| Consultation → paid engagement | 8/month (50% conversion) | CRM |
| Average entry deal size | $1,500 | CRM |

---

## Email Sequence

See [email-sequences/post-assessment-emails.md](./email-sequences/post-assessment-emails.md) for the complete post-assessment nurture sequence.

**Assessment-Specific Notes**:
- Day 2 email should reference their provider type and selected services
- Include specific hospital price insights for their region if available
- Tailor use case examples to their segment (imaging → employer outreach, ASC → direct contracts, etc.)
- Emphasize "hospitals have to publish this data—we just made it usable" messaging throughout

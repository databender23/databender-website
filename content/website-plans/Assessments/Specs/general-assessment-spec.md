# General Assessment Spec: Data & AI Readiness Assessment

## Overview

**Assessment Name**: Data & AI Readiness Assessment

**Target Audience**: Decision-makers across any industry who face data-related challenges (data consolidation, analysis, automation, AI readiness)

**Value Proposition**: "Every business has data. Few use it well. Take this 5-minute assessment to see where you stand—and what better data infrastructure could unlock for your business."

**Key Differentiator**: Industry-agnostic framing that focuses on universal data capabilities (collection, integration, analysis, automation) rather than vertical-specific solutions.

**Estimated Completion Time**: 5 minutes

---

## Assessment Flow

### Step 1: Business Profile

**Q1: Company Name** (Optional)
- Free text
- Purpose: Personalization

**Q2: Industry** (Required)
- Dropdown with options:
  - Healthcare
  - Legal / Professional Services
  - Manufacturing
  - Financial Services
  - Real Estate / Property Management
  - Retail / E-commerce
  - Technology / Software
  - Energy / Utilities
  - Education
  - Non-profit
  - Other (specify)

*Purpose: Route follow-up appropriately, potentially trigger industry-specific email content*

**Q3: Company Size** (Required)
- Revenue-based:
  - Under $1M
  - $1M - $10M
  - $10M - $50M
  - $50M - $200M
  - $200M+

*Or employee-based:*
  - 1-10 employees
  - 11-50 employees
  - 51-200 employees
  - 200+ employees

**Q4: Your Role** (Required)
- CEO / Owner
- COO / Operations
- CFO / Finance
- CTO / IT Director
- VP / Director (specify department)
- Manager
- Analyst
- Other (specify)

---

### Step 2: Data Infrastructure (6 Questions)

**Q5: Data Storage**
"Where does your most important business data live?"
- Single system (CRM, ERP, etc.)
- Multiple systems, somewhat integrated
- Multiple systems, siloed
- Spreadsheets and manual tracking
- Not sure

**Q6: Data Accessibility**
"How would you rate your ability to get answers from your data when you need them?"
- Excellent (self-serve, fast)
- Good (usually can get what we need)
- Fair (requires significant effort)
- Poor (often can't get what we need)

**Q7: Manual Data Work**
"How much time does your team spend on manual data tasks (copying, reformatting, consolidating)?"
- Minimal (<5 hours/week)
- Moderate (5-15 hours/week)
- Significant (15-30 hours/week)
- Extensive (30+ hours/week)

**Q8: Single Source of Truth**
"Do you have a single source of truth for key business metrics?"
- Yes, everyone uses the same data
- Mostly, with some exceptions
- No, different teams have different numbers
- We don't really track key metrics consistently

**Q9: AI/Automation Exploration**
"Have you explored using AI or automation to improve operations?"
- Yes, actively using AI/automation
- Yes, experimenting or piloting
- Interested but haven't started
- Not really on our radar

**Q10: Primary Challenge**
"What's your biggest data-related challenge right now?"
- Collecting/consolidating data from multiple sources
- Making sense of data we have (analysis, insights)
- Automating manual, repetitive tasks
- Building reports and dashboards
- Scaling a data process that works manually
- Other (specify)

---

### Step 3: Contact Capture

**Q11: Work Email** (Required)
- Email validation
- Filter personal domains with warning

**Q12: Name** (Required)
- Free text

**Q13: Title** (Required)
- Free text

**Q14: Company** (Required)
- Free text

**Q15: Phone** (Optional)
- Phone number field

**Q16: Briefly describe your biggest data challenge** (Optional)
- Free text (up to 500 characters)
- *Purpose: Excellent qualifier - reveals specific pain points and urgency*

---

### Step 4: Results Delivery

See [Output/Results Format](#outputresults-format) section below.

---

## Scoring Logic

**Total Possible Score: 100 points**

### Data Infrastructure (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q5: Data Storage | Single system | 10 |
| | Multiple, somewhat integrated | 7 |
| | Multiple, siloed | 3 |
| | Spreadsheets | 1 |
| | Not sure | 0 |
| Q8: Single Source of Truth | Yes, everyone uses same | 15 |
| | Mostly | 10 |
| | No, different numbers | 3 |
| | Don't track consistently | 0 |

### Analytics Capability (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q6: Data Accessibility | Excellent | 15 |
| | Good | 10 |
| | Fair | 5 |
| | Poor | 0 |
| Q10: Primary Challenge | Analysis/insights | 5 |
| | Other challenges | 10 |

*Note: If primary challenge is analysis, they recognize the gap but have it, so moderate points. If other challenges, they may have analysis capability.*

### Automation Maturity (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q7: Manual Data Work | Minimal (<5 hrs) | 15 |
| | Moderate (5-15 hrs) | 10 |
| | Significant (15-30 hrs) | 5 |
| | Extensive (30+ hrs) | 0 |
| Q10: Primary Challenge | Automating tasks | 5 |
| | Other challenges | 10 |

*Similar logic: recognizing automation need = some gap but awareness*

### AI Readiness (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q9: AI/Automation Status | Actively using | 20 |
| | Experimenting | 15 |
| | Interested, not started | 8 |
| | Not on radar | 2 |
| Q5 + Q6 + Q8 composite | If all good/excellent | 5 |

*Bonus for strong infrastructure—prerequisite for AI success*

### Score Interpretation

| Score Range | Status | Interpretation |
|-------------|--------|----------------|
| 80-100 | Advanced | Strong foundation, ready for AI/advanced analytics |
| 60-79 | Developing | Good base, specific gaps to address |
| 40-59 | Emerging | Core infrastructure needs improvement |
| 0-39 | Early Stage | Foundational work needed |

---

## Output/Results Format

### Immediate On-Screen Results

**Header**: "Your Data & AI Readiness Score"

**Overall Score Display**:
```
[SCORE]/100
[Status: Advanced / Developing / Emerging / Early Stage]
```

**Category Breakdown**:

| Category | Score | Status |
|----------|-------|--------|
| Data Infrastructure | XX/25 | [Green/Yellow/Red] |
| Analytics Capability | XX/25 | [Green/Yellow/Red] |
| Automation Maturity | XX/25 | [Green/Yellow/Red] |
| AI Readiness | XX/25 | [Green/Yellow/Red] |

**Status Thresholds**:
- Green: 18+ points (72%+)
- Yellow: 10-17 points (40-71%)
- Red: <10 points (<40%)

---

### Personalized Insights (Dynamic Based on Answers)

**Display 2-3 relevant insights based on answers:**

**If data is siloed (Q5 = Multiple, siloed):**
> "Your data is scattered across multiple systems, which is common. The first step is usually consolidating into a single source of truth before analytics or AI can add value."

**If high manual work (Q7 = Significant or Extensive):**
> "You're spending [15-30+ hours/week] on manual data tasks. That's a strong signal that automation could deliver immediate ROI—often paying for itself within months."

**If primary challenge is consolidation (Q10):**
> "Data consolidation is one of the most common—and solvable—challenges. A well-designed data pipeline can transform this from a weekly headache into an automated process."

**If interested but not started on AI (Q9):**
> "AI has tremendous potential, but it requires good data foundations. Based on your [infrastructure score], [you're well-positioned to start exploring / there's some foundational work to do first]."

**If actively using AI (Q9):**
> "You're ahead of the curve in adopting AI. The opportunity now may be expanding to new use cases or improving the underlying data that feeds your AI tools."

**If no single source of truth (Q8):**
> "When different teams have different numbers, trust erodes and decisions suffer. Establishing a single source of truth is often the highest-impact investment a company can make."

---

### Primary Challenge Response

Based on Q10 selection, provide targeted insight:

| Challenge Selected | Response |
|-------------------|----------|
| Collecting/consolidating | "Data consolidation is the foundation. Companies in similar situations typically see 10-20 hours/week recovered once automated pipelines are in place." |
| Analysis/insights | "Having the data is step one—making sense of it is where value gets created. The right dashboards and analytics can transform decision-making." |
| Automating tasks | "Manual, repetitive tasks are automation gold. These projects often have the fastest ROI because the time savings are immediate and measurable." |
| Building reports | "Reporting shouldn't be a burden. Modern BI tools and automated pipelines can make reporting nearly effortless once set up correctly." |
| Scaling manual process | "This is a great problem to have—it means something's working. The key is capturing the logic that works manually and building it into scalable systems." |

---

### CTA Section

**Primary CTA**:
> "Want to discuss your specific situation?"

**Button**: "Schedule a Free 30-Minute Consultation"

**Secondary**:
> "Your detailed PDF report is on its way to [email]."

---

## PDF Report (Emailed)

### Contents

1. **Executive Summary**
   - Overall score and interpretation
   - Top 2-3 opportunities identified
   - Primary challenge addressed

2. **Detailed Score Breakdown**
   - Category-by-category analysis
   - What each score means
   - Areas of strength and opportunity

3. **Recommendations Based on Primary Challenge**
   - Specific next steps
   - What to prioritize

4. **What Data & AI Solutions Can Do**
   - Relevant examples based on their industry/challenge
   - Common use cases

5. **Databender's Approach**
   - How we work
   - Emphasis on problem-solving over products
   - Past client examples (anonymized)

6. **Next Steps**
   - CTA for consultation
   - Contact information

---

## Landing Page Copy

### Headline Options (A/B Test)

**Option A**: "Is Your Data Working For You or Against You?"

**Option B**: "Stop Drowning in Spreadsheets: Assess Your Data Readiness"

**Option C**: "What Could You Do With Better Data?"

**Option D**: "Free Assessment: How Ready Is Your Business for AI?"

---

### Subheadline

"Take this 5-minute assessment to see where you stand—and what better data infrastructure could unlock."

---

### Bullet Points

- **Industry-agnostic** — Whether you're in manufacturing or real estate, data challenges are universal
- **No product pitch** — We solve problems, we don't push software
- **Instant insights** — Get your score and recommendations immediately
- **Start small, prove value** — Our approach: focused projects with quick ROI

---

### Body Copy

> Every business runs on data—sales numbers, customer information, operational metrics, financial records. But most businesses struggle to turn that data into value.
>
> Sound familiar?
>
> - Spending hours copying data between spreadsheets
> - Different teams have different numbers for the same metric
> - You know AI could help but don't know where to start
> - Reports are always out of date by the time you get them
>
> This assessment evaluates your data infrastructure, analytics capability, automation maturity, and AI readiness. In 5 minutes, you'll know where you stand and what's possible.

---

### CTA Button

**Primary**: "Start Your Free Assessment"

---

### Trust Elements

- "Takes less than 5 minutes"
- "No sales pitch—just actionable insights"
- "We've helped companies from fitness studios to oil & gas with data challenges"

---

## Thank You Page Copy

### Headline

"Your Data & AI Readiness Results"

---

### Content

Display the full on-screen results (score, breakdown, insights, recommendations) on this page.

---

### CTA Section

> **Ready to Talk Through Your Options?**
>
> Your detailed PDF report is on its way with specific recommendations.
>
> Every data challenge is unique. A quick conversation can help clarify the best path forward for your specific situation.

**CTA Button**: "Schedule a Free 30-Minute Consultation"

---

### What to Expect

> In a consultation call, we'll:
> - Discuss your specific challenge in more detail
> - Share relevant examples of how we've solved similar problems
> - Outline potential approaches (and honest assessment of what makes sense)
> - No pressure, no pitch—just a useful conversation

---

## Technical Notes

### Platform Recommendation

**Primary**: Typeform or Outgrow
- Either works well for this simpler assessment
- Typeform for cleaner UX
- Outgrow for more robust scoring

### Integration Requirements

| System | Integration | Notes |
|--------|-------------|-------|
| CRM (HubSpot) | Push lead data + responses | Required |
| Email (ActiveCampaign) | Trigger PDF + nurture sequence | Required |
| PDF Generator | Create personalized reports | Required |
| Analytics (GA4) | Track full funnel | Required |
| Calendar (Calendly) | Consultation booking | Required |

### Follow-up Segmentation

Based on Q10 (Primary Challenge), segment leads for targeted follow-up:

| Primary Challenge | Follow-up Focus |
|-------------------|-----------------|
| Data consolidation | Data engineering, pipelines, warehousing content |
| Analysis/insights | Analytics, dashboards, BI content |
| Automation | Process automation, integrations content |
| Reports/dashboards | BI tools, reporting automation content |
| Scaling manual process | Data engineering, automation content |

---

## Qualification Criteria

### Good Fit Signals

- Clear data-related pain point identified
- Manual processes consuming significant time (15+ hrs/week)
- Data scattered across multiple systems
- Decision-maker or close to decision-maker role
- Company size indicates budget ($1M+ revenue)
- Urgency in challenge description

### Less Ideal Signals

- Purely exploratory (no specific problem)
- Very early stage (<$1M, <10 employees)
- Needs pre-built SaaS, not custom work
- Personal email address
- Incomplete assessment

### High-Priority Lead Indicators

- CEO, COO, CFO, CTO titles
- $10M+ company size
- Significant manual work + specific challenge described
- Complete assessment with thoughtful challenge description
- Industry aligns with Databender focus areas (Healthcare, Legal, Manufacturing)

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Assessment completions | 30/month | Form analytics |
| Completion to call | 20% (6/month) | CRM |
| Call to proposal | 50% (3/month) | CRM |
| Proposal to closed | 40% | CRM |
| Average deal size | Track by source | CRM |

---

## Email Sequence

See [email-sequences/post-assessment-emails.md](./email-sequences/post-assessment-emails.md) for the complete post-assessment nurture sequence.

**Assessment-Specific Notes**:
- Segment email content by primary challenge (Q10)
- Include industry-relevant examples when possible
- Lead with the specific challenge they identified
- Emphasize problem-solving approach over technology

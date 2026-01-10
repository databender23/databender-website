# Legal Assessment Spec: Knowledge Management Readiness Assessment

## Overview

**Assessment Name**: Knowledge Management Readiness Assessment

**Target Audience**: Law firms, accounting/CPA firms, management consultancies, professional service firms (15-75 professionals is the sweet spot)

**Value Proposition**: "Professional service firms sit on decades of valuable knowledge—but most can't access it effectively. Take this 5-minute assessment to see where your firm stands and what AI-powered knowledge management could unlock."

**Key Differentiator**: We emphasize on-premise/private deployment options and cost advantages over enterprise SaaS—addressing security concerns that keep small firms from adopting cloud AI tools.

**Estimated Completion Time**: 5 minutes

---

## Assessment Flow

### Step 1: Firm Profile

**Q1: Firm Type** (Required)
- Law Firm
- Accounting/CPA Firm
- Management Consultancy
- Other Professional Services

**Q2: Firm Size (Number of Professionals)** (Required)
- 5-15
- 16-50
- 51-100
- 100+

**Q3: Primary Practice Areas / Specialties** (Optional, Multi-select)
*For Law Firms:*
- Corporate/M&A
- Litigation
- Intellectual Property
- Real Estate
- Employment/Labor
- Tax
- Estate Planning
- Other

*For Accounting Firms:*
- Tax
- Audit
- Advisory
- Bookkeeping
- Other

*For Consultancies:*
- Strategy
- Operations
- Technology
- HR/Organizational
- Other

**Q4: Years in Operation** (Required)
- Less than 5 years
- 5-15 years
- 15-30 years
- 30+ years

*Purpose: Proxy for document volume*

---

### Step 2: Document Infrastructure (8 Questions)

**Q5: Document Storage**
"Where are your firm's documents primarily stored?"
- Single document management system (iManage, NetDocuments, etc.)
- Multiple systems / mixed storage
- File shares and folders
- Combination of cloud and local storage
- Not sure / varies by practice group

**Q6: Document Format**
"What percentage of your archived documents are searchable digital text (vs. scanned images or non-OCR PDFs)?"
- 80%+ searchable
- 50-80% searchable
- 25-50% searchable
- Less than 25% searchable
- Don't know

**Q7: Document Organization**
"How consistently are documents tagged, categorized, or filed according to a standard taxonomy?"
- Very consistent (firm-wide standards enforced)
- Somewhat consistent (guidelines exist, variably followed)
- Inconsistent (each person/group has their own system)
- No standard system

**Q8: Search Capability**
"How would you rate your current ability to find relevant prior work product?"
- Excellent (usually find what we need quickly)
- Good (works most of the time)
- Fair (hit or miss)
- Poor (often can't find things, give up and recreate)

**Q9: Knowledge Transfer**
"When a senior professional leaves the firm, what happens to their knowledge?"
- Systematic handoff process with documentation
- Some handoff, but informal
- Minimal transfer—knowledge largely leaves with them
- No process

**Q10: Research Time**
"Approximately how many hours per week does a typical professional spend searching for internal precedents, templates, or prior work?"
- Less than 2 hours
- 2-5 hours
- 5-10 hours
- More than 10 hours

**Q11: Duplicate Work**
"How often do you suspect professionals recreate work that already exists somewhere in the firm?"
- Rarely
- Occasionally
- Frequently
- Very frequently / constantly

**Q12: Cloud Sensitivity**
"How does your firm view storing client data in cloud-based AI systems?"
- Comfortable with reputable cloud providers
- Cautious—prefer private cloud or on-premise
- Very restrictive—no client data in third-party clouds
- Haven't evaluated yet

---

### Step 3: Contact Capture

**Q13: Work Email** (Required)
- Email validation
- Filter personal domains with warning

**Q14: Name** (Required)
- Free text

**Q15: Title/Role** (Required)
- Managing Partner
- Partner
- Director of IT
- Director of Knowledge Management
- COO / Director of Operations
- CFO / Director of Finance
- Associate
- Manager
- Other (specify)

**Q16: Firm Name** (Required)
- Free text

**Q17: Phone** (Optional)
- Phone number field

**Q18: What prompted you to take this assessment?** (Optional)
- Free text
- *Purpose: Great qualification signal - reveals urgency and specific pain*

---

### Step 4: Results Delivery

See [Output/Results Format](#outputresults-format) section below.

---

## Scoring Logic

**Total Possible Score: 100 points**

### Document Infrastructure (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q5: Document Storage | Single DMS | 10 |
| | Multiple systems | 5 |
| | File shares only | 2 |
| | Combination cloud/local | 4 |
| | Not sure | 0 |
| Q6: Document Format | 80%+ searchable | 10 |
| | 50-80% searchable | 6 |
| | 25-50% searchable | 3 |
| | <25% searchable | 0 |
| | Don't know | 0 |
| Q7: Document Organization | Very consistent | 5 |
| | Somewhat consistent | 3 |
| | Inconsistent | 1 |
| | No standard system | 0 |

### Search & Accessibility (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q8: Search Capability | Excellent | 15 |
| | Good | 10 |
| | Fair | 5 |
| | Poor | 0 |
| Q10: Research Time | <2 hrs/week | 10 |
| | 2-5 hrs/week | 7 |
| | 5-10 hrs/week | 3 |
| | >10 hrs/week | 0 |

### Knowledge Retention (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q9: Knowledge Transfer | Systematic handoff | 15 |
| | Some handoff | 8 |
| | Minimal transfer | 3 |
| | No process | 0 |
| Q11: Duplicate Work | Rarely | 10 |
| | Occasionally | 6 |
| | Frequently | 2 |
| | Very frequently | 0 |

### Security Posture (25 points max)

| Question | Answer | Points |
|----------|--------|--------|
| Q12: Cloud Sensitivity | Comfortable with cloud | 10 |
| | Prefer private/on-prem | 15 |
| | Very restrictive | 20 |
| | Haven't evaluated | 5 |

*Note: Higher score for security awareness signals a sophisticated buyer who understands the risks and is likely budget-conscious about solutions*

**Bonus Points**:
- Complete firm profile (all fields): +5 points (cap at 100 total)

### Score Interpretation

| Score Range | Status | Interpretation |
|-------------|--------|----------------|
| 80-100 | Strong | Good foundation for AI-powered knowledge management |
| 60-79 | Moderate | Some gaps to address but ready for improvement |
| 40-59 | Developing | Foundational work needed before AI implementation |
| 0-39 | Early Stage | Significant infrastructure gaps to address first |

---

## Output/Results Format

### Immediate On-Screen Results

**Header**: "Your Knowledge Management Readiness Score"

**Overall Score Display**:
```
[SCORE]/100
[Status indicator: Strong / Moderate / Developing / Early Stage]
```

**Category Breakdown Table**:

| Category | Score | Status |
|----------|-------|--------|
| Document Infrastructure | XX/25 | [Green/Yellow/Red indicator] |
| Search & Accessibility | XX/25 | [Green/Yellow/Red indicator] |
| Knowledge Retention | XX/25 | [Green/Yellow/Red indicator] |
| Security Posture | XX/25 | [Green/Yellow/Red indicator] |

**Status Thresholds**:
- Green: 18+ points (72%+)
- Yellow: 10-17 points (40-71%)
- Red: <10 points (<40%)

---

### Personalized Insights (Dynamic Based on Answers)

**Display 2-3 relevant insights based on lowest-scoring areas:**

**If low document searchability (Q6):**
> "With less than 50% of documents searchable, AI-powered knowledge tools will have limited effectiveness. OCR processing and document cleanup would be a prerequisite for any knowledge management initiative."

**If poor search capability (Q8):**
> "Your 'hit or miss' search experience is costing your firm significant time and causing duplicated effort. Modern semantic search can find relevant documents even when keywords don't match exactly."

**If poor knowledge transfer (Q9):**
> "Knowledge leaving with departing professionals is a significant risk. Firms in your situation typically find that AI knowledge systems help capture institutional memory before it's lost."

**If high duplicate work (Q11):**
> "Frequent recreation of existing work represents a major efficiency drain. With your firm size, this could translate to [X] hours of lost productivity annually."

**If cloud-cautious (Q12 = private/on-prem or very restrictive):**
> "Your security requirements point toward on-premise or private cloud deployment. The good news: custom RAG solutions can be deployed entirely within your infrastructure, keeping all client data under your control."

**If cloud-comfortable but other gaps:**
> "Your openness to cloud solutions provides flexibility in implementation options. The key is addressing your [lowest scoring category] to maximize the value of any AI investment."

---

### Cost Estimate (Dynamic Calculation)

**Formula**:
```
Annual Cost = [Firm Size Midpoint] × [Research Hours/Week] × [Blended Hourly Rate] × 48 weeks
```

**Blended Rates by Firm Type**:
- Law Firm: $200/hour
- Accounting Firm: $150/hour
- Consultancy: $175/hour
- Other: $150/hour

**Display**:
> "Based on your firm size and reported search time, you may be losing approximately **$[calculated amount]** annually to knowledge inefficiency."

**Example**:
- 30-person firm × 5 hrs/week × $200/hr × 48 weeks = $1,440,000 in search time
- If 25% of that is inefficient = $360,000 annual opportunity

---

### Recommendations Section

**For High Scores (80+)**:
> "Your firm has a strong foundation for AI-powered knowledge management. The opportunity now is leveraging advanced capabilities—semantic search, automated document classification, and knowledge extraction—to gain competitive advantage."

**For Moderate Scores (60-79)**:
> "You have solid fundamentals in place but some gaps that would limit AI effectiveness. We recommend addressing [weakest category] before investing in advanced knowledge tools."

**For Lower Scores (40-59)**:
> "There's significant opportunity to improve, but foundational work on document infrastructure should come first. A phased approach—starting with document cleanup and organization—would set you up for success with AI tools."

**For Early Stage (<40)**:
> "Your firm has substantial opportunity for improvement. We'd recommend starting with basic document management infrastructure before considering AI-powered solutions. A roadmap for building this foundation would be valuable."

---

### CTA Section

**Primary CTA**:
> "Want to discuss your results and explore what's possible for your firm?"

**Button**: "Schedule a Free Consultation"

**Secondary CTA**:
> "Your detailed PDF report has been sent to [email]. It includes specific recommendations for each category and next steps."

---

## PDF Report (Emailed)

### Contents

1. **Executive Summary**
   - Overall score and interpretation
   - Top 3 opportunities identified

2. **Detailed Score Breakdown**
   - Category-by-category analysis
   - What each score means
   - Benchmarks vs. similar firms (if data available)

3. **Specific Recommendations**
   - For each category, actionable next steps
   - Prioritized by impact

4. **What AI-Powered Knowledge Management Can Do**
   - Overview of capabilities
   - Relevant examples for their firm type

5. **Deployment Options**
   - Cloud vs. on-premise considerations
   - Security and privacy addressed
   - Cost comparison: custom solutions vs. enterprise SaaS

6. **Next Steps**
   - CTA for consultation
   - Contact information

---

## Landing Page Copy

### Headline Options (A/B Test)

**Option A**: "Is Your Firm Ready for AI-Powered Knowledge Management?"

**Option B**: "How Much Is Knowledge Inefficiency Costing Your Firm?"

**Option C**: "Free Assessment: Your Firm's Knowledge Management Readiness"

---

### Subheadline

"Take this 5-minute assessment to see where your firm stands—and what AI-powered knowledge management could unlock."

---

### Bullet Points

- **Security-first approach** — Unlike cloud AI tools, our solutions can run entirely on your infrastructure
- **Cost advantage** — For small to mid-sized firms, custom-built systems are often less expensive than enterprise SaaS
- **Practical, not theoretical** — We build systems that help your people find what they need faster
- **5 minutes to insights** — Get your readiness score and personalized recommendations instantly

---

### Body Copy

> Every professional service firm sits on decades of accumulated knowledge—research, precedents, templates, institutional memory. But most can't access it effectively.
>
> The result? Professionals spend hours searching for work that already exists. Valuable knowledge walks out the door when people leave. New team members take months to get up to speed.
>
> AI-powered knowledge management can change this—but only if your firm is ready for it.
>
> This assessment evaluates your document infrastructure, search capabilities, knowledge retention practices, and security posture to show you exactly where you stand and what's possible.

---

### CTA Button

**Primary**: "Start Your Free Assessment"

---

### Trust Elements

- "Designed for firms with 15-100+ professionals"
- "Takes less than 5 minutes"
- "No sales pitch—just actionable insights"

---

## Thank You Page Copy

### Headline

"Your Knowledge Management Readiness Results"

---

### Content

Display the full on-screen results (score, breakdown, insights, recommendations) on this page.

---

### CTA Section

> **Ready to Take Action?**
>
> Your PDF report is on its way to [email address] with detailed recommendations for each category.
>
> If you'd like to discuss your results and explore what's possible for your firm, we're happy to have a conversation—no strings attached.

**CTA Button**: "Schedule a Free 30-Minute Consultation"

---

### What Happens Next

> In a consultation call, we can:
> - Dive deeper into your specific challenges
> - Discuss deployment options that meet your security requirements
> - Explore what a custom knowledge solution might look like for your firm
> - Answer any questions about AI for professional services

---

## Technical Notes

### Platform Recommendation

**Primary**: Outgrow
- Built-in scoring logic
- PDF generation capability
- Good lead capture forms
- Logic branching

**Alternative**: Typeform + Zapier + PDF generation service

### Integration Requirements

| System | Integration | Notes |
|--------|-------------|-------|
| CRM (HubSpot) | Push all lead data + responses | Required |
| Email (ActiveCampaign) | Trigger PDF + nurture sequence | Required |
| PDF Generator | Create personalized reports | Required (Outgrow built-in or separate) |
| Analytics (GA4) | Track full funnel | Required |
| Calendar (Calendly) | Consultation booking | Required |

### Scoring Implementation

- Calculate scores in real-time as user progresses
- Display running score if platform supports (optional)
- Final calculation on completion
- Store individual category scores for CRM segmentation

---

## Qualification Criteria

### High-Priority Leads (Immediate Personal Follow-up)

- Firm size: 15-75 professionals
- Role: Managing Partner, Director of IT, Director of KM, COO
- Security posture: Prefer private/on-prem (indicates budget and sophistication)
- Completed full assessment with detailed answers
- Low scores in Search & Accessibility + Knowledge Retention (high pain)
- Answered "What prompted you?" with specific urgency

### Medium-Priority Leads (Automated Nurture + Periodic Check-in)

- Smaller firms (5-15) or larger firms (100+)
- Associate or manager-level titles
- Moderate scores (some pain, but not urgent)
- Limited engagement after completion

### Low-Priority Leads (Long-term Nurture Only)

- Personal email addresses
- Incomplete assessments
- Very high scores (may not need help)
- Competitors or vendors (filter by domain)

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Assessment page visits | 150/month | Google Analytics |
| Assessment starts | 50/month (33% start rate) | Form analytics |
| Assessment completions | 30/month (60% of starts) | Form analytics |
| Completions to calls | 8/month (25% conversion) | CRM |
| Calls to proposals | 4/month (50% conversion) | CRM |
| Proposals to closed | 2/month (50% conversion) | CRM |

---

## Email Sequence

See [email-sequences/post-assessment-emails.md](./email-sequences/post-assessment-emails.md) for the complete post-assessment nurture sequence.

**Assessment-Specific Notes**:
- Day 2 email should reference their lowest-scoring category specifically
- Emphasize security/on-premise messaging for cloud-cautious leads
- Include cost calculation in follow-up if they showed high research time

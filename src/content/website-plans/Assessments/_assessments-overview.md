# Assessments Hub & Data AI Readiness Assessment Specification

**URL:** `/assessments/` and `/assessments/data-ai-readiness/`

**Page Title:** Free Data & AI Assessment | Databender

**Meta Description:** Take our free 2-minute assessment to identify your data challenges and get personalized recommendations.

---

## Purpose

Self-service assessments serve two purposes:
1. **Lead capture:** Collect contact information in exchange for value
2. **Qualification:** Understand prospect's situation before conversation

The assessment should feel valuable to the visitor—not just a lead form.

---

## Assessment Landing Page (`/assessments/`)

### Hero Section

**Headline:** "Not sure where to start?"

**Subheadline:** Our free assessments help you understand your current state and identify the highest-impact opportunities.

### Available Assessments

| Assessment | Description | Link |
|------------|-------------|------|
| **Data & AI Readiness** | General assessment for any industry. Identify your biggest data challenges and get personalized recommendations. | `/assessments/data-ai-readiness/` |

*Future assessments can be added:*
- Firm Knowledge Readiness (Professional Services)
- Practice Data Readiness (Healthcare-Dental)
- Portfolio Analytics Readiness (CRE)
- Scale-Up Data Readiness (Manufacturing)

---

## Data & AI Readiness Assessment (`/assessments/data-ai-readiness/`)

### Assessment Page

**Headline:** "Data & AI Readiness Assessment"

**Subheadline:** 2 minutes to understand your current state and identify your biggest opportunities.

**What You Get:**
- Summary of your situation
- Personalized recommendations
- Suggested next steps
- No obligation

**[Start Assessment]** → Begin assessment flow

---

## Assessment Questions

### Question 1: Primary Challenge
**"What's your biggest data challenge right now?"**

*Select one:*
- [ ] Data scattered across too many systems
- [ ] Can't trust our data quality
- [ ] Reporting takes too long
- [ ] Missing insights for decisions
- [ ] Manual processes eating up time
- [ ] Want to use AI but don't know how

### Question 2: Internal Capability
**"Do you have internal data/analytics staff?"**

*Select one:*
- [ ] No dedicated data roles
- [ ] 1-2 people handling data among other duties
- [ ] Small data team (3-5 people)
- [ ] Mature data organization (6+)

### Question 3: Timeline
**"What's your timeline?"**

*Select one:*
- [ ] Urgent - need help now
- [ ] Near-term - within 3 months
- [ ] Planning - within 6 months
- [ ] Exploring - no specific timeline

### Question 4: Industry
**"What industry are you in?"**

*Select one:*
- [ ] Healthcare / Dental
- [ ] Legal / Professional Services
- [ ] Commercial Real Estate
- [ ] Manufacturing
- [ ] Other (please specify)

### Question 5: Budget Range
**"What's your approximate budget range?"**

*Select one:*
- [ ] Under $10K
- [ ] $10K - $25K
- [ ] $25K - $50K
- [ ] $50K - $100K
- [ ] Over $100K
- [ ] Not sure yet

### Contact Information (Required Before Results)

**"Where should we send your personalized recommendations?"**

- Name (required)
- Email (required)
- Company (required)
- Phone (optional)
- Anything else you'd like us to know? (optional text)

---

## Results Page Logic

### Result Mapping

Based on responses, show relevant recommendations:

**If Primary Challenge = "Data scattered across too many systems":**
- Recommend: Data Integration
- Secondary: Data Foundation
- Message: "Your scattered data is the foundation of other problems. Connecting your systems should be the first step."

**If Primary Challenge = "Can't trust our data quality":**
- Recommend: AI-Powered Data Cleanup
- Secondary: Data Foundation
- Message: "Data quality issues compound over time. Our AI-powered cleanup can restore trust in your data."

**If Primary Challenge = "Reporting takes too long":**
- Recommend: Dashboards & Analytics
- Secondary: Data Integration
- Message: "Automated dashboards can eliminate manual reporting. But if your data isn't connected, that's the first step."

**If Primary Challenge = "Missing insights for decisions":**
- Recommend: Dashboards & Analytics OR Natural Language BI
- Secondary: AI-Generated Insights
- Message: "You need visibility into what's happening. We can build dashboards that answer your actual questions."

**If Primary Challenge = "Manual processes eating up time":**
- Recommend: Data Integration + Automation
- Secondary: Custom Applications
- Message: "Process automation starts with connected data. Once systems talk to each other, automation becomes possible."

**If Primary Challenge = "Want to use AI but don't know how":**
- Recommend: AI-Generated Insights OR Natural Language BI
- Secondary: Data Foundation
- Message: "AI works best on clean, connected data. If your foundation isn't ready, we start there first."

### Industry-Specific Adjustments

Add industry-relevant context to recommendations:

- **Healthcare/Dental:** Mention HIPAA compliance, multi-location visibility
- **Professional Services:** Mention knowledge management, client intelligence
- **CRE:** Mention portfolio visibility, lease analytics
- **Manufacturing:** Mention sales intelligence, operational visibility

---

## Results Page Structure

### Summary Section
**"Based on your responses, here's what we recommend:"**

*Personalized summary based on their answers*

### Recommended Next Steps
1. [Primary recommendation with link to service page]
2. [Secondary recommendation with link]
3. Schedule a consultation to discuss your specific situation

### Relevant Case Study
*Show case study relevant to their industry if available*

### Primary CTA
**"Discuss your situation"**
Schedule a 30-minute consultation to talk through your specific challenges.

**[Schedule Consultation]** → Calendly

### Secondary CTA
**"Learn more"**
**[Explore [Recommended Service] →]**

---

## Post-Assessment Email Sequence

### Immediately (Day 0)
**Subject:** Your Data & AI Readiness Results

- Thank you for completing the assessment
- Summary of their responses
- Personalized recommendations
- Link to schedule consultation
- Link to relevant resource

### Day 2
**Subject:** How [similar company] solved this challenge

- Case study relevant to their industry
- "Here's how we helped a similar company..."
- CTA: Schedule consultation

### Day 5
**Subject:** [Resource] for [their challenge]

- Educational content related to their primary challenge
- Blog post or guide
- CTA: Schedule consultation

### Day 10
**Subject:** Let's talk about [their challenge]

- Direct invitation to schedule consultation
- Mention specific ways we could help based on their responses
- CTA: Schedule consultation

### Day 21
**Subject:** Still thinking about [their challenge]?

- Check-in email
- New resource or case study
- CTA: Schedule consultation or take assessment again

---

## Technical Implementation

### Tool Options

| Option | Cost | Pros | Cons |
|--------|------|------|------|
| **Typeform** | $25+/mo | Beautiful UX, easy conditional logic | External service |
| **Gravity Forms** | $59/yr | WordPress native, powerful | More setup required |
| **WPForms Pro** | $49/yr | Easy to use | Less flexible |
| **Outgrow** | $14+/mo | Calculator-style results | Another external service |
| **Custom Build** | One-time | Full control | Development time |

### Recommended Approach
Typeform for initial launch—best UX with minimal development. Can move to custom solution later if needed.

### Integration Requirements
- Email capture → CRM (HubSpot, Salesforce, etc.)
- Response data → CRM for lead scoring
- Trigger → Email automation (Mailchimp, ActiveCampaign, etc.)

---

## Future Industry-Specific Assessments

| Assessment | Industry | Focus | Priority |
|------------|----------|-------|----------|
| **Firm Knowledge Readiness** | Professional Services | Document search, AI readiness | Medium |
| **Practice Data Readiness** | Healthcare-Dental | Multi-location visibility, integration | Medium |
| **Portfolio Analytics Readiness** | CRE | System connectivity, reporting | Medium |
| **Scale-Up Data Readiness** | Manufacturing | Infrastructure gaps, analytics maturity | Medium |

These can be created after the general assessment proves the concept.

---

## Cross-Links

- `/services/` - Service pages linked from results
- `/industries/` - Industry pages linked from results
- `/case-studies/` - Case studies embedded in results
- `/contact/` - Consultation booking

---

## SEO Keywords

**Primary:**
- Data readiness assessment
- AI readiness assessment
- Data maturity assessment

**Secondary:**
- Free data assessment
- Data analytics assessment
- Business data evaluation

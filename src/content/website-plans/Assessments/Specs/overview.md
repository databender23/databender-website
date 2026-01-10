# Self-Service Assessments: Central Guide

## Purpose

Self-service assessments serve as the primary lead generation engine for Databender Consulting. They accomplish three key objectives:

1. **Capture Leads**: Gate valuable insights behind email capture to build our prospect database
2. **Qualify Prospects**: Assessment responses reveal pain points, budget signals, and decision-maker status
3. **Provide Immediate Value**: Deliver actionable insights that demonstrate our expertise before any sales conversation

---

## Assessment Portfolio

| Assessment | Target Industry | Primary Audience | Link to Spec |
|------------|-----------------|------------------|--------------|
| Price Transparency Benchmark Preview | Healthcare | Hospital administrators, finance leaders | [healthcare-assessment-spec.md](./healthcare-assessment-spec.md) |
| Knowledge Management Readiness Assessment | Legal/Professional Services | Managing partners, IT directors, COOs | [legal-assessment-spec.md](./legal-assessment-spec.md) |
| Sales Pipeline Health Check | Manufacturing | VP Sales, Sales Directors, Sales Ops | [manufacturing-assessment-spec.md](./manufacturing-assessment-spec.md) |
| Data & AI Readiness Assessment | General/Cross-Industry | Decision-makers with data challenges | [general-assessment-spec.md](./general-assessment-spec.md) |

---

## Technical Implementation Options

### Platform Comparison

| Platform | Best For | Pros | Cons | Monthly Cost |
|----------|----------|------|------|--------------|
| **Typeform** | Simple assessments, great UX | Beautiful design, logic branching, high completion rates | Limited calculations, manual PDF export | $25-99/mo |
| **Outgrow** | Scored assessments (our primary use case) | Built-in scoring, lead capture, PDF generation | Learning curve, higher cost | $55-200/mo |
| **Involve.me** | Calculator-style tools | Good for ROI calculators | Less polished than Outgrow | $29-99/mo |
| **Custom Web App** | Healthcare (database queries) | Full control, live data queries | Development time, maintenance | Variable |
| **Airtable + Softr** | MVP/testing | Fast no-code build | Limited query complexity | $20-50/mo |

### Recommended Approach by Assessment

| Assessment | Recommended Platform | Reason |
|------------|---------------------|--------|
| Healthcare Benchmark | Custom (Phase 2) / Softr MVP (Phase 1) | Needs to query benchmark database |
| Legal Readiness | Outgrow | Scoring-focused, PDF generation |
| Manufacturing Pipeline | Outgrow | Scoring + benchmarks, PDF generation |
| General Data & AI | Typeform or Outgrow | Simpler scoring, flexibility |

---

## Integration Requirements

### CRM Integration (Required)

All assessments must push data to CRM with:
- Contact information (name, email, company, title, phone)
- Assessment responses (stored as custom fields or notes)
- Overall score and category breakdowns
- Lead source attribution
- Qualification tier (High/Medium/Low priority)

**Recommended CRM**: HubSpot (good integrations, free tier available) or Pipedrive

### Email Automation Integration (Required)

Connect to email platform for:
- Immediate PDF report delivery
- Post-assessment nurture sequences
- Segmentation based on score/qualification tier

**Recommended Platforms**: ActiveCampaign, Mailchimp, or HubSpot

### Analytics Integration (Required)

Track across all assessments:
- Google Analytics 4 for page views and traffic sources
- Form platform analytics for completion rates
- UTM parameter tracking for campaign attribution

---

## Common Elements Across All Assessments

### Contact Capture Fields (Standard)

| Field | Required | Purpose |
|-------|----------|---------|
| Work Email | Yes | Primary contact, filters personal emails |
| Name | Yes | Personalization |
| Title/Role | Yes | Qualification signal |
| Company Name | Yes | Context, qualification |
| Phone | No | Higher-intent signal if provided |
| "How did you hear about us?" | No | Attribution tracking |
| Open-ended challenge question | No | Qualification gold - great for follow-up |

### Lead Scoring Tiers

**High-Priority (Immediate Personal Follow-up)**
- Decision-maker titles (C-suite, VP, Director)
- Sweet-spot company size for each industry
- Complete assessment with detailed answers
- Low-to-medium score (indicates pain + foundation)
- Engagement signals (opened PDF, clicked links)

**Medium-Priority (Automated Nurture + Periodic Check-in)**
- Manager-level titles
- Outside ideal company size range
- Moderate scores
- Partial engagement

**Low-Priority (Long-term Nurture Only)**
- Personal email addresses
- Incomplete assessments
- Competitors/vendors (filter by domain)
- Very high scores (may not need help)

### Results Delivery (Standard Format)

1. **Immediate On-Screen Preview**
   - Overall score with visual indicator
   - Category breakdown with status indicators
   - 2-3 personalized insights based on answers
   - Clear CTA for consultation

2. **PDF Report (Emailed)**
   - Full score breakdown with explanations
   - Detailed recommendations by category
   - Benchmarks where applicable
   - Clear CTA for next steps

---

## Launch Checklist Template

Use this checklist for each assessment launch:

### Pre-Launch

- [ ] Assessment questions finalized and reviewed
- [ ] Scoring logic documented and tested
- [ ] Assessment built in chosen platform
- [ ] All logic branches tested with edge cases
- [ ] PDF report template designed
- [ ] Landing page copy approved
- [ ] Thank-you page optimized with CTA

### Integrations

- [ ] CRM integration configured and tested
- [ ] Email automation sequences built
- [ ] Test lead pushed through entire funnel
- [ ] Analytics tracking configured (GA4, UTM parameters)
- [ ] Lead notification to sales team working

### Go-Live

- [ ] Landing page published
- [ ] Assessment live and tested on mobile/desktop
- [ ] Email deliverability tested (check spam folders)
- [ ] All links in emails verified
- [ ] Initial traffic plan ready (LinkedIn, ads, outreach)
- [ ] Follow-up call script prepared

### Post-Launch (Week 1)

- [ ] Monitor completion rates
- [ ] Check lead quality in CRM
- [ ] Review initial feedback/responses
- [ ] Adjust targeting if needed

---

## A/B Testing Approach

### What to Test

**Headlines (Highest Impact)**
- Test value-focused vs. curiosity-focused
- Test question format vs. statement format
- Example variations:
  - "Is Your Firm Ready for AI-Powered Knowledge Management?"
  - "How Much Is Knowledge Inefficiency Costing Your Firm?"
  - "Free Assessment: Your Firm's Knowledge Management Readiness"

**Landing Page Elements**
- Hero image vs. no image
- Long-form vs. short-form copy
- Social proof (testimonials, logos) vs. none
- CTA button text and color

**Assessment Flow**
- Number of questions (shorter vs. more detailed)
- Question order
- Progress indicators
- Mobile vs. desktop experience

**Results Page**
- Amount of free insight given vs. gated
- CTA placement and copy
- Urgency messaging

### Testing Process

1. **Start with headlines** - Biggest lever for initial traffic conversion
2. **Run one test at a time** - Avoid confounding variables
3. **Statistical significance** - Need ~100+ completions per variant minimum
4. **Document everything** - Track what was tested and results
5. **Share learnings** - Apply winners across all assessments

### Testing Tools

- Platform native (Typeform, Outgrow have built-in A/B)
- Google Optimize (for landing pages)
- Manual rotation with UTM tracking

---

## Success Metrics

### Funnel Metrics (Track for All Assessments)

| Stage | Metric | Target | Measurement |
|-------|--------|--------|-------------|
| Traffic | Page visits | Varies by channel | Google Analytics |
| Engagement | Assessment starts | 30-40% of visits | Form analytics |
| Completion | Assessment completions | 60-70% of starts | Form analytics |
| Lead Capture | Email captures | 90%+ of completions | Form analytics |
| Qualification | High-priority leads | 20-25% of completions | CRM |
| Conversion | Consultations booked | 25% of high-priority | CRM |
| Pipeline | Proposals sent | 50% of consultations | CRM |
| Revenue | Deals closed | 40-50% of proposals | CRM |

### Quality Metrics

| Metric | What It Indicates | Target |
|--------|-------------------|--------|
| Completion rate | Assessment length/UX | >60% |
| High-priority lead % | Targeting quality | 20-25% |
| Consultation show rate | Lead quality | >80% |
| Time to first contact | Sales responsiveness | <24 hours |
| NPS/feedback | Value delivered | >7/10 |

### Reporting Cadence

- **Weekly**: Completion rates, lead volume, high-priority leads
- **Monthly**: Full funnel analysis, conversion rates, revenue attribution
- **Quarterly**: ROI analysis, platform costs vs. revenue generated

---

## Assessment-Specific Notes

### Healthcare: Price Transparency Benchmark Preview

- Requires custom database infrastructure (benchmark data)
- Consider MVP with static benchmarks, then build live queries
- Strongest technical differentiation - our data processing capability
- See [healthcare-assessment-spec.md](./healthcare-assessment-spec.md)

### Legal: Knowledge Management Readiness

- Security/privacy messaging critical (on-prem deployment angle)
- Cost advantage messaging resonates (vs. enterprise SaaS)
- Scoring-focused - Outgrow recommended
- See [legal-assessment-spec.md](./legal-assessment-spec.md)

### Manufacturing: Sales Pipeline Health Check

- CRM integration knowledge demonstrates expertise
- Benchmark comparisons important for credibility
- Open-ended challenge question is key qualifier
- See [manufacturing-assessment-spec.md](./manufacturing-assessment-spec.md)

### General: Data & AI Readiness

- Industry-agnostic framing
- Segment follow-up by primary challenge identified
- Broadest audience, most flexible positioning
- See [general-assessment-spec.md](./general-assessment-spec.md)

---

## Related Resources

- **Email Sequences**: [email-sequences/post-assessment-emails.md](./email-sequences/post-assessment-emails.md)
- **Industry Lead Magnets**: See individual industry folders in `/Lead Generation by Industry/`
- **CRM Setup**: [To be created]
- **Sales Playbook**: [To be created]

# Case Study UX Improvements for Non-Technical Decision Makers

> **Goal**: Transform these case studies from technical showcases into compelling business narratives that make CEOs, VPs, and business owners say "wow, this is impressive and I understand it."

---

## Executive Summary

The three case studies currently excel at technical depth but risk losing non-technical readers. The primary issues are:

1. **Cognitive overload** - Too much technical terminology without business translation
2. **Visual complexity** - Architecture diagrams assume technical literacy
3. **Missing emotional hooks** - Numbers without context; process without pain
4. **Passive engagement** - Users scroll, but don't participate in the discovery

### Recommended Priority Focus
1. **Lead Scoring** - Most accessible; easiest quick wins
2. **Document Intelligence** - Good structure; needs simplification
3. **Entity Resolution** - Most complex; needs the most work

---

## Page 1: Agentic Document Intelligence

**File**: `/src/app/case-studies/agentic-document-intelligence/page.tsx`

### Current State Analysis

**Strengths**:
- Dual mode (Story/Interactive) is innovative
- Clear 5-act story structure (Problem → Stakes → Breakthrough → Transformation → Impact)
- Visual chaos animation effectively conveys the problem
- Good use of progressive disclosure

**Weaknesses**:
- Technical jargon: "multi-agent system," "AI vision," "subagents," "deterministic post-processing"
- Architecture diagram (AgentArchitectureDiagram) assumes understanding of software architecture
- No concrete "day in the life" before/after narrative
- Mode switcher may confuse users - "Interactive" vs "Story" distinction unclear
- Industries section feels disconnected from the narrative

### Specific Recommendations

#### HIGH IMPACT

**1. Add "Plain English" Summary Panel**
- **Location**: Top of page, before Act I
- **Implementation**: Add a collapsible "TL;DR for Executives" box
- **Content**:
  ```
  "We built a system that reads complex documents like a human would,
  but 10x faster and without mistakes. One client cut document
  processing from 4 hours to 20 minutes per batch."
  ```
- **Effort**: Low (2-3 hours)

**2. Replace Technical Terms with Analogies**

| Technical Term | Business Translation |
|----------------|---------------------|
| "Multi-agent system" | "Team of specialized AI workers" |
| "Orchestrator" | "Project manager AI" |
| "Subagents" | "Specialist workers" |
| "AI vision" | "Can actually see and read documents like you do" |
| "Deterministic post-processing" | "Quality control checks" |
| "Parallel extraction" | "Working on multiple sections at once" |

- **Effort**: Medium (4-6 hours across all components)

**3. Interactive "Before/After" Document Slider**
- **Location**: Act II (First Attempts) or Act V (Impact)
- **Implementation**: Create `BeforeAfterSlider` component
- **Concept**: Side-by-side view with draggable divider showing:
  - Left: Messy OCR output with errors highlighted
  - Right: Clean structured data
- **UX Pattern**: Similar to image comparison sliders on design sites
- **Effort**: Medium-High (6-8 hours)

**4. Add Business Impact Calculator**
- **Location**: Act II (Stakes) or new section before CTA
- **Implementation**: Interactive input fields:
  - "How many documents do you process per month?"
  - "Average time per document (minutes)?"
  - "Hourly cost of your team?"
- **Output**: "You could save $X/month and Y hours"
- **Effort**: Medium (5-6 hours)

#### MEDIUM IMPACT

**5. Simplify Architecture Diagram**
- **Current issue**: Too many nodes, connections, and technical labels
- **Solution**: Create two views:
  - **Simple view** (default): 4 nodes max - "Documents In" → "AI Processing" → "Quality Check" → "Data Out"
  - **Technical view** (toggle): Current detailed diagram
- **Add**: Animated "spotlight tour" that walks through each component with plain language
- **Effort**: High (8-10 hours)

**6. Add Progress Indicator with Business Context**
- **Current**: Act I, II, III, IV, V (abstract)
- **Improve to**:
  - "The Problem" (pain)
  - "What Didn't Work" (failed attempts)
  - "The Breakthrough" (solution)
  - "How It Works" (process)
  - "The Results" (proof)
- **Effort**: Low (1-2 hours)

**7. Industry Cards Need Specificity**
- **Current**: Generic descriptions
- **Improve**: Add specific, relatable scenarios:
  - Healthcare: "Instead of manually entering 200 items from a surgical kit catalog..."
  - Legal: "Contract reviews that took a paralegal 3 days now take 2 hours..."
- **Effort**: Low (2-3 hours)

#### LOW IMPACT / NICE-TO-HAVE

**8. Add "How Long Does This Take to Build?" FAQ**
- Non-technical decision makers always wonder about timeline
- Add collapsible FAQ section before CTA

**9. Mode Switcher Clarification**
- Rename: "Story Mode" → "Read the Story"
- Rename: "Interactive" → "Explore How It Works"
- Add tooltip explaining each mode

**10. Add Sound/Haptic Option**
- Subtle completion sounds when viewing transformation
- Opt-in only; respects prefers-reduced-motion

---

## Page 2: AI Entity Resolution

**File**: `/src/app/case-studies/ai-entity-resolution/page.tsx`

### Current State Analysis

**Strengths**:
- Dramatic particle animation effectively shows chaos → order transformation
- Scroll-driven TransformationScene is engaging
- Good cost comparison (manual vs AI)
- Clear visual progression

**Weaknesses**:
- "Entity Resolution" is jargon - most business users don't know this term
- Particle visualization, while pretty, doesn't clearly show what "records" are
- Technical diagram has 14+ nodes - overwhelming
- "90,000x reduction via smart blocking" - technically impressive but meaningless to non-technical user
- Dark theme may feel less accessible/professional to some audiences

### Specific Recommendations

#### HIGH IMPACT

**1. Rename/Reframe the Problem**
- **Current title**: "Agentic Entity Resolution"
- **Proposed**: "Finding the Same Person Across Messy Databases" or "Turning Data Chaos Into a Single Source of Truth"
- **Tagline addition**: "When you have 1.5 million records and no idea how many are duplicates..."
- **Effort**: Low (1 hour)

**2. Add "Customer Record" Visual Metaphor**
- **Location**: Act I (The Chaos)
- **Implementation**: Instead of abstract particles, show animated "record cards" with:
  - Names that are similar but different ("John Smith" / "J. Smith" / "Jonathan Smith")
  - Different addresses for the same person
  - Multiple phone numbers
- **Concept**: Make the "chaos" relatable - these are people/companies, not abstract dots
- **Effort**: High (10-12 hours)

**3. Simplify the Stakes Calculator**
- **Current**: Shows math (1.5M × $0.50 = cost)
- **Improve**:
  - Lead with emotional hook: "What if 30% of your customer database is duplicates?"
  - Show before/after: "1.5M records → 100K unique customers"
  - Add: "That's X wasted marketing dollars per year"
- **Effort**: Medium (4-5 hours)

**4. Add "Match Confidence" Interactive Demo**
- **Location**: New micro-interaction within the story
- **Implementation**: Show 3 record pairs:
  - Obvious match (98% confidence) - "John Smith, 123 Main St" & "John Smith, 123 Main Street"
  - Unclear match (75% confidence) - needs human review
  - Obvious non-match (15% confidence)
- **Let user**: Click to "approve" or "reject" matches, then show how AI handles this at scale
- **Effort**: Medium-High (8-10 hours)

#### MEDIUM IMPACT

**5. Transform Architecture Diagram into Journey Map**
- **Current**: Technical system diagram
- **Proposed**: Customer journey visualization
  - "Your messy data" → "AI finds patterns" → "Matches verified" → "Clean golden records"
- **Style**: More like a roadmap/timeline than a technical architecture
- **Effort**: High (8-10 hours)

**6. Add Real-World Scenario Selector**
- **Location**: After the main story, before Industries section
- **Implementation**: Toggle between scenarios:
  - "Healthcare: Patient records across 5 hospital systems"
  - "Finance: Customer accounts after a merger"
  - "Retail: Loyalty program duplicates"
- Each scenario shows customized numbers and flow
- **Effort**: Medium (6-8 hours)

**7. Explain Technical Concepts with Hover/Click**
- **Technical term**: "Smart Blocking"
- **On hover**: "Instead of comparing every record to every other record (trillions of comparisons), we group similar records first. Like sorting mail by zip code before delivering."
- **Implementation**: Tooltip or expandable inline explanation
- **Effort**: Low-Medium (3-4 hours per term)

**8. Add Progress Savings Counter**
- **Location**: During TransformationScene scroll
- **Implementation**: As user scrolls, show running counter:
  - "Records processed: 234,567..."
  - "Duplicates found: 12,345..."
  - "Hours saved: 847..."
- **Effort**: Medium (5-6 hours)

#### LOW IMPACT / NICE-TO-HAVE

**9. Light Mode Option**
- Current dark theme may feel "too technical" for some audiences
- Consider light mode as default for business decision makers

**10. Add "Meet the Team" Human Element**
- Brief mention that real data engineers built this
- Adds trust for non-technical buyers

---

## Page 3: Custom Lead Scoring

**File**: `/src/app/case-studies/custom-lead-scoring/page.tsx`

### Current State Analysis

**Strengths**:
- Most business-accessible of the three case studies
- Clear problem statement (generic scoring doesn't work)
- Good use of feature importance visualization
- "Before/After" toggle in interactive mode is excellent
- Real metrics that matter to sales teams

**Weaknesses**:
- "ML Model" terminology still may alienate some readers
- LeadScoringDiagram has good bones but too many simultaneous elements
- "Feature Importance" chart needs business context
- GenericScoringFail component could be more dramatic/relatable

### Specific Recommendations

#### HIGH IMPACT

**1. Lead with Sales Pain, Not Tech Solution**
- **Current opener**: "Hundreds of leads per month. No way to tell which ones would convert."
- **Improved opener**: "Your sales team spends 60% of their time on leads that will never buy. What if they could know in advance?"
- **Add**: Brief animated scenario of salesperson frustrated with bad leads
- **Effort**: Low (2-3 hours)

**2. Interactive Lead Demo**
- **Location**: New component, Act III or Interactive mode
- **Implementation**: Show 3-4 sample lead profiles:
  - Lead A: "Software Company, 50 employees, downloaded whitepaper" → Score: 85
  - Lead B: "Student, gmail address, bounced from pricing" → Score: 23
- **Let user**: Guess which lead is better, then reveal AI score
- **Concept**: Gamification creates "aha moment"
- **Effort**: Medium-High (8-10 hours)

**3. Feature Importance Needs Business Translation**
- **Current**: Shows bars with technical feature names
- **Improve**:
  - "Financial capacity signals" → "Can they afford your product?"
  - "Local market success rate" → "Do companies like theirs tend to buy?"
  - "Engagement recency" → "How recently did they show interest?"
- **Add**: Clickable features that expand with real examples
- **Effort**: Medium (4-5 hours)

**4. Add "Your CRM vs Smart Scoring" Side-by-Side**
- **Location**: Act II or as standalone comparison
- **Implementation**: Two columns
  - Left (Generic CRM): "Scores based on: Email opens, Page views, Form fills"
  - Right (Custom ML): "Scores based on: Financial indicators, Market fit, Behavioral patterns"
- **Visual**: Red checks vs Green checks, showing what each catches/misses
- **Effort**: Medium (5-6 hours)

#### MEDIUM IMPACT

**5. Simplify Pipeline Diagram**
- **Current**: 4-stage pipeline with technical labels
- **Improve**:
  - "Data In" → "AI Analysis" → "Score Assigned" → "CRM Updated"
  - Each stage: one icon, one plain-English label, brief description on hover
- **Effort**: Medium (4-6 hours)

**6. Add "Day in the Life" Narrative**
- **Location**: New section or integrated into story
- **Content**:
  - "9:00 AM - Sarah opens her CRM and sees her leads sorted by priority"
  - "9:15 AM - She calls Lead #1, the system flagged them because..."
  - "10:30 AM - Close! The lead had all the signals our model identified"
- **Effort**: Low (2-3 hours)

**7. Safeguard Rules Need Plain English**
- **Current**: Technical rule syntax
- **Improve to**: "Business rules we built in:
  - Always prioritize returning customers
  - Never score leads from competitors
  - Flag high-value industries automatically"
- **Effort**: Low (1-2 hours)

**8. Add Confidence Indicator to Scores**
- **Current**: Just shows score percentages
- **Add**: Visual confidence meter + explanation
  - "This score is 95% confident because..."
  - "This score is 60% confident - more data would help"
- **Effort**: Medium (4-5 hours)

#### LOW IMPACT / NICE-TO-HAVE

**9. Integration Icons**
- Show logos of CRMs this works with (Salesforce, HubSpot, etc.)
- Builds trust that it fits their existing tools

**10. Add "What About GDPR?" FAQ**
- Non-technical buyers often worry about compliance
- Brief reassurance about data handling

---

## Cross-Cutting Recommendations (All 3 Pages)

### 1. Consistent Glossary System
**Implementation**: Create shared `<Tooltip>` component with standard definitions
- Use across all case studies for consistency
- Terms like "AI," "ML," "autonomous," "pipeline" should have the same explanation everywhere
- **Effort**: Medium (6-8 hours including component + integration)

### 2. Executive Summary Cards
**Implementation**: Add collapsible "At a Glance" card to top of each page
```
Problem: [One sentence]
Solution: [One sentence]
Result: [One metric]
Timeline: [X weeks]
```
- **Effort**: Low (2-3 hours per page)

### 3. Mobile Experience Audit
**Issues Found**:
- Mode switcher (top-right fixed) may overlap with mobile navigation
- Architecture diagrams are complex on small screens
- Some text containers overflow
**Recommendation**:
- Simplify diagrams on mobile to essential elements only
- Move mode switcher to inline position on mobile
- Test all scroll-driven animations on mobile Safari
- **Effort**: High (10-15 hours total)

### 4. Accessibility Improvements
**Current**: Good reduced-motion support in most components
**Missing**:
- Color contrast issues in some diagram elements
- Screen reader announcements for animated content
- Keyboard navigation through step annotations
- ARIA labels for interactive diagrams
- **Effort**: Medium-High (8-12 hours total)

### 5. Intermediate CTAs
**Current**: CTA only at the bottom of each page
**Recommendation**: Add subtle CTAs at:
- End of Act II (after showing the problem): "Facing similar challenges? Let's talk"
- End of Act IV (after showing the solution): "Want to see this for your data?"
- Make these less prominent than final CTA, but present
- **Effort**: Low (2-3 hours per page)

### 6. Social Proof Enhancement
**Current**: Placeholder logo bars, generic quotes
**Recommendation**:
- If real logos/quotes available, use them
- If not, remove placeholder bars (they look fake)
- Add specific, attributed quotes if possible
- **Effort**: Depends on content availability

### 7. Loading States & Skeleton Screens
**Current**: Some components may flash during load
**Recommendation**: Add skeleton loaders for:
- Architecture diagrams
- Particle animations
- Large SVG elements
- **Effort**: Medium (4-6 hours total)

---

## Implementation Priority Matrix

### Phase 1: Quick Wins (1-2 days)
| Item | Page | Effort | Impact |
|------|------|--------|--------|
| Executive Summary Cards | All | Low | High |
| Plain English Translations | All | Low-Med | High |
| Rename Entity Resolution | ER | Low | High |
| Safeguard Rules Plain English | Lead | Low | Medium |
| Progress Indicator Labels | Doc Intel | Low | Medium |

### Phase 2: High-Value Additions (1 week)
| Item | Page | Effort | Impact |
|------|------|--------|--------|
| Before/After Document Slider | Doc Intel | Med-High | High |
| Interactive Lead Demo | Lead | Med-High | High |
| Customer Record Visual Metaphor | ER | High | High |
| Business Impact Calculator | Doc Intel | Medium | High |
| Feature Importance Translation | Lead | Medium | High |

### Phase 3: Polish & Enhancement (2 weeks)
| Item | Page | Effort | Impact |
|------|------|--------|--------|
| Simplified Diagram Views | All | High | Medium |
| Glossary Tooltip System | All | Medium | Medium |
| Mobile Experience Overhaul | All | High | Medium |
| Match Confidence Demo | ER | Med-High | Medium |
| Real-World Scenario Selector | ER | Medium | Medium |

### Phase 4: Delight & Differentiation (ongoing)
| Item | Page | Effort | Impact |
|------|------|--------|--------|
| Gamified Lead Guessing | Lead | Medium | Medium |
| Progress Savings Counter | ER | Medium | Low |
| Sound/Haptic Options | All | Low | Low |
| Day in the Life Narratives | All | Low | Low |

---

## Success Metrics

Track these to measure improvement effectiveness:

1. **Time on page** - Should increase as engagement improves
2. **Scroll depth** - More users reaching CTA section
3. **Mode switch usage** - Are users exploring both modes?
4. **CTA click rate** - Ultimate conversion metric
5. **Bounce rate reduction** - Non-technical users staying longer
6. **Heatmap analysis** - Where do users click? Where do they pause?

---

## Appendix: Component File References

### Document Intelligence
- Main page: `/src/app/case-studies/agentic-document-intelligence/page.tsx`
- Architecture: `/src/app/case-studies/agentic-document-intelligence/components/AgentArchitectureDiagram.tsx`
- Step annotations: `/src/app/case-studies/agentic-document-intelligence/components/StepAnnotations.tsx`
- Results reveal: `/src/app/case-studies/agentic-document-intelligence/components/RevealNumbers.tsx`

### Entity Resolution
- Main page: `/src/app/case-studies/ai-entity-resolution/page.tsx`
- Diagram: `/src/app/case-studies/ai-entity-resolution/components/EntityResolutionDiagram.tsx`
- Config: `/src/app/case-studies/ai-entity-resolution/components/DiagramConfig.ts`
- Transformation: `/src/app/case-studies/ai-entity-resolution/components/TransformationScene.tsx`

### Lead Scoring
- Main page: `/src/app/case-studies/custom-lead-scoring/page.tsx`
- Diagram: `/src/app/case-studies/custom-lead-scoring/components/LeadScoringDiagram.tsx`
- Features: `/src/app/case-studies/custom-lead-scoring/components/FeatureImportance.tsx`
- Results: `/src/app/case-studies/custom-lead-scoring/components/RevealNumbers.tsx`

---

*Document created: 2026-01-12*
*For: DataBender Website UX Review*

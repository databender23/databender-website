# WordPress Website Implementation Guide

A step-by-step guide for updating databender.co. Written for WordPress beginners.

---

## How to Use This Guide

This guide is organized into **4 phases**, from quickest wins to more complex updates:

1. **Phase 1: Quick Wins** (30-60 minutes) - Fix broken things, update key text
2. **Phase 2: Content Updates** (2-4 hours) - Update existing pages with new messaging
3. **Phase 3: New Pages** (1-2 days) - Create new service and industry pages
4. **Phase 4: Lead Capture** (2-4 hours) - Add assessment form and booking

**Important:** Complete phases in order. Each builds on the previous.

---

## Before You Start

### Accessing WordPress Admin

1. Go to `databender.co/wp-admin`
2. Log in with your username and password
3. You'll see the WordPress Dashboard

### Understanding the Dashboard

| Menu Item | What It Does |
|-----------|--------------|
| **Pages** | View and edit all website pages |
| **Appearance > Menus** | Edit navigation menus |
| **Appearance > Customize** | Edit site-wide settings (logo, footer, colors) |
| **Plugins** | Add new functionality |

### Before Making Changes

**Always do this first:**
1. Open the page you want to edit in a new browser tab (the live site)
2. Keep it open so you can compare before/after
3. If something goes wrong, you can see what it looked like before

### Page Builder Basics

Your site likely uses **Elementor** or the **WordPress Block Editor**. Here's how to tell:

**To edit a page:**
1. Go to **Pages** in the left menu
2. Find the page you want to edit
3. Hover over it and click **Edit**
4. If you see "Edit with Elementor" button at the top, click that
5. If not, you're using the block editor (that's fine too)

**Elementor basics:**
- Click on any element to select it
- Edit content in the left panel
- Click **Update** (bottom left) to save changes

**Block Editor basics:**
- Click on any block to select it
- Edit directly or use the right panel
- Click **Update** (top right) to save changes

---

## Phase 1: Quick Wins

**Time:** 30-60 minutes
**Risk:** Low
**Impact:** High

These tasks fix obvious problems and can be done immediately.

---

### Task 1.1: Fix Broken Navigation

**The problem:** "Our Process" link goes to a 404 error page.

**Steps:**

1. Go to **Appearance > Menus** in WordPress admin
2. Find the menu called "Primary Menu" or "Main Navigation"
3. In the menu structure, find "OUR PROCESS"
4. Click the small arrow next to it to expand
5. Click **Remove**
6. Click **Save Menu**

**Time:** 2 minutes

---

### Task 1.2: Update Homepage Hero Section

**The problem:** Current messaging is generic and doesn't communicate our positioning.

**Steps:**

1. Go to **Pages > Homepage** (or whatever your homepage is called)
2. Click **Edit with Elementor** (or just Edit)
3. Find the hero section (the big banner at the top)
4. Click on the headline text
5. Replace with new text (see below)
6. Click on subheadline, replace
7. Update the button text and links
8. Click **Update** to save

**Replace this:**
```
Headline: "Software, Data, & AI Solutions"
Subheadline: "Bridging business and artificial intelligence..."
```

**With this:**
```
Headline: "Boutique Strategy. Enterprise Delivery."

Subheadline: "Senior-led expertise backed by a 200-person delivery team.
The strategic thinking of a boutique consultancy with the execution
capacity of a large firm—at mid-market prices."

Button 1: "Take Free Assessment" → link to /assessments/data-ai-readiness/
Button 2: "Schedule a Consultation" → link to your Calendly (or /contact/ for now)
```

**Time:** 10-15 minutes

---

### Task 1.3: Update Footer

**Steps:**

1. Go to **Appearance > Customize**
2. Look for **Footer** section (might be under different names)
3. Find the tagline/description text
4. Replace with new text
5. Click **Publish**

**Replace with:**
```
Expert data & AI consultancy for healthcare, professional services,
real estate, and manufacturing. Boutique strategy. Enterprise delivery.
```

**Time:** 5 minutes

---

### Task 1.4: Hide "Current Projects" Page

**The problem:** This page has job listings from 4 years ago.

**Steps:**

1. Go to **Appearance > Menus**
2. Find "Current Projects" in your menu
3. Click the arrow to expand, then **Remove**
4. Click **Save Menu**

**Better option (redirect):**
1. Go to **Plugins > Add New**
2. Search for "Redirection"
3. Install and activate the plugin by John Godley
4. Go to **Tools > Redirection**
5. Add new redirect:
   - Source URL: `/current-projects/`
   - Target URL: `/contact/`
6. Click **Add Redirect**

**Time:** 5-10 minutes

---

### Task 1.5: Update About Page Mission Statement

**Steps:**

1. Go to **Pages > About**
2. Click **Edit** (or Edit with Elementor)
3. Find the mission statement section
4. Replace with new text
5. Click **Update**

**Replace with:**
```
Databender Consulting combines senior strategic expertise with a
200-person delivery team—giving you the thinking of a boutique
consultancy with the execution capacity of a large firm.

We help companies turn scattered data into clear answers. Whether
you need to clean up messy data, see what's happening across your
business, or use AI to work smarter—we build it and we run it.
```

**Time:** 10 minutes

---

### Task 1.6: Update "Why Us" / Differentiators Section

**Steps:**

1. Still on the About page (or Homepage if that's where it lives)
2. Find the section with your differentiators/why choose us
3. Replace the current points with these 4:

**New differentiators:**

```
1. SENIOR + SCALE
Senior experts guide your project. A 200-person team delivers it.
Direct access to experienced consultants who understand your business,
backed by the capacity to execute quickly.

2. AI THAT WORKS
AI analytics that actually answer correctly—because we build the
foundation first. Most AI projects fail because the data isn't ready.
We fix the foundation before adding intelligence.

3. FROM INSIGHT TO ACTION
We don't stop at dashboards. We build systems that put your data to work.
Visibility is just the start. We automate decisions, trigger workflows,
and integrate insights into your daily operations.

4. REGULATED-READY
HIPAA, GDPR, SOC 2. Compliance built in from day one.
If your industry requires it, we know how to build it right.
```

**Time:** 15-20 minutes

---

### Phase 1 Checklist

- [ ] Removed broken "Our Process" from navigation
- [ ] Updated homepage hero text and buttons
- [ ] Updated footer tagline
- [ ] Hid/redirected "Current Projects" page
- [ ] Updated About page mission statement
- [ ] Updated differentiators section

**Congratulations!** You've completed the quick wins. Your site already looks more professional.

---

## Phase 2: Content Updates

**Time:** 2-4 hours
**Risk:** Low
**Impact:** High

These tasks update existing pages with new messaging and structure.

---

### Task 2.1: Update Solutions/Services Hub Page

**Steps:**

1. Go to **Pages** and find your Solutions or Services page
2. Click **Edit**
3. Update the content to match the new structure

**New content:**

```
HEADLINE: Everything you need to turn data into results

INTRO TEXT:
From cleaning up scattered systems to AI that works—we build
complete solutions, not pieces.

THREE PILLARS SECTION:

[PILLAR 1: DATA MANAGEMENT]
"Get your data in order"
Connect scattered systems. Clean messy records. Build a foundation
you can trust.
• Data Integration
• AI-Powered Data Cleanup ★
• Data Foundation

[PILLAR 2: BUSINESS INTELLIGENCE]
"See what's happening"
Dashboards that answer real questions. Reports that run themselves.
Visibility across your whole operation.
• Dashboards & Analytics
• Natural Language BI ★
• Operational Visibility

[PILLAR 3: AI & AUTOMATION]
"Work smarter with AI"
AI that actually answers correctly. Automation that saves real hours.
Intelligence that improves over time.
• AI-Generated Insights ★
• Predictive Analytics

EXTENDED CAPABILITIES SECTION:
"Beyond analytics"
Sometimes you need more than data solutions. With our 200-person
delivery team, we can build custom applications, provide ongoing
managed services, or ensure compliance requirements are met.
• Custom Applications
• Managed Services
• Compliance & Security

BOTTOM CTA:
"Not sure where to start? Take our free assessment."
[Take Assessment Button]
```

**Time:** 30-45 minutes

---

### Task 2.2: Update Industries Hub Page

**Steps:**

1. Go to **Pages** and find your Industries page
2. Click **Edit**
3. Remove old industry boxes (Agriculture, Cannabis, etc.)
4. Add new industry boxes

**New content:**

```
HEADLINE: Experience in your industry

INTRO TEXT:
We've solved data problems across healthcare, legal, real estate,
and manufacturing. That cross-industry experience means we bring
proven approaches—not experiments.

INDUSTRY CARDS:

[PROFESSIONAL SERVICES]
"For law firms and consultancies"
Knowledge management, client intelligence, firm analytics.
[Learn More →] → /industries/professional-services/

[HEALTHCARE & DENTAL]
"For practices and DSOs"
Operational visibility, multi-location analytics, compliance.
[Learn More →] → /industries/healthcare-dental/

[COMMERCIAL REAL ESTATE]
"For property managers"
Portfolio intelligence, unified visibility across properties.
[Learn More →] → /industries/commercial-real-estate/

[MANUFACTURING]
"For scale-up manufacturers"
Sales intelligence, operational visibility, unified data.
[Learn More →] → /industries/manufacturing/

BOTTOM TEXT:
"Don't see your industry? Our core capabilities—data integration,
business intelligence, and AI—apply across industries."
[Contact Us]
```

**Time:** 30-45 minutes

---

### Task 2.3: Delete Old Industry Pages

**Steps:**

1. Go to **Pages**
2. Find and delete (or unpublish) these pages:
   - Agriculture
   - Beverage & Spirits
   - Cannabis
   - Content Creators
   - Small Businesses

**To delete a page:**
1. Hover over the page name
2. Click **Trash**

**To unpublish instead (safer):**
1. Click **Edit**
2. In the right panel, change Status from "Published" to "Draft"
3. Click **Update**

**Time:** 10 minutes

---

### Task 2.4: Update Contact Page

**Steps:**

1. Go to **Pages > Contact**
2. Update the intro text
3. Make sure the form is working

**New intro text:**
```
HEADLINE: Let's Talk

Ready to discuss your data challenges? Schedule a consultation
or send us a message.

We typically respond within one business day.

[Contact Form]

Or schedule directly:
[Schedule Consultation Button] → Calendly link
```

**Time:** 10-15 minutes

---

### Phase 2 Checklist

- [ ] Updated Solutions/Services hub page with three pillars
- [ ] Updated Industries hub page with 4 target industries
- [ ] Deleted/unpublished old industry pages
- [ ] Updated Contact page

---

## Phase 3: New Pages

**Time:** 1-2 days
**Risk:** Medium
**Impact:** High

These tasks create new pages that don't exist yet.

---

### How to Create a New Page

**Basic steps for any new page:**

1. Go to **Pages > Add New**
2. Enter the page title
3. In the right panel, under **Page Attributes**:
   - Set **Parent** if it's a sub-page (e.g., parent = "Industries")
   - Set **Template** if your theme has page templates
4. Build your content
5. Click **Publish**

**Setting the URL (permalink):**
- After you enter the title, click on **Permalink** (usually below title)
- Edit the slug to match what you want (e.g., `professional-services`)

---

### Task 3.1: Create Professional Services Industry Page

**Page Details:**
- Title: Professional Services
- Parent: Industries
- URL: `/industries/professional-services/`

**Content to add:**

```
HEADLINE: Your firm's knowledge, at everyone's fingertips

SUBHEADLINE:
Stop reinventing the wheel. We help professional services firms find
what they already know, understand their clients better, and run
more efficiently.

INTRO PARAGRAPH:
Your firm has decades of expertise locked in documents, matters, and
people's heads. We make it accessible—so every professional can
leverage the full power of the firm.

THE CHALLENGE SECTION:
"Your biggest asset is invisible"

• Knowledge is scattered - Prior work exists—somewhere. Finding it
  means asking around and hoping someone remembers.

• New associates start from zero - Instead of leveraging firm precedent,
  they reinvent approaches case by case.

• Client relationships are siloed - One partner knows the client deeply.
  Everyone else knows nothing.

• People leave, knowledge leaves - When partners retire, decades of
  expertise walk out the door.

HOW WE HELP SECTION:

[Knowledge Management]
AI-powered search across documents, matters, and emails.
Find relevant precedent in minutes, not hours.

[Client Intelligence]
Unified client view across all matters and touchpoints.
Everyone sees the complete client picture.

[Firm Analytics]
Real-time utilization dashboards, matter profitability analysis.
Know how the firm is performing without waiting for month-end.

CTA SECTION:
"Discuss your firm's challenges"
[Schedule Discussion] → Calendly
```

**Time:** 45-60 minutes

---

### Task 3.2: Create Healthcare & Dental Industry Page

**Page Details:**
- Title: Healthcare & Dental
- Parent: Industries
- URL: `/industries/healthcare-dental/`

**Content to add:**

```
HEADLINE: See every location. Run one practice.

SUBHEADLINE:
Unified visibility across all your locations—so you can manage by
exception instead of calling around.

INTRO PARAGRAPH:
Multi-location healthcare is operationally complex. Different systems
at each location. Different workflows. Different staff. We create
unified visibility so you can manage effectively.

THE CHALLENGE SECTION:
"Growth creates complexity"

• Every location is an island - Different PM systems, different processes,
  no unified view

• Can't compare locations - Without consistent data, comparing performance
  is guesswork

• Reporting takes forever - Pulling monthly reports from 10+ locations
  takes a week

• Acquisitions make it worse - Each acquisition brings another system,
  more complexity

HOW WE HELP SECTION:

[Unified Visibility]
Connect all PM systems into one view. Real-time dashboards accessible
from anywhere.

[Operational Analytics]
Patient volume, scheduling efficiency, provider productivity,
revenue cycle visibility.

[HIPAA-Compliant Infrastructure]
Secure data handling with appropriate controls. BAAs in place
with all vendors.

FOR DENTAL DSOs:
Growing dental organizations have specific challenges: integrating
Dentrix, Eaglesoft, Open Dental, and other practice management systems.
[Learn more about DSO solutions →]

CTA SECTION:
"Discuss your visibility needs"
[Schedule Discussion] → Calendly
```

**Time:** 45-60 minutes

---

### Task 3.3: Create Commercial Real Estate Industry Page

**Page Details:**
- Title: Commercial Real Estate
- Parent: Industries
- URL: `/industries/commercial-real-estate/`

**Content to add:**

```
HEADLINE: See your whole portfolio. Not just properties.

SUBHEADLINE:
Unified intelligence across all your properties—even when each uses
different software. One view, all properties, real-time.

INTRO PARAGRAPH:
Your portfolio data is fragmented. Every property uses different
software. Getting a unified view means weeks of manual work. We fix that.

THE CHALLENGE SECTION:
"Every property is an island"

• No unified portfolio view - Can't see occupancy, NOI, performance
  across all properties

• Reporting takes weeks - Manual consolidation for every investor/owner report

• Lease renewals slip - No centralized view of upcoming expirations

• Acquisitions add complexity - Every new property brings another system

HOW WE HELP SECTION:

[Multi-System Integration]
Connect Yardi, AppFolio, MRI, and others into one unified view.

[Portfolio Dashboards]
Portfolio-wide occupancy, NOI by property, rent roll and lease analytics.

[Lease Intelligence]
Centralized renewal pipeline. Expirations surfaced 6-9 months out.

[Owner Reporting]
Automated report generation. Reports that took weeks now take hours.

CTA SECTION:
"Discuss your portfolio needs"
[Schedule Discussion] → Calendly
```

**Time:** 45-60 minutes

---

### Task 3.4: Create Manufacturing Industry Page

**Page Details:**
- Title: Manufacturing
- Parent: Industries
- URL: `/industries/manufacturing/`

**Content to add:**

```
HEADLINE: Your data, finally connected

SUBHEADLINE:
Unified data infrastructure that connects Salesforce, ERP, inventory,
and everything else. See the whole business, not just pieces.

INTRO PARAGRAPH:
Scale-up manufacturers have a data problem. Operations have outpaced
infrastructure. You have the tools—Salesforce, QuickBooks, inventory
systems—but nothing that ties them together. We fix that.

THE CHALLENGE SECTION:
"You've outgrown your data infrastructure"

• Systems don't connect - Salesforce doesn't know what inventory knows

• No unified view - "How's the business doing?" takes a week to answer

• Reporting is manual - Every report is an export-combine-format project

• Can't trust the numbers - Different systems show different answers

HOW WE HELP SECTION:

[Unified Data Infrastructure]
Data warehouse connecting all your systems. Ask any question about
your business and get an answer in minutes.

[Sales Intelligence]
Lead scoring, pipeline visibility, rep performance dashboards.
Reps focus on deals that close.

[Executive Visibility]
KPI dashboards for leadership. Board-ready reporting—automated.
"How's the business?" answered in 30 seconds.

ENGAGEMENT OPTIONS:
Not sure where to start? We offer a Discovery Roadmap ($3.5K-$5K)
that gives you a clear plan before committing to a larger project.

CTA SECTION:
"Let's talk about your data situation"
[Schedule a Conversation] → Calendly
```

**Time:** 45-60 minutes

---

### Task 3.5: Create Flagship Service Pages

Create these three pages to highlight your key differentiators:

**Page 1: AI-Powered Data Cleanup**
- URL: `/services/ai-data-cleanup/`
- Parent: Services

**Content summary:**
```
HEADLINE: Data cleanup that actually sticks

SUBHEADLINE:
AI-powered cleaning that matches records, fixes duplicates, and
standardizes data across all your systems—and keeps it clean over time.

KEY POINTS:
• AI learns your data patterns
• Handles millions of records efficiently
• Maintains quality ongoing (not just one-time cleanup)
• 99%+ match rates across systems

THE PROBLEM:
• Duplicate records
• Inconsistent formats
• Outdated information
• Systems that don't match

HOW IT WORKS:
1. Assessment - Analyze current data quality
2. Training - AI learns your business context
3. Cleanup - Process and clean data
4. Ongoing monitoring - Catch problems before they spread

CTA: "Get a Data Quality Assessment"
```

---

**Page 2: Natural Language BI**
- URL: `/services/natural-language-bi/`
- Parent: Services

**Content summary:**
```
HEADLINE: Just ask

SUBHEADLINE:
Ask business questions in plain English. Get accurate answers in seconds.
No SQL, no report requests, no waiting.

EXAMPLE:
You: "What was our revenue by region last quarter?"
Answer: [Chart + narrative explanation]

KEY POINTS:
• Actually accurate (because we build the foundation first)
• Understands your business terminology
• Not a toy demo—production-ready

THE PROBLEM:
• Can't answer your own questions
• Reports take too long
• Dashboard overload (47 dashboards, none answer your question)

CTA: "See a Demo"
```

---

**Page 3: AI-Generated Insights**
- URL: `/services/ai-insights/`
- Parent: Services

**Content summary:**
```
HEADLINE: Your data has something to say

SUBHEADLINE:
AI that automatically analyzes your business data and tells you
what's important—before you even know to ask.

KEY POINTS:
• Proactive (surfaces insights without being asked)
• Contextual (knows what matters in your business)
• Actionable (recommendations, not just observations)

EXAMPLE INSIGHT:
"Revenue Alert: Northeast region is up 23% month-over-month.
Key driver: New enterprise customer. Recommendation: Allocate
additional sales resources to capitalize on momentum."

CTA: "See What Insights Are Hiding in Your Data"
```

**Time for all 3 pages:** 2-3 hours

---

### Task 3.6: Create Case Studies Hub Page

**Page Details:**
- Title: Case Studies
- URL: `/case-studies/`

**Content to add:**

```
HEADLINE: Results that speak for themselves

SUBHEADLINE:
See how we've helped companies turn scattered data into clear answers,
manual processes into automation, and guesswork into insight.

CASE STUDY CARDS:

[Card 1: Healthcare Pricing Intelligence]
Industry: Healthcare | Service: Data Integration, AI
Processed 100+ GB of hospital pricing data into actionable
competitive intelligence.
[Read Case Study →]

[Card 2: Firm Knowledge Platform]
Industry: Professional Services | Service: AI, Knowledge Management
AI-powered search that reduced research time by 75%.
[Read Case Study →]

[Card 3: Sales Intelligence Pipeline]
Industry: Manufacturing | Service: Predictive Analytics
Lead scoring that improved conversion rates by 23%.
[Read Case Study →]

CTA: "Start your success story"
[Schedule Consultation]
```

**Time:** 30-45 minutes

---

### Task 3.7: Add New Pages to Navigation

**Steps:**

1. Go to **Appearance > Menus**
2. Find your Primary/Main Menu
3. On the left, under "Pages," check the boxes for your new pages
4. Click **Add to Menu**
5. Drag to arrange in the right order:
   - Services (with sub-pages)
   - Industries (with sub-pages)
   - Case Studies
   - About
   - Contact
6. Click **Save Menu**

**Creating dropdown menus:**
- Drag a page slightly to the right under another page
- It will indent and become a sub-item
- Example: Drag "Healthcare & Dental" under "Industries"

**Time:** 15-20 minutes

---

### Phase 3 Checklist

- [ ] Created Professional Services industry page
- [ ] Created Healthcare & Dental industry page
- [ ] Created Commercial Real Estate industry page
- [ ] Created Manufacturing industry page
- [ ] Created AI-Powered Data Cleanup service page
- [ ] Created Natural Language BI service page
- [ ] Created AI-Generated Insights service page
- [ ] Created Case Studies hub page
- [ ] Added new pages to navigation menu
- [ ] Verified all links work correctly

---

## Phase 4: Lead Capture

**Time:** 2-4 hours
**Risk:** Low
**Impact:** High

These tasks add ways for visitors to engage and become leads.

---

### Task 4.1: Install Form Plugin

**Recommended:** WPForms (free version works for basic forms)

**Steps:**

1. Go to **Plugins > Add New**
2. Search for "WPForms"
3. Click **Install Now** on "WPForms Lite"
4. Click **Activate**

**Time:** 5 minutes

---

### Task 4.2: Create Data & AI Readiness Assessment Form

**Steps:**

1. Go to **WPForms > Add New**
2. Name it "Data & AI Readiness Assessment"
3. Start with a blank form
4. Add these fields (drag from left panel):

**Question 1:** Dropdown
- Label: "What's your biggest data challenge right now?"
- Options:
  - Data scattered across too many systems
  - Can't trust our data quality
  - Reporting takes too long
  - Missing insights for decisions
  - Manual processes eating up time
  - Want to use AI but don't know how

**Question 2:** Dropdown
- Label: "Do you have internal data/analytics staff?"
- Options:
  - No dedicated data roles
  - 1-2 people handling data among other duties
  - Small data team (3-5 people)
  - Mature data organization (6+)

**Question 3:** Dropdown
- Label: "What's your timeline?"
- Options:
  - Urgent - need help now
  - Near-term - within 3 months
  - Planning - within 6 months
  - Exploring - no specific timeline

**Question 4:** Dropdown
- Label: "What industry are you in?"
- Options:
  - Healthcare / Dental
  - Legal / Professional Services
  - Commercial Real Estate
  - Manufacturing
  - Other

**Question 5:** Dropdown
- Label: "What's your approximate budget range?"
- Options:
  - Under $10K
  - $10K - $25K
  - $25K - $50K
  - $50K - $100K
  - Over $100K
  - Not sure yet

**Question 6:** Single Line Text
- Label: "Name"
- Required: Yes

**Question 7:** Email
- Label: "Email"
- Required: Yes

**Question 8:** Single Line Text
- Label: "Company"
- Required: Yes

**Question 9:** Phone
- Label: "Phone"
- Required: No

**Question 10:** Paragraph Text
- Label: "Anything else you'd like us to know?"
- Required: No

5. Click **Settings > Notifications**
6. Make sure your email is entered to receive submissions
7. Click **Save**

**Time:** 30-45 minutes

---

### Task 4.3: Create Assessment Page

**Steps:**

1. Go to **Pages > Add New**
2. Title: "Data & AI Readiness Assessment"
3. URL slug: `data-ai-readiness`
4. Set Parent: Create an "Assessments" parent page first if needed
5. Add content:

```
HEADLINE: Data & AI Readiness Assessment

SUBHEADLINE:
2 minutes to understand your current state and identify your biggest opportunities.

WHAT YOU GET:
• Summary of your situation
• Personalized recommendations
• Suggested next steps
• No obligation

[EMBED FORM HERE]

Use WPForms block/shortcode to embed the form.
```

6. Click **Publish**

**To embed the form:**
- In block editor: Add a "WPForms" block, select your form
- In Elementor: Add "WPForms" widget, select your form

**Time:** 20-30 minutes

---

### Task 4.4: Set Up Calendly for Consultations

**Steps:**

1. Go to [calendly.com](https://calendly.com) and create account (free tier works)
2. Create an event type:
   - Name: "30-Minute Consultation"
   - Duration: 30 minutes
   - Location: Zoom or Google Meet
3. Set your availability
4. Copy your Calendly link

**To embed on your site:**

Option A - Just link to it:
- Add buttons that link to your Calendly URL
- Button text: "Schedule Consultation"

Option B - Embed on page:
1. In Calendly, click **Share** on your event
2. Click **Add to Website**
3. Choose "Inline Embed"
4. Copy the embed code
5. In WordPress, add an HTML block and paste the code

**Time:** 30-45 minutes

---

### Task 4.5: Update CTAs Throughout Site

Now that you have the assessment and Calendly set up, update buttons across the site:

**Primary CTA (most prominent):**
- Text: "Take Free Assessment"
- Link: `/assessments/data-ai-readiness/`

**Secondary CTA:**
- Text: "Schedule Consultation"
- Link: Your Calendly link

**Where to update:**
- [ ] Homepage hero buttons
- [ ] Homepage bottom CTA section
- [ ] About page
- [ ] Each service page (bottom CTA)
- [ ] Each industry page (bottom CTA)
- [ ] Contact page

**Time:** 30-45 minutes

---

### Task 4.6: Set Up Email Notifications

**For form submissions:**

1. Go to **WPForms > All Forms**
2. Edit your assessment form
3. Click **Settings > Notifications**
4. Customize the email template:
   - Subject: "New Assessment Submission from {field_id="6"}" (name field)
   - Include all form fields in the email body
5. Save

**Future improvement:**
Set up automated email follow-up sequences with Mailchimp or similar. This requires more setup but significantly improves conversion.

**Time:** 15-20 minutes

---

### Phase 4 Checklist

- [ ] Installed WPForms plugin
- [ ] Created assessment form with all questions
- [ ] Created assessment page and embedded form
- [ ] Set up Calendly account and event
- [ ] Added Calendly link/embed to Contact page
- [ ] Updated CTAs across all pages
- [ ] Verified form submissions are received

---

## Verification & Testing

After completing all phases, test everything:

### Navigation Test
- [ ] All menu items lead to correct pages
- [ ] No broken links (404 errors)
- [ ] Dropdowns work correctly

### Form Test
- [ ] Assessment form submits successfully
- [ ] You receive email notification
- [ ] Thank you message displays

### Mobile Test
- [ ] Site looks good on phone
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Forms work on mobile

### Content Test
- [ ] No placeholder text remaining
- [ ] All images load
- [ ] Testimonials display correctly

---

## Troubleshooting Common Issues

### "I can't find the page I want to edit"
- Try using the search in **Pages** list
- The page might be a "child" page (look under parent pages)
- It might be created by your page builder (check theme options)

### "My changes didn't save"
- Make sure you clicked **Update** or **Publish**
- Clear your browser cache (Ctrl+Shift+R)
- Check if there are multiple versions (revisions)

### "The page looks broken after editing"
- Use the **Revision** feature to restore previous version
- Go to **Pages**, edit the page, look for "Revisions" in right panel

### "I can't see the Edit with Elementor button"
- Make sure Elementor plugin is active
- The page might need Elementor enabled (edit page, find "Elementor" in page settings)

### "Form submissions aren't coming through"
- Check spam folder
- Verify email address in form settings
- Test with a different email address

### "Calendly embed isn't showing"
- Make sure you copied the full embed code
- Check if your theme blocks external embeds
- Try the link option instead of embed

---

## Quick Reference: Key Content Locations

| Content | Where It's Documented |
|---------|----------------------|
| Homepage copy | `Website Plans/Homepage/homepage.md` |
| Service page copy | `Website Plans/Services/[service-name].md` |
| Industry page copy | `Website Plans/Industries/[industry-name]/` |
| Overall site structure | `Website Plans/_overview.md` |
| Voice/tone guidelines | `Website Plans/_overview.md` (Voice & Tone section) |
| Assessment questions | `Website Plans/Assessments/_assessments-overview.md` |

---

## What to Do If You Get Stuck

1. **Don't panic** - WordPress saves revisions, so you can undo mistakes
2. **Take a screenshot** - Before making big changes
3. **Google the specific error** - WordPress is well-documented
4. **Check WordPress support forums** - Most issues have been solved before
5. **Ask for help** - Sometimes a second pair of eyes helps

---

## Next Steps After This Guide

Once you've completed all phases:

1. **Monitor analytics** - Track which pages get traffic
2. **Collect testimonials** - Add to relevant industry pages
3. **Create blog content** - Support your new positioning
4. **Set up email sequences** - Automate follow-up to assessment submissions
5. **Add more case studies** - Build social proof over time

---

*Guide created: December 2024*
*Based on: Website Plans folder specifications*

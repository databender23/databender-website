# Website Deployment SOP

Standard Operating Procedure for deploying the DataBender website to production.

**Last Updated**: February 2026
**Deployment Platform**: AWS Amplify (us-east-2)
**App ID**: dmjrh5y3hpi2d
**Production URL**: https://databender.co

---

## Quick Reference

```bash
# Pre-deployment validation
npm test && npm run build

# Deploy (push to main triggers Amplify)
git push origin main

# Monitor deployment
aws amplify list-jobs --app-id dmjrh5y3hpi2d --branch-name main --profile databender --region us-east-2 --max-items 1

# Rollback if needed
aws amplify start-job --app-id dmjrh5y3hpi2d --branch-name main --job-type RELEASE --job-reason "Rollback" --commit-id <previous-commit> --profile databender --region us-east-2
```

---

## Phase 1: Pre-Deployment Validation

### 1.1 Run Unit Tests

```bash
npm test
```

**Expected**: All tests pass (currently 74 tests in 4 test suites as of Feb 2026)

**If tests fail**: Fix all failing tests before proceeding. The Amplify build will reject deployments with failing tests.

### 1.2 Run Production Build

```bash
npm run build
```

**Expected**: Build completes without errors. All pages pre-render successfully.

**Common Issues**:
- TypeScript errors in server components
- Missing exports from client components used in server components
- JSON-LD schema serialization errors

### 1.3 Run Local Server Test (Optional but Recommended)

```bash
npm run start
```

Visit `http://localhost:3000` and manually verify critical paths work.

### 1.4 Run Linter

```bash
npm run lint
```

**Note**: Warnings are acceptable, errors should be fixed.

### 1.5 Git Status Check

```bash
git status
git diff origin/main
```

Review all changes that will be deployed. Ensure no sensitive files (`.env`, credentials) are staged.

### 1.6 Guide Consistency Check (When Modifying Guides)

Verify all guides are properly registered across all required files:

```bash
echo "=== GUIDE CONSISTENCY CHECK ==="

# Extract slugs from guide-content-data.ts
CONTENT_SLUGS=$(grep -o 'slug: "[^"]*"' src/lib/guide-content-data.ts | sed 's/slug: "//g' | sed 's/"//g' | sort)

# Extract slugs from lead-magnets-data.ts
LANDING_SLUGS=$(grep -o 'slug: "[^"]*"' src/lib/lead-magnets-data.ts | sed 's/slug: "//g' | sed 's/"//g' | sort)

echo ""
echo "Guides with CONTENT but NO LANDING PAGE:"
comm -23 <(echo "$CONTENT_SLUGS") <(echo "$LANDING_SLUGS")

echo ""
echo "Guides with LANDING PAGE but NO CONTENT:"
comm -13 <(echo "$CONTENT_SLUGS") <(echo "$LANDING_SLUGS")

echo ""
echo "If any guides are listed above, add them to the missing file before deploying."
```

**Files that must be synchronized for each guide:**
| File | Purpose |
|------|---------|
| `src/lib/lead-magnets-data.ts` | Landing page data (title, description, form) |
| `src/lib/guide-content-data.ts` | Full guide content for web reading |
| `public/downloads/<slug>.pdf` | Downloadable PDF |
| `src/lib/sequences/types.ts` | Email sequence mapping (optional) |

---

## Phase 2: Deployment

### 2.1 Commit and Push

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

**Deployment is automatic** - pushing to `main` triggers Amplify build.

### 2.2 Monitor Build Progress

```bash
aws amplify list-jobs --app-id dmjrh5y3hpi2d --branch-name main --profile databender --region us-east-2 --max-items 1
```

**Build Stages**:
1. `PROVISIONING` - Setting up build environment
2. `BUILD` - Running npm test & npm run build
3. `DEPLOY` - Deploying to CloudFront
4. `SUCCEED` or `FAILED`

**Typical Duration**: 3-5 minutes

### 2.3 Check for Build Failures

If status shows `FAILED`:

```bash
aws amplify get-job --app-id dmjrh5y3hpi2d --branch-name main --job-id <job-id> --profile databender --region us-east-2
```

Or check the Amplify Console: https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/dmjrh5y3hpi2d

---

## Phase 3: Post-Deployment Validation

**Wait 1-2 minutes** after deployment succeeds for CloudFront cache to update.

### 3.1 Page Rendering Tests

Verify all major pages return HTTP 200:

```bash
# Core pages
curl -sI "https://databender.co/" | head -1
curl -sI "https://databender.co/services" | head -1
curl -sI "https://databender.co/contact" | head -1
curl -sI "https://databender.co/about" | head -1
curl -sI "https://databender.co/blog" | head -1
curl -sI "https://databender.co/case-studies" | head -1
curl -sI "https://databender.co/resources" | head -1

# Service detail pages
curl -sI "https://databender.co/services/data-ai-strategy" | head -1
curl -sI "https://databender.co/services/analytics-bi" | head -1
curl -sI "https://databender.co/services/ai-services" | head -1
curl -sI "https://databender.co/services/custom-software" | head -1

# Industry pages
curl -sI "https://databender.co/industries/legal" | head -1
curl -sI "https://databender.co/industries/healthcare" | head -1
curl -sI "https://databender.co/industries/manufacturing" | head -1
curl -sI "https://databender.co/industries/commercial-real-estate" | head -1
curl -sI "https://databender.co/industries/construction" | head -1
curl -sI "https://databender.co/industries/wholesale-distribution" | head -1

# Assessment pages
curl -sI "https://databender.co/assessments" | head -1
curl -sI "https://databender.co/assessments/data-ai-readiness" | head -1
curl -sI "https://databender.co/assessments/manufacturing" | head -1
curl -sI "https://databender.co/assessments/legal" | head -1
curl -sI "https://databender.co/assessments/healthcare-ai-readiness" | head -1
curl -sI "https://databender.co/assessments/healthcare-benchmark" | head -1
curl -sI "https://databender.co/assessments/commercial-real-estate" | head -1
curl -sI "https://databender.co/assessments/deal-intelligence" | head -1
curl -sI "https://databender.co/assessments/construction" | head -1
curl -sI "https://databender.co/assessments/distribution" | head -1

# Assessment results pages (should return 200 even without session data)
curl -sI "https://databender.co/assessments/data-ai-readiness/results" | head -1
curl -sI "https://databender.co/assessments/manufacturing/results" | head -1
curl -sI "https://databender.co/assessments/legal/results" | head -1
curl -sI "https://databender.co/assessments/healthcare-ai-readiness/results" | head -1
curl -sI "https://databender.co/assessments/commercial-real-estate/results" | head -1
curl -sI "https://databender.co/assessments/deal-intelligence/results" | head -1
curl -sI "https://databender.co/assessments/construction/results" | head -1
curl -sI "https://databender.co/assessments/distribution/results" | head -1

# Case study pages
curl -sI "https://databender.co/case-studies/army-of-ai-agents" | head -1
curl -sI "https://databender.co/case-studies/what-predicts-lead-conversion" | head -1
curl -sI "https://databender.co/case-studies/agentic-document-intelligence" | head -1

# Blog posts (dynamic routes)
curl -sI "https://databender.co/blog/ai-augmented-onshore-vs-offshore" | head -1
curl -sI "https://databender.co/blog/what-business-leaders-need-to-know-about-data" | head -1
curl -sI "https://databender.co/blog/manufacturing-lead-scoring" | head -1
curl -sI "https://databender.co/blog/partner-knowledge-retirement" | head -1
curl -sI "https://databender.co/blog/ai-projects-that-deliver-roi" | head -1
curl -sI "https://databender.co/blog/beyond-points-the-advanced-metrics-for-winning-teams" | head -1

# Guide pages - Legal (6 guides)
curl -sI "https://databender.co/resources/guides/associate-multiplier" | head -1
curl -sI "https://databender.co/resources/guides/partner-succession" | head -1
curl -sI "https://databender.co/resources/guides/win-more-pitches" | head -1
curl -sI "https://databender.co/resources/guides/last-vendor" | head -1
curl -sI "https://databender.co/resources/guides/own-your-ai" | head -1
curl -sI "https://databender.co/resources/guides/economics-of-legal-ai" | head -1

# Guide pages - Healthcare (3 guides)
curl -sI "https://databender.co/resources/guides/hipaa-compliant-ai" | head -1
curl -sI "https://databender.co/resources/guides/institutional-knowledge-healthcare" | head -1
curl -sI "https://databender.co/resources/guides/document-intelligence-healthcare" | head -1

# Guide pages - Manufacturing (4 guides)
curl -sI "https://databender.co/resources/guides/operational-visibility-playbook" | head -1
curl -sI "https://databender.co/resources/guides/lead-scoring-manufacturing" | head -1
curl -sI "https://databender.co/resources/guides/manufacturing-ai-privacy" | head -1
curl -sI "https://databender.co/resources/guides/data-cleanup-manufacturing" | head -1

# Guide pages - Commercial Real Estate (6 guides)
curl -sI "https://databender.co/resources/guides/entity-resolution-cre" | head -1
curl -sI "https://databender.co/resources/guides/data-room-review" | head -1
curl -sI "https://databender.co/resources/guides/deal-prioritization" | head -1
curl -sI "https://databender.co/resources/guides/portfolio-visibility-cre" | head -1
curl -sI "https://databender.co/resources/guides/investor-reporting-cre" | head -1
curl -sI "https://databender.co/resources/guides/lease-intelligence-cre" | head -1
```

**Expected**: All return `HTTP/2 200`

### 3.2 API Endpoint Tests

```bash
# Contact form API (should accept OPTIONS for CORS preflight)
curl -sI -X OPTIONS "https://databender.co/api/contact" | head -5
# Expected: HTTP/2 204 (No Content)

# Lead capture API validation
curl -s -X POST "https://databender.co/api/lead-capture" \
  -H "Content-Type: application/json" -d '{}'
# Expected: {"error":"Email is required"}

# OG Image (dynamic generator)
curl -sI "https://databender.co/opengraph-image" | head -5
# Expected: HTTP/2 200, Content-Type: image/png

# Invalid PDF should 404
curl -sI "https://databender.co/api/downloads/invalid-slug" | head -1
# Expected: HTTP/2 404
```

**Note**: The Analytics API (`/api/analytics`) is POST-only and does not respond to OPTIONS requests (404 is expected for OPTIONS).

### 3.3 PDF Download Tests

All guides should return HTTP/2 200 with Content-Type: application/pdf

```bash
# Legal guides (6 PDFs)
curl -sI "https://databender.co/api/downloads/associate-multiplier" | head -3
curl -sI "https://databender.co/api/downloads/partner-succession" | head -3
curl -sI "https://databender.co/api/downloads/win-more-pitches" | head -3
curl -sI "https://databender.co/api/downloads/last-vendor" | head -3
curl -sI "https://databender.co/api/downloads/own-your-ai" | head -3
curl -sI "https://databender.co/api/downloads/economics-of-legal-ai" | head -3

# Healthcare guides
curl -sI "https://databender.co/api/downloads/hipaa-compliant-ai" | head -3
curl -sI "https://databender.co/api/downloads/institutional-knowledge-healthcare" | head -3
curl -sI "https://databender.co/api/downloads/document-intelligence-healthcare" | head -3

# Manufacturing guides
curl -sI "https://databender.co/api/downloads/data-cleanup-manufacturing" | head -3
curl -sI "https://databender.co/api/downloads/lead-scoring-manufacturing" | head -3
curl -sI "https://databender.co/api/downloads/operational-visibility-playbook" | head -3
curl -sI "https://databender.co/api/downloads/manufacturing-ai-privacy" | head -3

# Commercial Real Estate guides
curl -sI "https://databender.co/api/downloads/entity-resolution-cre" | head -3
curl -sI "https://databender.co/api/downloads/data-room-review" | head -3
curl -sI "https://databender.co/api/downloads/deal-prioritization" | head -3
curl -sI "https://databender.co/api/downloads/portfolio-visibility-cre" | head -3
curl -sI "https://databender.co/api/downloads/investor-reporting-cre" | head -3
curl -sI "https://databender.co/api/downloads/lease-intelligence-cre" | head -3
```

**Expected for all**: `HTTP/2 200` and `content-type: application/pdf`

### 3.3.1 Comprehensive Guide Workflow Testing

This section covers full workflow testing for all guide pages. Each guide must be tested for:
1. **Landing page** - Returns HTTP 200
2. **Content page** - Returns HTTP 200 and renders guide content
3. **PDF download** - Returns valid PDF with correct size (typically 250-400KB)
4. **Form submission** - Creates lead in DynamoDB
5. **Email sequence** - Lead enrolled in appropriate sequence

---

#### Legal Industry Guides

| Slug | Title | Expected PDF Size |
|------|-------|-------------------|
| `associate-multiplier` | The Associate Multiplier | ~274KB |
| `partner-succession` | The Partner Succession Problem | ~299KB |
| `win-more-pitches` | Win More Pitches | ~309KB |
| `last-vendor` | The Last Vendor You Need | ~399KB |
| `own-your-ai` | Own Your AI | ~253KB |
| `economics-of-legal-ai` | The Economics Changed | ~267KB |

```bash
echo "=== LEGAL GUIDES WORKFLOW TEST ==="
for slug in "associate-multiplier" "partner-succession" "win-more-pitches" "last-vendor" "own-your-ai" "economics-of-legal-ai"; do
  echo ""
  echo "--- Testing: $slug ---"

  # 1. Landing page
  LANDING=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug")
  echo "Landing page: $LANDING"

  # 2. Content page
  CONTENT=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug/content")
  echo "Content page: $CONTENT"

  # 3. PDF download
  curl -s -o "/tmp/$slug.pdf" "https://databender.co/api/downloads/$slug"
  PDF_SIZE=$(ls -la "/tmp/$slug.pdf" 2>/dev/null | awk '{print $5}')
  PDF_TYPE=$(file "/tmp/$slug.pdf" 2>/dev/null | grep -o "PDF document" || echo "NOT A PDF")
  echo "PDF: $PDF_SIZE bytes - $PDF_TYPE"

  # 4. Form submission
  TEST_EMAIL="test.legal.${slug}.$(date +%s)@databender.co"
  FORM_RESPONSE=$(curl -s -X POST "https://databender.co/api/lead-capture" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$TEST_EMAIL\",\"firstName\":\"Test\",\"lastName\":\"Legal\",\"company\":\"Test Law Firm\",\"guideSlug\":\"$slug\"}")
  echo "Form: $FORM_RESPONSE"
done
```

---

#### Healthcare Industry Guides

| Slug | Title | Expected PDF Size |
|------|-------|-------------------|
| `hipaa-compliant-ai` | HIPAA-Compliant AI | ~301KB |
| `institutional-knowledge-healthcare` | Capture What Your Best People Know | ~285KB |
| `document-intelligence-healthcare` | Document Intelligence for Healthcare | ~280KB |

```bash
echo "=== HEALTHCARE GUIDES WORKFLOW TEST ==="
for slug in "hipaa-compliant-ai" "institutional-knowledge-healthcare" "document-intelligence-healthcare"; do
  echo ""
  echo "--- Testing: $slug ---"

  # 1. Landing page
  LANDING=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug")
  echo "Landing page: $LANDING"

  # 2. Content page
  CONTENT=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug/content")
  echo "Content page: $CONTENT"

  # 3. PDF download
  curl -s -o "/tmp/$slug.pdf" "https://databender.co/api/downloads/$slug"
  PDF_SIZE=$(ls -la "/tmp/$slug.pdf" 2>/dev/null | awk '{print $5}')
  PDF_TYPE=$(file "/tmp/$slug.pdf" 2>/dev/null | grep -o "PDF document" || echo "NOT A PDF")
  echo "PDF: $PDF_SIZE bytes - $PDF_TYPE"

  # 4. Form submission
  TEST_EMAIL="test.healthcare.${slug}.$(date +%s)@databender.co"
  FORM_RESPONSE=$(curl -s -X POST "https://databender.co/api/lead-capture" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$TEST_EMAIL\",\"firstName\":\"Test\",\"lastName\":\"Healthcare\",\"company\":\"Test Medical Center\",\"guideSlug\":\"$slug\"}")
  echo "Form: $FORM_RESPONSE"
done
```

---

#### Manufacturing Industry Guides

| Slug | Title | Expected PDF Size |
|------|-------|-------------------|
| `operational-visibility-playbook` | The Operational Visibility Playbook | ~277KB |
| `lead-scoring-manufacturing` | Lead Scoring That Actually Works | ~294KB |
| `manufacturing-ai-privacy` | AI Without the Cloud Risk | ~281KB |
| `data-cleanup-manufacturing` | The Data Cleanup Playbook | ~283KB |

```bash
echo "=== MANUFACTURING GUIDES WORKFLOW TEST ==="
for slug in "operational-visibility-playbook" "lead-scoring-manufacturing" "manufacturing-ai-privacy" "data-cleanup-manufacturing"; do
  echo ""
  echo "--- Testing: $slug ---"

  # 1. Landing page
  LANDING=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug")
  echo "Landing page: $LANDING"

  # 2. Content page
  CONTENT=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug/content")
  echo "Content page: $CONTENT"

  # 3. PDF download
  curl -s -o "/tmp/$slug.pdf" "https://databender.co/api/downloads/$slug"
  PDF_SIZE=$(ls -la "/tmp/$slug.pdf" 2>/dev/null | awk '{print $5}')
  PDF_TYPE=$(file "/tmp/$slug.pdf" 2>/dev/null | grep -o "PDF document" || echo "NOT A PDF")
  echo "PDF: $PDF_SIZE bytes - $PDF_TYPE"

  # 4. Form submission
  TEST_EMAIL="test.mfg.${slug}.$(date +%s)@databender.co"
  FORM_RESPONSE=$(curl -s -X POST "https://databender.co/api/lead-capture" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$TEST_EMAIL\",\"firstName\":\"Test\",\"lastName\":\"Manufacturing\",\"company\":\"Test Industrial Co\",\"guideSlug\":\"$slug\"}")
  echo "Form: $FORM_RESPONSE"
done
```

---

#### Commercial Real Estate Industry Guides

**CRE Broker Guides:**

| Slug | Title | Expected PDF Size |
|------|-------|-------------------|
| `entity-resolution-cre` | Entity Resolution for CRE | ~251KB |
| `data-room-review` | Data Room Review | ~264KB |
| `deal-prioritization` | Deal Prioritization | ~287KB |

**CRE Property Management Guides:**

| Slug | Title | Expected PDF Size |
|------|-------|-------------------|
| `portfolio-visibility-cre` | One View, All Properties | ~265KB |
| `investor-reporting-cre` | Investor Reports in a Day | ~280KB |
| `lease-intelligence-cre` | Catch Renewals Before They Slip | ~287KB |

```bash
echo "=== CRE GUIDES WORKFLOW TEST ==="
for slug in "entity-resolution-cre" "data-room-review" "deal-prioritization" "portfolio-visibility-cre" "investor-reporting-cre" "lease-intelligence-cre"; do
  echo ""
  echo "--- Testing: $slug ---"

  # 1. Landing page
  LANDING=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug")
  echo "Landing page: $LANDING"

  # 2. Content page
  CONTENT=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug/content")
  echo "Content page: $CONTENT"

  # 3. PDF download
  curl -s -o "/tmp/$slug.pdf" "https://databender.co/api/downloads/$slug"
  PDF_SIZE=$(ls -la "/tmp/$slug.pdf" 2>/dev/null | awk '{print $5}')
  PDF_TYPE=$(file "/tmp/$slug.pdf" 2>/dev/null | grep -o "PDF document" || echo "NOT A PDF")
  echo "PDF: $PDF_SIZE bytes - $PDF_TYPE"

  # Verify PDF size is reasonable (>100KB indicates valid content)
  if [ "$PDF_SIZE" -lt 100000 ]; then
    echo "⚠️  WARNING: PDF size unusually small - may be corrupted!"
  fi

  # 4. Form submission
  TEST_EMAIL="test.cre.${slug}.$(date +%s)@databender.co"
  FORM_RESPONSE=$(curl -s -X POST "https://databender.co/api/lead-capture" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$TEST_EMAIL\",\"firstName\":\"Test\",\"lastName\":\"CRE\",\"company\":\"Test Realty Partners\",\"guideSlug\":\"$slug\"}")
  echo "Form: $FORM_RESPONSE"
done
```

---

#### Quick All-Guides Validation Script

Run this single script to validate all guides across all industries:

```bash
#!/bin/bash
echo "========================================"
echo "FULL GUIDE WORKFLOW VALIDATION"
echo "========================================"
echo ""

ALL_GUIDES=(
  # Legal
  "associate-multiplier"
  "partner-succession"
  "win-more-pitches"
  "last-vendor"
  "own-your-ai"
  "economics-of-legal-ai"
  # Healthcare
  "hipaa-compliant-ai"
  "institutional-knowledge-healthcare"
  "document-intelligence-healthcare"
  # Manufacturing
  "operational-visibility-playbook"
  "lead-scoring-manufacturing"
  "manufacturing-ai-privacy"
  "data-cleanup-manufacturing"
  # CRE
  "entity-resolution-cre"
  "data-room-review"
  "deal-prioritization"
  "portfolio-visibility-cre"
  "investor-reporting-cre"
  "lease-intelligence-cre"
)

PASS=0
FAIL=0

for slug in "${ALL_GUIDES[@]}"; do
  # Test landing page
  LANDING=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug")

  # Test content page
  CONTENT=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/resources/guides/$slug/content")

  # Test PDF
  PDF_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://databender.co/api/downloads/$slug")

  # Test form
  FORM=$(curl -s -X POST "https://databender.co/api/lead-capture" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"validate.${slug}.$(date +%s)@test.co\",\"firstName\":\"V\",\"lastName\":\"T\",\"guideSlug\":\"$slug\"}" \
    | grep -o '"success":true' || echo "FAIL")

  if [ "$LANDING" = "200" ] && [ "$CONTENT" = "200" ] && [ "$PDF_STATUS" = "200" ] && [ "$FORM" = '"success":true' ]; then
    echo "✓ $slug"
    ((PASS++))
  else
    echo "✗ $slug (Landing:$LANDING Content:$CONTENT PDF:$PDF_STATUS Form:$FORM)"
    ((FAIL++))
  fi
done

echo ""
echo "========================================"
echo "RESULTS: $PASS passed, $FAIL failed"
echo "========================================"
```

---

#### PDF Size Verification

After regenerating PDFs, verify all sizes are within expected ranges:

```bash
echo "=== PDF SIZE CHECK ==="
echo "Expected: 200KB - 450KB for most guides"
echo ""

for pdf in /tmp/*.pdf; do
  name=$(basename "$pdf")
  size=$(ls -la "$pdf" | awk '{print $5}')

  if [ "$size" -lt 100000 ]; then
    echo "⚠️  $name: ${size} bytes - POSSIBLY CORRUPTED"
  elif [ "$size" -lt 200000 ]; then
    echo "⚠  $name: ${size} bytes - smaller than expected"
  elif [ "$size" -gt 500000 ]; then
    echo "⚠  $name: ${size} bytes - larger than expected"
  else
    echo "✓  $name: ${size} bytes"
  fi
done
```

---

#### Style Guide Compliance Verification

For content changes, verify compliance with `docs/style-guides/content-style-guide.md`:

```bash
# Extract PDF text and check for violations
pdftotext /tmp/test-guide.pdf - > /tmp/guide-text.txt

# Check for AI slop words (should return 0 for each)
for word in delve leverage robust seamless furthermore moreover utilize comprehensive pivotal crucial transformative synergy; do
  count=$(grep -ci "\b$word\b" /tmp/guide-text.txt 2>/dev/null || echo "0")
  [ "$count" != "0" ] && echo "WARNING: Found '$word' ($count times)"
done

# Check for em dashes (should return 0)
grep -c "—" /tmp/guide-text.txt || echo "✓ No em dashes"

# Check for filler phrases
grep -ci "important to note\|worth mentioning\|rapidly evolving" /tmp/guide-text.txt || echo "✓ No filler phrases"
```

### 3.4 Lead Generation Forms (Manual Testing)

#### Contact Form (`/contact`)
1. Navigate to https://databender.co/contact
2. Fill in test data:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Company: Test Company
   - Message: Deployment validation test
3. Submit and verify success message appears
4. **Note**: Do NOT use real email for testing unless you want to receive follow-ups

#### Newsletter Signup (Footer)
1. Scroll to footer on any page
2. Enter test email in newsletter input
3. Submit and verify confirmation

#### Guide Download (`/resources/guides/associate-multiplier`)
1. Navigate to guide page
2. Enter test email
3. Submit and verify:
   - Success message appears
   - PDF download starts (check Content-Disposition header)

#### Assessment (`/assessments/data-ai-readiness`)
1. Navigate to assessment
2. Complete all questions
3. Submit with test email
4. Verify results page loads with recommendations

### 3.5 Chatbot Test

1. Open chat widget (bottom right corner)
2. Send a test message: "What services do you offer?"
3. Verify response appears (may take 2-5 seconds)
4. Verify response is relevant and not an error

### 3.6 Interactive Elements

#### Case Study Interactivity (`/case-studies/army-of-ai-agents`)
- Before/After toggle works
- Step carousel navigates correctly
- Animations play smoothly

#### ROI Calculator (if present)
- Input fields accept values
- Calculations update dynamically

### 3.7 Metadata & SEO Verification

```bash
# Check page has correct title (not generic)
curl -s "https://databender.co/industries/legal" | grep -o '<title>[^<]*</title>'
# Expected: Contains "Legal" not just "Databender | Boutique Strategy"

curl -s "https://databender.co/industries/healthcare" | grep -o '<title>[^<]*</title>'
# Expected: Contains "Healthcare" or "HIPAA"

curl -s "https://databender.co/services" | grep -o '<title>[^<]*</title>'
# Expected: Contains "Services" with specific offerings

# Check Open Graph tags
curl -s "https://databender.co/services" | grep 'og:title'

# Check sitemap is accessible
curl -sI "https://databender.co/sitemap.xml" | head -1
# Expected: HTTP/2 200

# Check robots.txt
curl -sI "https://databender.co/robots.txt" | head -1
# Expected: HTTP/2 200

# Check llms.txt for AI search engines
curl -sI "https://databender.co/llms.txt" | head -1
# Expected: HTTP/2 200
```

### 3.8 Admin Dashboard Test

#### Automated Checks (Unauthenticated)

```bash
# Admin login page should be accessible
curl -s -o /dev/null -w "%{http_code}" "https://databender.co/admin/login"
# Expected: 200

# Protected pages should redirect to login (307 Temporary Redirect)
curl -s -o /dev/null -w "%{http_code}" "https://databender.co/admin/dashboard"
# Expected: 307

curl -s -o /dev/null -w "%{http_code}" "https://databender.co/admin/leads"
# Expected: 307

curl -s -o /dev/null -w "%{http_code}" "https://databender.co/admin/analytics"
# Expected: 307
```

**Note**: 307 redirects for protected routes are expected behavior (redirecting to login).

#### Manual Verification (Authenticated)

1. Navigate to https://databender.co/admin/login
2. Login with admin credentials
3. If MFA enabled: complete MFA verification (TOTP, email OTP, or backup code)
4. Verify dashboard loads at `/admin/dashboard`
5. Check lead list loads at `/admin/leads`
6. Verify analytics data appears at `/admin/analytics`

### 3.9 MFA System Test

#### Automated Checks

```bash
# Test login returns MFA requirement (if MFA enabled for admin user)
LOGIN_RESPONSE=$(curl -s -X POST "https://databender.co/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_PASSWORD"}')
echo $LOGIN_RESPONSE | jq .
# Expected (if MFA enabled): {"success":false,"mfaRequired":true,"mfaToken":"eyJ..."}
# Expected (if MFA disabled): {"success":true}

# Test MFA status endpoint (requires auth cookie)
COOKIE=$(curl -s -c - -X POST "https://databender.co/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_PASSWORD"}' | grep admin_token | awk '{print $7}')

curl -s "https://databender.co/api/admin/mfa/enable" \
  -H "Cookie: admin_token=$COOKIE" | jq .
# Expected: {"enabled":true|false,"backupCodesRemaining":N}
```

#### MFA Setup Test (First-time setup)

```bash
# Get TOTP setup data
curl -s "https://databender.co/api/admin/mfa/setup" \
  -H "Cookie: admin_token=$COOKIE" | jq '{secret:.secret,hasQrCode:(.qrCodeDataUrl|length>0),backupCodes:(.backupCodes|length)}'
# Expected: {"secret":"BASE32SECRET","hasQrCode":true,"backupCodes":10}
```

#### Manual MFA Verification

1. If MFA not yet enabled:
   - Go to `/admin/settings`
   - Click "Set Up MFA"
   - Scan QR code with authenticator app
   - Enter 6-digit code and password
   - Save backup codes securely

2. If MFA enabled:
   - Log out and log back in
   - Verify MFA prompt appears at `/admin/mfa-verify`
   - Test TOTP code from authenticator app
   - (Optional) Test "Send code to email" for email OTP
   - (Optional) Test backup code (one-time use)

### 3.9 Mobile Responsiveness (Quick Check)

Use Chrome DevTools or visit on mobile device:
- Homepage hero displays correctly
- Navigation menu works (hamburger)
- Forms are usable on mobile
- Text is readable without zooming

---

## Phase 4: Rollback Procedure

If critical issues are discovered post-deployment:

### 4.1 Identify Previous Working Commit

```bash
git log --oneline -10
```

### 4.2 Trigger Rollback Build

```bash
aws amplify start-job \
  --app-id dmjrh5y3hpi2d \
  --branch-name main \
  --job-type RELEASE \
  --job-reason "Rollback due to [reason]" \
  --commit-id <previous-commit-hash> \
  --profile databender \
  --region us-east-2
```

### 4.3 Alternatively: Git Revert

```bash
git revert HEAD
git push origin main
```

This creates a new commit that undoes the previous changes.

---

## Validation Checklist

Use this checklist for each deployment:

### Pre-Deployment
- [ ] `npm test` passes (74 tests in 4 test suites)
- [ ] `npm run build` succeeds
- [ ] `npm run lint` has no errors
- [ ] Changes reviewed via `git diff`
- [ ] No sensitive data in commit

### Post-Deployment Pages (HTTP 200)
- [ ] Homepage `/`
- [ ] Services `/services`
- [ ] Contact `/contact`
- [ ] About `/about`
- [ ] Blog `/blog`
- [ ] Case Studies `/case-studies`
- [ ] Resources `/resources`
- [ ] Our Process `/our-process`

**Service Pages:**
- [ ] Get Clarity (Data & AI Strategy) `/services/data-ai-strategy`
- [ ] See What's Happening (Analytics & BI) `/services/analytics-bi`
- [ ] Put AI to Work (AI Services) `/services/ai-services`
- [ ] Build What You Need (Custom Software) `/services/custom-software`

**Industry Pages:**
- [ ] Legal `/industries/legal`
- [ ] Healthcare `/industries/healthcare`
- [ ] Manufacturing `/industries/manufacturing`
- [ ] Commercial Real Estate `/industries/commercial-real-estate`
- [ ] Construction `/industries/construction`
- [ ] Wholesale Distribution `/industries/wholesale-distribution`

**Assessments:**
- [ ] Assessments Hub `/assessments`
- [ ] Data & AI Readiness `/assessments/data-ai-readiness`
- [ ] Manufacturing `/assessments/manufacturing`
- [ ] Legal AI Readiness `/assessments/legal`
- [ ] Healthcare AI Readiness `/assessments/healthcare-ai-readiness`
- [ ] Healthcare Benchmark `/assessments/healthcare-benchmark`
- [ ] Commercial Real Estate `/assessments/commercial-real-estate`
- [ ] Deal Intelligence `/assessments/deal-intelligence`
- [ ] Construction `/assessments/construction`
- [ ] Wholesale Distribution `/assessments/distribution`

**Assessment Results (should return 200):**
- [ ] Data & AI Readiness Results `/assessments/data-ai-readiness/results`
- [ ] Manufacturing Results `/assessments/manufacturing/results`
- [ ] Legal Results `/assessments/legal/results`
- [ ] Healthcare AI Results `/assessments/healthcare-ai-readiness/results`
- [ ] CRE Results `/assessments/commercial-real-estate/results`
- [ ] Deal Intelligence Results `/assessments/deal-intelligence/results`
- [ ] Construction Results `/assessments/construction/results`
- [ ] Distribution Results `/assessments/distribution/results`

**Note:** Healthcare Benchmark (`/assessments/healthcare-benchmark`) does not have a separate results page.

**Case Studies:**
- [ ] Army of AI Agents `/case-studies/army-of-ai-agents`
- [ ] What Predicts Lead Conversion `/case-studies/what-predicts-lead-conversion`
- [ ] Agentic Document Intelligence `/case-studies/agentic-document-intelligence`

**Blog Posts:**
- [ ] AI Augmented Onshore vs Offshore `/blog/ai-augmented-onshore-vs-offshore`
- [ ] What Business Leaders Need to Know `/blog/what-business-leaders-need-to-know-about-data`
- [ ] Manufacturing Lead Scoring `/blog/manufacturing-lead-scoring`
- [ ] Partner Knowledge Retirement `/blog/partner-knowledge-retirement`
- [ ] AI Projects That Deliver ROI `/blog/ai-projects-that-deliver-roi`
- [ ] Beyond Points (Fantasy Sports) `/blog/beyond-points-the-advanced-metrics-for-winning-teams`

### Post-Deployment Functionality
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] PDF downloads work (all guides across 4 industries - see 3.3)
- [ ] All assessments complete and show results
- [ ] Chatbot responds to messages
- [ ] Admin dashboard accessible
- [ ] OG image renders correctly (`/opengraph-image`)

### MFA System (if enabled)
- [ ] Login returns `mfaRequired: true` with MFA token
- [ ] MFA verify page loads at `/admin/mfa-verify`
- [ ] TOTP verification works (authenticator app)
- [ ] Email OTP delivery works (if using email fallback)
- [ ] Backup codes work (one-time use)
- [ ] Settings page shows MFA status at `/admin/settings`

### Guide Workflow Testing (When Guide Content Modified)

**Legal Guides:**
- [ ] `associate-multiplier` - Landing (200) / Content (200) / PDF (~274KB) / Form (success)
- [ ] `partner-succession` - Landing (200) / Content (200) / PDF (~299KB) / Form (success)
- [ ] `win-more-pitches` - Landing (200) / Content (200) / PDF (~309KB) / Form (success)
- [ ] `last-vendor` - Landing (200) / Content (200) / PDF (~399KB) / Form (success)
- [ ] `own-your-ai` - Landing (200) / Content (200) / PDF (~253KB) / Form (success)
- [ ] `economics-of-legal-ai` - Landing (200) / Content (200) / PDF (~267KB) / Form (success)

**Healthcare Guides:**
- [ ] `hipaa-compliant-ai` - Landing (200) / Content (200) / PDF (~301KB) / Form (success)
- [ ] `institutional-knowledge-healthcare` - Landing (200) / Content (200) / PDF (~285KB) / Form (success)
- [ ] `document-intelligence-healthcare` - Landing (200) / Content (200) / PDF (~280KB) / Form (success)

**Manufacturing Guides:**
- [ ] `operational-visibility-playbook` - Landing (200) / Content (200) / PDF (~277KB) / Form (success)
- [ ] `lead-scoring-manufacturing` - Landing (200) / Content (200) / PDF (~294KB) / Form (success)
- [ ] `manufacturing-ai-privacy` - Landing (200) / Content (200) / PDF (~281KB) / Form (success)
- [ ] `data-cleanup-manufacturing` - Landing (200) / Content (200) / PDF (~283KB) / Form (success)

**Commercial Real Estate Guides:**
- [ ] `entity-resolution-cre` - Landing (200) / Content (200) / PDF (~251KB) / Form (success)
- [ ] `data-room-review` - Landing (200) / Content (200) / PDF (~264KB) / Form (success)
- [ ] `deal-prioritization` - Landing (200) / Content (200) / PDF (~287KB) / Form (success)
- [ ] `portfolio-visibility-cre` - Landing (200) / Content (200) / PDF (~265KB) / Form (success)
- [ ] `investor-reporting-cre` - Landing (200) / Content (200) / PDF (~280KB) / Form (success)
- [ ] `lease-intelligence-cre` - Landing (200) / Content (200) / PDF (~287KB) / Form (success)

**Style Guide Compliance (for modified guides):**
- [ ] No AI slop words (leverage, robust, comprehensive, etc.)
- [ ] No em dashes (—)
- [ ] No filler phrases
- [ ] Varied sentence structure
- [ ] Company voice only (no first-person "I" except in quotes)

### Post-Deployment SEO
- [ ] Page titles are page-specific (not generic)
- [ ] OG images load correctly
- [ ] Sitemap accessible
- [ ] robots.txt accessible
- [ ] llms.txt accessible

---

## Troubleshooting

### Build Fails: Tests Failing
- Check test output for specific failures
- Fix tests locally before re-pushing

### Build Fails: TypeScript Errors
- Run `npm run build` locally to see full error
- Common cause: importing from client component in server component

### Page Returns 500 Error
- Check Amplify logs in AWS Console
- Common cause: missing environment variable
- Verify all env vars in Amplify Console match `amplify.yml`

### Chatbot Not Responding
- Verify `ANTHROPIC_API_KEY` is set in Amplify
- Check Anthropic API status

### Forms Not Submitting
- Check browser console for errors
- Verify DynamoDB tables exist and IAM permissions are correct
- Check SES for email sending issues

### MFA Not Working

**MFA setup not saving:**
- Verify `databender-admin-mfa` DynamoDB table exists
- Check table is in `us-east-1` region
- Verify Amplify Lambda has DynamoDB permissions

**TOTP codes rejected:**
- Ensure device clock is synchronized (TOTP is time-sensitive)
- Codes are valid for 30 seconds; try the next code
- Verify `MFA_ENCRYPTION_KEY` env var matches what was used during setup

**Email OTP not received:**
- Check spam/junk folder
- Verify `ADMIN_EMAIL` environment variable is correct
- Check SES sending limits and bounce status
- Wait 60 seconds and request a new code

**Locked out of admin:**
- Use a backup code to log in
- If no backup codes: delete MFA config from DynamoDB:
  ```bash
  aws dynamodb delete-item \
    --table-name databender-admin-mfa \
    --key '{"pk":{"S":"MFA#admin"},"sk":{"S":"#CONFIG"}}' \
    --profile databender --region us-east-1
  ```

**Check MFA DynamoDB data:**
```bash
aws dynamodb scan --table-name databender-admin-mfa --profile databender --region us-east-1
```

### CloudFront Caching Issues
- Wait 2-5 minutes for cache to update
- For urgent updates, invalidate cache in AWS Console:
  ```bash
  aws cloudfront create-invalidation --distribution-id <dist-id> --paths "/*" --profile databender
  ```

---

## Related Documentation

- `CLAUDE.md` - Development standards and commands
- `docs/infrastructure/AWS-DEPLOYMENT-PLAN.md` - Initial AWS setup documentation
- `docs/infrastructure/mfa-setup.md` - MFA implementation and setup guide
- `docs/infrastructure/ses-events-setup.md` - SES webhook configuration
- `docs/testing/testing-setup-plan.md` - Test case suggestions

---

## Appendix: MFA Infrastructure Setup

**Required for MFA functionality. Only needs to be done once.**

### DynamoDB Table

```bash
aws dynamodb create-table \
  --table-name databender-admin-mfa \
  --attribute-definitions \
    AttributeName=pk,AttributeType=S \
    AttributeName=sk,AttributeType=S \
  --key-schema \
    AttributeName=pk,KeyType=HASH \
    AttributeName=sk,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --profile databender --region us-east-1
```

### Environment Variables

Add to Amplify Console (App settings → Environment variables):

| Variable | Required | Description |
|----------|----------|-------------|
| `MFA_ENABLED` | No | `"true"` to enable MFA (defaults to true in production) |
| `MFA_ENCRYPTION_KEY` | Yes* | Generate: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Yes* | Admin email for OTP delivery |

*Required when MFA is enabled

### Verify amplify.yml includes MFA vars

```yaml
# In preBuild commands:
echo "MFA_ENABLED=$MFA_ENABLED" >> .env.production
echo "MFA_ENCRYPTION_KEY=$MFA_ENCRYPTION_KEY" >> .env.production
echo "ADMIN_EMAIL=$ADMIN_EMAIL" >> .env.production
```

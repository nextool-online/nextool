# NexTool Tool Page 2.0 & Vertical Expansion Roadmap

## Goal

Transform NexTool from a generic collection of calculators into a scalable family of vertical micro-products: rankable, fast, multilingual, measurable, visually distinctive and commercially useful.

The health/fitness cluster proved the direction:

```text
tool intent → immediate calculator → interpreted result → contextual next step → tracking → vertical hub → monetization/retention path
```

This roadmap applies that pattern to the rest of NexTool without mixing the NexTool Fit funnel, health copy, or affiliate offer into unrelated clusters.

---

## Strategic principle

Do not scale isolated tools first. Scale reusable vertical systems.

Bad path:

```text
create 50 generic calculators
```

Better path:

```text
create Tool Page 2.0 system
create one strong vertical
upgrade pilot tools
then scale programmatic pages/languages
```

---

## Current audit summary

### Existing baseline outside health

Most non-health tools currently follow this pattern:

```text
H1
short description
simple calculator card
formula
article sections
FAQ
related tools
```

This is technically correct and fast, but visually and commercially weak.

### What health improved

NexTool Fit introduced:

```text
vertical identity
custom header/footer
intent-aligned visual style
answer-first calculator UX
interpreted metrics
journey-style related tools
calculator/result events
email/offer funnel
unit-economics dashboard
```

### What should transfer to other clusters

Transfer:

```text
verticalization
answer-first result cards
better mobile inputs
contextual next steps
journey-related tools
tracking by tool and cluster
richer SEO blocks
hub pages
language scalability
```

Do not transfer:

```text
health palette
health disclaimers
Mediterranean offer
email capture everywhere
medical/wellness copy
```

---

## Target architecture

### Vertical products

Proposed verticals:

```text
NexTool Money
NexTool Convert
NexTool Business
NexTool Dev
NexTool Study
```

Each vertical should eventually have:

```text
hub route
visual identity
tool-page variant
tracking namespace
journey graph
SEO templates
monetization hypothesis
language rollout plan
```

### Tool Page 2.0 structure

For important tools, the page should become:

```text
1. vertical header / trust badge
2. H1 aligned with search intent
3. calculator immediately visible
4. answer-first result block
5. short interpretation of the result
6. secondary metric cards
7. contextual next step
8. examples / scenarios
9. formula
10. common mistakes
11. FAQ
12. journey-style related tools
```

---

## Phase plan

## Phase 1 — Foundation: Tool Page 2.0 + Money pilot

### Objective

Create a reusable vertical pattern and apply it to a small set of high-value financial tools.

### Initial vertical

```text
NexTool Money
```

### Pilot tools

```text
loan-calculator
roi-calculator
percentage-calculator
```

Rationale:

```text
loan-calculator: high commercial/financial intent
roi-calculator: business/marketing decision intent
percentage-calculator: high-volume utility, useful to prove generic tool improvements
```

### Deliverables

```text
components/money/MoneyToolAnalytics.tsx
components/money/MoneyResultCard.tsx
components/money/MoneyMetricGrid.tsx
components/money/MoneyNextStep.tsx
components/money/MoneyToolCallout.tsx
components/money/MoneyHubPreview.tsx
app/[lang]/money/page.tsx
ToolPageLayout support for money variant
Tool page routing support for money tools
verification script for Money pilot
```

### Success criteria

```text
/en/money and /pt/money return 200 locally/build-time
loan/roi/percentage can use a more premium result presentation
non-health tools keep working
fitness remains untouched
lint/build pass
no production deploy without explicit approval
```

---

## Phase 2 — Upgrade Money cluster

Upgrade the highest-value financial tools:

```text
loan-calculator
mortgage-calculator
compound-interest-calculator
savings-calculator
investment-calculator
retirement-calculator
roi-calculator
inflation-calculator
break-even-calculator
```

Each upgraded tool should include:

```text
interpreted primary result
secondary metric grid
plain-language explanation
scenario examples
common mistakes
financial disclaimer where needed
tracking events
journey links to the next financial tool
```

Potential future monetization:

```text
AdSense
financial affiliate programs
loan/refinance lead generation
budgeting/investing SaaS affiliates
email capture for saved scenarios
```

---

## Phase 3 — Programmatic converters

Create a scalable converter system:

```text
kg-to-lbs
lbs-to-kg
cm-to-inches
inches-to-cm
miles-to-km
km-to-miles
celsius-to-fahrenheit
fahrenheit-to-celsius
mb-to-gb
gb-to-mb
```

Required pattern:

```text
instant answer
large result
swap units
common conversion table
formula
examples
FAQ
internal links
```

Monetization hypothesis:

```text
SEO long-tail + AdSense
```

---

## Phase 4 — Business/marketing calculators

Create decision tools for entrepreneurs and paid-media users:

```text
profit-margin-calculator
markup-calculator
roas-calculator
cpc-calculator
cpm-calculator
ctr-calculator
conversion-rate-calculator
cac-calculator
ltv-calculator
break-even-calculator
roi-calculator
```

This is strategically aligned with NexTool's unit-economics worldview.

---

## Phase 5 — Developer tools

Build fast, keyboard-first utilities:

```text
json-formatter
json-validator
base64-encoder-decoder
uuid-generator
jwt-decoder
regex-tester
timestamp-converter
url-encoder-decoder
hash-generator
color-converter
markdown-preview
```

Visual inspiration:

```text
Vercel
Linear
Raycast
```

---

## UX rules to standardize globally

### Numeric inputs

Prefer:

```text
type="text"
inputMode="decimal"
accept comma and dot decimals
onInput + onChange
empty initial values
clear placeholders with units
```

Avoid:

```text
pre-filled example values
type="number" where mobile/Safari decimal behavior matters
labels duplicated above obvious placeholders
```

### Results

Every important calculator should answer:

```text
What is the number?
What does it mean?
What should I compare it to?
What is the next useful action?
```

### SEO content

Move beyond generic articles. Add:

```text
real examples
scenarios by use case
common mistakes
comparison tables
step-by-step interpretation
localized units/currency/language nuance
FAQ schema
SoftwareApplication schema
ItemList schema for related journeys
```

---

## Tracking standard for non-health tools

Create generic or cluster-specific events:

```text
tool_view
tool_result_shown
tool_cta_click
tool_copy_result
tool_share_result
tool_email_submitted
```

Metadata:

```text
cluster
tool_id
lang
path
utm_source
utm_medium
utm_campaign
utm_term
utm_content
gclid
fbclid
result_type
```

Money-specific names can also be used if we want isolated dashboards:

```text
money_tool_view
money_result_shown
money_cta_click
```

---

## Execution policy

For this project:

```text
branch first
local verification first
preview before production
no deploy/merge to production without explicit approval
keep .hermes untracked
NexTool remains separate from Analisa Comigo
NexTool Fit funnel remains separate from Money/Converters/Dev
```

---

## Phase 1 implementation checklist

```text
1. Create branch feat/nextool-tool-page-2-money
2. Add roadmap document
3. Add verification script for Money pilot expectations
4. Add reusable Money components
5. Add Money layout variant
6. Add /en/money and /pt/money hub
7. Assign pilot tools to money variant
8. Upgrade loan-calculator result UX first
9. Optionally upgrade ROI and percentage after loan passes validation
10. Run verify script, lint, build, git diff --check
11. Deliver local/preview evidence to Carlos before any production deploy
```

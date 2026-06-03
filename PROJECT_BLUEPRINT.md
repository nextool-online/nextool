# Nextool Blueprint

## Vision

Nextool is a multilingual platform of online tools and calculators.

The goal is to create hundreds of useful tools with strong SEO and localized experiences.

Domain:

nextool.online

---

# Technology Stack

Framework:

- Next.js 16

Language:

- TypeScript

Styling:

- Tailwind CSS

Routing:

- App Router

---

# Supported Languages

- en
- it
- pt
- es
- fr
- de
- ro
- pl
- nl
- tr
- ar

---

# Translation Philosophy

Level 1

Literal translation.

Level 2

Natural translation.

Level 3

Localized SEO translation.

Content must be editable manually.

SEO text must never depend entirely on automatic translation.

---

# Folder Structure

app/

components/

data/

tools/

scripts/

---

# Tool Architecture

Each tool contains:

component.tsx

content.ts

index.ts

---

# Tool Definition

Every tool contains:

id

category

featured

popular

difficulty

availableLanguages

relatedTools

tags

slug

title

description

seo

article

faq

ui

component

---

# Categories

Current:

calculators

developer-tools

Future categories can be added without architectural changes.

---

# SEO Standards

Every tool should support:

Localized slug

Canonical URL

Hreflang

Structured Data

Breadcrumbs

Related Tools

FAQ content

Localized metadata

---

# Regional Tools

Architecture supports language-specific tools.

Example:

availableLanguages: ["it"]

Examples:

- Codice Fiscale
- Partita IVA
- INPS

---

# Content Rules

Tool logic and content must remain separated.

Tool UI:

component.tsx

Content:

content.ts

---
## Content Standard

Every tool must contain:

- 3 article sections
- 4 FAQ items
- Related tools
- Tags
- Difficulty level

Article content explains.

FAQ content answers questions.

Article and FAQ must never duplicate each other.
---
# Structured Data

Every tool page should generate:

- Breadcrumb Schema
- SoftwareApplication Schema
- FAQ Schema
- Related Tools Schema
---

# Scaling Strategy

Phase 1

Architecture

Phase 2

20-30 generic tools

Phase 3

Regional tools

Phase 4

Programmatic SEO

Phase 5

Authority clusters

---

# Deployment

Target:

Vercel

Domain:

nextool.online

---

# Long-Term Goal

Become a large multilingual platform of useful online tools with strong organic search traffic.
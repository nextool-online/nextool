# NexTool Money SEO Ranking Plan

## Goal

Make the NexTool Money hub and calculator pages rank as practical answer-first financial tools, not generic articles.

## Target cluster

- `/en/money`
- `/pt/money`
- Loan calculator
- Mortgage calculator
- Compound interest calculator
- Savings calculator
- Investment calculator
- Retirement calculator
- ROI calculator
- Inflation calculator
- Break-even calculator
- Percentage calculator

## Ranking strategy

1. **Search-intent match above the fold**
   - Keep calculator visible early.
   - Make the main result clear and interpreted.
   - Avoid article-first layout.

2. **Unique useful content per tool**
   - Add best-use cases.
   - Add practical example.
   - Add common mistakes.
   - Add next-step journey link.
   - Keep PT and EN aligned.

3. **Hub authority**
   - `/money` should explain the cluster and group tools by decision type.
   - Internal links should flow from hub to tools and between related tools.

4. **Structured data and crawlability**
   - Keep canonical/hreflang.
   - Keep FAQ schema from existing content.
   - Keep ItemList schema for related tools and hub.

5. **Programmatic expansion later**
   - After this foundation, create long-tail pages around specific comparisons and examples, e.g.:
     - `loan payment on 20000`
     - `30 year mortgage calculator`
     - `compound interest monthly contribution calculator`
     - `marketing roi calculator`
     - `break even units calculator`

## First implementation wave

Implemented in `feat/nextool-money-seo-content`:

- `MoneySeoContent` component for all 10 Money tools.
- Hub copy expanded with richer cluster explanation and use cases.
- Money verification updated to require the SEO content block.

## Next waves

### Wave 2 — Rewrite page-specific articles

Replace the generic article arrays inside each `tools/*/content.en.ts` and `content.pt.ts` with deeper, search-intent-first sections.

### Wave 3 — Query templates

Create dedicated long-tail templates where there is enough search demand and SERP weakness.

### Wave 4 — Search Console loop

After indexing, use GSC queries to identify pages with impressions but low CTR or low position. Improve titles, descriptions, examples and internal links based on real queries.

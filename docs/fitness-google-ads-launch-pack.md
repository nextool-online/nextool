# NexTool Fit Google Ads Launch Pack

## Goal

Launch small long-tail tests only after tracking, email capture, ad costs and affiliate economics are measurable.

## Initial calculators

```text
protein-calculator
macro-calculator
calorie-calculator
```

## Campaigns

Source file:

```text
data/fitness-ads/campaigns.csv
```

Campaign pattern:

```text
fit_{lang}_{calculator}_{intent}
```

Initial campaigns:

```text
fit_pt_protein_longtail
fit_pt_macros_longtail
fit_pt_calories_longtail
fit_en_protein_longtail
fit_en_macros_longtail
fit_en_calories_longtail
```

## Keyword clusters

Source file:

```text
data/fitness-ads/keyword-clusters.csv
```

Start with phrase match long-tail keywords. Avoid broad match until the funnel has real conversion data.

## Final URL generation

Run:

```bash
node scripts/generate-fitness-ad-urls.mjs
```

Output:

```text
data/fitness-ads/generated-final-urls.csv
```

Each final URL includes:

```text
utm_source=google
utm_medium=cpc
utm_campaign
utm_term
utm_content
```

## Budget discipline

Initial budget suggestion:

```text
US$5/day per campaign max
```

Do not scale until each calculator has enough data to estimate:

```text
cost_per_1000_emails
commission_per_1000_emails
profit_per_1000_emails
```

## Cut/scale rules

Cut or pause if:

```text
email capture is weak after meaningful clicks
cost_per_1000_emails is far above likely commission_per_1000_emails
search terms are too broad or low-intent
```

Keep testing if:

```text
email capture is positive
affiliate clicks appear
cost_per_1000_emails is near breakeven or improving
```

# NexTool Fit Ads & UTM Standard

## Active paid test

The current Google Ads MVP is one EN/Tier 1 mobile-first campaign for the highest-fit intent:

```text
Campaign: fit_en_calorie_deficit_mediterranean_t1
Calculator: calorie-deficit-calculator
Landing path: /en/tools/calorie-deficit-calculator
Offer: Mediterranean Diet Plan next-step funnel
Budget: $10/day for 5 days, then +$50 only after search-term/refinement review
```

## Calculator slugs

Use these exact calculator values when importing ad cost:

```text
calorie-deficit-calculator
calorie-calculator
protein-calculator
macro-calculator
bmi-calculator
bmr-calculator
water-intake-calculator
ideal-weight-calculator
body-fat-calculator
```

## Campaign naming

```text
fit_{lang}_{calculator_or_intent}_{offer_or_market}
```

Current campaign:

```text
fit_en_calorie_deficit_mediterranean_t1
```

## Required final URL parameters

Every paid URL must include:

```text
utm_source=google
utm_medium=cpc
utm_campaign=fit_en_calorie_deficit_mediterranean_t1
utm_term={keyword}
utm_content=ad01
utm_device={device}
utm_matchtype={matchtype}
```

Google should auto-tag with `gclid` where possible.

## Current final URL

```text
https://www.nextool.online/en/tools/calorie-deficit-calculator?utm_source=google&utm_medium=cpc&utm_campaign=fit_en_calorie_deficit_mediterranean_t1&utm_term={keyword}&utm_content=ad01&utm_device={device}&utm_matchtype={matchtype}
```

## Import CSV schema

The import script expects:

```text
spend_date,lang,calculator,ad_platform,utm_campaign,utm_term,clicks,cost,currency
```

Unique business key:

```text
spend_date + lang + calculator + ad_platform + utm_campaign + utm_term
```

For Google Ads exports, map Search keyword/search term data to `utm_term` consistently. Keep `{keyword}` in the live URL for event tracking; use exported keyword/search-term values for cost imports.

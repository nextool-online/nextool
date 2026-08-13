# NexTool Fit Ads & UTM Standard

## Goal

Keep every paid test attributable by calculator, language, campaign, keyword/ad group and offer so the dashboard can calculate cost per lead and cost per 1,000 emails.

## Campaign naming

Use one campaign per language + calculator + intent bucket:

```text
fit_{lang}_{calculator}_{intent}
```

Examples:

```text
fit_pt_protein_longtail
fit_pt_macros_longtail
fit_pt_calories_longtail
fit_en_protein_longtail
fit_en_macros_longtail
fit_en_calories_longtail
```

## Calculator slugs

Use these exact calculator values when importing ad cost:

```text
protein-calculator
macro-calculator
calorie-calculator
bmi-calculator
bmr-calculator
water-intake-calculator
ideal-weight-calculator
body-fat-calculator
```

## URL parameters

Every ad final URL must include:

```text
utm_source=google
utm_medium=cpc
utm_campaign=fit_{lang}_{calculator}_{intent}
utm_term={keyword_or_ad_group_slug}
utm_content={ad_variant}
```

Optional but useful:

```text
gclid={auto captured by Google when enabled}
```

## Example final URLs

PT protein:

```text
https://www.nextool.online/pt/tools/calculadora-de-proteina?utm_source=google&utm_medium=cpc&utm_campaign=fit_pt_protein_longtail&utm_term=calcular_proteina_diaria&utm_content=ad_a
```

EN macros:

```text
https://www.nextool.online/en/tools/macro-calculator?utm_source=google&utm_medium=cpc&utm_campaign=fit_en_macros_longtail&utm_term=macro_calculator_weight_loss&utm_content=ad_a
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

Do not import the same cost rows repeatedly until the unique constraint migration has been applied in Supabase.

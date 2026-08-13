# NexTool Fit Affiliate Revenue Import

## Goal

Track affiliate clicks, conversions and commission by calculator/campaign so the dashboard can compare:

```text
commission_per_1000_emails - cost_per_1000_emails
```

## Import CSV schema

```text
revenue_date,lang,calculator,affiliate_platform,offer_id,product_category,utm_campaign,utm_term,clicks,conversions,commission,currency,status
```

## Unique business key

```text
revenue_date + lang + calculator + affiliate_platform + offer_id + utm_campaign + utm_term
```

## Status

Use:

```text
estimated
confirmed
```

Start with `estimated` when the affiliate platform has delayed attribution or pending payout. Change to `confirmed` after approval/payout validation.

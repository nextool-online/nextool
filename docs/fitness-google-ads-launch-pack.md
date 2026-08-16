# NexTool Fit Google Ads Launch Pack

## Active launch decision

Start with one narrow EN/Tier 1 Search campaign around calorie deficit intent.

```text
Campaign: fit_en_calorie_deficit_mediterranean_t1
Landing page: /en/tools/calorie-deficit-calculator
Match type: phrase only
Budget: $10/day × 5 days = $50 raw data
Second tranche: +$50 only after search-term and unit-economics review
Device: mobile only for the first test
Language: English
Geo: US + Tier 1 English-speaking countries
Offer path: calculator → fitness profile/email → Mediterranean next step → affiliate
```

## Source files

```text
data/fitness-ads/campaigns.csv
data/fitness-ads/keyword-clusters.csv
data/fitness-ads/generated-final-urls.csv
data/fitness-ads/responsive-search-ads.csv
data/fitness-ads/negative-keywords-initial.txt
```

## Campaign settings

```text
Objective: website traffic or leads; avoid max-conversion automation until data exists
Network: Google Search only
Search partners: off for the first $50
Display Network: off
Bidding: manual CPC or Maximize Clicks with tight CPC cap if available
Daily budget: $10
Location option: presence only, not interest
Ad rotation: do not over-optimize too early
```

## Phrase keywords

```text
"calorie deficit calculator"
"calorie deficit calculator for weight loss"
"how many calories should i eat to lose weight"
```

## Final URL

```text
https://www.nextool.online/en/tools/calorie-deficit-calculator?utm_source=google&utm_medium=cpc&utm_campaign=fit_en_calorie_deficit_mediterranean_t1&utm_term={keyword}&utm_content=ad01&utm_device={device}&utm_matchtype={matchtype}
```

## Ad copy set A

Headlines:

```text
Calorie Deficit Calculator
Find Your Calorie Target
Weight Loss Calorie Estimate
Free Calorie Deficit Tool
Calculate Calories to Lose Weight
Your Daily Deficit Target
Simple Fitness Numbers
Plan Your Next Step
NexTool Fit
```

Descriptions:

```text
Estimate a practical daily calorie target for gradual weight loss. Free, fast and simple.
Calculate maintenance calories and a moderate deficit target, then turn your numbers into a clearer next step.
Use your body, activity and goal to estimate calories for weight loss. General wellness estimate only.
```

## Initial negative keywords

Use `data/fitness-ads/negative-keywords-initial.txt` as the initial shared negative list. Review search terms after the first $20–$30 spend, then again after $50.

## First review after $50

Keep/pause based on:

```text
CPC by keyword
calculator_view → calculator_result_shown rate
calculator_result_shown → email_submitted rate
email_sent_success count
affiliate_landing_cta_click count
email_offer_clicked count
search terms requiring negatives
CPL and cost per 1,000 emails
```

Do not scale on clicks alone. The second $50 goes only to the keyword/search-term group with the clearest lead/affiliate-click signal.

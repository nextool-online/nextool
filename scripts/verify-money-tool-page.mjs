#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const requiredFiles = [
  "docs/nextool-tool-page-2-roadmap.md",
  "components/money/MoneyHeader.tsx",
  "components/money/MoneyFooter.tsx",
  "components/money/MoneyResultCard.tsx",
  "components/money/MoneyMetricGrid.tsx",
  "components/money/MoneyContextualNextSteps.tsx",
  "components/money/MoneySeoContent.tsx",
  "components/money/MoneyToolAnalytics.tsx",
  "app/[lang]/money/page.tsx",
];

for (const filePath of requiredFiles) {
  assert.ok(fs.existsSync(new URL(`../${filePath}`, import.meta.url)), `${filePath} should exist`);
}

const roadmap = fs.readFileSync(new URL("../docs/nextool-tool-page-2-roadmap.md", import.meta.url), "utf8");
assert.match(roadmap, /NexTool Money/);
assert.match(roadmap, /Tool Page 2\.0/);

const layoutSource = fs.readFileSync(new URL("../components/layout/ToolPageLayout.tsx", import.meta.url), "utf8");
assert.match(layoutSource, /variant\?: "default" \| "fitness" \| "money"/);
assert.match(layoutSource, /MoneyHeader/);
assert.match(layoutSource, /MoneyFooter/);

const toolPageSource = fs.readFileSync(new URL("../app/[lang]/tools/[slug]/page.tsx", import.meta.url), "utf8");
assert.match(toolPageSource, /moneyLandingToolIds/);
assert.match(toolPageSource, /MoneyToolAnalytics/);
assert.match(toolPageSource, /MoneySeoContent/);
assert.match(toolPageSource, /AdvancedSeoBlocks/);
assert.match(toolPageSource, /advancedSeo/);
assert.match(toolPageSource, /loan-calculator/);
assert.match(toolPageSource, /roi-calculator/);
assert.match(toolPageSource, /percentage-calculator/);

const moneyHubSource = fs.readFileSync(new URL("../app/[lang]/money/page.tsx", import.meta.url), "utf8");
assert.match(moneyHubSource, /NexTool Money/);
assert.match(moneyHubSource, /loan-calculator/);
assert.match(moneyHubSource, /roi-calculator/);
assert.match(moneyHubSource, /compound-interest-calculator/);
assert.match(moneyHubSource, /alternates/);
assert.match(moneyHubSource, /Savings → Investing → Retirement/);
assert.match(moneyHubSource, /Loans → Mortgage → Inflation/);
assert.match(moneyHubSource, /Derived landing page opportunities/);
assert.match(moneyHubSource, /What are you trying to decide/);
assert.match(moneyHubSource, /Can I afford this loan/);
assert.match(moneyHubSource, /How much should I save each month/);
assert.match(moneyHubSource, /Is this campaign or project worth it/);

const derivedLandingDoc = fs.readFileSync(new URL("../docs/nextool-money-derived-landing-opportunities.md", import.meta.url), "utf8");
assert.match(derivedLandingDoc, /percentage calculator for discounts/);
assert.match(derivedLandingDoc, /mortgage calculator with down payment/);
assert.match(derivedLandingDoc, /retirement savings gap calculator/);

const typesSource = fs.readFileSync(new URL("../tools/types.ts", import.meta.url), "utf8");
assert.match(typesSource, /ToolAdvancedSeo/);
assert.match(typesSource, /examples\?/);
assert.match(typesSource, /useCases\?/);
assert.match(typesSource, /comparisonTable\?/);
assert.match(typesSource, /relatedQueries\?/);

const percentageContent = fs.readFileSync(new URL("../tools/percentage-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(percentageContent, /advancedSeo/);
assert.match(percentageContent, /Percentage calculator for discounts/);
assert.match(percentageContent, /Percentage calculator for grades/);

const loanContent = fs.readFileSync(new URL("../tools/loan-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(loanContent, /advancedSeo/);
assert.match(loanContent, /personal loan payment scenario/);
assert.match(loanContent, /Loan term comparison/);

const mortgageContent = fs.readFileSync(new URL("../tools/mortgage-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(mortgageContent, /advancedSeo/);
assert.match(mortgageContent, /down payment scenario/);
assert.match(mortgageContent, /Mortgage term comparison/);

const compoundContent = fs.readFileSync(new URL("../tools/compound-interest-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(compoundContent, /advancedSeo/);
assert.match(compoundContent, /compound interest saving scenario/);
assert.match(compoundContent, /Compounding frequency comparison/);

const roiContent = fs.readFileSync(new URL("../tools/roi-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(roiContent, /advancedSeo/);
assert.match(roiContent, /marketing campaign ROI scenario/);
assert.match(roiContent, /ROI interpretation table/);

const breakEvenContent = fs.readFileSync(new URL("../tools/break-even-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(breakEvenContent, /advancedSeo/);
assert.match(breakEvenContent, /new product break-even scenario/);
assert.match(breakEvenContent, /Break-even sensitivity table/);

const savingsContent = fs.readFileSync(new URL("../tools/savings-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(savingsContent, /advancedSeo/);
assert.match(savingsContent, /emergency fund saving scenario/);
assert.match(savingsContent, /Savings goal comparison/);

const investmentContent = fs.readFileSync(new URL("../tools/investment-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(investmentContent, /advancedSeo/);
assert.match(investmentContent, /investment growth scenario/);
assert.match(investmentContent, /Investment assumption comparison/);

const retirementContent = fs.readFileSync(new URL("../tools/retirement-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(retirementContent, /advancedSeo/);
assert.match(retirementContent, /retirement savings gap scenario/);
assert.match(retirementContent, /Retirement planning levers/);

const inflationContent = fs.readFileSync(new URL("../tools/inflation-calculator/content.en.ts", import.meta.url), "utf8");
assert.match(inflationContent, /advancedSeo/);
assert.match(inflationContent, /future cost of living scenario/);
assert.match(inflationContent, /Inflation impact comparison/);

for (const toolId of ["loan-calculator", "savings-calculator", "roi-calculator"]) {
  const source = fs.readFileSync(new URL(`../tools/${toolId}/component.tsx`, import.meta.url), "utf8");
  assert.match(source, /MoneyContextualNextSteps/, `${toolId} should render contextual next steps after a result`);
}

const moneyToolIds = [
  "loan-calculator",
  "mortgage-calculator",
  "compound-interest-calculator",
  "savings-calculator",
  "investment-calculator",
  "retirement-calculator",
  "roi-calculator",
  "inflation-calculator",
  "break-even-calculator",
  "percentage-calculator",
];

for (const toolId of moneyToolIds) {
  const source = fs.readFileSync(new URL(`../tools/${toolId}/component.tsx`, import.meta.url), "utf8");
  assert.match(source, /MoneyResultCard/, `${toolId} should use MoneyResultCard`);
  assert.match(source, /MoneyMetricGrid/, `${toolId} should use MoneyMetricGrid`);
  assert.match(source, /MoneyToolCallout/, `${toolId} should use MoneyToolCallout`);
  assert.match(source, /type="text"/, `${toolId} should use mobile-safe text inputs`);
  assert.match(source, /inputMode="decimal"/, `${toolId} should use decimal inputMode`);
  assert.match(source, /parseUserNumber/, `${toolId} should parse comma and dot decimals`);
  assert.doesNotMatch(source, /type="number"/, `${toolId} should not use type=number`);
  assert.doesNotMatch(source, /ToolResult/, `${toolId} should not use the old generic ToolResult output`);
}

console.log("Money Tool Page 2.0 verification passed");

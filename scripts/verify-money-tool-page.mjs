#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const requiredFiles = [
  "docs/nextool-tool-page-2-roadmap.md",
  "components/money/MoneyHeader.tsx",
  "components/money/MoneyFooter.tsx",
  "components/money/MoneyResultCard.tsx",
  "components/money/MoneyMetricGrid.tsx",
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
assert.match(toolPageSource, /loan-calculator/);
assert.match(toolPageSource, /roi-calculator/);
assert.match(toolPageSource, /percentage-calculator/);

const moneyHubSource = fs.readFileSync(new URL("../app/[lang]/money/page.tsx", import.meta.url), "utf8");
assert.match(moneyHubSource, /NexTool Money/);
assert.match(moneyHubSource, /loan-calculator/);
assert.match(moneyHubSource, /roi-calculator/);
assert.match(moneyHubSource, /compound-interest-calculator/);
assert.match(moneyHubSource, /alternates/);

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

#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const requiredFiles = [
  "docs/nextool-tool-page-2-roadmap.md",
  "components/money/MoneyHeader.tsx",
  "components/money/MoneyFooter.tsx",
  "components/money/MoneyResultCard.tsx",
  "components/money/MoneyMetricGrid.tsx",
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
assert.match(toolPageSource, /loan-calculator/);
assert.match(toolPageSource, /roi-calculator/);
assert.match(toolPageSource, /percentage-calculator/);

const moneyHubSource = fs.readFileSync(new URL("../app/[lang]/money/page.tsx", import.meta.url), "utf8");
assert.match(moneyHubSource, /NexTool Money/);
assert.match(moneyHubSource, /loan-calculator/);
assert.match(moneyHubSource, /roi-calculator/);
assert.match(moneyHubSource, /compound-interest-calculator/);
assert.match(moneyHubSource, /alternates/);

const loanSource = fs.readFileSync(new URL("../tools/loan-calculator/component.tsx", import.meta.url), "utf8");
assert.match(loanSource, /MoneyResultCard/);
assert.match(loanSource, /MoneyMetricGrid/);
assert.match(loanSource, /type="text"/);
assert.match(loanSource, /inputMode="decimal"/);
assert.match(loanSource, /parseUserNumber/);
assert.doesNotMatch(loanSource, /type="number"/);

console.log("Money Tool Page 2.0 verification passed");

import assert from "node:assert/strict";
import fs from "node:fs";
import { aggregateFitnessLeadMetrics, validateDashboardToken } from "../lib/fitness/dashboard-metrics.ts";

const leads = [
  { lang: "pt", source: "macros", created_at: "2026-08-11T10:00:00Z" },
  { lang: "pt", source: "macros", created_at: "2026-08-11T11:00:00Z" },
  { lang: "en", source: "calories", created_at: "2026-08-10T11:00:00Z" },
  { lang: "pt", source: "production_validation", created_at: "2026-08-01T11:00:00Z" },
];

const metrics = aggregateFitnessLeadMetrics(leads, new Date("2026-08-11T12:00:00Z"));
assert.equal(metrics.totalLeads, 4);
assert.equal(metrics.last24h, 2);
assert.equal(metrics.last7d, 3);
assert.equal(metrics.bySource[0].source, "macros");
assert.equal(metrics.bySource[0].count, 2);
assert.equal(metrics.byLang.find((item) => item.lang === "pt")?.count, 3);
assert.equal(metrics.byDay[0].day, "2026-08-11");
assert.equal(metrics.byDay[0].count, 2);
assert.equal(validateDashboardToken("abc", "abc"), true);
assert.equal(validateDashboardToken("", "abc"), false);
assert.equal(validateDashboardToken("abc", ""), false);

const dashboardPage = fs.readFileSync(new URL("../app/[lang]/fitness/dashboard/page.tsx", import.meta.url), "utf8");
const metricsRoute = fs.readFileSync(new URL("../app/api/fitness/metrics/route.ts", import.meta.url), "utf8");
const envExample = fs.readFileSync(new URL("../.env.example", import.meta.url), "utf8");
assert.match(dashboardPage, /FITNESS_DASHBOARD_TOKEN/);
assert.match(dashboardPage, /aggregateFitnessLeadMetrics/);
assert.doesNotMatch(dashboardPage, /email/i);
assert.match(metricsRoute, /FITNESS_DASHBOARD_TOKEN/);
assert.match(metricsRoute, /aggregateFitnessLeadMetrics/);
assert.match(envExample, /FITNESS_DASHBOARD_TOKEN/);

console.log("Fitness dashboard verification passed");

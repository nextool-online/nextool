import assert from "node:assert/strict";
import fs from "node:fs";
import {
  aggregateFitnessEventMetrics,
  aggregateFitnessLeadMetrics,
  filterRecordsByDateRange,
  sanitizeFitnessEventPayload,
  validateDashboardToken,
} from "../lib/fitness/dashboard-metrics.ts";

const leads = [
  { email: "carlos@example.com", lang: "pt", source: "macros", created_at: "2026-08-11T10:00:00Z" },
  { email: "carlos@example.com", lang: "pt", source: "macros", created_at: "2026-08-11T11:00:00Z" },
  { email: "user@example.com", lang: "en", source: "calories", created_at: "2026-08-10T11:00:00Z" },
  { email: "carlos@example.com", lang: "pt", source: "production_validation", created_at: "2026-08-01T11:00:00Z" },
];

const metrics = aggregateFitnessLeadMetrics(leads, new Date("2026-08-11T12:00:00Z"));
assert.equal(metrics.totalSubmissions, 4);
assert.equal(metrics.uniqueEmails, 2);
assert.equal(metrics.repeatSubmissions, 2);
assert.equal(metrics.last24hSubmissions, 2);
assert.equal(metrics.last7dSubmissions, 3);
assert.equal(metrics.bySource[0].source, "macros");
assert.equal(metrics.bySource[0].count, 2);
assert.equal(metrics.byLang.find((item) => item.lang === "pt")?.count, 3);
assert.equal(metrics.byDay[0].day, "2026-08-11");
assert.equal(metrics.byDay[0].count, 2);

const events = [
  { event_name: "fitness_page_view", visitor_id: "v1", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:00:00Z" },
  { event_name: "fitness_metrics_generated", visitor_id: "v1", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:01:00Z" },
  { event_name: "email_submitted", visitor_id: "v1", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:02:00Z" },
  { event_name: "fitness_page_view", visitor_id: "v2", source: "macros", lang: "pt", created_at: "2026-08-10T10:00:00Z" },
  { event_name: "calculator_view", visitor_id: "v3", source: "macro-calculator", lang: "pt", created_at: "2026-08-11T09:00:00Z" },
  { event_name: "calculator_result_shown", visitor_id: "v3", source: "macro-calculator", lang: "pt", created_at: "2026-08-11T09:01:00Z" },
  { event_name: "calculator_cta_click", visitor_id: "v3", source: "macro-calculator", lang: "pt", created_at: "2026-08-11T09:02:00Z" },
];
const eventMetrics = aggregateFitnessEventMetrics(events, new Date("2026-08-11T12:00:00Z"));
assert.equal(eventMetrics.totalEvents, 7);
assert.equal(eventMetrics.uniqueVisitors, 3);
assert.equal(eventMetrics.last24hEvents, 6);
assert.equal(eventMetrics.byEvent[0].event, "fitness_page_view");
assert.equal(eventMetrics.byEvent[0].count, 2);
assert.equal(eventMetrics.funnel.find((item) => item.event === "email_submitted")?.count, 1);
assert.equal(eventMetrics.calculatorFunnel.find((item) => item.event === "calculator_view")?.count, 1);
assert.equal(eventMetrics.byCalculator[0].calculator, "macro-calculator");
assert.equal(eventMetrics.byCalculator[0].events, 3);
assert.equal(eventMetrics.byCalculator[0].resultShown, 1);
assert.equal(eventMetrics.byCalculator[0].ctaClicks, 1);

const rangedLeads = filterRecordsByDateRange(leads, "2026-08-10", "2026-08-10");
assert.equal(rangedLeads.length, 1);
assert.equal(rangedLeads[0].source, "calories");

const cleanEvent = sanitizeFitnessEventPayload({
  event: "fitness_metrics_generated",
  visitorId: "visitor-123",
  lang: "pt",
  source: "macros",
  path: "/pt/fitness",
  metadata: { device: "mobile", email: "should-not-persist@example.com" },
});
assert.equal(cleanEvent.event_name, "fitness_metrics_generated");
assert.equal(cleanEvent.visitor_id, "visitor-123");
assert.equal(cleanEvent.metadata.device, "mobile");
assert.equal("email" in cleanEvent.metadata, false);
assert.throws(() => sanitizeFitnessEventPayload({ event: "unknown" }), /event/i);
assert.equal(sanitizeFitnessEventPayload({
  event: "calculator_cta_click",
  visitorId: "visitor-456",
  lang: "pt",
  source: "macro-calculator",
  path: "/pt/tools/calculadora-de-macros",
}).source, "macro-calculator");

assert.equal(validateDashboardToken("abc", "abc"), true);
assert.equal(validateDashboardToken("", "abc"), false);
assert.equal(validateDashboardToken("abc", ""), false);

const dashboardPage = fs.readFileSync(new URL("../app/[lang]/fitness/dashboard/page.tsx", import.meta.url), "utf8");
const metricsRoute = fs.readFileSync(new URL("../app/api/fitness/metrics/route.ts", import.meta.url), "utf8");
const eventRoute = fs.readFileSync(new URL("../app/api/fitness/event/route.ts", import.meta.url), "utf8");
const journey = fs.readFileSync(new URL("../components/fitness/FitnessJourney.tsx", import.meta.url), "utf8");
const toolAnalytics = fs.readFileSync(new URL("../components/fitness/FitnessToolAnalytics.tsx", import.meta.url), "utf8");
const toolPage = fs.readFileSync(new URL("../app/[lang]/tools/[slug]/page.tsx", import.meta.url), "utf8");
const envExample = fs.readFileSync(new URL("../.env.example", import.meta.url), "utf8");
const eventsSql = fs.readFileSync(new URL("../supabase/fitness_events.sql", import.meta.url), "utf8");
assert.match(dashboardPage, /FITNESS_DASHBOARD_TOKEN/);
assert.match(dashboardPage, /uniqueEmails/);
assert.match(dashboardPage, /eventMetrics/);
assert.match(dashboardPage, /fromDate/);
assert.match(dashboardPage, /byCalculator/);
assert.match(metricsRoute, /eventMetrics/);
assert.match(metricsRoute, /filterRecordsByDateRange/);
assert.match(eventRoute, /sanitizeFitnessEventPayload/);
assert.match(journey, /fitness_page_view/);
assert.match(journey, /api\/fitness\/event/);
assert.match(toolAnalytics, /calculator_view/);
assert.match(toolAnalytics, /calculator_result_shown/);
assert.match(toolAnalytics, /calculator_cta_click/);
assert.match(toolPage, /FitnessToolAnalytics/);
assert.match(envExample, /FITNESS_DASHBOARD_TOKEN/);
assert.match(eventsSql, /create table if not exists public\.fitness_events/);

console.log("Fitness dashboard verification passed");

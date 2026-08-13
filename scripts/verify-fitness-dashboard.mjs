import assert from "node:assert/strict";
import fs from "node:fs";
import {
  aggregateFitnessEventMetrics,
  aggregateFitnessLeadMetrics,
  filterRecordsByDateRange,
  aggregateFitnessAdCostMetrics,
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

const adCostMetrics = aggregateFitnessAdCostMetrics([
  { spend_date: "2026-08-11", lang: "pt", calculator: "protein-calculator", ad_platform: "google", utm_campaign: "fit_pt_protein_longtail", utm_term: "calcular proteina diaria", clicks: 80, cost: "40.00", currency: "USD" },
  { spend_date: "2026-08-11", lang: "pt", calculator: "macro-calculator", ad_platform: "google", utm_campaign: "fit_pt_macro_longtail", clicks: 20, cost: 30, currency: "USD" },
]);
assert.equal(adCostMetrics.totalCost, 70);
assert.equal(adCostMetrics.totalClicks, 100);
assert.equal(adCostMetrics.byCalculator[0].calculator, "protein-calculator");
assert.equal(adCostMetrics.byCampaign[0].campaign, "fit_pt_protein_longtail");

const events = [
  { event_name: "fitness_page_view", visitor_id: "v1", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:00:00Z" },
  { event_name: "fitness_metrics_generated", visitor_id: "v1", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:01:00Z" },
  { event_name: "email_submitted", visitor_id: "v1", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:02:00Z" },
  { event_name: "email_submitted", visitor_id: "v1", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:03:00Z" },
  { event_name: "email_submitted", visitor_id: "v4", source: "direct_fitness", lang: "pt", created_at: "2026-08-11T10:04:00Z" },
  { event_name: "fitness_page_view", visitor_id: "v2", source: "macros", lang: "pt", created_at: "2026-08-10T10:00:00Z" },
  { event_name: "calculator_view", visitor_id: "v3", source: "macro-calculator", lang: "pt", created_at: "2026-08-11T09:00:00Z" },
  { event_name: "calculator_result_shown", visitor_id: "v3", source: "macro-calculator", lang: "pt", created_at: "2026-08-11T09:01:00Z" },
  { event_name: "calculator_cta_click", visitor_id: "v3", source: "macro-calculator", lang: "pt", created_at: "2026-08-11T09:02:00Z" },
  { event_name: "affiliate_offer_view", visitor_id: "v3", source: "macro-calculator", lang: "pt", metadata: { offer_id: "whey-macros", product_category: "protein", placement: "post_capture" }, created_at: "2026-08-11T09:03:00Z" },
  { event_name: "affiliate_offer_click", visitor_id: "v3", source: "macro-calculator", lang: "pt", metadata: { offer_id: "whey-macros", product_category: "protein", placement: "post_capture" }, created_at: "2026-08-11T09:04:00Z" },
];
const eventMetrics = aggregateFitnessEventMetrics(events, new Date("2026-08-11T12:00:00Z"));
assert.equal(eventMetrics.totalEvents, 11);
assert.equal(eventMetrics.uniqueVisitors, 4);
assert.equal(eventMetrics.last24hEvents, 10);
assert.equal(eventMetrics.byEvent.find((item) => item.event === "fitness_page_view")?.count, 2);
assert.equal(eventMetrics.byUniqueEvent.find((item) => item.event === "email_submitted")?.count, 2);
assert.equal(eventMetrics.funnel.find((item) => item.event === "email_submitted")?.count, 2);
assert.equal(eventMetrics.calculatorFunnel.find((item) => item.event === "calculator_view")?.count, 1);
assert.equal(eventMetrics.byCalculator[0].calculator, "macro-calculator");
assert.equal(eventMetrics.byCalculator[0].events, 3);
assert.equal(eventMetrics.byCalculator[0].resultShown, 1);
assert.equal(eventMetrics.byCalculator[0].ctaClicks, 1);
assert.equal(eventMetrics.affiliateFunnel.find((item) => item.event === "affiliate_offer_view")?.count, 1);
assert.equal(eventMetrics.affiliateFunnel.find((item) => item.event === "affiliate_offer_click")?.count, 1);
assert.equal(eventMetrics.byOffer[0].offerId, "whey-macros");
assert.equal(eventMetrics.byOffer[0].views, 1);
assert.equal(eventMetrics.byOffer[0].clicks, 1);

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
assert.equal(sanitizeFitnessEventPayload({
  event: "affiliate_offer_click",
  visitorId: "visitor-789",
  lang: "pt",
  source: "protein-calculator",
  path: "/pt/tools/calculadora-de-proteina",
  metadata: { offer_id: "whey-protein", placement: "post_capture", email: "strip@example.com" },
}).metadata.offer_id, "whey-protein");

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
assert.match(dashboardPage, /VisualFunnel/);
assert.match(dashboardPage, /quickRanges/);
assert.match(dashboardPage, /email_capture_rate/);
assert.match(dashboardPage, /uniqueEmailCaptures/);
assert.match(dashboardPage, /uniqueFitnessMetrics/);
assert.match(dashboardPage, /Math\.min\(100/);
assert.match(dashboardPage, /emails_captured/);
assert.match(dashboardPage, /date-input/);
assert.match(dashboardPage, /7d/);
assert.match(dashboardPage, /30d/);
assert.match(dashboardPage, /60d/);
assert.match(dashboardPage, /90d/);
assert.match(dashboardPage, /languageSwitch/);
assert.match(dashboardPage, /justify-end/);
assert.match(dashboardPage, /type="text" inputMode="numeric"/);
assert.match(dashboardPage, /parseDashboardDate/);
assert.doesNotMatch(dashboardPage, /Idioma das métricas/);
assert.doesNotMatch(dashboardPage, /Metrics language/);
assert.doesNotMatch(dashboardPage, /Período observado/);
assert.doesNotMatch(dashboardPage, /Últimos \{days\} dias/);
assert.match(dashboardPage, /activeChipClass/);
assert.match(dashboardPage, /dashboardHref\("pt"/);
assert.match(dashboardPage, /dashboardHref\("en"/);
assert.match(dashboardPage, /activeRangeLabel/);
assert.match(dashboardPage, /Dashboard<\/span>/);
assert.match(dashboardPage, /hiddenSections/);
assert.match(dashboardPage, /text-center/);
assert.doesNotMatch(dashboardPage, /<CountList title=\{labels\.funnel\}/);
assert.doesNotMatch(dashboardPage, /<CountList title=\{labels\.eventSource\}/);
assert.doesNotMatch(dashboardPage, /<CountList title=\{labels\.timeline\}/);
assert.match(dashboardPage, /calculatorFunnelLayout/);
assert.match(dashboardPage, /bmi-calculator/);
assert.match(dashboardPage, /macro-calculator/);
assert.match(dashboardPage, /fitness_metrics_generated/);
assert.match(dashboardPage, /filter\(\(record\) => record\.lang === lang\)/);
assert.match(metricsRoute, /eventMetrics/);
assert.match(metricsRoute, /searchParams\.get\("lang"\)/);
assert.match(metricsRoute, /eq\.\$\{lang\}/);
assert.match(metricsRoute, /gte\.\$\{fromDate\}/);
assert.match(metricsRoute, /lte\.\$\{toDate\}/);
assert.match(metricsRoute, /metadata,created_at/);
assert.match(metricsRoute, /filterRecordsByDateRange/);
assert.match(dashboardPage, /affiliate_offer_click/);
assert.match(dashboardPage, /affiliateFunnel/);
assert.match(dashboardPage, /byOffer/);
assert.match(dashboardPage, /AffiliateOfferList/);
assert.match(dashboardPage, /UnitEconomicsList/);
assert.match(dashboardPage, /cost_per_1000_emails/);
assert.match(metricsRoute, /adCostMetrics/);
assert.match(eventRoute, /sanitizeFitnessEventPayload/);
assert.match(journey, /fitness_page_view/);
assert.match(journey, /api\/fitness\/event/);
assert.match(toolAnalytics, /calculator_view/);
assert.match(toolAnalytics, /calculator_result_shown/);
assert.match(toolAnalytics, /calculator_cta_click/);
assert.match(toolAnalytics, /keepalive: true/);
assert.match(journey, /email_field_focused/);
assert.match(journey, /email_submitted/);
assert.match(journey, /email_sent_success/);
assert.match(journey, /email_sent_error/);
assert.match(journey, /fitness_metrics_generated/);
assert.match(journey, /keepalive: true/);
assert.match(toolAnalytics, /utm_source/);
assert.match(toolAnalytics, /utm_campaign/);
assert.match(journey, /utm_source/);
assert.match(journey, /utm_campaign/);
assert.match(journey, /attribution/);
assert.match(toolPage, /FitnessToolAnalytics/);
assert.match(envExample, /FITNESS_DASHBOARD_TOKEN/);
assert.match(eventsSql, /create table if not exists public\.fitness_events/);

console.log("Fitness dashboard verification passed");

const adCostsSql = fs.readFileSync(new URL("../supabase/fitness_ad_costs.sql", import.meta.url), "utf8");
assert.match(adCostsSql, /create table if not exists public\.fitness_ad_costs/);
assert.match(adCostsSql, /utm_campaign/);

import { NextResponse } from "next/server";

import {
  aggregateFitnessAdCostMetrics,
  aggregateFitnessAffiliateRevenueMetrics,
  aggregateFitnessEventMetrics,
  aggregateFitnessLeadMetrics,
  filterRecordsByDateRange,
  validateDashboardToken,
  type FitnessAdCostRecord,
  type FitnessAffiliateRevenueRecord,
  type FitnessEventMetricRecord,
  type FitnessLeadMetricRecord,
} from "../../../../lib/fitness/dashboard-metrics";
import {
  aggregateFitnessEmailEventMetrics,
  type FitnessEmailEventRecord,
} from "../../../../lib/fitness/email-sequence";

export const runtime = "nodejs";

async function supabaseSelect(path: string) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase env vars missing");
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load fitness metrics");
  }

  return response.json();
}

function appendMetricFilters(params: URLSearchParams, fromDate?: string | null, toDate?: string | null, lang?: string | null) {
  if (lang === "pt" || lang === "en") params.set("lang", `eq.${lang}`);
  if (fromDate) params.set("created_at", `gte.${fromDate}T00:00:00.000Z`);
  if (toDate) params.append("created_at", `lte.${toDate}T23:59:59.999Z`);
}

function buildMetricPath(table: string, select: string, limit: number, fromDate?: string | null, toDate?: string | null, lang?: string | null) {
  const params = new URLSearchParams();
  params.set("select", select);
  params.set("order", "created_at.desc");
  params.set("limit", String(limit));
  appendMetricFilters(params, fromDate, toDate, lang);
  return `${table}?${params.toString()}`;
}

async function fetchLeadMetricRecords(fromDate?: string | null, toDate?: string | null, lang?: string | null): Promise<FitnessLeadMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_LEADS_TABLE || "fitness_leads";
  return supabaseSelect(buildMetricPath(table, "email,lang,source,created_at", 5000, fromDate, toDate, lang));
}

async function fetchEmailEventMetricRecords(fromDate?: string | null, toDate?: string | null, lang?: string | null): Promise<FitnessEmailEventRecord[]> {
  const table = process.env.SUPABASE_FITNESS_EMAIL_EVENTS_TABLE || "fitness_email_events";
  try {
    return await supabaseSelect(buildMetricPath(table, "event_name,email_hash,lang,source,sequence_id,step_id,provider,provider_message_id,offer_id,url,metadata,created_at", 10000, fromDate, toDate, lang));
  } catch {
    return [];
  }
}

async function fetchEventMetricRecords(fromDate?: string | null, toDate?: string | null, lang?: string | null): Promise<FitnessEventMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_EVENTS_TABLE || "fitness_events";
  try {
    return await supabaseSelect(buildMetricPath(table, "event_name,visitor_id,lang,source,path,metadata,created_at", 10000, fromDate, toDate, lang));
  } catch {
    return [];
  }
}

async function fetchAffiliateRevenueMetricRecords(fromDate?: string | null, toDate?: string | null, lang?: string | null): Promise<FitnessAffiliateRevenueRecord[]> {
  const table = process.env.SUPABASE_FITNESS_AFFILIATE_REVENUE_TABLE || "fitness_affiliate_revenue";
  try {
    return await supabaseSelect(buildMetricPath(table, "revenue_date,lang,calculator,affiliate_platform,offer_id,product_category,utm_campaign,utm_term,clicks,conversions,commission,currency,status,created_at", 10000, fromDate, toDate, lang));
  } catch {
    return [];
  }
}

async function fetchAdCostMetricRecords(fromDate?: string | null, toDate?: string | null, lang?: string | null): Promise<FitnessAdCostRecord[]> {
  const table = process.env.SUPABASE_FITNESS_AD_COSTS_TABLE || "fitness_ad_costs";
  try {
    return await supabaseSelect(buildMetricPath(table, "spend_date,lang,calculator,ad_platform,utm_campaign,utm_term,clicks,cost,currency,created_at", 10000, fromDate, toDate, lang));
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const fromDate = url.searchParams.get("from");
  const toDate = url.searchParams.get("to");
  const lang = url.searchParams.get("lang");

  if (!validateDashboardToken(token, process.env.FITNESS_DASHBOARD_TOKEN)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [leadRecords, eventRecords, adCostRecords, affiliateRevenueRecords, emailEventRecords] = await Promise.all([
      fetchLeadMetricRecords(fromDate, toDate, lang),
      fetchEventMetricRecords(fromDate, toDate, lang),
      fetchAdCostMetricRecords(fromDate, toDate, lang),
      fetchAffiliateRevenueMetricRecords(fromDate, toDate, lang),
      fetchEmailEventMetricRecords(fromDate, toDate, lang),
    ]);

    return NextResponse.json({
      ok: true,
      range: { from: fromDate, to: toDate, lang },
      metrics: aggregateFitnessLeadMetrics(filterRecordsByDateRange(leadRecords, fromDate, toDate)),
      eventMetrics: aggregateFitnessEventMetrics(filterRecordsByDateRange(eventRecords, fromDate, toDate)),
      adCostMetrics: aggregateFitnessAdCostMetrics(adCostRecords),
      affiliateRevenueMetrics: aggregateFitnessAffiliateRevenueMetrics(affiliateRevenueRecords),
      emailSequenceMetrics: aggregateFitnessEmailEventMetrics(emailEventRecords),
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to load metrics",
    }, { status: 500 });
  }
}

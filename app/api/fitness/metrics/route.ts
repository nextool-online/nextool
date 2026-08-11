import { NextResponse } from "next/server";

import {
  aggregateFitnessEventMetrics,
  aggregateFitnessLeadMetrics,
  validateDashboardToken,
  type FitnessEventMetricRecord,
  type FitnessLeadMetricRecord,
} from "../../../../lib/fitness/dashboard-metrics";

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

async function fetchLeadMetricRecords(): Promise<FitnessLeadMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_LEADS_TABLE || "fitness_leads";
  return supabaseSelect(`${table}?select=email,lang,source,created_at&order=created_at.desc&limit=5000`);
}

async function fetchEventMetricRecords(): Promise<FitnessEventMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_EVENTS_TABLE || "fitness_events";
  try {
    return await supabaseSelect(`${table}?select=event_name,visitor_id,lang,source,path,created_at&order=created_at.desc&limit=10000`);
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!validateDashboardToken(token, process.env.FITNESS_DASHBOARD_TOKEN)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [leadRecords, eventRecords] = await Promise.all([
      fetchLeadMetricRecords(),
      fetchEventMetricRecords(),
    ]);

    return NextResponse.json({
      ok: true,
      metrics: aggregateFitnessLeadMetrics(leadRecords),
      eventMetrics: aggregateFitnessEventMetrics(eventRecords),
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to load metrics",
    }, { status: 500 });
  }
}

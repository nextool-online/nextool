import { NextResponse } from "next/server";

import {
  aggregateFitnessLeadMetrics,
  validateDashboardToken,
  type FitnessLeadMetricRecord,
} from "../../../../lib/fitness/dashboard-metrics";

export const runtime = "nodejs";

async function fetchLeadMetricRecords(): Promise<FitnessLeadMetricRecord[]> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_FITNESS_LEADS_TABLE || "fitness_leads";

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase env vars missing");
  }

  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}?select=lang,source,created_at&order=created_at.desc&limit=5000`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load fitness metrics");
  }

  return response.json();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!validateDashboardToken(token, process.env.FITNESS_DASHBOARD_TOKEN)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const records = await fetchLeadMetricRecords();
    return NextResponse.json({
      ok: true,
      metrics: aggregateFitnessLeadMetrics(records),
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to load metrics",
    }, { status: 500 });
  }
}

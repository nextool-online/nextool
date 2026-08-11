import { NextResponse } from "next/server";

import { sanitizeFitnessEventPayload } from "../../../../lib/fitness/dashboard-metrics";

export const runtime = "nodejs";

async function saveEvent(record: ReturnType<typeof sanitizeFitnessEventPayload>) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_FITNESS_EVENTS_TABLE || "fitness_events";

  if (!supabaseUrl || !serviceRoleKey) {
    return { configured: false, ok: false };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  });

  return { configured: true, ok: response.ok };
}

export async function POST(request: Request) {
  try {
    const payload = sanitizeFitnessEventPayload(await request.json());
    const saved = await saveEvent(payload);

    return NextResponse.json({
      ok: saved.ok || !saved.configured,
      mode: saved.configured ? "live" : "preview",
    }, { status: saved.ok || !saved.configured ? 200 : 502 });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to process fitness event",
    }, { status: 400 });
  }
}

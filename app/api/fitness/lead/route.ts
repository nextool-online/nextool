import { NextResponse } from "next/server";

import {
  buildFitnessEmailHtml,
  buildFitnessLeadRecord,
  sanitizeFitnessLeadPayload,
} from "../../../../lib/fitness/email-lead";

export const runtime = "nodejs";

type DeliveryResult = {
  configured: boolean;
  ok: boolean;
  detail?: string;
};

async function saveLead(record: ReturnType<typeof buildFitnessLeadRecord>): Promise<DeliveryResult> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_FITNESS_LEADS_TABLE || "fitness_leads";

  if (!supabaseUrl || !serviceRoleKey) {
    return { configured: false, ok: false, detail: "Supabase env vars missing" };
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

  if (!response.ok) {
    return { configured: true, ok: false, detail: await response.text() };
  }

  return { configured: true, ok: true };
}

function parseSender(value: string) {
  const match = value.match(/^(.+?)\s*<([^>]+)>$/);
  if (!match) {
    return { name: "NexTool Fit", email: value.trim() };
  }

  return { name: match[1].trim(), email: match[2].trim() };
}

async function sendEmail(payload: ReturnType<typeof sanitizeFitnessLeadPayload>): Promise<DeliveryResult> {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const from = process.env.FITNESS_EMAIL_FROM || "NexTool Fit <nextool.online@gmail.com>";
  const { subject, html } = buildFitnessEmailHtml(payload);

  if (!brevoApiKey) {
    return { configured: false, ok: false, detail: "Brevo env var missing" };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": brevoApiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: parseSender(from),
      to: [{ email: payload.email }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    return { configured: true, ok: false, detail: await response.text() };
  }

  return { configured: true, ok: true };
}

export async function POST(request: Request) {
  try {
    const payload = sanitizeFitnessLeadPayload(await request.json());
    const record = buildFitnessLeadRecord(payload, {
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });

    const [database, email] = await Promise.all([saveLead(record), sendEmail(payload)]);
    const configured = database.configured && email.configured;
    const delivered = database.ok && email.ok;

    return NextResponse.json({
      ok: delivered || !configured,
      delivered,
      mode: configured ? "live" : "preview",
      database: { configured: database.configured, ok: database.ok },
      email: { configured: email.configured, ok: email.ok },
    }, { status: delivered || !configured ? 200 : 502 });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to process fitness lead",
    }, { status: 400 });
  }
}

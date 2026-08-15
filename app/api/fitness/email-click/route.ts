import { NextResponse } from "next/server";

export const runtime = "nodejs";

const mediterraneanHopLink = "https://c11c2bxvw2sjyq86y9b2eycy01.hop.clickbank.net/";

function cleanText(value: string | null, fallback = "") {
  if (!value) return fallback;
  return value.trim().replace(/[<>]/g, "").slice(0, 180);
}

function cleanLang(value: string | null) {
  return value === "pt" || value === "en" ? value : "en";
}

function buildMediterraneanTarget(tid: string) {
  const url = new URL(mediterraneanHopLink);
  url.searchParams.set("traffic_source", "email");
  url.searchParams.set("traffic_type", "sequence");
  url.searchParams.set("tid", tid || "email_sequence");
  return url.toString();
}

async function saveEmailClickEvent(record: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_FITNESS_EMAIL_EVENTS_TABLE || "fitness_email_events";

  if (!supabaseUrl || !serviceRoleKey) return;

  await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  }).catch(() => undefined);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const offer = cleanText(url.searchParams.get("offer"), "mediterranean-meal-plan");
  const lang = cleanLang(url.searchParams.get("lang"));
  const source = cleanText(url.searchParams.get("source"), "calories");
  const sequenceId = cleanText(url.searchParams.get("sequence"), lang === "en" ? "fitness_en_default_v1" : "fitness_pt_default_v1");
  const stepId = cleanText(url.searchParams.get("step"), "email_sequence");
  const tid = cleanText(url.searchParams.get("tid"), stepId || "email_sequence");

  const target = offer === "mediterranean-meal-plan"
    ? buildMediterraneanTarget(tid)
    : buildMediterraneanTarget(tid);

  await saveEmailClickEvent({
    event_name: "email_offer_clicked",
    email_hash: null,
    lang,
    source,
    sequence_id: sequenceId,
    step_id: stepId,
    provider: "brevo",
    provider_message_id: null,
    offer_id: offer,
    url: target,
    metadata: {
      traffic_source: "email",
      traffic_type: "sequence",
      tid,
      redirect: "hoplink",
    },
  });

  return NextResponse.redirect(target, 302);
}

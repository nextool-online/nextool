#!/usr/bin/env node
import fs from "node:fs";

const allowedLangs = new Set(["pt", "en"]);
const allowedCalculators = new Set([
  "protein-calculator",
  "macro-calculator",
  "calorie-calculator",
  "bmi-calculator",
  "bmr-calculator",
  "water-intake-calculator",
  "ideal-weight-calculator",
  "body-fat-calculator",
]);

function parseArgs(argv) {
  const args = { file: "data/fitness-ad-costs/template.csv", apply: false };
  for (let index = 2; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === "--apply") args.apply = true;
    else if (item === "--file") args.file = argv[++index];
  }
  return args;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted && char === '"' && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    if (row.some((value) => value.trim() !== "")) rows.push(row);
  }

  return rows;
}

function normalizeDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`Invalid spend_date: ${value}`);
  return value;
}

function normalizeRow(raw, rowNumber) {
  const lang = String(raw.lang || "").trim().toLowerCase();
  const calculator = String(raw.calculator || "").trim();
  const adPlatform = String(raw.ad_platform || "google").trim().toLowerCase();
  const utmCampaign = String(raw.utm_campaign || "").trim();
  const utmTerm = String(raw.utm_term || "").trim();
  const clicks = Number(String(raw.clicks || "0").replace(",", "."));
  const cost = Number(String(raw.cost || "0").replace(",", "."));
  const currency = String(raw.currency || "USD").trim().toUpperCase();

  if (!allowedLangs.has(lang)) throw new Error(`Row ${rowNumber}: invalid lang`);
  if (!allowedCalculators.has(calculator)) throw new Error(`Row ${rowNumber}: invalid calculator`);
  if (!utmCampaign.startsWith(`fit_${lang}_`)) throw new Error(`Row ${rowNumber}: utm_campaign must start with fit_${lang}_`);
  if (!Number.isFinite(clicks) || clicks < 0) throw new Error(`Row ${rowNumber}: invalid clicks`);
  if (!Number.isFinite(cost) || cost < 0) throw new Error(`Row ${rowNumber}: invalid cost`);

  return {
    spend_date: normalizeDate(String(raw.spend_date || "").trim()),
    lang,
    calculator,
    ad_platform: adPlatform,
    utm_campaign: utmCampaign,
    utm_term: utmTerm,
    clicks: Math.round(clicks),
    cost,
    currency,
  };
}

export function loadAdCostRows(filePath) {
  const rows = parseCsv(fs.readFileSync(filePath, "utf8"));
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows.map((row, index) => normalizeRow(Object.fromEntries(headers.map((header, headerIndex) => [header, row[headerIndex] || ""])), index + 2));
}

async function applyRows(rows) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_FITNESS_AD_COSTS_TABLE || "fitness_ad_costs";
  if (!supabaseUrl || !serviceRoleKey) throw new Error("Missing Supabase env vars");

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}?on_conflict=spend_date,lang,calculator,ad_platform,utm_campaign,utm_term`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    throw new Error(`Supabase import failed: ${response.status}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = parseArgs(process.argv);
  const rows = loadAdCostRows(args.file);
  const totals = rows.reduce((acc, row) => ({ clicks: acc.clicks + row.clicks, cost: acc.cost + row.cost }), { clicks: 0, cost: 0 });

  if (args.apply) {
    await applyRows(rows);
    console.log(JSON.stringify({ ok: true, mode: "apply", rows: rows.length, ...totals }));
  } else {
    console.log(JSON.stringify({ ok: true, mode: "dry-run", rows: rows.length, ...totals }));
  }
}

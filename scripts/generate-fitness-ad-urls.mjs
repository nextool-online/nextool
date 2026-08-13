#!/usr/bin/env node
import fs from "node:fs";

const domain = "https://www.nextool.online";

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
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function buildFinalUrl(campaign, keyword) {
  const url = new URL(campaign.final_path, domain);
  url.searchParams.set("utm_source", "google");
  url.searchParams.set("utm_medium", "cpc");
  url.searchParams.set("utm_campaign", campaign.campaign);
  url.searchParams.set("utm_term", keyword.utm_term);
  url.searchParams.set("utm_content", campaign.default_utm_content || "ad_a");
  return url.toString();
}

export function generateFitnessAdUrls({ campaignPath = "data/fitness-ads/campaigns.csv", keywordPath = "data/fitness-ads/keyword-clusters.csv" } = {}) {
  const campaigns = parseCsv(fs.readFileSync(campaignPath, "utf8"));
  const keywords = parseCsv(fs.readFileSync(keywordPath, "utf8"));
  const campaignMap = new Map(campaigns.map((campaign) => [campaign.campaign, campaign]));

  return keywords.map((keyword) => {
    const campaign = campaignMap.get(keyword.campaign);
    if (!campaign) throw new Error(`Missing campaign for ${keyword.campaign}`);
    if (campaign.lang !== keyword.lang) throw new Error(`Language mismatch for ${keyword.campaign}`);
    if (campaign.calculator !== keyword.calculator) throw new Error(`Calculator mismatch for ${keyword.campaign}`);
    if (!keyword.campaign.startsWith(`fit_${keyword.lang}_`)) throw new Error(`Invalid campaign naming: ${keyword.campaign}`);
    return {
      lang: keyword.lang,
      calculator: keyword.calculator,
      campaign: keyword.campaign,
      ad_group: keyword.ad_group,
      keyword: keyword.keyword,
      match_type: keyword.match_type,
      utm_term: keyword.utm_term,
      final_url: buildFinalUrl(campaign, keyword),
    };
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outputPath = "data/fitness-ads/generated-final-urls.csv";
  const rows = generateFitnessAdUrls();
  const headers = ["lang", "calculator", "campaign", "ad_group", "keyword", "match_type", "utm_term", "final_url"];
  fs.writeFileSync(outputPath, `${headers.join(",")}\n${rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")).join("\n")}\n`);
  console.log(JSON.stringify({ ok: true, rows: rows.length, outputPath }));
}

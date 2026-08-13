import assert from "node:assert/strict";
import fs from "node:fs";
import { loadAdCostRows } from "./import-fitness-ad-costs.mjs";

const rows = loadAdCostRows("data/fitness-ad-costs/template.csv");
assert.equal(rows.length, 2);
assert.equal(rows[0].lang, "pt");
assert.equal(rows[0].calculator, "protein-calculator");
assert.equal(rows[0].utm_campaign, "fit_pt_protein_longtail");
assert.equal(rows[0].clicks, 100);
assert.equal(rows[0].cost, 50);

const importer = fs.readFileSync(new URL("./import-fitness-ad-costs.mjs", import.meta.url), "utf8");
const standard = fs.readFileSync(new URL("../docs/fitness-ads-utm-standard.md", import.meta.url), "utf8");
const sql = fs.readFileSync(new URL("../supabase/fitness_ad_costs.sql", import.meta.url), "utf8");
assert.match(importer, /on_conflict=spend_date,lang,calculator,ad_platform,utm_campaign,utm_term/);
assert.match(importer, /resolution=merge-duplicates/);
assert.match(standard, /fit_\{lang\}_\{calculator\}_\{intent\}/);
assert.match(sql, /fitness_ad_costs_unique_import_key/);

console.log("Fitness ad costs import verification passed");

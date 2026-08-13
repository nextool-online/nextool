import assert from "node:assert/strict";
import fs from "node:fs";
import { loadAffiliateRevenueRows } from "./import-fitness-affiliate-revenue.mjs";

const rows = loadAffiliateRevenueRows("data/fitness-affiliate-revenue/template.csv");
assert.equal(rows.length, 2);
assert.equal(rows[0].calculator, "protein-calculator");
assert.equal(rows[0].affiliate_platform, "amazon");
assert.equal(rows[0].offer_id, "protein-contextual-offer");
assert.equal(rows[0].commission, 8.5);
assert.equal(rows[1].commission, 24);

const importer = fs.readFileSync(new URL("./import-fitness-affiliate-revenue.mjs", import.meta.url), "utf8");
const standard = fs.readFileSync(new URL("../docs/fitness-affiliate-revenue-import.md", import.meta.url), "utf8");
const sql = fs.readFileSync(new URL("../supabase/fitness_affiliate_revenue.sql", import.meta.url), "utf8");
assert.match(importer, /on_conflict=revenue_date,lang,calculator,affiliate_platform,offer_id,utm_campaign,utm_term/);
assert.match(importer, /resolution=merge-duplicates/);
assert.match(standard, /commission_per_1000_emails/);
assert.match(sql, /fitness_affiliate_revenue_unique_import_key/);

console.log("Fitness affiliate revenue import verification passed");

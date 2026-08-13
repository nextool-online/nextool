import assert from "node:assert/strict";
import fs from "node:fs";
import { generateFitnessAdUrls } from "./generate-fitness-ad-urls.mjs";

const rows = generateFitnessAdUrls();
assert.equal(rows.length, 18);
assert.equal(rows[0].campaign, "fit_pt_protein_longtail");
assert.equal(rows[0].utm_term, "calcular_proteina_diaria");
assert.match(rows[0].final_url, /^https:\/\/www\.nextool\.online\/pt\/tools\/calculadora-de-proteina\?/);
assert.match(rows[0].final_url, /utm_source=google/);
assert.match(rows[0].final_url, /utm_medium=cpc/);
assert.match(rows[0].final_url, /utm_campaign=fit_pt_protein_longtail/);
assert.match(rows[0].final_url, /utm_term=calcular_proteina_diaria/);
assert.equal(new Set(rows.map((row) => row.campaign)).size, 6);
assert.equal(new Set(rows.map((row) => row.calculator)).size, 3);

const doc = fs.readFileSync(new URL("../docs/fitness-google-ads-launch-pack.md", import.meta.url), "utf8");
assert.match(doc, /US\$5\/day per campaign/);
assert.match(doc, /cost_per_1000_emails/);
assert.match(doc, /commission_per_1000_emails/);

console.log("Fitness ads launch pack verification passed");

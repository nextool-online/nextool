import assert from "node:assert/strict";
import fs from "node:fs";
import {
  buildFitnessEmailHtml,
  buildFitnessLeadRecord,
  sanitizeFitnessLeadPayload,
  validateEmail,
} from "../lib/fitness/email-lead.ts";

const payload = {
  email: "carlos@example.com",
  lang: "pt",
  source: "macros",
  consent: true,
  honeypot: "",
  profile: {
    weight: "70",
    heightCm: "175",
    age: "35",
    sex: "male",
    activity: "moderate",
    goal: "maintain",
    calories: "2517",
  },
  metrics: {
    bmi: "22,9",
    idealWeight: "57–76 kg",
    water: "3,0 L",
    calories: "2.517 kcal",
    protein: "84–126 g",
    maintenance: "2.517 kcal",
    bmr: "1.624 kcal",
  },
};

assert.equal(validateEmail("carlos@example.com"), true);
assert.equal(validateEmail("bad-email"), false);
assert.equal(validateEmail(""), false);

const sanitized = sanitizeFitnessLeadPayload(payload);
assert.equal(sanitized.email, "carlos@example.com");
assert.equal(sanitized.lang, "pt");
assert.equal(sanitized.source, "macros");
assert.equal(sanitized.consent, true);
assert.equal(sanitized.profile.goal, "maintain");
assert.equal(sanitized.metrics.bmi, "22,9");

assert.throws(() => sanitizeFitnessLeadPayload({ ...payload, email: "bad" }), /valid email/i);
assert.throws(() => sanitizeFitnessLeadPayload({ ...payload, consent: false }), /consent/i);
assert.throws(() => sanitizeFitnessLeadPayload({ ...payload, honeypot: "bot" }), /spam/i);

const record = buildFitnessLeadRecord(sanitized, {
  userAgent: "test-agent",
  referer: "https://www.nextool.online/pt/fitness",
});
assert.equal(record.email, "carlos@example.com");
assert.equal(record.lang, "pt");
assert.equal(record.source, "macros");
assert.equal(record.snapshot.bmi, "22,9");
assert.equal(record.consent_at.length > 10, true);
assert.equal(record.user_agent, "test-agent");

const ptHtml = buildFitnessEmailHtml(sanitized);
assert.match(ptHtml.subject, /métricas fitness/i);
assert.match(ptHtml.html, /IMC/);
assert.match(ptHtml.html, /2\.517 kcal/);
assert.doesNotMatch(ptHtml.html, /snapshot/i);
assert.match(ptHtml.html, /não substituem orientação/i);

const enHtml = buildFitnessEmailHtml({ ...sanitized, lang: "en", email: "user@example.com" });
assert.match(enHtml.subject, /fitness metrics/i);
assert.match(enHtml.html, /Your fitness metrics/);
assert.match(enHtml.html, /do not replace/i);

const routeSource = fs.readFileSync(new URL("../app/api/fitness/lead/route.ts", import.meta.url), "utf8");
const envExample = fs.readFileSync(new URL("../.env.example", import.meta.url), "utf8");
const schemaSql = fs.readFileSync(new URL("../supabase/fitness_leads.sql", import.meta.url), "utf8");
assert.match(routeSource, /SUPABASE_URL/);
assert.match(routeSource, /SUPABASE_SERVICE_ROLE_KEY/);
assert.match(routeSource, /BREVO_API_KEY/);
assert.match(routeSource, /https:\/\/api\.brevo\.com\/v3\/smtp\/email/);
assert.doesNotMatch(routeSource, /RESEND_API_KEY/);
assert.match(routeSource, /mode: configured \? "live" : "preview"/);
assert.match(envExample, /SUPABASE_SERVICE_ROLE_KEY/);
assert.match(envExample, /BREVO_API_KEY/);
assert.match(schemaSql, /create table if not exists public\.fitness_leads/);
assert.match(schemaSql, /enable row level security/);

console.log("Fitness email verification passed");

import assert from "node:assert/strict";
import fs from "node:fs";
import {
  buildFitnessEmailHash,
  buildFitnessEmailSequence,
  buildFitnessEmailSequenceEvents,
  aggregateFitnessEmailEventMetrics,
} from "../lib/fitness/email-sequence.ts";

const sequence = buildFitnessEmailSequence({ lang: "pt", source: "protein", profile: { sex: "male", goal: "gain" }, metrics: { protein: "112–154 g", calories: "2.767 kcal" } });
assert.equal(sequence.sequenceId, "protein_pt_default_v1");
assert.equal(sequence.steps.length, 5);
assert.equal(sequence.steps[0].stepId, "protein_pt_01_metrics_delivery");
assert.doesNotMatch(sequence.steps[0].html, /protein-contextual-offer/);
assert.match(sequence.steps[1].subject, /proteína/i);
assert.match(sequence.steps[1].html, /protein-contextual-offer/);
assert.match(sequence.steps[2].subject, /proteína/i);
assert.match(sequence.steps[2].html, /protein-contextual-offer/);
assert.doesNotMatch(sequence.steps[2].html, /cura|milagre|diagnost/i);

assert.equal(buildFitnessEmailHash("Carlos@Example.com"), buildFitnessEmailHash(" carlos@example.com "));
assert.doesNotMatch(buildFitnessEmailHash("carlos@example.com"), /carlos|example/i);

const events = buildFitnessEmailSequenceEvents({ email: "carlos@example.com", lang: "pt", source: "protein", sequenceId: sequence.sequenceId, provider: "brevo", providerMessageId: "msg-1", status: "sent" });
assert.equal(events.length, 2);
assert.equal(events[0].event_name, "email_sequence_started");
assert.equal(events[1].event_name, "email_step_sent");
assert.equal(events[1].step_id, "protein_pt_01_metrics_delivery");
assert.equal(events[1].email, undefined);
assert.equal(events[1].email_hash.length, 64);

const metrics = aggregateFitnessEmailEventMetrics([
  ...events,
  { event_name: "email_clicked", email_hash: events[0].email_hash, lang: "pt", source: "protein", sequence_id: sequence.sequenceId, step_id: "protein_pt_03_offer_bridge", offer_id: "protein-contextual-offer", created_at: "2026-08-13T10:00:00Z" },
  { event_name: "email_offer_clicked", email_hash: events[0].email_hash, lang: "pt", source: "protein", sequence_id: sequence.sequenceId, step_id: "protein_pt_03_offer_bridge", offer_id: "protein-contextual-offer", created_at: "2026-08-13T10:01:00Z" },
]);
assert.equal(metrics.totalEvents, 4);
assert.equal(metrics.uniqueEmailHashes, 1);
assert.equal(metrics.byEvent.find((item) => item.event === "email_step_sent")?.count, 1);
assert.equal(metrics.bySequence[0].sequenceId, "protein_pt_default_v1");
assert.equal(metrics.byOffer[0].offerId, "protein-contextual-offer");

const routeSource = fs.readFileSync(new URL("../app/api/fitness/lead/route.ts", import.meta.url), "utf8");
const metricsRoute = fs.readFileSync(new URL("../app/api/fitness/metrics/route.ts", import.meta.url), "utf8");
const dashboardPage = fs.readFileSync(new URL("../app/[lang]/fitness/dashboard/page.tsx", import.meta.url), "utf8");
const schemaSql = fs.readFileSync(new URL("../supabase/fitness_email_events.sql", import.meta.url), "utf8");
assert.match(routeSource, /buildFitnessEmailSequenceEvents/);
assert.match(routeSource, /saveEmailEvents/);
assert.match(metricsRoute, /emailSequenceMetrics/);
assert.match(dashboardPage, /EmailSequenceList/);
assert.match(dashboardPage, /email_offer_clicked/);
assert.match(schemaSql, /create table if not exists public\.fitness_email_events/);
assert.match(schemaSql, /email_hash/);
assert.doesNotMatch(schemaSql, /email text/);

console.log("Fitness email sequence verification passed");

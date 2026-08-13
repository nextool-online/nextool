import { createHash } from "node:crypto";

import type { FitnessLeadLang, FitnessLeadPayload } from "./email-lead";

type CountItem = { count: number };

export type FitnessEmailSequenceStep = {
  stepId: string;
  delayDays: number;
  subject: string;
  preview: string;
  html: string;
  offerId?: string;
};

export type FitnessEmailSequence = {
  sequenceId: string;
  lang: FitnessLeadLang;
  source: string;
  steps: FitnessEmailSequenceStep[];
};

export type FitnessEmailEventRecord = {
  event_name?: string | null;
  email_hash?: string | null;
  lang?: string | null;
  source?: string | null;
  sequence_id?: string | null;
  step_id?: string | null;
  provider?: string | null;
  provider_message_id?: string | null;
  offer_id?: string | null;
  url?: string | null;
  metadata?: Record<string, string | number | boolean> | null;
  created_at?: string | null;
};

export type FitnessEmailEventMetrics = {
  totalEvents: number;
  uniqueEmailHashes: number;
  byEvent: Array<{ event: string; count: number }>;
  bySequence: Array<{ sequenceId: string; count: number }>;
  byStep: Array<{ stepId: string; count: number }>;
  byOffer: Array<{ offerId: string; count: number }>;
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function cleanText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim().replace(/[<>]/g, "").slice(0, 180);
}

function increment<T extends string>(map: Map<T, number>, key: T) {
  map.set(key, (map.get(key) || 0) + 1);
}

function sortCounts<T extends CountItem>(items: T[]) {
  return items.sort((a, b) => b.count - a.count);
}

export function buildFitnessEmailHash(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function offerBlock(lang: FitnessLeadLang, offerId: string) {
  const href = `https://www.nextool.online/${lang}/fitness/offers/protein?utm_source=email&utm_medium=sequence&utm_campaign=protein_${lang}_default_v1&utm_content=${offerId}`;
  return `<div style="margin-top:24px;padding:20px;border-radius:22px;background:#ecfdf5;border:1px solid #a7f3d0"><p style="margin:0 0 10px;font-size:12px;font-weight:800;color:#047857;text-transform:uppercase">${offerId}</p><p style="margin:0 0 14px;color:#0f172a;font-weight:800">${lang === "pt" ? "Próximo passo prático" : "Practical next step"}</p><a href="${href}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-weight:800">${lang === "pt" ? "Ver opções de proteína" : "See protein options"}</a></div>`;
}

function shell(title: string, body: string) {
  return `<div style="font-family:Arial,sans-serif;background:#09090b;color:#f4f4f5;padding:28px"><div style="max-width:640px;margin:0 auto;background:#ffffff;color:#18181b;border-radius:28px;padding:28px"><h1 style="margin:0 0 16px;font-size:28px;line-height:1.15">${escapeHtml(title)}</h1>${body}<p style="margin-top:24px;font-size:12px;line-height:1.6;color:#71717a">${title.includes("proteína") ? "Estimativas gerais. Não substituem orientação médica ou nutricional." : "General estimates. They do not replace medical or nutrition advice."}</p></div></div>`;
}

export function buildFitnessEmailSequence(payload: Pick<FitnessLeadPayload, "lang" | "source" | "profile" | "metrics">): FitnessEmailSequence {
  const lang = payload.lang;
  const source = cleanText(payload.source || "direct_fitness", "direct_fitness");
  const protein = escapeHtml(payload.metrics.protein || (lang === "pt" ? "sua faixa de proteína" : "your protein range"));
  const calories = escapeHtml(payload.metrics.calories || (lang === "pt" ? "suas calorias" : "your calories"));
  const sequenceId = source === "protein" || source === "protein-calculator" ? `protein_${lang}_default_v1` : `fitness_${lang}_default_v1`;

  const steps: FitnessEmailSequenceStep[] = lang === "pt" ? [
    {
      stepId: "protein_pt_01_metrics_delivery",
      delayDays: 0,
      subject: "Suas métricas fitness chegaram",
      preview: "Aqui está sua meta de proteína e como interpretar sem complicar.",
      html: shell("Suas métricas fitness", `<p style="line-height:1.7">Sua meta estimada de proteína ficou em <strong>${protein}</strong>. Use esse número como referência prática, não como regra médica.</p><p style="line-height:1.7">Sua meta de calorias estimada é <strong>${calories}</strong>.</p>`),
    },
    {
      stepId: "protein_pt_02_simple_plan",
      delayDays: 1,
      subject: "Sua meta de proteína parece alta? Comece por aqui",
      preview: "Comida primeiro, complemento só quando reduzir atrito.",
      html: shell("Proteína sem complicar", `<p style="line-height:1.7">A melhor estratégia é dividir a meta em 3 ou 4 momentos do dia. Primeiro comida. Depois, se faltar praticidade, um complemento pode ajudar.</p>`),
    },
    {
      stepId: "protein_pt_03_offer_bridge",
      delayDays: 3,
      subject: "O erro que impede muita gente de bater proteína",
      preview: "O problema quase nunca é saber o número. É conseguir repetir.",
      offerId: "protein-contextual-offer",
      html: shell("O erro não é a conta — é a rotina", `<p style="line-height:1.7">Saber que precisa de <strong>${protein}</strong> é só o início. O desafio é ter fontes práticas o suficiente para repetir isso sem depender de força de vontade.</p>${offerBlock("pt", "protein-contextual-offer")}`),
    },
    {
      stepId: "protein_pt_04_calories_macros",
      delayDays: 5,
      subject: "Proteína, calorias e macros precisam conversar",
      preview: "Proteína isolada ajuda pouco se as calorias estiverem fora do objetivo.",
      html: shell("Conecte proteína, calorias e macros", `<p style="line-height:1.7">Proteína ajuda, mas seu resultado depende do conjunto: calorias, treino, sono e consistência.</p>`),
    },
    {
      stepId: "protein_pt_05_recheck",
      delayDays: 7,
      subject: "Refaça sua conta de proteína esta semana",
      preview: "Uma nova medição ajuda a ajustar a rotina.",
      offerId: "protein-contextual-offer",
      html: shell("Refaça sua conta", `<p style="line-height:1.7">Se seu peso, objetivo ou rotina mudaram, vale recalcular sua meta e ajustar suas fontes de proteína.</p>${offerBlock("pt", "protein-contextual-offer")}`),
    },
  ] : [
    {
      stepId: "protein_en_01_metrics_delivery",
      delayDays: 0,
      subject: "Your fitness metrics are ready",
      preview: "Here is your protein target and how to interpret it simply.",
      html: shell("Your fitness metrics", `<p style="line-height:1.7">Your estimated protein target is <strong>${protein}</strong>. Use it as a practical reference, not a medical rule.</p><p style="line-height:1.7">Your estimated calorie target is <strong>${calories}</strong>.</p>`),
    },
    {
      stepId: "protein_en_02_simple_plan",
      delayDays: 1,
      subject: "Does your protein target feel high? Start here",
      preview: "Food first, supplements only when they reduce friction.",
      html: shell("Protein without overthinking", `<p style="line-height:1.7">Split the target across 3 or 4 moments in the day. Food first. Supplements only when they make the routine easier.</p>`),
    },
    {
      stepId: "protein_en_03_offer_bridge",
      delayDays: 3,
      subject: "The mistake that keeps people from hitting protein",
      preview: "The problem is rarely knowing the number. It is repeating it.",
      offerId: "protein-contextual-offer",
      html: shell("The issue is routine", `<p style="line-height:1.7">Knowing you need <strong>${protein}</strong> is only the start. The challenge is having practical protein sources you can repeat.</p>${offerBlock("en", "protein-contextual-offer")}`),
    },
    {
      stepId: "protein_en_04_calories_macros",
      delayDays: 5,
      subject: "Protein, calories and macros need to work together",
      preview: "Protein alone helps less if calories are off target.",
      html: shell("Connect protein, calories and macros", `<p style="line-height:1.7">Protein helps, but progress depends on the system: calories, training, sleep and consistency.</p>`),
    },
    {
      stepId: "protein_en_05_recheck",
      delayDays: 7,
      subject: "Recheck your protein target this week",
      preview: "A fresh calculation helps adjust your routine.",
      offerId: "protein-contextual-offer",
      html: shell("Recheck your number", `<p style="line-height:1.7">If your weight, goal or routine changed, recalculate and adjust your protein sources.</p>${offerBlock("en", "protein-contextual-offer")}`),
    },
  ];

  return { sequenceId, lang, source, steps };
}

export function buildFitnessEmailSequenceEvents(input: { email: string; lang: FitnessLeadLang; source: string; sequenceId: string; provider?: string; providerMessageId?: string | null; status: "sent" | "failed" }) {
  const email_hash = buildFitnessEmailHash(input.email);
  const now = new Date().toISOString();
  return [
    {
      event_name: "email_sequence_started",
      email_hash,
      lang: input.lang,
      source: input.source,
      sequence_id: input.sequenceId,
      step_id: null,
      provider: input.provider || "brevo",
      provider_message_id: input.providerMessageId || null,
      offer_id: null,
      url: null,
      metadata: {},
      created_at: now,
    },
    {
      event_name: input.status === "sent" ? "email_step_sent" : "email_step_failed",
      email_hash,
      lang: input.lang,
      source: input.source,
      sequence_id: input.sequenceId,
      step_id: input.lang === "pt" ? "protein_pt_01_metrics_delivery" : "protein_en_01_metrics_delivery",
      provider: input.provider || "brevo",
      provider_message_id: input.providerMessageId || null,
      offer_id: null,
      url: null,
      metadata: {},
      created_at: now,
    },
  ];
}

export function aggregateFitnessEmailEventMetrics(events: FitnessEmailEventRecord[]): FitnessEmailEventMetrics {
  const emailHashes = new Set<string>();
  const eventMap = new Map<string, number>();
  const sequenceMap = new Map<string, number>();
  const stepMap = new Map<string, number>();
  const offerMap = new Map<string, number>();

  for (const event of events) {
    const eventName = cleanText(event.event_name || "unknown", "unknown");
    const emailHash = cleanText(event.email_hash || "", "");
    const sequenceId = cleanText(event.sequence_id || "unknown_sequence", "unknown_sequence");
    const stepId = cleanText(event.step_id || "unknown_step", "unknown_step");
    const offerId = cleanText(event.offer_id || "", "");
    if (emailHash) emailHashes.add(emailHash);
    increment(eventMap, eventName);
    increment(sequenceMap, sequenceId);
    if (event.step_id) increment(stepMap, stepId);
    if (offerId) increment(offerMap, offerId);
  }

  return {
    totalEvents: events.length,
    uniqueEmailHashes: emailHashes.size,
    byEvent: sortCounts(Array.from(eventMap, ([event, count]) => ({ event, count }))),
    bySequence: sortCounts(Array.from(sequenceMap, ([sequenceId, count]) => ({ sequenceId, count }))),
    byStep: sortCounts(Array.from(stepMap, ([stepId, count]) => ({ stepId, count }))),
    byOffer: sortCounts(Array.from(offerMap, ([offerId, count]) => ({ offerId, count }))),
  };
}

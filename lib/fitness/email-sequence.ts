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

function emailUrl(lang: FitnessLeadLang, path: string, campaign: string, content: string) {
  return `https://www.nextool.online/${lang}${path}?utm_source=email&utm_medium=sequence&utm_campaign=${campaign}&utm_content=${content}`;
}

function button(href: string, label: string) {
  return `<p style="margin:22px 0 0"><a href="${href}" style="display:inline-block;background:#0ea5e9;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-weight:800">${label}</a></p>`;
}

function valueBlock(title: string, body: string) {
  return `<div style="margin:20px 0;padding:18px;border-radius:22px;background:linear-gradient(135deg,#e0f2fe,#ecfdf5);border:1px solid #bae6fd"><p style="margin:0 0 8px;font-size:13px;font-weight:900;color:#0369a1;text-transform:uppercase">${title}</p><p style="margin:0;line-height:1.7;color:#0f172a;font-weight:700">${body}</p></div>`;
}

function offerBlock(lang: FitnessLeadLang, offerId: string, label?: string) {
  const href = emailUrl(lang, "/fitness/offers/protein", `protein_${lang}_default_v1`, offerId);
  return `<div style="margin-top:24px;padding:20px;border-radius:22px;background:#ecfdf5;border:1px solid #a7f3d0"><p style="margin:0 0 10px;font-size:12px;font-weight:800;color:#047857;text-transform:uppercase">${offerId}</p><p style="margin:0 0 14px;color:#0f172a;font-weight:800">${lang === "pt" ? "Próximo passo" : "Next step"}</p><p style="margin:0 0 14px;line-height:1.6;color:#334155">${lang === "pt" ? "Compare opções práticas com calma. Comida primeiro; complemento apenas quando reduzir atrito." : "Compare practical options calmly. Food first; supplements only when they reduce friction."}</p>${button(href, label || (lang === "pt" ? "Ver opções práticas" : "See practical options"))}</div>`;
}


function mediterraneanOfferBlock(content: string) {
  const href = emailUrl("en", "/fitness/next-steps/mediterranean-meal-plan", "mediterranean_en_default_v1", content);
  return `<div style="margin-top:24px;padding:20px;border-radius:22px;background:#ecfdf5;border:1px solid #a7f3d0"><p style="margin:0 0 10px;font-size:12px;font-weight:800;color:#047857;text-transform:uppercase">Optional accelerator</p><p style="margin:0 0 12px;color:#0f172a;font-weight:900;font-size:18px">Based on your numbers and your goals</p><p style="margin:0 0 14px;line-height:1.6;color:#334155">With the right support, your calorie target can become a meal routine faster than trying to figure it out alone. See a Mediterranean-style path designed to make the next step easier.</p>${button(href, "See the Mediterranean-style path")}</div>`;
}

function shell(lang: FitnessLeadLang, title: string, body: string) {
  const disclaimer = lang === "pt"
    ? "Estimativas gerais. Não substituem orientação médica ou nutricional."
    : "General estimates. They do not replace medical or nutrition advice.";
  return `<div style="font-family:Arial,sans-serif;background:#f0f9ff;color:#0f172a;padding:24px"><div style="max-width:640px;margin:0 auto;background:#ffffff;color:#18181b;border-radius:28px;padding:28px;border:1px solid #dbeafe"><h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;color:#0f172a">${escapeHtml(title)}</h1>${body}<p style="margin-top:24px;font-size:12px;line-height:1.6;color:#71717a">${disclaimer}</p></div></div>`;
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
      subject: "Suas métricas de proteína",
      preview: "Sua meta estimada e como usar esse número sem complicar.",
      html: shell("pt", "Suas métricas de proteína", `<p style="line-height:1.7">Sua meta estimada de proteína ficou em <strong>${protein}</strong>. Sua meta de calorias estimada é <strong>${calories}</strong>.</p><p style="line-height:1.7">Use esses números como referência prática para organizar a semana, não como cobrança perfeita para todos os dias.</p>${valueBlock("Como usar hoje", "Escolha uma refeição do dia para melhorar primeiro. É mais fácil ajustar um ponto da rotina do que tentar mudar tudo ao mesmo tempo.")}`),
    },
    {
      stepId: "protein_pt_02_simple_offer",
      delayDays: 1,
      subject: "Sua meta de proteína parece alta?",
      preview: "Um plano simples para transformar número em rotina.",
      offerId: "protein-contextual-offer",
      html: shell("pt", "Bater proteína sem complicar", `<p style="line-height:1.7">O problema quase nunca é saber o número. O problema é repetir em dias normais, quando você está com pressa, sem planejamento ou sem opções fáceis por perto.</p><p style="line-height:1.7">Plano simples de proteína: divida sua meta em 3 ou 4 momentos. Em cada um, tente ter uma fonte clara: ovos, iogurte, frango, peixe, leguminosas, whey ou proteína vegetal quando fizer sentido.</p>${valueBlock("Plano simples de proteína", "Meta alta fica mais leve quando vira blocos menores. 120g por dia pode virar 30g em quatro momentos, por exemplo.")}${offerBlock("pt", "protein-contextual-offer")}`),
    },
    {
      stepId: "protein_pt_03_offer_bridge",
      delayDays: 3,
      subject: "O erro que impede muita gente de bater proteína",
      preview: "Não é falta de vontade. É falta de ambiente fácil.",
      offerId: "protein-contextual-offer",
      html: shell("pt", "O erro não é a conta — é o ambiente", `<p style="line-height:1.7">Quando a rotina não tem opções prontas, a meta vira esforço mental. A pessoa sabe o que deveria fazer, mas decide em cima da hora — e quase sempre escolhe o mais fácil.</p><p style="line-height:1.7">A solução é montar um ambiente favorável: compras certas, porções simples e uma opção de emergência para os dias corridos. Isso reduz atrito sem depender de motivação.</p>${valueBlock("Sugestão prática", "Tenha duas fontes principais de comida e uma opção de conveniência. Assim você não precisa improvisar todos os dias.")}${offerBlock("pt", "protein-contextual-offer", "Abrir guia de opções práticas")}`),
    },
    {
      stepId: "protein_pt_04_calories_macros",
      delayDays: 5,
      subject: "Proteína, calorias e macros precisam conversar",
      preview: "Proteína ajuda, mas o contexto decide o resultado.",
      html: shell("pt", "Conecte proteína, calorias e macros", `<p style="line-height:1.7">Proteína ajuda na saciedade e na manutenção muscular, mas seu resultado depende do conjunto: calorias, treino, sono e consistência.</p><p style="line-height:1.7">Se a proteína está boa mas as calorias estão muito acima ou muito abaixo do objetivo, o progresso pode parecer confuso. Por isso vale olhar os macros como um mapa simples do dia.</p>${valueBlock("Próximo passo", "Use proteína como âncora, calorias como direção e macros como distribuição. Não precisa ser perfeito: precisa ser repetível.")}${button(emailUrl("pt", "/tools/calculadora-de-macros", "protein_pt_default_v1", "email_04_macros"), "Abrir calculadora de macros")}${button(emailUrl("pt", "/tools/calculadora-calorias", "protein_pt_default_v1", "email_04_calories"), "Abrir calculadora de calorias")}`),
    },
    {
      stepId: "protein_pt_05_recheck",
      delayDays: 7,
      subject: "Refaça sua conta de proteína esta semana",
      preview: "Uma nova medição ajuda a ajustar a rotina.",
      offerId: "protein-contextual-offer",
      html: shell("pt", "Refaça sua conta com uma semana de contexto", `<p style="line-height:1.7">Depois de alguns dias, você já entende melhor onde a meta pesa: café da manhã, almoço, jantar ou lanches. Esse aprendizado vale mais que tentar acertar tudo no primeiro dia.</p><p style="line-height:1.7">Refaça sua conta, compare com sua rotina real e ajuste uma coisa por vez. Se a dificuldade for praticidade, revise opções simples para reduzir atrito.</p>${valueBlock("Refazer e ajustar", "O objetivo é construir um sistema que você consegue repetir. Métrica boa é aquela que vira decisão simples.")}${button(emailUrl("pt", "/tools/calculadora-de-proteina", "protein_pt_default_v1", "email_05_recheck"), "Refazer calculadora de proteína")}${offerBlock("pt", "protein-contextual-offer")}`),
    },
  ] : [
    {
      stepId: "protein_en_01_metrics_delivery",
      delayDays: 0,
      subject: "Your protein metrics",
      preview: "Your estimated target and how to use it simply.",
      html: shell("en", "Your protein metrics", `<p style="line-height:1.7">Your estimated protein target is <strong>${protein}</strong>. Your estimated calorie target is <strong>${calories}</strong>.</p><p style="line-height:1.7">Use these numbers as a practical reference for the week, not as a perfect rule for every day.</p>${valueBlock("How to use this today", "Pick one meal to improve first. It is easier to adjust one point in the routine than to change everything at once.")}`),
    },
    {
      stepId: "protein_en_02_simple_offer",
      delayDays: 1,
      subject: "Want to reach your goal sooner?",
      preview: "Your numbers are useful. The right structure can take you further.",
      offerId: "mediterranean-meal-plan",
      html: shell("en", "Numbers help. The right plan accelerates action.", `<p style="line-height:1.7">The problem is rarely knowing the number. The problem is repeating it on normal days when you are busy, unplanned or missing easy options.</p><p style="line-height:1.7">Simple protein plan: split your target across 3 or 4 moments. In each one, aim for a clear source: eggs, yogurt, chicken, fish, legumes, whey or plant protein when it makes sense.</p>${valueBlock("Simple protein plan", "A high target feels lighter when it becomes smaller blocks. 120g/day can become 30g across four moments, for example.")}${mediterraneanOfferBlock("email_02_mediterranean")}`),
    },
    {
      stepId: "protein_en_03_offer_bridge",
      delayDays: 3,
      subject: "Numbers alone do not create momentum",
      preview: "With the right support, the next step gets easier.",
      offerId: "mediterranean-meal-plan",
      html: shell("en", "The calculation is done — now make it easier to act", `<p style="line-height:1.7">When the routine has no ready options, the target becomes mental effort. You know what you should do, but decide at the last minute — and the easiest option wins.</p><p style="line-height:1.7">The solution is building a helpful environment: better groceries, simple portions and an emergency option for busy days. That reduces friction without relying on motivation.</p>${valueBlock("Practical suggestion", "Keep two main food sources and one convenience option. Then you do not need to improvise every day.")}${mediterraneanOfferBlock("email_03_mediterranean")}`),
    },
    {
      stepId: "protein_en_04_calories_macros",
      delayDays: 5,
      subject: "Protein, calories and macros need to work together",
      preview: "Protein helps, but context decides the result.",
      html: shell("en", "Connect protein, calories and macros", `<p style="line-height:1.7">Protein helps with satiety and muscle maintenance, but progress depends on the system: calories, training, sleep and consistency.</p><p style="line-height:1.7">If protein is fine but calories are far above or below your goal, progress can feel confusing. That is why macros are useful as a simple map for the day.</p>${valueBlock("Next step", "Use protein as the anchor, calories as the direction and macros as the distribution. It does not need to be perfect: it needs to be repeatable.")}${button(emailUrl("en", "/tools/macro-calculator", "protein_en_default_v1", "email_04_macros"), "Open macro calculator")}${button(emailUrl("en", "/tools/calorie-calculator", "protein_en_default_v1", "email_04_calories"), "Open calorie calculator")}`),
    },
    {
      stepId: "protein_en_05_recheck",
      delayDays: 7,
      subject: "Recheck your protein target this week",
      preview: "A fresh calculation helps adjust your routine.",
      offerId: "mediterranean-meal-plan",
      html: shell("en", "Recheck your number with a week of context", `<p style="line-height:1.7">After a few days, you understand where the target is hardest: breakfast, lunch, dinner or snacks. That learning matters more than getting everything right on day one.</p><p style="line-height:1.7">Recalculate, compare with your real routine and adjust one thing at a time. If convenience is the issue, review practical options that reduce friction.</p>${valueBlock("Recheck and adjust", "The goal is building a system you can repeat. A useful metric turns into a simple decision.")}${button(emailUrl("en", "/tools/protein-calculator", "protein_en_default_v1", "email_05_recheck"), "Recheck protein calculator")}${mediterraneanOfferBlock("email_05_mediterranean")}`),
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

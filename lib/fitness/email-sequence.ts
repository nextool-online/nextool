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
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;border-spacing:0;margin:18px 0 0;"><tr><td align="center" bgcolor="#34d399" style="background:#34d399;border-radius:999px;"><a href="${href}" style="display:block;padding:14px 18px;color:#0f172a !important;text-decoration:none;font-family:Arial,sans-serif;font-weight:900;font-size:15px;line-height:1.35;text-transform:uppercase;letter-spacing:.03em;">${label}</a></td></tr></table>`;
}

function valueBlock(title: string, body: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:18px 0;border-collapse:separate;border-spacing:0;background:#f0f9ff;border:1px solid #7dd3fc;border-left:6px solid #0ea5e9;border-radius:18px;"><tr><td style="padding:16px 14px;"><div style="margin:0 0 8px;color:#0369a1 !important;font-family:Arial,sans-serif;font-size:12px;line-height:1.2;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">${title}</div><div style="margin:0;color:#0f172a !important;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;font-weight:800;">${body}</div></td></tr></table>`;
}

function offerBlock(lang: FitnessLeadLang, offerId: string, label?: string) {
  const href = emailUrl(lang, "/fitness/offers/protein", `protein_${lang}_default_v1`, offerId);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:22px 0 0;border-collapse:separate;border-spacing:0;background:#ecfdf5;border:1px solid #86efac;border-radius:22px;"><tr><td style="padding:18px 16px;"><div style="margin:0 0 8px;color:#047857 !important;font-family:Arial,sans-serif;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;">${offerId}</div><div style="margin:0 0 12px;color:#0f172a !important;font-family:Arial,sans-serif;font-size:18px;line-height:1.25;font-weight:900;">${lang === "pt" ? "Próximo passo" : "Next step"}</div><div style="margin:0;color:#334155 !important;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;font-weight:700;">${lang === "pt" ? "Compare opções práticas com calma. Comida primeiro; complemento apenas quando reduzir atrito." : "Compare practical options calmly. Food first; supplements only when they reduce friction."}</div>${button(href, label || (lang === "pt" ? "Ver opções práticas" : "See practical options"))}</td></tr></table>`;
}

function mediterraneanOfferBlock(content: string) {
  const href = `https://www.nextool.online/api/fitness/email-click?offer=mediterranean-meal-plan&lang=en&source=calories&sequence=fitness_en_default_v1&step=${content}&tid=${content}`;
  const bullets = "✓ Personalized meals around your routine<br>✓ Simple alternatives when life gets busy<br>✓ Weekly structure so you stop guessing";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:24px 0 0;border-collapse:separate;border-spacing:0;background:#ecfdf5;border:1px solid #86efac;border-radius:24px;"><tr><td bgcolor="#10b981" style="background:#10b981;padding:18px;border-radius:24px 24px 0 0;"><div style="color:#ffffff !important;font-family:Arial,sans-serif;font-size:12px;line-height:1.2;font-weight:900;letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px;">Optional accelerator</div><div style="color:#ffffff !important;font-family:Arial,sans-serif;font-size:26px;line-height:1.1;font-weight:900;margin:0;">Get your plan moving faster</div></td></tr><tr><td style="padding:18px 16px 20px;"><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:17px;line-height:1.55;font-weight:900;margin:0 0 14px;">Based on your numbers and your goals, a Mediterranean-style plan can help turn today’s metrics into simple meals and clearer next steps.</div>${button(href, "Get your Mediterranean Diet Plan")}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #dbeafe;border-radius:18px;margin:16px 0 0;"><tr><td style="padding:14px;"><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:16px;line-height:1.35;font-weight:900;margin:0 0 10px;">What this can help with</div><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:15px;line-height:1.55;font-weight:800;margin:0;">${bullets}</div></td></tr></table></td></tr></table>`;
}

function shell(lang: FitnessLeadLang, title: string, body: string) {
  const disclaimer = lang === "pt"
    ? "Estimativas gerais. Não substituem orientação médica ou nutricional."
    : "General estimates. They do not replace medical or nutrition advice.";
  return `<!doctype html><html><body bgcolor="#f0f9ff" style="margin:0;padding:0;background:#f0f9ff;font-family:Arial,sans-serif;color:#0f172a;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f0f9ff" style="width:100%;background:#f0f9ff;border-collapse:collapse;"><tr><td align="center" style="padding:24px 12px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;width:100%;background:#ffffff;border:1px solid #bae6fd;border-radius:28px;border-collapse:separate;border-spacing:0;"><tr><td style="padding:26px 20px;"><div style="color:#047857 !important;font-family:Arial,sans-serif;font-weight:900;letter-spacing:.14em;text-transform:uppercase;font-size:13px;line-height:1.2;margin:0 0 14px;">NexTool Fit</div><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:30px;line-height:1.1;font-weight:900;margin:0 0 16px;">${escapeHtml(title)}</div><div style="color:#334155 !important;font-family:Arial,sans-serif;font-size:16px;line-height:1.7;font-weight:700;">${body}</div><div style="color:#64748b !important;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;margin:24px 0 0;">${disclaimer}</div></td></tr></table></td></tr></table></body></html>`;
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
      html: shell("en", "Numbers help. The right plan accelerates action.", `<p style="margin:0 0 14px;line-height:1.7">Your calorie target is not the hard part anymore. The next challenge is turning it into meals you can repeat when the week gets busy.</p><p style="margin:0 0 14px;line-height:1.7">A Mediterranean-style plan can give you a clearer structure: what to eat, what to swap, and how to stop guessing at every meal.</p>${valueBlock("Use this today", "Choose one meal that usually breaks your routine. If you can make that meal easier, the whole day becomes easier to control.")}${mediterraneanOfferBlock("email02metrics")}`),
    },
    {
      stepId: "protein_en_03_offer_bridge",
      delayDays: 3,
      subject: "Numbers alone do not create momentum",
      preview: "With the right support, the next step gets easier.",
      offerId: "mediterranean-meal-plan",
      html: shell("en", "The calculation is done — now make it easier to act", `<p style="margin:0 0 14px;line-height:1.7">Most people do not fail because they lack a number. They fail because every meal still requires a new decision.</p><p style="margin:0 0 14px;line-height:1.7">The faster path is reducing decisions: simple meal patterns, practical swaps, and a plan that fits your lifestyle instead of asking for perfection.</p>${valueBlock("Practical suggestion", "Set up a repeatable breakfast or lunch first. One reliable meal gives you momentum before you try to fix the full day.")}${mediterraneanOfferBlock("email03momentum")}`),
    },
    {
      stepId: "protein_en_04_calories_macros",
      delayDays: 5,
      subject: "Calories, protein and macros need one routine",
      preview: "Numbers work better when they become a meal structure.",
      html: shell("en", "Connect calories, protein and macros", `<p style="margin:0 0 14px;line-height:1.7">Calories point the direction. Protein supports satiety and muscle. Macros help distribute the day. But none of them work well if every meal is improvised.</p><p style="margin:0 0 14px;line-height:1.7">Use the calculators to understand the numbers, then use a meal structure to make those numbers easier to follow.</p>${valueBlock("Next step", "Use protein as the anchor, calories as the direction and macros as the distribution. It does not need to be perfect: it needs to be repeatable.")}${button(emailUrl("en", "/tools/macro-calculator", "protein_en_default_v1", "email_04_macros"), "Open macro calculator")}${button(emailUrl("en", "/tools/calorie-calculator", "protein_en_default_v1", "email_04_calories"), "Open calorie calculator")}${mediterraneanOfferBlock("email04routine")}`),
    },
    {
      stepId: "protein_en_05_recheck",
      delayDays: 7,
      subject: "Make next week easier than this one",
      preview: "A simple plan beats another week of guessing.",
      offerId: "mediterranean-meal-plan",
      html: shell("en", "Make next week easier than this one", `<p style="margin:0 0 14px;line-height:1.7">By now you know your numbers. The fastest improvement is not recalculating forever — it is making the next week easier to execute.</p><p style="margin:0 0 14px;line-height:1.7">If meals still feel random, give yourself a clearer structure: repeatable choices, simple swaps, and fewer decisions when you are busy.</p>${valueBlock("Recheck and adjust", "A useful metric turns into a simple decision. Keep the numbers, but let the plan reduce daily friction.")}${button(emailUrl("en", "/tools/protein-calculator", "protein_en_default_v1", "email_05_recheck"), "Recheck protein calculator")}${mediterraneanOfferBlock("email05nextweek")}`),
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

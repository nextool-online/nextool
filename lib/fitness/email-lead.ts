export type FitnessLeadLang = "en" | "pt";

type UnknownRecord = Record<string, unknown>;

export type FitnessLeadPayload = {
  email: string;
  lang: FitnessLeadLang;
  source: string;
  consent: boolean;
  honeypot?: string;
  profile: Record<string, string>;
  metrics: Record<string, string>;
};

export type FitnessLeadRecord = {
  email: string;
  lang: FitnessLeadLang;
  source: string;
  profile: Record<string, string>;
  snapshot: Record<string, string>;
  consent_at: string;
  user_agent: string | null;
  referer: string | null;
};

const allowedLangs = new Set<FitnessLeadLang>(["en", "pt"]);
const allowedSources = new Set([
  "bmi",
  "bmr",
  "calories",
  "water",
  "protein",
  "ideal-weight",
  "macros",
  "direct_fitness",
  "fitness",
]);

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && email.length <= 254;
}

function cleanText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim().replace(/[<>]/g, "").slice(0, 180);
}

function cleanStringRecord(value: unknown) {
  const source = value && typeof value === "object" ? value as UnknownRecord : {};
  return Object.fromEntries(
    Object.entries(source)
      .filter(([, item]) => typeof item === "string" && item.trim().length > 0)
      .map(([key, item]) => [key.slice(0, 48), cleanText(item)])
  );
}

export function sanitizeFitnessLeadPayload(payload: unknown): FitnessLeadPayload {
  const sourcePayload = payload && typeof payload === "object" ? payload as UnknownRecord : {};
  const email = cleanText(sourcePayload.email).toLowerCase();
  const lang = allowedLangs.has(sourcePayload.lang as FitnessLeadLang) ? sourcePayload.lang as FitnessLeadLang : "en";
  const sourceValue = cleanText(sourcePayload.source || "direct_fitness");
  const source = allowedSources.has(sourceValue) ? sourceValue : "direct_fitness";
  const consent = sourcePayload.consent === true;
  const honeypot = cleanText(sourcePayload.honeypot);
  const profile = cleanStringRecord(sourcePayload.profile);
  const metrics = cleanStringRecord(sourcePayload.metrics);

  if (honeypot) {
    throw new Error("Spam protection failed");
  }

  if (!validateEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  if (!consent) {
    throw new Error("Email consent is required");
  }

  if (Object.keys(metrics).length < 3) {
    throw new Error("Fitness metrics are required");
  }

  return {
    email,
    lang,
    source,
    consent,
    honeypot,
    profile,
    metrics,
  };
}

export function buildFitnessLeadRecord(
  payload: FitnessLeadPayload,
  context: { userAgent?: string | null; referer?: string | null } = {}
): FitnessLeadRecord {
  return {
    email: payload.email,
    lang: payload.lang,
    source: payload.source,
    profile: payload.profile,
    snapshot: payload.metrics,
    consent_at: new Date().toISOString(),
    user_agent: context.userAgent?.slice(0, 300) || null,
    referer: context.referer?.slice(0, 500) || null,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const metricDetails: Record<FitnessLeadLang, Record<string, { label: string; explanation: string }>> = {
  pt: {
    bmi: {
      label: "IMC",
      explanation: "Seu índice de massa corporal. Ajuda a entender se seu peso está dentro de uma faixa estimada para sua altura.",
    },
    idealWeight: {
      label: "Peso ideal",
      explanation: "Faixa de peso estimada como referência saudável para sua altura, não uma meta obrigatória.",
    },
    water: {
      label: "Água diária",
      explanation: "Estimativa de água para um dia comum, considerando seu peso e nível de atividade.",
    },
    calories: {
      label: "Calorias para seu objetivo",
      explanation: "Sua meta estimada de calorias por dia para o objetivo escolhido: perder gordura, manter peso ou ganhar massa.",
    },
    protein: {
      label: "Proteína diária",
      explanation: "Faixa estimada de proteína por dia para apoiar saciedade, manutenção muscular e evolução fitness.",
    },
    maintenance: {
      label: "Calorias de manutenção",
      explanation: "Estimativa de quanto você consumiria por dia para manter o peso atual, sem foco em perder ou ganhar.",
    },
    bmr: {
      label: "Metabolismo basal",
      explanation: "Seu corpo gastaria em repouso aproximadamente esse valor por dia, antes de contar atividades e exercícios.",
    },
    macros: {
      label: "Macros",
      explanation: "Divisão estimada entre proteína, carboidratos e gorduras para organizar melhor sua alimentação.",
    },
  },
  en: {
    bmi: {
      label: "BMI",
      explanation: "Your body mass index. It helps estimate whether your weight is within a general range for your height.",
    },
    idealWeight: {
      label: "Ideal weight",
      explanation: "An estimated reference range for your height, not a mandatory target.",
    },
    water: {
      label: "Daily water",
      explanation: "Estimated water intake for a regular day, based on your weight and activity level.",
    },
    calories: {
      label: "Calories for your goal",
      explanation: "Your estimated daily calorie target for the goal you chose: lose fat, maintain weight, or gain muscle.",
    },
    protein: {
      label: "Daily protein",
      explanation: "Estimated protein range per day to support satiety, muscle maintenance, and fitness progress.",
    },
    maintenance: {
      label: "Maintenance calories",
      explanation: "Estimated daily intake to maintain your current weight, before adding a lose or gain goal.",
    },
    bmr: {
      label: "Basal metabolism",
      explanation: "Your body would burn approximately this amount at rest before activity and exercise.",
    },
    macros: {
      label: "Macros",
      explanation: "Estimated split between protein, carbs, and fats to organize your daily nutrition.",
    },
  },
};

export function buildFitnessEmailHtml(payload: FitnessLeadPayload) {
  const isPt = payload.lang === "pt";
  const subject = isPt ? "Suas métricas fitness estão prontas" : "Your fitness metrics are ready";
  const title = isPt ? "Suas métricas fitness" : "Your fitness metrics";
  const intro = isPt
    ? "Você acabou de gerar um painel fitness no navegador. Abaixo estão os mesmos números, agora com uma explicação simples do que cada um significa."
    : "You just generated a fitness panel in your browser. Below are the same numbers with a simple explanation of what each one means.";
  const visualNote = isPt
    ? "No seu navegador você viu isso como cards visuais. Aqui está a versão por email para você guardar e comparar depois."
    : "In your browser you saw these as visual cards. Here is the email version to save and compare later.";
  const disclaimer = isPt
    ? "Esses números são estimativas gerais para adultos. Eles ajudam a orientar sua rotina, mas não substituem orientação médica ou nutricional."
    : "These numbers are general estimates for adults. They can guide your routine, but they do not replace medical or nutrition advice.";
  const cta = isPt ? "Atualizar minhas métricas" : "Update my metrics";
  const url = `https://www.nextool.online/${payload.lang}/fitness?utm_source=email&utm_medium=metrics_email&utm_campaign=fitness_metrics_delivery&utm_content=update_metrics`;
  const details = metricDetails[payload.lang];
  const rows = Object.entries(payload.metrics)
    .map(([key, value]) => {
      const detail = details[key] || { label: key, explanation: "" };
      return `<div style="border:1px solid #bae6fd;border-radius:24px;background:#fff;padding:18px;margin:0 0 12px;box-shadow:0 10px 30px rgba(14,165,233,.08);"><table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td style="vertical-align:top;padding:0 12px 0 0;"><p style="margin:0 0 6px;color:#0f172a;font-size:17px;font-weight:900;">${escapeHtml(detail.label)}</p><p style="margin:0;color:#475569;font-size:14px;line-height:1.55;font-weight:600;">${escapeHtml(detail.explanation)}</p></td><td style="vertical-align:top;text-align:right;white-space:nowrap;padding:0;color:#0f172a;font-size:22px;font-weight:900;">${escapeHtml(value)}</td></tr></table></div>`;
    })
    .join("");

  const offerUrl = "https://c11c2bxvw2sjyq86y9b2eycy01.hop.clickbank.net/?traffic_source=email&traffic_type=sequence&tid=email01metrics";
  const offerBlock = isPt
    ? ""
    : `<div style="margin:22px 0 0;border:1px solid #bbf7d0;border-radius:28px;background:#ecfdf5;padding:20px 16px;box-shadow:0 14px 36px rgba(16,185,129,.10);"><p style="margin:0 0 8px;color:#047857;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;">Optional accelerator</p><h2 style="margin:0 0 12px;color:#0f172a;font-size:26px;line-height:1.15;font-weight:900;">Based on your numbers and your goals</h2><p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.65;font-weight:700;">With the right support, your calorie target can become a meal routine faster than trying to figure it out alone.</p><div style="margin:0 0 16px;padding:12px;border-radius:22px;background:#f8fafc;border:1px solid #dbeafe;box-shadow:0 8px 24px rgba(15,23,42,.08);"><p style="margin:0 0 10px;color:#0f172a;font-size:15px;font-weight:900;">What this can help with</p>${["Personalized meals around your routine", "Simple alternatives when life gets busy", "Weekly structure so you stop guessing", "A clearer path from calculator result to action"].map((item) => `<div style="margin:0 0 8px;padding:12px;border-radius:18px;background:#ffffff;border:1px solid #e0f2fe;box-shadow:0 6px 18px rgba(14,165,233,.10);"><table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td style="width:32px;vertical-align:top;"><span style="display:inline-block;width:24px;height:24px;border-radius:999px;background:#10b981;color:#ffffff;text-align:center;line-height:24px;font-weight:900;">✓</span></td><td style="vertical-align:top;color:#0f172a;font-size:15px;line-height:1.45;font-weight:900;">${item}</td></tr></table></div>`).join("")}</div><p style="margin:0;text-align:center;"><a href="${offerUrl}" style="display:block;background:#34d399;color:#0f172a;text-decoration:none;border-radius:999px;padding:15px 20px;font-weight:900;font-size:15px;text-transform:uppercase;letter-spacing:.03em;box-shadow:0 8px 20px rgba(16,185,129,.18);">Get your Mediterranean Diet Plan</a></p></div>`;

  const html = `<!doctype html><html><body style="margin:0;background:#f0f9ff;font-family:Arial,sans-serif;color:#0f172a;"><div style="max-width:680px;margin:0 auto;padding:24px 12px;"><div style="background:#fff;border-radius:30px;padding:28px 22px;border:1px solid #bae6fd;box-shadow:0 24px 70px rgba(14,165,233,.14);"><p style="margin:0 0 14px;color:#047857;font-weight:900;letter-spacing:.14em;text-transform:uppercase;font-size:13px;">NexTool Fit</p><h1 style="margin:0;font-size:36px;line-height:1.06;color:#0f172a;">${escapeHtml(title)}</h1><p style="margin:18px 0 12px;color:#334155;line-height:1.7;font-size:17px;font-weight:700;">${escapeHtml(intro)}</p><p style="margin:0 0 24px;color:#64748b;line-height:1.65;font-size:14px;font-weight:600;">${escapeHtml(visualNote)}</p><div style="background:#f8fafc;border:1px solid #dbeafe;border-radius:26px;padding:12px;">${rows}</div><p style="margin:24px 0 0;text-align:center;"><a href="${url}" style="display:inline-block;background:#34d399;color:#0f172a;text-decoration:none;border-radius:999px;padding:15px 24px;font-weight:900;font-size:16px;">${escapeHtml(cta)}</a></p>${offerBlock}<p style="margin:24px 0 0;color:#64748b;font-size:12px;line-height:1.6;">${escapeHtml(disclaimer)}</p></div></div></body></html>`;

  return { subject, html };
}

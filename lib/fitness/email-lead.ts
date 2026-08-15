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
    ? "Guarde este email para comparar depois. Use os números como referência prática, não como regra perfeita."
    : "Save this email and compare later. Use the numbers as a practical reference, not as a perfect rule.";
  const disclaimer = isPt
    ? "Esses números são estimativas gerais para adultos. Eles ajudam a orientar sua rotina, mas não substituem orientação médica ou nutricional."
    : "These numbers are general estimates for adults. They can guide your routine, but they do not replace medical or nutrition advice.";
  const details = metricDetails[payload.lang];
  const metricAccents = [
    { background: "#f0f9ff", border: "#7dd3fc", badge: "#0ea5e9" },
    { background: "#ecfdf5", border: "#86efac", badge: "#10b981" },
    { background: "#fffbeb", border: "#fde68a", badge: "#f59e0b" },
    { background: "#f0fdf4", border: "#bbf7d0", badge: "#22c55e" },
  ];
  const rows = Object.entries(payload.metrics)
    .map(([key, value], index) => {
      const detail = details[key] || { label: key, explanation: "" };
      const accent = metricAccents[index % metricAccents.length];
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 12px;border-collapse:separate;border-spacing:0;background:${accent.background};border:1px solid ${accent.border};border-left:6px solid ${accent.badge};border-radius:18px;"><tr><td style="padding:16px 14px;vertical-align:top;"><div style="color:#111827 !important;font-family:Arial,sans-serif;font-size:17px;line-height:1.25;font-weight:900;margin:0 0 6px;">${escapeHtml(detail.label)}</div><div style="color:#334155 !important;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;font-weight:600;margin:0;">${escapeHtml(detail.explanation)}</div></td><td align="right" style="padding:16px 14px;vertical-align:top;white-space:nowrap;color:#111827 !important;font-family:Arial,sans-serif;font-size:22px;line-height:1.2;font-weight:900;">${escapeHtml(value)}</td></tr></table>`;
    })
    .join("");

  const offerUrl = "https://c11c2bxvw2sjyq86y9b2eycy01.hop.clickbank.net/?traffic_source=email&traffic_type=sequence&tid=email01metrics";
  const affiliateButton = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;border-spacing:0;margin:16px 0 0;"><tr><td align="center" bgcolor="#34d399" style="background:#34d399;border-radius:999px;"><a href="${offerUrl}" style="display:block;padding:16px 18px;color:#0f172a !important;text-decoration:none;font-family:Arial,sans-serif;font-weight:900;font-size:16px;line-height:1.35;text-transform:uppercase;letter-spacing:.04em;">Get your Mediterranean Diet Plan</a></td></tr></table>`;
  const offerBlock = isPt
    ? ""
    : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin:24px 0 0;border-collapse:separate;border-spacing:0;background:#ecfdf5;border:1px solid #86efac;border-radius:24px;"><tr><td bgcolor="#10b981" style="background:#10b981;padding:18px;border-radius:24px 24px 0 0;"><div style="color:#ffffff !important;font-family:Arial,sans-serif;font-size:12px;line-height:1.2;font-weight:900;letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px;">Optional accelerator</div><div style="color:#ffffff !important;font-family:Arial,sans-serif;font-size:28px;line-height:1.1;font-weight:900;margin:0;">Get your plan moving faster</div></td></tr><tr><td style="padding:18px 16px 20px;"><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:17px;line-height:1.55;font-weight:900;margin:0 0 14px;">Based on your numbers and your goals, a Mediterranean-style plan can help turn today’s metrics into simple meals and clearer next steps.</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #dbeafe;border-radius:18px;margin:0;"><tr><td style="padding:14px;"><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:16px;line-height:1.35;font-weight:900;margin:0 0 10px;">What this can help with</div><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:15px;line-height:1.55;font-weight:800;margin:0;">✓ Personalized meals around your routine<br>✓ Simple alternatives when life gets busy<br>✓ Weekly structure so you stop guessing</div></td></tr></table>${affiliateButton}</td></tr></table>`;

  const html = `<!doctype html><html><body bgcolor="#f0f9ff" style="margin:0;padding:0;background:#f0f9ff;font-family:Arial,sans-serif;color:#0f172a;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f0f9ff" style="width:100%;background:#f0f9ff;border-collapse:collapse;"><tr><td align="center" style="padding:24px 12px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;width:100%;background:#ffffff;border:1px solid #bae6fd;border-radius:28px;border-collapse:separate;border-spacing:0;"><tr><td style="padding:26px 20px;"><div style="color:#047857 !important;font-family:Arial,sans-serif;font-weight:900;letter-spacing:.14em;text-transform:uppercase;font-size:13px;line-height:1.2;margin:0 0 14px;">NexTool Fit</div><div style="color:#0f172a !important;font-family:Arial,sans-serif;font-size:34px;line-height:1.08;font-weight:900;margin:0;">${escapeHtml(title)}</div><div style="color:#334155 !important;font-family:Arial,sans-serif;line-height:1.65;font-size:17px;font-weight:700;margin:18px 0 12px;">${escapeHtml(intro)}</div><div style="color:#64748b !important;font-family:Arial,sans-serif;line-height:1.6;font-size:14px;font-weight:600;margin:0 0 22px;">${escapeHtml(visualNote)}</div>${rows}${offerBlock}<div style="color:#64748b !important;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;margin:24px 0 0;">${escapeHtml(disclaimer)}</div></td></tr></table></td></tr></table></body></html>`;

  return { subject, html };
}

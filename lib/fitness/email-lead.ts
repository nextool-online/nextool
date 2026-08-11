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

const metricLabels: Record<FitnessLeadLang, Record<string, string>> = {
  pt: {
    bmi: "IMC",
    idealWeight: "Peso ideal",
    water: "Água diária",
    calories: "Calorias",
    protein: "Proteína",
    maintenance: "Manutenção",
    bmr: "Metabolismo basal",
    macros: "Macros",
  },
  en: {
    bmi: "BMI",
    idealWeight: "Ideal weight",
    water: "Daily water",
    calories: "Calories",
    protein: "Protein",
    maintenance: "Maintenance",
    bmr: "Basal metabolism",
    macros: "Macros",
  },
};

export function buildFitnessEmailHtml(payload: FitnessLeadPayload) {
  const isPt = payload.lang === "pt";
  const subject = isPt ? "Suas métricas fitness estão prontas" : "Your fitness metrics are ready";
  const title = isPt ? "Suas métricas fitness" : "Your fitness metrics";
  const intro = isPt
    ? "Aqui estão os principais números que você acabou de gerar no NexTool Fit. Guarde este email para comparar sua evolução nas próximas semanas."
    : "Here are the key numbers you just generated in NexTool Fit. Keep this email so you can compare your progress over the next weeks.";
  const disclaimer = isPt
    ? "Esses números são estimativas gerais para adultos e não substituem orientação médica ou nutricional."
    : "These numbers are general estimates for adults and do not replace medical or nutrition advice.";
  const cta = isPt ? "Atualizar minhas métricas" : "Update my metrics";
  const url = `https://www.nextool.online/${payload.lang}/fitness`;
  const labels = metricLabels[payload.lang];
  const rows = Object.entries(payload.metrics)
    .map(([key, value]) => {
      const label = labels[key] || key;
      return `<tr><td style="padding:14px 0;color:#71717a;font-weight:700;">${escapeHtml(label)}</td><td style="padding:14px 0;text-align:right;color:#18181b;font-weight:900;">${escapeHtml(value)}</td></tr>`;
    })
    .join("");

  const html = `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:Arial,sans-serif;color:#18181b;"><div style="max-width:640px;margin:0 auto;padding:28px 16px;"><div style="background:#ffffff;border-radius:28px;padding:28px;border:1px solid #e4e4e7;"><p style="margin:0 0 12px;color:#059669;font-weight:900;letter-spacing:.08em;text-transform:uppercase;">NexTool Fit</p><h1 style="margin:0;font-size:32px;line-height:1.1;">${escapeHtml(title)}</h1><p style="margin:16px 0 24px;color:#52525b;line-height:1.65;">${escapeHtml(intro)}</p><table style="width:100%;border-collapse:collapse;border-top:1px solid #e4e4e7;border-bottom:1px solid #e4e4e7;">${rows}</table><p style="margin:24px 0 0;"><a href="${url}" style="display:inline-block;background:#34d399;color:#18181b;text-decoration:none;border-radius:999px;padding:14px 20px;font-weight:900;">${escapeHtml(cta)}</a></p><p style="margin:24px 0 0;color:#71717a;font-size:12px;line-height:1.6;">${escapeHtml(disclaimer)}</p></div></div></body></html>`;

  return { subject, html };
}

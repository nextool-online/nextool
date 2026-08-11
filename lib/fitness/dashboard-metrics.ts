export type FitnessLeadMetricRecord = {
  email?: string | null;
  lang?: string | null;
  source?: string | null;
  created_at?: string | null;
};

export type FitnessEventMetricRecord = {
  event_name?: string | null;
  visitor_id?: string | null;
  lang?: string | null;
  source?: string | null;
  path?: string | null;
  metadata?: Record<string, string | number | boolean> | null;
  created_at?: string | null;
};

export type SanitizedFitnessEventRecord = {
  event_name: string;
  visitor_id: string;
  lang: string;
  source: string;
  path: string | null;
  metadata: Record<string, string | number | boolean>;
};

export type CountItem = {
  count: number;
};

export type SourceCount = CountItem & {
  source: string;
};

export type LangCount = CountItem & {
  lang: string;
};

export type DayCount = CountItem & {
  day: string;
};

export type EventCount = CountItem & {
  event: string;
};

export type FitnessLeadMetrics = {
  totalSubmissions: number;
  uniqueEmails: number;
  repeatSubmissions: number;
  last24hSubmissions: number;
  last7dSubmissions: number;
  bySource: SourceCount[];
  byLang: LangCount[];
  byDay: DayCount[];
  latestCreatedAt: string | null;
};

export type FitnessEventMetrics = {
  totalEvents: number;
  uniqueVisitors: number;
  last24hEvents: number;
  last7dEvents: number;
  byEvent: EventCount[];
  bySource: SourceCount[];
  byLang: LangCount[];
  byDay: DayCount[];
  funnel: EventCount[];
  latestCreatedAt: string | null;
};

const allowedEvents = new Set([
  "fitness_page_view",
  "fitness_profile_started",
  "fitness_metrics_generated",
  "email_field_focused",
  "email_submitted",
  "email_sent_success",
  "email_preview_success",
  "email_sent_error",
]);

const allowedLangs = new Set(["en", "pt"]);
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
  "production_validation",
  "production_email_explanation_validation",
  "email_explanation_validation",
]);

const funnelOrder = [
  "fitness_page_view",
  "fitness_profile_started",
  "fitness_metrics_generated",
  "email_field_focused",
  "email_submitted",
  "email_sent_success",
  "email_sent_error",
];

function increment<T extends string>(map: Map<T, number>, key: T) {
  map.set(key, (map.get(key) || 0) + 1);
}

function sortCounts<T extends CountItem>(items: T[]) {
  return items.sort((a, b) => b.count - a.count);
}

function cleanText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim().replace(/[<>]/g, "").slice(0, 180);
}

function isRecent(createdAt: string, now: Date, days: number) {
  const createdDate = new Date(createdAt);
  if (!Number.isFinite(createdDate.valueOf())) return false;
  const ageMs = now.valueOf() - createdDate.valueOf();
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000;
}

export function validateDashboardToken(token: string | null | undefined, expected: string | null | undefined) {
  if (!token || !expected) return false;
  return token === expected;
}

export function sanitizeFitnessEventPayload(payload: unknown): SanitizedFitnessEventRecord {
  const sourcePayload = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
  const eventName = cleanText(sourcePayload.event || sourcePayload.event_name);
  const visitorId = cleanText(sourcePayload.visitorId || sourcePayload.visitor_id).slice(0, 80);
  const lang = allowedLangs.has(sourcePayload.lang as string) ? sourcePayload.lang as string : "en";
  const rawSource = cleanText(sourcePayload.source || "direct_fitness");
  const source = allowedSources.has(rawSource) ? rawSource : "direct_fitness";
  const path = cleanText(sourcePayload.path).slice(0, 180) || null;
  const metadataSource = sourcePayload.metadata && typeof sourcePayload.metadata === "object"
    ? sourcePayload.metadata as Record<string, unknown>
    : {};
  const metadata = Object.fromEntries(
    Object.entries(metadataSource)
      .filter(([key, value]) => key !== "email" && ["string", "number", "boolean"].includes(typeof value))
      .map(([key, value]) => [key.slice(0, 40), typeof value === "string" ? cleanText(value) : value as number | boolean])
  );

  if (!allowedEvents.has(eventName)) {
    throw new Error("Fitness event is not allowed");
  }

  if (!visitorId || visitorId.length < 8) {
    throw new Error("Fitness visitor id is required");
  }

  return {
    event_name: eventName,
    visitor_id: visitorId,
    lang,
    source,
    path,
    metadata,
  };
}

export function aggregateFitnessLeadMetrics(
  leads: FitnessLeadMetricRecord[],
  now = new Date()
): FitnessLeadMetrics {
  const sourceMap = new Map<string, number>();
  const langMap = new Map<string, number>();
  const dayMap = new Map<string, number>();
  const uniqueEmailSet = new Set<string>();
  let last24hSubmissions = 0;
  let last7dSubmissions = 0;
  let latestCreatedAt: string | null = null;

  for (const lead of leads) {
    const source = lead.source || "unknown";
    const lang = lead.lang || "unknown";
    const email = lead.email?.trim().toLowerCase();
    const createdAt = lead.created_at || "";

    increment(sourceMap, source);
    increment(langMap, lang);
    if (email) uniqueEmailSet.add(email);

    if (createdAt) {
      if (isRecent(createdAt, now, 1)) last24hSubmissions += 1;
      if (isRecent(createdAt, now, 7)) last7dSubmissions += 1;
      increment(dayMap, createdAt.slice(0, 10));

      if (!latestCreatedAt || createdAt > latestCreatedAt) {
        latestCreatedAt = createdAt;
      }
    }
  }

  return {
    totalSubmissions: leads.length,
    uniqueEmails: uniqueEmailSet.size,
    repeatSubmissions: Math.max(0, leads.length - uniqueEmailSet.size),
    last24hSubmissions,
    last7dSubmissions,
    latestCreatedAt,
    bySource: sortCounts(Array.from(sourceMap, ([source, count]) => ({ source, count }))),
    byLang: sortCounts(Array.from(langMap, ([lang, count]) => ({ lang, count }))),
    byDay: Array.from(dayMap, ([day, count]) => ({ day, count })).sort((a, b) => b.day.localeCompare(a.day)),
  };
}

export function aggregateFitnessEventMetrics(
  events: FitnessEventMetricRecord[],
  now = new Date()
): FitnessEventMetrics {
  const eventMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();
  const langMap = new Map<string, number>();
  const dayMap = new Map<string, number>();
  const visitorSet = new Set<string>();
  let last24hEvents = 0;
  let last7dEvents = 0;
  let latestCreatedAt: string | null = null;

  for (const event of events) {
    const eventName = event.event_name || "unknown";
    const source = event.source || "unknown";
    const lang = event.lang || "unknown";
    const visitorId = event.visitor_id || "";
    const createdAt = event.created_at || "";

    increment(eventMap, eventName);
    increment(sourceMap, source);
    increment(langMap, lang);
    if (visitorId) visitorSet.add(visitorId);

    if (createdAt) {
      if (isRecent(createdAt, now, 1)) last24hEvents += 1;
      if (isRecent(createdAt, now, 7)) last7dEvents += 1;
      increment(dayMap, createdAt.slice(0, 10));

      if (!latestCreatedAt || createdAt > latestCreatedAt) {
        latestCreatedAt = createdAt;
      }
    }
  }

  return {
    totalEvents: events.length,
    uniqueVisitors: visitorSet.size,
    last24hEvents,
    last7dEvents,
    latestCreatedAt,
    byEvent: sortCounts(Array.from(eventMap, ([event, count]) => ({ event, count }))),
    bySource: sortCounts(Array.from(sourceMap, ([source, count]) => ({ source, count }))),
    byLang: sortCounts(Array.from(langMap, ([lang, count]) => ({ lang, count }))),
    byDay: Array.from(dayMap, ([day, count]) => ({ day, count })).sort((a, b) => b.day.localeCompare(a.day)),
    funnel: funnelOrder.map((event) => ({ event, count: eventMap.get(event) || 0 })),
  };
}

export type FitnessLeadMetricRecord = {
  lang?: string | null;
  source?: string | null;
  created_at?: string | null;
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

export type FitnessLeadMetrics = {
  totalLeads: number;
  last24h: number;
  last7d: number;
  bySource: SourceCount[];
  byLang: LangCount[];
  byDay: DayCount[];
  latestCreatedAt: string | null;
};

function increment<T extends string>(map: Map<T, number>, key: T) {
  map.set(key, (map.get(key) || 0) + 1);
}

function sortCounts<T extends CountItem>(items: T[]) {
  return items.sort((a, b) => b.count - a.count);
}

export function validateDashboardToken(token: string | null | undefined, expected: string | null | undefined) {
  if (!token || !expected) return false;
  return token === expected;
}

export function aggregateFitnessLeadMetrics(
  leads: FitnessLeadMetricRecord[],
  now = new Date()
): FitnessLeadMetrics {
  const sourceMap = new Map<string, number>();
  const langMap = new Map<string, number>();
  const dayMap = new Map<string, number>();
  const dayMs = 24 * 60 * 60 * 1000;
  let last24h = 0;
  let last7d = 0;
  let latestCreatedAt: string | null = null;

  for (const lead of leads) {
    const source = lead.source || "unknown";
    const lang = lead.lang || "unknown";
    const createdAt = lead.created_at || "";
    const createdDate = createdAt ? new Date(createdAt) : null;

    increment(sourceMap, source);
    increment(langMap, lang);

    if (createdDate && Number.isFinite(createdDate.valueOf())) {
      const ageMs = now.valueOf() - createdDate.valueOf();
      if (ageMs >= 0 && ageMs <= dayMs) last24h += 1;
      if (ageMs >= 0 && ageMs <= 7 * dayMs) last7d += 1;
      increment(dayMap, createdAt.slice(0, 10));

      if (!latestCreatedAt || createdAt > latestCreatedAt) {
        latestCreatedAt = createdAt;
      }
    }
  }

  return {
    totalLeads: leads.length,
    last24h,
    last7d,
    latestCreatedAt,
    bySource: sortCounts(Array.from(sourceMap, ([source, count]) => ({ source, count }))),
    byLang: sortCounts(Array.from(langMap, ([lang, count]) => ({ lang, count }))),
    byDay: Array.from(dayMap, ([day, count]) => ({ day, count })).sort((a, b) => b.day.localeCompare(a.day)),
  };
}

import { notFound } from "next/navigation";

import {
  aggregateFitnessEventMetrics,
  aggregateFitnessLeadMetrics,
  validateDashboardToken,
  type FitnessEventMetricRecord,
  type FitnessLeadMetricRecord,
} from "../../../../lib/fitness/dashboard-metrics";
import { languages, type LanguageCode } from "../../../../data/languages";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type DashboardPageProps = {
  params: Promise<{ lang: LanguageCode }>;
  searchParams: Promise<{ token?: string }>;
};

const copy = {
  pt: {
    title: "Dashboard NexTool Fit",
    subtitle: "Funil interno com dados agregados. Leads contam envios; emails únicos mostram pessoas distintas.",
    blocked: "Acesso restrito",
    blockedText: "Informe o token interno para visualizar as métricas.",
    unique: "Emails únicos",
    submissions: "Envios totais",
    repeats: "Envios repetidos",
    day: "Envios 24h",
    week: "Envios 7 dias",
    visitors: "Visitantes únicos",
    events24h: "Eventos 24h",
    source: "Origem dos leads",
    eventSource: "Origem dos eventos",
    lang: "Idioma",
    timeline: "Leads por dia",
    eventTimeline: "Eventos por dia",
    funnel: "Funil de eventos",
    latest: "Último lead",
  },
  en: {
    title: "NexTool Fit Dashboard",
    subtitle: "Internal funnel with aggregated data. Leads count submissions; unique emails show distinct people.",
    blocked: "Restricted access",
    blockedText: "Provide the internal token to view metrics.",
    unique: "Unique emails",
    submissions: "Total submissions",
    repeats: "Repeat submissions",
    day: "24h submissions",
    week: "7d submissions",
    visitors: "Unique visitors",
    events24h: "24h events",
    source: "Lead source",
    eventSource: "Event source",
    lang: "Language",
    timeline: "Leads by day",
    eventTimeline: "Events by day",
    funnel: "Event funnel",
    latest: "Latest lead",
  },
};

export function generateStaticParams() {
  return languages.map((language) => ({ lang: language.code }));
}

async function supabaseSelect(path: string) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) return [];

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) return [];
  return response.json();
}

async function fetchLeadRecords(): Promise<FitnessLeadMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_LEADS_TABLE || "fitness_leads";
  return supabaseSelect(`${table}?select=email,lang,source,created_at&order=created_at.desc&limit=5000`);
}

async function fetchEventRecords(): Promise<FitnessEventMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_EVENTS_TABLE || "fitness_events";
  return supabaseSelect(`${table}?select=event_name,visitor_id,lang,source,path,created_at&order=created_at.desc&limit=10000`);
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">{label}</p>
      <p className="mt-3 text-4xl font-black text-white">{value}</p>
    </div>
  );
}

function CountList({ title, items, labelKey }: { title: string; items: Array<{ count: number } & Record<string, string | number>>; labelKey: string }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="text-xl font-black text-white">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-zinc-400">0</p>
        ) : items.map((item) => (
          <div key={String(item[labelKey])} className="flex items-center justify-between rounded-2xl bg-zinc-950 px-4 py-3">
            <span className="font-bold text-zinc-200">{String(item[labelKey])}</span>
            <span className="text-lg font-black text-white">{item.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function FitnessDashboardPage({ params, searchParams }: DashboardPageProps) {
  const [{ lang }, { token }] = await Promise.all([params, searchParams]);
  const labels = copy[lang] || copy.en;

  if (!validateDashboardToken(token, process.env.FITNESS_DASHBOARD_TOKEN)) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">NexTool Fit</p>
          <h1 className="mt-4 text-4xl font-black">{labels.blocked}</h1>
          <p className="mt-4 text-zinc-300">{labels.blockedText}</p>
        </div>
      </main>
    );
  }

  if (!languages.some((language) => language.code === lang)) {
    notFound();
  }

  const [leadRecords, eventRecords] = await Promise.all([fetchLeadRecords(), fetchEventRecords()]);
  const metrics = aggregateFitnessLeadMetrics(leadRecords);
  const eventMetrics = aggregateFitnessEventMetrics(eventRecords);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">NexTool Fit</p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">{labels.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-300">{labels.subtitle}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label={labels.unique} value={metrics.uniqueEmails} />
          <StatCard label={labels.submissions} value={metrics.totalSubmissions} />
          <StatCard label={labels.repeats} value={metrics.repeatSubmissions} />
          <StatCard label={labels.visitors} value={eventMetrics.uniqueVisitors} />
          <StatCard label={labels.day} value={metrics.last24hSubmissions} />
          <StatCard label={labels.week} value={metrics.last7dSubmissions} />
          <StatCard label={labels.events24h} value={eventMetrics.last24hEvents} />
          <StatCard label={labels.latest} value={metrics.latestCreatedAt ? new Date(metrics.latestCreatedAt).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US") : "—"} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <CountList title={labels.funnel} items={eventMetrics.funnel} labelKey="event" />
          <CountList title={labels.source} items={metrics.bySource} labelKey="source" />
          <CountList title={labels.eventSource} items={eventMetrics.bySource} labelKey="source" />
          <CountList title={labels.lang} items={metrics.byLang} labelKey="lang" />
          <CountList title={labels.timeline} items={metrics.byDay.slice(0, 14)} labelKey="day" />
          <CountList title={labels.eventTimeline} items={eventMetrics.byDay.slice(0, 14)} labelKey="day" />
        </div>
      </div>
    </main>
  );
}

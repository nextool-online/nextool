import { notFound } from "next/navigation";

import {
  aggregateFitnessLeadMetrics,
  validateDashboardToken,
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
    subtitle: "Leitura interna do funil de captura. Dados agregados, sem identificação individual.",
    blocked: "Acesso restrito",
    blockedText: "Informe o token interno para visualizar as métricas.",
    total: "Leads totais",
    day: "Últimas 24h",
    week: "Últimos 7 dias",
    source: "Origem",
    lang: "Idioma",
    timeline: "Por dia",
    latest: "Último lead",
  },
  en: {
    title: "NexTool Fit Dashboard",
    subtitle: "Internal capture funnel view. Aggregated data only, with no individual identification.",
    blocked: "Restricted access",
    blockedText: "Provide the internal token to view metrics.",
    total: "Total leads",
    day: "Last 24h",
    week: "Last 7 days",
    source: "Source",
    lang: "Language",
    timeline: "By day",
    latest: "Latest lead",
  },
};

export function generateStaticParams() {
  return languages.map((language) => ({ lang: language.code }));
}

async function fetchRecords(): Promise<FitnessLeadMetricRecord[]> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_FITNESS_LEADS_TABLE || "fitness_leads";

  if (!supabaseUrl || !serviceRoleKey) return [];

  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}?select=lang,source,created_at&order=created_at.desc&limit=5000`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) return [];
  return response.json();
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

  const metrics = aggregateFitnessLeadMetrics(await fetchRecords());

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">NexTool Fit</p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">{labels.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-300">{labels.subtitle}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label={labels.total} value={metrics.totalLeads} />
          <StatCard label={labels.day} value={metrics.last24h} />
          <StatCard label={labels.week} value={metrics.last7d} />
          <StatCard label={labels.latest} value={metrics.latestCreatedAt ? new Date(metrics.latestCreatedAt).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US") : "—"} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <CountList title={labels.source} items={metrics.bySource} labelKey="source" />
          <CountList title={labels.lang} items={metrics.byLang} labelKey="lang" />
          <CountList title={labels.timeline} items={metrics.byDay.slice(0, 14)} labelKey="day" />
        </div>
      </div>
    </main>
  );
}

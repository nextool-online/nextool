import Link from "next/link";
import { notFound } from "next/navigation";

import {
  aggregateFitnessEventMetrics,
  aggregateFitnessLeadMetrics,
  filterRecordsByDateRange,
  validateDashboardToken,
  type FitnessEventMetricRecord,
  type FitnessLeadMetricRecord,
} from "../../../../lib/fitness/dashboard-metrics";
import { languages, type LanguageCode } from "../../../../data/languages";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type DashboardPageProps = {
  params: Promise<{ lang: LanguageCode }>;
  searchParams: Promise<{ token?: string; from?: string; to?: string }>;
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
    funnel: "Funil /fitness",
    calculatorFunnel: "Funil das calculadoras",
    byCalculator: "Por calculadora",
    latest: "Último lead",
    rangeTitle: "Período analisado",
    fromDate: "De",
    toDate: "Até",
    applyRange: "Aplicar período",
    fitnessTotals: "FITNESS (TOTAIS)",
    visualFunnel: "Funil visual por calculadora",
    conversionRate: "% conv. rate Fitness",
    capturedEmails: "emails capturados",
    started: "Started",
    metrics: "Metrics",
    cta: "CTA",
    events: "Eventos",
    visualHint: "Ranking por melhor relação entre conversão para o funil fitness e emails capturados.",
    allTime: "Total",
    dateHint: "dd/mm/aaaa",
    emailCaptureRate: "email_capture_rate",
    emailsCaptured: "emails_captured",
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
    funnel: "Fitness funnel",
    calculatorFunnel: "Calculator funnel",
    byCalculator: "By calculator",
    latest: "Latest lead",
    rangeTitle: "Date range",
    fromDate: "From",
    toDate: "To",
    applyRange: "Apply range",
    fitnessTotals: "FITNESS (TOTALS)",
    visualFunnel: "Visual funnel by calculator",
    conversionRate: "% Fitness conv. rate",
    capturedEmails: "captured emails",
    started: "Started",
    metrics: "Metrics",
    cta: "CTA",
    events: "Events",
    visualHint: "Ranking by the best relationship between fitness-funnel conversion rate and captured emails.",
    allTime: "All time",
    dateHint: "yyyy-mm-dd",
    emailCaptureRate: "email_capture_rate",
    emailsCaptured: "emails_captured",
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

function appendDashboardMetricFilters(params: URLSearchParams, fromDate?: string | null, toDate?: string | null, lang?: string | null) {
  if (lang === "pt" || lang === "en") params.set("lang", `eq.${lang}`);
  if (fromDate) params.set("created_at", `gte.${fromDate}T00:00:00.000Z`);
  if (toDate) params.append("created_at", `lte.${toDate}T23:59:59.999Z`);
}

function buildDashboardMetricPath(table: string, select: string, limit: number, fromDate?: string | null, toDate?: string | null, lang?: string | null) {
  const params = new URLSearchParams();
  params.set("select", select);
  params.set("order", "created_at.desc");
  params.set("limit", String(limit));
  appendDashboardMetricFilters(params, fromDate, toDate, lang);
  return `${table}?${params.toString()}`;
}

async function fetchLeadRecords(fromDate?: string | null, toDate?: string | null, lang?: string | null): Promise<FitnessLeadMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_LEADS_TABLE || "fitness_leads";
  return supabaseSelect(buildDashboardMetricPath(table, "email,lang,source,created_at", 5000, fromDate, toDate, lang));
}

async function fetchEventRecords(fromDate?: string | null, toDate?: string | null, lang?: string | null): Promise<FitnessEventMetricRecord[]> {
  const table = process.env.SUPABASE_FITNESS_EVENTS_TABLE || "fitness_events";
  return supabaseSelect(buildDashboardMetricPath(table, "event_name,visitor_id,lang,source,path,created_at", 10000, fromDate, toDate, lang));
}

const quickRanges = [
  { days: 7, label: "7d" },
  { days: 30, label: "30d" },
  { days: 60, label: "60d" },
  { days: 90, label: "90d" },
];

function isoDateDaysAgo(days: number) {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - days + 1);
  return date.toISOString().slice(0, 10);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function dashboardHref(lang: LanguageCode, token: string | undefined, from?: string | null, to?: string | null) {
  const params = new URLSearchParams();
  if (token) params.set("token", token);
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const query = params.toString();
  return `/${lang}/fitness/dashboard${query ? `?${query}` : ""}`;
}

function parseDashboardDate(value?: string | null) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const brMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (brMatch) return `${brMatch[3]}-${brMatch[2]}-${brMatch[1]}`;
  return null;
}

function formatDashboardDate(value: string | null | undefined, lang: LanguageCode) {
  const iso = parseDashboardDate(value);
  if (!iso) return "";
  if (lang === "pt") {
    const [year, month, day] = iso.split("-");
    return `${day}/${month}/${year}`;
  }
  return iso;
}

function activeRangeLabel(fromDate: string | null | undefined, toDate: string | null | undefined, lang: LanguageCode) {
  if (!fromDate && !toDate) return "total";
  const fromLabel = formatDashboardDate(fromDate, lang);
  const toLabel = formatDashboardDate(toDate, lang);
  if (fromLabel && toLabel) return `${fromLabel} → ${toLabel}`;
  if (fromLabel) return `from ${fromLabel}`;
  return `to ${toLabel}`;
}

function activeChipClass(isActive: boolean) {
  return isActive
    ? "rounded-full bg-emerald-400 px-4 py-2 text-sm font-black text-zinc-950"
    : "rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-emerald-400 hover:text-emerald-200";
}

function isSameRange(fromDate: string | null | undefined, toDate: string | null | undefined, from?: string | null, to?: string | null) {
  return (fromDate || "") === (from || "") && (toDate || "") === (to || "");
}

const calculatorFunnelLayout = [
  { id: "bmi-calculator", leadSource: "bmi", short: "BMI", pt: "IMC", en: "BMI" },
  { id: "bmr-calculator", leadSource: "bmr", short: "BMR", pt: "TMB", en: "BMR" },
  { id: "calorie-calculator", leadSource: "calories", short: "CALORIES", pt: "Calorias", en: "Calories" },
  { id: "protein-calculator", leadSource: "protein", short: "PROTEIN", pt: "Proteína", en: "Protein" },
  { id: "ideal-weight-calculator", leadSource: "ideal-weight", short: "IDEAL WEIGHT", pt: "Peso ideal", en: "Ideal weight" },
  { id: "water-intake-calculator", leadSource: "water", short: "WATER INTAKE", pt: "Água", en: "Water intake" },
  { id: "macro-calculator", leadSource: "macros", short: "MACRO", pt: "Macros", en: "Macro" },
];

function metricCount(items: Array<{ event: string; count: number }>, event: string) {
  return items.find((item) => item.event === event)?.count || 0;
}

function sourceCount(items: Array<{ source: string; count: number }>, source: string) {
  return items.find((item) => item.source === source)?.count || 0;
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">{label}</p>
      <p className="mt-3 text-4xl font-black text-white">{value}</p>
    </div>
  );
}

function FitnessTotals({ title, items }: { title: string; items: Array<{ event: string; count: number }> }) {
  const submitted = metricCount(items, "email_submitted");
  const sentSuccess = metricCount(items, "email_sent_success");
  const uniqueFitnessMetrics = metricCount(items, "fitness_metrics_generated");
  const uniqueEmailCaptures = sentSuccess;
  const submitConversion = uniqueFitnessMetrics > 0 ? Math.min(100, submitted / uniqueFitnessMetrics * 100) : 0;
  const captureConversion = uniqueFitnessMetrics > 0 ? Math.min(100, uniqueEmailCaptures / uniqueFitnessMetrics * 100) : 0;

  return (
    <section className="rounded-[2rem] border border-emerald-500/30 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 shadow-2xl shadow-emerald-950/20">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">{title}</p>
      <h2 className="mt-2 text-2xl font-black text-white">Funil /fitness</h2>
      <div className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <div key={item.event} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2">
            <span className="font-bold text-zinc-300">{item.event}</span>
            <span className="font-black text-white">{item.count}</span>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
          <span className="font-bold text-emerald-200">emails_captured</span>
          <span className="font-black text-emerald-100">{uniqueEmailCaptures}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
          <span className="font-bold text-emerald-200">email_conv_rate</span>
          <span className="font-black text-emerald-100">{formatPercent(submitConversion)}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
          <span className="font-bold text-emerald-200">email_capture_rate</span>
          <span className="font-black text-emerald-100">{formatPercent(captureConversion)}</span>
        </div>
      </div>
    </section>
  );
}

type CalculatorVisualItem = {
  id: string;
  label: string;
  views: number;
  started: number;
  metrics: number;
  ctaClicks: number;
  conversionRate: number;
  capturedEmails: number;
  events: number;
};

function VisualFunnel({ title, items, labels }: { title: string; items: CalculatorVisualItem[]; labels: typeof copy.pt }) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl shadow-zinc-950/30">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">{title}</p>
          <h2 className="mt-2 text-2xl font-black text-white">{labels.visualFunnel}</h2>
        </div>
        <p className="max-w-xl text-sm font-medium leading-6 text-zinc-400">{labels.visualHint}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {items.slice(0, 4).map((item) => <VisualCalculatorCard key={item.id} item={item} labels={labels} />)}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3 md:px-16">
        {items.slice(4).map((item) => <VisualCalculatorCard key={item.id} item={item} labels={labels} />)}
      </div>
    </section>
  );
}

function VisualCalculatorCard({ item, labels }: { item: CalculatorVisualItem; labels: typeof copy.pt }) {
  return (
    <details className="group rounded-[1.75rem] border border-zinc-800 bg-zinc-950 p-4 open:border-emerald-500/40 open:bg-emerald-950/20" open={item.events > 0 || item.capturedEmails > 0}>
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-black uppercase tracking-wide text-emerald-300">{item.label}</h3>
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-black text-white">{formatPercent(item.conversionRate)}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <span className="rounded-2xl bg-white/5 px-3 py-2 font-bold text-zinc-300">{labels.capturedEmails}: <b className="text-white">{item.capturedEmails}</b></span>
          <span className="rounded-2xl bg-white/5 px-3 py-2 font-bold text-zinc-300">CTA: <b className="text-white">{item.ctaClicks}</b></span>
        </div>
      </summary>
      <div className="mt-4 space-y-2 text-xs">
        <MetricLine label={`${item.id}_page_view`} value={item.views} />
        <MetricLine label={`${item.id}_profile_started`} value={item.started} />
        <MetricLine label={`${item.id}_metrics_generated`} value={item.metrics} />
        <MetricLine label={`${item.id}_cta_click`} value={item.ctaClicks} />
        <MetricLine label={labels.conversionRate} value={formatPercent(item.conversionRate)} />
        <MetricLine label={labels.capturedEmails} value={item.capturedEmails} />
      </div>
    </details>
  );
}

function MetricLine({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-900 px-3 py-2">
      <span className="truncate font-bold text-zinc-400">{label}</span>
      <span className="font-black text-white">{value}</span>
    </div>
  );
}

function CalculatorList({ title, items }: { title: string; items: Array<{ calculator: string; events: number; views: number; resultShown: number; ctaClicks: number }> }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:col-span-3">
      <h2 className="text-xl font-black text-white">{title}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-center text-sm">
          <thead className="text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-2">Calculadora</th>
              <th className="px-4 py-2">Views</th>
              <th className="px-4 py-2">Started</th>
              <th className="px-4 py-2">Metrics</th>
              <th className="px-4 py-2">CTA</th>
              <th className="px-4 py-2">Eventos</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td className="rounded-2xl bg-zinc-950 px-4 py-3 text-zinc-400" colSpan={6}>0</td></tr>
            ) : items.map((item) => (
              <tr key={item.calculator} className="bg-zinc-950 text-zinc-200">
                <td className="rounded-l-2xl px-4 py-3 font-bold text-emerald-300">{item.calculator}</td>
                <td className="px-4 py-3 font-black text-white">{item.views}</td>
                <td className="px-4 py-3 font-black text-white">{item.resultShown}</td>
                <td className="px-4 py-3 font-black text-white">{item.resultShown}</td>
                <td className="px-4 py-3 font-black text-white">{item.ctaClicks}</td>
                <td className="rounded-r-2xl px-4 py-3 font-black text-white">{item.events}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const hiddenSections = ["funnel", "calculatorFunnel", "eventSource", "language", "timeline", "eventTimeline"];

export default async function FitnessDashboardPage({ params, searchParams }: DashboardPageProps) {
  const [{ lang }, { token, from: rawFromDate, to: rawToDate }] = await Promise.all([params, searchParams]);
  const fromDate = parseDashboardDate(rawFromDate);
  const toDate = parseDashboardDate(rawToDate);
  const labels = copy[lang] || copy.en;
  void hiddenSections;

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

  const [leadRecords, eventRecords] = await Promise.all([fetchLeadRecords(fromDate, toDate, lang), fetchEventRecords(fromDate, toDate, lang)]);
  const filteredLeads = filterRecordsByDateRange(leadRecords, fromDate, toDate).filter((record) => record.lang === lang);
  const filteredEvents = filterRecordsByDateRange(eventRecords, fromDate, toDate).filter((record) => record.lang === lang);
  const metrics = aggregateFitnessLeadMetrics(filteredLeads);
  const eventMetrics = aggregateFitnessEventMetrics(filteredEvents);
  const visualItems = calculatorFunnelLayout
    .map((calculator) => {
      const stats = eventMetrics.byCalculator.find((item) => item.calculator === calculator.id);
      const views = stats?.views || 0;
      const metricsGenerated = stats?.resultShown || 0;
      const ctaClicks = stats?.ctaClicks || 0;
      const capturedEmails = sourceCount(metrics.bySource, calculator.leadSource) + sourceCount(metrics.bySource, calculator.id);
      const conversionRate = views > 0 ? ctaClicks / views * 100 : 0;

      return {
        id: calculator.id,
        label: calculator[lang] || calculator.short,
        views,
        started: metricsGenerated,
        metrics: metricsGenerated,
        ctaClicks,
        conversionRate,
        capturedEmails,
        events: stats?.events || 0,
      };
    })
    .sort((a, b) => b.conversionRate - a.conversionRate || b.capturedEmails - a.capturedEmails || b.events - a.events);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">NexTool Fit</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] md:text-6xl">
              <span className="block">Dashboard</span>
              <span className="block">NexTool Fit</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">{labels.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2 text-sm" data-testid="languageSwitch">
              <Link className={`rounded-full px-4 py-2 font-black ${lang === "pt" ? "bg-emerald-400 text-zinc-950" : "border border-zinc-700 text-zinc-300"}`} href={dashboardHref("pt", token, fromDate, toDate)}>PT</Link>
              <Link className={`rounded-full px-4 py-2 font-black ${lang === "en" ? "bg-emerald-400 text-zinc-950" : "border border-zinc-700 text-zinc-300"}`} href={dashboardHref("en", token, fromDate, toDate)}>EN</Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link className={activeChipClass(isSameRange(fromDate, toDate))} href={dashboardHref(lang, token)}>{labels.allTime}</Link>
              {quickRanges.map((range) => {
                const from = isoDateDaysAgo(range.days);
                const to = todayIsoDate();
                return (
                  <Link key={range.label} className={activeChipClass(isSameRange(fromDate, toDate, from, to))} href={dashboardHref(lang, token, from, to)}>
                    {range.label}
                  </Link>
                );
              })}
              <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-400">{activeRangeLabel(fromDate, toDate, lang)}</span>
            </div>

            <form className="mt-3 grid gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 md:grid-cols-[1fr_1fr_auto]" action={`/${lang}/fitness/dashboard`}>
              <input type="hidden" name="token" value={token} />
              <label className="text-sm font-bold text-zinc-300">
                {labels.fromDate}
                <input className="date-input mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-400" type="text" inputMode="numeric" name="from" defaultValue={formatDashboardDate(fromDate, lang)} placeholder={labels.dateHint} aria-label={`${labels.fromDate} ${labels.dateHint}`} />
              </label>
              <label className="text-sm font-bold text-zinc-300">
                {labels.toDate}
                <input className="date-input mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-400" type="text" inputMode="numeric" name="to" defaultValue={formatDashboardDate(toDate, lang)} placeholder={labels.dateHint} aria-label={`${labels.toDate} ${labels.dateHint}`} />
              </label>
              <button className="self-end rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300" type="submit">
                {labels.applyRange}
              </button>
            </form>
          </div>

          <FitnessTotals title={labels.fitnessTotals} items={eventMetrics.funnel} />
        </div>

        <VisualFunnel title="NexTool Fit" items={visualItems} labels={labels} />

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
          <CalculatorList title={labels.byCalculator} items={eventMetrics.byCalculator} />
        </div>
      </div>
    </main>
  );
}

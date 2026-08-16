type MoneyMetric = {
  label: string;
  value: string;
  helper?: string;
};

type MoneyMetricGridProps = {
  metrics: MoneyMetric[];
};

export default function MoneyMetricGrid({ metrics }: MoneyMetricGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            {metric.label}
          </p>
          <p className="mt-2 break-words text-2xl font-black text-slate-950">
            {metric.value}
          </p>
          {metric.helper && (
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              {metric.helper}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

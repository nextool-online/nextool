type MoneyResultCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "emerald" | "blue" | "amber";
};

const toneClasses = {
  emerald: "from-emerald-500 to-teal-500 shadow-emerald-900/20",
  blue: "from-sky-500 to-blue-600 shadow-blue-900/20",
  amber: "from-amber-400 to-orange-500 shadow-amber-900/20",
};

export default function MoneyResultCard({
  label,
  value,
  helper,
  tone = "emerald",
}: MoneyResultCardProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-white shadow-2xl shadow-emerald-950/10">
      <div className={`bg-gradient-to-br ${toneClasses[tone]} p-5 text-white md:p-7`}>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-white/75">
          {label}
        </p>
        <p className="mt-3 break-words text-4xl font-black tracking-tight md:text-5xl">
          {value}
        </p>
      </div>
      <div className="p-5 md:p-6">
        <p className="text-base font-semibold leading-7 text-slate-700">
          {helper}
        </p>
      </div>
    </div>
  );
}

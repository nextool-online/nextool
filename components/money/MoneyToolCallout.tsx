import Link from "next/link";

import type { LanguageCode } from "../../data/languages";

type MoneyToolCalloutProps = {
  lang: LanguageCode;
};

export default function MoneyToolCallout({ lang }: MoneyToolCalloutProps) {
  return (
    <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-5 text-slate-950 shadow-xl shadow-amber-900/10 md:p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700">
        {lang === "pt" ? "Próximo passo" : "Next step"}
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight">
        {lang === "pt" ? "Compare antes de decidir" : "Compare before you decide"}
      </h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
        {lang === "pt"
          ? "Use outras calculadoras financeiras para entender juros, retorno e cenários antes de assumir um compromisso."
          : "Use related financial calculators to understand interest, returns and scenarios before making a commitment."}
      </p>
      <Link
        href={`/${lang}/money`}
        className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
      >
        {lang === "pt" ? "Ver NexTool Money" : "Open NexTool Money"}
      </Link>
    </div>
  );
}

import { getText } from "../../data/i18n";

import type { LanguageCode } from "../../data/languages";
import type { ToolAdvancedSeo } from "../../tools/types";

type AdvancedSeoBlocksProps = {
  advancedSeo?: ToolAdvancedSeo;
  lang: LanguageCode;
};

const labels = {
  en: {
    examples: "Examples and scenarios",
    useCases: "Specific ways to use this calculator",
    commonMistakes: "Common mistakes",
    steps: "How to use the result",
    resultInsights: "How to interpret the result",
    relatedQueries: "Related questions",
    localizedUnits: "Local units and formatting",
    monetizationBlocks: "Ways this decision affects money",
  },
  pt: {
    examples: "Exemplos e cenários",
    useCases: "Formas específicas de usar esta calculadora",
    commonMistakes: "Erros comuns",
    steps: "Como usar o resultado",
    resultInsights: "Como interpretar o resultado",
    relatedQueries: "Perguntas relacionadas",
    localizedUnits: "Unidades e formatação local",
    monetizationBlocks: "Como esta decisão afeta dinheiro",
  },
};

function CardGrid({
  title,
  items,
  tone = "white",
}: {
  title: string;
  items?: { title: Record<string, string | undefined>; description: Record<string, string | undefined>; calculation?: Record<string, string | undefined> }[];
  tone?: "white" | "emerald" | "amber";
}) {
  if (!items || items.length === 0) return null;

  const shell = tone === "emerald"
    ? "border-emerald-100 bg-emerald-50"
    : tone === "amber"
      ? "border-amber-100 bg-amber-50"
      : "border-slate-200 bg-white";

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={`${item.title.en || item.title.pt}`} className={`rounded-3xl border p-5 shadow-sm ${shell}`}>
            <h3 className="text-lg font-black leading-tight text-slate-950">{item.title.en || item.title.pt}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.description.en || item.description.pt}</p>
            {item.calculation && (item.calculation.en || item.calculation.pt) && (
              <p className="mt-4 rounded-2xl bg-white/80 p-3 font-mono text-sm font-black text-emerald-800">
                {item.calculation.en || item.calculation.pt}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AdvancedSeoBlocks({ advancedSeo, lang }: AdvancedSeoBlocksProps) {
  if (!advancedSeo) return null;

  const label = labels[lang];

  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-xl shadow-slate-950/5 md:p-8">
      <CardGrid
        title={label.examples}
        items={advancedSeo.examples?.map((item) => ({
          title: { [lang]: getText(item.title, lang) },
          description: { [lang]: getText(item.description, lang) },
          calculation: item.calculation ? { [lang]: getText(item.calculation, lang) } : undefined,
        }))}
        tone="emerald"
      />

      <CardGrid
        title={label.useCases}
        items={advancedSeo.useCases?.map((item) => ({
          title: { [lang]: getText(item.title, lang) },
          description: { [lang]: getText(item.description, lang) },
        }))}
      />

      {advancedSeo.comparisonTable && (
        <section className="mt-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            {getText(advancedSeo.comparisonTable.title, lang)}
          </h2>
          <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  {advancedSeo.comparisonTable.headers.map((header) => (
                    <th key={getText(header, lang)} className="px-5 py-4 font-black">
                      {getText(header, lang)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {advancedSeo.comparisonTable.rows.map((row) => (
                  <tr key={row.map((cell) => getText(cell, lang)).join("|")} className="border-t border-slate-100">
                    {row.map((cell) => (
                      <td key={getText(cell, lang)} className="px-5 py-4 font-semibold leading-6 text-slate-700">
                        {getText(cell, lang)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <CardGrid
        title={label.commonMistakes}
        items={advancedSeo.commonMistakes?.map((item) => ({
          title: { [lang]: getText(item.title, lang) },
          description: { [lang]: getText(item.description, lang) },
        }))}
        tone="amber"
      />

      <CardGrid
        title={label.steps}
        items={advancedSeo.steps?.map((item) => ({
          title: { [lang]: getText(item.title, lang) },
          description: { [lang]: getText(item.description, lang) },
        }))}
      />

      <CardGrid
        title={label.resultInsights}
        items={advancedSeo.resultInsights?.map((item) => ({
          title: { [lang]: getText(item.title, lang) },
          description: { [lang]: getText(item.description, lang) },
        }))}
        tone="emerald"
      />

      {advancedSeo.relatedQueries && advancedSeo.relatedQueries.length > 0 && (
        <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">{label.relatedQueries}</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {advancedSeo.relatedQueries.map((query) => (
              <li key={getText(query, lang)} className="rounded-2xl bg-white p-4 text-sm font-black text-slate-800 shadow-sm">
                {getText(query, lang)}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}

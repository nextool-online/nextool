import Link from "next/link";

import MoneyFooter from "../../../components/money/MoneyFooter";
import MoneyHeader from "../../../components/money/MoneyHeader";
import { getText } from "../../../data/i18n";
import { languages, type LanguageCode } from "../../../data/languages";
import { tools } from "../../../tools/registry";

const baseUrl = "https://www.nextool.online";
const moneyToolIds = [
  "loan-calculator",
  "mortgage-calculator",
  "compound-interest-calculator",
  "savings-calculator",
  "investment-calculator",
  "retirement-calculator",
  "roi-calculator",
  "inflation-calculator",
  "break-even-calculator",
  "percentage-calculator",
];

const copy = {
  en: {
    title: "NexTool Money",
    description: "Free financial calculators for loan payments, mortgage costs, compound interest, savings goals, ROI, inflation and break-even decisions.",
    eyebrow: "Financial calculators",
    hero: "Make money decisions easier to compare.",
    subhero: "Estimate payments, interest, savings and returns with fast calculators that explain the result in plain language.",
    cta: "Start with a loan estimate",
    sections: ["Borrowing", "Investing", "Business decisions"],
    featured: "Featured money tools",
    guideTitle: "A practical financial calculator hub, not just a tool list",
    guideBody: "NexTool Money groups the most common personal finance and business calculators into one decision flow. Start with the number you need now, then move to the next related calculator to compare payment pressure, total interest, future value, ROI or break-even volume.",
    useCasesTitle: "Use NexTool Money to compare",
    useCases: ["loan payment versus total interest", "mortgage down payment versus monthly pressure", "savings contributions versus future balance", "investment gains versus total contributions", "campaign cost versus ROI and break-even point"],
    note: "Educational estimates only. Always compare real terms, fees and professional advice before making financial decisions.",
  },
  pt: {
    title: "NexTool Money",
    description: "Calculadoras financeiras grátis para parcelas, financiamento, juros compostos, poupança, ROI, inflação e ponto de equilíbrio.",
    eyebrow: "Calculadoras financeiras",
    hero: "Compare decisões de dinheiro com mais clareza.",
    subhero: "Estime parcelas, juros, economia e retornos com calculadoras rápidas que explicam o resultado em linguagem simples.",
    cta: "Começar pelo empréstimo",
    sections: ["Crédito", "Investimentos", "Decisões de negócio"],
    featured: "Ferramentas financeiras em destaque",
    guideTitle: "Um hub financeiro prático, não apenas uma lista de ferramentas",
    guideBody: "O NexTool Money organiza as principais calculadoras de finanças pessoais e negócios em uma jornada de decisão. Comece pelo número que você precisa agora e avance para a próxima calculadora relacionada para comparar pressão mensal, juros totais, valor futuro, ROI ou ponto de equilíbrio.",
    useCasesTitle: "Use o NexTool Money para comparar",
    useCases: ["parcela de empréstimo versus juros totais", "entrada de imóvel versus pressão mensal", "aportes de poupança versus saldo futuro", "ganhos de investimento versus aportes totais", "custo de campanha versus ROI e ponto de equilíbrio"],
    note: "Estimativas educacionais. Compare taxas reais, custos e orientação profissional antes de tomar decisões financeiras.",
  },
};

type MoneyPageProps = {
  params: Promise<{
    lang: LanguageCode;
  }>;
};

export function generateStaticParams() {
  return languages.map((language) => ({ lang: language.code }));
}

export async function generateMetadata({ params }: MoneyPageProps) {
  const { lang } = await params;
  const content = copy[lang];

  return {
    title: lang === "pt" ? "NexTool Money - Calculadoras Financeiras Grátis" : "NexTool Money - Free Financial Calculators",
    description: content.description,
    alternates: {
      canonical: `${baseUrl}/${lang}/money`,
      languages: Object.fromEntries(languages.map((language) => [language.code, `${baseUrl}/${language.code}/money`])),
    },
  };
}

export default async function MoneyPage({ params }: MoneyPageProps) {
  const { lang } = await params;
  const content = copy[lang];
  const moneyTools = moneyToolIds
    .map((toolId) => tools.find((tool) => tool.id === toolId))
    .filter((tool): tool is NonNullable<(typeof tools)[number]> => {
      if (!tool) return false;
      return !tool.availableLanguages || tool.availableLanguages.includes(lang);
    });

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: moneyTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getText(tool.title, lang),
      url: `${baseUrl}/${lang}/tools/${getText(tool.slug, lang)}`,
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <MoneyHeader lang={lang} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">
              {content.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
              {content.hero}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-650 md:text-xl">
              {content.subhero}
            </p>
            <Link
              href={`/${lang}/tools/${getText(tools.find((tool) => tool.id === "loan-calculator")!.slug, lang)}`}
              className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {content.cta}
            </Link>
          </div>

          <div className="rounded-[2rem] border border-emerald-200 bg-white p-5 shadow-2xl shadow-emerald-950/10 md:p-7">
            <div className="grid gap-3">
              {content.sections.map((section, index) => (
                <div key={section} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-400 text-sm font-black text-slate-950">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-black text-slate-950">{section}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold leading-6 text-slate-600">
              {content.note}
            </p>
          </div>
        </div>

        <section className="mt-14" id="money-related">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            {content.featured}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {moneyTools.map((tool, index) => (
              <Link
                key={tool.id}
                href={`/${lang}/tools/${getText(tool.slug, lang)}`}
                className="group rounded-[1.75rem] border border-emerald-200 bg-white p-5 shadow-sm shadow-emerald-950/5 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-950/10"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-black leading-tight text-slate-950">
                    {getText(tool.title, lang)}
                  </h3>
                </div>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                  {getText(tool.description, lang)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-[1fr_0.85fr]" id="money-learn">
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/10 md:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              {content.guideTitle}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {content.guideBody}
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/20 md:p-8">
            <h2 className="text-2xl font-black tracking-tight">
              {content.useCasesTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {content.useCases.map((useCase) => (
                <li key={useCase} className="flex gap-3 text-sm font-bold leading-6 text-slate-200">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>

      <MoneyFooter lang={lang} />
    </main>
  );
}

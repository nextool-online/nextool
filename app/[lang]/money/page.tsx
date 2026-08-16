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

const toolHref = (lang: LanguageCode, toolId: string) => {
  const tool = tools.find((item) => item.id === toolId);
  if (!tool) return `/${lang}/money`;
  return `/${lang}/tools/${getText(tool.slug, lang)}`;
};

const seoJourneys = {
  en: [
    {
      label: "Savings → Investing → Retirement",
      title: "Build long-term money from the bottom up",
      description: "Start with a realistic monthly saving habit, compare investment growth assumptions, then test whether the future balance supports a retirement target.",
      tools: [
        { id: "savings-calculator", anchor: "1. Set the savings habit" },
        { id: "investment-calculator", anchor: "2. Project investment growth" },
        { id: "retirement-calculator", anchor: "3. Check the retirement gap" },
      ],
    },
    {
      label: "Loans → Mortgage → Inflation",
      title: "Compare debt pressure and purchasing power",
      description: "Estimate a normal loan first, move to home financing when down payment matters, then use inflation to stress-test long-term prices and buying power.",
      tools: [
        { id: "loan-calculator", anchor: "1. Estimate payment pressure" },
        { id: "mortgage-calculator", anchor: "2. Add down payment and term" },
        { id: "inflation-calculator", anchor: "3. Stress-test future prices" },
      ],
    },
    {
      label: "Percentage → ROI → Break-even",
      title: "Turn simple percentages into business decisions",
      description: "Use percentage math for discounts, fees and margins, measure return on cost with ROI, then calculate the sales volume needed before profit starts.",
      tools: [
        { id: "percentage-calculator", anchor: "1. Calculate the percentage" },
        { id: "roi-calculator", anchor: "2. Measure return" },
        { id: "break-even-calculator", anchor: "3. Find required sales" },
      ],
    },
  ],
  pt: [
    {
      label: "Poupar → Investir → Aposentadoria",
      title: "Construa patrimônio de baixo para cima",
      description: "Comece com um hábito realista de economia mensal, compare hipóteses de crescimento em investimentos e depois teste se o saldo futuro sustenta a meta de aposentadoria.",
      tools: [
        { id: "savings-calculator", anchor: "1. Definir hábito de poupança" },
        { id: "investment-calculator", anchor: "2. Projetar crescimento" },
        { id: "retirement-calculator", anchor: "3. Checar lacuna da aposentadoria" },
      ],
    },
    {
      label: "Empréstimo → Financiamento → Inflação",
      title: "Compare pressão de dívida e poder de compra",
      description: "Estime primeiro um empréstimo comum, avance para financiamento imobiliário quando entrada e prazo importam e use inflação para testar preços futuros.",
      tools: [
        { id: "loan-calculator", anchor: "1. Estimar pressão da parcela" },
        { id: "mortgage-calculator", anchor: "2. Incluir entrada e prazo" },
        { id: "inflation-calculator", anchor: "3. Testar preços futuros" },
      ],
    },
    {
      label: "Porcentagem → ROI → Ponto de equilíbrio",
      title: "Transforme porcentagens em decisões de negócio",
      description: "Use porcentagem para descontos, taxas e margens, meça retorno sobre custo com ROI e calcule o volume necessário antes do lucro começar.",
      tools: [
        { id: "percentage-calculator", anchor: "1. Calcular porcentagem" },
        { id: "roi-calculator", anchor: "2. Medir retorno" },
        { id: "break-even-calculator", anchor: "3. Encontrar vendas mínimas" },
      ],
    },
  ],
};

const derivedLandingOpportunities = {
  en: {
    title: "Derived landing page opportunities",
    description: "These are the strongest long-tail intents to test as dedicated pages after the core calculators start getting impressions.",
    items: [
      "percentage calculator for discounts",
      "mortgage calculator with down payment",
      "compound interest calculator with monthly contributions",
      "retirement savings gap calculator",
      "marketing ROI calculator",
    ],
  },
  pt: {
    title: "Oportunidades de landings derivadas",
    description: "Estas são as intenções long-tail mais fortes para testar como páginas dedicadas depois que as calculadoras principais começarem a receber impressões.",
    items: [
      "calculadora de porcentagem para descontos",
      "calculadora de financiamento com entrada",
      "calculadora de juros compostos com aportes mensais",
      "calculadora de lacuna de aposentadoria",
      "calculadora de ROI de marketing",
    ],
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

        <section className="mt-14" id="money-journeys">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-700">
              {lang === "pt" ? "Arquitetura interna" : "Internal SEO paths"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              {lang === "pt" ? "Siga uma jornada financeira, não uma ferramenta solta" : "Follow a money journey, not a single isolated tool"}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {lang === "pt"
                ? "Estas rotas conectam calculadoras por intenção de busca e por decisão. Elas ajudam o usuário a avançar de uma pergunta inicial para a próxima comparação financeira relevante."
                : "These paths connect calculators by search intent and decision flow. They help the user move from an initial question to the next useful financial comparison."}
            </p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {seoJourneys[lang].map((journey) => (
              <article key={journey.label} className="rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/10">
                <p className="text-sm font-black text-emerald-700">{journey.label}</p>
                <h3 className="mt-3 text-xl font-black leading-tight text-slate-950">{journey.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{journey.description}</p>
                <div className="mt-5 space-y-3">
                  {journey.tools.map((item) => {
                    const tool = tools.find((entry) => entry.id === item.id);
                    return (
                      <Link
                        key={item.id}
                        href={toolHref(lang, item.id)}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 transition hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        <span>{item.anchor}</span>
                        <span className="text-xs text-slate-500">{tool ? getText(tool.title, lang) : "NexTool Money"}</span>
                      </Link>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 md:p-8" id="money-derived-landings">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">
                {lang === "pt" ? "Próximas páginas" : "Next page bets"}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                {derivedLandingOpportunities[lang].title}
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
                {derivedLandingOpportunities[lang].description}
              </p>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {derivedLandingOpportunities[lang].items.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black leading-6 text-white">
                  {item}
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

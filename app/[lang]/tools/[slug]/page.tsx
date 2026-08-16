import { notFound } from "next/navigation";

import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import ToolCard from "../../../../components/ui/ToolCard";
import ToolPageLayout from "../../../../components/layout/ToolPageLayout";
import FitnessToolAnalytics from "../../../../components/fitness/FitnessToolAnalytics";
import MoneySeoContent from "../../../../components/money/MoneySeoContent";
import MoneyToolAnalytics from "../../../../components/money/MoneyToolAnalytics";

import { categories } from "../../../../data/categories";
import { dictionary } from "../../../../data/dictionary";
import { getText } from "../../../../data/i18n";
import { tools } from "../../../../tools/registry";

import type { LanguageCode } from "../../../../data/languages";
import type { ToolDefinition } from "../../../../tools/types";

type ToolPageProps = {
  params: Promise<{
    lang: LanguageCode;
    slug: string;
  }>;
};

const baseUrl = "https://www.nextool.online";
const fitnessLandingToolIds = new Set([
  "bmi-calculator",
  "bmr-calculator",
  "calorie-calculator",
  "calorie-deficit-calculator",
  "water-intake-calculator",
  "protein-calculator",
  "ideal-weight-calculator",
  "body-fat-calculator",
  "macro-calculator",
]);

const moneyLandingToolIds = new Set([
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
]);

function getAvailableLanguages(tool: ToolDefinition): LanguageCode[] {
  return tool.availableLanguages || (Object.keys(tool.slug) as LanguageCode[]);
}

function isToolAvailableForLanguage(
  tool: ToolDefinition,
  lang: LanguageCode
) {
  return getAvailableLanguages(tool).includes(lang);
}

function getRelatedTools(currentTool: ToolDefinition, lang: LanguageCode) {
  const manualRelatedTools =
    currentTool.relatedTools
      ?.map((relatedToolId: string) =>
        tools.find((tool) => tool.id === relatedToolId)
      )
      .filter((tool): tool is ToolDefinition => Boolean(tool)) || [];

  const fallbackRelatedTools = tools.filter(
    (tool) =>
      tool.id !== currentTool.id && tool.category === currentTool.category
  );

  const candidates =
    manualRelatedTools.length > 0 ? manualRelatedTools : fallbackRelatedTools;

  return candidates.filter((tool) => isToolAvailableForLanguage(tool, lang));
}

export function generateStaticParams() {
  return tools.flatMap((tool) => {
    const availableLanguages = getAvailableLanguages(tool);

    return availableLanguages.map((language) => ({
      lang: language,
      slug: getText(tool.slug, language),
    }));
  });
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { lang, slug } = await params;

  

  const tool = tools.find(
    (tool) =>
      isToolAvailableForLanguage(tool, lang) &&
      getText(tool.slug, lang) === slug
  );

  if (!tool) {
    return {
      title: "Tool not found - Nextool",
    };
  }

  const canonicalUrl = `${baseUrl}/${lang}/tools/${slug}`;

  const languages = Object.fromEntries(
    getAvailableLanguages(tool).map((language) => [
      language,
      `${baseUrl}/${language}/tools/${getText(tool.slug, language)}`,
    ])
  );

  return {
    title: getText(tool.seo.title, lang),
    description: getText(tool.seo.description, lang),

    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { lang, slug } = await params;

  const tool = tools.find(
    (tool) =>
      isToolAvailableForLanguage(tool, lang) &&
      getText(tool.slug, lang) === slug
  );

  if (!tool) {
    notFound();
  }

  const category = categories.find((category) => category.id === tool.category);

  const Calculator = tool.component;

  const pageUrl = `${baseUrl}/${lang}/tools/${slug}`;
  const toolName = getText(tool.title, lang);
  const toolDescription = getText(tool.description, lang);
  const categoryName = category ? getText(category.name, lang) : tool.category;
  const relatedTools = getRelatedTools(tool, lang);
  const isFitnessLandingTool = fitnessLandingToolIds.has(tool.id);
  const isMoneyLandingTool = moneyLandingToolIds.has(tool.id);

  const languageUrls = Object.fromEntries(
    getAvailableLanguages(tool).map((language) => [
      language,
      `/${language}/tools/${getText(tool.slug, language)}`,
    ])
  );

  const breadcrumbs = [
    {
      label: getText(dictionary.homeLabel, lang),
      href: `/${lang}`,
    },
    {
      label: categoryName,
      href: `/${lang}/categories/${tool.category}`,
    },
    {
      label: toolName,
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : pageUrl,
    })),
  };

  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolName,
    description: toolDescription,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd =
    tool.faq && tool.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",

           mainEntity: tool.faq.map(
           (item: NonNullable<typeof tool.faq>[number]) => ({
            "@type": "Question",

            name: getText(item.question, lang),

            acceptedAnswer: {
              "@type": "Answer",
              text: getText(item.answer, lang),
            },
        } )),
        }
      : null;

  const relatedToolsJsonLd =
    relatedTools.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: relatedTools.map((relatedTool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: getText(relatedTool.title, lang),
            url: `${baseUrl}/${lang}/tools/${getText(
              relatedTool.slug,
              lang
            )}`,
          })),
        }
      : null;

  return (
    <ToolPageLayout
      title={toolName}
      description={toolDescription}
      lang={lang}
      languageUrls={languageUrls}
      variant={isFitnessLandingTool ? "fitness" : isMoneyLandingTool ? "money" : "default"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}

      {relatedToolsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(relatedToolsJsonLd),
          }}
        />
      )}

      {!isFitnessLandingTool && !isMoneyLandingTool && <Breadcrumbs items={breadcrumbs} />}

      {isFitnessLandingTool && <FitnessToolAnalytics lang={lang} toolId={tool.id} />}
      {isMoneyLandingTool && <MoneyToolAnalytics lang={lang} toolId={tool.id} />}

      <div id={isMoneyLandingTool ? "money-tool" : undefined}>
      <Calculator
        lang={lang}
        ui={tool.ui}
      />
      </div>

      {isMoneyLandingTool && <MoneySeoContent lang={lang} toolId={tool.id} />}

      <div className={isFitnessLandingTool ? "mt-10 rounded-[2rem] border border-sky-100 bg-white/90 p-5 text-slate-950 shadow-2xl shadow-sky-100/70 md:p-8" : isMoneyLandingTool ? "mt-10 rounded-[2rem] border border-emerald-100 bg-white/90 p-5 text-slate-950 shadow-2xl shadow-emerald-950/10 md:p-8" : ""}>
      {tool.formula && (
       <section id={isMoneyLandingTool ? "money-learn" : undefined} className={isFitnessLandingTool ? "mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-xl shadow-zinc-300/60" : isMoneyLandingTool ? "mt-10 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-xl shadow-emerald-950/10" : "mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6"}>
        <h2 className="text-2xl font-bold text-zinc-950">
          {getText(dictionary.formulaTitle, lang)}
        </h2>

        <div className="mt-4 overflow-x-auto rounded-xl bg-white p-4">
          <code className="text-lg font-bold font-mono text-zinc-900">
            {getText(tool.formula.expression, lang)}
          </code>
        </div>

        {tool.formula.explanation && (
         <div className="mt-4 text-zinc-600" dangerouslySetInnerHTML={{ __html: getText(
          tool.formula.explanation,
          lang
        ),
     }}
    />
        )}
     </section>
   )}

      <article className="mt-10 space-y-6 text-base leading-7 text-zinc-700 md:mt-12 md:leading-8">
        {tool.article.map(
         (section: (typeof tool.article)[number]) => (
          <section
            key={getText(section.heading, lang)}
            className={isFitnessLandingTool ? "rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-300/60" : ""}
          >
            <h2 className="text-2xl font-bold text-zinc-950">
              {getText(section.heading, lang)}
            </h2>

            <p className="mt-3">{getText(section.body, lang)}</p>
          </section>
         )
        )}
      </article>

      {tool.faq && tool.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-950">
            {getText(dictionary.faqTitle, lang)}
          </h2>

          <div className="mt-6 space-y-4">
            {tool.faq.map(
             (item: NonNullable<typeof tool.faq>[number]) => (
              <div
                key={getText(item.question, lang)}
                className={isFitnessLandingTool ? "rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-300/60" : "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"}
              >
                <h3 className="font-semibold text-zinc-950">
                  {getText(item.question, lang)}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {getText(item.answer, lang)}
                </p>
              </div>
              )
            )}
          </div>
        </section>
      )}

      {relatedTools.length > 0 && (
        <section id={isMoneyLandingTool ? "money-related" : undefined} className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-950">
            {getText(dictionary.relatedTools, lang)}
          </h2>

          <div className={isFitnessLandingTool || isMoneyLandingTool ? "mt-5 grid gap-4 md:grid-cols-2" : "mt-5 grid gap-6 md:grid-cols-2"}>
            {relatedTools.map((relatedTool, index) => (
              isFitnessLandingTool ? (
                <a
                  key={relatedTool.id}
                  href={`/${lang}/tools/${getText(relatedTool.slug, lang)}`}
                  className="group rounded-3xl border border-sky-200 bg-white p-5 shadow-sm shadow-sky-100/70 transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 hover:shadow-xl hover:shadow-sky-100"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-400 text-sm font-black text-zinc-950 shadow-sm shadow-emerald-900/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="min-w-0 break-words text-xl font-black leading-tight text-zinc-950">
                      {getText(relatedTool.title, lang)}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">
                    {getText(relatedTool.description, lang)}
                  </p>
                </a>
              ) : isMoneyLandingTool ? (
                <a
                  key={relatedTool.id}
                  href={`/${lang}/tools/${getText(relatedTool.slug, lang)}`}
                  className="group rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm shadow-emerald-950/5 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-xl hover:shadow-emerald-950/10"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-white shadow-sm shadow-slate-900/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="min-w-0 break-words text-xl font-black leading-tight text-slate-950">
                      {getText(relatedTool.title, lang)}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">
                    {getText(relatedTool.description, lang)}
                  </p>
                </a>
              ) : (
                <ToolCard
                  key={relatedTool.id}
                  title={getText(relatedTool.title, lang)}
                  description={getText(relatedTool.description, lang)}
                  href={`/${lang}/tools/${getText(relatedTool.slug, lang)}`}
                  category={categoryName}
                />
              )
            ))}
          </div>
        </section>
      )}
      </div>
    </ToolPageLayout>
  );
}
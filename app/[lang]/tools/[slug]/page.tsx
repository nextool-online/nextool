import { notFound } from "next/navigation";

import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import ToolCard from "../../../../components/ui/ToolCard";
import ToolPageLayout from "../../../../components/layout/ToolPageLayout";

import { categories } from "../../../../data/categories";
import { dictionary } from "../../../../data/dictionary";
import { getText } from "../../../../data/i18n";
import { tools } from "../../../../tools/registry";

import type { LanguageCode } from "../../../../data/languages";

type ToolPageProps = {
  params: Promise<{
    lang: LanguageCode;
    slug: string;
  }>;
};

const baseUrl = "https://nextool.online";

function getAvailableLanguages(tool: (typeof tools)[number]) {
  return tool.availableLanguages || Object.keys(tool.slug);
}

function isToolAvailableForLanguage(
  tool: (typeof tools)[number],
  lang: LanguageCode
) {
  return getAvailableLanguages(tool).includes(lang);
}

function getRelatedTools(
  currentTool: (typeof tools)[number],
  lang: LanguageCode
) {
  const manualRelatedTools = currentTool.relatedTools
    ?.map((relatedToolId) => tools.find((tool) => tool.id === relatedToolId))
    .filter(Boolean) as typeof tools;

  const fallbackRelatedTools = tools.filter(
    (tool) =>
      tool.id !== currentTool.id &&
      tool.category === currentTool.category
  );

  const candidates =
    manualRelatedTools.length > 0 ? manualRelatedTools : fallbackRelatedTools;

  return candidates.filter((tool) => isToolAvailableForLanguage(tool, lang));
}

export function generateStaticParams() {
  return tools.flatMap((tool) => {
    const languages = getAvailableLanguages(tool);

    return languages.map((lang) => ({
      lang,
      slug: getText(tool.slug, lang as LanguageCode),
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
      `${baseUrl}/${language}/tools/${getText(
        tool.slug,
        language as LanguageCode
      )}`,
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
  const languageUrls = Object.fromEntries(
  getAvailableLanguages(tool).map((language) => [
    language,
    `/${language}/tools/${getText(tool.slug, language as LanguageCode)}`,
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
    tool.article.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",

          mainEntity: tool.article.map((section) => ({
            "@type": "Question",
            name: getText(section.heading, lang),

            acceptedAnswer: {
              "@type": "Answer",
              text: getText(section.body, lang),
            },
          })),
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
    <ToolPageLayout  title={toolName}  description={toolDescription}  lang={lang}  languageUrls={languageUrls}>
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

      <Breadcrumbs items={breadcrumbs} />

      <Calculator lang={lang} />

      <article className="mt-10 space-y-6 text-base leading-7 text-zinc-700 md:mt-12 md:leading-8">
        {tool.article.map((section) => (
          <section key={getText(section.heading, lang)}>
            <h2 className="text-2xl font-bold text-zinc-950">
              {getText(section.heading, lang)}
            </h2>

            <p className="mt-3">{getText(section.body, lang)}</p>
          </section>
        ))}
      </article>

      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-950">
            {getText(dictionary.relatedTools, lang)}
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {relatedTools.map((relatedTool) => (
              <ToolCard
                key={relatedTool.id}
                title={getText(relatedTool.title, lang)}
                description={getText(relatedTool.description, lang)}
                href={`/${lang}/tools/${getText(relatedTool.slug, lang)}`}
                category={categoryName}
              />
            ))}
          </div>
        </section>
      )}
    </ToolPageLayout>
  );
}
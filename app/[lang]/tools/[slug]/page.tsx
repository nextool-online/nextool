import { notFound } from "next/navigation";

import ToolPageLayout from "../../../../components/layout/ToolPageLayout";

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

export function generateStaticParams() {
  return tools.flatMap((tool) => {
    const languages =
      tool.availableLanguages ||
      Object.keys(tool.slug);

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
      tool.availableLanguages?.includes(lang) &&
      getText(tool.slug, lang) === slug
  );

  if (!tool) {
    return {
      title: "Tool not found - Nextool",
    };
  }

  const canonicalUrl = `${baseUrl}/${lang}/tools/${slug}`;

  const alternateLanguages =
    tool.availableLanguages ||
    Object.keys(tool.slug);

  const languages = Object.fromEntries(
    alternateLanguages.map((language) => [
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
      tool.availableLanguages?.includes(lang) &&
      getText(tool.slug, lang) === slug
  );

  if (!tool) {
    notFound();
  }

  const Calculator = tool.component;

  const pageUrl = `${baseUrl}/${lang}/tools/${slug}`;

  const toolName = getText(tool.title, lang);

  const toolDescription = getText(tool.description, lang);

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

  return (
    <ToolPageLayout
      title={toolName}
      description={toolDescription}
      lang={lang}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            softwareApplicationJsonLd
          ),
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

      <Calculator lang={lang} />

      <article className="mt-10 space-y-6 text-base leading-7 text-zinc-700 md:mt-12 md:leading-8">
        {tool.article.map((section) => (
          <section
            key={getText(section.heading, lang)}
          >
            <h2 className="text-2xl font-bold text-zinc-950">
              {getText(section.heading, lang)}
            </h2>

            <p className="mt-3">
              {getText(section.body, lang)}
            </p>
          </section>
        ))}
      </article>
    </ToolPageLayout>
  );
}
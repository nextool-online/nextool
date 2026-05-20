import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import ToolCard from "../../../components/ui/ToolCard";

import { dictionary } from "../../../data/dictionary";
import { getText } from "../../../data/i18n";
import { languages } from "../../../data/languages";

import { tools } from "../../../tools/registry";

import type { LanguageCode } from "../../../data/languages";

type ToolsPageProps = {
  params: Promise<{
    lang: LanguageCode;
  }>;
};

const baseUrl = "https://nextool.online";

export function generateStaticParams() {
  return languages.map((language) => ({
    lang: language.code,
  }));
}

export async function generateMetadata({ params }: ToolsPageProps) {
  const { lang } = await params;

  const languageUrls = Object.fromEntries(
    languages.map((language) => [
      language.code,
      `${baseUrl}/${language.code}/tools`,
    ])
  );

  return {
    title: `All tools - Nextool`,
    description: getText(dictionary.homepageDescription, lang),

    alternates: {
      canonical: `${baseUrl}/${lang}/tools`,
      languages: languageUrls,
    },
  };
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { lang } = await params;

  const localizedTools = tools.filter(
    (tool) =>
      !tool.availableLanguages || tool.availableLanguages.includes(lang)
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: localizedTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getText(tool.title, lang),
      url: `${baseUrl}/${lang}/tools/${getText(tool.slug, lang)}`,
    })),
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <Navbar lang={lang} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold tracking-tight">All tools</h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-600">
          {getText(dictionary.homepageDescription, lang)}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={getText(tool.title, lang)}
              description={getText(tool.description, lang)}
              href={`/${lang}/tools/${getText(tool.slug, lang)}`}
              category={tool.category}
            />
          ))}
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
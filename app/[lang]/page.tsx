import Navbar from "../../components/layout/Navbar";
import SearchBar from "../../components/ui/SearchBar";
import ToolCard from "../../components/ui/ToolCard";

import { categories } from "../../data/categories";
import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";
import { languages } from "../../data/languages";
import Footer from "../../components/layout/Footer";
import { tools } from "../../tools/registry";

import type { LanguageCode } from "../../data/languages";

type HomePageProps = {
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

export async function generateMetadata({
  params,
}: HomePageProps) {
  const { lang } = await params;

  const canonicalUrl = `${baseUrl}/${lang}`;

  const languageUrls = Object.fromEntries(
    languages.map((language) => [
      language.code,
      `${baseUrl}/${language.code}`,
    ])
  );

  return {
    title: getText(dictionary.homepageTitle, lang),

    description: getText(
      dictionary.homepageDescription,
      lang
    ),

    alternates: {
      canonical: canonicalUrl,
      languages: languageUrls,
    },
  };
}

export default async function HomePage({
  params,
}: HomePageProps) {
  const { lang } = await params;

  const localizedTools = tools.filter(
    (tool) =>
      !tool.availableLanguages ||
      tool.availableLanguages.includes(lang)
  );

  const pageUrl = `${baseUrl}/${lang}`;

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: "Nextool",

    url: pageUrl,

    description: getText(
      dictionary.homepageDescription,
      lang
    ),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    itemListElement: localizedTools.map(
      (tool, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: getText(tool.title, lang),

        url: `${baseUrl}/${lang}/tools/${getText(
          tool.slug,
          lang
        )}`,
      })
    ),
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            websiteJsonLd
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd
          ),
        }}
      />

      <Navbar lang={lang} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold tracking-tight">
          {getText(
            dictionary.homepageTitle,
            lang
          )}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-600">
          {getText(
            dictionary.homepageDescription,
            lang
          )}
        </p>

        <SearchBar lang={lang} />

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            {getText(
              dictionary.browseByCategory,
              lang
            )}
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/${lang}/categories/${category.id}`}
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                {getText(category.name, lang)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={getText(
                tool.title,
                lang
              )}
              description={getText(
                tool.description,
                lang
              )}
              href={`/${lang}/tools/${getText(
                tool.slug,
                lang
              )}`}
              category={tool.category}
            />
          ))}
        </div>
      </section>
      <Footer lang={lang} />
    </main>
  );
}
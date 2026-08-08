import Link from "next/link";

import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import SearchBar from "../../components/ui/SearchBar";
import ToolCard from "../../components/ui/ToolCard";
import { whyNextool } from "../../data/homepage";
import { categories } from "../../data/categories";
import { dictionary } from "../../data/dictionary";
import { featuredTools } from "../../data/featuredTools";
import { getText } from "../../data/i18n";
import { languages } from "../../data/languages";

import { tools } from "../../tools/registry";

import type { LanguageCode } from "../../data/languages";

type HomePageProps = {
  params: Promise<{
    lang: LanguageCode;
  }>;
};

const baseUrl = "https://www.nextool.online";

export function generateStaticParams() {
  return languages.map((language) => ({
    lang: language.code,
  }));
}

export async function generateMetadata({ params }: HomePageProps) {
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
    description: getText(dictionary.homepageDescription, lang),

    alternates: {
      canonical: canonicalUrl,
      languages: languageUrls,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  const localizedTools = tools.filter(
    (tool) =>
      !tool.availableLanguages || tool.availableLanguages.includes(lang)
  );

  const localizedFeaturedTools = featuredTools.filter(
    (tool) =>
      !tool.availableLanguages || tool.availableLanguages.includes(lang)
  );
  
  const pageUrl = `${baseUrl}/${lang}`;

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nextool",
    url: pageUrl,
    description: getText(dictionary.homepageDescription, lang),
  };

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
          __html: JSON.stringify(websiteJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <Navbar lang={lang} />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm">
            Nextool.online
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            {getText(dictionary.homepageTitle, lang)}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
            {getText(dictionary.homepageDescription, lang)}
          </p>

          <div className="mt-8">
            <SearchBar lang={lang} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/tools`}
              className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              {getText(dictionary.viewAllTools, lang)}
            </Link>

            <Link
              href={`/${lang}/categories/calculators`}
              className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
            >
              {getText(categories[0].name, lang)}
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {getText(dictionary.featuredToolsTitle, lang)}
              </h2>

              <p className="mt-2 text-zinc-600">
                {getText(dictionary.homepageDescription, lang)}
              </p>
            </div>

            <Link
              href={`/${lang}/tools`}
              className="hidden text-sm font-semibold text-zinc-600 hover:text-zinc-950 md:block"
            >
              {getText(dictionary.viewAllTools, lang)}
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {localizedFeaturedTools.map((tool) => (
          <ToolCard
                key={tool.id}
                title={getText(tool.title, lang)}
                description={getText(tool.description, lang)}
                href={`/${lang}/tools/${getText(tool.slug, lang)}`}
                category={tool.category}
                 />
            ))}
         </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight">
                {getText(dictionary.popularCategoriesTitle, lang)}
            </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${lang}/categories/${category.id}`}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
              >
                <p className="text-lg font-bold text-zinc-950">
                  {getText(category.title, lang)}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {getText(category.description, lang)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {getText(dictionary.whyNextoolTitle, lang)}
            </h2>

            <p className="mt-3 text-zinc-600">
              {getText(dictionary.whyNextoolDescription, lang)}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyNextool.map((item) => (
              <div
                key={getText(item.title, lang)}
                className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
              >
                <h3 className="font-semibold text-zinc-950">
                  {getText(item.title, lang)}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {getText(item.description, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    
      <Footer lang={lang} />
    </main>
  );
}
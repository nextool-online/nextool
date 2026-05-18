import { notFound } from "next/navigation";

import ToolPageLayout from "../../../../components/layout/ToolPageLayout";
import ToolCard from "../../../../components/ui/ToolCard";

import { categories } from "../../../../data/categories";
import { getText } from "../../../../data/i18n";
import { languages as languagesList } from "../../../../data/languages";

import { tools } from "../../../../tools/registry";

import type { LanguageCode } from "../../../../data/languages";

type CategoryPageProps = {
  params: Promise<{
    lang: LanguageCode;
    slug: string;
  }>;
};

const baseUrl = "https://nextool.online";

export function generateStaticParams() {
  return languagesList.flatMap((language) =>
    categories.map((category) => ({
      lang: language.code,
      slug: category.id,
    }))
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { lang, slug } = await params;

  const category = categories.find((item) => item.id === slug);

  if (!category) {
    return {
      title: "Category not found - Nextool",
    };
  }

  const canonicalUrl = `${baseUrl}/${lang}/categories/${slug}`;

  const languages = Object.fromEntries(
    languagesList.map((language) => [
      language.code,
      `${baseUrl}/${language.code}/categories/${slug}`,
    ])
  );

  return {
    title: getText(category.seo.title, lang),
    description: getText(category.seo.description, lang),

    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, slug } = await params;

  const category = categories.find((item) => item.id === slug);

  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(
    (tool) =>
      tool.category === category.id &&
      (!tool.availableLanguages || tool.availableLanguages.includes(lang))
  );

  const categoryTitle = getText(category.title, lang);
  const categoryDescription = getText(category.description, lang);

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryTitle,
    description: categoryDescription,
    url: `${baseUrl}/${lang}/categories/${slug}`,
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categoryTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getText(tool.title, lang),
      url: `${baseUrl}/${lang}/tools/${getText(tool.slug, lang)}`,
    })),
  };

  return (
    <ToolPageLayout title={categoryTitle} description={categoryDescription} lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {categoryTools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={getText(tool.title, lang)}
            description={getText(tool.description, lang)}
            href={`/${lang}/tools/${getText(tool.slug, lang)}`}
            category={getText(category.name, lang)}
          />
        ))}
      </div>
    </ToolPageLayout>
  );
}
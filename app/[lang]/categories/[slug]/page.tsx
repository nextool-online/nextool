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

    const canonicalUrl = `https://nextool.online/${lang}/categories/${slug}`;

    const languages = Object.fromEntries(
    languagesList.map((language) => [
      language.code,
      `https://nextool.online/${language.code}/categories/${slug}`,
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

  const filteredTools = tools.filter((tool) => tool.category === category.id);

  return (
    <ToolPageLayout
      title={getText(category.title, lang)}
      description={getText(category.description, lang)}
      lang={lang}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {filteredTools.map((tool) => (
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
import ToolPageLayout from "../../../../components/layout/ToolPageLayout";
import ToolCard from "../../../../components/ui/ToolCard";

import { categories } from "../../../../data/categories";
import { tools } from "../../../../tools/registry";
import { getText } from "../../../../data/i18n";

import type { LanguageCode } from "../../../../data/languages";

type CategoryPageProps = {
  params: Promise<{
    lang: LanguageCode;
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, slug } = await params;

  const category = categories.find((category) => category.id === slug);

  const filteredTools = tools.filter((tool) => tool.category === slug);

  return (
    <ToolPageLayout
      title={category ? getText(category.name, lang) : slug}
      description={`Browse ${category ? getText(category.name, lang) : slug}.`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={getText(tool.title, lang)}
            description={getText(tool.description, lang)}
            href={`/${lang}/tools/${getText(tool.slug, lang)}`}
            category={tool.category}
          />
        ))}
      </div>
    </ToolPageLayout>
  );
}
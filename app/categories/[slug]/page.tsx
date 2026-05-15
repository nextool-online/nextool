import ToolPageLayout from "../../../components/layout/ToolPageLayout";
import ToolCard from "../../../components/ui/ToolCard";

import { tools } from "../../../data/tools";
import { getText } from "../../../data/i18n";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const language = "en";

  const categoryName = slug.replace(/-/g, " ").toLowerCase();

  const filteredTools = tools.filter(
    (tool) => tool.category.toLowerCase() === categoryName
  );

  return (
    <ToolPageLayout
      title={slug.replace(/-/g, " ")}
      description={`Browse all ${slug.replace(/-/g, " ")} tools.`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={getText(tool.title, language)}
            description={getText(tool.description, language)}
            href={`/tools/${getText(tool.slug, language)}`}
            category={tool.category}
          />
        ))}
      </div>
    </ToolPageLayout>
  );
}
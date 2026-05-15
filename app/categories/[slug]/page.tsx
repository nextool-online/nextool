import ToolPageLayout from "../../../components/layout/ToolPageLayout";
import ToolCard from "../../../components/ui/ToolCard";
import { tools } from "../../../data/tools";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categoryName = slug.replace(/-/g, " ").toLowerCase();

  const filteredTools = tools.filter(
    (tool) => tool.category?.toLowerCase() === categoryName
  );

  return (
    <ToolPageLayout
      title={slug.replace(/-/g, " ")}
      description={`Browse all ${slug.replace(/-/g, " ")} tools.`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.href}
            title={tool.title}
            description={tool.description}
            href={tool.href}
            category={tool.category}
          />
        ))}
      </div>
    </ToolPageLayout>
  );
}
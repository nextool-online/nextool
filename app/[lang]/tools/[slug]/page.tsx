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
export function generateStaticParams() {
  return tools.flatMap((tool) =>
    Object.entries(tool.slug).map(([lang, slug]) => ({
      lang,
      slug,
    }))
  );
}
export async function generateMetadata({ params }: ToolPageProps) {
  const { lang, slug } = await params;

  const tool = tools.find((tool) => getText(tool.slug, lang) === slug);

  if (!tool) {
    return {
      title: "Tool not found - Nextool",
    };
  }

  return {
    title: getText(tool.seo.title, lang),
    description: getText(tool.seo.description, lang),
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { lang, slug } = await params;

  const tool = tools.find((tool) => getText(tool.slug, lang) === slug);

  if (!tool) {
    notFound();
  }

  const Calculator = tool.component;

  return (
    <ToolPageLayout
      title={getText(tool.title, lang)}
      description={getText(tool.description, lang)}
      lang={lang}
    >
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
    </ToolPageLayout>
  );
}
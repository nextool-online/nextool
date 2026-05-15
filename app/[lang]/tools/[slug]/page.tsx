import { notFound } from "next/navigation";

import ToolPageLayout from "../../../../components/layout/ToolPageLayout";
import RuleOfThreeCalculator from "../../../../components/tools/rule-of-three/RuleOfThreeCalculator";
import PercentageCalculator from "../../../../components/tools/percentage-calculator/PercentageCalculator";

import { tools } from "../../../../data/tools";
import { getText } from "../../../../data/i18n";

import type { LanguageCode } from "../../../../data/languages";

type ToolPageProps = {
  params: Promise<{
    lang: LanguageCode;
    slug: string;
  }>;
};

type CalculatorProps = {
  lang: LanguageCode;
};

const toolComponents: Record<string, React.ComponentType<CalculatorProps>> = {
  "rule-of-three": RuleOfThreeCalculator,
  "percentage-calculator": PercentageCalculator,
};

export default async function ToolPage({ params }: ToolPageProps) {
  const { lang, slug } = await params;

  const tool = tools.find((tool) => getText(tool.slug, lang) === slug);

  if (!tool) {
    notFound();
  }

  const Calculator = toolComponents[tool.id];

  if (!Calculator) {
    notFound();
  }

  return (
    <ToolPageLayout
      title={getText(tool.title, lang)}
      description={getText(tool.description, lang)}
      lang={lang}
    >
      <Calculator lang={lang} />

      <article className="mt-10 space-y-5 text-base leading-7 text-zinc-700 md:mt-12 md:space-y-6 md:leading-8">
        <h2 className="text-2xl font-bold text-zinc-950">About this tool</h2>

        <p>
          This tool helps you complete quick calculations directly in your
          browser. It is fast, simple and free to use.
        </p>
      </article>
    </ToolPageLayout>
  );
}
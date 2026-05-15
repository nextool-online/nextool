import ToolPageLayout from "../../../components/layout/ToolPageLayout";
import RuleOfThreeCalculator from "../../../components/tools/rule-of-three/RuleOfThreeCalculator";

export const metadata = {
  title: "Rule of Three Calculator - Nextool",
  description:
    "Calculate proportions instantly with this fast and free rule of three calculator.",
};

export default function RuleOfThreePage() {
  return (
    <ToolPageLayout
      title="Rule of Three Calculator"
      description="Find the missing value in a simple proportion."
    >
      <RuleOfThreeCalculator />

      <article className="mt-10 space-y-5 text-base leading-7 text-zinc-700 md:mt-12 md:space-y-6 md:leading-8">
        <h2 className="text-2xl font-bold text-zinc-950">
          What is the rule of three?
        </h2>

        <p>
          The rule of three is a simple mathematical method used to find an
          unknown value when three proportional values are already known.
        </p>

        <p>
          It is useful for everyday calculations involving prices, quantities,
          recipes, distances, percentages and conversions.
        </p>

        <h2 className="text-2xl font-bold text-zinc-950">
          How does the calculation work?
        </h2>

        <p>
          If A corresponds to B and C corresponds to X, then X is calculated by
          multiplying B by C and dividing the result by A.
        </p>
      </article>
    </ToolPageLayout>
  );
}
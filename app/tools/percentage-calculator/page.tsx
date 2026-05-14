import ToolPageLayout from "../../../components/ToolPageLayout";
import PercentageCalculator from "../../../components/PercentageCalculator";

export const metadata = {
  title: "Percentage Calculator - Nextool",
  description:
    "Calculate percentages instantly with this fast and free percentage calculator.",
};

export default function PercentageCalculatorPage() {
  return (
    <ToolPageLayout
      title="Percentage Calculator"
      description="Calculate percentages quickly and easily."
    >
      <PercentageCalculator />

      <article className="mt-10 space-y-5 text-base leading-7 text-zinc-700 md:mt-12 md:space-y-6 md:leading-8">
        <h2 className="text-2xl font-bold text-zinc-950">
          What is a percentage?
        </h2>

        <p>
          A percentage represents a number as a fraction of 100. It is commonly
          used to compare values, calculate discounts, measure increases and
          understand proportions.
        </p>

        <h2 className="text-2xl font-bold text-zinc-950">
          How does the calculation work?
        </h2>

        <p>
          To calculate a percentage of a value, divide the percentage by 100 and
          multiply the result by the value.
        </p>
      </article>
    </ToolPageLayout>
  );
}
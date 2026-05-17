import PercentageCalculator from "./component";
import { percentageCalculatorContent } from "./content";

export const percentageCalculatorTool = {
  id: "percentage-calculator",
  category: "calculators",

  slug: percentageCalculatorContent.slug,
  title: percentageCalculatorContent.title,
  description: percentageCalculatorContent.description,
  seo: percentageCalculatorContent.seo,
  article: percentageCalculatorContent.article,

  component: PercentageCalculator,
};
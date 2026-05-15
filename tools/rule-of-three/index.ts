import RuleOfThreeCalculator from "./component";

import { ruleOfThreeContent } from "./content";

export const ruleOfThreeTool = {
  id: "rule-of-three",

  category: "calculators",

  slug: ruleOfThreeContent.slug,

  title: ruleOfThreeContent.title,

  description: ruleOfThreeContent.description,

  component: RuleOfThreeCalculator,
};
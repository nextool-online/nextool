import RuleOfThreeCalculator from "./component";
import { ruleOfThreeContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const ruleOfThreeTool: ToolDefinition = {
  id: "rule-of-three",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "rule of three",
    "proportion",
    "ratio",
    "math",
    "calculator",
    "percentage",
  ],

  relatedTools: [
  "percentage-calculator",
  "percentage-increase-calculator",
  "discount-calculator",
  "average-calculator",
  ],

  ...ruleOfThreeContent,

  component: RuleOfThreeCalculator,
};
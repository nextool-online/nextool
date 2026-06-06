import RuleOfThreeCalculator from "./component";
import { ruleOfThreeContent } from "./content";

import type { ToolDefinition } from "../types";

export const ruleOfThreeTool: ToolDefinition = {
  id: "rule-of-three",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: [
    "en",
    "it",
    "pt",
    "es",
    
  ],

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
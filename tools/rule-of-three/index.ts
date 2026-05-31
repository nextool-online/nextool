import RuleOfThreeCalculator from "./component";
import { ruleOfThreeContent } from "./content";

import type { ToolDefinition } from "../types";

export const ruleOfThreeTool: ToolDefinition = {
  id: "rule-of-three",

  category: "calculators",
  featured: true,

  availableLanguages: [
    "en",
    "it",
    "pt",
    "es",
    "fr",
    "de",
    "ro",
    "pl",
    "nl",
    "tr",
    "ar",
  ],

  relatedTools: ["percentage-calculator"],

  ...ruleOfThreeContent,

  component: RuleOfThreeCalculator,
};
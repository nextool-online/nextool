import RuleOfThreeCalculator from "./component";

import { ruleOfThreeContent as ruleOfThreeContentEn } from "./content.en";
import { ruleOfThreeContent as ruleOfThreeContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const ruleOfThreeContent =
  mergeToolContent(
    ruleOfThreeContentEn,
    ruleOfThreeContentPt
  );

export const ruleOfThreeTool: ToolDefinition = {
  id: "rule-of-three",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "rule of three",
    "proportion",
    "ratio",
    "percentage",
    "math",
    "calculation",
    "calculator",
  ],

  relatedTools: [
    "percentage-calculator",
    "percentage-increase-calculator",
    "average-calculator",
  ],

  ...ruleOfThreeContent,

  component: RuleOfThreeCalculator,
};
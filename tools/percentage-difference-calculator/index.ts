import PercentageDifferenceCalculatorTool from "./component";
import { percentageDifferenceCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const percentageDifferenceCalculatorTool: ToolDefinition = {
  id: "percentage-difference-calculator",

  category: "calculators",

  featured: false,

  popular: true,

  isNew: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  relatedTools: [
  "percentage-calculator",
  "percentage-increase-calculator",
  "average-calculator",
  "rule-of-three",
  ],

  tags: [
  "percentage",
  "difference",
  "comparison",
  "math",
  "calculator",
  ],

  ...percentageDifferenceCalculatorContent,

  component: PercentageDifferenceCalculatorTool,
};

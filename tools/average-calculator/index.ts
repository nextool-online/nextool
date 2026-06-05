import AverageCalculatorTool from "./component";
import { averageCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const averageCalculatorTool: ToolDefinition = {
  id: "average-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "average",
    "mean",
    "statistics",
    "math",
    "calculator",
    "numbers",
  ],

  relatedTools: [
  "percentage-difference-calculator",
  "percentage-calculator",
  "rule-of-three",
  "age-calculator",
  ],

  ...averageCalculatorContent,

  component: AverageCalculatorTool,
};
import AverageCalculatorTool from "./component";
import { averageCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const averageCalculatorTool: ToolDefinition = {
  id: "average-calculator",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["percentage-calculator"],

  ...averageCalculatorContent,

  component: AverageCalculatorTool,
};

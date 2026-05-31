import AgeCalculatorTool from "./component";
import { ageCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const ageCalculatorTool: ToolDefinition = {
  id: "age-calculator",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["bmi-calculator", "percentage-calculator"],

  ...ageCalculatorContent,

  component: AgeCalculatorTool,
};
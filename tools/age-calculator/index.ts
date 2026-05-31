import AgeCalculatorTool from "./component";
import { ageCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const ageCalculatorTool: ToolDefinition = {
  id: "age-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "age",
    "birth date",
    "date calculator",
    "years",
    "months",
    "days",
    "calculator",
  ],

  relatedTools: [
    "bmi-calculator",
    "percentage-calculator",
  ],

  ...ageCalculatorContent,

  component: AgeCalculatorTool,
};
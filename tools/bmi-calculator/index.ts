import BmiCalculatorTool from "./component";
import { bmiCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const bmiCalculatorTool: ToolDefinition = {
  id: "bmi-calculator",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["age-calculator", "unit-converter"],

  ...bmiCalculatorContent,

  component: BmiCalculatorTool,
};
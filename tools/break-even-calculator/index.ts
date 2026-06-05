import BreakEvenCalculatorTool from "./component";
import { breakEvenCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const breakEvenCalculatorTool: ToolDefinition = {
  id: "break-even-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  relatedTools: [
  "roi-calculator",
  "loan-calculator",
  "mortgage-calculator",
  "investment-calculator",
  ],

  tags: [
    "break even",
    "business",
    "profit",
    "sales",
    "finance",
    "calculator",
  ],

  ...breakEvenCalculatorContent,

  component: BreakEvenCalculatorTool,
};
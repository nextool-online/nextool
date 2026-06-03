import InvestmentCalculatorTool from "./component";
import { investmentCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const investmentCalculatorTool: ToolDefinition = {
  id: "investment-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "intermediate",

  availableLanguages: ["en"],

  relatedTools: [
    "compound-interest-calculator",
    "savings-calculator",
  ],

  tags: [
    "investment",
    "returns",
    "compound growth",
    "finance",
    "calculator",
  ],

  ...investmentCalculatorContent,

  component: InvestmentCalculatorTool,
};
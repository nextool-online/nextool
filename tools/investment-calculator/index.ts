import InvestmentCalculatorTool from "./component";
import { investmentCalculatorContent } from "./content.en";

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
  "retirement-calculator",
  "savings-calculator",
  "roi-calculator",
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
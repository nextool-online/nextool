import MortgageCalculatorTool from "./component";
import { mortgageCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const mortgageCalculatorTool: ToolDefinition = {
  id: "mortgage-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "intermediate",

   relatedTools: [
  "loan-calculator",
  "investment-calculator",
  "roi-calculator",
  "break-even-calculator",
  ],

  
  tags: [
    "mortgage",
    "home loan",
    "finance",
    "interest",
    "calculator",
    ],

  ...mortgageCalculatorContent,

  component: MortgageCalculatorTool,
  
};
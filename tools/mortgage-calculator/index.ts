import MortgageCalculatorTool from "./component";
import { mortgageCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const mortgageCalculatorTool: ToolDefinition = {
  id: "mortgage-calculator-test",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "intermediate",

   relatedTools: [
    "loan-calculator",
    "compound-interest-calculator",
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
console.log("MORTGAGE LOADED");
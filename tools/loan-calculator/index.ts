import LoanCalculatorTool from "./component";
import { loanCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const loanCalculatorTool: ToolDefinition = {
  id: "loan-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "intermediate",

  availableLanguages: ["en"],

  tags: [
    "loan",
    "finance",
    "interest",
    "mortgage",
    "calculator",
  ],

  relatedTools: [
    "percentage-calculator",
    "discount-calculator",
  ],

  ...loanCalculatorContent,

  component: LoanCalculatorTool,
};
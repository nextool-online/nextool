import LoanCalculatorTool from "./component";
import { loanCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const loanCalculatorTool: ToolDefinition = {
  id: "loan-calculator",

  category: "calculators",
  
  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["percentage-calculator"],

  ...loanCalculatorContent,

  component: LoanCalculatorTool,
};

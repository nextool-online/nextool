import CompoundInterestCalculatorTool from "./component";
import { compoundInterestCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const compoundInterestCalculatorTool: ToolDefinition = {
  id: "compound-interest-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "intermediate",

  availableLanguages: ["en"],

  tags: [
    "compound interest",
    "investment",
    "finance",
    "returns",
    "savings",
  ],

  relatedTools: [
    "loan-calculator",
    "percentage-calculator",
  ],

  ...compoundInterestCalculatorContent,

  component: CompoundInterestCalculatorTool,
};
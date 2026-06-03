import RetirementCalculatorTool from "./component";
import { retirementCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const retirementCalculatorTool: ToolDefinition = {
  id: "retirement-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "intermediate",

  availableLanguages: ["en"],

  relatedTools: [
    "investment-calculator",
    "compound-interest-calculator",
  ],

  tags: [
    "retirement",
    "pension",
    "investment",
    "savings",
    "finance",
    "calculator",
  ],

  ...retirementCalculatorContent,

  component: RetirementCalculatorTool,
};
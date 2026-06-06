import RetirementCalculatorTool from "./component";
import { retirementCalculatorContent } from "./content.en";

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
  "compound-interest-calculator",
  "investment-calculator",
  "savings-calculator",
  "roi-calculator",
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
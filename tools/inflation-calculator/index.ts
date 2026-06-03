import InflationCalculatorTool from "./component";
import { inflationCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const inflationCalculatorTool: ToolDefinition = {
  id: "inflation-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  relatedTools: [
    "savings-calculator",
    "roi-calculator",
  ],

  tags: [
    "inflation",
    "finance",
    "money",
    "future value",
    "calculator",
  ],

  ...inflationCalculatorContent,

  component: InflationCalculatorTool,
};
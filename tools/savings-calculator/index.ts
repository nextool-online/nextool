import SavingsCalculatorTool from "./component";
import { savingsCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const savingsCalculatorTool: ToolDefinition = {
  id: "savings-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "intermediate",

  availableLanguages: ["en"],

  
  tags: [
     "savings",
     "finance",
     "interest",
     "investment",
     "calculator",
     "online tool",
   ],

  relatedTools: [
  "compound-interest-calculator",
  "investment-calculator",
  "retirement-calculator",
  "roi-calculator",
  ],

  ...savingsCalculatorContent,

  component: SavingsCalculatorTool,

};

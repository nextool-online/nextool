import RoiCalculatorTool from "./component";
import { roiCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const roiCalculatorTool: ToolDefinition = {
  id: "roi-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  relatedTools: [
    "loan-calculator",
    "compound-interest-calculator",
  ],

  tags: [
    "roi",
    "return on investment",
    "investment",
    "profit",
    "finance",
    "calculator",
  ],

  ...roiCalculatorContent,

  component: RoiCalculatorTool,
};

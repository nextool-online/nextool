import RoiCalculatorTool from "./component";
import { roiCalculatorContent } from "./content.en";

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
  "investment-calculator",
  "compound-interest-calculator",
  "break-even-calculator",
  "retirement-calculator",
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

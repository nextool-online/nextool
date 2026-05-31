import TipCalculatorTool from "./component";
import { tipCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const tipCalculatorTool: ToolDefinition = {
  id: "tip-calculator",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["percentage-calculator"],

  ...tipCalculatorContent,

  component: TipCalculatorTool,
};

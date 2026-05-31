import DiscountCalculatorTool from "./component";
import { discountCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const discountCalculatorTool: ToolDefinition = {
  id: "discount-calculator",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: [
    "percentage-calculator",
    "percentage-increase-calculator",
  ],

  ...discountCalculatorContent,

  component: DiscountCalculatorTool,
};
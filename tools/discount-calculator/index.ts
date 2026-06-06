import DiscountCalculatorTool from "./component";
import { discountCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const discountCalculatorTool: ToolDefinition = {
  id: "discount-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "discount",
    "sale",
    "shopping",
    "price",
    "savings",
    "calculator",
  ],

  relatedTools: [
  "percentage-calculator",
  "percentage-increase-calculator",
  "rule-of-three",
  "tip-calculator",
  ],

  ...discountCalculatorContent,

  component: DiscountCalculatorTool,
};
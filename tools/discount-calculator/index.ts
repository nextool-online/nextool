import DiscountCalculatorTool from "./component";

import { discountCalculatorContent as discountCalculatorContentEn } from "./content.en";
import { discountCalculatorContent as discountCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const discountCalculatorContent = mergeToolContent(
  discountCalculatorContentEn,
  discountCalculatorContentPt
);

export const discountCalculatorTool: ToolDefinition = {
  id: "discount-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "discount",
    "sale",
    "price",
    "promotion",
    "savings",
    "percentage",
    "calculator",
  ],

  relatedTools: [
    "percentage-calculator",
    "percentage-increase-calculator",
    "break-even-calculator",
  ],

  ...discountCalculatorContent,

  component: DiscountCalculatorTool,
};
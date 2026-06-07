import TipCalculatorTool from "./component";

import { tipCalculatorContent as tipCalculatorContentEn } from "./content.en";
import { tipCalculatorContent as tipCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const tipCalculatorContent =
  mergeToolContent(
    tipCalculatorContentEn,
    tipCalculatorContentPt
  );

export const tipCalculatorTool: ToolDefinition = {
  id: "tip-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "tip",
    "gratuity",
    "restaurant",
    "bill",
    "service charge",
    "calculator",
  ],

  relatedTools: [
    "discount-calculator",
    "percentage-calculator",
    "roi-calculator",
  ],

  ...tipCalculatorContent,

  component: TipCalculatorTool,
};
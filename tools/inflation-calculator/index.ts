import InflationCalculatorTool from "./component";

import { inflationCalculatorContent as inflationCalculatorContentEn } from "./content.en";
import { inflationCalculatorContent as inflationCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const inflationCalculatorContent = mergeToolContent(
  inflationCalculatorContentEn,
  inflationCalculatorContentPt
);

export const inflationCalculatorTool: ToolDefinition = {
  id: "inflation-calculator",

  category: "finance",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "inflation",
    "purchasing power",
    "future value",
    "prices",
    "economy",
    "finance",
    "calculator",
  ],

  relatedTools: [
    "investment-calculator",
    "compound-interest-calculator",
    "retirement-calculator",
  ],

  ...inflationCalculatorContent,

  component: InflationCalculatorTool,
};
import InvestmentCalculatorTool from "./component";

import { investmentCalculatorContent as investmentCalculatorContentEn } from "./content.en";
import { investmentCalculatorContent as investmentCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const investmentCalculatorContent = mergeToolContent(
  investmentCalculatorContentEn,
  investmentCalculatorContentPt
);

export const investmentCalculatorTool: ToolDefinition = {
  id: "investment-calculator",

  category: "finance",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "investment",
    "portfolio",
    "returns",
    "compound interest",
    "wealth",
    "future value",
    "calculator",
  ],

  relatedTools: [
    "compound-interest-calculator",
    "retirement-calculator",
    "roi-calculator",
  ],

  ...investmentCalculatorContent,

  component: InvestmentCalculatorTool,
};
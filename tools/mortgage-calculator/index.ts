import MortgageCalculatorTool from "./component";

import { mortgageCalculatorContent as mortgageCalculatorContentEn } from "./content.en";
import { mortgageCalculatorContent as mortgageCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const mortgageCalculatorContent = mergeToolContent(
  mortgageCalculatorContentEn,
  mortgageCalculatorContentPt
);

export const mortgageCalculatorTool: ToolDefinition = {
  id: "mortgage-calculator",

  category: "finance",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "mortgage",
    "home loan",
    "real estate",
    "house",
    "financing",
    "interest",
    "calculator",
  ],

  relatedTools: [
    "loan-calculator",
    "investment-calculator",
    "roi-calculator",
  ],

  ...mortgageCalculatorContent,

  component: MortgageCalculatorTool,
};
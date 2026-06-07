import LoanCalculatorTool from "./component";

import { loanCalculatorContent as loanCalculatorContentEn } from "./content.en";
import { loanCalculatorContent as loanCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const loanCalculatorContent = mergeToolContent(
  loanCalculatorContentEn,
  loanCalculatorContentPt
);

export const loanCalculatorTool: ToolDefinition = {
  id: "loan-calculator",

  category: "finance",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "loan",
    "financing",
    "interest",
    "monthly payment",
    "debt",
    "credit",
    "calculator",
  ],

  relatedTools: [
    "mortgage-calculator",
    "roi-calculator",
    "compound-interest-calculator",
  ],

  ...loanCalculatorContent,

  component: LoanCalculatorTool,
};
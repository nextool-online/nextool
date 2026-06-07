import RoiCalculatorTool from "./component";

import { roiCalculatorContent as roiCalculatorContentEn } from "./content.en";
import { roiCalculatorContent as roiCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const roiCalculatorContent =
  mergeToolContent(
    roiCalculatorContentEn,
    roiCalculatorContentPt
  );

export const roiCalculatorTool: ToolDefinition = {
  id: "roi-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "roi",
    "return on investment",
    "investment",
    "profit",
    "profitability",
    "returns",
    "calculator",
  ],

  relatedTools: [
    "investment-calculator",
    "compound-interest-calculator",
    "break-even-calculator",
  ],

  ...roiCalculatorContent,

  component: RoiCalculatorTool,
};
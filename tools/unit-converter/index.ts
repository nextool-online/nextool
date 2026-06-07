import UnitConverterTool from "./component";

import { unitConverterContent as unitConverterContentEn } from "./content.en";
import { unitConverterContent as unitConverterContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const unitConverterContent =
  mergeToolContent(
    unitConverterContentEn,
    unitConverterContentPt
  );

export const unitConverterTool: ToolDefinition = {
  id: "unit-converter",

  category: "converters",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "converter",
    "units",
    "length",
    "weight",
    "metric",
    "imperial",
    "measurements",
  ],

  relatedTools: [
    "speed-converter",
    "data-size-converter",
    "rule-of-three",
  ],

  ...unitConverterContent,

  component: UnitConverterTool,
};
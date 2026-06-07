import SpeedConverterTool from "./component";

import { speedConverterContent as speedConverterContentEn } from "./content.en";
import { speedConverterContent as speedConverterContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const speedConverterContent =
  mergeToolContent(
    speedConverterContentEn,
    speedConverterContentPt
  );

export const speedConverterTool: ToolDefinition = {
  id: "speed-converter",

  category: "converters",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "speed",
    "velocity",
    "km/h",
    "mph",
    "m/s",
    "knots",
    "converter",
  ],

  relatedTools: [
    "unit-converter",
    "data-size-converter",
    "rule-of-three",
  ],

  ...speedConverterContent,

  component: SpeedConverterTool,
};
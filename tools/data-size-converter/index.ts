import DataSizeConverterTool from "./component";

import { dataSizeConverterContent as dataSizeConverterContentEn } from "./content.en";
import { dataSizeConverterContent as dataSizeConverterContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const dataSizeConverterContent = mergeToolContent(
  dataSizeConverterContentEn,
  dataSizeConverterContentPt
);

export const dataSizeConverterTool: ToolDefinition = {
  id: "data-size-converter",

  category: "converters",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "data",
    "storage",
    "bytes",
    "kilobytes",
    "megabytes",
    "gigabytes",
    "converter",
  ],

  relatedTools: [
    "unit-converter",
    "speed-converter",
  ],

  ...dataSizeConverterContent,

  component: DataSizeConverterTool,
};
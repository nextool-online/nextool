import DataSizeConverterTool from "./component";
import { dataSizeConverterContent } from "./content";

import type { ToolDefinition } from "../types";

export const dataSizeConverterTool: ToolDefinition = {
  id: "data-size-converter",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "data size",
    "storage",
    "kb",
    "mb",
    "gb",
    "tb",
    "converter",
  ],

  relatedTools: [
    "unit-converter",
    "speed-converter",
  ],

  ...dataSizeConverterContent,

  component: DataSizeConverterTool,
};
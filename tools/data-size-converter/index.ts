import DataSizeConverterTool from "./component";
import { dataSizeConverterContent } from "./content";

import type { ToolDefinition } from "../types";

export const dataSizeConverterTool: ToolDefinition = {
  id: "data-size-converter",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["percentage-calculator"],

  ...dataSizeConverterContent,

  component: DataSizeConverterTool,
};

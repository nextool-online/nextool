import SpeedConverterTool from "./component";
import { speedConverterContent } from "./content";

import type { ToolDefinition } from "../types";

export const speedConverterTool: ToolDefinition = {
  id: "speed-converter",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["percentage-calculator"],

  ...speedConverterContent,

  component: SpeedConverterTool,
};

import SpeedConverterTool from "./component";
import { speedConverterContent } from "./content";

import type { ToolDefinition } from "../types";

export const speedConverterTool: ToolDefinition = {
  id: "speed-converter",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "speed",
    "converter",
    "kmh",
    "mph",
    "knots",
    "meters per second",
  ],

  relatedTools: [
    "unit-converter",
    "data-size-converter",
  ],

  ...speedConverterContent,

  component: SpeedConverterTool,
};
import UnitConverterTool from "./component";
import { unitConverterContent } from "./content";

import type { ToolDefinition } from "../types";

export const unitConverterTool: ToolDefinition = {
  id: "unit-converter",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "unit converter",
    "conversion",
    "length",
    "weight",
    "measurement",
    "calculator",
  ],

  relatedTools: [
    "bmi-calculator",
    "speed-converter",
  ],

  ...unitConverterContent,

  component: UnitConverterTool,
};
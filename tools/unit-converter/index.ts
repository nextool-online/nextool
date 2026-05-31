import UnitConverterTool from "./component";
import { unitConverterContent } from "./content";

import type { ToolDefinition } from "../types";

export const unitConverterTool: ToolDefinition = {
  id: "unit-converter",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: ["bmi-calculator", "age-calculator"],

  ...unitConverterContent,

  component: UnitConverterTool,
};
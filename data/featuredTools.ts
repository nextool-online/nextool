import { tools } from "../tools/registry";

const featuredIds = [
  "percentage-calculator",
  "rule-of-three",
  "loan-calculator",
  "bmi-calculator",
  "age-calculator",
  "unit-converter",
];

export const featuredTools = tools.filter((tool) =>
  featuredIds.includes(tool.id)
);
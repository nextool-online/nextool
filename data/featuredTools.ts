import { tools } from "../tools/registry";

const featuredIds = [
  
  
  "loan-calculator",
  "compound-interest-calculator",
  "savings-calculator",
  "percentage-calculator",
  "age-calculator",
  "unit-converter",
];

export const featuredTools = tools.filter((tool) =>
  featuredIds.includes(tool.id)
);
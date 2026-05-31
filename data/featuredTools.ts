import { tools } from "../tools/registry";

export const featuredTools = tools.filter(
  (tool) => tool.featured
);
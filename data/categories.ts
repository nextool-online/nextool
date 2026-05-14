import { tools } from "./tools";

export const categories = [
  ...new Set(
    tools
      .map((tool) => tool.category)
      .filter(Boolean)
  ),
];
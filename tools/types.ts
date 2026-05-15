import type { ComponentType } from "react";

export type ToolComponentProps = {
  lang: string;
};

export type ToolDefinition = {
  id: string;
  category: string;

  slug: {
    en: string;
  };

  title: {
    en: string;
  };

  description: {
    en: string;
  };

  component: ComponentType<ToolComponentProps>;
};
import type { ComponentType } from "react";

export type ToolComponentProps = {
  lang: string;
};

export type Translation = {
  en: string;
  [key: string]: string;
};

export type ToolArticleSection = {
  heading: Translation;
  body: Translation;
};

export type ToolDefinition = {
  id: string;
  category: string;

  slug: Translation;
  title: Translation;
  description: Translation;

  seo: {
    title: Translation;
    description: Translation;
  };

  article: ToolArticleSection[];

  component: ComponentType<ToolComponentProps>;
};
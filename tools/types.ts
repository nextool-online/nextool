import type { ComponentType } from "react";

import type { LanguageCode } from "../data/languages";

export type Translation = {
  en: string;
  [key: string]: string;
};

export type ToolComponentProps = {
  lang: LanguageCode;
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
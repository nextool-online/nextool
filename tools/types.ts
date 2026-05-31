import type { ComponentType } from "react";
import type { LanguageCode } from "../data/languages";

export type Translation = Partial<Record<LanguageCode, string>>;

export type ToolComponentProps = {
  lang: LanguageCode;
};

export type ToolArticleSection = {
  heading: Translation;
  body: Translation;
};

export type ToolSeo = {
  title: Translation;
  description: Translation;
};

export type ToolUi = Record<string, Translation>;

export type ToolDefinition = {
  id: string;

  category: string;

  featured?: boolean;

  availableLanguages?: LanguageCode[];

  relatedTools?: string[];

  slug: Translation;

  title: Translation;

  description: Translation;

  seo: ToolSeo;

  article: ToolArticleSection[];

  ui: ToolUi;

  component: ComponentType<ToolComponentProps>;
};
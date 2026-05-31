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

export type ToolFaqItem = {
  question: Translation;
  answer: Translation;
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

  popular?: boolean;

  isNew?: boolean;

  difficulty?: "basic" | "intermediate" | "advanced";

  availableLanguages?: LanguageCode[];

  relatedTools?: string[];

  tags?: string[];

  slug: Translation;

  title: Translation;

  description: Translation;

  seo: ToolSeo;

  article: ToolArticleSection[];

  faq?: ToolFaqItem[];

  ui: ToolUi;

  component: ComponentType<ToolComponentProps>;
};
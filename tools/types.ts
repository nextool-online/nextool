import type { ComponentType } from "react";
import type { LanguageCode } from "../data/languages";

export type Translation = Partial<Record<LanguageCode, string>>;

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

export type ToolFormula = {
  expression: Translation;
  explanation?: Translation;
};

export type ToolAdvancedSeoItem = {
  title: Translation;
  description: Translation;
};

export type ToolAdvancedSeoExample = {
  title: Translation;
  description: Translation;
  calculation?: Translation;
};

export type ToolComparisonTable = {
  title: Translation;
  headers: Translation[];
  rows: Translation[][];
};

export type ToolAdvancedSeo = {
  examples?: ToolAdvancedSeoExample[];
  useCases?: ToolAdvancedSeoItem[];
  commonMistakes?: ToolAdvancedSeoItem[];
  comparisonTable?: ToolComparisonTable;
  steps?: ToolAdvancedSeoItem[];
  resultInsights?: ToolAdvancedSeoItem[];
  relatedQueries?: Translation[];
  localizedUnits?: ToolAdvancedSeoItem[];
  monetizationBlocks?: ToolAdvancedSeoItem[];
  leadMagnet?: ToolAdvancedSeoItem;
  schemaType?: string;
};

export type ToolUi = Record<string, Translation>;

export type ToolComponentProps = {
  lang: LanguageCode;
  ui?: ToolUi;
};

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

  advancedSeo?: ToolAdvancedSeo;

  faq?: ToolFaqItem[];

  formula?: ToolFormula;

  ui: ToolUi;

  component: ComponentType<ToolComponentProps>;
};
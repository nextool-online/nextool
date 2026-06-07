import type {
  ToolArticleSection,
  ToolFaqItem,
  ToolFormula,
  ToolUi,
} from "./types";

type ToolContent = {
  slug: Record<string, string>;
  title: Record<string, string>;
  description: Record<string, string>;

  seo: {
    title: Record<string, string>;
    description: Record<string, string>;
  };

  article?: ToolArticleSection[];

  faq?: ToolFaqItem[];

  formula?: ToolFormula;

  ui?: ToolUi;
};

export function mergeToolContent(...contents: ToolContent[]) {
  const base = contents[0];

  const merged = {
    ...base,

    slug: {},
    title: {},
    description: {},

    seo: {
      title: {},
      description: {},
    },

    article: [] as ToolArticleSection[],
    faq: [] as ToolFaqItem[],

    formula: undefined as ToolFormula | undefined,

    ui: {} as ToolUi,
  };

  for (const content of contents) {
    Object.assign(merged.slug, content.slug);
    Object.assign(merged.title, content.title);
    Object.assign(merged.description, content.description);

    Object.assign(merged.seo.title, content.seo.title);
    Object.assign(merged.seo.description, content.seo.description);

    if (content.formula) {
      merged.formula = {
        expression: {
          ...(merged.formula?.expression || {}),
          ...content.formula.expression,
        },

        explanation: {
          ...(merged.formula?.explanation || {}),
          ...(content.formula.explanation || {}),
        },
      };
    }

    if (content.ui) {
      for (const key of Object.keys(content.ui)) {
        merged.ui[key] = {
          ...(merged.ui[key] || {}),
          ...content.ui[key],
        };
      }
    }

    if (content.article) {
      content.article.forEach((section, index) => {
        if (!merged.article[index]) {
          merged.article[index] = {
            heading: {},
            body: {},
          };
        }

        Object.assign(
          merged.article[index].heading,
          section.heading
        );

        Object.assign(
          merged.article[index].body,
          section.body
        );
      });
    }

    if (content.faq) {
      content.faq.forEach((item, index) => {
        if (!merged.faq[index]) {
          merged.faq[index] = {
            question: {},
            answer: {},
          };
        }

        Object.assign(
          merged.faq[index].question,
          item.question
        );

        Object.assign(
          merged.faq[index].answer,
          item.answer
        );
      });
    }
  }

  return merged;
}
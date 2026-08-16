import type {
  ToolAdvancedSeo,
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

  advancedSeo?: ToolAdvancedSeo;

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
    advancedSeo: undefined as ToolAdvancedSeo | undefined,
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

    if (content.advancedSeo) {
      merged.advancedSeo = {
        ...(merged.advancedSeo || {}),
        schemaType: content.advancedSeo.schemaType || merged.advancedSeo?.schemaType,
        leadMagnet: content.advancedSeo.leadMagnet || merged.advancedSeo?.leadMagnet,
      };

      const mergeItems = <T extends { title: Record<string, string>; description: Record<string, string>; calculation?: Record<string, string> }>(
        key: "examples" | "useCases" | "commonMistakes" | "steps" | "resultInsights" | "localizedUnits" | "monetizationBlocks"
      ) => {
        const items = content.advancedSeo?.[key] as T[] | undefined;
        if (!items) return;
        const current = ((merged.advancedSeo?.[key] || []) as T[]).slice();
        items.forEach((item, index) => {
          current[index] = {
            ...(current[index] || {}),
            ...item,
            title: {
              ...(current[index]?.title || {}),
              ...item.title,
            },
            description: {
              ...(current[index]?.description || {}),
              ...item.description,
            },
            calculation: item.calculation || current[index]?.calculation
              ? {
                  ...(current[index]?.calculation || {}),
                  ...(item.calculation || {}),
                }
              : undefined,
          } as T;
        });
        (merged.advancedSeo as ToolAdvancedSeo)[key] = current as never;
      };

      mergeItems("examples");
      mergeItems("useCases");
      mergeItems("commonMistakes");
      mergeItems("steps");
      mergeItems("resultInsights");
      mergeItems("localizedUnits");
      mergeItems("monetizationBlocks");

      if (content.advancedSeo.comparisonTable) {
        const current = merged.advancedSeo.comparisonTable;
        merged.advancedSeo.comparisonTable = {
          ...current,
          ...content.advancedSeo.comparisonTable,
          title: {
            ...(current?.title || {}),
            ...content.advancedSeo.comparisonTable.title,
          },
          headers: content.advancedSeo.comparisonTable.headers.map((header, index) => ({
            ...(current?.headers?.[index] || {}),
            ...header,
          })),
          rows: content.advancedSeo.comparisonTable.rows.map((row, rowIndex) =>
            row.map((cell, cellIndex) => ({
              ...(current?.rows?.[rowIndex]?.[cellIndex] || {}),
              ...cell,
            }))
          ),
        };
      }

      if (content.advancedSeo.relatedQueries) {
        merged.advancedSeo.relatedQueries = content.advancedSeo.relatedQueries.map((query, index) => ({
          ...(merged.advancedSeo?.relatedQueries?.[index] || {}),
          ...query,
        }));
      }
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
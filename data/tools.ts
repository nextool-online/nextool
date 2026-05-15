import type { LanguageCode } from "./languages";

type Translation = Partial<Record<LanguageCode, string>>;

export const tools = [
  {
    id: "percentage-calculator",

    category: "Calculators",

    slug: {
      en: "percentage-calculator",
      it: "calcolatore-percentuale",
      pt: "calculadora-porcentagem",
      es: "calculadora-porcentaje",
    } satisfies Translation,

    title: {
      en: "Percentage Calculator",
      it: "Calcolatore Percentuale",
      pt: "Calculadora de Porcentagem",
      es: "Calculadora de Porcentaje",
    } satisfies Translation,

    description: {
      en: "Quick percentage calculations.",
      it: "Calcoli percentuali veloci.",
      pt: "Cálculos rápidos de porcentagem.",
      es: "Cálculos rápidos de porcentaje.",
    } satisfies Translation,
  },

  {
    id: "rule-of-three",

    category: "Calculators",

    slug: {
      en: "rule-of-three",
      it: "regola-del-tre",
      pt: "regra-de-tres",
      es: "regla-de-tres",
    } satisfies Translation,

    title: {
      en: "Rule of Three",
      it: "Regola del Tre",
      pt: "Regra de Três",
      es: "Regla de Tres",
    } satisfies Translation,

    description: {
      en: "Solve proportions instantly.",
      it: "Risolvi proporzioni istantaneamente.",
      pt: "Resolva proporções instantaneamente.",
      es: "Resuelve proporciones instantáneamente.",
    } satisfies Translation,
  },
];
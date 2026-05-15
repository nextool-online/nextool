import type { LanguageCode } from "./languages";

type Translation = Partial<Record<LanguageCode, string>>;

export const toolContent = {
  "rule-of-three": {
    heading: {
      en: "What is the rule of three?",
      it: "Che cos'è la regola del tre?",
      pt: "O que é a regra de três?",
      es: "¿Qué es la regla de tres?",
    } satisfies Translation,

    body: {
      en: "The rule of three is a simple mathematical method used to find an unknown value when three proportional values are already known.",
      it: "La regola del tre è un metodo matematico semplice usato per trovare un valore sconosciuto quando sono già noti tre valori proporzionali.",
      pt: "A regra de três é um método matemático simples usado para encontrar um valor desconhecido quando três valores proporcionais já são conhecidos.",
      es: "La regla de tres es un método matemático simple usado para encontrar un valor desconocido cuando ya se conocen tres valores proporcionales.",
    } satisfies Translation,
  },

  "percentage-calculator": {
    heading: {
      en: "What is a percentage?",
      it: "Che cos'è una percentuale?",
      pt: "O que é uma porcentagem?",
      es: "¿Qué es un porcentaje?",
    } satisfies Translation,

    body: {
      en: "A percentage represents a number as a fraction of 100. It is commonly used to compare values, calculate discounts and understand proportions.",
      it: "Una percentuale rappresenta un numero come frazione di 100. È usata spesso per confrontare valori, calcolare sconti e capire proporzioni.",
      pt: "Uma porcentagem representa um número como uma fração de 100. Ela é muito usada para comparar valores, calcular descontos e entender proporções.",
      es: "Un porcentaje representa un número como una fracción de 100. Se usa con frecuencia para comparar valores, calcular descuentos y entender proporciones.",
    } satisfies Translation,
  },
};
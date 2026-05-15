import type { LanguageCode } from "./languages";

export const categories = [
  {
    id: "calculators",

    name: {
      en: "Calculators",
      it: "Calcolatori",
      pt: "Calculadoras",
      es: "Calculadoras",
      fr: "Calculatrices",
      de: "Rechner",
      ro: "Calculatoare",
      pl: "Kalkulatory",
      nl: "Rekenmachines",
      tr: "Hesaplayıcılar",
      ar: "آلات حاسبة",
    } satisfies Partial<Record<LanguageCode, string>>,
  },

  {
    id: "developer-tools",

    name: {
      en: "Developer Tools",
      it: "Strumenti per Sviluppatori",
      pt: "Ferramentas para Desenvolvedores",
      es: "Herramientas para Desarrolladores",
      fr: "Outils pour Développeurs",
      de: "Entwicklerwerkzeuge",
      ro: "Instrumente pentru Dezvoltatori",
      pl: "Narzędzia Deweloperskie",
      nl: "Ontwikkelaarstools",
      tr: "Geliştirici Araçları",
      ar: "أدوات المطورين",
    } satisfies Partial<Record<LanguageCode, string>>,
  },
];
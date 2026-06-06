export const languages = [
  { code: "en", name: "English" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "es", name: "Español" },
] as const;

export const defaultLanguage = "en";

export type LanguageCode = (typeof languages)[number]["code"];
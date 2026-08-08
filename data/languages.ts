export const languages = [
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
] as const;

export const defaultLanguage = "en";

export type LanguageCode = (typeof languages)[number]["code"];

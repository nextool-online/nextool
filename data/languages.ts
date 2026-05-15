export const languages = [
  { code: "en", name: "English" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ro", name: "Română" },
  { code: "pl", name: "Polski" },
  { code: "nl", name: "Nederlands" },
  { code: "tr", name: "Türkçe" },
  { code: "ar", name: "العربية" },
] as const;

export const defaultLanguage = "en";

export type LanguageCode = (typeof languages)[number]["code"];
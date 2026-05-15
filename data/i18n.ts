import { defaultLanguage, type LanguageCode } from "./languages";

type Translation = Partial<Record<LanguageCode, string>>;

export function getText(
  translations: Translation,
  language: LanguageCode = defaultLanguage
) {
  return translations[language] || translations[defaultLanguage] || "";
}
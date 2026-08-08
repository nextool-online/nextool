import type { LanguageCode } from "./languages";

export type MeasurementSystem = "metric" | "imperial";

export type LocaleProfile = {
  lang: LanguageCode;
  locale: string;
  measurementSystem: MeasurementSystem;
  weightUnit: "kg" | "lb";
  heightUnit: "cm" | "ft-in";
  currency: "USD" | "BRL";
};

export const localeProfiles: Record<LanguageCode, LocaleProfile> = {
  en: {
    lang: "en",
    locale: "en-US",
    measurementSystem: "imperial",
    weightUnit: "lb",
    heightUnit: "ft-in",
    currency: "USD",
  },
  pt: {
    lang: "pt",
    locale: "pt-BR",
    measurementSystem: "metric",
    weightUnit: "kg",
    heightUnit: "cm",
    currency: "BRL",
  },
};

export function getLocaleProfile(lang: LanguageCode) {
  return localeProfiles[lang] || localeProfiles.en;
}

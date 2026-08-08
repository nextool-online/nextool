import type { LanguageCode } from "../data/languages";
import { getLocaleProfile } from "../data/localeProfiles";

export function formatNumber(
  value: number,
  lang: LanguageCode,
  options?: Intl.NumberFormatOptions
) {
  const profile = getLocaleProfile(lang);
  return new Intl.NumberFormat(profile.locale, options).format(value);
}

export function formatDecimal(
  value: number,
  lang: LanguageCode,
  maximumFractionDigits = 1
) {
  return formatNumber(value, lang, {
    minimumFractionDigits: 1,
    maximumFractionDigits,
  });
}

export function formatUnit(value: number, unit: string, lang: LanguageCode) {
  return `${formatDecimal(value, lang)} ${unit}`;
}

export function formatCurrency(value: number, lang: LanguageCode) {
  const profile = getLocaleProfile(lang);
  return new Intl.NumberFormat(profile.locale, {
    style: "currency",
    currency: profile.currency,
  }).format(value);
}

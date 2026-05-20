import type { MetadataRoute } from "next";

import { categories } from "../data/categories";
import { getText } from "../data/i18n";
import { languages, type LanguageCode } from "../data/languages";
import { tools } from "../tools/registry";

const baseUrl = "https://nextool.online";

const legalPages = ["privacy", "terms", "disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageUrls = languages.map((language) => ({
    url: `${baseUrl}/${language.code}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const toolsIndexUrls = languages.map((language) => ({
    url: `${baseUrl}/${language.code}/tools`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const legalUrls = languages.flatMap((language) =>
    legalPages.map((page) => ({
      url: `${baseUrl}/${language.code}/${page}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }))
  );

  const categoryUrls = languages.flatMap((language) =>
    categories.map((category) => ({
      url: `${baseUrl}/${language.code}/categories/${category.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const toolUrls = tools.flatMap((tool) => {
    const availableLanguages: LanguageCode[] =
      tool.availableLanguages || languages.map((language) => language.code);

    return availableLanguages.map((language) => ({
      url: `${baseUrl}/${language}/tools/${getText(tool.slug, language)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
  });

  return [...homepageUrls, ...toolsIndexUrls, ...legalUrls, ...categoryUrls, ...toolUrls,];
}
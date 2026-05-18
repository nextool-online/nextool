import type { MetadataRoute } from "next";

import { categories } from "../data/categories";
import { languages } from "../data/languages";
import { tools } from "../tools/registry";
import { getText } from "../data/i18n";

const baseUrl = "https://nextool.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageUrls = languages.map((language) => ({
    url: `${baseUrl}/${language.code}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const categoryUrls = languages.flatMap((language) =>
    categories.map((category) => ({
      url: `${baseUrl}/${language.code}/categories/${category.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const toolUrls = tools.flatMap((tool) =>
    Object.entries(tool.slug).map(([language, slug]) => ({
      url: `${baseUrl}/${language}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );

  return [...homepageUrls, ...categoryUrls, ...toolUrls];
}
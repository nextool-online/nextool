"use client";

import { useState } from "react";
import Link from "next/link";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import { tools } from "../../tools/registry";

import type { LanguageCode } from "../../data/languages";

type SearchBarProps = {
  lang: LanguageCode;
};

export default function SearchBar({ lang }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const localizedTools = tools.filter(
    (tool) =>
      !tool.availableLanguages ||
      tool.availableLanguages.includes(lang)
  );

  const filteredTools = localizedTools.filter((tool) => {
    const title = getText(tool.title, lang);
    const description = getText(tool.description, lang);
    const slug = getText(tool.slug, lang);

    const tags = tool.tags?.join(" ") ?? "";

    const searchText =
     `${title} ${description} ${tool.category} ${slug} ${tags}`.toLowerCase();

    return searchText.includes(query.toLowerCase());
  });

  return (
    <div className="relative mt-8 max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={getText(dictionary.searchPlaceholder, lang)}
        className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-base font-medium outline-none transition focus:border-zinc-900"
      />

      {query && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => {
              const title = getText(tool.title, lang);
              const description = getText(tool.description, lang);
              const slug = getText(tool.slug, lang);

              return (
                <Link
                  key={tool.id}
                  href={`/${lang}/tools/${slug}`}
                  className="block border-b border-zinc-100 px-5 py-4 transition last:border-b-0 hover:bg-zinc-50"
                >
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-zinc-500">{description}</p>
                </Link>
              );
            })
          ) : (
            <p className="px-5 py-4 text-sm text-zinc-500">
              {getText(dictionary.noToolsFound, lang)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
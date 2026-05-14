"use client";

import { useState } from "react";
import Link from "next/link";
import { tools } from "../data/tools";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative mt-8 max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools..."
        className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-base font-medium outline-none transition focus:border-zinc-900"
      />

      {query && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block border-b border-zinc-100 px-5 py-4 transition last:border-b-0 hover:bg-zinc-50"
              >
                <p className="font-semibold">{tool.title}</p>
                <p className="text-sm text-zinc-500">{tool.description}</p>
              </Link>
            ))
          ) : (
            <p className="px-5 py-4 text-sm text-zinc-500">
              No tools found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
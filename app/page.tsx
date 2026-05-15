import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/ui/SearchBar";
import ToolCard from "../components/ui/ToolCard";

import { categories } from "../data/categories";
import { getText } from "../data/i18n";
import { tools } from "../data/tools";
import { dictionary } from "../data/dictionary";

export const metadata = {
  title: "Nextool - Fast Online Tools and Calculators",
  description:
    "Simple, fast and free online tools, calculators and utilities.",
};

export default function Home() {
  const language = "en";

  return (
    <main className="min-h-screen bg-zinc-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold tracking-tight">
          {getText(dictionary.homepageTitle, language)}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-600">
          {getText(dictionary.homepageDescription, language)}
        </p>

        <SearchBar lang={language} />

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            {getText(dictionary.browseByCategory, language)}
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/categories/${category.id}`}
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                {getText(category.name, language)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={getText(tool.title, language)}
              description={getText(tool.description, language)}
              href={`/tools/${getText(tool.slug, language)}`}
              category={tool.category}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
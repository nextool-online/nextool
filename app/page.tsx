import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/ui/SearchBar";
import ToolCard from "../components/ui/ToolCard";

import { tools } from "../data/tools";
import { categories } from "../data/categories";

export const metadata = {
  title: "Nextool - Fast Online Tools and Calculators",

  description:
    "Simple, fast and free online tools, calculators and utilities.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold tracking-tight">
          Fast online tools and calculators
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-600">
          Simple, fast and free utilities for developers, students and everyday
          tasks.
        </p>

        <SearchBar />

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Browse by category
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const slug = category
                ?.toLowerCase()
                .replaceAll(" ", "-");

              return (
                <a
                  key={category}
                  href={`/categories/${slug}`}
                  className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
                >
                  {category}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.href}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              category={tool.category}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
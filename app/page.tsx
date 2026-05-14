import Navbar from "../components/Navbar";
import ToolCard from "../components/ToolCard";
import { tools } from "../data/tools";
import SearchBar from "../components/SearchBar";

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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.href}
              title={tool.title}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
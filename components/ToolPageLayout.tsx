import Navbar from "./Navbar";

type ToolPageLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function ToolPageLayout({
  title,
  description,
  children,
}: ToolPageLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar />

      <section className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-16">
        <div className="mb-5 md:mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Calculator
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-600 md:text-lg md:leading-8">
            {description}
          </p>
        </div>

        {children}
      </section>
    </main>
  );
}
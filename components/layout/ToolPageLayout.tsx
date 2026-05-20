import Footer from "./Footer";
import Navbar from "./Navbar";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import type { LanguageCode } from "../../data/languages";

type ToolPageLayoutProps = {
  title: string;
  description: string;
  lang?: LanguageCode;
  children: React.ReactNode;
};

export default function ToolPageLayout({
  title,
  description,
  lang = "en",
  children,
}: ToolPageLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar lang={lang} />

      <section className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-16">
        <div className="mb-5 md:mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {getText(dictionary.calculatorLabel, lang)}
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

      <Footer lang={lang} />
    </main>
  );
}
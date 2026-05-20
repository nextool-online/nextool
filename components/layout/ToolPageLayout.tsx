import Footer from "./Footer";
import Navbar from "./Navbar";
import LanguageSwitcher from "../ui/LanguageSwitcher";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import type { LanguageCode } from "../../data/languages";

type ToolPageLayoutProps = {
  title: string;
  description: string;
  lang?: LanguageCode;
  languageUrls?: Partial<Record<LanguageCode, string>>;
  children: React.ReactNode;
};

export default function ToolPageLayout({
  title,
  description,
  lang = "en",
  languageUrls,
  children,
}: ToolPageLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar lang={lang} />

      <section className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-16">
        <div className="mb-5 md:mb-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {getText(dictionary.calculatorLabel, lang)}
            </p>

            {languageUrls && (
              <LanguageSwitcher currentLang={lang} urls={languageUrls} />
            )}
          </div>

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
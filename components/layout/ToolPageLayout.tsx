import Footer from "./Footer";
import Navbar from "./Navbar";
import FitnessFooter from "../fitness/FitnessFooter";
import FitnessHeader from "../fitness/FitnessHeader";
import LanguageSwitcher from "../ui/LanguageSwitcher";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import type { LanguageCode } from "../../data/languages";

type ToolPageLayoutProps = {
  title: string;
  description: string;
  lang?: LanguageCode;
  languageUrls?: Partial<Record<LanguageCode, string>>;
  variant?: "default" | "fitness";
  children: React.ReactNode;
};

export default function ToolPageLayout({
  title,
  description,
  lang = "en",
  languageUrls,
  variant = "default",
  children,
}: ToolPageLayoutProps) {
  if (variant === "fitness") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-950">
        <FitnessHeader lang={lang} />

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-4 inline-flex w-fit rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
                NexTool Fit
              </p>
              <h1 className="max-w-4xl bg-gradient-to-r from-sky-700 via-emerald-600 to-slate-950 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-xl md:leading-8">
                {description}
              </p>
            </div>
          </div>

          {children}
        </section>

        <FitnessFooter lang={lang} />
      </main>
    );
  }

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

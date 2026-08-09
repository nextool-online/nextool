import Link from "next/link";

import { getFitnessContent } from "../../data/fitness";

import type { LanguageCode } from "../../data/languages";

type FitnessHeaderProps = {
  lang: LanguageCode;
};

export default function FitnessHeader({ lang }: FitnessHeaderProps) {
  const content = getFitnessContent(lang);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/90 px-4 py-3 text-white backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href={`/${lang}/fitness`} className="flex items-center gap-2 font-black tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-400 text-sm text-zinc-950">
            Fit
          </span>
          <span>NexTool Fit</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-zinc-300 md:flex">
          <a href="#fitness-form" className="transition hover:text-white">
            {content.navStart}
          </a>
          <a href="#fitness-save" className="transition hover:text-white">
            {content.navProgress}
          </a>
          <a href="#fitness-next" className="transition hover:text-white">
            {content.navCalculators}
          </a>
        </nav>

        <Link
          href={`/${lang}`}
          className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
          NexTool
        </Link>
      </div>
    </header>
  );
}

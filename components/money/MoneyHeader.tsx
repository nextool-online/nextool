import Link from "next/link";

import type { LanguageCode } from "../../data/languages";

type MoneyHeaderProps = {
  lang: LanguageCode;
};

const copy = {
  en: {
    start: "Start",
    tools: "Money tools",
    learn: "Learn",
  },
  pt: {
    start: "Começar",
    tools: "Ferramentas",
    learn: "Aprender",
  },
};

export default function MoneyHeader({ lang }: MoneyHeaderProps) {
  const content = copy[lang];

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-900/10 bg-slate-950/95 px-4 py-3 text-white shadow-xl shadow-slate-950/10 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href={`/${lang}/money`} className="flex items-center gap-2 font-black tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-400 text-sm text-slate-950 shadow-lg shadow-emerald-900/20">
            $
          </span>
          <span>NexTool Money</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-300 md:flex">
          <a href="#money-tool" className="transition hover:text-white">
            {content.start}
          </a>
          <a href="#money-related" className="transition hover:text-white">
            {content.tools}
          </a>
          <a href="#money-learn" className="transition hover:text-white">
            {content.learn}
          </a>
        </nav>

        <Link
          href={`/${lang}`}
          className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          NexTool
        </Link>
      </div>
    </header>
  );
}

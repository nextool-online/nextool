import Link from "next/link";

import { dictionary } from "../../data/dictionary";
import { getFitnessContent } from "../../data/fitness";
import { getText } from "../../data/i18n";

import type { LanguageCode } from "../../data/languages";

type FitnessFooterProps = {
  lang: LanguageCode;
};

export default function FitnessFooter({ lang }: FitnessFooterProps) {
  const content = getFitnessContent(lang);

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href={`/${lang}/fitness`} className="text-xl font-black tracking-tight">
            NexTool Fit
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
            {content.footerDescription}
          </p>
        </div>

        <div className="grid gap-6 text-sm sm:grid-cols-3">
          <div>
            <p className="font-black text-white">{content.footerJourney}</p>
            <div className="mt-3 grid gap-2 text-zinc-400">
              <a href="#fitness-form" className="hover:text-white">{content.navStart}</a>
              <a href="#fitness-save" className="hover:text-white">{content.navProgress}</a>
              <a href="#fitness-next" className="hover:text-white">{content.navCalculators}</a>
            </div>
          </div>

          <div>
            <p className="font-black text-white">{getText(dictionary.legalLabel, lang)}</p>
            <div className="mt-3 grid gap-2 text-zinc-400">
              <Link href={`/${lang}/privacy`} className="hover:text-white">{getText(dictionary.privacyPolicy, lang)}</Link>
              <Link href={`/${lang}/terms`} className="hover:text-white">{getText(dictionary.termsLabel, lang)}</Link>
              <Link href={`/${lang}/disclaimer`} className="hover:text-white">{getText(dictionary.disclaimerLabel, lang)}</Link>
            </div>
          </div>

          <div>
            <p className="font-black text-white">NexTool</p>
            <div className="mt-3 grid gap-2 text-zinc-400">
              <Link href={`/${lang}`} className="hover:text-white">{getText(dictionary.homeLabel, lang)}</Link>
              <Link href={`/${lang}/tools`} className="hover:text-white">{getText(dictionary.toolsLabel, lang)}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 px-4 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} NexTool Fit. {content.footerRights}
      </div>
    </footer>
  );
}

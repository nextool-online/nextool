import Link from "next/link";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import type { LanguageCode } from "../../data/languages";

type MoneyFooterProps = {
  lang: LanguageCode;
};

const copy = {
  en: {
    description: "A focused financial workspace inside NexTool: payments, interest, ROI and practical money decisions with fast, simple calculators.",
    journey: "Money journey",
    rights: "Free estimates for planning and education.",
  },
  pt: {
    description: "Um espaço financeiro dentro do NexTool: parcelas, juros, ROI e decisões de dinheiro com calculadoras rápidas e simples.",
    journey: "Jornada financeira",
    rights: "Estimativas gratuitas para planejamento e educação.",
  },
};

export default function MoneyFooter({ lang }: MoneyFooterProps) {
  const content = copy[lang];

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href={`/${lang}/money`} className="text-xl font-black tracking-tight">
            NexTool Money
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            {content.description}
          </p>
        </div>

        <div className="grid gap-6 text-sm sm:grid-cols-3">
          <div>
            <p className="font-black text-white">{content.journey}</p>
            <div className="mt-3 grid gap-2 text-slate-400">
              <a href="#money-tool" className="hover:text-white">{lang === "pt" ? "Calcular" : "Calculate"}</a>
              <a href="#money-related" className="hover:text-white">{lang === "pt" ? "Comparar" : "Compare"}</a>
              <a href="#money-learn" className="hover:text-white">{lang === "pt" ? "Entender" : "Understand"}</a>
            </div>
          </div>

          <div>
            <p className="font-black text-white">{getText(dictionary.legalLabel, lang)}</p>
            <div className="mt-3 grid gap-2 text-slate-400">
              <Link href={`/${lang}/privacy`} className="hover:text-white">{getText(dictionary.privacyPolicy, lang)}</Link>
              <Link href={`/${lang}/terms`} className="hover:text-white">{getText(dictionary.termsLabel, lang)}</Link>
              <Link href={`/${lang}/disclaimer`} className="hover:text-white">{getText(dictionary.disclaimerLabel, lang)}</Link>
            </div>
          </div>

          <div>
            <p className="font-black text-white">NexTool</p>
            <div className="mt-3 grid gap-2 text-slate-400">
              <Link href={`/${lang}`} className="hover:text-white">{getText(dictionary.homeLabel, lang)}</Link>
              <Link href={`/${lang}/tools`} className="hover:text-white">{getText(dictionary.toolsLabel, lang)}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} NexTool Money. {content.rights}
      </div>
    </footer>
  );
}

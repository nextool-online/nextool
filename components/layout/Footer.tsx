import Link from "next/link";

import { languages, type LanguageCode } from "../../data/languages";
import { categories } from "../../data/categories";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

type FooterProps = {
  lang: LanguageCode;
};

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto]">
        <div>
          <Link href={`/${lang}`} className="text-xl font-bold text-zinc-950">
            Nextool
          </Link>

          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">
            {getText(dictionary.footerDescription, lang)}
          </p>
        </div>

        <div className="grid gap-6 text-sm md:grid-cols-3">
          <div>
            <p className="font-semibold text-zinc-950">
               {getText(dictionary.pagesLabel, lang)}
            </p>
              <Link href={`/${lang}/tools`} className="hover:text-zinc-950">
                {getText(dictionary.toolsLabel, lang)}
              </Link>
            <div className="mt-3 grid gap-2 text-zinc-600">
              <Link href={`/${lang}`} className="hover:text-zinc-950">
                {getText(dictionary.homeLabel, lang)}
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${lang}/categories/${category.id}`}
                  className="hover:text-zinc-950"
                >
                  {getText(category.name, lang)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-zinc-950">
               {getText(dictionary.legalLabel, lang)}
            </p>

            <div className="mt-3 grid gap-2 text-zinc-600">
              <Link href={`/${lang}/privacy`} className="hover:text-zinc-950">
                {getText(dictionary.privacyPolicy, lang)}
              </Link>

              <Link href={`/${lang}/terms`} className="hover:text-zinc-950">
                {getText(dictionary.termsLabel, lang)}
              </Link>

              <Link
                href={`/${lang}/disclaimer`}
                className="hover:text-zinc-950"
              >
                {getText(dictionary.disclaimerLabel, lang)}
              </Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-zinc-950">
              {getText(dictionary.languagesLabel, lang)}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-zinc-600">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={`/${language.code}`}
                  className="hover:text-zinc-950"
                >
                  {language.code.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 px-6 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Nextool. {getText(dictionary.allRightsReserved, lang)}
      </div>
    </footer>
  );
}
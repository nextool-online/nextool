import Link from "next/link";

import { languages, type LanguageCode } from "../../data/languages";

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
            Fast online tools and calculators for developers, students and
            everyday tasks.
          </p>
        </div>

        <div className="grid gap-6 text-sm md:grid-cols-3">
          <div>
            <p className="font-semibold text-zinc-950">Pages</p>

            <div className="mt-3 grid gap-2 text-zinc-600">
              <Link href={`/${lang}`} className="hover:text-zinc-950">
                Home
              </Link>

              <Link
                href={`/${lang}/categories/calculators`}
                className="hover:text-zinc-950"
              >
                Calculators
              </Link>

              <Link
                href={`/${lang}/categories/developer-tools`}
                className="hover:text-zinc-950"
              >
                Developer Tools
              </Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-zinc-950">Legal</p>

            <div className="mt-3 grid gap-2 text-zinc-600">
              <Link href={`/${lang}/privacy`} className="hover:text-zinc-950">
                Privacy Policy
              </Link>

              <Link href={`/${lang}/terms`} className="hover:text-zinc-950">
                Terms
              </Link>

              <Link
                href={`/${lang}/disclaimer`}
                className="hover:text-zinc-950"
              >
                Disclaimer
              </Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-zinc-950">Languages</p>

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
        © {new Date().getFullYear()} Nextool. All rights reserved.
      </div>
    </footer>
  );
}
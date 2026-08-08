  import Link from "next/link";

  import { languages, type LanguageCode } from "../../data/languages";

  type LanguageSwitcherProps = {
    currentLang: LanguageCode;
    urls: Partial<Record<LanguageCode, string>>;
  };

  export default function LanguageSwitcher({
    currentLang,
    urls,
  }: LanguageSwitcherProps) {
const availableLanguages = languages.filter((language) => urls[language.code]);

    if (availableLanguages.length <= 1) {
      return null;
    }

    return (
      <div className="flex flex-wrap items-center gap-2">
        {availableLanguages.map((language) => {
          const href = urls[language.code];
          const isActive = language.code === currentLang;

          if (!href) {
            return null;
          }

          return (
            <Link
              key={language.code}
              href={href}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                isActive
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950"
              }`}
            >
              {language.code.toUpperCase()}
            </Link>
          );
        })}
      </div>
    );
  }
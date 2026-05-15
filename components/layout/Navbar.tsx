import Link from "next/link";

import { categories } from "../../data/categories";
import { getText } from "../../data/i18n";

import type { LanguageCode } from "../../data/languages";

type NavbarProps = {
  lang?: LanguageCode;
};

export default function Navbar({ lang = "en" }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
      <Link href={`/${lang}`} className="text-2xl font-bold">
        Nextool
      </Link>

      <div className="flex gap-6 text-sm font-medium">
        {categories.map((category) => (
          <Link key={category.id} href={`/${lang}/categories/${category.id}`}>
            {getText(category.name, lang)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
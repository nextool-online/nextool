import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";

import { legalContent } from "../../../data/legal";
import { languages } from "../../../data/languages";

import type { LanguageCode } from "../../../data/languages";

type TermsPageProps = {
  params: Promise<{
    lang: LanguageCode;
  }>;
};

const baseUrl = "https://www.nextool.online";

export function generateStaticParams() {
  return languages.map((language) => ({
    lang: language.code,
  }));
}

export async function generateMetadata({ params }: TermsPageProps) {
  const { lang } = await params;
  const page = legalContent.terms[lang];

  const languageUrls = Object.fromEntries(
    languages.map((language) => [
      language.code,
      `${baseUrl}/${language.code}/terms`,
    ])
  );

  return {
    title: page.title,
    description: page.description,

    alternates: {
      canonical: `${baseUrl}/${lang}/terms`,
      languages: languageUrls,
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { lang } = await params;
  const page = legalContent.terms[lang];

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar lang={lang} />

      <article className="mx-auto max-w-3xl px-6 py-16 leading-7 text-zinc-700">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
          {page.title}
        </h1>

        {page.sections.map((section) => (
          <section key={section.heading || section.body.slice(0, 40)}>
            {section.heading && (
              <h2 className="mt-10 text-2xl font-bold text-zinc-950">
                {section.heading}
              </h2>
            )}

            <p className={section.heading ? "mt-3" : "mt-6"}>{section.body}</p>
          </section>
        ))}
      </article>

      <Footer lang={lang} />
    </main>
  );
}

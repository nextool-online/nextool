import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";

import { languages } from "../../../data/languages";

import type { LanguageCode } from "../../../data/languages";

type TermsPageProps = {
  params: Promise<{
    lang: LanguageCode;
  }>;
};

const baseUrl = "https://nextool.online";

export function generateStaticParams() {
  return languages.map((language) => ({
    lang: language.code,
  }));
}

export async function generateMetadata({ params }: TermsPageProps) {
  const { lang } = await params;

  const languageUrls = Object.fromEntries(
    languages.map((language) => [
      language.code,
      `${baseUrl}/${language.code}/terms`,
    ])
  );

  return {
    title: "Terms of Use - Nextool",
    description: "Terms of use for Nextool.",

    alternates: {
      canonical: `${baseUrl}/${lang}/terms`,
      languages: languageUrls,
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar lang={lang} />

      <article className="mx-auto max-w-3xl px-6 py-16 leading-7 text-zinc-700">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
          Terms of Use
        </h1>

        <p className="mt-6">
          By using Nextool, you agree to use the website responsibly and only for
          lawful purposes.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Use of tools
        </h2>

        <p className="mt-3">
          The tools and calculators on Nextool are provided for general
          informational and practical purposes. Results should be checked before
          being used for important decisions.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Availability
        </h2>

        <p className="mt-3">
          Nextool may change, remove or update tools and content at any time
          without prior notice.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Limitation of liability
        </h2>

        <p className="mt-3">
          Nextool is provided as-is. The site owner is not responsible for
          losses or damages resulting from the use of the website or its tools.
        </p>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
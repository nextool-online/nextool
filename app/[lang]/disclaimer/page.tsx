import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";

import { languages } from "../../../data/languages";

import type { LanguageCode } from "../../../data/languages";

type DisclaimerPageProps = {
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

export async function generateMetadata({ params }: DisclaimerPageProps) {
  const { lang } = await params;

  const languageUrls = Object.fromEntries(
    languages.map((language) => [
      language.code,
      `${baseUrl}/${language.code}/disclaimer`,
    ])
  );

  return {
    title: "Disclaimer - Nextool",
    description: "Disclaimer for Nextool tools and calculators.",

    alternates: {
      canonical: `${baseUrl}/${lang}/disclaimer`,
      languages: languageUrls,
    },
  };
}

export default async function DisclaimerPage({ params }: DisclaimerPageProps) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar lang={lang} />

      <article className="mx-auto max-w-3xl px-6 py-16 leading-7 text-zinc-700">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
          Disclaimer
        </h1>

        <p className="mt-6">
          Nextool tools are provided for convenience and general information.
          They are not a substitute for professional advice.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Accuracy of results
        </h2>

        <p className="mt-3">
          We aim to provide useful and accurate tools, but we do not guarantee
          that every result will be error-free, complete or suitable for every
          situation.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Professional advice
        </h2>

        <p className="mt-3">
          For financial, legal, medical, tax or other important matters, consult
          a qualified professional before making decisions.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Use at your own risk
        </h2>

        <p className="mt-3">
          By using Nextool, you understand that results are provided without
          warranty and should be independently verified when needed.
        </p>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
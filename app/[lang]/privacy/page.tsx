import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";

import { languages } from "../../../data/languages";

import type { LanguageCode } from "../../../data/languages";

type PrivacyPageProps = {
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

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { lang } = await params;

  const languageUrls = Object.fromEntries(
    languages.map((language) => [
      language.code,
      `${baseUrl}/${language.code}/privacy`,
    ])
  );

  return {
    title: "Privacy Policy - Nextool",
    description: "Privacy policy for Nextool.",

    alternates: {
      canonical: `${baseUrl}/${lang}/privacy`,
      languages: languageUrls,
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar lang={lang} />

      <article className="mx-auto max-w-3xl px-6 py-16 leading-7 text-zinc-700">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
          Privacy Policy
        </h1>

        <p className="mt-6">
          Nextool provides free online tools and calculators. This page explains
          how basic information may be handled when you use the website.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Information we collect
        </h2>

        <p className="mt-3">
          Nextool does not require account registration to use its public tools.
          Some technical information, such as browser type, device information
          and usage data, may be processed through hosting, analytics or security
          services.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">Cookies</h2>

        <p className="mt-3">
          Nextool may use cookies or similar technologies to improve website
          functionality, measure usage and support future monetization features.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">
          Third-party services
        </h2>

        <p className="mt-3">
          The website may use third-party services for hosting, analytics,
          performance monitoring or advertising. These services may process data
          according to their own policies.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-zinc-950">Contact</h2>

        <p className="mt-3">
          For privacy-related questions, contact the site owner through the
          official communication channels provided on Nextool.
        </p>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
import FitnessFooter from "../../../components/fitness/FitnessFooter";
import FitnessHeader from "../../../components/fitness/FitnessHeader";
import FitnessJourney from "../../../components/fitness/FitnessJourney";

import { languages } from "../../../data/languages";
import { getFitnessContent } from "../../../data/fitness";

import type { LanguageCode } from "../../../data/languages";

type FitnessPageProps = {
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

export async function generateMetadata({ params }: FitnessPageProps) {
  const { lang } = await params;
  const content = getFitnessContent(lang);

  const languageUrls = Object.fromEntries(
    languages.map((language) => [
      language.code,
      `${baseUrl}/${language.code}/fitness`,
    ])
  );

  return {
    title:
      lang === "pt"
        ? "NexTool Fit - Perfil Fitness, IMC, Calorias e Evolução"
        : "NexTool Fit - Fitness Snapshot, BMI, Calories and Progress",
    description: content.description,
    alternates: {
      canonical: `${baseUrl}/${lang}/fitness`,
      languages: languageUrls,
    },
  };
}

export default async function FitnessPage({ params }: FitnessPageProps) {
  const { lang } = await params;
  const content = getFitnessContent(lang);
  const pageUrl = `${baseUrl}/${lang}/fitness`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    url: pageUrl,
    description: content.description,
  };

  return (
    <main className="min-h-screen bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <FitnessHeader lang={lang} />
      <FitnessJourney lang={lang} />
      <FitnessFooter lang={lang} />
    </main>
  );
}

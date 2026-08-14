import { notFound } from "next/navigation";

import { languages, type LanguageCode } from "../../../../data/languages";
import { FitnessEmailSentPage } from "../../../../components/fitness/FitnessEmailSentPage";

export function generateStaticParams() {
  return languages.map((language) => ({ lang: language.code }));
}

export default async function EmailSentPage({ params }: { params: Promise<{ lang: LanguageCode }> }) {
  const { lang } = await params;
  if (!languages.some((language) => language.code === lang)) notFound();
  return <FitnessEmailSentPage lang={lang} />;
}

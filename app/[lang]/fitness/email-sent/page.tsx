import { notFound } from "next/navigation";

import { languages, type LanguageCode } from "../../../../data/languages";
import { FitnessEmailSentPage } from "../../../../components/fitness/FitnessEmailSentPage";

export function generateStaticParams() {
  return languages.map((language) => ({ lang: language.code }));
}

export default async function EmailSentPage({ params, searchParams }: { params: Promise<{ lang: LanguageCode }>; searchParams?: Promise<{ variant?: string }> }) {
  const { lang } = await params;
  if (!languages.some((language) => language.code === lang)) notFound();
  const query = searchParams ? await searchParams : {};
  const variant = query.variant === "soft" ? "soft" : "dark";
  return <FitnessEmailSentPage lang={lang} variant={variant} />;
}

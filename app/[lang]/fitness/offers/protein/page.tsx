import { notFound } from "next/navigation";

import { languages, type LanguageCode } from "../../../../../data/languages";
import { ProteinOfferLanding } from "../../../../../components/fitness/ProteinOfferLanding";

export function generateStaticParams() {
  return languages.map((language) => ({ lang: language.code }));
}

export default async function ProteinOfferPage({ params }: { params: Promise<{ lang: LanguageCode }> }) {
  const { lang } = await params;
  if (!languages.some((language) => language.code === lang)) notFound();
  return <ProteinOfferLanding lang={lang} />;
}

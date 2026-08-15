import { notFound } from "next/navigation";

import { languages, type LanguageCode } from "../../../../../data/languages";
import { MediterraneanMealPlanLanding } from "../../../../../components/fitness/MediterraneanMealPlanLanding";

export function generateStaticParams() {
  return languages.map((language) => ({ lang: language.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: LanguageCode }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Mediterranean Meal Plan Next Step - NexTool Fit" : "Mediterranean Meal Plan - NexTool Fit",
    description: "A soft next step after your NexTool Fit calorie, macro, BMI or ideal weight result.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MediterraneanMealPlanPage({ params }: { params: Promise<{ lang: LanguageCode }> }) {
  const { lang } = await params;
  if (!languages.some((language) => language.code === lang)) notFound();
  return <MediterraneanMealPlanLanding lang={lang} />;
}

import assert from "node:assert/strict";
import fs from "node:fs";
import { calculateBmi, getBmiCategory } from "../tools/health/bmi.ts";
import { fitnessContent } from "../data/fitness.ts";
import {
  calculateBmr,
  calculateGoalCalories,
  calculateMaintenanceCalories,
  calculateProteinRange,
  calculateWaterIntakeLiters,
  calculateWaterIntakeLitersFromWeightKg,
  getBmiMetricStatus,
  getHealthyWeightMetricStatus,
  getTargetMetricStatus,
  litersToFluidOunces,
} from "../tools/health/fitness.ts";

const metricInput = { system: "metric", weightKg: 70, heightCm: 175 };
const imperialInput = { system: "imperial", weightLb: 180, heightFt: 5, heightIn: 10 };

const metricBmi = calculateBmi(metricInput);
assert.equal(metricBmi.toFixed(1), "22.9");
assert.equal(getBmiCategory(metricBmi).id, "normal");

const metricBmr = calculateBmr({ input: metricInput, age: 35, sex: "male" });
assert.equal(metricBmr.toFixed(0), "1624");

const maintenance = calculateMaintenanceCalories(metricBmr, "moderate");
assert.equal(maintenance.toFixed(0), "2517");
assert.equal(calculateGoalCalories(maintenance, "lose").toFixed(0), "2117");
assert.equal(calculateGoalCalories(maintenance, "gain").toFixed(0), "2767");

const water = calculateWaterIntakeLiters(metricInput, "moderate");
assert.equal(water.toFixed(1), "3.0");
assert.equal(litersToFluidOunces(water).toFixed(0), "100");
assert.equal(calculateWaterIntakeLitersFromWeightKg(70, 30).toFixed(1), "2.8");
assert.equal(calculateWaterIntakeLitersFromWeightKg(180 * 0.45359237, 30).toFixed(1), "3.2");

const protein = calculateProteinRange(metricInput, "gain");
assert.equal(protein.minGrams.toFixed(0), "112");
assert.equal(protein.maxGrams.toFixed(0), "154");

const imperialBmr = calculateBmr({ input: imperialInput, age: 35, sex: "male" });
assert.equal(imperialBmr.toFixed(0), "1758");

assert.equal(
  fitnessContent.pt.description,
  "Com poucos dados, você entende seus principais números fitness em um painel visual, simples e direto."
);
assert.equal(fitnessContent.pt.goalCalories, "Calorias");
assert.equal(fitnessContent.pt.secondaryCta, "Ver próximas etapas");
assert.equal(fitnessContent.pt.water, "Água");
assert.equal(fitnessContent.pt.protein, "Proteína");
assert.equal(fitnessContent.pt.healthyRange, "Peso ideal");
assert.equal(fitnessContent.pt.metricHelpers.water, "Quanta água devo beber em um dia normal?");
assert.equal(fitnessContent.pt.metricHelpers.goalCalories, "Quantas calorias devo ingerir por dia para chegar mais perto do peso ideal?");
assert.equal(fitnessContent.pt.metricHelpers.protein, "Quanta proteína diária me ajudaria na minha evolução?");
assert.equal(fitnessContent.pt.metricHelpers.maintenance, "Quantas calorias eu preciso para manter meu peso atual?");
assert.equal(fitnessContent.pt.metricHelpers.bmr, "Quantas calorias meu corpo queima sozinho, sem exercício?");
assert.equal(fitnessContent.pt.bmiLegend.underweight, "Abaixo do peso");
assert.equal(fitnessContent.pt.statusLabels.good, "Dentro da faixa");
assert.equal(fitnessContent.pt.statusLabels["out-of-range"], "Fora da faixa estimada");
assert.equal(fitnessContent.en.goalCalories, "Calories");
assert.equal(fitnessContent.en.water, "Water");
assert.equal(fitnessContent.en.protein, "Protein");
assert.equal(fitnessContent.pt.emailTitle, "Receba suas métricas por email");
assert.match(fitnessContent.pt.emailDescription, /acompanhe sua evolução semanalmente/);
assert.doesNotMatch(JSON.stringify(fitnessContent.pt), /snapshot/i);
assert.equal(fitnessContent.pt.emailButton, "Receber minhas métricas");
assert.match(fitnessContent.pt.emailDescription, /agora mesmo/);
assert.match(fitnessContent.pt.emailConsent, /Aceito receber minhas métricas/);
assert.equal(fitnessContent.en.statusLabels.neutral, "Daily target");

const fitnessJourneySource = fs.readFileSync(new URL("../components/fitness/FitnessJourney.tsx", import.meta.url), "utf8");
const toolPageLayoutSource = fs.readFileSync(new URL("../components/layout/ToolPageLayout.tsx", import.meta.url), "utf8");
const toolPageSource = fs.readFileSync(new URL("../app/[lang]/tools/[slug]/page.tsx", import.meta.url), "utf8");
const fitnessPageSource = fs.readFileSync(new URL("../app/[lang]/fitness/page.tsx", import.meta.url), "utf8");
const proteinCalculatorSource = fs.readFileSync(new URL("../tools/protein-calculator/component.tsx", import.meta.url), "utf8");
const waterSource = fs.readFileSync(new URL("../tools/water-intake-calculator/component.tsx", import.meta.url), "utf8");
const fitnessLayoutSource = fs.readFileSync(new URL("../components/layout/ToolPageLayout.tsx", import.meta.url), "utf8");
const fitnessFooterSource = fs.readFileSync(new URL("../components/fitness/FitnessFooter.tsx", import.meta.url), "utf8");
const proteinOfferPageSource = fs.readFileSync(new URL("../components/fitness/ProteinOfferLanding.tsx", import.meta.url), "utf8");
const affiliateAnalyticsSource = fs.readFileSync(new URL("../components/fitness/AffiliateLandingAnalytics.tsx", import.meta.url), "utf8");

assert.match(fitnessJourneySource, /calculadora-de-tmb/);
assert.doesNotMatch(fitnessJourneySource, /calculadora-tmb/);
assert.match(fitnessJourneySource, /calculadora-calorias/);
assert.doesNotMatch(fitnessJourneySource, /calculadora-de-calorias/);
assert.doesNotMatch(fitnessJourneySource, /body-fat-calculator/);
assert.doesNotMatch(fitnessJourneySource, /calculadora-percentual-gordura/);
assert.doesNotMatch(waterSource, /body-fat-calculator|calculadora-percentual-gordura/);
assert.doesNotMatch(fitnessLayoutSource, /w-fit rounded-full border border-white\/10 bg-white\/5 p-1/);
assert.doesNotMatch(fitnessFooterSource, /English|Português|lang === "pt" \? "en" : "pt"/);
assert.match(fitnessJourneySource, /\/api\/fitness\/lead/);
assert.match(fitnessJourneySource, /fitness_metrics_generated/);
assert.match(fitnessJourneySource, /email_submitted/);
assert.match(fitnessJourneySource, /emailStatus === "success"/);
assert.match(fitnessJourneySource, /Promoções|Promotions/);
assert.match(fitnessJourneySource, /spam/i);
assert.match(fitnessJourneySource, /Ver opções práticas|See practical options/);
assert.match(fitnessJourneySource, /router.push/);
assert.match(fitnessJourneySource, /fitness\/email-sent/);
assert.match(fitnessJourneySource, /id="fitness-email"/);
assert.match(fitnessJourneySource, /affiliate_offer_view/);
assert.match(fitnessJourneySource, /affiliate_offer_click/);
assert.match(fitnessJourneySource, /proteinOffer/);
assert.match(fitnessJourneySource, /\/fitness\/offers\/protein/);
assert.doesNotMatch(fitnessJourneySource, /Salvar progresso neste dispositivo|Save progress on this device|disabled>\s*\{content\.emailButton\}/);
assert.match(fitnessFooterSource, /#fitness-email/);
assert.match(proteinOfferPageSource, /protein-contextual-offer/);
assert.match(affiliateAnalyticsSource, /affiliate_landing_view/);
assert.match(proteinOfferPageSource, /affiliate_landing_cta_click/);
assert.doesNotMatch(fitnessFooterSource, /#fitness-save/);

assert.equal(getBmiMetricStatus("normal").id, "good");
assert.equal(getBmiMetricStatus("overweight").id, "attention");
assert.equal(getBmiMetricStatus("obesity").id, "out-of-range");
assert.equal(getBmiMetricStatus("underweight").id, "low");

assert.equal(
  getHealthyWeightMetricStatus({ currentWeightKg: 70, minKg: 56.7, maxKg: 76.3 }).id,
  "good"
);
assert.equal(
  getHealthyWeightMetricStatus({ currentWeightKg: 113.5, minKg: 56.7, maxKg: 76.3 }).id,
  "out-of-range"
);
assert.equal(getTargetMetricStatus().id, "neutral");

console.log("Fitness journey verification passed");

const emailSentPageSource = fs.readFileSync(new URL("../components/fitness/FitnessEmailSentPage.tsx", import.meta.url), "utf8");
assert.match(emailSentPageSource, /Email enviado/);
assert.match(emailSentPageSource, /Promoções/);
assert.match(emailSentPageSource, /Spam/);
assert.match(emailSentPageSource, /protein-contextual-offer/);
assert.match(emailSentPageSource, /min-h-screen bg-gradient-to-br from-sky-50/);
assert.match(emailSentPageSource, /bg-sky-50/);
assert.match(emailSentPageSource, /from-sky-50/);
assert.doesNotMatch(emailSentPageSource, /variant|dark|bg-zinc-950/);
assert.doesNotMatch(fitnessJourneySource, /variant=soft|soft-health|visualVariant|startWithOwnData|content\.cta|content\.secondaryCta/);
assert.match(fitnessJourneySource, /from-sky-50/);
assert.match(fitnessJourneySource, /shadow-\[0_24px_70px_rgba/);
assert.match(fitnessJourneySource, /border-sky-300/);
assert.match(fitnessJourneySource, /hover:border-sky-400/);
assert.match(fitnessJourneySource, /break-words/);
assert.match(fitnessJourneySource, /id="fitness-results"/);
assert.match(fitnessJourneySource, /<span>IMC<\/span>/);
assert.match(fitnessJourneySource, /<span>BMI<\/span>/);
assert.match(fitnessJourneySource, /Índice de Massa Corporal/);
assert.match(fitnessJourneySource, /Body Mass Index/);
assert.match(fitnessJourneySource, /lg:grid-cols-3/);
assert.match(fitnessJourneySource, /mx-auto max-w-7xl px-4 pb-12/);
assert.doesNotMatch(toolPageLayoutSource, /fitness-soft-health|bg-zinc-950 text-white/);
assert.doesNotMatch(toolPageSource, /searchParams|soft-health|visualVariant/);
assert.doesNotMatch(fitnessPageSource, /searchParams|soft-health|visualVariant|bg-zinc-950/);
assert.doesNotMatch(proteinCalculatorSource, /visualVariant|soft-health|variant=soft/);
assert.match(proteinCalculatorSource, /ToolBox variant="fitness"/);
const fitnessCalculatorFiles = [
  "../tools/bmi-calculator/component.tsx",
  "../tools/bmr-calculator/component.tsx",
  "../tools/calorie-calculator/component.tsx",
  "../tools/water-intake-calculator/component.tsx",
  "../tools/protein-calculator/component.tsx",
  "../tools/ideal-weight-calculator/component.tsx",
  "../tools/body-fat-calculator/component.tsx",
  "../tools/macro-calculator/component.tsx",
];
for (const file of fitnessCalculatorFiles) {
  const source = fs.readFileSync(new URL(file, import.meta.url), "utf8");
  assert.doesNotMatch(source, /rounded-3xl bg-zinc-950|overflow-hidden rounded-3xl[^\n]+bg-zinc-950|bg-white\/5|border-white\/10 bg-white\/10/);
}
assert.doesNotMatch(fs.readFileSync(new URL("../tools/calorie-calculator/component.tsx", import.meta.url), "utf8"), /activityMultipliers|}\s*·\s*\{/);
assert.match(fs.readFileSync(new URL("../tools/water-intake-calculator/component.tsx", import.meta.url), "utf8"), /activityOptions|select/);
assert.match(fs.readFileSync(new URL("../tools/water-intake-calculator/component.tsx", import.meta.url), "utf8"), /Dia comum sem treino|Treino leve|Training day/);
assert.doesNotMatch(fs.readFileSync(new URL("../tools/bmi-calculator/component.tsx", import.meta.url), "utf8"), /text-zinc-300/);
assert.match(fs.readFileSync(new URL("../tools/bmi-calculator/component.tsx", import.meta.url), "utf8"), /shadow-lg shadow-sky-100\/80/);
assert.match(fs.readFileSync(new URL("../tools/bmi-calculator/component.tsx", import.meta.url), "utf8"), /text-slate-700/);
for (const file of fitnessCalculatorFiles) {
  const source = fs.readFileSync(new URL(file, import.meta.url), "utf8");
  assert.match(source, /text-slate-700|text-slate-800/);
}

assert.match(fs.readFileSync(new URL("../tools/bmr-calculator/component.tsx", import.meta.url), "utf8"), /resultHelper[\s\S]*formatNumber\(result\.bmr/);
assert.doesNotMatch(fs.readFileSync(new URL("../tools/bmr-calculator/component.tsx", import.meta.url), "utf8"), /resultTitle[\s\S]{0,180}formatNumber\(result\.bmr/);

assert.match(toolPageLayoutSource, /bg-clip-text[^"]*text-transparent/);
assert.match(toolPageLayoutSource, /from-sky-700 via-emerald-600/);
assert.match(fs.readFileSync(new URL("../components/ui/ToolBox.tsx", import.meta.url), "utf8"), /variant\?: "default" \| "fitness"/);
assert.match(fs.readFileSync(new URL("../components/ui/ToolBox.tsx", import.meta.url), "utf8"), /shadow-\[0_24px_70px_rgba/);
for (const file of [
  "../tools/bmi-calculator/component.tsx",
  "../tools/bmr-calculator/component.tsx",
  "../tools/calorie-calculator/component.tsx",
  "../tools/water-intake-calculator/component.tsx",
  "../tools/protein-calculator/component.tsx",
  "../tools/ideal-weight-calculator/component.tsx",
  "../tools/body-fat-calculator/component.tsx",
  "../tools/macro-calculator/component.tsx",
]) {
  assert.match(fs.readFileSync(new URL(file, import.meta.url), "utf8"), /ToolBox variant="fitness"/);
}

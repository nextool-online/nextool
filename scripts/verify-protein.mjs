import assert from "node:assert/strict";
import { calculateProteinRange } from "../tools/health/fitness.ts";
import { proteinCalculatorContent as enContent } from "../tools/protein-calculator/content.en.ts";
import { proteinCalculatorContent as ptContent } from "../tools/protein-calculator/content.pt.ts";

const metricInput = { system: "metric", weightKg: 70, heightCm: 175 };
const imperialInput = { system: "imperial", weightLb: 180, heightFt: 5, heightIn: 10 };

const metricLose = calculateProteinRange(metricInput, "lose");
assert.equal(metricLose.minGrams.toFixed(0), "112");
assert.equal(metricLose.maxGrams.toFixed(0), "140");

const metricMaintain = calculateProteinRange(metricInput, "maintain");
assert.equal(metricMaintain.minGrams.toFixed(0), "84");
assert.equal(metricMaintain.maxGrams.toFixed(0), "126");

const metricGain = calculateProteinRange(metricInput, "gain");
assert.equal(metricGain.minGrams.toFixed(0), "112");
assert.equal(metricGain.maxGrams.toFixed(0), "154");

const imperialGain = calculateProteinRange(imperialInput, "gain");
assert.equal(imperialGain.minGrams.toFixed(0), "131");
assert.equal(imperialGain.maxGrams.toFixed(0), "180");

assert.equal(ptContent.slug.pt, "calculadora-de-proteina");
assert.equal(ptContent.ui.weight.pt, "Peso (kg)");
assert.equal(ptContent.ui.protein.pt, "Proteína diária");
assert.equal(ptContent.ui.openFitness.pt, "Gerar meu perfil fitness completo");
assert.match(ptContent.formula.expression.pt, /Peso \(kg\) × 1,2 a 2,2/);

assert.equal(enContent.slug.en, "protein-calculator");
assert.equal(enContent.ui.weight.en, "Weight (lb)");
assert.equal(enContent.ui.protein.en, "Daily protein");
assert.equal(enContent.ui.openFitness.en, "Generate my full fitness profile");
assert.match(enContent.formula.explanation.en, /pounds/);
assert.match(JSON.stringify(enContent.article), /180 lb/);
assert.ok(!JSON.stringify(enContent.article).includes("70 kg"));

console.log("Protein verification passed");

import assert from "node:assert/strict";
import { getHealthyWeightRange, kgToPounds } from "../tools/health/bmi.ts";
import { idealWeightCalculatorContent as enContent } from "../tools/ideal-weight-calculator/content.en.ts";
import { idealWeightCalculatorContent as ptContent } from "../tools/ideal-weight-calculator/content.pt.ts";

const metricRange = getHealthyWeightRange({ system: "metric", weightKg: 70, heightCm: 175 });
assert.equal(metricRange.minKg.toFixed(1), "56.7");
assert.equal(metricRange.maxKg.toFixed(1), "76.3");
assert.equal(metricRange.targetKg.toFixed(1), "67.4");

const imperialRange = getHealthyWeightRange({ system: "imperial", weightLb: 180, heightFt: 5, heightIn: 10 });
assert.equal(kgToPounds(imperialRange.minKg).toFixed(1), "128.9");
assert.equal(kgToPounds(imperialRange.maxKg).toFixed(1), "173.5");
assert.equal(kgToPounds(imperialRange.targetKg).toFixed(1), "153.3");

assert.equal(ptContent.slug.pt, "calculadora-peso-ideal");
assert.equal(ptContent.ui.height.pt, "Altura (cm)");
assert.equal(ptContent.ui.idealWeight.pt, "Peso ideal");
assert.equal(ptContent.ui.openFitness.pt, "Gerar meu perfil fitness completo");
assert.match(ptContent.formula.expression.pt, /IMC 18,5 a 24,9/);

assert.equal(enContent.slug.en, "ideal-weight-calculator");
assert.equal(enContent.ui.height.en, "Height");
assert.equal(enContent.ui.heightFt.en, "Height (ft)");
assert.equal(enContent.ui.heightIn.en, "Height (in)");
assert.equal(enContent.ui.idealWeight.en, "Ideal weight");
assert.equal(enContent.ui.openFitness.en, "Generate my full fitness profile");
assert.match(enContent.formula.explanation.en, /feet and inches/);
assert.match(JSON.stringify(enContent.article), /5 ft 10 in/);
assert.ok(!JSON.stringify(enContent.article).includes("175 cm"));

console.log("Ideal weight verification passed");

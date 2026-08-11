import assert from "node:assert/strict";
import { macroCalculatorContent as enContent } from "../tools/macro-calculator/content.en.ts";
import { macroCalculatorContent as ptContent } from "../tools/macro-calculator/content.pt.ts";
import { calculateMacroTargets } from "../tools/health/fitness.ts";

assert.deepEqual(
  calculateMacroTargets({ calories: 2517, input: { system: "metric", weightKg: 70, heightCm: 175 }, goal: "maintain" }),
  { proteinGrams: 105, fatGrams: 84, carbGrams: 335 }
);
assert.deepEqual(
  calculateMacroTargets({ calories: 2724, input: { system: "imperial", weightLb: 180, heightFt: 5, heightIn: 10 }, goal: "maintain" }),
  { proteinGrams: 122, fatGrams: 91, carbGrams: 354 }
);
assert.deepEqual(
  calculateMacroTargets({ calories: 2117, input: { system: "metric", weightKg: 70, heightCm: 175 }, goal: "lose" }),
  { proteinGrams: 126, fatGrams: 59, carbGrams: 271 }
);

assert.equal(ptContent.slug.pt, "calculadora-de-macros");
assert.equal(ptContent.ui.calories.pt, "Calorias por dia");
assert.equal(ptContent.ui.weight.pt, "Peso (kg)");
assert.equal(ptContent.ui.protein.pt, "Proteína");
assert.equal(ptContent.ui.openFitness.pt, "Gerar meu perfil fitness completo");

assert.equal(enContent.slug.en, "macro-calculator");
assert.equal(enContent.ui.calories.en, "Calories per day");
assert.equal(enContent.ui.weight.en, "Weight (lb)");
assert.equal(enContent.ui.protein.en, "Protein");
assert.equal(enContent.ui.openFitness.en, "Generate my full fitness profile");
assert.match(enContent.formula.explanation.en, /Weight \(lb\)/);
assert.ok(!JSON.stringify(enContent.article).includes("kg"));

console.log("Macro verification passed");

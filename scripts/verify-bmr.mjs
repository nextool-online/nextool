import assert from "node:assert/strict";
import { calculateBmr } from "../tools/health/fitness.ts";
import { bmrCalculatorContent as enContent } from "../tools/bmr-calculator/content.en.ts";
import { bmrCalculatorContent as ptContent } from "../tools/bmr-calculator/content.pt.ts";

const metricInput = { system: "metric", weightKg: 70, heightCm: 175 };
const imperialInput = { system: "imperial", weightLb: 180, heightFt: 5, heightIn: 10 };

assert.equal(calculateBmr({ input: metricInput, age: 35, sex: "male" }).toFixed(0), "1624");
assert.equal(calculateBmr({ input: imperialInput, age: 35, sex: "male" }).toFixed(0), "1758");
assert.equal(calculateBmr({ input: metricInput, age: 35, sex: "female" }).toFixed(0), "1458");

assert.equal(ptContent.ui.weight.pt, "Peso (kg)");
assert.equal(ptContent.ui.height.pt, "Altura (cm)");
assert.equal(ptContent.ui.age.pt, "Idade");
assert.equal(ptContent.ui.bmr.pt, "Metabolismo basal");
assert.match(ptContent.formula.expression.pt, /10P \+ 6\.25A - 5I \+ S/);

assert.equal(enContent.ui.weight.en, "Weight (lb)");
assert.equal(enContent.ui.heightFt.en, "Height (ft)");
assert.equal(enContent.ui.heightIn.en, "Height (in)");
assert.equal(enContent.ui.age.en, "Age");
assert.equal(enContent.ui.bmr.en, "Basal metabolism");
assert.match(enContent.formula.expression.en, /4\.536W \+ 15\.88H - 5A \+ S/);
assert.match(enContent.formula.explanation.en, /pounds/);
assert.match(enContent.formula.explanation.en, /inches/);
assert.ok(!JSON.stringify(enContent.article).includes("75 kg"));
assert.ok(!JSON.stringify(enContent.article).includes("175 cm"));
assert.match(JSON.stringify(enContent.article), /165 lb/);
assert.match(JSON.stringify(enContent.article), /5 ft 9 in/);
assert.equal(enContent.ui.height.en, "Height");
assert.equal(ptContent.ui.gender.pt, "Sexo");
assert.equal(enContent.ui.gender.en, "Gender");
assert.equal(ptContent.ui.openFitness.pt, "Gerar meu perfil fitness completo");
assert.equal(enContent.ui.openFitness.en, "Generate my full fitness profile");

console.log("BMR verification passed");

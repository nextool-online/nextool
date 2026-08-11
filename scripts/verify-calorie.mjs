import assert from "node:assert/strict";
import { calorieCalculatorContent as enContent } from "../tools/calorie-calculator/content.en.ts";
import { calorieCalculatorContent as ptContent } from "../tools/calorie-calculator/content.pt.ts";
import {
  calculateBmr,
  calculateGoalCalories,
  calculateMaintenanceCalories,
} from "../tools/health/fitness.ts";

const metricInput = { system: "metric", weightKg: 70, heightCm: 175 };
const imperialInput = { system: "imperial", weightLb: 180, heightFt: 5, heightIn: 10 };

const metricBmr = calculateBmr({ input: metricInput, age: 35, sex: "male" });
const metricMaintenance = calculateMaintenanceCalories(metricBmr, "moderate");
assert.equal(metricMaintenance.toFixed(0), "2517");
assert.equal(calculateGoalCalories(metricMaintenance, "lose").toFixed(0), "2117");
assert.equal(calculateGoalCalories(metricMaintenance, "gain").toFixed(0), "2767");

const imperialBmr = calculateBmr({ input: imperialInput, age: 35, sex: "male" });
const imperialMaintenance = calculateMaintenanceCalories(imperialBmr, "moderate");
assert.equal(imperialMaintenance.toFixed(0), "2724");
assert.equal(calculateGoalCalories(imperialMaintenance, "lose").toFixed(0), "2324");
assert.equal(calculateGoalCalories(imperialMaintenance, "gain").toFixed(0), "2974");

assert.equal(ptContent.ui.weight.pt, "Peso (kg)");
assert.equal(ptContent.ui.height.pt, "Altura (cm)");
assert.equal(ptContent.ui.age.pt, "Idade");
assert.equal(ptContent.ui.gender.pt, "Sexo");
assert.equal(ptContent.ui.calories.pt, "Calorias diárias");
assert.equal(ptContent.ui.openFitness.pt, "Gerar meu perfil fitness completo");

assert.equal(enContent.ui.weight.en, "Weight (lb)");
assert.equal(enContent.ui.height.en, "Height");
assert.equal(enContent.ui.heightFt.en, "Height (ft)");
assert.equal(enContent.ui.heightIn.en, "Height (in)");
assert.equal(enContent.ui.gender.en, "Gender");
assert.equal(enContent.ui.calories.en, "Daily calories");
assert.equal(enContent.ui.openFitness.en, "Generate my full fitness profile");
assert.match(enContent.formula.explanation.en, /pounds/);
assert.match(enContent.formula.explanation.en, /inches/);
assert.ok(!JSON.stringify(enContent.article).includes("75 kg"));
assert.ok(!JSON.stringify(enContent.article).includes("175 cm"));
assert.match(JSON.stringify(enContent.article), /165 lb/);
assert.match(JSON.stringify(enContent.article), /5 ft 9 in/);

console.log("Calorie verification passed");

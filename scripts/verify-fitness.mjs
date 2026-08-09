import assert from "node:assert/strict";
import { calculateBmi, getBmiCategory } from "../tools/health/bmi.ts";
import { fitnessContent } from "../data/fitness.ts";
import {
  calculateBmr,
  calculateGoalCalories,
  calculateMaintenanceCalories,
  calculateProteinRange,
  calculateWaterIntakeLiters,
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

const protein = calculateProteinRange(metricInput, "gain");
assert.equal(protein.minGrams.toFixed(0), "112");
assert.equal(protein.maxGrams.toFixed(0), "154");

const imperialBmr = calculateBmr({ input: imperialInput, age: 35, sex: "male" });
assert.equal(imperialBmr.toFixed(0), "1758");

assert.equal(
  fitnessContent.pt.description,
  "Com poucos dados, você entende seus principais números fitness em um painel visual, simples e direto."
);
assert.equal(fitnessContent.pt.goalCalories, "Meta de calorias diárias");
assert.equal(fitnessContent.pt.water, "Água para beber por dia");
assert.equal(fitnessContent.pt.protein, "Proteína para comer por dia");
assert.equal(fitnessContent.pt.bmiLegend.underweight, "Abaixo do peso");
assert.equal(fitnessContent.en.goalCalories, "Daily calorie target");
assert.equal(fitnessContent.en.water, "Water to drink per day");

console.log("Fitness journey verification passed");

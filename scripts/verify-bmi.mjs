import assert from "node:assert/strict";
import { calculateBmi, getBmiCategory, getHealthyWeightRange, convertImperialToMetric } from "../tools/health/bmi.ts";
import { formatDecimal } from "../utils/formatters.ts";

const metricBmi = calculateBmi({ system: "metric", weightKg: 70, heightCm: 175 });
assert.equal(metricBmi.toFixed(1), "22.9");
assert.equal(getBmiCategory(metricBmi).id, "normal");

const imperial = convertImperialToMetric({ weightLb: 154.324, heightFt: 5, heightIn: 9 });
assert.equal(imperial.weightKg.toFixed(1), "70.0");
assert.equal(imperial.heightCm.toFixed(1), "175.3");

const imperialBmi = calculateBmi({ system: "imperial", weightLb: 154.324, heightFt: 5, heightIn: 9 });
assert.equal(imperialBmi.toFixed(1), "22.8");
assert.equal(getBmiCategory(imperialBmi).id, "normal");

const range = getHealthyWeightRange({ system: "metric", heightCm: 175 });
assert.equal(range.minKg.toFixed(1), "56.7");
assert.equal(range.maxKg.toFixed(1), "76.3");

assert.equal(formatDecimal(22.9, "en"), "22.9");
assert.equal(formatDecimal(22.9, "pt"), "22,9");

console.log("BMI verification passed");

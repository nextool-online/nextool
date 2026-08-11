import assert from "node:assert/strict";
import { bodyFatCalculatorContent as enContent } from "../tools/body-fat-calculator/content.en.ts";
import { bodyFatCalculatorContent as ptContent } from "../tools/body-fat-calculator/content.pt.ts";
import { calculateBodyFatNavy } from "../tools/health/fitness.ts";

assert.equal(
  calculateBodyFatNavy({ system: "metric", sex: "male", heightCm: 175, neckCm: 38, waistCm: 85 }).toFixed(1),
  "17.0"
);
assert.equal(
  calculateBodyFatNavy({ system: "imperial", sex: "male", heightFt: 5, heightIn: 10, neckIn: 15, waistIn: 34 }).toFixed(1),
  "17.5"
);
assert.equal(
  calculateBodyFatNavy({ system: "metric", sex: "female", heightCm: 165, neckCm: 32, waistCm: 75, hipCm: 98 }).toFixed(1),
  "29.2"
);

assert.equal(ptContent.ui.height.pt, "Altura (cm)");
assert.equal(ptContent.ui.neck.pt, "Pescoço (cm)");
assert.equal(ptContent.ui.waist.pt, "Cintura (cm)");
assert.equal(ptContent.ui.hip.pt, "Quadril (cm)");
assert.equal(ptContent.ui.bodyFat.pt, "Gordura corporal");
assert.equal(ptContent.ui.openFitness.pt, "Gerar meu perfil fitness completo");

assert.equal(enContent.ui.height.en, "Height");
assert.equal(enContent.ui.heightFt.en, "Height (ft)");
assert.equal(enContent.ui.heightIn.en, "Height (in)");
assert.equal(enContent.ui.neck.en, "Neck (in)");
assert.equal(enContent.ui.waist.en, "Waist (in)");
assert.equal(enContent.ui.hip.en, "Hip (in)");
assert.equal(enContent.ui.bodyFat.en, "Body fat");
assert.equal(enContent.ui.openFitness.en, "Generate my full fitness profile");
assert.match(enContent.formula.explanation.en, /inches/);
assert.match(JSON.stringify(enContent.article), /5 ft 10 in/);
assert.ok(!JSON.stringify(enContent.article).includes("175 cm"));

console.log("Body fat verification passed");

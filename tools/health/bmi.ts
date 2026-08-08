export type BmiInput =
  | {
      system: "metric";
      weightKg: number;
      heightCm: number;
    }
  | {
      system: "imperial";
      weightLb: number;
      heightFt: number;
      heightIn: number;
    };

export type BmiCategoryId =
  | "underweight"
  | "normal"
  | "overweight"
  | "obesity";

export type BmiCategory = {
  id: BmiCategoryId;
  min: number;
  max: number | null;
  markerStart: number;
  markerSpan: number;
};

export const bmiCategories: BmiCategory[] = [
  { id: "underweight", min: 0, max: 18.5, markerStart: 0, markerSpan: 25 },
  { id: "normal", min: 18.5, max: 25, markerStart: 25, markerSpan: 25 },
  { id: "overweight", min: 25, max: 30, markerStart: 50, markerSpan: 25 },
  { id: "obesity", min: 30, max: null, markerStart: 75, markerSpan: 25 },
];

export function poundsToKg(weightLb: number) {
  return weightLb * 0.45359237;
}

export function feetInchesToCm(heightFt: number, heightIn: number) {
  return (heightFt * 12 + heightIn) * 2.54;
}

export function kgToPounds(weightKg: number) {
  return weightKg / 0.45359237;
}

export function convertImperialToMetric({
  weightLb,
  heightFt,
  heightIn,
}: {
  weightLb: number;
  heightFt: number;
  heightIn: number;
}) {
  return {
    weightKg: poundsToKg(weightLb),
    heightCm: feetInchesToCm(heightFt, heightIn),
  };
}

export function normalizeBmiInput(input: BmiInput) {
  if (input.system === "metric") {
    return {
      weightKg: input.weightKg,
      heightCm: input.heightCm,
    };
  }

  return convertImperialToMetric(input);
}

export function calculateBmi(input: BmiInput) {
  const { weightKg, heightCm } = normalizeBmiInput(input);
  const heightM = heightCm / 100;

  return weightKg / (heightM * heightM);
}

export function getBmiCategory(bmi: number) {
  return (
    bmiCategories.find(
      (category) =>
        bmi >= category.min &&
        (category.max === null || bmi < category.max)
    ) || bmiCategories[0]
  );
}

export function getBmiMarkerPosition(bmi: number) {
  const category = getBmiCategory(bmi);
  const categoryMax = category.max ?? 40;
  const clampedBmi = Math.max(category.min, Math.min(bmi, categoryMax));
  const categoryProgress =
    (clampedBmi - category.min) / (categoryMax - category.min || 1);

  return Math.max(
    0,
    Math.min(100, category.markerStart + categoryProgress * category.markerSpan)
  );
}

export function getHealthyWeightRange(input: BmiInput) {
  const { heightCm } = normalizeBmiInput(input);
  const heightM = heightCm / 100;

  return {
    minKg: 18.5 * heightM * heightM,
    maxKg: 24.9 * heightM * heightM,
    targetKg: 22 * heightM * heightM,
  };
}

export function getWeightDeltaToHealthyRange(weightKg: number, minKg: number, maxKg: number) {
  if (weightKg < minKg) {
    return {
      direction: "gain" as const,
      kg: minKg - weightKg,
    };
  }

  if (weightKg > maxKg) {
    return {
      direction: "lose" as const,
      kg: weightKg - maxKg,
    };
  }

  return {
    direction: "inside" as const,
    kg: 0,
  };
}

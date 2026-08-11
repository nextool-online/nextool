import { kgToPounds, normalizeBmiInput, type BmiCategoryId, type BmiInput } from "./bmi";

export type Sex = "male" | "female";
export type FitnessGoal = "lose" | "maintain" | "gain";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";

export const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

export type BodyFatNavyInput =
  | {
      system: "metric";
      sex: Sex;
      heightCm: number;
      neckCm: number;
      waistCm: number;
      hipCm?: number;
    }
  | {
      system: "imperial";
      sex: Sex;
      heightFt: number;
      heightIn: number;
      neckIn: number;
      waistIn: number;
      hipIn?: number;
    };

export type MetricStatusId = "good" | "attention" | "out-of-range" | "low" | "neutral";

export type MetricStatus = {
  id: MetricStatusId;
};

export function getBmiMetricStatus(categoryId: BmiCategoryId): MetricStatus {
  if (categoryId === "normal") {
    return { id: "good" };
  }

  if (categoryId === "overweight") {
    return { id: "attention" };
  }

  if (categoryId === "obesity") {
    return { id: "out-of-range" };
  }

  return { id: "low" };
}

export function getHealthyWeightMetricStatus({
  currentWeightKg,
  minKg,
  maxKg,
}: {
  currentWeightKg: number;
  minKg: number;
  maxKg: number;
}): MetricStatus {
  if (currentWeightKg >= minKg && currentWeightKg <= maxKg) {
    return { id: "good" };
  }

  return { id: "out-of-range" };
}

export function getTargetMetricStatus(): MetricStatus {
  return { id: "neutral" };
}

export function calculateBmr({
  input,
  age,
  sex,
}: {
  input: BmiInput;
  age: number;
  sex: Sex;
}) {
  const { weightKg, heightCm } = normalizeBmiInput(input);
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;

  return sex === "male" ? base + 5 : base - 161;
}

export function calculateMaintenanceCalories(bmr: number, activity: ActivityLevel) {
  return bmr * activityMultipliers[activity];
}

export function calculateGoalCalories(maintenanceCalories: number, goal: FitnessGoal) {
  if (goal === "lose") {
    return maintenanceCalories - 400;
  }

  if (goal === "gain") {
    return maintenanceCalories + 250;
  }

  return maintenanceCalories;
}

export function calculateWaterIntakeLiters(input: BmiInput, activity: ActivityLevel) {
  const { weightKg } = normalizeBmiInput(input);
  const activityBonusLiters: Record<ActivityLevel, number> = {
    sedentary: 0,
    light: 0.25,
    moderate: 0.5,
    very: 0.75,
    extra: 1,
  };

  return weightKg * 0.035 + activityBonusLiters[activity];
}

export function calculateWaterIntakeLitersFromWeightKg(weightKg: number, activityMinutes = 0) {
  const safeActivityMinutes = Math.max(0, activityMinutes || 0);
  return (weightKg * 35 + safeActivityMinutes * 12) / 1000;
}

export function calculateProteinRange(input: BmiInput, goal: FitnessGoal) {
  const { weightKg } = normalizeBmiInput(input);
  const multipliers =
    goal === "gain"
      ? { min: 1.6, max: 2.2 }
      : goal === "lose"
        ? { min: 1.6, max: 2 }
        : { min: 1.2, max: 1.8 };

  return {
    minGrams: weightKg * multipliers.min,
    maxGrams: weightKg * multipliers.max,
  };
}

export function calculateMacroTargets({
  calories,
  input,
  goal,
}: {
  calories: number;
  input: BmiInput;
  goal: FitnessGoal;
}) {
  const proteinRange = calculateProteinRange(input, goal);
  const proteinGrams = Math.round((proteinRange.minGrams + proteinRange.maxGrams) / 2);
  const fatRatio = goal === "maintain" ? 0.3 : 0.25;
  const fatGrams = Math.round((calories * fatRatio) / 9);
  const carbCalories = Math.max(0, calories - proteinGrams * 4 - fatGrams * 9);

  return {
    proteinGrams,
    fatGrams,
    carbGrams: Math.round(carbCalories / 4),
  };
}

export function calculateBodyFatNavy(input: BodyFatNavyInput) {
  const normalized =
    input.system === "metric"
      ? {
          sex: input.sex,
          heightIn: input.heightCm / 2.54,
          neckIn: input.neckCm / 2.54,
          waistIn: input.waistCm / 2.54,
          hipIn: input.hipCm ? input.hipCm / 2.54 : undefined,
        }
      : {
          sex: input.sex,
          heightIn: input.heightFt * 12 + input.heightIn,
          neckIn: input.neckIn,
          waistIn: input.waistIn,
          hipIn: input.hipIn,
        };

  const waistMinusNeck = normalized.waistIn - normalized.neckIn;
  if (normalized.heightIn <= 0 || waistMinusNeck <= 0) return NaN;

  if (normalized.sex === "male") {
    return 86.010 * Math.log10(waistMinusNeck) - 70.041 * Math.log10(normalized.heightIn) + 36.76;
  }

  if (!normalized.hipIn) return NaN;
  const waistPlusHipMinusNeck = normalized.waistIn + normalized.hipIn - normalized.neckIn;
  if (waistPlusHipMinusNeck <= 0) return NaN;

  return 163.205 * Math.log10(waistPlusHipMinusNeck) - 97.684 * Math.log10(normalized.heightIn) - 78.387;
}

export function litersToFluidOunces(liters: number) {
  return liters * 33.8140227;
}

export function kgRangeToPoundsRange({ minKg, maxKg }: { minKg: number; maxKg: number }) {
  return {
    minLb: kgToPounds(minKg),
    maxLb: kgToPounds(maxKg),
  };
}

import { kgToPounds, normalizeBmiInput, type BmiInput } from "./bmi";

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

export function litersToFluidOunces(liters: number) {
  return liters * 33.8140227;
}

export function kgRangeToPoundsRange({ minKg, maxKg }: { minKg: number; maxKg: number }) {
  return {
    minLb: kgToPounds(minKg),
    maxLb: kgToPounds(maxKg),
  };
}

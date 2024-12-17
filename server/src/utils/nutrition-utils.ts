export function calculateNutrientsFromCalorie(calories) {
  // Calculate carbohydrate intake (45% to 65%)
  const carbCaloriesLow = calories * 0.45;
  const carbCaloriesHigh = calories * 0.65;
  const carbsLow = (carbCaloriesLow / 4).toFixed(2); // grams
  const carbsHigh = (carbCaloriesHigh / 4).toFixed(2); // grams

  // Calculate total fat intake (20% to 35%)
  const fatCaloriesLow = calories * 0.2;
  const fatCaloriesHigh = calories * 0.35;
  const fatLow = (fatCaloriesLow / 9).toFixed(2); // grams
  const fatHigh = (fatCaloriesHigh / 9).toFixed(2); // grams

  // Cholesterol intake (aim for around 100 mg)
  const cholesterol = 100; // mg

  // Calculate protein intake (10% to 35%)
  const proteinCaloriesLow = calories * 0.1;
  const proteinCaloriesHigh = calories * 0.35;
  const proteinLow = (proteinCaloriesLow / 4).toFixed(2); // grams
  const proteinHigh = (proteinCaloriesHigh / 4).toFixed(2); // grams

  // Fiber intake (aim for about 38 grams)
  const fiber = 38; // grams

  // Calculate added sugars (limit to <10%)
  const sugarCalories = calories * 0.1;
  const sugars = (sugarCalories / 4).toFixed(2); // grams

  return {
    carbohydrates: {
      low: carbsLow,
      high: carbsHigh,
      unit: "grams",
    },
    totalFat: {
      low: fatLow,
      high: fatHigh,
      unit: "grams",
    },
    cholesterol: {
      value: cholesterol,
      unit: "mg",
    },
    protein: {
      low: proteinLow,
      high: proteinHigh,
      unit: "grams",
    },
    fiber: {
      value: fiber,
      unit: "grams",
    },
    sugars: {
      value: sugars,
      unit: "grams",
    },
  };
}

export function calculateEmbeddings(current: number, target: number) {
  if (current > target) return -1;
  // ratio is 0 to 1
  const ratio = (target - current) / target;
  // convert to -1 to 1
  return ratio * 2 - 1;
}

export function cosineSimilarity(vecA, vecB) {
  // Calculate dot product of vecA and vecB
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);

  // Calculate magnitude of vecA
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));

  // Calculate magnitude of vecB
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  // Return cosine similarity (dotProduct / (magnitudeA * magnitudeB))
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

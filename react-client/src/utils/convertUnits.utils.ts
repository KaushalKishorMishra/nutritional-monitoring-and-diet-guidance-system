/**
 * Converts a given value and unit to grams.
 * Supports both weight-based and volume-based units.
 * Assumes the substance is water (density = 1 g/ml).
 * @param value - The quantity to convert (can be a number or string).
 * @param unit - The unit of the quantity (e.g., "mg", "g", "kg", "ml", "L", "fl oz", "cups").
 * @returns The converted value in grams as a string.
 */
const convertUnits = (value: number | string, unit: string): string => {
  // Convert value to a number if it's a string
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  // Conversion factors to grams
  const toGramsConversionFactors: { [key: string]: number } = {
    // Weight-based units
    mg: 0.001, // 1 milligram = 0.001 grams
    g: 1, // 1 gram = 1 gram
    kg: 1000, // 1 kilogram = 1000 grams
    IU: 0.67, // 1 IU of Vitamin D = 0.67 micrograms (example conversion)

    // Volume-based units (assuming density of water: 1 g/ml)
    ml: 1, // 1 milliliter = 1 gram
    L: 1000, // 1 liter = 1000 grams
    "fl oz": 29.5735, // 1 fluid ounce = 29.5735 grams
    cups: 240, // 1 cup = 240 grams (approximate for water)
    tablespoons: 15, // 1 tablespoon = 15 grams (approximate for water)
    teaspoons: 5, // 1 teaspoon = 5 grams (approximate for water)
    ounces: 28.35, // 1 ounce = 28.35 grams
    pounds: 453.592, // 1 pound = 453.592 grams
  };

  // Get the conversion factor for the given unit
  const factor = toGramsConversionFactors[unit.toLowerCase()];

  // If the unit is not supported, throw an error
  if (factor === undefined) {
    throw new Error(`Unsupported unit for conversion: ${unit}`);
  }

  // Calculate the equivalent quantity in grams
  const valueInGrams = value * factor;

  // Return the converted value in grams
  return `${parseFloat(valueInGrams.toFixed(2))} g`;
};

export default convertUnits;
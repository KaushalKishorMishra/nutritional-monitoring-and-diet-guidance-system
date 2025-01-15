const convertUnits = (value: number | string, unit: string) => {
    if (typeof value === "string") {
        value = parseFloat(value);
    }
    switch (unit) {
        case "mg":
            return (value * 1000).toFixed(2) + " mg"; // Convert gm to mg
        case "IU":
            return (value * 1000).toFixed(2) + " IU"; // Assume IU needs conversion
        case "g":
        default:
            return value + " g"; // Default to grams
    }
};

export default convertUnits;
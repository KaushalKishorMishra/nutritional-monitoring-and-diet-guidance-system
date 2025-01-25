import React from "react";

interface PInputWithUnit {
    label?: string; // Label for the input field
    id: string; // ID for the input field
    name: string; // Name for the input field
    value: string; // Current value of the input field
    unit: string; // Current selected unit
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback for when the input value changes
    onUnitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Callback for when the unit changes
    units: string[]; // List of available units
    required?: boolean; // Whether the input is required
}

const InputWithUnit: React.FC<PInputWithUnit> = ({
    label,
    id,
    name,
    value,
    unit,
    onChange,
    onUnitChange,
    units,
    required,
}) => {
    return (
        <div className="input-container mb-4">
            {label && (
                <label htmlFor={id} className={`block text-sm font-medium text-secondary-content`}>
                    {label}
                </label>
            )}
            <div className="flex gap-2">
                {/* Input Field */}
                <input
                    type="number"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none font-semibold"
                />

                {/* Unit Dropdown */}
                <select
                    value={unit}
                    onChange={onUnitChange}
                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none font-semibold focus:ring-2 focus:ring-primary focus:border-primary bg-secondary text-secondary-content w-1/3"
                >
                    {units.map((unitOption) => (
                        <option key={unitOption} value={unitOption}>
                            {unitOption}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default InputWithUnit;
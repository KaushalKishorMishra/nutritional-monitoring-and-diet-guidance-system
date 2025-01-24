import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Theme } from "../../hooks/store/appSettings.store";

interface PInputField {
  label?: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<PInputField> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-container mb-4">
      {label && (
        <label htmlFor={id} className={`block text-sm font-medium text-secondary-content`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none font-semibold"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-4 right-3 text-xl text-base-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
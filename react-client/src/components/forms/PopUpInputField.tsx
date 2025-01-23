import React from "react";

interface PopUpInputField {
  label?: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const PopUpInputField: React.FC<PopUpInputField> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="input-container border-b-2 border-primary bg-base-100 rounded-t-2xl !w-32">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="text"
        typeof={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="border-none w-full text-center focus:outline-none"
      />
    </div>
  );
};

export default PopUpInputField;

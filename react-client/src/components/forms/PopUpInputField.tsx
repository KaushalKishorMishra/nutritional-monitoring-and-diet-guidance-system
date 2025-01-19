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
    <div className="input-container border-b-2 border-primary bg-white rounded-t-2xl">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="border-none w-full focus:outline-none"
      />
    </div>
  );
};

export default PopUpInputField;

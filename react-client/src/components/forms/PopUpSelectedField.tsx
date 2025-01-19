import React, { useState, useEffect } from "react";
import {
  capitalizeFirstLetter,
  formatString,
} from "../../utils/randomUtils.utils";

interface PPopUpSelectedField {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const PopUpSelectedField: React.FC<PPopUpSelectedField> = ({
  options,
  selectedOption,
  onChange,
}) => {
  const [isSelected, setIsSelected] = useState(selectedOption);

  // Synchronize isSelected state with selectedOption if props change
  useEffect(() => {
    setIsSelected(selectedOption);
  }, [selectedOption]);

  return (
    <div className="flex flex-col items-center">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            setIsSelected(option); // Update local state
          }}
          className={`my-2 w-[200px] rounded-md border py-3 text-center text-black ${
            isSelected === option
              ? "border-[1px] border-green-400 text-black"
              : "hover:bg-gray-100"
          }`}
        >
          {capitalizeFirstLetter(formatString(option))}
        </button>
      ))}
      <button
        className="btn btn-primary mt-4 w-full text-white"
        onClick={() => {
          onChange(isSelected);
          console.log("Selected Option:", isSelected);
        }}
      >
        Done
      </button>
    </div>
  );
};

export default PopUpSelectedField;

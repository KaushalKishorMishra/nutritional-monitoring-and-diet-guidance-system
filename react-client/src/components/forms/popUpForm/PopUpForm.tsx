import React from "react";
import PopUpInputField from "../PopUpInputField";
import { useModalStore } from "../../../hooks/store/modal.store";
import { FormValues } from "../../../pages/user/profile/ProfileEditPage";

interface PPopUpForm {
  id: string;
  label?: string;
  name?: string;
  required?: boolean;
  type: string;
  apiValue?: string;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

const PopUpForm: React.FC<PPopUpForm> = ({
  id,
  label,
  name,
  required,
  type,
  apiValue,
  setFormValues,
}) => {
  const [value, setValue] = React.useState<string>(apiValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { closeModal } = useModalStore();

  const handleSubmit = () => {
    console.log(1)
    console.log(id, value);
    setFormValues((prev) => ({ ...prev, [id]: value }));
    closeModal(`${id}`);
  };

  return (
    <div className="form-container">
      <PopUpInputField
        label={label}
        type={type}
        id={id}
        name={name || ""}
        value={value}
        onChange={handleChange}
        required={required}
      />
      <button className="btn w-full btn-primary text-white" onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
};

export default PopUpForm;

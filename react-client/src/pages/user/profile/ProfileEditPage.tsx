import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useModalStore } from "../../../hooks/store/modal.store";
import useGettingStartedStore from "../../../hooks/store/gettingStarted.store";
import PopUpForm from "../../../components/forms/popUpForm/PopUpForm";
import PopUpSelectedField from "../../../components/forms/PopUpSelectedField";

interface ProfileEditPageData {
  id: keyof FormValues;
  label: string;
  name: string;
  required: boolean;
  type: string;
  options?: string[];
}

export interface FormValues {
  Age: string;
  Height: string;
  Weight: string;
  Gender: string;
  Lifestyle: string;
}

const ProfileEditPageData: ProfileEditPageData[] = [
  { id: "Age", label: "Age", name: "age", required: true, type: "number" },
  {
    id: "Height",
    label: "Height",
    name: "height",
    required: true,
    type: "number",
  },
  {
    id: "Weight",
    label: "Weight",
    name: "weight",
    required: true,
    type: "number",
  },
  {
    id: "Gender",
    label: "Gender",
    name: "gender",
    required: true,
    type: "dropdown" as const,
    options: ["Male", "Female", "Other"],
  },
  {
    type: "dropdown" as const,
    id: "Lifestyle",
    label: "Lifestyle",
    name: "lifestyle",
    required: true,
    options: [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
      "Super Active",
    ],
  },
];

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const {
    setAge,
    setHeight,
    setWeight,
    setGender,
    setActivityLevel,
    age,
    height,
    weight,
    gender,
    activityLevel,
  } = useGettingStartedStore();

  // Initial form values with type-safety
  const [formValues, setFormValues] = useState<FormValues>({
    Age: age || "",
    Height: height || "",
    Weight: weight || "",
    Gender: gender || "",
    Lifestyle: activityLevel || "",
  });

  // Saving data to global store
  const handleSave = () => {
    try {
      setAge(formValues.Age);
      setHeight(formValues.Height);
      setWeight(formValues.Weight);
      setActivityLevel(formValues.Lifestyle);
      setGender(formValues.Gender);

      navigate("/user/profile");
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  // Find the current field based on currentStep

  return (
    <div className="flex h-screen flex-col justify-between pb-5">
      <div className="flex h-screen flex-col gap-5">
        <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
          <IoChevronBack
            className="col-span-1 cursor-pointer"
            onClick={() => navigate("/user/profile")}
          />
          <span className="col-span-1 text-center">Edit Profile</span>
        </div>
        <div className="flex flex-col gap-3 font-dm-sans text-lg">
          {ProfileEditPageData.map((data) => {
            return (
              <div
                key={data.id}
                className="flex cursor-pointer justify-between border-b px-5 pb-3"
                onClick={() =>
                  openModal(
                    `${data.label}`,
                    <>
                      {data.type !== "dropdown" ? (
                        <PopUpForm
                          id={data.id}
                          apiValue={formValues[data.id]}
                          type={data.type}
                          setFormValues={setFormValues}
                        />
                      ) : (
                        <PopUpSelectedField
                          options={data.options!}
                          selectedOption={activityLevel}
                          onChange={(value) =>
                            setFormValues((prevValues) => ({
                              ...prevValues,
                              [data.id]: value,
                            }))
                          }
                        />
                      )}
                    </>,
                    "bottom",
                    false,
                  )
                }
              >
                <span>{data.label}</span>
                <span className="text-primary">
                  {formValues[data.id] || "Add"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="btn mx-5 rounded-lg bg-primary text-xl text-white hover:bg-primary/90"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default ProfileEditPage;

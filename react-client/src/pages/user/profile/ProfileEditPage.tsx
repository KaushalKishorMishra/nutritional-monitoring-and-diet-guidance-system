import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useModalStore } from "../../../hooks/store/modal.store";
import PopUpForm from "../../../components/forms/popUpForm/PopUpForm";
import PopUpSelectedField from "../../../components/forms/PopUpSelectedField";
import useUserDataStore from "../../../hooks/store/userData.store";
import {
  capitalizeFirstLetter,
  formatString,
} from "../../../utils/randomUtils.utils";
import ConfirmSaveChangesModal from "../../../components/modal/confirmation/ConfirmSaveChangesModal";
import { updateUserDetails } from "../../../api/user.api";
import { useLoadingStore } from "../../../hooks/store/loading.store";
import Loading from "../../../components/loading/Loading";
import { toast } from "react-toastify";

interface ProfileEditPageData {
  id: keyof FormValues;
  label: string;
  name: string;
  required: boolean;
  type: string;
  options?: string[];
  unit?: string;
}

export interface FormValues {
  Age: string;
  Height: string;
  Weight: string;
  Gender: "MALE" | "FEMALE" | "OTHER";
  ActivityLevel:
  | "SEDENTARY"
  | "LIGHTLY_ACTIVE"
  | "MODERATELY_ACTIVE"
  | "VERY_ACTIVE"
  | "SUPER_ACTIVE";
}

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const { loading, setLoading } = useLoadingStore();

  const { age, height, weight, gender, activityLevel, setUserData } =
    useUserDataStore();

  const [formValues, setFormValues] = useState<FormValues>({
    Age: "",
    Height: "",
    Weight: "",
    Gender: "MALE",
    ActivityLevel: "SEDENTARY",
  });

  // Sync localStorage data once on component mount
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user-data")!);

    if (storedUserData?.state) {
      setFormValues({
        Age: age || storedUserData.state.age || "",
        Height: height || storedUserData.state.height || "",
        Weight: weight || storedUserData.state.weight || "",
        Gender: gender || storedUserData.state.gender || "",
        ActivityLevel:
          activityLevel || storedUserData.state.activityLevel || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once

  const ProfileEditPageData: ProfileEditPageData[] = [
    {
      id: "Age",
      label: "Age",
      name: "age",
      required: true,
      type: "number",
      unit: "years",
    },
    {
      id: "Height",
      label: "Height",
      name: "height",
      required: true,
      type: "number",
      unit: "cm",
    },
    {
      id: "Weight",
      label: "Weight",
      name: "weight",
      required: true,
      type: "number",
      unit: "kg",
    },
    {
      id: "Gender",
      label: "Gender",
      name: "gender",
      required: true,
      type: "dropdown" as const,
      options: ["MALE", "FEMALE", "OTHER"],
    },
    {
      type: "dropdown" as const,
      id: "ActivityLevel",
      label: "ActivityLevel",
      name: "ActivityLevel",
      required: true,
      options: [
        "SEDENTARY",
        "LIGHTLY_ACTIVE",
        "MODERATELY_ACTIVE",
        "VERY_ACTIVE",
        "SUPER_ACTIVE",
      ],
    },
  ];

  const updateProfile = async () => {
    try {
      setLoading(true);
      await updateUserDetails({
        age: formValues.Age,
        height: formValues.Height,
        weight: formValues.Weight,
        gender: formValues.Gender,
        activityLevel: formValues.ActivityLevel,
      }).then(() => {
        closeModal("Save Changes");
        toast.success("Profile updated successfully!");
      });
    } catch (error) {
      closeModal("Save Changes");
      console.error("Error updating profile:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    try {
      setUserData({
        age: parseInt(formValues.Age),
        height: parseInt(formValues.Height),
        weight: parseInt(formValues.Weight),
        gender: formValues.Gender,
        activityLevel: formValues.ActivityLevel,
      });
      openModal(
        "Save Changes",
        <ConfirmSaveChangesModal
          confirmation={updateProfile}
          id="Save Changes"
        />,
        "center",
        true,
      );
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between pb-5">
      {loading && <Loading />}
      <div className="flex h-screen flex-col gap-5">
        <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
          <IoChevronBack
            className="col-span-1 cursor-pointer"
            onClick={() => navigate("/user/profile")}
          />
          <span className="col-span-1 text-center">Edit Profile</span>
        </div>
        <div className="flex flex-col gap-3 font-dm-sans text-lg">
          {ProfileEditPageData.map((data) => (
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
                        selectedOption={formValues[data.id]}
                        onChange={(value) =>
                          setFormValues((prevValues) => ({
                            ...prevValues,
                            [data.id]: value,
                          }))
                        }
                        id={data.id}
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
                {data.type === "dropdown"
                  ? capitalizeFirstLetter(formatString(formValues[data.id]))
                  : formValues[data.id]}
                <span>
                  {data.unit && ` ${data.unit}`}
                </span>
              </span>
            </div>
          ))}
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

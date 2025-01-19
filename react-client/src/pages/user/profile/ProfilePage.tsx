import React from "react";
import { IoChevronBack } from "react-icons/io5";
import {
  MdMailOutline,
  MdOutlineLogout,
  MdOutlineSettings,
} from "react-icons/md";
import useAppSettingsStore, {
  Theme,
} from "../../../hooks/store/appSettings.store";
import { useNavigate } from "react-router";
import { CgDarkMode } from "react-icons/cg";
import { IoMdInformationCircleOutline } from "react-icons/io";

import packageJson from "../../../../package.json";
import useUserDataStore from "../../../hooks/store/userData.store";

const ProfilePage: React.FC = () => {
  const { setTheme, theme } = useAppSettingsStore();
  const navigate = useNavigate();
  const { name, email } = useUserDataStore();

  console.log(name, email);

  const intakeCalories = 3000;

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
        <IoChevronBack
          className="col-span-1"
          onClick={() => navigate("/user/dashboard")}
        />
        <span className="col-span-1 text-center">Profile</span>
      </div>
      {/* profile details */}
      <div className="flex flex-col items-center gap-2 font-dm-sans">
        <div className="aspect-square w-24 rounded-full bg-black" />
        <div className="text-center">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-primary">{email}</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 px-5 py-3 font-dm-sans text-lg">
          <div
            className="flex items-center justify-between rounded-lg bg-primary px-5 py-3 text-white"
            onClick={() => navigate("/user/profile/edit")}
          >
            Me
            <IoChevronBack className="rotate-180" />
          </div>
          <div className="flex justify-between rounded-lg bg-[#dbfbed] px-5 py-3">
            Calorie Intake{" "}
            <span className="text-primary">{intakeCalories} Cal</span>
          </div>
          <div className="flex justify-between rounded-lg bg-[#dbfbed] px-5 py-3">
            Weight Unit<span className="text-primary">Kilograms</span>
          </div>
        </div>
        <div className="divider px-3"></div>
        <div className="flex flex-col gap-5 px-5 font-dm-sans text-xl">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-5">
              {/* {theme === Theme.Light ? (
              <CiSun className="text-primary" />
            ) : (
              <MdOutlineDarkMode className="text-primary" />
            )} */}
              <CgDarkMode className="text-2xl text-primary" />
              {theme === Theme.Light ? "Light" : "Dark"}
            </span>
            <input
              type="checkbox"
              defaultChecked
              onClick={() =>
                setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
              }
              className={`toggle toggle-primary`}
              data-theme={theme}
            />
          </div>
          <div className="flex items-center gap-5">
            <MdMailOutline className="text-2xl text-primary" />
            Contact Us
          </div>
          <div className="flex items-center gap-5">
            <IoMdInformationCircleOutline className="text-2xl text-primary" />
            About App
          </div>
          <div className="flex items-center gap-5">
            <MdOutlineSettings className="text-2xl text-primary" />
            Setting
          </div>
          <div className="flex items-center gap-5">
            <MdOutlineLogout className="text-2xl text-primary" />
            Log Out
          </div>
        </div>
      </div>
      <div className="py-8 text-center font-nunito-sans text-lg font-semibold text-base-300">
        Version {packageJson.version}
      </div>
    </div>
  );
};

export default ProfilePage;

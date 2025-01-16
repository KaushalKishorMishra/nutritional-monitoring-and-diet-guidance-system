import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import useAppSettingsStore, {
  Theme,
} from "../../hooks/store/appSettings.store";
import { CiSun } from "react-icons/ci";

const ProfilePage: React.FC = () => {
  const { setTheme, theme } = useAppSettingsStore();

  return (
    <div>
      <div>
        <IoChevronBack />
        <h2>Profile</h2>
      </div>
      {/* profile details */}
      <div>
        <img src="" alt="" />
        <h3>Username</h3>
        <p>Email</p>
      </div>
      <div>
        <div className="btn">Calorie Intake</div>
        <div className="btn">Weight</div>
      </div>
      <div>
        <div>
          {theme === Theme.Light ? <MdOutlineDarkMode /> : <CiSun />}
          {theme === Theme.Light ? "Light" : "Dark"}
          <input
            type="checkbox"
            defaultChecked
            onClick={() =>
              setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
            }
            className={`toggle ${
              theme === Theme.Light
                ? "!bg-black !text-white"
                : "!bg-white !text-black"
            } p-2`}
          />
        </div>
        <div>Contact Us</div>
        <div>About App</div>
        <div>Setting</div>
      </div>
    </div>
  );
};

export default ProfilePage;

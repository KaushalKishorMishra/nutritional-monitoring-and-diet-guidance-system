import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdMailOutline, MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAppSettingsStore, { Theme } from "../../../hooks/store/appSettings.store";
import useUserDataStore from "../../../hooks/store/userData.store";
import { logout } from "../../../api/auth.api";
import packageJson from "../../../../package.json";

const ProfilePage: React.FC = () => {
  const { setTheme, theme } = useAppSettingsStore();
  const navigate = useNavigate();
  const { name, email, calorie } = useUserDataStore();
  const intakeCalories = calorie.toFixed(2);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      {/* Header */}
      <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
        <IoChevronBack className="col-span-1 cursor-pointer" onClick={() => navigate("/user/dashboard")} />
        <span className="col-span-1 text-center">Profile</span>
      </div>

      {/* Profile Details */}
      <div className="flex flex-col items-center gap-2 font-dm-sans">
        <div className="aspect-square w-24 rounded-full bg-black" />
        <div className="text-center">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-primary">{email}</p>
        </div>
      </div>

      {/* Profile Actions */}
      <div>
        <div className="flex flex-col gap-1 px-5 py-3 font-dm-sans text-lg">
          <ProfileActionButton label="Me" onClick={() => navigate("/user/profile/edit")} />
          <ProfileActionButton label="Calorie Intake" value={`${intakeCalories} Cal`} />
          <ProfileActionButton label="Weight Unit" value="Kilograms" />
        </div>
        <div className="divider px-3"></div>
        <div className="flex flex-col gap-5 px-5 font-dm-sans text-xl">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <ProfileLink icon={<MdMailOutline className="text-2xl text-primary" />} label="Contact Us" onClick={() => navigate("/user/contact-us")} />
          <ProfileLink icon={<IoMdInformationCircleOutline className="text-2xl text-primary" />} label="About App" onClick={() => navigate("/user/about-us")} />
          <ProfileLink icon={<MdOutlineSettings className="text-2xl text-primary" />} label="Setting" />
          <ProfileLink icon={<MdOutlineLogout className="text-2xl text-primary" />} label="Log Out" onClick={handleLogout} />
        </div>
      </div>

      {/* Footer */}
      <div className={`py-8 text-center font-nunito-sans font-bold text-lg ${theme === Theme.Light ? "text-black/50" : "text-white/50"}`}>
        Version {packageJson.version}
      </div>
    </div>
  );
};

// Reusable Profile Action Button Component
const ProfileActionButton: React.FC<{ label: string; value?: string; onClick?: () => void }> = ({ label, value, onClick }) => (
  <div
    className={`flex justify-between rounded-lg ${value ? "bg-secondary" : "bg-primary"} px-5 py-3 ${!value && "text-white"} cursor-pointer`}
    onClick={onClick}
  >
    {label}
    {value && <span className="text-primary">{value}</span>}
  </div>
);

// Reusable Profile Link Component
const ProfileLink: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <div className="flex items-center gap-5 cursor-pointer hover:text-primary" onClick={onClick}>
    {icon}
    {label}
  </div>
);

// Reusable Theme Toggle Component
const ThemeToggle: React.FC<{ theme: Theme; setTheme: (theme: Theme) => void }> = ({ theme, setTheme }) => (
  <div className="flex items-center justify-between">
    <span className="flex items-center gap-5">
      <CgDarkMode className="text-2xl text-primary" />
      {theme === Theme.Light ? "Light" : "Dark"}
    </span>
    <input
      type="checkbox"
      defaultChecked={theme === Theme.Light}
      onChange={() => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)}
      className="toggle toggle-primary"
      data-theme={theme}
    />
  </div>
);

export default ProfilePage;
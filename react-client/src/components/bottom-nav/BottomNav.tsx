import React from "react";
import { FaChartPie } from "react-icons/fa";
import { LuApple } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";

interface PBottomNav {
  bottomNav: string;
  setBottomNav: React.Dispatch<
    React.SetStateAction<"food" | "report" | "diary">
  >;
}

interface NavItem {
  id: "food" | "diary" | "report";
  label: string;
  Icon: React.ElementType;
}

const NavItem: React.FC<{
  isActive: boolean;
  onClick: () => void;
  label: string;
  Icon: React.ElementType;
}> = ({ isActive, onClick, label, Icon }) => (
  <div
    className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full transition-all duration-300 ${
      isActive
        ? "translate-y-[-10%] bg-[#2fcb8d] text-white shadow-[0_0_0_12px_#dbfbed]"
        : "translate-y-0 text-[#2fcb8d]"
    }`}
    onClick={onClick}
  >
    <Icon className={`text-xl font-bold`} />
    <span className="text-sm font-bold">{label}</span>
  </div>
);

const BottomNav: React.FC<PBottomNav> = ({ bottomNav, setBottomNav }) => {
  const navItems: NavItem[] = [
    { id: "food", label: "Food", Icon: LuApple },
    { id: "diary", label: "Diary", Icon: FaChartPie },
    { id: "report", label: "Report", Icon: VscGraph },
  ];

  return (
    <div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-evenly bg-[#dbfbed]">
      {navItems.map(({ id, label, Icon }) => (
        <NavItem
          key={id}
          isActive={bottomNav === id}
          onClick={() => setBottomNav(id)}
          label={label}
          Icon={Icon}
        />
      ))}
    </div>
  );
};

export default BottomNav;

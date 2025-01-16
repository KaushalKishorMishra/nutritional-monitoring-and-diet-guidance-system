import React from "react";
import { FaRegUser } from "react-icons/fa";
import { LuApple } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";

interface PBottomNav {
  bottomNav: string;
  setBottomNav: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNav: React.FC<PBottomNav> = ({ bottomNav, setBottomNav }) => {
  return (
    <div className="fixed bottom-0 left-0 flex h-20 w-full flex-row items-center justify-evenly bg-[#dbfbed]">
      <div
        className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full ${bottomNav === "food" ? "bg-[#2fcb8d] text-white" : "text-[#2fcb8d]"}`}
        onClick={() => setBottomNav("food")}
      >
        <LuApple className="text-xl font-bold" />
        <span className="text-sm font-bold">Food</span>
      </div>
      <div
        className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full ${bottomNav === "report" ? "bg-[#2fcb8d] text-white" : "text-[#2fcb8d]"}`}
        onClick={() => setBottomNav("report")}
      >
        <VscGraph className="text-xl font-bold" />
        <span className="text-sm font-bold">Reports</span>
      </div>
      <div
        className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full ${bottomNav === "profile" ? "bg-[#2fcb8d] text-white" : "text-[#2fcb8d]"}`}
        onClick={() => setBottomNav("profile")}
      >
        <FaRegUser className="text-xl font-bold" />
        <span className="text-sm font-bold">Profile</span>
      </div>
    </div>
  );
};

export default BottomNav;

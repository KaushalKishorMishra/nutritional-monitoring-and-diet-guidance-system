import React from "react";
import CustomDatePicker from "../forms/DatePicker";
import { useNavigate } from "react-router";

interface PDashboardTopNav {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileRes: any;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  onPage: "food" | "report" | "diary";
}

const DashboardTopNav: React.FC<PDashboardTopNav> = ({
  profileRes,
  date,
  setDate,
  onPage,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-base-100 p-3 shadow-md ">
      <div className="flex items-center justify-between">
        <div className="flex w-1/2 items-center gap-2">
          <img
            src="/apple.svg"
            className="aspect-square w-12 rounded-full border-2 p-1"
          />
          {profileRes && (
            <h1
              className="font-dm-sans text-lg font-semibold capitalize hover:cursor-pointer"
              onClick={() => navigate("/user/profile")}
            >
              {" "}
              {profileRes.name.split(" ")[0]}
            </h1>
          )}
        </div>
        {onPage === "diary" && (
          <div className="w-1/2">
            <CustomDatePicker date={date} setDate={setDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTopNav;

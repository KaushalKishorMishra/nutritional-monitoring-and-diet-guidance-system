import React from "react";
import CustomDatePicker from "../forms/DatePicker";
import { useNavigate } from "react-router";

interface PDashboardTopNav {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileRes: any;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DashboardTopNav: React.FC<PDashboardTopNav> = ({
  profileRes,
  date,
  setDate,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/apple.svg"
            className="aspect-square w-12 rounded-full border-2 p-1"
          />
          {profileRes && (
            <h1
              className="font-dm-sans font-semibold capitalize hover:cursor-pointer"
              onClick={() => navigate("/user/profile")}
            >
              {" "}
              {profileRes.name}
            </h1>
          )}
        </div>
        <div>
          <CustomDatePicker date={date} setDate={setDate} />
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;

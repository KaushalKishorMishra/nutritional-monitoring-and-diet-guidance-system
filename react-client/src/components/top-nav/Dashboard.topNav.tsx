import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

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
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/apple.svg"
            className="aspect-square w-12 rounded-full border-2 p-1"
          />
          {profileRes && (
            <h1 className="font-dm-sans font-semibold capitalize">
              {" "}
              {profileRes.name}
            </h1>
          )}
        </div>
        <div className="flex items-center justify-end gap-5">
          <label htmlFor="" className="">
            {date.toISOString().split("T")[0]}
          </label>
          <div className="relative">
            <input
              type="date"
              value={date.toISOString()}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="absolute right-0 rounded-lg border-b-2 border-gray-400 bg-white px-4 py-2 focus:outline-primary"
            />
            <FaCalendarAlt
              className="cursor-pointer text-primary"
              onClick={() => {
                const dateInput = document.querySelector(
                  'input[type="date"]',
                ) as HTMLInputElement;

                if (dateInput) {
                  // Add a custom class to the input element
                  dateInput.classList.add("custom-date-input");

                  // Trigger the date picker
                  dateInput.showPicker();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;

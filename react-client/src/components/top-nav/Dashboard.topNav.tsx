import React from "react";

interface PDashboardTopNav {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileRes: any;
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
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
        <div className="customized-datepicker">
          <input
            type="date"
            value={date?.toISOString().slice(0, 10)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { IoCalendar } from "react-icons/io5";
import { monthDayYearFormatForAPI } from "../../utils/dateFormator.utils";
import "react-day-picker/style.css";

interface CustomDatePickerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  setDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    setShowDatePicker(false); // Close the date picker after selecting the date
  };

  return (
    <div className="mx-auto p-4">
      <div className="relative">
        {/* Display selected date */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={monthDayYearFormatForAPI(date.toISOString())}
            readOnly
            className="w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <IoCalendar
            className="cursor-pointer text-2xl text-primary"
            onClick={() => setShowDatePicker(!showDatePicker)} // Toggle the popover
          />
        </div>

        {/* DayPicker Popover */}
        {showDatePicker && (
          <div className="fixed left-1/2 top-1/2 z-50 h-fit w-screen -translate-x-1/2 -translate-y-1/2 transform rounded-md border px-4">
            <DayPicker
              mode="single"
              selected={date}
              onDayClick={handleDateChange}
              captionLayout="dropdown"
              weekStartsOn={1}
              className="h-1/2 rounded-xl bg-white shadow-xl outline outline-primary"
              dir="ltr"
              classNames={{
                today: `text-primary`, // Add a border to today's date
                selected: `text-primary border border-primary`, // Highlight the selected day
                root: `shadow-lg p-5`, // Add a shadow to the root element
                chevron: `fill-primary`, // Change the color of the chevron
                nav: `flex justify-between`, // Add a border to the navigation buttons
                month_caption: `text-primary font-dm-sans text-xl w-full text-center mb-3`, // Change the color of the month caption
                week: `border text-center w-full`, // Add a border to the week days
                day_button: `px-2 py-2`, // Add padding to the day button
                weekdays: `text-center`, // Add a border to the weekdays
              }}
              timeZone="Asia/Katmandu"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;

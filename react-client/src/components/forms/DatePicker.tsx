import React from "react";
import { DayPicker } from "react-day-picker";
import { IoCalendar } from "react-icons/io5";
import { monthDayYearFormatForAPI } from "../../utils/dateFormator.utils";
import "react-day-picker/style.css";
import { useModalStore } from "../../hooks/store/modal.store";

interface CustomDatePickerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  setDate,
}) => {
  const { openModal, closeModal } = useModalStore();

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="mx-auto">
      <div className="">
        {/* Display selected date */}
        <div className="relative">
          <input
            type="text"
            value={monthDayYearFormatForAPI(date.toISOString())}
            readOnly
            className="w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <IoCalendar
            className="absolute right-0 top-2 transform cursor-pointer text-2xl text-primary"
            onClick={() => {
              openModal(
                `Selected Data: ${monthDayYearFormatForAPI(date.toISOString())}`,
                <DayPicker
                  mode="single"
                  selected={date}
                  onDayClick={handleDateChange}
                  captionLayout="dropdown"
                  weekStartsOn={1}
                  className="h-1/2 !w-full rounded-xl bg-white shadow-xl"
                  dir="ltr"
                  onSelect={() => {
                    closeModal(
                      `Selected Data: ${monthDayYearFormatForAPI(date.toISOString())}`,
                    );
                  }}
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
                />,
                "center",
                false,
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;

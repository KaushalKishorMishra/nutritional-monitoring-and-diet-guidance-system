import React from "react";
import { monthDayYearFormatForAPI } from "../../utils/dateFormator.utils";
import { IoCalendar } from "react-icons/io5";
import { DayPicker } from "react-day-picker";
import { useModalStore } from "../../hooks/store/modal.store";

interface PRangeDatePicker {
  date: {
    from: Date;
    to: Date;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      from: Date;
      to: Date;
    }>
  >;
  fetchData: () => void;
}

const RangeDatePicker: React.FC<PRangeDatePicker> = ({
  date,
  setDate,
  fetchData,
}) => {
  const { openModal, closeModal } = useModalStore();

  const handleDateChange = (newDate: { from: Date; to: Date }) => {
    setDate(newDate);
  };
  return (
    <div className="mx-auto">
      <div className="">
        {/* Display selected date */}
        <div className="relative">
          <input
            type="text"
            value={
              monthDayYearFormatForAPI(date.from.toISOString()) +
              " - " +
              monthDayYearFormatForAPI(date.to.toISOString())
            }
            readOnly
            className="w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <IoCalendar
            className="absolute right-0 top-2 transform cursor-pointer text-2xl text-primary"
            onClick={() => {
              openModal(
                `Selected Data: ${monthDayYearFormatForAPI(date.from.toISOString())} - ${monthDayYearFormatForAPI(date.to.toISOString())}`,
                <div className="">
                  <DayPicker
                    mode="range"
                    min={1}
                    max={30}
                    selected={date}
                    onDayClick={() => handleDateChange}
                    captionLayout="dropdown"
                    weekStartsOn={1}
                    className="h-1/2 !w-full rounded-xl bg-white shadow-xl"
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
                  <div className="flex items-center justify-end gap-4 pt-3">
                    <button
                      className="btn btn-outline btn-error w-20 hover:!text-white"
                      onClick={() => {
                        closeModal(
                          `Selected Data: ${monthDayYearFormatForAPI(date.from.toISOString())} - ${monthDayYearFormatForAPI(date.to.toISOString())}`,
                        );
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success w-20 text-white"
                      onClick={() => {
                        fetchData();
                        // closeModal(
                        //   `Selected Data: ${monthDayYearFormatForAPI(date.from.toISOString())} - ${monthDayYearFormatForAPI(date.to.toISOString())}`,
                        // );
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </div>,
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

export default RangeDatePicker;

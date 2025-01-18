import React from "react";
import { Datepicker } from "flowbite-react";
// import type { CustomFlowbiteTheme } from "flowbite-react";

interface PDashboardTopNav {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileRes: any;
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

// const customColors: CustomFlowbiteTheme = {
//     "root": {
//       "base": "relative"
//     },
//     "popup": {
//       "root": {
//         "base": "absolute top-10 z-50 block pt-2",
//         "inline": "relative top-0 z-auto",
//         "inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
//       },
//       "header": {
//         "base": "",
//         "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
//         "selectors": {
//           "base": "mb-2 flex justify-between",
//           "button": {
//             "base": "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
//             "prev": "",
//             "next": "",
//             "view": ""
//           }
//         }
//       },
//       "view": {
//         "base": "p-1"
//       },
//       "footer": {
//         "base": "mt-2 flex space-x-2",
//         "button": {
//           "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
//           "today": "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
//           "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
//         }
//       }
//     },
//     "views": {
//       "days": {
//         "header": {
//           "base": "mb-1 grid grid-cols-7",
//           "title": "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
//         },
//         "items": {
//           "base": "grid w-64 grid-cols-7",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "months": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "years": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "decades": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       }
//     }

// }

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
          <Datepicker
            defaultValue={new Date()}
            value={date}
            className="w-full ring-primary hover:ring-2 rounded-lg border-none outline-none ring-0"
            autoHide={false}
            onChange={(date) => setDate(date)}
            color="bg-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;

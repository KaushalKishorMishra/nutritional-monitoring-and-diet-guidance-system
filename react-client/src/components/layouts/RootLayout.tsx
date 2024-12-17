import React, { PropsWithChildren } from "react";

interface PRootLayout extends PropsWithChildren {
  setTheme: React.Dispatch<React.SetStateAction<"customLight" | "customDark">>;
  theme: "customLight" | "customDark";
}

const RootLayout: React.FC<PRootLayout> = ({ children, setTheme, theme }) => {
  return (
    <div>
      <button
        onClick={() =>
          setTheme((prev) =>
            prev === "customLight" ? "customDark" : "customLight"
          )
        }
        className={`hidden btn btn-primary border-none rounded-badge ${
          theme === "customLight"
            ? "bg-black text-white"
            : "bg-white text-black"
        } p-2`}
      >
        {theme === "customLight" ? "Light" : "Dark"}
      </button>
      {children}
    </div>
  );
};

export default RootLayout;

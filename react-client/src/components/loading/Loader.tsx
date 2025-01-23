import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Circle One */}
      <div
        className="circle one absolute border-3 border-transparent border-t-green-400 rounded-full animate-rotate"
        style={{
          height: "50px",
          width: "50px",
          top: "50px",
          left: "50px",
          animationDuration: "0.85s",
        }}
      ></div>

      {/* Circle Two */}
      <div
        className="circle two absolute border-3 border-transparent border-t-green-400 rounded-full animate-rotate"
        style={{
          height: "75px",
          width: "75px",
          top: "38px",
          left: "38px",
          animationDuration: "0.95s",
        }}
      ></div>

      {/* Circle Three */}
      <div
        className="circle three absolute border-3 border-transparent border-t-green-400 rounded-full animate-rotate"
        style={{
          height: "100px",
          width: "100px",
          top: "25px",
          left: "25px",
          animationDuration: "1.05s",
        }}
      ></div>
    </div>
  );
};

export default Loader
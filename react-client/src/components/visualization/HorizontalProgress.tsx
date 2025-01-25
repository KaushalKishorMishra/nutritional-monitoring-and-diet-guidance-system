import React from "react";

interface PHorizontalProgress {
  recommended: number;
  total: number;
  name: string;
  color: string;
}

const HorizontalProgress: React.FC<PHorizontalProgress> = ({
  recommended,
  total,
  name,
  color,
}) => {
  const value = Math.min((total / recommended) * 100, 100);
  const recommendedValue = recommended.toFixed(1);
  const totalValue = total.toFixed(1);

  return (
    <div className="min-w-1/3 flex w-full flex-col items-center gap-2 font-nunito-sans">
      <div className="text-sm font-bold">
        {totalValue} / {recommendedValue}
      </div>
      <progress
        className={`progress ${color} w-full`}
        value={value}
        max="100"
      ></progress>
      <div className="font-dm-sans">{name}</div>
    </div>
  );
};

export default HorizontalProgress;

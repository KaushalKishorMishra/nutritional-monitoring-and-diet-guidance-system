import React from "react";
import { MdOutlineWatchLater } from "react-icons/md";

interface PListItemsCard {
  title: string;
  time?: string;
  cal?: string;
  type?: "dailyIntake" | "food";
  desc?: string;
}

const ListItemsCard: React.FC<PListItemsCard> = ({
  title,
  time,
  cal,
  type = "dailyIntake",
  desc,
}) => {
  return (
    <div
      className="card w-96 bg-base-100 shadow-xl"
      onClick={() => console.log("Card clicked!")}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {type && type === "dailyIntake" ? (
          <div>
            <MdOutlineWatchLater />
            <span>{time}</span>
          </div>
        ) : (
          <p>{desc}</p>
        )}

        <div className="card-actions justify-end">
          <div className="text-primary">{cal} Cal</div>
        </div>
      </div>
    </div>
  );
};

export default ListItemsCard;

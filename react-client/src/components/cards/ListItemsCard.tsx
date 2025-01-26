import React from "react";
import { MdChevronRight, MdOutlineWatchLater } from "react-icons/md";
import { useNavigate } from "react-router";

interface PListItemsCard {
  id: string
  title: string;
  time?: string;
  cal?: string;
  type?: "dailyIntake" | "foodList";
  desc?: string;
}

const ListItemsCard: React.FC<PListItemsCard> = ({
  id,
  title,
  time,
  cal,
  type = "dailyIntake",
  desc,
}) => {
  const navigate = useNavigate()
  return (
    <div
      className="group card h-32 w-full bg-neutral shadow-sm text-base-content transition-all duration-300 hover:shadow-2xl"
      onClick={() => navigate(`/user/food-details/${id}`)}
    >
      <div className="flex h-full gap-4 px-5 py-3">
        {/* Left Section */}
        <div className="flex h-full w-2/3 flex-col justify-between">
          <h2 className="card-title line-clamp-2">{title}</h2>
          {type === "dailyIntake" ? (
            <div className="flex items-center gap-2 text-primary">
              <MdOutlineWatchLater />
              <span>{time}</span>
            </div>
          ) : (
            <p>{desc}</p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex h-full w-1/3 flex-col items-end justify-between gap-3">
          <div className="text-end font-dm-sans text-xl font-semibold text-primary transition-all duration-300 group-hover:drop-shadow-2xl">
            {cal} Cal
          </div>
          <div className="flex items-center justify-center text-xl group-hover:text-primary">
            More{" "}
            <span className="translate-x-0 pt-1 opacity-100 transition-all duration-300 group-hover:translate-x-[5px]">
              <MdChevronRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemsCard;

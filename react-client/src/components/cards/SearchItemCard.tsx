import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface PSearchItemCard {
  image: string;
  name: string;
  calories: string;
}

const SearchItemCard: React.FC<PSearchItemCard> = ({
  image,
  name,
  calories,
}) => {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="flex items-center justify-between bg-base-200 px-5 py-2">
        <div className="flex flex-col">
          <h2 className="card-title font-nunito-sans">{name}</h2>
          <p className="font-dm-sans text-sm text-base-300">{calories} cal</p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn-base btn btn-outline btn-primary flex gap-5 text-sm">
            View Details
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItemCard;

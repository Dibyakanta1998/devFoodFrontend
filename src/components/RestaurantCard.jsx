import React from "react";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({
  info: { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } = {},
}) => {
  return (
    <div className="m-4 p-4 w-[250px] bg-gray-200 rounded-lg hover:bg-gray-400">
      <img className="rounded-lg" src={CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(",")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} min</h4>
    </div>
  );
};

export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white rounded-xs">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;

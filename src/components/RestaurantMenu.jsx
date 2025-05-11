import { useParams } from "react-router";

import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, isLoading } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (isLoading) return <Shimmer />;

  const {
    name,
    cuisines = [],
    costForTwoMessage,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-xl">{name}</h1>
      <h3 className="font-bold text-lg">
        {cuisines.join(",")}-{costForTwoMessage}
      </h3>
      {categories?.map((category, index) => {
        return (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showItems={showIndex === index ? true : false}
            setShowIndex={() =>
              setShowIndex(() => {
                if (index == showIndex) return null;

                return index;
              })
            }
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;

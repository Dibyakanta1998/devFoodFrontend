import React, { useContext, useEffect, useState } from "react";
import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfCardData, setListOfCardData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredRestro, setFilterRestro] = useState([]);
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);
  const { setUserName, loggedInuser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4594965&lng=77.0266383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      setListOfCardData(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
      setFilterRestro(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const isOnline = useOnlineStatus();

  if (!isOnline)
    return (
      <h1>Looks Like your internet connection is not stable!!!Please check</h1>
    );

  if (isLoading) return <Shimmer />;

  return (
    <div className="body">
      <div className="flex ">
        <div className="m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <button
            className="px-4 py-2 mx-4 bg-green-100 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfCardData.filter((restro) => {
                if (
                  restro.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                  return true;
                return false;
              });
              setFilterRestro(filteredRestaurant);
            }}
          >
            Search
          </button>
          <button
            className="px-4 py-2 mx-4 bg-gray-200 rounded-lg"
            onClick={() => {
              setFilterRestro((pre) => {
                return pre.filter((item) => item.info.avgRating >= 4.4);
              });
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="m-4 p-4  flex item-center">
          <label className="flex items-center">User:</label>
          <input
            type="text"
            className="border border-solid border-black px-2 mx-2"
            value={loggedInuser}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestro.map((value) => (
          <Link
            to={`/restaurant/${value.info.id}`}
            key={value.info.id}
            style={{ textDecoration: "none", color: "unset" }}
          >
            {!value?.info?.promoted ? (
              <RestaurantCard {...value} />
            ) : (
              <RestaurantCardPromoted {...value} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

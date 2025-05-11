import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div>
      {items.map((item) => {
        return (
          <div
            key={item.card.info.id}
            className="m-2 p-2 border-b-2 border-gray-200 text-left flex justify-around"
          >
            <div className="w-9/12">
              <div className="py-2">
                <span>{item.card.info.name}</span>
                <span>
                  {" "}
                  - ₹{" "}
                  {item.card.info.price || item.card.info.defaultPrice / 100}
                </span>
              </div>
              <p className="text-xs">{item.card.info.description}</p>
            </div>

            <div className="w-3/12 p-4 relative">
              <div className="absolute bottom-0 ">
                <button
                  className="mx-5 p-2 rounded-lg  bg-black text-white shadow-lg"
                  onClick={() => handleAddItem(item)}
                >
                  Add +
                </button>
              </div>
              <img
                src={CDN_URL + item.card.info.imageId}
                className="w-full max-h-24 min-h-20 "
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;

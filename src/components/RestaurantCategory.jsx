import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const { title } = data || {};
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div key={data?.categoryId}>
      <div className="w-6/12 mx-auto my-2 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span>
            {title}({data?.itemCards.length})
          </span>
          <span>{showItems ? <> 🔽</> : <>🔼 </>}</span>
        </div>
        {showItems && <ItemList items={data?.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;

import React, { useEffect, useState } from "react";

import { MENU_API } from "./constants";

const useRestaurantMenu = (id) => {
  const [resInfo, setResInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) fetchMenu();
  }, [id]);

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(MENU_API + id);
      const json = await data.json();
      setResInfo(json?.data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resInfo,
    isLoading,
  };
};

export default useRestaurantMenu;

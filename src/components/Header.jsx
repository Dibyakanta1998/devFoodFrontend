import React, { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const isOnline = useOnlineStatus();
  const user = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const [btnName, setBtnName] = useState("Login");
  return (
    <div className="flex justify-between shadow-lg m-2 bg-purple-100   sm:bg-pink-50 ">
      <div className="logo-container">
        <img className="w-50" src={LOGO_URL} />
      </div>
      <div className="nav-items items-center">
        <ul className="flex p-4 m-4  justify-between ">
          <li className="px-4">Online Status :{isOnline ? "☑️" : "🎌"} </li>

          <li className="px-4">
            <Link to={"/"}>Home</Link>{" "}
          </li>
          <li className="px-4">
            <Link to={"/about"}>About Us</Link>
          </li>

          <li className="px-4">
            <Link to={"/contact"}> Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to={"/grocery"}> Grocery</Link>
          </li>

          <li className="px-4 font-bold text-xl">
            <Link to={"/cart"}>Cart - {cartItems.length}</Link>
          </li>
          <li className="px-4 font-bold">{user.loggedInuser}</li>

          <button
            className="login"
            onClick={() => {
              setBtnName(btnName == "Login" ? "Logout" : "Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;

import React from "react";
import User from "./User";
import UserClass from "./UserClass";

export const About = () => {
  return (
    <div>
      <h1>About</h1>
      <h2>Web series</h2>
      {/* <User name={"Dibyakanta Barik"} /> */}

      <UserClass name={"Dibyakanta Barik"} />
    </div>
  );
};

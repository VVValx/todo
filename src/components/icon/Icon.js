import React from "react";
import { IconContext } from "react-icons";

export default function Icon({ label, handleClick, myClass }) {
  return (
    <span onClick={handleClick}>
      <IconContext.Provider
        value={{ style: { verticalAlign: "middle" }, className: myClass }}
      >
        {label}
      </IconContext.Provider>
    </span>
  );
}

import React, { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

function CheckAuth({ history, children }) {
  const user = useContext(authContext);

  const isUser = () => {
    if (user.auth) return children;
    else {
      history.replace("/login");
      return <p></p>;
    }
  };

  return isUser();
}

export default CheckAuth;

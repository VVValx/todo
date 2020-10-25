import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authenticate } from "../firebase/Firebase";
import { userContext } from "../../contexts/UserContext";
import { authContext } from "../../contexts/AuthContext";
import Icon from "../icon/Icon";
import { FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import menu from "./menu.module.css";

function Menu() {
  const currentUser = useContext(userContext);
  const authCont = useContext(authContext);

  const logout = () => {
    authenticate.signOut();
    authCont.validateAuth(false);
  };
  return (
    <nav className={menu.menu}>
      <ul className={`${menu.items} ${menu.left}`}>
        <li>logo</li>
      </ul>

      <ul className={`${menu.items} ${menu.right}`}>
        <li style={{ background: currentUser && "none" }}>
          {currentUser ? (
            <Icon label={<FaUserCircle />} myClass={menu.userIcon} />
          ) : (
            <Link to="/login" className="link">
              Login <Icon label={<FiLogIn />} />
            </Link>
          )}
        </li>

        <li>
          {currentUser ? (
            <span onClick={logout}>
              Logout <Icon label={<FiLogOut />} />
            </span>
          ) : (
            <Link to="/register" className="link">
              Signup <Icon label={<FiUserPlus />} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Menu;

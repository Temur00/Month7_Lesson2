import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = ({ user }) => {
  return (
    <div className="header">
      <img src="education.png" alt="img" />
      {user ? <span>{user}</span> : <NavLink to="/login">Login</NavLink>}
    </div>
  );
};

export default Header;


import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({style}) => {
  return (
    <header className="header" style={style}>
      <div className="logo">ZuAi</div>
      <div className="auth-link">
        <Link to="/auth">Make Account</Link>
      </div>
    </header>
  );
};

export default Header;

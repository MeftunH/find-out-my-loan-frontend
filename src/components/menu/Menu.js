import React, { useState, useEffect } from "react";
import "../../style/Menu.css";
import AuthenticationService from "../api/AuthenticationService";
import { Link } from 'react-router-dom';

function Menu() {
  const [isLoggedOn, setIsLoggedOn] = useState(true);
 const handleLogout=()=>{
    AuthenticationService.logout();
    setIsLoggedOn(false);
  }
  useEffect(() => {
    console.log(isLoggedOn);
    if (isLoggedOn===false) {
      window.location.href = "/login";
    }
  });
  if (sessionStorage.getItem('token')) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="logo" />
        <h1>Find Out My Loan</h1>
      </div>
      <div className="menu-icon">&#9776;</div>
      <ul className="menu">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
        <Link to="/login" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
}

export default Menu;
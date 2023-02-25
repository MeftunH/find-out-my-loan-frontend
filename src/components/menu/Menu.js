import React from "react";
import "../../style/Menu.css";

function Menu() {
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
          <a href="#">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
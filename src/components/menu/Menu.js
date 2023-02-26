import React, { useState, useEffect } from "react";
import "../../style/Menu.css";
import AuthenticationService from "../api/AuthenticationService";
import { Link } from 'react-router-dom';
import logo from '../../assets/find-out-my-loan.png'
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
        <img src={logo} alt="logo" />
        <h1>Find Out My Loan</h1>
      </div>
      <div className="menu-icon">&#9776;</div>
      <ul className="menu">
      <li>
        <Link to="/apply-loan">Loan Apply</Link>
        </li>
      <li>
        <Link to="/find-loans">Find Loans</Link>
        </li>
      <li>
        <Link to="/update-profile">Update Profile</Link>
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
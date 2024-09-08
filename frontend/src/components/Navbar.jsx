import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import task from "../assets/icons/task.svg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="navbar">
      <div>
        <img src={task} alt="logo" />
      </div>
      <div className="nav-button-div">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={isLoginPage ? "active-link" : ""}>
              Login
            </Link>
            <Link to="/signup" className={isSignupPage ? "active-link" : ""}>
              Sign Up
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

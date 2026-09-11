import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("currentUser") !== null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}

      <Link to="/" className="navbar-logo">
        CINEBOX
      </Link>


      {/* NAVIGATION */}

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/movies">
          Movies
        </Link>

        {isLoggedIn && (
          <Link to="/booking-history">
            Booking History
          </Link>
        )}

        {isLoggedIn ? (
          <>
            <Link to="/profile">
              Profile
            </Link>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
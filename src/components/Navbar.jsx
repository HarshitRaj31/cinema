import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("currentUser");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setUser(null);

    alert("Logged out successfully");

    navigate("/");
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


        {user && (
          <>
            <Link to="/booking-history">
              Booking History
            </Link>

            <Link to="/profile">
              👤 {user.name || "Profile"}
            </Link>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}


        {!user && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
        {!user && (
          <Link to="/admin-login">
            Admin
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
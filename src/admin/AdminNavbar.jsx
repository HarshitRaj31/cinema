import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("adminLoggedIn");

    alert("Admin logged out successfully");

    navigate("/admin-login");
  };

  return (
    <nav className="admin-navbar">

      {/* LOGO */}

      <Link
        to="/admin"
        className="admin-navbar-logo"
      >
        CINEBOX
        <span>ADMIN</span>
      </Link>


      {/* NAVIGATION */}

      <div className="admin-navbar-links">

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/admin/movies">
          Movies
        </Link>

        <Link to="/admin/theatres">
          Theatres
        </Link>

        <Link to="/admin/shows">
          Shows
        </Link>

        <Link to="/admin/seats">
          Seats
        </Link>

        <Link to="/admin/bookings">
          Bookings
        </Link>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default AdminNavbar;
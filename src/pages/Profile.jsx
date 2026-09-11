import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);


  // =========================
  // LOAD CURRENT USER
  // =========================

  useEffect(() => {

    const loadUser = () => {

      try {

        const savedUser =
          JSON.parse(
            localStorage.getItem("currentUser")
          );

        setUser(savedUser);

      } catch (error) {

        console.error(
          "Unable to load user:",
          error
        );

        setUser(null);

      }

    };


    loadUser();

    // Update if login/logout happens
    // in another browser tab
    window.addEventListener(
      "storage",
      loadUser
    );


    return () => {

      window.removeEventListener(
        "storage",
        loadUser
      );

    };

  }, []);


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem(
      "currentUser"
    );

    alert(
      "Logged out successfully"
    );

    navigate("/login");

  };


  // =========================
  // NOT LOGGED IN
  // =========================

  if (!user) {

    return (

      <div className="profile-page">

        <div className="profile-empty">

          <div className="profile-empty-icon">
            👤
          </div>


          <h2>
            Please Login
          </h2>


          <p>
            Login to view your Cinebox profile.
          </p>


          <Link to="/login">

            <button className="profile-login-btn">
              LOGIN →
            </button>

          </Link>

        </div>

      </div>

    );

  }


  // =========================
  // PROFILE PAGE
  // =========================

  return (

    <div className="profile-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="profile-hero">

        <p>
          CINEBOX
        </p>


        <h1>
          MY PROFILE
        </h1>


        <span>
          Manage your Cinebox account
        </span>

      </section>


      {/* =========================
          PROFILE
      ========================= */}

      <section className="profile-section">

        <div className="profile-card">


          {/* PROFILE TOP */}

          <div className="profile-top">

            <div className="profile-avatar">

              {user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}

            </div>


            <div>

              <h2>
                {user.name || "User"}
              </h2>


              <p>
                Cinebox Member
              </p>

            </div>

          </div>


          {/* =========================
              PROFILE DETAILS
          ========================= */}

          <div className="profile-details">


            {/* FULL NAME */}

            <div className="profile-detail">

              <span>
                FULL NAME
              </span>


              <strong>
                {user.name || "Not available"}
              </strong>

            </div>


            {/* EMAIL */}

            <div className="profile-detail">

              <span>
                EMAIL ADDRESS
              </span>


              <strong>
                {user.email || "Not available"}
              </strong>

            </div>


            {/* ACCOUNT ID */}

            <div className="profile-detail">

              <span>
                ACCOUNT ID
              </span>


              <strong>
                {user.id || "Not available"}
              </strong>

            </div>

          </div>


          {/* =========================
              ACTIONS
          ========================= */}

          <div className="profile-actions">


            <Link to="/booking-history">

              <button className="history-btn">
                🎟️ BOOKING HISTORY
              </button>

            </Link>


            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              LOGOUT →
            </button>


          </div>

        </div>

      </section>

    </div>

  );

};

export default Profile;
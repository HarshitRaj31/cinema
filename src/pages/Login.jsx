import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {

    e.preventDefault();


    // CHECK EMPTY FIELDS

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }


    // GET REGISTERED USERS

    const users =
      JSON.parse(localStorage.getItem("users")) || [];


    // FIND USER

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );


    // INVALID LOGIN

    if (!user) {
      alert("Invalid email or password");
      return;
    }


    // SAVE LOGGED-IN USER

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );


    alert("Login successful!");


    // GO TO HOME

    navigate("/");
  };


  return (
    <div className="login-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="login-hero">

        <p>CINEBOX</p>

        <h1>LOGIN</h1>

        <span>
          Welcome back to your movie experience
        </span>

      </section>


      {/* =========================
          LOGIN SECTION
      ========================= */}

      <section className="login-section">

        <div className="login-card">

          {/* ICON */}

          <div className="login-icon">
            🎬
          </div>


          {/* HEADING */}

          <h2>
            Welcome Back
          </h2>

          <p className="login-subtitle">
            Sign in to continue to CINEBOX
          </p>


          {/* FORM */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="login-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              LOGIN
            </button>

          </form>


          {/* FOOTER */}

          <div className="login-footer">

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Register
            </Link>

          </div>


          {/* BACK HOME */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Remove unnecessary spaces
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check empty fields
    if (
      !cleanName ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // Check password
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Get existing users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check existing email
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      alert("Email is already registered");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password,
    };

    // Save user
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...users,
        newUser
      ])
    );

    alert("Registration successful!");

    // Go to login
    navigate("/login");
  };

  return (
    <div className="register-page">

      {/* HERO */}

      <section className="register-hero">

        <p>CINEBOX</p>

        <h1>CREATE ACCOUNT</h1>

        <span>
          Join Cinebox and start booking your favourite movies
        </span>

      </section>


      {/* REGISTER SECTION */}

      <section className="register-section">

        <div className="register-card">

          <div className="register-icon">
            🎟️
          </div>

          <h2>Register</h2>

          <p className="register-subtitle">
            Create your Cinebox account
          </p>


          <form onSubmit={handleRegister}>

            {/* NAME */}

            <div className="register-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>


            {/* EMAIL */}

            <div className="register-form-group">

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

            <div className="register-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="register-form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

            </div>


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="register-button"
            >
              CREATE ACCOUNT →
            </button>

          </form>


          {/* LOGIN */}

          <div className="register-footer">

            <p>
              Already have an account?
            </p>

            <Link to="/login">
              Login
            </Link>

          </div>


          {/* HOME */}

          <Link
            to="/"
            className="register-back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

   const user = users.find(
  (u) =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === password
);

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login successful!");

    navigate("/");
  };

  return (
    <div className="login-page">

      <section className="login-hero">
        <p>CINEBOX</p>

        <h1>WELCOME BACK</h1>

        <span>
          Login to continue your movie booking journey
        </span>
      </section>


      <section className="login-section">

        <div className="login-card">

          <div className="login-icon">
            🎬
          </div>

          <h2>Login</h2>

          <p className="login-subtitle">
            Enter your account details
          </p>


          <form onSubmit={handleLogin}>

            <div className="login-form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div className="login-form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <button
              type="submit"
              className="login-button"
            >
              LOGIN →
            </button>

          </form>


          <div className="login-footer">

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Create Account
            </Link>

          </div>


          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Login;
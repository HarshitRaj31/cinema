import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Admin credentials
    if (
      email === "admin@cinebox.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      alert("Admin login successful!");

      navigate("/admin");
    } else {
      alert("Invalid admin email or password");
    }
  };

  return (
    <div className="admin-login-page">

      <section className="admin-login-hero">

        <p>CINEBOX ADMIN</p>

        <h1>ADMIN LOGIN</h1>

        <span>
          Login to manage the movie booking system
        </span>

      </section>


      <section className="admin-login-section">

        <div className="admin-login-card">

          <div className="admin-login-icon">
            🔐
          </div>

          <h2>Welcome Admin</h2>

          <p className="admin-login-subtitle">
            Enter your administrator credentials
          </p>


          <form onSubmit={handleLogin}>

            <div className="admin-form-group">

              <label>
                Admin Email
              </label>

              <input
                type="email"
                placeholder="admin@cinebox.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            <div className="admin-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>


            <button
              type="submit"
              className="admin-login-button"
            >
              ADMIN LOGIN →
            </button>

          </form>


          <button
            className="admin-back-button"
            onClick={() => navigate("/")}
          >
            ← Back to Website
          </button>

        </div>

      </section>

    </div>
  );
};

export default AdminLogin;
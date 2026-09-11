import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import './AdminDashboard.css'
const AdminDashboard = () => {
     const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {

    const savedMovies =
      JSON.parse(localStorage.getItem("movies")) || [];

    const savedTheatres =
      JSON.parse(localStorage.getItem("theatres")) || [];

    const savedShows =
      JSON.parse(localStorage.getItem("shows")) || [];

    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setMovies(savedMovies);
    setTheatres(savedTheatres);
    setShows(savedShows);
    setBookings(savedBookings);
  };
  return (
    <div className='admin-page'>
        <section className='admin-hero'>
            <p>CINEBOX ADMIN</p>
            <h1>ADMIN DASHBOARD</h1>
            <span> Manage your cinema booking system</span>
        </section>
        <section className='admin-section'>
            <div className="div">
                <div className="admin-card">
                    <span>🎬</span>
                    <p>MOVIES</p>
            <h2>{movies.length}</h2>
                </div>
                <div className="admin-card">
                    <span>🏢</span>
                    <p>THEATRES</p>
            <h2>{theatres.length}</h2>
                </div>
                <div className="admin-card">
                    <span>🎟️</span>
                    <p>BOOKINGS</p>
            <h2>{bookings.length}</h2>
                </div>
                <div className="admin-card">
                    <span>🕐</span>
                    <p>SHOWS</p>
            <h2>{shows.length}</h2>
                </div>
            </div>
            <div className="admin-actions">
                <Link to='/admin/movies'>
                <button>Manage Movies →</button>
                </Link>
                <Link to='/admin/theatres'>
                <button>Manage Theatres →</button>
                </Link>
                <Link to='/admin/shows'>
                <button>Manage Shows →</button>
                </Link>
                <Link to='/admin/bookings'>
                <button>Manage Bookings →</button>
                </Link>
                <Link to='/admin/seats'>
                <button>Manage Seats →</button>
                </Link>
            </div>
        </section>
    </div>
  )
}

export default AdminDashboard
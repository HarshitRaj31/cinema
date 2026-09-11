import React from 'react'
import { useState,useEffect } from 'react';
import './ManageTheatres.css'
const defaultTheatres = [
  {
    id: 1,
    name: "Cinepolis",
    location: "Salt Lake, Kolkata",
    screens: 6,
    price: 250,
  },
  {
    id: 2,
    name: "INOX",
    location: "South City, Kolkata",
    screens: 5,
    price: 280,
  },
  {
    id: 3,
    name: "PVR Cinemas",
    location: "Quest Mall, Kolkata",
    screens: 7,
    price: 300,
  },
];
const ManageTheatres = () => {
  const [theatres, setTheatres] = useState(() => {
  const saved = localStorage.getItem("theatres");

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem("theatres", JSON.stringify(defaultTheatres));

  return defaultTheatres;
});

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [screens, setScreens] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    localStorage.setItem("theatres", JSON.stringify(theatres));
  }, [theatres]);

  const addTheatre = () => {
    if (!name || !location || !screens || !price) {
      alert("Please fill all fields");
      return;
    }

    const newTheatre = {
      id: Date.now(),
      name,
      location,
      screens: Number(screens),
      price: Number(price),
    };

    setTheatres([...theatres, newTheatre]);

    setName("");
    setLocation("");
    setScreens("");
    setPrice("");
  };

  const deleteTheatre = (id) => {
    if (window.confirm("Delete this theatre?")) {
      setTheatres(theatres.filter((t) => t.id !== id));
    }
  };
  return (
    <div className='theatres'>
      <section className="main-hero">
        <p>CINEBOX ADMIN</p>
        <span>MANAGE THEATRES</span>
        <h3>Add and manage cinema theatres</h3>
      </section>
      <section className='main-hero2'>
        <div className="main-card">
          <div className="section-heading">
            <p>ADD NEW</p>
            <h2>Add Theatre</h2>
          </div>

          <div className="forms-grids">
            <div className="form-grid">
              <label>Theatre Name</label>
              <input type="text" placeholder='Cinepolis' value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-grid">
              <label>Location</label>
              <input type="text" placeholder='Salt Lake'value={location}
                onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="form-grid">
              <label>Screens</label>
              <input type="text" placeholder='6' value={screens}
                onChange={(e) => setScreens(e.target.value)}/>
            </div>
            <div className="form-grid">
              <label>Ticket Price</label>
              <input type="text" placeholder='₹250 ' value={price}
                onChange={(e) => setPrice(e.target.value)}/>
            </div>
          </div>
          <button className="add-movie-btn" onClick={addTheatre}>+ADD THEATRE</button>
        </div>
        <div className="movie-list">
          <div className="section-heading">
            <p>AVAILABLE</p>
            <h2>ALL THEATRES ({theatres.length})</h2>
          </div>
          <div className="admin-movie-grid">
           {theatres.map((theatre) => (
              <div
                className="admin-movie-card"
                key={theatre.id}
              >
                <div className="admin-poster">
                  <span>
                    🏢
                  </span>
                </div>
                <div className="admin-movie-info">
                  <h3>
                    {theatre.name}
                  </h3>
                  <p>
                    {theatre.location}
                  </p>
                  <p>
                    {theatre.screens} Screens
                  </p>
                  <p>
                    ₹{theatre.price} per ticket
                  </p>
                  <button
                    className="delete-movie-btn"
                    onClick={() =>
                      deleteTheatre(theatre.id)
                    }
                  >
                    Delete Theatre
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ManageTheatres
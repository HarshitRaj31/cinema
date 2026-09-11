import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Theater.css";

const defaultTheatres = [
  {
    id: 1,
    name: "Cinepolis",
    location: "Salt Lake,Kolkata",
    screens: 6,
  },
  {
    id: 2,
    name: "INOX",
    location: "South City,Kolkata",
    screens: 5,
  },
  {
    id: 3,
    name: "PVR Cinemas",
    location: "Quest Mall,Kolkata",
    screens: 7,
  },
];

const Theatre = () => {
  const { id } = useParams();

  const [selectTheater, setTheater] = useState("");
  const [theaters, setTheaters] = useState(() => {
    const savedTheatres = localStorage.getItem("theatres");

    if (savedTheatres) {
      return JSON.parse(savedTheatres);
    }

    localStorage.setItem("theatres", JSON.stringify(defaultTheatres));

    return defaultTheatres;
  });

  // Update if theatres change
  useEffect(() => {
    const updateTheatres = () => {
      const savedTheatres = localStorage.getItem("theatres");

      if (savedTheatres) {
        setTheaters(JSON.parse(savedTheatres));
      } else {
        setTheaters(defaultTheatres);
        localStorage.setItem(
          "theatres",
          JSON.stringify(defaultTheatres)
        );
      }
    };

    updateTheatres();

    window.addEventListener("storage", updateTheatres);

    return () => {
      window.removeEventListener("storage", updateTheatres);
    };
  }, []);

  const selectedTheater = theaters.find(
    (theater) => theater.id === selectTheater
  );

  return (
    <div className="theater-page">

      {/* HERO */}
      <section className="Theatre-hero">
        <p>CINEBOX</p>

        <h1>Select your Theater</h1>

        <span>
          Choose a theater near you
        </span>
      </section>

      {/* THEATRES */}
      <section className="theater-section">

        <div className="heading">
          <p>AVAILABLE THEATERS</p>

          <h2>
            Choose Your Cinema
          </h2>
        </div>

        <div className="grid">

          {theaters.map((theater) => (

            <div
              className={
                selectTheater === theater.id
                  ? "theater-card selected"
                  : "theater-card"
              }
              key={theater.id}
              onClick={() => setTheater(theater.id)}
            >

              <div className="icon">
                🎬
              </div>

              <div className="info">

                <h3>
                  {theater.name}
                </h3>

                <p>
                  {theater.location}
                </p>

                <p>
                  {theater.screens} Screens
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* CONTINUE */}
        <div className="continue">

          {selectedTheater ? (

            <Link
              to={`/booking/${id}`}
              state={{
                theater: selectedTheater
              }}
            >
              <button>
                Continue to Show Selection →
              </button>
            </Link>

          ) : (

            <button
              onClick={() =>
                alert("Please select a theatre")
              }
            >
              Continue to Show Selection →
            </button>

          )}

        </div>

      </section>

    </div>
  );
};

export default Theatre;
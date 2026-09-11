import React, { useEffect, useState } from "react";
import "./ManageShows.css";

const defaultShows = [
  // =========================
  // SPIDER-MAN - CINEPOLIS
  // =========================

  {
    id: 1,
    movie: "Spider-Man Brand New Day",
    theatre: "Cinepolis",
    date: "Today",
    time: "10:00 AM",
    price: 180,
  },
  {
    id: 2,
    movie: "Spider-Man Brand New Day",
    theatre: "Cinepolis",
    date: "Today",
    time: "1:30 PM",
    price: 200,
  },
  {
    id: 3,
    movie: "Spider-Man Brand New Day",
    theatre: "Cinepolis",
    date: "Today",
    time: "4:30 PM",
    price: 220,
  },
  {
    id: 4,
    movie: "Spider-Man Brand New Day",
    theatre: "Cinepolis",
    date: "Today",
    time: "7:00 PM",
    price: 250,
  },
  {
    id: 5,
    movie: "Spider-Man Brand New Day",
    theatre: "Cinepolis",
    date: "Today",
    time: "9:30 PM",
    price: 280,
  },

  // =========================
  // SPIDER-MAN - INOX
  // =========================

  {
    id: 6,
    movie: "Spider-Man Brand New Day",
    theatre: "INOX",
    date: "Today",
    time: "11:00 AM",
    price: 200,
  },
  {
    id: 7,
    movie: "Spider-Man Brand New Day",
    theatre: "INOX",
    date: "Today",
    time: "2:00 PM",
    price: 220,
  },
  {
    id: 8,
    movie: "Spider-Man Brand New Day",
    theatre: "INOX",
    date: "Today",
    time: "5:00 PM",
    price: 250,
  },
  {
    id: 9,
    movie: "Spider-Man Brand New Day",
    theatre: "INOX",
    date: "Today",
    time: "8:00 PM",
    price: 280,
  },
  {
    id: 10,
    movie: "Spider-Man Brand New Day",
    theatre: "INOX",
    date: "Today",
    time: "10:30 PM",
    price: 300,
  },

  // =========================
  // OPPENHEIMER - INOX
  // =========================

  {
    id: 11,
    movie: "Oppenheimer",
    theatre: "INOX",
    date: "Tomorrow",
    time: "10:00 AM",
    price: 220,
  },
  {
    id: 12,
    movie: "Oppenheimer",
    theatre: "INOX",
    date: "Tomorrow",
    time: "1:30 PM",
    price: 240,
  },
  {
    id: 13,
    movie: "Oppenheimer",
    theatre: "INOX",
    date: "Tomorrow",
    time: "4:30 PM",
    price: 260,
  },
  {
    id: 14,
    movie: "Oppenheimer",
    theatre: "INOX",
    date: "Tomorrow",
    time: "7:30 PM",
    price: 280,
  },
  {
    id: 15,
    movie: "Oppenheimer",
    theatre: "INOX",
    date: "Tomorrow",
    time: "10:00 PM",
    price: 300,
  },

  // =========================
  // OPPENHEIMER - CINEPOLIS
  // =========================

  {
    id: 16,
    movie: "Oppenheimer",
    theatre: "Cinepolis",
    date: "Tomorrow",
    time: "11:00 AM",
    price: 200,
  },
  {
    id: 17,
    movie: "Oppenheimer",
    theatre: "Cinepolis",
    date: "Tomorrow",
    time: "2:00 PM",
    price: 220,
  },
  {
    id: 18,
    movie: "Oppenheimer",
    theatre: "Cinepolis",
    date: "Tomorrow",
    time: "5:00 PM",
    price: 240,
  },
  {
    id: 19,
    movie: "Oppenheimer",
    theatre: "Cinepolis",
    date: "Tomorrow",
    time: "8:00 PM",
    price: 260,
  },

  // =========================
  // TOXIC - PVR CINEMAS
  // =========================

  {
    id: 20,
    movie: "Toxic",
    theatre: "PVR Cinemas",
    date: "12 Aug",
    time: "10:00 AM",
    price: 220,
  },
  {
    id: 21,
    movie: "Toxic",
    theatre: "PVR Cinemas",
    date: "12 Aug",
    time: "1:00 PM",
    price: 240,
  },
  {
    id: 22,
    movie: "Toxic",
    theatre: "PVR Cinemas",
    date: "12 Aug",
    time: "4:00 PM",
    price: 260,
  },
  {
    id: 23,
    movie: "Toxic",
    theatre: "PVR Cinemas",
    date: "12 Aug",
    time: "7:00 PM",
    price: 300,
  },
  {
    id: 24,
    movie: "Toxic",
    theatre: "PVR Cinemas",
    date: "12 Aug",
    time: "10:00 PM",
    price: 320,
  },
  {
  id: 25,
  movie: "Avengers Doomsday",
  theatre: "INOX",
  date: "Today",
  time: "10:00 AM",
  price: 220
},
{
  id: 26,
  movie: "Avengers Doomsday",
  theatre: "INOX",
  date: "Today",
  time: "1:30 PM",
  price: 240
},
{
  id: 27,
  movie: "Avengers Doomsday",
  theatre: "INOX",
  date: "Today",
  time: "4:30 PM",
  price: 260
},
{
  id: 28,
  movie: "Avengers Doomsday",
  theatre: "INOX",
  date: "Today",
  time: "7:30 PM",
  price: 280
},
{
  id: 29,
  movie: "Avengers Doomsday",
  theatre: "INOX",
  date: "Today",
  time: "10:00 PM",
  price: 300
},
];

const ManageShows = () => {

  // =========================
  // SHOWS
  // =========================

  const [shows, setShows] = useState(() => {

    const savedShows = localStorage.getItem("shows");

    if (!savedShows) {

      localStorage.setItem(
        "shows",
        JSON.stringify(defaultShows)
      );

      return defaultShows;
    }

    const saved = JSON.parse(savedShows);

    const existingIds = saved.map(
      (show) => show.id
    );

    const missingShows = defaultShows.filter(
      (show) => !existingIds.includes(show.id)
    );

    return [
      ...saved,
      ...missingShows
    ];
  });


  // =========================
  // MOVIES
  // =========================

  const [movies, setMovies] = useState(() => {

    const savedMovies =
      localStorage.getItem("movies");

    return savedMovies
      ? JSON.parse(savedMovies)
      : [];
  });


  // =========================
  // THEATRES
  // =========================

  const [theatres, setTheatres] = useState(() => {

    const savedTheatres =
      localStorage.getItem("theatres");

    return savedTheatres
      ? JSON.parse(savedTheatres)
      : [];
  });


  // =========================
  // FORM STATES
  // =========================

  const [movie, setMovie] = useState("");
  const [theatre, setTheatre] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");


  // =========================
  // SAVE SHOWS
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "shows",
      JSON.stringify(shows)
    );

  }, [shows]);


  // =========================
  // ADD SHOW
  // =========================

  const addShow = () => {

    if (
      !movie ||
      !theatre ||
      !date ||
      !time ||
      !price
    ) {

      alert("Please fill all show details");
      return;

    }

    const newShow = {

      id: Date.now(),

      movie,

      theatre,

      date,

      time,

      price: Number(price)

    };

    setShows((previousShows) => [

      ...previousShows,

      newShow

    ]);

    setMovie("");
    setTheatre("");
    setDate("");
    setTime("");
    setPrice("");

    alert("Show added successfully!");

  };


  // =========================
  // DELETE SHOW
  // =========================

  const deleteShow = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this show?"
    );

    if (!confirmDelete) {
      return;
    }

    setShows((previousShows) =>
      previousShows.filter(
        (show) => show.id !== id
      )
    );

  };


  return (

    <div className="manage-shows">

      {/* =========================
          HERO
      ========================= */}

      <section className="manage-hero">

        <p>
          CINEBOX ADMIN
        </p>

        <h1>
          MANAGE SHOWS
        </h1>

        <span>
          Add and manage movie shows
        </span>

      </section>


      <section className="manage-section">

        {/* =========================
            ADD SHOW
        ========================= */}

        <div className="movie-form">

          <div className="section-heading">

            <p>
              ADD NEW
            </p>

            <h2>
              Add Show
            </h2>

          </div>


          <div className="form-grid">

            {/* MOVIE */}

            <div className="form-group">

              <label>
                Movie
              </label>

              <select
                value={movie}
                onChange={(e) =>
                  setMovie(e.target.value)
                }
              >

                <option value="">
                  Select Movie
                </option>

                {movies.map((item) => (

                  <option
                    key={item.id}
                    value={item.title}
                  >
                    {item.title}
                  </option>

                ))}

              </select>

            </div>


            {/* THEATRE */}

            <div className="form-group">

              <label>
                Theatre
              </label>

              <select
                value={theatre}
                onChange={(e) =>
                  setTheatre(e.target.value)
                }
              >

                <option value="">
                  Select Theatre
                </option>

                {theatres.map((item) => (

                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

            </div>


            {/* DATE */}

            <div className="form-group">

              <label>
                Date
              </label>

              <input
                type="text"
                placeholder="Today / Tomorrow"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

            </div>


            {/* TIME */}

            <div className="form-group">

              <label>
                Time
              </label>

              <input
                type="text"
                placeholder="10:00 AM"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
              />

            </div>


            {/* PRICE */}

            <div className="form-group">

              <label>
                Ticket Price
              </label>

              <input
                type="number"
                placeholder="₹250"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

            </div>

          </div>


          <button
            className="add-movie-btn"
            onClick={addShow}
          >
            + Add Show
          </button>

        </div>


        {/* =========================
            SHOW LIST
        ========================= */}

        <div className="movie-list">

          <div className="section-heading">

            <p>
              AVAILABLE
            </p>

            <h2>
              All Shows ({shows.length})
            </h2>

          </div>


          <div className="admin-movie-grid">

            {shows.map((show) => (

              <div
                className="admin-movie-card"
                key={show.id}
              >

                <div className="admin-poster">

                  <span>
                    🎬
                  </span>

                </div>


                <div className="admin-movie-info">

                  <h3>
                    {show.movie}
                  </h3>

                  <p>
                    🏢 {show.theatre}
                  </p>

                  <p>
                    📅 {show.date}
                  </p>

                  <p>
                    🕐 {show.time}
                  </p>

                  <p>
                    💰 ₹{show.price}
                  </p>


                  <button
                    className="delete-movie-btn"
                    onClick={() =>
                      deleteShow(show.id)
                    }
                  >
                    Delete Show
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>

  );
};

export default ManageShows;
import React, { useEffect, useState } from "react";
import "./ManageMovies.css";

const defaultMovies = [
  {
    id: 1,
    title: "Spider-Man Brand New Day",
    genre: "Action",
    language: "English",
    duration: "2h 42m",
    rating: "8.5",
    poster: "🕷️"
  },
  {
    id: 2,
    title: "Oppenheimer",
    genre: "Sci-Fi",
    language: "English",
    duration: "3h 00m",
    rating: "8.6",
    poster: "☢️"
  },
  {
    id: 3,
    title: "Toxic",
    genre: "Action",
    language: "Hindi",
    duration: "3h 20m",
    rating: "8.6",
    poster: "☢️"
  },
  {
      id:4,
      title:"Dhurandhar",
      genre:"Action",
      language:"Hindi",
      duration:"3h 52m",
      rating:"8.6",
      poster:"🔥"
    },
     {
      id:5,
      title:"Chhaava",
      genre:"Drama",
      language:"Hindi",
      duration:"3h 52m",
      rating:"8.6",
      poster:"⚔️"
    },
     {
      id:6,
      title:"Avengers Doomsday",
      genre:"Action",
      language:"English",
      duration:"3h 30m",
      rating:"9.1",
      poster:"⚔️"
    },
    {
      id:7,
      title:"Ramayana",
      genre:"Drama",
      language:"Hindi",
      duration:"3h 00m",
      rating:"9.1",
      poster:"ॐ"
    },
    {
      id:8,
      title:"Jurassic world",
      genre:"Adventure",
      language:"English",
      duration:"2h 04m",
      rating:"6.9",
      poster:"🦖"
    }

];

const ManageMovies = () => {

 const [movies, setMovies] = useState(() => {
  const savedMovies = localStorage.getItem("movies");

  if (savedMovies) {
    const saved = JSON.parse(savedMovies);

    // Add any default movies that are missing
    const existingIds = saved.map((movie) => movie.id);

    const missingMovies = defaultMovies.filter(
      (movie) => !existingIds.includes(movie.id)
    );

    return [...saved, ...missingMovies];
  }

  return defaultMovies;
});


  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [language, setLanguage] = useState("Hindi");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [poster, setPoster] = useState("🎬");


  // Save movies whenever movies change

  useEffect(() => {

    localStorage.setItem(
      "movies",
      JSON.stringify(movies)
    );

  }, [movies]);


  // Add Movie

  const addMovie = () => {

    if (
      !title.trim() ||
      !duration.trim() ||
      !rating.trim()
    ) {
      alert("Please fill all movie details");
      return;
    }


    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      genre,
      language,
      duration: duration.trim(),
      rating,
      poster: poster || "🎬"
    };


    setMovies((previousMovies) => [
      ...previousMovies,
      newMovie
    ]);


    // Clear form

    setTitle("");
    setGenre("Action");
    setLanguage("Hindi");
    setDuration("");
    setRating("");
    setPoster("🎬");
  };


  // Delete Movie

  const deleteMovie = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) {
      return;
    }


    setMovies((previousMovies) =>
      previousMovies.filter(
        (movie) => movie.id !== id
      )
    );
  };


  return (

    <div className="manage-movies">

      {/* HERO */}

      <section className="manage-hero">

        <p>CINEBOX ADMIN</p>

        <h1>MANAGE MOVIES</h1>

        <span>
          Add and manage movies in your cinema
        </span>

      </section>


      <section className="manage-section">

        {/* ADD MOVIE */}

        <div className="movie-form">

          <div className="section-heading">

            <p>ADD NEW</p>

            <h2>
              Add Movie
            </h2>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>
                Movie Title
              </label>

              <input
                type="text"
                placeholder="Enter movie title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Genre
              </label>

              <select
                value={genre}
                onChange={(e) =>
                  setGenre(e.target.value)
                }
              >
                <option>Action</option>
                <option>Adventure</option>
                <option>Sci-Fi</option>
                <option>Drama</option>
                <option>Comedy</option>
              </select>

            </div>


            <div className="form-group">

              <label>
                Language
              </label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
              >
                <option>Hindi</option>
                <option>English</option>
              </select>

            </div>


            <div className="form-group">

              <label>
                Duration
              </label>

              <input
                type="text"
                placeholder="Example: 2h 30m"
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Rating
              </label>

              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder="Example: 8.5"
                value={rating}
                onChange={(e) =>
                  setRating(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Poster
              </label>

              <input
                type="text"
                placeholder="🎬"
                value={poster}
                onChange={(e) =>
                  setPoster(e.target.value)
                }
              />

            </div>

          </div>


          <button
            className="add-movie-btn"
            onClick={addMovie}
          >
            + Add Movie
          </button>

        </div>


        {/* MOVIE LIST */}

        <div className="movie-list">

          <div className="section-heading">

            <p>AVAILABLE</p>

            <h2>
              All Movies ({movies.length})
            </h2>

          </div>


          <div className="admin-movie-grid">

            {movies.map((movie) => (

              <div
                className="admin-movie-card"
                key={movie.id}
              >

                <div className="admin-poster">

                  <span>
                    {movie.poster}
                  </span>

                  <div className="admin-rating">
                    {movie.rating}
                  </div>

                </div>


                <div className="admin-movie-info">

                  <h3>
                    {movie.title}
                  </h3>

                  <p>
                    {movie.genre} · {movie.language}
                  </p>

                  <p>
                    {movie.duration}
                  </p>


                  <button
                    className="delete-movie-btn"
                    onClick={() =>
                      deleteMovie(movie.id)
                    }
                  >
                    Delete Movie
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

export default ManageMovies;
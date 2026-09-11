import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Movie.css";


// =========================
// DEFAULT MOVIES
// =========================

const defaultMovies = [
  {
    id: 1,
    title: "Spider-Man Brand New Day",
    genre: "Action",
    language: "English",
    duration: "2h 42m",
    rating: 8.5,
    poster: "🕷️"
  },
  {
    id: 2,
    title: "Oppenheimer",
    genre: "Sci-Fi",
    language: "English",
    duration: "3h 00m",
    rating: 8.6,
    poster: "☢️"
  },
  {
    id: 3,
    title: "Toxic",
    genre: "Action",
    language: "Hindi",
    duration: "3h 20m",
    rating: 8.6,
    poster: "☠️"
  },
  {
    id: 4,
    title: "Dhurandhar",
    genre: "Action",
    language: "Hindi",
    duration: "3h 52m",
    rating: 8.6,
    poster: "🔥"
  },
  {
    id: 5,
    title: "Chhaava",
    genre: "Drama",
    language: "Hindi",
    duration: "3h 52m",
    rating: 8.6,
    poster: "⚔️"
  },
  {
    id: 6,
    title: "Avengers Doomsday",
    genre: "Action",
    language: "English",
    duration: "3h 30m",
    rating: 9.1,
    poster: "⚔️"
  },
  {
    id: 7,
    title: "Ramayana",
    genre: "Drama",
    language: "Hindi",
    duration: "3h 00m",
    rating: 9.1,
    poster: "ॐ"
  },
  {
    id: 8,
    title: "Jurassic World",
    genre: "Adventure",
    language: "English",
    duration: "2h 04m",
    rating: 6.9,
    poster: "🦖"
  }
];


const Movies = () => {

  const [search, setSearch] = useState("");
  const [genre, getGenre] = useState("All");


  // =========================
  // LOAD MOVIES
  // =========================

  const [movies, setMovies] = useState(() => {

    const saved =
      localStorage.getItem("movies");

    if (saved) {
      return JSON.parse(saved);
    }

    localStorage.setItem(
      "movies",
      JSON.stringify(defaultMovies)
    );

    return defaultMovies;
  });


  // =========================
  // LOAD MOVIES FROM ADMIN
  // =========================

  useEffect(() => {

    const updateMovies = () => {

      const saved =
        localStorage.getItem("movies");

      if (saved) {

        setMovies(
          JSON.parse(saved)
        );

      } else {

        localStorage.setItem(
          "movies",
          JSON.stringify(defaultMovies)
        );

        setMovies(
          defaultMovies
        );

      }

    };


    updateMovies();


    window.addEventListener(
      "storage",
      updateMovies
    );


    return () => {

      window.removeEventListener(
        "storage",
        updateMovies
      );

    };

  }, []);


  // =========================
  // SEARCH + GENRE FILTER
  // =========================

  const filter = movies.filter((movie) => {

    const matchesSearch =
      movie.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );


    const matchGenre =
      genre === "All" ||
      movie.genre === genre;


    return (
      matchesSearch &&
      matchGenre
    );

  });


  return (
    <>

      <div className="movies-page">

        {/* HERO */}

        <section className="movies-hero">

          <div className="movies-hero-content">

            <p className="movies-eyebrow">
              CINEBOX PRESENTS
            </p>

            <h1>
              FIND YOUR
              <span>
                PERFECT MOVIE
              </span>
            </h1>

            <p className="movies-description">
              Explore our collection of movies and find
              something perfect for your next cinema experience.
            </p>

          </div>

        </section>


        {/* EXPLORE */}

        <section className="Explore">

          <div className="explore1">

            <h1>
              EXPLORE
              <span>
                ALL MOVIES
              </span>
            </h1>


            <div className="movie-count">

              <h3>
                {filter.length} Movies
              </h3>

            </div>

          </div>


          {/* SEARCH + FILTER */}

          <div className="search">

            <div className="search-box">

              <input
                type="text"
                placeholder="🔍  Search movies..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <div className="types">

              <button
                onClick={() =>
                  getGenre("All")
                }
              >
                All
              </button>

              <button
                onClick={() =>
                  getGenre("Action")
                }
              >
                Action
              </button>

              <button
                onClick={() =>
                  getGenre("Adventure")
                }
              >
                Adventure
              </button>

              <button
                onClick={() =>
                  getGenre("Sci-Fi")
                }
              >
                Sci-Fi
              </button>

              <button
                onClick={() =>
                  getGenre("Drama")
                }
              >
                Drama
              </button>

              <button
                onClick={() =>
                  getGenre("Comedy")
                }
              >
                Comedy
              </button>

            </div>

          </div>


          {/* MOVIES */}

          <div className="movies-grid">

            {filter.map((movie) => (

              <div
                className="movie-card-page"
                key={movie.id}
              >

                {/* POSTER */}

                <div className="movie-poster-page">

                  <span>
                    {movie.poster || "🎬"}
                  </span>

                  <div className="movie-rating-badge">
                    ⭐ {movie.rating}
                  </div>

                </div>


                {/* MOVIE INFO */}

                <div className="movie-info">

                  <h3>
                    {movie.title}
                  </h3>

                  <p>
                    {movie.genre} ·{" "}
                    {movie.language}
                  </p>

                  <p>
                    {movie.duration}
                  </p>


                  <Link
                    to={`/theater/${movie.id}`}
                  >
                    <button>
                      Book Tickets
                    </button>
                  </Link>

                </div>

              </div>

            ))}

          </div>


          {/* NO MOVIES */}

          {filter.length === 0 && (

            <div className="no-movies">

              <span>
                🎬
              </span>

              <h3>
                No Movies Found
              </h3>

              <p>
                Try searching for another movie
              </p>

            </div>

          )}

        </section>

      </div>

    </>
  );
};


export default Movies;
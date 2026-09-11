import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <>
      <div className="home">

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">

            <p>
              WELCOME TO CINEBOX
            </p>

            <h1>
              Experience the
              <span>MAGIC OF MOVIES</span>
            </h1>

            <p className="description">
              Discover the latest movies, choose your favourite
              seats, and book your tickets anytime.
            </p>

            <div className="hero-buttons">

              <Link to="/movies" className="primary-btn">
                <button>🎟️ Explore Movies</button>
              </Link>

              <Link to="/login" className="secondary-btn">
                <button>Sign In</button>
              </Link>

              <Link to="/admin-login" className="secondary-btn">
                <button>Admin</button>
              </Link>

            </div>
          </div>

          <div className="scroll">
            <span>Scroll to explore</span>
            <div>↓</div>
          </div>
        </section>


        {/* NOW SHOWING */}
        <section className="second">

          <div className="hero2">
            <p className="next2">WHAT'S PLAYING</p>

            <h3>Now Showing</h3>

            <span>
              Catch the latest movies on the big screen
            </span>
          </div>


          <div className="movie-container">

            {/* MOVIE 1 */}
            <div className="movie-card">

              <div className="movie-poster">
                🎬
              </div>

              <h3>Avengers</h3>

              <p>
                Action • English • 2h 30m
              </p>

              <p>⭐ 8.5</p>

              <Link to="/movies">
                <button>Book Now</button>
              </Link>

            </div>


            {/* MOVIE 2 */}
            <div className="movie-card">

              <div className="movie-poster">
                🍿
              </div>

              <h3>Inception</h3>

              <p>
                Sci-Fi • English • 2h 28m
              </p>

              <p>⭐ 8.8</p>

              <Link to="/movies">
                <button>Book Now</button>
              </Link>

            </div>


            {/* MOVIE 3 */}
            <div className="movie-card">

              <div className="movie-poster">
                🎞️
              </div>

              <h3>Interstellar</h3>

              <p>
                Adventure • English • 2h 49m
              </p>

              <p>⭐ 8.7</p>

              <Link to="/movies">
                <button>Book Now</button>
              </Link>

            </div>


            {/* MOVIE 4 */}
            <div className="movie-card">

              <div className="movie-poster">
                🎥
              </div>

              <h3>Dangal</h3>

              <p>
                Drama • Hindi • 2h 41m
              </p>

              <p>⭐ 8.3</p>

              <Link to="/movies">
                <button>Book Now</button>
              </Link>

            </div>

          </div>


          {/* VIEW ALL MOVIES */}
          <div className="btn">
            <Link to="/movies">
              <button>View All Movies →</button>
            </Link>
          </div>

        </section>


        {/* WHY CINEBOX */}
        <section className="why-info">

          <div className="hero3">

            <p>WHY CINEBOX</p>

            <h3>Everything You Need</h3>

          </div>


          <div className="cards-container">

            {/* CARD 1 */}
            <div className="cards">

              <div className="card">
                💺
              </div>

              <h3>Choose Your Seat</h3>

              <p>
                Select your preferred seats before
                confirming your booking.
              </p>

            </div>


            {/* CARD 2 */}
            <div className="cards">

              <div className="card">
                🔒
              </div>

              <h3>Secure Payment</h3>

              <p>
                Enjoy a safe and reliable ticket
                booking experience.
              </p>

            </div>


            {/* CARD 3 */}
            <div className="cards">

              <div className="card">
                ⚡
              </div>

              <h3>Instant Confirmation</h3>

              <p>
                Get your booking confirmation
                instantly after payment.
              </p>

            </div>

          </div>

        </section>


        {/* FINAL CTA */}
        <section className="hero4">

          <div className="next-layout">

            <p>
              READY FOR YOUR NEXT MOVIE?
            </p>

            <h3>
              Your Seat Is Waiting.
            </h3>

            <div className="book-btn">

              <Link to="/movies">
                <button>Book Your Ticket</button>
              </Link>

            </div>

          </div>

        </section>

      </div>
    </>
  )
}

export default Home
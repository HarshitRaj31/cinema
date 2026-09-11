import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Selected theatre
  const theater = location.state?.theater;

  const [date, selectDate] = useState("");
  const [time, selectTime] = useState("");

  // Get movies
  const movies =
    JSON.parse(localStorage.getItem("movies")) || [];

  // Find selected movie
  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  // Get shows
  const shows =
    JSON.parse(localStorage.getItem("shows")) || [];

  // Shows for selected movie + theatre
  const availableShows = shows.filter(
    (show) =>
      show.movie === movie?.title &&
      show.theatre === theater?.name
  );

  // Available dates
  const availableDates = [
    ...new Set(
      availableShows.map((show) => show.date)
    ),
  ];

  // Shows for selected date
  const dateShows = availableShows
    .filter((show) => show.date === date)
    .sort((a, b) =>
      a.time.localeCompare(b.time)
    );

  // Selected show
  const selectedShow = availableShows.find(
    (show) =>
      show.date === date &&
      show.time === time
  );

  // Price
  const ticketPrice = selectedShow?.price || 0;

  // Continue
  const handleContinue = () => {

    if (!date) {
      alert("Please select a date");
      return;
    }

    if (!time) {
      alert("Please select a show time");
      return;
    }

    if (!selectedShow) {
      alert("Please select a valid show");
      return;
    }

    navigate("/seats", {
      state: {
        movieId: id,
        movieTitle: movie?.title,
        date,
        time,
        theater,
        ticketPrice
      }
    });
  };

  return (
    <div className="booking-page">

      {/* HERO */}
      <section className="booking-hero">

        <p>CINEBOX BOOKING</p>

        <h1>Select Your Show</h1>

        <span>
          Choose your preferred date and show time
        </span>

      </section>


      {/* BOOKING SECTION */}
      <section className="booking-section">

        <div className="booking-movie">

          {/* POSTER */}
          <div className="poster">

            {movie?.poster || "🎬"}

          </div>


          {/* DETAILS */}
          <div className="booking-details">

            <p>
              Movie:{" "}
              <strong>
                {movie?.title || "Unknown Movie"}
              </strong>
            </p>


            {theater && (
              <>
                <p>
                  Theater:{" "}
                  <strong>
                    {theater.name}
                  </strong>
                </p>

                <p>
                  Location:{" "}
                  <strong>
                    {theater.location}
                  </strong>
                </p>
              </>
            )}


            {/* DATE */}
            <h2>Select Date</h2>

            <div className="date-option">

              {availableDates.map((showDate) => (

                <button
                  key={showDate}
                  className={
                    date === showDate
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    selectDate(showDate);
                    selectTime("");
                  }}
                >
                  {showDate}
                </button>

              ))}

            </div>


            {/* NO SHOWS */}
            {availableDates.length === 0 && (

              <p className="no-shows">
                No shows available for this theatre.
              </p>

            )}


            {/* SELECTED DATE */}
            {date && (

              <p className="selected-date">
                Selected Date:{" "}
                <strong>
                  {date}
                </strong>
              </p>

            )}


            {/* SHOW TIMES */}
            {date && (

              <div className="show-times">

                <h2>
                  Select Show Time
                </h2>

                <div className="time-options">

                  {dateShows.map((show) => (

                    <button
                      key={show.id}
                      className={
                        time === show.time
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        selectTime(show.time)
                      }
                    >

                      <span>
                        {show.time}
                      </span>

                      <small>
                        ₹{show.price}
                      </small>

                    </button>

                  ))}

                </div>


                {/* NO SHOW */}
                {dateShows.length === 0 && (

                  <p className="no-shows">
                    No shows available for this date.
                  </p>

                )}


                {/* SELECTED SHOW */}
                {selectedShow && (

                  <div className="selected-time">

                    <p>
                      Selected Time:{" "}
                      <strong>
                        {selectedShow.time}
                      </strong>
                    </p>

                    <p>
                      Ticket Price:{" "}
                      <strong>
                        ₹{selectedShow.price}
                      </strong>
                    </p>

                  </div>

                )}

              </div>

            )}


            {/* CONTINUE */}
            <div className="continue-booking">

              <button
                onClick={handleContinue}
              >
                Select Your Seats →
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Booking;
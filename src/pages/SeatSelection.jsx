import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SeatLayout from "../components/SeatLayout";
import "./Booking.css";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movieId,
    movieTitle,
    date,
    time,
    theater,
    ticketPrice
  } = location.state || {};

  const [seats, selectSeats] = useState([]);

  // =========================
  // CHECK BOOKING DATA
  // =========================

  useEffect(() => {
    if (!movieId || !theater || !date || !time) {
      alert("Please select a movie, theatre and show first.");
      navigate("/movies");
    }
  }, [movieId, theater, date, time, navigate]);


  // =========================
  // SEAT ROWS
  // =========================

  const seatRows = [
    ["A1", "A2", "A3", "A4", "A5", "A6"],
    ["B1", "B2", "B3", "B4", "B5", "B6"],
    ["C1", "C2", "C3", "C4", "C5", "C6"],
    ["D1", "D2", "D3", "D4", "D5", "D6"]
  ];


  // =========================
  // ADMIN BLOCKED SEATS
  // =========================

  const blockedSeatsData =
    JSON.parse(
      localStorage.getItem("blockedSeats")
    ) || {};

  const blockedSeats =
    blockedSeatsData[theater?.name] || [];


  // =========================
  // ALREADY BOOKED SEATS
  // =========================

  const bookedSeatsData =
    JSON.parse(
      localStorage.getItem("bookedSeats")
    ) || {};

  const showKey =
    `${movieId}|${theater?.name}|${date}|${time}`;

  const bookedSeats =
    bookedSeatsData[showKey] || [];


  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice =
    seats.length * Number(ticketPrice || 0);


  // =========================
  // SELECT SEAT
  // =========================

  const handleSeatClick = (seat) => {

    // Already booked
    if (bookedSeats.includes(seat)) {
      alert("This seat is already booked");
      return;
    }

    // Blocked by admin
    if (blockedSeats.includes(seat)) {
      alert("This seat is blocked");
      return;
    }

    // Remove selected seat
    if (seats.includes(seat)) {

      selectSeats(
        seats.filter(
          (item) => item !== seat
        )
      );

    } else {

      // Add selected seat
      selectSeats([
        ...seats,
        seat
      ]);

    }
  };


  // =========================
  // CONTINUE
  // =========================

  const handleContinue = () => {

    if (!ticketPrice) {

      alert("Please select a show first");

      navigate(`/booking/${movieId}`, {
        state: {
          theater
        }
      });

      return;
    }


    if (seats.length === 0) {

      alert("Please select at least one seat");

      return;
    }


    navigate("/payment", {
      state: {
        movieId,
        movieTitle,
        date,
        time,
        theater,
        seats,
        ticketPrice,
        totalPrice
      }
    });

  };


  return (

    <div className="booking-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="booking-hero">

        <p>
          CINEBOX
        </p>

        <h1>
          Select Your Seats
        </h1>

        <span>
          Choose your preferred seats
        </span>

      </section>


      <section className="booking-section">

        <div className="seat-section">


          {/* =========================
              THEATRE INFO
          ========================= */}

          {theater && (

            <div className="seat-theater-info">

              <h2>
                {theater.name}
              </h2>

              <p>
                📍 {theater.location}
              </p>

              <p>
                🎬 {movieTitle}
              </p>

              <p>
                📅 {date}
              </p>

              <p>
                ⏰ {time}
              </p>

            </div>

          )}


          {/* =========================
              SCREEN
          ========================= */}

          <div className="screen">
            SCREEN
          </div>


          {/* =========================
              SEATS
          ========================= */}

          <SeatLayout
            seats={seatRows}
            selectedSeats={seats}
            onSeatClick={handleSeatClick}
            blockedSeats={blockedSeats}
            bookedSeats={bookedSeats}
          />


          {/* =========================
              LEGEND
          ========================= */}

          <div className="seat-legend">

            <div>
              <span className="legend-seat available"></span>
              Available
            </div>

            <div>
              <span className="legend-seat selected"></span>
              Selected
            </div>

            <div>
              <span className="legend-seat blocked"></span>
              Blocked
            </div>

            <div>
              <span className="legend-seat booked"></span>
              Booked
            </div>

          </div>


          {/* =========================
              SELECTED SEATS
          ========================= */}

          <div className="seat-summary">

            <p>

              Selected Seats:{" "}

              <strong>

                {seats.length > 0
                  ? seats.join(", ")
                  : "None"}

              </strong>

            </p>

          </div>


          {/* =========================
              BOOKING SUMMARY
          ========================= */}

          <div className="booking-summary">

            <div>

              <span>
                Ticket Price
              </span>

              <strong>
                ₹{ticketPrice || 0}
              </strong>

            </div>


            <div>

              <span>
                Seats Selected
              </span>

              <strong>
                {seats.length}
              </strong>

            </div>


            <div>

              <span>
                Total Amount
              </span>

              <strong>
                ₹{totalPrice}
              </strong>

            </div>

          </div>


          {/* =========================
              CONTINUE
          ========================= */}

          <div className="continue-booking">

            <button
              onClick={handleContinue}
            >
              Continue to Payment →
            </button>

          </div>

        </div>

      </section>

    </div>

  );
};

export default SeatSelection;
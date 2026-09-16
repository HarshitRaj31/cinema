import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movieId,
    movieTitle,
    date,
    time,
    theater,
    seats = [],
    paymentMethod,
    ticketPrice,
    totalPrice = 0
  } = location.state || {};

  const [bookingID] = useState(
    "CB" + Math.floor(100000 + Math.random() * 900000)
  );


  // =========================
  // CHECK BOOKING DATA
  // =========================

  useEffect(() => {
    if (
      !movieId ||
      !theater ||
      !date ||
      !time ||
      seats.length === 0
    ) {
      alert("Booking information is missing");
      navigate("/movies");
    }
  }, [
    movieId,
    theater,
    date,
    time,
    seats.length,
    navigate
  ]);


  // =========================
  // SAVE BOOKING
  // =========================

  useEffect(() => {

    if (
      !movieId ||
      !theater ||
      !date ||
      !time ||
      seats.length === 0
    ) {
      return;
    }


    // =========================
    // GET CURRENT USER
    // =========================

    const currentUser =
      JSON.parse(
        localStorage.getItem("currentUser")
      );


    // =========================
    // CHECK LOGIN
    // =========================

    if (!currentUser) {
      alert("Please login before booking.");
      navigate("/login");
      return;
    }


    // =========================
    // BOOKING OBJECT
    // =========================

    const booking = {
      bookingID,

      // USER INFORMATION
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,

      // MOVIE INFORMATION
      movieId,
      movieTitle,

      // SHOW INFORMATION
      date,
      time,
      theater,

      // SEAT INFORMATION
      seats,

      // PAYMENT INFORMATION
      paymentMethod,
      ticketPrice,
      totalPrice
    };


    // =========================
    // GET EXISTING BOOKINGS
    // =========================

    const existingBookings =
      JSON.parse(
        localStorage.getItem("bookings")
      ) || [];


    // =========================
    // CHECK DUPLICATE BOOKING
    // =========================

    const alreadySaved =
      existingBookings.some(
        (item) =>
          item.userId === currentUser.id &&
          item.movieId === movieId &&
          item.theater?.name === theater.name &&
          item.date === date &&
          item.time === time &&
          JSON.stringify(item.seats) ===
            JSON.stringify(seats)
      );


    // =========================
    // SAVE BOOKING
    // =========================

    if (!alreadySaved) {

      localStorage.setItem(
        "bookings",
        JSON.stringify([
          ...existingBookings,
          booking
        ])
      );

    }


    // =========================
    // SAVE BOOKED SEATS
    // =========================

    const bookedSeatsData =
      JSON.parse(
        localStorage.getItem("bookedSeats")
      ) || {};


    const showKey =
      `${movieId}|${theater.name}|${date}|${time}`;


    if (!bookedSeatsData[showKey]) {
      bookedSeatsData[showKey] = [];
    }


    seats.forEach((seat) => {

      if (
        !bookedSeatsData[showKey].includes(seat)
      ) {

        bookedSeatsData[showKey].push(seat);

      }

    });


    localStorage.setItem(
      "bookedSeats",
      JSON.stringify(bookedSeatsData)
    );

  }, [
    bookingID,
    movieId,
    movieTitle,
    date,
    time,
    theater,
    seats,
    paymentMethod,
    ticketPrice,
    totalPrice,
    navigate
  ]);


  // =========================
  // DOWNLOAD TICKET PDF
  // =========================

  const downloadTicket = () => {

    const doc = new jsPDF();

    const theaterName =
      theater?.name || "Cinepolis";

    const locationName =
      theater?.location || "Kolkata";

    const movieName =
      movieTitle || `Movie #${movieId}`;


    // =========================
    // PAGE BACKGROUND
    // =========================

    doc.setFillColor(
      8,
      5,
      6
    );

    doc.rect(
      0,
      0,
      210,
      297,
      "F"
    );


    // =========================
    // TICKET CARD
    // =========================

    doc.setFillColor(
      20,
      12,
      13
    );

    doc.roundedRect(
      15,
      25,
      180,
      245,
      6,
      6,
      "F"
    );


    // =========================
    // GOLD BORDER
    // =========================

    doc.setDrawColor(
      209,
      163,
      80
    );

    doc.setLineWidth(1);

    doc.roundedRect(
      15,
      25,
      180,
      245,
      6,
      6
    );


    // =========================
    // RED HEADER
    // =========================

    doc.setFillColor(
      230,
      54,
      47
    );

    doc.roundedRect(
      15,
      25,
      180,
      55,
      6,
      6,
      "F"
    );

    doc.rect(
      15,
      50,
      180,
      30,
      "F"
    );


    // =========================
    // CINEBOX
    // =========================

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(30);

    doc.text(
      "CINEBOX",
      105,
      48,
      {
        align: "center"
      }
    );

    doc.setFontSize(10);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "MOVIE TICKET  •  E-TICKET",
      105,
      62,
      {
        align: "center"
      }
    );


    // =========================
    // HEADER DIVIDER
    // =========================

    doc.setDrawColor(
      209,
      163,
      80
    );

    doc.setLineWidth(0.5);

    doc.line(
      25,
      70,
      185,
      70
    );


    // =========================
    // BOOKING ID
    // =========================

    doc.setFillColor(
      11,
      7,
      8
    );

    doc.roundedRect(
      25,
      72,
      160,
      25,
      4,
      4,
      "F"
    );

    doc.setTextColor(
      152,
      133,
      124
    );

    doc.setFontSize(7);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "BOOKING ID",
      32,
      82
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(13);

    doc.text(
      bookingID,
      32,
      91
    );


    // =========================
    // BARCODE STYLE
    // =========================

    let barcodeX = 125;

    for (
      let i = 0;
      i < 25;
      i++
    ) {

      const width =
        i % 3 === 0
          ? 2
          : 0.7;

      doc.setFillColor(
        243,
        234,
        217
      );

      doc.rect(
        barcodeX,
        79,
        width,
        12,
        "F"
      );

      barcodeX += 2.2;

    }


    // =========================
    // MOVIE
    // =========================

    doc.setTextColor(
      209,
      163,
      80
    );

    doc.setFontSize(8);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "NOW PLAYING",
      25,
      112
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(19);

    doc.setFont(
      "helvetica",
      "bold"
    );

    const movieLines =
      doc.splitTextToSize(
        movieName,
        160
      );

    doc.text(
      movieLines,
      25,
      123
    );


    // =========================
    // THEATRE INFORMATION
    // =========================

    doc.setFillColor(
      11,
      7,
      8
    );

    doc.roundedRect(
      25,
      138,
      160,
      43,
      4,
      4,
      "F"
    );


    // THEATRE

    doc.setTextColor(
      152,
      133,
      124
    );

    doc.setFontSize(7);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "THEATRE",
      32,
      149
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(11);

    doc.text(
      theaterName,
      32,
      158
    );


    // LOCATION

    doc.setTextColor(
      152,
      133,
      124
    );

    doc.setFontSize(7);

    doc.text(
      "LOCATION",
      32,
      169
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(10);

    doc.text(
      locationName,
      32,
      177
    );


    // DATE

    doc.setTextColor(
      152,
      133,
      124
    );

    doc.setFontSize(7);

    doc.text(
      "DATE",
      115,
      149
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(10);

    doc.text(
      date || "N/A",
      115,
      158
    );


    // SHOW TIME

    doc.setTextColor(
      152,
      133,
      124
    );

    doc.setFontSize(7);

    doc.text(
      "SHOW TIME",
      115,
      169
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(10);

    doc.text(
      time || "N/A",
      115,
      177
    );


    // =========================
    // SEATS
    // =========================

    doc.setDrawColor(
      209,
      163,
      80
    );

    doc.line(
      25,
      190,
      185,
      190
    );

    doc.setTextColor(
      209,
      163,
      80
    );

    doc.setFontSize(8);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "YOUR SEATS",
      25,
      202
    );


    // =========================
    // SEAT BOXES
    // =========================

    let seatX = 25;
    let seatY = 207;

    seats.forEach(
      (seat, index) => {

        if (
          index > 0 &&
          index % 5 === 0
        ) {

          seatX = 25;
          seatY += 17;

        }

        doc.setFillColor(
          230,
          54,
          47
        );

        doc.roundedRect(
          seatX,
          seatY,
          25,
          13,
          3,
          3,
          "F"
        );

        doc.setTextColor(
          255,
          255,
          255
        );

        doc.setFontSize(9);

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.text(
          seat,
          seatX + 12.5,
          seatY + 9,
          {
            align: "center"
          }
        );

        seatX += 29;

      }
    );


    // =========================
    // PAYMENT
    // =========================

    const paymentY =
      Math.max(
        230,
        seatY + 23
      );

    doc.setDrawColor(
      209,
      163,
      80
    );

    doc.line(
      25,
      paymentY,
      185,
      paymentY
    );

    doc.setTextColor(
      209,
      163,
      80
    );

    doc.setFontSize(8);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "PAYMENT",
      25,
      paymentY + 11
    );


    // TICKETS

    doc.setTextColor(
      152,
      133,
      124
    );

    doc.setFontSize(8);

    doc.text(
      "TICKETS",
      25,
      paymentY + 22
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(10);

    doc.text(
      `${seats.length}`,
      70,
      paymentY + 22
    );


    // PAYMENT METHOD

    doc.setTextColor(
      152,
      133,
      124
    );

    doc.setFontSize(8);

    doc.text(
      "METHOD",
      95,
      paymentY + 22
    );

    doc.setTextColor(
      243,
      234,
      217
    );

    doc.setFontSize(10);

    doc.text(
      paymentMethod || "Card",
      130,
      paymentY + 22
    );


    // =========================
    // TOTAL PAID
    // =========================

    const totalY =
      paymentY + 28;

    doc.setFillColor(
      230,
      54,
      47
    );

    doc.roundedRect(
      25,
      totalY,
      160,
      27,
      4,
      4,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(8);

    doc.text(
      "TOTAL PAID",
      32,
      totalY + 11
    );

    doc.setFontSize(16);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      `Rs. ${totalPrice}`,
      175,
      totalY + 13,
      {
        align: "right"
      }
    );


    // =========================
    // FOOTER
    // =========================

    doc.setTextColor(
      209,
      163,
      80
    );

    doc.setFontSize(8);

    doc.text(
      "★ BOOKING CONFIRMED ★",
      105,
      293,
      {
        align: "center"
      }
    );


    // =========================
    // SAVE PDF
    // =========================

    doc.save(
      `CINEBOX-Ticket-${bookingID}.pdf`
    );

  };


  return (

    <div className="Booking-confirm">

      {/* CONFIRMATION HERO */}

      <section className="confirm">

        <div className="tick">
          ✓
        </div>

        <p>
          CINEBOX
        </p>

        <h3>
          BOOKING CONFIRMED!
        </h3>

        <span>
          Your movie tickets are booked
        </span>

      </section>


      {/* TICKET */}

      <section className="confirm">

        <div className="ticket-card">

          {/* HEADER */}

          <div className="header">

            <div>

              <p>
                BOOKING ID
              </p>

              <h3>
                {bookingID}
              </h3>

            </div>

            <div className="ticket-icon">
              🎟️
            </div>

          </div>


          {/* MOVIE */}

          <div className="movie-info">

            <div className="movie-poster">
              🎬
            </div>

            <p>
              MOVIE
            </p>

            <h2>
              {movieTitle ||
                `Movie #${movieId}`}
            </h2>

          </div>

        </div>


        {/* DETAILS */}

        <div className="details-grid">

          <div className="details-box">

            <span>
              THEATER
            </span>

            <strong>
              {theater?.name ||
                "Cinepolis"}
            </strong>

          </div>


          <div className="details-box">

            <span>
              LOCATION
            </span>

            <strong>
              {theater?.location ||
                "Kolkata"}
            </strong>

          </div>


          <div className="details-box">

            <span>
              DATE
            </span>

            <strong>
              {date}
            </strong>

          </div>


          <div className="details-box">

            <span>
              SHOW TIME
            </span>

            <strong>
              {time}
            </strong>

          </div>

        </div>


        {/* SEATS */}

        <div className="seat-con">

          <div>

            <span>
              SELECTED SEATS
            </span>

            <strong>
              {seats.length > 0
                ? seats.join(", ")
                : "None"}
            </strong>

          </div>


          <div>

            <span>
              SEATS
            </span>

            <strong>
              {seats.length}
            </strong>

          </div>

        </div>


        {/* PAYMENT */}

        <div className="payment-confirmation">

          <div>

            <span>
              PAYMENT METHOD
            </span>

            <strong>
              {paymentMethod ||
                "Card"}
            </strong>

          </div>


          <div>

            <span>
              TICKET PRICE
            </span>

            <strong>
              ₹{ticketPrice || 0}
            </strong>

          </div>


          <div className="total-paid">

            <span>
              TOTAL PAID
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>

        </div>


        {/* MESSAGE */}

        <div className="confirm-message">

          <p>
            Your booking has been confirmed.
            Please arrive at the theater at least
            15 minutes before the show.
          </p>

        </div>


        {/* BUTTONS */}

        <div className="confirmation-button">

          <button
            className="download-ticket-btn"
            onClick={downloadTicket}
          >
            📄 Download Ticket PDF
          </button>


          <Link to="/">
            <button className="home-bttn">
              Back to Home
            </button>
          </Link>


          <Link to="/booking-history">
            <button className="history-bttn">
              View Booking History →
            </button>
          </Link>

        </div>

      </section>

    </div>
  );
};

export default BookingConfirmation;
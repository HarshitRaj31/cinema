import React, { useEffect, useState } from "react";
import "./ManageBookings.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  // =========================
  // LOAD BOOKINGS
  // =========================

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const data =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(data);
  };

  // =========================
  // DELETE BOOKING
  // =========================

  const deleteBooking = (bookingID) => {
    const booking = bookings.find(
      (item) => item.bookingID === bookingID
    );

    if (!booking) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    // =========================
    // REMOVE BOOKING
    // =========================

    const updatedBookings = bookings.filter(
      (item) => item.bookingID !== bookingID
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    // =========================
    // RELEASE ONLY THIS
    // BOOKING'S SEATS
    // =========================

    const bookedSeatsData =
      JSON.parse(localStorage.getItem("bookedSeats")) || {};

    const showKey =
      `${booking.movieId}|${booking.theater?.name}|${booking.date}|${booking.time}`;

    if (bookedSeatsData[showKey]) {

      bookedSeatsData[showKey] =
        bookedSeatsData[showKey].filter(
          (seat) => !booking.seats.includes(seat)
        );

      // Remove show key if no seats remain
      if (bookedSeatsData[showKey].length === 0) {
        delete bookedSeatsData[showKey];
      }
    }

    localStorage.setItem(
      "bookedSeats",
      JSON.stringify(bookedSeatsData)
    );

    setBookings(updatedBookings);

    alert("Booking deleted successfully!");
  };

  // =========================
  // CLEAR ALL BOOKINGS
  // =========================

  const clearBookings = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all bookings?"
    );

    if (!confirmClear) return;

    localStorage.removeItem("bookings");
    localStorage.removeItem("bookedSeats");

    setBookings([]);

    alert("All bookings deleted successfully!");
  };

  return (
    <div className="manage-bookings">

      {/* =========================
          HERO
      ========================= */}

      <section className="main-hero">

        <p>
          CINEBOX ADMIN
        </p>

        <h1>
          Manage Bookings
        </h1>

        <span>
          View and manage customer bookings
        </span>

      </section>


      <section className="main-card">

        {/* =========================
            HEADING
        ========================= */}

        <div className="section-heading">

          <div>

            <h2>
              All Bookings
            </h2>

            <p>
              Total Bookings: {bookings.length}
            </p>

          </div>


          {bookings.length > 0 && (

            <button
              className="delete-all-btn"
              onClick={clearBookings}
            >
              Clear All Bookings
            </button>

          )}

        </div>


        {/* =========================
            NO BOOKINGS
        ========================= */}

        {bookings.length === 0 ? (

          <div className="no-bookings">

            <h2>
              No Bookings Found
            </h2>

            <p>
              Customer bookings will appear here
              after a successful booking.
            </p>

          </div>

        ) : (

          /* =========================
             BOOKING LIST
          ========================= */

          <div className="booking-list">

            {bookings.map((booking) => (

              <div
                className="booking-card"
                key={booking.bookingID}
              >

                {/* =========================
                    BOOKING HEADER
                ========================= */}

                <div className="booking-header">

                  <div>

                    <p className="booking-label">
                      BOOKING ID
                    </p>

                    <h3>
                      {booking.bookingID}
                    </h3>

                  </div>


                  <button
                    className="delete-booking-btn"
                    onClick={() =>
                      deleteBooking(
                        booking.bookingID
                      )
                    }
                  >
                    Delete
                  </button>

                </div>


                {/* =========================
                    BOOKING INFORMATION
                ========================= */}

                <div className="booking-info">

                  {/* MOVIE */}

                  <div>

                    <span>
                      Movie
                    </span>

                    <strong>
                      {booking.movieTitle ||
                        "Unknown Movie"}
                    </strong>

                  </div>


                  {/* THEATRE */}

                  <div>

                    <span>
                      Theatre
                    </span>

                    <strong>
                      {booking.theater?.name ||
                        "Unknown Theatre"}
                    </strong>

                  </div>


                  {/* LOCATION */}

                  <div>

                    <span>
                      Location
                    </span>

                    <strong>
                      {booking.theater?.location ||
                        "N/A"}
                    </strong>

                  </div>


                  {/* DATE */}

                  <div>

                    <span>
                      Date
                    </span>

                    <strong>
                      {booking.date || "N/A"}
                    </strong>

                  </div>


                  {/* TIME */}

                  <div>

                    <span>
                      Time
                    </span>

                    <strong>
                      {booking.time || "N/A"}
                    </strong>

                  </div>


                  {/* SEATS */}

                  <div>

                    <span>
                      Seats
                    </span>

                    <strong>
                      {booking.seats?.length > 0
                        ? booking.seats.join(", ")
                        : "N/A"}
                    </strong>

                  </div>


                  {/* PAYMENT */}

                  <div>

                    <span>
                      Payment
                    </span>

                    <strong>
                      {booking.paymentMethod ||
                        "N/A"}
                    </strong>

                  </div>


                  {/* TICKET PRICE */}

                  <div>

                    <span>
                      Ticket Price
                    </span>

                    <strong>
                      ₹{booking.ticketPrice || 0}
                    </strong>

                  </div>


                  {/* TOTAL */}

                  <div>

                    <span>
                      Total Amount
                    </span>

                    <strong className="booking-price">
                      ₹{booking.totalPrice || 0}
                    </strong>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}
       <Link to='/movies'>
        <button className="add-movie-btn">Return To Home</button>
      </Link>
      </section>

    </div>
  );
};

export default ManageBookings;
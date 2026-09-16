import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BookingHistory.css";

const BookingHistory = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);


  // =========================
  // LOAD CURRENT USER
  // =========================

  useEffect(() => {

    const savedUser =
      localStorage.getItem("currentUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const currentUser =
      JSON.parse(savedUser);

    setUser(currentUser);


    // =========================
    // LOAD USER BOOKINGS
    // =========================

    const loadBookings = () => {

      const savedBookings =
        JSON.parse(
          localStorage.getItem("bookings")
        ) || [];


      // SHOW ONLY CURRENT USER BOOKINGS

      const userBookings =
        savedBookings.filter(
          (booking) =>
            booking.userId === currentUser.id ||
            booking.userEmail === currentUser.email
        );

      setBookings(userBookings);
    };


    loadBookings();

    window.addEventListener(
      "storage",
      loadBookings
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadBookings
      );
    };

  }, [navigate]);


  // =========================
  // CLEAR USER HISTORY
  // =========================

  const clearHistory = () => {

    if (
      !window.confirm(
        "Are you sure you want to clear your booking history?"
      )
    ) {
      return;
    }


    const savedBookings =
      JSON.parse(
        localStorage.getItem("bookings")
      ) || [];


    // KEEP OTHER USERS' BOOKINGS

    const remainingBookings =
      savedBookings.filter(
        (booking) =>
          booking.userId !== user.id &&
          booking.userEmail !== user.email
      );


    localStorage.setItem(
      "bookings",
      JSON.stringify(remainingBookings)
    );


    setBookings([]);

  };


  return (
    <div className="Main-booking">

      {/* =========================
          HERO
      ========================= */}

      <section className="history-hero">

        <p>CINEBOX</p>

        <h1>BOOKING HISTORY</h1>

        <span>
          {user
            ? `${user.name}'s movie bookings`
            : "View all your movie bookings"}
        </span>

      </section>


      {/* =========================
          HISTORY SECTION
      ========================= */}

      <section className="history-section">

        {bookings.length > 0 ? (

          <>

            {/* CLEAR HISTORY */}

            <div className="clear-history">

              <button onClick={clearHistory}>
                🗑 Clear Booking History
              </button>

            </div>


            {/* =========================
                BOOKINGS
            ========================= */}

            <div className="history-grid">

              {bookings.map((booking, index) => (

                <div
                  className="history-card"
                  key={
                    booking.bookingID || index
                  }
                >

                  {/* =========================
                      HEADER
                  ========================= */}

                  <div className="history-header">

                    <div>

                      <span>
                        BOOKING ID
                      </span>

                      <h3>
                        {booking.bookingID}
                      </h3>

                    </div>


                    <div className="status">
                      ✓ CONFIRMED
                    </div>

                  </div>


                  {/* =========================
                      MOVIE
                  ========================= */}

                  <div className="history-movie">

                    <div className="history-poster">
                      🎬
                    </div>

                    <div>

                      <span>
                        MOVIE
                      </span>

                      <h2>
                        {booking.movieTitle ||
                          `Movie #${booking.movieId}`}
                      </h2>

                    </div>

                  </div>


                  {/* =========================
                      DETAILS
                  ========================= */}

                  <div className="history-details">

                    <div>

                      <span>
                        THEATER
                      </span>

                      <strong>
                        {booking.theater?.name ||
                          "Cinepolis"}
                      </strong>

                    </div>


                    <div>

                      <span>
                        LOCATION
                      </span>

                      <strong>
                        {booking.theater?.location ||
                          "Kolkata"}
                      </strong>

                    </div>


                    <div>

                      <span>
                        DATE
                      </span>

                      <strong>
                        {booking.date || "N/A"}
                      </strong>

                    </div>


                    <div>

                      <span>
                        TIME
                      </span>

                      <strong>
                        {booking.time || "N/A"}
                      </strong>

                    </div>

                  </div>


                  {/* =========================
                      BOTTOM
                  ========================= */}

                  <div className="history-bottom">

                    <div>

                      <span>
                        SEATS
                      </span>

                      <strong>
                        {booking.seats?.length > 0
                          ? booking.seats.join(", ")
                          : "None"}
                      </strong>

                    </div>


                    <div>

                      <span>
                        TICKET PRICE
                      </span>

                      <strong>
                        ₹{booking.ticketPrice || 0}
                      </strong>

                    </div>


                    <div>

                      <span>
                        TOTAL PAID
                      </span>

                      <strong className="history-price">
                        ₹{booking.totalPrice || 0}
                      </strong>

                    </div>

                  </div>


                  {/* =========================
                      PAYMENT
                  ========================= */}

                  <div className="history-payment">

                    <span>
                      PAYMENT
                    </span>

                    <strong>
                      {booking.paymentMethod ||
                        "Card"}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

          </>

        ) : (

          /* =========================
             EMPTY STATE
          ========================= */

          <div className="no-bookings">

            <div className="empty-icon">
              🎟️
            </div>

            <h2>
              No Bookings Yet
            </h2>

            <p>
              You haven't booked any movies yet.
            </p>

            <Link to="/movies">

              <button>
                Browse Movies →
              </button>

            </Link>

          </div>

        )}
<Link to='/'>
        <button className="add-movie-btn">Return To Home</button>
      </Link>
      </section>

    </div>
  );
};

export default BookingHistory;
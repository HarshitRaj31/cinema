import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movieId,
    movieTitle,
    date,
    time,
    theater,
    seats = [],
    ticketPrice
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice =
    seats.length * Number(ticketPrice || 0);


  // =========================
  // CHECK BOOKING DATA
  // =========================

  useEffect(() => {

    if (
      !movieId ||
      !date ||
      !time ||
      !theater ||
      !ticketPrice ||
      seats.length === 0
    ) {
      alert("Booking information is missing");
      navigate("/movies");
    }

  }, [
    movieId,
    date,
    time,
    theater,
    ticketPrice,
    seats.length,
    navigate
  ]);


  // =========================
  // PAYMENT
  // =========================

  const handlePayment = () => {

    // Check booking data

    if (
      !movieId ||
      !date ||
      !time ||
      !theater ||
      !ticketPrice
    ) {
      alert("Booking information is missing");
      return;
    }


    // Check seats

    if (seats.length === 0) {
      alert("Please select at least one seat");
      return;
    }


    // Card validation

    if (paymentMethod === "card") {

      if (
        !cardNumber.trim() ||
        !name.trim() ||
        !expiry.trim() ||
        !cvv.trim()
      ) {
        alert("Please fill all card details");
        return;
      }

    }


    // UPI validation

    if (paymentMethod === "upi") {

      if (!upiId.trim()) {
        alert("Please enter your UPI ID");
        return;
      }

    }


    // Net Banking validation

    if (paymentMethod === "netbanking") {

      if (!bank) {
        alert("Please select a bank");
        return;
      }

    }


    // Go to confirmation

    navigate("/booking-confirmation", {

      state: {
        movieId,
        movieTitle,
        date,
        time,
        theater,
        seats,
        ticketPrice,
        totalPrice,
        paymentMethod
      }

    });

  };


  return (

    <div className="payment-page">

      {/* HERO */}

      <section className="payment-hero">

        <p>
          CINEBOX PAYMENT
        </p>

        <h1>
          Complete Your Payment
        </h1>

        <span>
          Secure your movie tickets
        </span>

      </section>


      <section className="payment-section">

        <div className="payment-container">


          {/* =========================
              BOOKING SUMMARY
          ========================= */}

          <div className="booking-summary-card">

            <h2>
              Booking Summary
            </h2>


            <div className="summary-item">

              <span>
                Movie
              </span>

              <strong>
                {movieTitle || movieId}
              </strong>

            </div>


            {theater && (

              <>

                <div className="summary-item">

                  <span>
                    Theater
                  </span>

                  <strong>
                    {theater.name}
                  </strong>

                </div>


                <div className="summary-item">

                  <span>
                    Location
                  </span>

                  <strong>
                    {theater.location}
                  </strong>

                </div>

              </>

            )}


            <div className="summary-item">

              <span>
                Date
              </span>

              <strong>
                {date}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Show Time
              </span>

              <strong>
                {time}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Seats
              </span>

              <strong>
                {seats.length > 0
                  ? seats.join(", ")
                  : "None"}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Ticket Price
              </span>

              <strong>
                ₹{ticketPrice || 0}
              </strong>

            </div>


            <div className="total-payment">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{totalPrice}
              </strong>

            </div>

          </div>


          {/* =========================
              PAYMENT
          ========================= */}

          <div className="payment-card">

            <h2>
              Payment Method
            </h2>


            <div className="payment-methods">


              {/* CARD */}

              <button
                type="button"
                className={
                  paymentMethod === "card"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPaymentMethod("card")
                }
              >
                💳 Card
              </button>


              {/* UPI */}

              <button
                type="button"
                className={
                  paymentMethod === "upi"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >
                📱 UPI
              </button>


              {/* NET BANKING */}

              <button
                type="button"
                className={
                  paymentMethod === "netbanking"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPaymentMethod("netbanking")
                }
              >
                🏦 Net Banking
              </button>

            </div>


            {/* =========================
                CARD FORM
            ========================= */}

            {paymentMethod === "card" && (

              <div className="card-form">

                <label>
                  Card Number
                </label>

                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(e.target.value)
                  }
                />


                <label>
                  Card Holder Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />


                <div className="card-row">

                  <div>

                    <label>
                      Expiry
                    </label>

                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) =>
                        setExpiry(e.target.value)
                      }
                    />

                  </div>


                  <div>

                    <label>
                      CVV
                    </label>

                    <input
                      type="password"
                      placeholder="•••"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value)
                      }
                    />

                  </div>

                </div>

              </div>

            )}


            {/* =========================
                UPI FORM
            ========================= */}

            {paymentMethod === "upi" && (

              <div className="upi-form">

                <label>
                  UPI ID
                </label>

                <input
                  type="text"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) =>
                    setUpiId(e.target.value)
                  }
                />

              </div>

            )}


            {/* =========================
                NET BANKING
            ========================= */}

            {paymentMethod === "netbanking" && (

              <div className="bank-form">

                <label>
                  Select Bank
                </label>

                <select
                  value={bank}
                  onChange={(e) =>
                    setBank(e.target.value)
                  }
                >

                  <option value="">
                    Select your bank
                  </option>

                  <option>
                    State Bank of India
                  </option>

                  <option>
                    HDFC Bank
                  </option>

                  <option>
                    ICICI Bank
                  </option>

                  <option>
                    Axis Bank
                  </option>

                </select>

              </div>

            )}


            {/* =========================
                PAY BUTTON
            ========================= */}

            <button
              className="pay-button"
              onClick={handlePayment}
            >
              Pay ₹{totalPrice} →
            </button>

          </div>

        </div>

      </section>

    </div>

  );
};

export default Payment;
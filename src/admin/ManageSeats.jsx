import React, { useEffect, useState } from "react";
import "./ManageSeats.css";

const seatRows = [
  ["A1", "A2", "A3", "A4", "A5", "A6"],
  ["B1", "B2", "B3", "B4", "B5", "B6"],
  ["C1", "C2", "C3", "C4", "C5", "C6"],
  ["D1", "D2", "D3", "D4", "D5", "D6"],
];

const ManageSeats = () => {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [blockedSeats, setBlockedSeats] = useState({});


  // =========================
  // LOAD THEATRES
  // =========================

  useEffect(() => {

    const loadTheatres = () => {

      const savedTheatres =
        JSON.parse(
          localStorage.getItem("theatres")
        ) || [];

      setTheatres(savedTheatres);

    };

    loadTheatres();

    window.addEventListener(
      "storage",
      loadTheatres
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadTheatres
      );
    };

  }, []);


  // =========================
  // LOAD BLOCKED SEATS
  // =========================

  useEffect(() => {

    const savedBlockedSeats =
      JSON.parse(
        localStorage.getItem("blockedSeats")
      ) || {};

    setBlockedSeats(savedBlockedSeats);

  }, []);


  // =========================
  // SAVE BLOCKED SEATS
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "blockedSeats",
      JSON.stringify(blockedSeats)
    );

  }, [blockedSeats]);


  // =========================
  // CURRENT THEATRE SEATS
  // =========================

  const currentBlockedSeats =
    blockedSeats[selectedTheatre] || [];


  // =========================
  // BLOCK / UNBLOCK SEAT
  // =========================

  const handleSeatClick = (seat) => {

    if (!selectedTheatre) {

      alert(
        "Please select a theatre first"
      );

      return;
    }


    const currentSeats =
      blockedSeats[selectedTheatre] || [];


    let updatedSeats;


    if (currentSeats.includes(seat)) {

      // UNBLOCK

      updatedSeats =
        currentSeats.filter(
          (item) => item !== seat
        );

    } else {

      // BLOCK

      updatedSeats = [
        ...currentSeats,
        seat
      ];

    }


    setBlockedSeats({
      ...blockedSeats,
      [selectedTheatre]: updatedSeats
    });

  };


  // =========================
  // RESET SEATS
  // =========================

  const resetSeats = () => {

    if (!selectedTheatre) {

      alert(
        "Please select a theatre first"
      );

      return;
    }


    if (
      window.confirm(
        "Are you sure you want to unblock all seats?"
      )
    ) {

      setBlockedSeats({
        ...blockedSeats,
        [selectedTheatre]: []
      });

    }

  };


  return (

    <div className="manage-seats">

      {/* HERO */}

      <section className="manage-hero">

        <p>
          CINEBOX ADMIN
        </p>

        <h1>
          MANAGE SEATS
        </h1>

        <span>
          Block or unblock theatre seats
        </span>

      </section>


      <section className="manage-section">


        {/* =========================
            THEATRE SELECT
        ========================= */}

        <div className="movie-form">

          <div className="section-heading">

            <p>
              SEAT MANAGEMENT
            </p>

            <h2>
              Select Theatre
            </h2>

          </div>


          <div className="form-grid">

            <label>
              Theatre
            </label>


            <select
              value={selectedTheatre}
              onChange={(e) =>
                setSelectedTheatre(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Theatre
              </option>


              {theatres.map(
                (theatre) => (

                  <option
                    key={theatre.id}
                    value={theatre.name}
                  >
                    {theatre.name}
                  </option>

                )
              )}

            </select>

          </div>

        </div>


        {/* =========================
            SEATS
        ========================= */}

        {selectedTheatre && (

          <div className="seat-management">

            <div className="section-heading">

              <p>
                {selectedTheatre}
              </p>

              <h2>
                Manage Seats
              </h2>

            </div>


            {/* SCREEN */}

            <div className="seat-screen">
              SCREEN
            </div>


            {/* SEAT LAYOUT */}

            <div className="admin-seat-layout">

              {seatRows.map(
                (row) => (

                  <div
                    className="admin-seat-row"
                    key={row[0]}
                  >

                    {row.map(
                      (seat) => {

                        const isBlocked =
                          currentBlockedSeats.includes(
                            seat
                          );


                        return (

                          <button
                            key={seat}
                            className={
                              isBlocked
                                ? "admin-seat blocked"
                                : "admin-seat"
                            }
                            onClick={() =>
                              handleSeatClick(
                                seat
                              )
                            }
                          >

                            {seat}

                          </button>

                        );

                      }
                    )}

                  </div>

                )
              )}

            </div>


            {/* =========================
                LEGEND
            ========================= */}

            <div className="seat-legend">

              <div>

                <span className="legend-seat available"></span>

                Available

              </div>


              <div>

                <span className="legend-seat blocked"></span>

                Blocked

              </div>

            </div>


            {/* =========================
                INFO
            ========================= */}

            <div className="blocked-info">

              <p>

                Blocked Seats:{" "}

                <strong>
                  {currentBlockedSeats.length}
                </strong>

              </p>


              <p>

                {currentBlockedSeats.length > 0
                  ? currentBlockedSeats.join(", ")
                  : "No blocked seats"}

              </p>

            </div>


            {/* =========================
                RESET
            ========================= */}

            <button
              className="reset-seats-btn"
              onClick={resetSeats}
            >
              Reset All Seats
            </button>

          </div>

        )}

      </section>

    </div>

  );
};

export default ManageSeats;
import React from "react";

const SeatLayout = ({
  seats,
  selectedSeats,
  onSeatClick,
  blockedSeats = [],
  bookedSeats = []
}) => {

  return (
    <div className="layout">

      {seats.map((row) => (

        <div className="row" key={row[0]}>

          {row.map((seat) => {

            const isBlocked =
              blockedSeats.includes(seat);

            const isBooked =
              bookedSeats.includes(seat);

            const isSelected =
              selectedSeats.includes(seat);


            let seatClass = "";

            if (isBooked) {
              seatClass = "booked";
            }
            else if (isBlocked) {
              seatClass = "blocked";
            }
            else if (isSelected) {
              seatClass = "selected";
            }


            return (

              <button
                key={seat}
                className={seatClass}
                disabled={isBlocked || isBooked}
                onClick={() => onSeatClick(seat)}
              >
                {seat}
              </button>

            );

          })}

        </div>

      ))}

    </div>
  );
};

export default SeatLayout;
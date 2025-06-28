/**
 * Content Component of the BookingsView
 *
 * Displays Booking Details
 */

import React, { useState, useEffect } from "react";
import "./Content.css";

import { BookingDetails } from "../../types";

type ContentProps = {
  bookingId: number;
};

function Content({ bookingId }: ContentProps): React.ReactElement {
  const [bookingDetail, setBookingDetail] = useState<BookingDetails>();

  useEffect(() => {
    async function fetchData() {
      if (!bookingId) return;

      // TODO: make this new with
      // /bookingdetails/{id}/

      const bookingDetailsResponse = await fetch(
        "http://127.0.0.1:8000/bookingdetails/" + bookingId + "/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const bookingdetailsData = await bookingDetailsResponse.json();
      setBookingDetail(bookingdetailsData);
    }

    fetchData();
  }, [bookingId]);

  return (
    <div>
      <h2>{bookingDetail?.production.name}</h2>
      <h4>{bookingDetail?.ensemble.name}</h4>
      {/* <pre>{JSON.stringify(bookingDetail, null, 2)}</pre> */}
      <p>Dauer: {bookingDetail?.production.length} Minuten</p>
      <p>Reisekosten: {bookingDetail?.booking.cost_travel} €</p>
      <p>Transportkosten: {bookingDetail?.booking.cost_transport} €</p>
      <h3>
        Spieltermine <button>+</button>
      </h3>
      {bookingDetail?.showdates.map((sd) => (
        <div className="showdate">
          <div className="date">
            {new Date(sd.date).toLocaleDateString("de-DE")}
          </div>
          <div>{sd.time}</div>
          <div>
            {sd.theatre_name}, {sd.venue_name}
          </div>
        </div>
      ))}
      <h3>
        TODOs <button>+</button>
      </h3>
      <button>Booking löschen</button>
    </div>
  );
}

export default Content;

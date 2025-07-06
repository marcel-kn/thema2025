/**
 * BookingsView Component
 *
 * This is the main container for the bookings view.
 * It shows a list of bookings of the selected season and a details view
 * of the selected booking
 *
 * Structure:
 * - Renders a Sidebar for selecting bookings (of the selected season).
 * - Renders a Content area that displays details for the selected booking.
 *
 * State:
 * - bookingId: The ID of the currently selected booking (number).
 * - seasonId: The ID of the currently selected season (number).
 *
 * Props passed to children:
 * - Sidebar receives seasonId (to display bookings of season)
 *   and setBookingId (to set the booking id of the content to trigger a refresh)
 * - Content receives bookingId to display booking details.
 *
 * Usage:
 * <BookingsView />
 */

import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import CreateBookingModal from "./CreateBookingModal";
import { Production, Booking } from "../../types";

function BookingsView(): React.ReactElement {
  const [bookingId, setBookingId] = useState(0);

  const [seasonId, setSeasonId] = useState(1);

  const [showModal, setShowModal] = useState(false);

  const [allProductions, setAllProductions] = useState<Production[]>([]);

  const [bookings, setBookings] = useState<Booking[]>([]);

  // Flag to trigger reloading bookings
  const [reloadBookingsFlag, setReloadBookingsFlag] = useState(false);

  const reloadBookings = () => setReloadBookingsFlag((flag) => !flag);

  // Fetch all productions
  useEffect(() => {
    async function fetchAllProductions() {
      const productionsResponse = await fetch(
        "http://127.0.0.1:8000/productions/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      setAllProductions(await productionsResponse.json());
    }
    fetchAllProductions();
  }, [seasonId]);

  // Fetch bookings (productions booked for currently selected season)
  useEffect(() => {
    if (allProductions.length === 0) return;

    async function fetchBookings() {
      // 1. Get bookings
      const bookingsResponse = await fetch("http://127.0.0.1:8000/bookings/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      setBookings(await bookingsResponse.json());
    }
    fetchBookings();
  }, [allProductions, seasonId, reloadBookingsFlag]);

  const showCreateBookingModal = () => {
    return (
      <CreateBookingModal
        setShowModal={setShowModal}
        seasonId={seasonId}
        productions={allProductions}
        reloadBookings={reloadBookings}
      />
    );
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      {showModal && showCreateBookingModal()}
      <Sidebar
        seasonId={seasonId}
        bookings={bookings}
        setBookingId={setBookingId}
        setShowModal={setShowModal}
      />
      <main style={{ flex: 1, padding: "1rem", backgroundColor: "#f9f9f9" }}>
        <Content bookingId={bookingId} />
      </main>
    </div>
  );
}

export default BookingsView;

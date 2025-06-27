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
import { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import CreateBookingModal from "./CreateBookingModal";

function BookingsView(): React.ReactElement {

    const [bookingId, setBookingId] = useState(0);

    const [seasonId, setSeasonId] = useState(1);

    const [showModal, setShowModal] = useState(false);

    const showCreateBookingModal = () => {   
        return (
            <div
                style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
                }}
            >
                <CreateBookingModal 
                    setShowModal={setShowModal} 
                    seasonId={seasonId}    
                />
            </div>)
    }

    return (
        <div style={{ display: "flex", flex: 1 }}>
            {showModal && showCreateBookingModal()}
            <Sidebar seasonId={seasonId} setBookingId={setBookingId} setShowModal= {setShowModal}/>
            <main style={{ flex: 1, padding: "1rem", backgroundColor: "#f9f9f9" }}>
                <Content bookingId={bookingId}/>
            </main>
        </div>
    );
}

export default BookingsView;
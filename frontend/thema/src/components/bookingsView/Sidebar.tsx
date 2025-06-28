import React from "react";
import { Production } from "../../types";

//type Production = { id: number; name: string };

type SidebarProps = {
    seasonId: number,
    bookedProductions: Production[],
    setBookingId: React.Dispatch<React.SetStateAction<number>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({seasonId, bookedProductions, setBookingId, setShowModal}: SidebarProps): React.ReactElement {

  // When a booking is clicked
  const onBookingClicked = (id: number) => {
    console.log("Booking clicked with ID:", id);
    // do stuff
    setBookingId(id);
  };

  return (
      <aside style={{ width: "200px", backgroundColor: "#eee", padding: "1rem" }}>
          <h3>Bookings</h3>
          <ul>
            {bookedProductions.map((booking) => (
              <li
                key={booking.id}
                onClick={() => onBookingClicked(booking.id)}
                style={{ cursor: "pointer", padding: "5px" }}
              >
                {booking.name}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowModal(true)}>
          Neues Booking
          </button>
      </aside>
  );
}

export default Sidebar;
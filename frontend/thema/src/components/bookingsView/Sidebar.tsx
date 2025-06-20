import React from "react";
import { useState, useEffect } from "react";

type Production = { id: number; name: string };

type SidebarProps = {
    seasonId: number,
    setBookingId: React.Dispatch<React.SetStateAction<number>>;
}

function Sidebar({seasonId, setBookingId}: SidebarProps): React.ReactElement {
  const [bookings, setBookings] = useState<Production[]>([]); 
  // [0] current state value [1] state updating function

  useEffect(() => {
    async function fetchData() {
      // 1. Get all bookings
      const bookingsResponse = await fetch("http://127.0.0.1:8000/bookings/", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      });
      const bookingsData: { production: number }[] = await bookingsResponse.json();
      const productionIds: number[] = bookingsData.map((item) => item.production);
      
      // 2. Get all productions
      const productionsResponse = await fetch("http://127.0.0.1:8000/productions/", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      });
      const allProductionsData: { id: number, name: string }[] = await productionsResponse.json();

      // 3. Filter out production names and ids by production id

      const productionsOfBookings: Production[] = 
        allProductionsData.filter((prod) => productionIds.includes(prod.id));
      
      setBookings(productionsOfBookings);
    }
    fetchData();
  }, [seasonId]);

  // When a booking is clicked
  const onBookingClicked = (id: number) => {
    console.log("Booking clicked with ID:", id);
    // do stuff
    setBookingId(id);
  };

  const newBookingHandler = () => {};

  return (
      <aside style={{ width: "200px", backgroundColor: "#eee", padding: "1rem" }}>
          <ul>
            {bookings.map((booking) => (
              <li
                key={booking.id}
                onClick={() => onBookingClicked(booking.id)}
                style={{ cursor: "pointer", padding: "5px" }}
              >
                {booking.name}
              </li>
            ))}
          </ul>
          <button onClick={newBookingHandler}>
          New Booking
          </button>
      </aside>
  );
}

export default Sidebar;
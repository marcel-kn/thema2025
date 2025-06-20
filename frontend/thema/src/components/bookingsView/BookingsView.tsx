import React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";



function BookingsView(): React.ReactElement {

const [ bookingId, setBookingId ] = useState(0);

return (
    <div style={{ display: "flex", flex: 1 }}>
        <Sidebar setBookingId={setBookingId}/>
        <main style={{ flex: 1, padding: "1rem", backgroundColor: "#f9f9f9" }}>
            <Content bookingId={bookingId}/>
        </main>
    </div>
);

}

export default BookingsView;
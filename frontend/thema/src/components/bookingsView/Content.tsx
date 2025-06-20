import React, { useState, useEffect } from "react";

type ContentProps = {
    bookingId: number;
}

type Booking = {
    season: string,
    production: number,
    cost_travel: number,
    cost_transport: number
}

type Production = { 
    id: number; 
    name: string;
    ensemble: number;
    artist: number;
    length: number;
    honorar: number; // this got to go to booking
};

type ShowDate = {
    date: string,
    time: string,
    booking: number,
    venue: number,
    season: number,
    seats_booked: number,
}

function Content({ bookingId }: ContentProps): React.ReactElement {
    
    const [booking, setBooking] = useState<Booking>();
    const [production, setProduction] = useState<Production>();

    useEffect(() => {
        async function fetchData() {
            if (!bookingId) return;
            // Get Booking of bookingId
            const bookingResponse = await fetch("http://127.0.0.1:8000/bookings/" + bookingId + "/", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

            const bookingData: Booking = await bookingResponse.json();
            setBooking(bookingData);

            // Get Production of Booking
            const productionResponse = await fetch("http://127.0.0.1:8000/productions/" + bookingData.production + "/", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            const productionData: Production = await productionResponse.json();
            setProduction(productionData);
            // Get all show dates belonging to bookingId


        }

        fetchData();
    }, [bookingId]);
    
    return (
        <div>
            <h1>Booking</h1>
            <p>Produktion:</p>
            <p>{production?.name}</p>

            <pre>{JSON.stringify(booking, null, 2)}</pre>
            <pre>{JSON.stringify(production, null, 2)}</pre>
        </div>
        
    )
}

export default Content;
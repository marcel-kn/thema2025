import React, { useState, useEffect } from "react";
import './Content.css';

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
    venue_name: string,
    season: number,
}

type Ensemble = {
    name: string,
    contact_person: string,
    email: string,
    phone: string,
    website: string,
}

type BookingDetails = {
    booking: Booking,
    production: Production,
    showdates: ShowDate[],
    ensemble: Ensemble,
}

function Content({ bookingId }: ContentProps): React.ReactElement {
    
    const [bookingDetail, setBookingDetail] = useState<BookingDetails>();

    useEffect(() => {
        async function fetchData() {
            if (!bookingId) return;

            // TODO: make this new with 
            // /bookingdetails/{id}/

            const bookingDetailsResponse = await fetch("http://127.0.0.1:8000/bookingdetails/" + bookingId + "/", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

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
            <h3>Spieltermine <button>+</button></h3>
            {bookingDetail?.showdates.map((sd) => (
                <div className="showdate">
                    <p>{new Date(sd.date).toLocaleDateString("de-DE")}</p>
                    <p>{sd.time}  {sd.venue_name}</p>
                </div>
            ))}
            <h3>TODOs <button>+</button></h3>
        </div>
    )
}

export default Content;
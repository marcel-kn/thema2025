export type Booking = {
    id: number,
    season: string,
    production: number,
    production_name: string,
    cost_travel: number,
    cost_transport: number
}

export type Production = {
    id: number;
    name: string;
    ensemble: number;
    artist: number;
    length: number;
    honorar: number; // this got to go to booking
};

export type ShowDate = {
    date: string,
    time: string,
    booking: number,
    venue: number,
    venue_name: string,
    theatre: number,
    theatre_name: string,
    season: number,
}

export type Ensemble = {
    id: number,
    name: string,
    contact_person: string,
    email: string,
    phone: string,
    website: string,
}

export type Artist = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    website: string,
    ensemble?: number
}

export type BookingDetails = {
    booking: Booking,
    production: Production,
    showdates: ShowDate[],
    ensemble: Ensemble,
}
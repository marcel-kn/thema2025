import React from "react";
import { Production } from "../../types";
import "./CreateBookingModal.css";

type CreateBookingProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  seasonId: number;
  productions: Production[];
  reloadBookedProds: () => void;
};

function CreateBookingModal({
  setShowModal,
  productions,
  seasonId,
  reloadBookedProds,
}: CreateBookingProps): React.ReactElement {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Neues Booking anlegen</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // Collect form data
            const form = e.currentTarget;
            const season = (
              form.elements.namedItem("season") as HTMLInputElement
            ).value;
            const production = (
              form.elements.namedItem("production") as HTMLInputElement
            ).value;
            const costTravel = (
              form.elements.namedItem("cost_travel") as HTMLInputElement
            ).value;
            const costTransport = (
              form.elements.namedItem("cost_transport") as HTMLInputElement
            ).value;

            console.log(
              "Posting:" +
                JSON.stringify({
                  production: Number(production),
                  season: Number(season),
                  cost_travel: Number(costTravel),
                  cost_transport: Number(costTransport),
                })
            );

            // Post Booking
            await fetch("http://127.0.0.1:8000/bookings/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                production: Number(production),
                season: Number(season),
                cost_travel: Number(costTravel),
                cost_transport: Number(costTransport),
              }),
            });
            reloadBookedProds(); // trigger reload booked productions
            setShowModal(false);
          }}
        >
          <label>Produktion:</label>
          <select name="production" required>
            {productions.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>

          <label htmlFor="season">Saison-ID:</label>
          <input
            id="season"
            name="season"
            type="number"
            value={seasonId}
            readOnly
            style={{ background: "#eee" }}
          />

          <label htmlFor="cost_travel">Reisekosten:</label>
          <input id="cost_travel" name="cost_travel" type="number" required />

          <label htmlFor="cost_transport">Transportkosten:</label>
          <input
            id="cost_transport"
            name="cost_transport"
            type="number"
            required
          />

          <div className="button-row">
            <button type="submit">Speichern</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBookingModal;

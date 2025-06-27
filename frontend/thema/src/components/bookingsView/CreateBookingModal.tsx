import React from "react";
import { Production } from "../../types";

type CreateBookingProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    seasonId: number,
    //productions: Production[]
}

function CreateBookingModal({setShowModal, seasonId}: CreateBookingProps): React.ReactElement {

    const productions = [
        {id: 1, name: "Test1"},
        {id: 2, name: "Test2"},
        {id: 3, name: "Test3"},
    ];

    return (
        <div style={{ background: "#fff", padding: "2em", borderRadius: "8px", minWidth: "300px" }}>
            <h2>Neues Booking anlegen</h2>
            <form
                onSubmit={async (e) => {
                e.preventDefault();
                // Collect form data here
                // Example: await fetch(..., { method: "POST", body: ... })
                setShowModal(false);
                }}
            >
                <label>
                Produktion:
                </label>
                <select name="production" required>
                    {productions.map(prod => (
                        <option key={prod.id} value={prod.id}>
                            {prod.name}
                        </option>
                    ))}
                </select>
                <br />
                <label>
                Saison-ID:
                <input name="production" 
                  type="number"
                  value={seasonId}
                  readOnly
                  style={{ background: "#eee" }} 
                />
                </label>
                <br />
                <label>
                Reisekosten:
                <input name="cost_travel" 
                  type="number" required
                />
                </label>
                <br />
                <label>
                Transportkosten:
                <input name="cost_transport" 
                  type="number" required
                />
                </label>
                <br />
                <button type="submit">Speichern</button>
                <button type="button" onClick={() => setShowModal(false)}>Abbrechen</button>
            </form>
            </div>
    )
}

export default CreateBookingModal;
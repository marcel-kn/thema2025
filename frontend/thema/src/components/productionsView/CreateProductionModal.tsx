import CreateModal from "../generic/CreateModal";
import { Ensemble, Artist } from "../../types";

type CreateProductionModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  reloadProductions: () => void;
  ensembles: Ensemble[];
  //artists: Artist[];
};

function CreateProductionModal({
  setShowModal,
  reloadProductions,
  ensembles,
}: CreateProductionModalProps): React.ReactElement {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect form data
    const form = e.currentTarget;
    const name = (form.elements.namedItem("pName") as HTMLInputElement).value;
    const length = (form.elements.namedItem("pLength") as HTMLInputElement)
      .value;
    const honorar = (form.elements.namedItem("pHonorar") as HTMLInputElement)
      .value;
    const ensemble = (form.elements.namedItem("pEnsemble") as HTMLInputElement)
      .value;

    // Post Booking
    await fetch("http://127.0.0.1:8000/productions/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(name),
        length: Number(length),
        honorar: Number(honorar),
        ensemble: Number(ensemble),
      }),
    });
    reloadProductions(); // trigger reload productions
    setShowModal(false);
  };

  return (
    <CreateModal
      title="Produktion hinzufügen"
      onClose={() => setShowModal(false)}
      onSubmit={handleSubmit}
    >
      <label htmlFor="pname">Name:</label>
      <input id="pName" name="pName" type="text" />
      <label htmlFor="pLength">Dauer:</label>
      <input id="pLength" name="pLength" type="text" />
      <label htmlFor="pHonorar">Honorar:</label>
      <input id="pHonorar" name="pHonorar" type="text" />
      <label htmlFor="pEnsemble">Ensemble:</label>
      <select name="pEnsemble">
        {ensembles.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
    </CreateModal>
  );
}

export default CreateProductionModal;

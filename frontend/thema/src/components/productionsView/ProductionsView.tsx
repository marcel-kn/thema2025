import React from "react";
import { useState, useEffect } from "react";
import { Ensemble, Production, Artist } from "../../types";
import ListSidebar from "../generic/ListSideBar";
import ProductionContent from "./ProductionContent";
import CreateProductionModal from "./CreateProductionModal";

function ProductionsView(): React.ReactElement {
  const [allProductions, setAllProductions] = useState<Production[]>([]);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  //const [artists, setArtists] = useState<Artist[]>([]);

  const [productionId, setProductionId] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);

  const [reloadProductionsFlag, setReloadBookingsFlag] = useState(false);

  const reloadProductions = () => setReloadBookingsFlag((flag) => !flag);

  // Fetch all productions
  useEffect(() => {
    async function fetchAllProductions() {
      const productionsResponse = await fetch(
        "http://127.0.0.1:8000/productions/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      setAllProductions(await productionsResponse.json());
    }
    fetchAllProductions();
  }, [reloadProductionsFlag]);

  // Fetch all ensembles
  useEffect(() => {
    async function fetchEnsembles() {
      const ensemblesResponse = await fetch(
        "http://127.0.0.1:8000/ensembles/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      setEnsembles(await ensemblesResponse.json());
    }
    fetchEnsembles();
  }, []);

  // // Fetch all artists
  // useEffect(() => {
  //   async function fetchArtists() {
  //     const artistsResponse = await fetch("http://127.0.0.1:8000/artists/", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     setArtists(await artistsResponse.json());
  //   }
  //   fetchArtists();
  // }, []);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      {showModal && (
        <CreateProductionModal
          setShowModal={setShowModal}
          reloadProductions={reloadProductions}
          ensembles={ensembles}
        />
      )}
      <ListSidebar
        title="Produktionen"
        items={allProductions}
        getKey={(production) => production.id}
        renderItem={(production) => production.name}
        onItemClick={(production) => setProductionId(production.id)}
        onCreateClick={() => setShowModal(true)}
        createLabel="Neue Produktion"
      />

      <main style={{ flex: 1, padding: "1rem", backgroundColor: "#f9f9f9" }}>
        <ProductionContent productionId={productionId} />
      </main>
    </div>
  );
}

export default ProductionsView;

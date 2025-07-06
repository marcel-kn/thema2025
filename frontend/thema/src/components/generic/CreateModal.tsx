/**
 * A  generic modal for creating an entry
 *
 * Props:
 *
 */

import React from "react";
//import "./CreateModal.css";

type CreateModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function CreateModal({
  title,
  children,
  onClose,
  onSubmit,
}: CreateModalProps): React.ReactElement {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <form onSubmit={onSubmit}>
          {children}
          <div className="button-row">
            <button type="submit">Speichern</button>
            <button type="button" onClick={onClose}>
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateModal;

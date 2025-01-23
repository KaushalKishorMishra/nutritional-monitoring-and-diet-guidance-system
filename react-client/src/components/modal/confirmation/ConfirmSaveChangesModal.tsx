import React from "react";
import { useModalStore } from "../../../hooks/store/modal.store";

type PConfirmSaveChangesModal = {
  confirmation: () => void;
  id: string;
};

const ConfirmSaveChangesModal: React.FC<PConfirmSaveChangesModal> = ({
  confirmation,
  id,
}) => {
  const { closeModal } = useModalStore();

  return (
    <div className="py-3">
      <p className="">Are you sure you want to save these changes?</p>
      <div className="mt-5 flex justify-end gap-3">
        <button
          className="btn btn-outline btn-error"
          onClick={() => {
            closeModal(id);
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary hover:bg-primary-dark"
          onClick={() => {
            confirmation();
            closeModal(id);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ConfirmSaveChangesModal;

import React from "react";
import { useModalStore } from "../../../hooks/store/modal.store";
import { useNavigate } from "react-router";

type PConfirmSaveChanges = {
  confirmation: () => void;
  id: string;
  navigationPathTo: string;
};

const ConfirmSaveChanges: React.FC<PConfirmSaveChanges> = ({
  confirmation,
  id,
  navigationPathTo,
}) => {
  const navigate = useNavigate();
  const { closeModal } = useModalStore();

  console.log(navigationPathTo);

  return (
    <div>
      <p>Are you sure you want to save these changes?</p>
      <div className="mt-5 flex justify-end gap-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            confirmation();
            closeModal(id);
            navigate("user/profile");
          }}
        >
          Save
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            closeModal(id);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmSaveChanges;

import React from "react";

const ConfirmDeleteModal = ({ handleDeleteUser, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this user?</h2>
        <div className="modal-buttons">
          <button onClick={handleDeleteUser}>Yes</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

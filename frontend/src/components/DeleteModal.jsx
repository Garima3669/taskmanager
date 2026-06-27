import { FaTrashAlt } from "react-icons/fa";
import "../styles/DeleteModal.css";

function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          <FaTrashAlt />
        </div>

        <h2>Delete Task?</h2>

        <p>
          This action cannot be undone. The selected task will be permanently removed.
        </p>

        <div className="delete-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;
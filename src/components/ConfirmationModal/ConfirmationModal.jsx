import closeButton from "../../assets/close-btn.svg";

function ConfirmationModal({ activeModal, closeActiveModal, card, onDelete }) {
  return (
    <div
      className={`modal ${
        activeModal === "confirmation-modal" && "modal__is-opened"
      }`}
    >
      <div className="modal__confirmation-content">
        <p className="modal__delete-confirmation-text">
          Are you sure you want to delete this item?{" "}
          <span className="modal__delete-confirmation-text-new-row">
            This action is irreversible.
          </span>
        </p>

        <button
          className="modal__close modal__close_type_confirmation"
          type="button"
          onClick={closeActiveModal}
        >
          <img
            src={closeButton}
            alt="Close button"
            className="modal__closeBtn"
          />
        </button>

        <div className="modal__confirmation-buttons">
          <button
            onClick={() => onDelete(card)}
            className="modal__confirmation-delete-btn"
          >
            Yes, delete item
          </button>
          <button
            onClick={closeActiveModal}
            className="modal__confirmation-cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

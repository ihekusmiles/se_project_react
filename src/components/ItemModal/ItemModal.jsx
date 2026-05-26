import closeButton from "../../assets/close-btn.svg";
import darkCloseButton from "../../assets/menu_close-btn.svg";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, closeActiveModal, card, onConfirmation }) {
  // Subscribe ItemModal to the context and extra currentUser
  const { currentUser } = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing
  const isOwn = card.owner === currentUser._id;
  // Creating a variable for the delete button's classname
  const itemDeleteButton = `modal__delete-item-btn ${isOwn ? "" : "modal__delete-button_hidden"}`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal__is-opened"}`}>
      <div className="modal__content_type_image">
        <button
          className="modal__close modal__close_type_preview"
          type="button"
          onClick={closeActiveModal}
        >
          <img
            src={closeButton}
            alt="Close button"
            className="modal__closeBtn"
          />
          <img
            src={darkCloseButton}
            alt="Close button"
            className="modal__dark-menu-closeBtn"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={() => onConfirmation(card)}
            className={itemDeleteButton}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

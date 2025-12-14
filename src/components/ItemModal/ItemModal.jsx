import closeButton from "../../assets/close-btn.svg";

function ItemModal({ activeModal, closeActiveModal, card }) {
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
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

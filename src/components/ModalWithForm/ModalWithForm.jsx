import closeButton from "../../assets/close-btn.svg";

function ModalWithForm({ children, buttonText, title, name, onClose, isOpen }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen && "modal__is-opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={closeButton}
            alt="Close button"
            className="modal__closeBtn"
          />
        </button>
        <form className={name}>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

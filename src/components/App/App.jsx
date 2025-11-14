import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("preview");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function that adds 'add-garment' when called
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  // Function that closes any active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    // If no modal is active, don't attach listeners
    if (!activeModal) return;

    // Defining handlers
    const handleEscapeKey = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };
    const handleOverlayClick = (evt) => {
      if (evt.target.classList.contains("modal__is-opened")) {
        closeActiveModal();
      }
    };
    // Attaching listeners
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOverlayClick);
    };

    // Dependency array ensures this runs only when modal state changes
  }, [activeModal]);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              name="weather"
              type="radio"
              className="modal__radio-input"
              id="hot"
              defaultChecked
            />
            Hot
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              type="radio"
              className="modal__radio-input"
              id="cold"
            />
            Cold
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              type="radio"
              className="modal__radio-input"
              id="warm"
            />
            Warm
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;

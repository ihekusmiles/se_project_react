import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onClose, buttonText }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const resetForm = () => {
    setValues({ name: "", imageUrl: "", weather: "" });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values, resetForm); // <-Passing this to parent
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            value="hot"
            onChange={handleChange}
            className="modal__radio-input"
            id="hot"
            checked={values.weather === "hot"}
            required
          />
          Hot
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            value="cold"
            onChange={handleChange}
            className="modal__radio-input"
            id="cold"
            checked={values.weather === "cold"}
            required
          />
          Cold
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            value="warm"
            onChange={handleChange}
            className="modal__radio-input"
            id="warm"
            checked={values.weather === "warm"}
            required
          />
          Warm
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

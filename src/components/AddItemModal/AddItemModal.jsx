import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onClose, buttonText }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }
  // console.log(values);

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
            name="weatherType"
            type="radio"
            value="hot"
            onChange={handleChange}
            className="modal__radio-input"
            id="hot"
            defaultChecked
          />
          Hot
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            type="radio"
            value="cold"
            onChange={handleChange}
            className="modal__radio-input"
            id="cold"
          />
          Cold
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            type="radio"
            value="warm"
            onChange={handleChange}
            className="modal__radio-input"
            id="warm"
          />
          Warm
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

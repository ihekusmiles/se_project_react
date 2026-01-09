import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const AddItemModal = ({ isOpen, onAddItem, onClose, buttonText }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const {
    values,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
    resetForm,
    showErrors,
    setShowErrors,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const newErrors = {};
    let hasError = false;

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    if (!values.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
      hasError = true;
    } else {
      try {
        new URL(values.imageUrl);
      } catch {
        newErrors.imageUrl = "Please enter a valid URL";
        hasError = true;
      }
    }

    if (!values.weather) {
      newErrors.weather = "Weather type is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setIsValid(false);
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    const result = onAddItem(values, resetForm);
    if (result && typeof result.then === "function") {
      result.then(() => resetForm()).catch(() => {});
    } else if (result === undefined) {
      // parent may call reset via callback
    } else {
      resetForm();
    }
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
          className={`modal__input ${
            showErrors && errors.name ? "modal__input_error" : ""
          }`}
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${
            showErrors && errors.name ? "modal__error_visible" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className={`modal__input ${
            showErrors && errors.imageUrl ? "modal__input_error" : ""
          }`}
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${
            showErrors && errors.imageUrl ? "modal__error_visible" : ""
          }`}
        >
          {errors.imageUrl}
        </span>
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
          />
          Warm
        </label>
        <span
          className={`modal__error ${
            showErrors && errors.weather ? "modal__error_visible" : ""
          }`}
        >
          {errors.weather}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

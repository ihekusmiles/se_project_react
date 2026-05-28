import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

// Import useContext and CurrentUserContext
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Here the component EditProfileModal is receiving props:
const EditProfileModal = ({ isOpen, onClose, buttonText, onChangeData }) => {
  const {
    values,
    handleChange,
    errors,
    setErrors,
    setIsValid,
    showErrors,
    setShowErrors,
    resetForm,
  } = useFormWithValidation({ name: "", avatar: "" });

  // CurrentUser context
  const { currentUser } = useContext(CurrentUserContext);

  // Run effect when the modal opens OR when currentUser data updates
  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const newErrors = {};
    let hasError = false;

    // Validation for name
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    // Validation for avatar
    if (values.avatar.trim()) {
      try {
        new URL(values.avatar);
      } catch {
        newErrors.avatar = "Please enter a valid URL";
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      setIsValid(false);
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    // OnRegister prop receives the form data and passes it up to App.jsx
    onChangeData({
      name: values.name,
      avatar: values.avatar,
    });
  }

  return (
    <ModalWithForm
      name="change-data"
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label htmlFor="change-name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className={`modal__input ${
            showErrors && errors.name ? "modal__input_error" : ""
          }`}
          id="change-name"
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

      <label htmlFor="change-avatar" className="modal__label">
        Avatar*{" "}
        <input
          type="url"
          className={`modal__input ${
            showErrors && errors.avatar ? "modal__input_error" : ""
          }`}
          id="change-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${
            showErrors && errors.avatar ? "modal__error_visible" : ""
          }`}
        >
          {errors.avatar}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;

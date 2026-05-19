import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

// Here the component RegisterModal is receiving props:
const RegisterModal = ({ isOpen, onClose, buttonText, onRegister }) => {
  // Changing values for user registration fields
  const defaultValues = { name: "", email: "", password: "", avatar: "" };
  const {
    values,
    handleChange,
    errors,
    setErrors,
    setIsValid,
    resetForm,
    showErrors,
    setShowErrors,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const newErrors = {};
    let hasError = false;

    // Validation for name
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    // Validation for email
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        newErrors.email = "Please enter a valid email";
        hasError = true;
      }
    }
    // Validation for password
    if (!values.password.trim()) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
    });
  }

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className={`modal__input ${
            showErrors && errors.email ? "modal__input_error" : ""
          }`}
          id="register-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${
            showErrors && errors.email ? "modal__error_visible" : ""
          }`}
        >
          {errors.email}
        </span>
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className={`modal__input ${showErrors && errors.password ? "modal__input_error" : ""}`}
          id="register-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${
            showErrors && errors.password ? "modal__error_visible" : ""
          }`}
        >
          {errors.password}
        </span>
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className={`modal__input ${
            showErrors && errors.name ? "modal__input_error" : ""
          }`}
          id="register-name"
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

      <label htmlFor="avatar-url" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className={`modal__input ${
            showErrors && errors.avatar ? "modal__input_error" : ""
          }`}
          id="avatar-url"
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

export default RegisterModal;

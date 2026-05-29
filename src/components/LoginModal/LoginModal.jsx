import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const LoginModal = ({ isOpen, onClose, buttonText, onLogin }) => {
  const defaultValues = { email: "", password: "" };
  const {
    values,
    handleChange,
    errors,
    setErrors,
    setIsValid,
    showErrors,
    setShowErrors,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const newErrors = {};
    let hasError = false;

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
    }

    if (hasError) {
      setErrors(newErrors);
      setIsValid(false);
      setShowErrors(true);
      return;
    }

    setShowErrors(false);

    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <ModalWithForm
      name="Login"
      title="Log in"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className={`modal__input ${
            showErrors && errors.email ? "modal__input_error" : ""
          }`}
          id="login-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <span
          className={`modal__error ${
            showErrors && errors.email ? "modal__error_visible" : ""
          }`}
        >
          {errors.email}
        </span>
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className={`modal__input ${showErrors && errors.password ? "modal__input_error" : ""}`}
          id="login-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <span
          className={`modal__error ${
            showErrors && errors.password ? "modal__error_visible" : ""
          }`}
        >
          {errors.password}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;

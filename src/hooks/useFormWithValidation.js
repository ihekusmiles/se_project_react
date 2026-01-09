import { useCallback, useState } from "react";

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (event) => {
    const { name, value, form } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (form) setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = defaultValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setShowErrors(false);
    },
    [defaultValues]
  );

  return {
    values,
    handleChange,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    resetForm,
    showErrors,
    setShowErrors,
  };
}

export default useFormWithValidation;

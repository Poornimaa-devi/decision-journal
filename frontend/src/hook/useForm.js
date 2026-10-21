import { useState } from "react";

export function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    // Re-check live only once the field has been touched or has an error,
    // so messages disappear as soon as the problem is fixed.
    if (touched[name] || errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(nextValues)[name] }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(Object.keys(initialValues).map((key) => [key, true])));
    setSubmitError(null);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      setValues(initialValues);
      setErrors({});
      setTouched({});
    } catch (err) {
      if (err.fieldErrors) setErrors(err.fieldErrors);
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { values, errors, submitError, isSubmitting, handleChange, handleBlur, handleSubmit };
}
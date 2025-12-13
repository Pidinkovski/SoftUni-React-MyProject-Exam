import { useState } from "react";

export default function useFormValidation() {
  const [errors, setErrors] = useState({});

  const urlRegex = new RegExp("^https?:\\/\\/.+", "i")

  const validate = (values) => {
    const nextErrors = {}

    if (!values.title || values.title.trim().length < 3) {
      nextErrors.title = "Title must be at least 3 characters."
    }

    if (!values.imageUrl || !urlRegex.test(values.imageUrl)) {
      nextErrors.imageUrl = "Please enter a valid image URL."
    }

    if (!values.description || values.description.trim().length < 10) {
      nextErrors.description = "Description must be at least 10 characters."
    }

    if (!values.conciseContent || values.conciseContent.trim().length < 5) {
      nextErrors.conciseContent = "Concise content must be at least 5 characters."
    }

    if (!values.category) {
      nextErrors.category = "Please select a category."
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const clearError = (fieldName) => {
    setErrors((state) => ({
      ...state,
      [fieldName]: undefined,
    }));
  };

  return {
    errors,
    validate,
    clearError,
    setErrors,
  };
}
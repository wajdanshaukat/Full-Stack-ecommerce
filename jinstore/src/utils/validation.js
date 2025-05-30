export const validateField = (name, value) => {
  if (
    ["firstName", "lastName", "phone", "zipCode", "email"].includes(name) &&
    !value.trim()
  ) {
    return "This field is required";
  }

  if (
    ["firstName", "lastName"].includes(name) &&
    !/^[a-zA-Z\s]+$/.test(value)
  ) {
    return "Only letters allowed";
  }

  if (name === "phone") {
    if (!/^\d+$/.test(value)) {
      return "Only numbers allowed";
    }
    if (value.length < 7 || value.length > 15) {
      return "Phone number must be 7-15 digits.";
    }
  }

  if (name === "zipCode" && !/^\d{1,5}$/.test(value)) {
    return "Enter up to 5 digits";
  }

  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Invalid email format";
  }

  return "";
};

// Optional: validate entire form data and return errors object
export const validateForm = (data, requiredFields) => {
  const errors = {};
  requiredFields.forEach((field) => {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
};

export const validateEmail = (email) => {
  if (!email) return "";
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)
    ? ""
    : "Invalid email format.";
};

export const validateName = (name) => {
  if (!name) return "";
  return /[0-9!@#$%^&*()]/.test(name)
    ? "Name contains invalid characters."
    : "";
};
export const validatePassword = (password) => {
  if (!password) return "";

  const hasLetter = [...password].some((char) => /[a-zA-Z]/.test(char));
  const hasNumber = [...password].some((char) => /[0-9]/.test(char));

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (!hasLetter) {
    return "Password must include at least one letter.";
  }

  if (!hasNumber) {
    return "Password must include at least one number.";
  }

  return "";
};
export const validateFields = (fields = {}) => {
  let missingFields = [];

  for (const key in fields) {
    const value = fields[key];

    if (!value || value.toString().trim() === "") {
      missingFields.push(key);
    }
  }

  if (missingFields.length > 0) {
    return `Please enter ${missingFields.join(", ")}`;
  }

  return "";
};

export const validateImage = (size, setError, fileType) => {
  const maxSize = 10 * 1024 * 1024;
  const filesAllowed = ["image/jpeg", "image/png", "image/webp"];

  if (!filesAllowed.includes(fileType)) {
    setError("Only JPEG, PNG, or WEBP images are allowed");
    return false;
  }

  if (size > maxSize) {
    setError("Image size should be less than 10 MB");
    return false;
  }

  setError(null);
  return true;
};

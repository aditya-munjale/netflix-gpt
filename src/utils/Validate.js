export const checkValidData = (email, password, name) => {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  // Name validation
  if (!name) return "Please enter your name.";

  const nameRegex = /^[A-Za-z\s.'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return "Name can only contain letters, spaces, dots, apostrophes, or hyphens.";
  }

  // Email validation
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!trimmedEmail) return "Please enter your email address.";
  if (!emailRegex.test(trimmedEmail))
    return "Enter a valid email (e.g. user@example.com).";

  // Password validation
  if (!trimmedPassword) return "Please enter your password.";
  if (trimmedPassword.length < 8)
    return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(trimmedPassword))
    return "Password must include at least one uppercase letter.";
  if (!/[a-z]/.test(trimmedPassword))
    return "Password must include at least one lowercase letter.";
  if (!/[0-9]/.test(trimmedPassword))
    return "Password must include at least one number.";
  if (!/[#?!@$%^&*-]/.test(trimmedPassword))
    return "Password must include at least one special character (#?!@$%^&*-).";

  return null; // ✅ All good
};

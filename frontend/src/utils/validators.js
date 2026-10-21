const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email.trim()) return "Email is required";
  if (!EMAIL_PATTERN.test(email.trim())) return "Enter a valid email address";
  return null;
}

export function validateLogin({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!password) errors.password = "Password is required";
  return errors;
}

export function validateSignup({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!password) errors.password = "Password is required";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters";
  return errors;
}

export function validateGoalForm({ title }) {
  const errors = {};
  if (!title.trim()) errors.title = "Goal title is required";
  return errors;
}

export function validateDecisionForm({ title, reasoning }) {
  const errors = {};
  if (!title.trim()) errors.title = "Decision title is required";
  if (!reasoning.trim()) errors.reasoning = "Reasoning is required";
  return errors;
}
// Backend URL. Override per environment with a VITE_API_URL variable (used on deploy).
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

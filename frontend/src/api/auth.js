import { apiFetch } from "./client";

export function login(email, password) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email, password }),
  });
}

export function signup(email, password) {
  return apiFetch("/api/auth/signup", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email, password }),
  });
}
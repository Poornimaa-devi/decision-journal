import { apiFetch } from "./client";

export function getMe() {
  return apiFetch("/api/users/me");
}

export function updateMe(updates) {
  return apiFetch("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}
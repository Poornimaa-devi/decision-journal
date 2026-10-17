import { apiFetch } from "./client";

export function getNotifications(days) {
  const query = days !== undefined ? `?days=${days}` : "";
  return apiFetch(`/api/notifications${query}`);
}
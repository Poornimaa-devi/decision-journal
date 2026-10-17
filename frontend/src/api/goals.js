import { apiFetch } from "./client";

export function getGoals(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/api/goals${query ? `?${query}` : ""}`);
}

export function createGoal(goal) {
  return apiFetch("/api/goals", {
    method: "POST",
    body: JSON.stringify(goal),
  });
}

export function updateGoal(id, updates) {
  return apiFetch(`/api/goals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export function deleteGoal(id) {
  return apiFetch(`/api/goals/${id}`, { method: "DELETE" });
}

export function getGoalAnalytics() {
  return apiFetch("/api/goals/analytics");
}
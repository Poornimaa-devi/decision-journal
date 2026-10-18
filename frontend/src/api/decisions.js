import { apiFetch } from "./client";

export function getDecisions() {
  return apiFetch("/api/decisions");
}

export function getDecisionById(id) {
  return apiFetch(`/api/decisions/${id}`);
}

export function createDecision(decision) {
  return apiFetch("/api/decisions", {
    method: "POST",
    body: JSON.stringify(decision),
  });
}

export function getDecisionAnalytics() {
  return apiFetch("/api/decisions/analytics");
}
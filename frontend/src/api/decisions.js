import { apiFetch } from "./client";

export function getDecisions() {
  return apiFetch("/api/decisions");
}

export function getDecisionAnalytics() {
  return apiFetch("/api/decisions/analytics");
}
import { API_BASE_URL } from "../config";
import { getToken, clearToken } from "../auth/tokenStorage";

export async function apiFetch(path, options = {}) {
  const { auth = true, ...fetchOptions } = options;

  const headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchOptions,
      headers,
    });
  } catch {
    const networkError = new Error(
      "Cannot reach the server. Check that the backend is running."
    );
    networkError.status = 0;
    throw networkError;
  }

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearToken();
      window.dispatchEvent(new Event("auth:expired"));
    }
    const body = await response.json().catch(() => null);
    const error = new Error(body?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.fieldErrors = body?.errors ?? null;
    throw error;
  }

  return response.json();
}
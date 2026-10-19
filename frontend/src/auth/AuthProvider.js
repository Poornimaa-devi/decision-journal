import { createElement, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, setToken, clearToken } from "./tokenStorage";
import { login as loginRequest, signup as signupRequest } from "../api/auth";

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());

  useEffect(() => {
    function handleExpired() {
      setTokenState(null);
    }
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, []);

  async function login(email, password) {
    const data = await loginRequest(email, password);
    setToken(data.token);
    setTokenState(data.token);
  }

  async function signup(email, password) {
    await signupRequest(email, password);
    await login(email, password);
  }

  function logout() {
    clearToken();
    setTokenState(null);
  }

  const value = { token, isAuthenticated: Boolean(token), login, signup, logout };

  return createElement(AuthContext.Provider, { value }, children);
}
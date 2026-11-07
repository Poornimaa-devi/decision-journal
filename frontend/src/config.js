// Backend URL. In production set VITE_API_URL (Vite bakes it in when you BUILD).
// A trailing slash is removed, because every request path already starts with "/".
const rawUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const API_BASE_URL = rawUrl.replace(/\/+$/, "");
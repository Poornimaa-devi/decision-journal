import { useState, useEffect, useCallback } from "react";

// Fetches data when the component mounts and whenever `deps` change.
// - Old data stays available while a refetch is in flight (no flicker).
// - Responses from outdated requests are ignored (no race conditions).
// - isLoading and error are DERIVED from the request key, so no state is set
//   synchronously inside the effect (React's recommended pattern).
export function useFetch(fetcher, deps = []) {
  const [reloadCount, setReloadCount] = useState(0);
  const [result, setResult] = useState({ key: null, data: null, error: null });

  const key = JSON.stringify([...deps, reloadCount]);

  useEffect(() => {
    let ignore = false;

    fetcher()
      .then((data) => {
        if (!ignore) setResult({ key, data, error: null });
      })
      .catch((error) => {
        if (!ignore) setResult((prev) => ({ key, data: prev.data, error }));
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Lets pages update the list after create/update/delete (value or updater function).
  const setData = useCallback((updater) => {
    setResult((prev) => ({
      ...prev,
      data: typeof updater === "function" ? updater(prev.data) : updater,
    }));
  }, []);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  const isSettled = result.key === key;

  return {
    data: result.data,
    setData,
    error: isSettled ? result.error : null,
    isLoading: !isSettled,
    reload,
  };
}

import { useState, useEffect, useCallback } from "react";

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!ignore) setData(result);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadCount]);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  return { data, setData, error, isLoading, reload };
}
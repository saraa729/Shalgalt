import { useCallback, useEffect, useState } from "react";

export default function useFetch(fetcher, options = {}) {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
      return result;
    } catch (fetchError) {
      setError(fetchError);
      throw fetchError;
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    let isMounted = true;

    if (!immediate) {
      setLoading(false);
      return;
    }

    execute().catch(() => {
      if (!isMounted) {
        return;
      }
    });

    return () => {
      isMounted = false;
    };
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute,
    setData,
  };
}

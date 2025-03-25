import { useState, useEffect, useMemo, useRef } from "react";

const useFetch = <T>(
  url: string,
  params?: Record<string, string | number | boolean>,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestIdRef = useRef(0);

  const queryString = useMemo(() => {
    if (!params) return "";
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    return searchParams.toString();
  }, [params]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await fetch(fullUrl, { signal });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const result: T = await response.json();

        if (requestId === requestIdRef.current) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, queryString]);

  return { data, loading, error };
};

export default useFetch;

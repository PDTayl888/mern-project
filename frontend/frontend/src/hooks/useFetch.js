import { useState, useEffect } from "react";
import { fetch } from "../utils/apiClient";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const result = await fetch(url, { signal: controller.signal });
        setData(result);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("ERROR");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, setData, loading, error };
};

export default useFetch;

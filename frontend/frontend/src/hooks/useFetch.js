import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(url, { signal: controller.signal });

        setData(response.data);
        setError(null);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("CANCEL");
        } else {
          setError(error.response?.data?.message);
          setLoading(false);
        }
      } 
    };

        if (url) {
      fetchData();
    }


     return () => {
      controller.abort();
    };
  }, [url]);

  return { data, setData, loading, error };
};

export default useFetch;

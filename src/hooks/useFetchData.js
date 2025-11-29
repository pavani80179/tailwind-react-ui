import { useEffect, useState } from "react";

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // prevents state update after unmount

    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network Error");
        const json = await res.json();
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError("Failed to fetch data. Please try later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]); // refetch if URL changes

  return { data, loading, error };
}

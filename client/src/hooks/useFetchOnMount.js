import { useEffect, useState, useCallback } from "react";
import useRequest from "./useRequest";

export default function useFetchOnMount(url, initialValue) {
  const { request } = useRequest();

  const [currentData, setCurrentData] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    
    setIsLoading(true)
    setError(null)

    try {

      const result = await request(url)
      setCurrentData(result)

    } catch (err) {

      setError(err)

    } finally {

      setIsLoading(false);
      
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { currentData, setCurrentData, isLoading, error, redoFetch : fetchData };
}
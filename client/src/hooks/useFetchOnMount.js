import { useEffect, useState, useCallback } from "react";
import useRequest from "./useRequest";

export default function useFetchOnMount(url, initialValue) {
  const { request } = useRequest();

  const controller = new AbortController()
  const [currentData, setCurrentData] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    
    setIsLoading(true)
    setError(null)

    try {

      const result = await request(url , 'GET' , null , {signal : controller.signal})
      setCurrentData(result)

    } catch (err) {

      setError(err)

    } finally {

      setIsLoading(false);

    }
    return () => controller.abort()
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { currentData, setCurrentData, isLoading, error, redoFetch : fetchData };
}
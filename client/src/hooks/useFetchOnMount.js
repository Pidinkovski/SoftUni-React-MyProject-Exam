import { useEffect, useState, useCallback } from "react";
import useRequest from "./useRequest";

export default function useFetchOnMount(url, initialValue) {
  const { request } = useRequest();

  const [currentData, setCurrentData] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  
  useEffect(() => {
     const controller = new AbortController();

    (async () => {
    setIsLoading(true)
    setError(null)

    try {

      const result = await request(url , 'GET' , null , {signal : controller.signal})
      setCurrentData(result)

    } catch (err) {

      setError(err)

    } finally {
      if(!controller.signal.aborted){
        setIsLoading(false);
      }
    }
  })();
    
    return () => controller.abort()
  }, [url])


  return { currentData, setCurrentData, isLoading, error };
}
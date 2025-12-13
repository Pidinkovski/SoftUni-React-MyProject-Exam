import { useState , useCallback } from "react";

export default function useRequest() {

    const [isPending, setIsPending] = useState(false)

    const request = useCallback(
        async (url, method = 'GET', data, config = {}) => {
            setIsPending(true);

            try {
                const options = {
                    method,
                    headers: {},
                }

                if (method !== 'GET' && data !== undefined) {
                    options.headers['Content-Type'] = 'application/json'
                    options.body = JSON.stringify(data)
                }

                if (config?.accessToken) {
                    options.headers['X-Authorization'] = config.accessToken
                }

                if(config?.signal) {
                    options.signal = config.signal
                }

                const response = await fetch(url, options);

                if (response.status === 204) {
                    return null
                }

                if (!response.ok) {
                    const error = await response.json()
                    throw new Error(error.message || 'Request failed')
                }

                return await response.json()
            } finally {
                setIsPending(false)
            }
        },
        []
    );

    return {
        request,
        isPending,
    };
}
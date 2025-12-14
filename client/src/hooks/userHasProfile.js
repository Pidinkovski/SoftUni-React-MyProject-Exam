import { useEffect, useState } from "react";
import useRequest from "./useRequest";

export default function userHasProfile(userId) {
    const { request } = useRequest();

    const [hasProfile, setHasProfile] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setHasProfile(false);
            return;
        }

        const controller = new AbortController();

        (async () => {
            try {
                setError(null);

                const searchParm = encodeURIComponent(`_ownerId="${userId}"`);
                const result = await request(`http://localhost:3030/data/profiles?where=${searchParm}`,"GET",null,{ signal: controller.signal });

                setHasProfile(Array.isArray(result) && result.length > 0);
            } catch (err) {
                if (err?.name === "AbortError") return;
                setError(err);
                setHasProfile(false);
            }
        })();

        return () => controller.abort();
    }, [userId]);

    return { hasProfile, error };
}
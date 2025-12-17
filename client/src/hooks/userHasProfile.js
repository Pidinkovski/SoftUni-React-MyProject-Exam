import { useEffect, useState } from "react";
import useRequest from "./useRequest";

export default function userHasProfile(userId) {
    const { request } = useRequest();

    const [hasProfile, setHasProfile] = useState(false);
    const [error, setError] = useState(null);
    const [isLoad , setIsLoad] = useState(false)
    const [originalProfile , setOriginalProfile] = useState(null)

    useEffect(() => {
        if (!userId) {
            setHasProfile(false);
            setOriginalProfile(null)
            return;
        }

        const controller = new AbortController();

        (async () => {
            setIsLoad(true)
            try {
                setError(null);

                const searchParm = encodeURIComponent(`_ownerId="${userId}"`);
                const result = await request(`http://localhost:3030/data/profiles?where=${searchParm}`,"GET",null,{ signal: controller.signal });

                const profile = Array.isArray(result) && result.length > 0 ? result[0] : null
                setOriginalProfile(profile)
                
                setHasProfile(!!profile);
            } catch (err) {
                if (err?.name === "AbortError") return;
                setError(err);
                setHasProfile(false);
            }finally {
                setIsLoad(false)
            }
        })();

        return () => controller.abort();
    }, [userId]);

    return { hasProfile, error, isLoad , originalProfile};
}
import { useState, useEffect, useCallback, useContext } from 'react';
import useRequest from './useRequest';
import UserContext from '../contexts/UserContext';

const BASE_URL = 'http://localhost:3030';

export default function useLikes(ideaId) {
    const { user } = useContext(UserContext);
    const userId = user?._id;

    const { request } = useRequest();

    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isPending , setIsPending] = useState(false)
    const controller = new AbortController()

    useEffect(() => {
        if(!ideaId) return
        setIsPending(true)
        const where = encodeURIComponent(`ideaId="${ideaId}"`);
        const url = `${BASE_URL}/data/likes?where=${where}`;

        (async () => {
            try {
                
                const likes = await request(url , 'GET',null , {signal : controller.signal});
                setLikesCount(likes.length)

                if (userId) {
                    const userHasLiked = likes.some(like => like._ownerId === userId)

                    setIsLiked(userHasLiked)
                } else {
                    setIsLiked(false)
                }
            } catch (err) {
                console.error('Error loading likes', err);
            } finally {
                setIsPending(false)
            }
            return () => controller.abort()
        })();

    }, [ideaId, userId , setIsLiked]);

    const like = useCallback(async () => {
        setIsPending(true)

        try {

            await request(`http://localhost:3030/data/likes`, 'POST', {ideaId}, { accessToken: user.accessToken });

            setLikesCount(state => state + 1);
            setIsLiked(true);

        } catch (err) {

            console.error('Error adding like', err);
            alert(err.message || 'Could not like this idea.');

        }finally {
            setIsPending(false)
        }
    }, [ideaId, userId, isLiked]);

    return {
        likesCount,
        isLiked,
        like,
        isPending
    };
}
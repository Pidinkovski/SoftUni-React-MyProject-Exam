import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";


export default function Logout() {
    const { user, onLogout } = useContext(UserContext);
    const [isLogginOut, setIsLoggingOut] = useState(false)

    useEffect(() => {
        (async () => {
            try {

                await onLogout({ accessToken: user.accessToken })

            } catch (err) {

                toast.error(err)

            } finally {

                setIsLoggingOut(true)

            }
        })();
    }, []);

    if (isLogginOut) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold">Logging out…</h2>
            <p className="text-gray-600">Please wait</p>
        </div>
    )
}
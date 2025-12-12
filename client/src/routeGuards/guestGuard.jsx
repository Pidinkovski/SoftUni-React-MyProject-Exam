import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router";

export default function GuestGuard() {
    const {user , isAuthenticated} = useContext(UserContext)

    if(user || isAuthenticated) {
        return <Navigate to='/'/>
    }
    return <Outlet />
}
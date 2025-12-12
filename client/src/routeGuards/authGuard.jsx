import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
    const {user , isAuthenticated} = useContext(UserContext)

    if(!user && !isAuthenticated) {
       return <Navigate to="/login"/>
    }

    return <Outlet />
}
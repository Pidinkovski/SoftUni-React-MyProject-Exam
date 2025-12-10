import { useContext, useEffect } from "react"
import { Navigate } from "react-router"
import UserContext from "../../contexts/UserContext"

export default function Logout() {
    const {user , onLogout} = useContext(UserContext)

    useEffect(() => {
        onLogout({accessToken : user.accessToken})
    },[])
    
    return (
        <Navigate to="/" />
    )
}
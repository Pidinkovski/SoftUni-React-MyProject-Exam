import { NavLink, useNavigate } from 'react-router';
import './Header.css';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';


export default function Header() {

    const { isAuthenticated, user  } = useContext(UserContext);
    const navigate = useNavigate()
    return (

        <nav className="header-nav">
            <div className="nav-left"></div>

            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/ideas">Catalog</NavLink>

                {isAuthenticated ? (
                    <>
                        <NavLink to="/create">Create</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </div>

            
            {isAuthenticated && user?.email && (
                <div className="nav-user">
                    <NavLink to="/update-profile" className="update-profile">
                         Profile
                    </NavLink>

                    <span 
                    className="hello-user">
                        Hello, {user?.email}
                    </span>
                </div>
            )}
        </nav>

    )
}
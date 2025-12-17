import { NavLink, useNavigate } from 'react-router';
import './Header.css';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import userHasProfile from '../../hooks/userHasProfile';



export default function Header() {

    const { isAuthenticated, user } = useContext(UserContext);
    const { originalProfile, isLoad } = userHasProfile(user?._id)


    return (

        <nav className="header-nav">
            <div className="nav-left"></div>

            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/ideas">Catalog</NavLink>
                <NavLink to='/about'>About Us</NavLink>

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

                    <span className="hello-user">
                        Hello, {isLoad ? "..." : (originalProfile?.username || user?.email)}
                    </span>
                </div>
            )}
        </nav>

    )
}
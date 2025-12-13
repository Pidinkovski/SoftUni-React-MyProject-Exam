import { NavLink } from 'react-router';
import './Header.css';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Header() {

    const { isAuthenticated } = useContext(UserContext);

    return (

        <nav className='header-nav'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/ideas">Catalog</NavLink>
            {isAuthenticated
                ? (<>
                    <NavLink to="/create">Create</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </>)
                : (<>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </>)}
        </nav>
    )
}
import {NavLink} from 'react-router';
import './Header.css';
export default function Header() {
    return (
        <nav className='header-nav'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/ideas">Catalog</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/Logout">Logout</NavLink>
            <NavLink to="/create">Create</NavLink>
        </nav>
    )
}
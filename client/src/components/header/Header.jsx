import {Link} from 'react-router';
export default function Header() {
    return (
        <nav className='header-nav'>
            <Link to="/">Home</Link>
            <Link to="/ideas">Catalog</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/Logout">Logout</Link>
            <Link to="/create">Create</Link>
        </nav>
    )
}
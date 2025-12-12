import { Link } from 'react-router';
import './404.css'

export default function NotFound() {
    return (
        <section className="not-found-page">
            <div className="not-found-card">
                <h1 className="not-found-code">404</h1>

                <h2 className="not-found-title">
                    Page Not Found
                </h2>

                <p className="not-found-text">
                    Looks like this page doesn't exist.
                </p>

                <Link to="/" className="not-found-btn">
                    Go Back Home
                </Link>
            </div>
        </section>
    );
}